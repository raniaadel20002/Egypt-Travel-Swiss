Payments


POST
/api/Payments/paypal/initialize


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "bookingId": null,
  "divingCourseBookingId": "93370ded-72f9-4e53-90c1-dceea7a3487f"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristy.runasp.net/api/Payments/paypal/initialize' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NjAyNDExNH0.Th8aAkZ8XbWJSzszMqc7EBzKiLIPqZv1MA6ApnvGNrk' \
  -H 'Content-Type: application/json' \
  -d '{
  "bookingId": null,
  "divingCourseBookingId": "93370ded-72f9-4e53-90c1-dceea7a3487f"
}'
Request URL
https://touristy.runasp.net/api/Payments/paypal/initialize
Server response
Code	Details
400	
Error: response status is 400

Response body
Download
{
  "Success": false,
  "Message": "An active payment attempt already exists for this booking. Please complete or cancel the existing payment before creating a new one.",
  "Data": null
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json 
 date: Mon,23 Nov 2026 12:15:56 GMT 
 x-powered-by: ASP.NET 
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
    "createdAt": "2026-11-23T12:15:57.652Z"
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
    "paidAt": "2026-11-23T12:15:57.656Z",
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
Cancel
Name	Description
paymentId *
integer($int32)
(path)
4
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/Payments/4' \
  -H 'accept: text/plain'
Request URL
https://touristy.runasp.net/api/Payments/4
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Payment status retrieved successfully",
  "data": {
    "paymentId": 4,
    "bookingId": 9,
    "status": "failed",
    "amount": 160,
    "currency": "EUR",
    "provider": "PayPal",
    "payPalOrderId": "88H74463E1099921R",
    "payPalCaptureId": null,
    "createdAt": "2026-11-23T11:54:21.319523",
    "paidAt": null,
    "failureReason": "Payment could not be processed. Please try again or use a different payment method."
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Mon,23 Nov 2026 12:13:14 GMT 
 x-powered-by: ASP.NET 
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
    "createdAt": "2026-11-23T12:15:57.659Z",
    "paidAt": "2026-11-23T12:15:57.659Z",
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
Cancel
Name	Description
bookingId *
integer($int32)
(path)
8807a5e4-6db8-4daa-ac31-be517fc7161e
Please correct the following validation errors and try again.
For 'bookingId': Value must be an integer.
Execute