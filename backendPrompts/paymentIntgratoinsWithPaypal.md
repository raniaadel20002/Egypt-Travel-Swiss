Payments


POST
/api/Payments/paypal/initialize


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "bookingId": 0,
  "divingCourseBookingId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "message": "string",
  "data": {
    "paymentId": 0,
    "payPalOrderId": "string",
    "amount": 0,
    "currency": "string",
    "status": "string",
    "bookingId": 0,
    "bookingReference": "string",
    "createdAt": "2026-11-23T09:05:16.180Z"
  }
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
404	
Not Found

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

POST
/api/Payments/paypal/capture


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "paymentId": 0,
  "divingCoursePaymentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "payPalOrderId": "string"
}
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "message": "string",
  "data": {
    "paymentId": 0,
    "payPalOrderId": "string",
    "payPalCaptureId": "string",
    "status": "string",
    "amount": 0,
    "currency": "string",
    "paidAt": "2026-11-23T09:05:16.150Z",
    "failureReason": "string",
    "bookingConfirmed": true
  }
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
404	
Not Found

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

GET
/api/Payments/{paymentId}


Parameters
Try it out
Name	Description
paymentId *
integer($int32)
(path)
paymentId
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "message": "string",
  "data": {
    "paymentId": 0,
    "bookingId": 0,
    "status": "string",
    "amount": 0,
    "currency": "string",
    "provider": "string",
    "payPalOrderId": "string",
    "payPalCaptureId": "string",
    "createdAt": "2026-11-23T09:05:16.152Z",
    "paidAt": "2026-11-23T09:05:16.152Z",
    "failureReason": "string"
  }
}
No links
404	
Not Found

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

GET
/api/Payments/booking/{bookingId}


Parameters
Try it out
Name	Description
bookingId *
integer($int32)
(path)
bookingId
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "message": "string",
  "data": [
    {
      "paymentId": 0,
      "bookingId": 0,
      "status": "string",
      "amount": 0,
      "currency": "string",
      "provider": "string",
      "payPalOrderId": "string",
      "payPalCaptureId": "string",
      "createdAt": "2026-11-23T09:05:16.155Z",
      "paidAt": "2026-11-23T09:05:16.155Z",
      "failureReason": "string"
    }
  ]
}

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NjAyNDExNH0.Th8aAkZ8XbWJSzszMqc7EBzKiLIPqZv1MA6ApnvGNrk

create a full plan so that we intrgarite with paypal the cards method that we can have the inputs in our website could you create a full plan for it the online payment will be only for the divining courses and trips only could you create a full plan for it and you should test everything and tell me what will you be doing to implment it you will also needed to instal the sdk for the paypal so that it works right and you should follow the best pracities and you should have a config file for the clinetID could you create a full plan for it please ?