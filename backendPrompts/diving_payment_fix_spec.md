# Backend Specification: Diving Course Payment & Capture Resolution

## 1. Context & Issues Identified

From live API tests and `backendPrompts/bookingAdiciningCourse.md`:

### Issue 1: Stale / Active Payment Attempt Lock
- Calling `POST /api/Payments/paypal/initialize` with `{ "divingCourseBookingId": "<guid>" }` when an attempt was already created returns:
  `400: "An active payment attempt already exists for this booking. Please complete or cancel the existing payment before creating a new one."`
- The frontend has no way to look up this active attempt because `GET /api/Payments/booking/{bookingId}` rejects GUIDs (`"For 'bookingId': Value must be an integer"`).

### Issue 2: Capture 404 ID Collision
- When initializing a diving course payment, `DtoPaymentInitializeResponse` returns:
  `{ "paymentId": 5, "payPalOrderId": "...", ... }`
- Calling `POST /api/Payments/paypal/capture` with `{ "paymentId": 5, "payPalOrderId": "..." }` searches `_context.Payments.FindAsync(5)` (the Trip table).
- Since `5` is a Diving payment, it is not found in `_context.Payments`, returning:
  `404: "Payment with id 5 was not found"`.

---

## 2. Required Backend Fixes (.NET C#)

### Fix 1: Update Capture Endpoint to Query Both Tables
In `PaymentsController.cs` (`POST /api/Payments/paypal/capture`):
```csharp
[HttpPost("paypal/capture")]
public async Task<IActionResult> Capture([FromBody] DtoPaymentCaptureRequest request)
{
    if (string.IsNullOrWhiteSpace(request.PayPalOrderId))
    {
        return BadRequest(new ResponseAPI { Success = false, Message = "PayPal Order ID is required." });
    }

    // 1. Check Trip Payments
    var tripPayment = await _context.Payments
        .FirstOrDefaultAsync(p => (request.PaymentId.HasValue && p.Id == request.PaymentId.Value) || 
                                   p.PayPalOrderId == request.PayPalOrderId);

    if (tripPayment != null)
    {
        return await CaptureTripPaymentAsync(tripPayment, request.PayPalOrderId);
    }

    // 2. Check Diving Course Payments (by PayPalOrderId, DivingCoursePaymentId Guid, or numeric Id)
    var divingPayment = await _context.DivingCoursePayments
        .FirstOrDefaultAsync(p => p.PayPalOrderId == request.PayPalOrderId ||
                                  (request.DivingCoursePaymentId.HasValue && p.Id == request.DivingCoursePaymentId.Value) ||
                                  (request.PaymentId.HasValue && p.Id.ToString() == request.PaymentId.Value.ToString()));

    if (divingPayment != null)
    {
        return await CaptureDivingPaymentAsync(divingPayment, request.PayPalOrderId);
    }

    return NotFound(new ResponseAPI 
    { 
        Success = false, 
        Message = $"Payment with order {request.PayPalOrderId} was not found." 
    });
}
```

### Fix 2: Expose Diving Payments Query Endpoint
Add `GET /api/Payments/diving-course/{divingCourseBookingId:guid}`:
```csharp
[HttpGet("diving-course/{divingCourseBookingId:guid}")]
public async Task<IActionResult> GetPaymentsByDivingCourseBookingId(Guid divingCourseBookingId)
{
    var payments = await _context.DivingCoursePayments
        .Where(p => p.DivingCourseBookingId == divingCourseBookingId)
        .OrderByDescending(p => p.CreatedAt)
        .ToListAsync();

    return Ok(new ResponseAPI { Success = true, Message = "Payments retrieved", Data = payments });
}
```

### Fix 3: Return `DivingCoursePaymentId` from Initialize
In `DtoPaymentInitializeResponse`:
```csharp
public class DtoPaymentInitializeResponse
{
    public int? PaymentId { get; set; }
    public Guid? DivingCoursePaymentId { get; set; } // Add this property
    public string PayPalOrderId { get; set; }
    public decimal Amount { get; set; }
    public string Currency { get; set; }
    public string Status { get; set; }
    public string BookingReference { get; set; }
    public DateTime CreatedAt { get; set; }
}
```

### Fix 4: Allow Cancel / Reset of Expired Payment Attempts
When `POST /api/Payments/paypal/cancel` is called with `{ "divingCourseBookingId": "<guid>" }` or `{ "payPalOrderId": "<id>" }`:
Mark existing pending attempt as `Cancelled` or `Failed` so the customer or concierge can re-initialize without getting locked out.
