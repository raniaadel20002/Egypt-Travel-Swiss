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
    "createdAt": "2026-11-23T13:00:01.481Z"
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
Cancel
Reset
No parameters

Request body

application/json
{
  "category": 1,
  "paymentId": 8,
  "payPalOrderId": "9MD10108RP752645U"
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristy.runasp.net/api/Payments/paypal/capture' \
  -H 'accept: text/plain' \
  -H 'Content-Type: application/json' \
  -d '{
  "category": 1,
  "paymentId": 8,
  "payPalOrderId": "9MD10108RP752645U"
}'
Request URL
https://touristy.runasp.net/api/Payments/paypal/capture
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Payment captured successfully",
  "data": {
    "paymentId": 8,
    "payPalOrderId": "9MD10108RP752645U",
    "payPalCaptureId": "3DW14793CT173464V",
    "status": "paid",
    "amount": 195,
    "currency": "EUR",
    "paidAt": "2026-11-23T12:59:31Z",
    "failureReason": null,
    "bookingConfirmed": true
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Mon,23 Nov 2026 12:59:31 GMT 
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
    "payPalCaptureId": "string",
    "status": "string",
    "amount": 0,
    "currency": "string",
    "paidAt": "2026-11-23T13:00:01.487Z",
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
3
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/Payments/8' \
  -H 'accept: text/plain'
Request URL
https://touristy.runasp.net/api/Payments/8
Server response
Code	Details
404	
Error: response status is 404

Response body
Download
{
  "Success": false,
  "Message": "Payment with id 8 was not found",
  "Data": null
}
Response headers
 content-type: application/json 
 date: Mon,23 Nov 2026 12:59:47 GMT 
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
    "createdAt": "2026-11-23T13:00:01.491Z",
    "paidAt": "2026-11-23T13:00:01.491Z",
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
8
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/Payments/booking/8' \
  -H 'accept: text/plain'
Request URL
https://touristy.runasp.net/api/Payments/booking/8
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Booking payment history retrieved successfully",
  "data": [
    {
      "paymentId": 3,
      "bookingId": 8,
      "status": "paid",
      "amount": 90,
      "currency": "EUR",
      "provider": "PayPal",
      "payPalOrderId": "2P5600426M2062841",
      "payPalCaptureId": "5VH5420171522331X",
      "createdAt": "2026-11-23T10:17:45.5538483",
      "paidAt": "2026-11-23T10:25:45",
      "failureReason": ""
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Mon,23 Nov 2026 12:59:55 GMT 
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
      "createdAt": "2026-11-23T13:00:01.494Z",
      "paidAt": "2026-11-23T13:00:01.494Z",
      "failureReason": "string"
    }
  ]
}
notes that catoiges is either 0 or 1 0 means trips 1 means couresns 