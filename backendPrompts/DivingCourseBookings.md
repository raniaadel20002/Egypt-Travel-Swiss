DivingCourseBookings


POST
/api/DivingCourseBookings


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "fullName": "test",
  "email": "user@example.com",
  "phone": "01231654635",
  "roomNo": "200",
  "hotelName": "test",
  "items": [
    {
      "divingCourseId": "7b07bcfc-d89b-449a-876a-1f135cac3303",
      "bookingDate": "2026-11-22T11:18:04.351Z",
      "numberOfParticipants": 2
    }
  ]
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristy.runasp.net/api/DivingCourseBookings' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTg2NDU5OH0.wMAeSO2LcbZgQrQ_x_NOVfgQW8_nxqNrbBulH8e1FqY' \
  -H 'Content-Type: application/json' \
  -d '{
  "fullName": "test",
  "email": "user@example.com",
  "phone": "01231654635",
  "roomNo": "200",
  "hotelName": "test",
  "items": [
    {
      "divingCourseId": "7b07bcfc-d89b-449a-876a-1f135cac3303",
      "bookingDate": "2026-11-22T11:18:04.351Z",
      "numberOfParticipants": 2
    }
  ]
}'
Request URL
https://touristy.runasp.net/api/DivingCourseBookings
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Booking created successfully with ID e126d3c4-d525-4f82-8c04-96bf1a663e60. Please proceed to payment.",
  "data": {
    "bookingId": "e126d3c4-d525-4f82-8c04-96bf1a663e60",
    "booking": {
      "id": "e126d3c4-d525-4f82-8c04-96bf1a663e60",
      "userId": 1,
      "fullName": "test",
      "email": "user@example.com",
      "phone": "01231654635",
      "roomNo": "200",
      "hotelName": "test",
      "items": [
        {
          "id": "25264409-049c-4770-9274-a2157119a003",
          "divingCourseId": "7b07bcfc-d89b-449a-876a-1f135cac3303",
          "courseName": "PADI Open Water Diving Course",
          "bookingDate": "2026-11-22T11:18:04.351Z",
          "numberOfParticipants": 2,
          "unitPrice": 350,
          "totalPrice": 700
        }
      ],
      "totalPrice": 700,
      "depositPercentage": 50,
      "depositAmount": 350,
      "paidAmount": 0,
      "remainingAmount": 700,
      "currency": "EUR",
      "status": "Pending",
      "paymentStatus": "Pending",
      "createdAt": "2026-11-21T11:19:50.5627245Z"
    },
    "message": "Booking created successfully. Proceed to payment to complete your reservation."
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Sat,21 Nov 2026 11:19:49 GMT 
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
    "bookingId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "booking": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "userId": 0,
      "fullName": "string",
      "email": "string",
      "phone": "string",
      "roomNo": "string",
      "hotelName": "string",
      "items": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "divingCourseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "courseName": "string",
          "bookingDate": "2026-11-21T11:20:18.785Z",
          "numberOfParticipants": 0,
          "unitPrice": 0,
          "totalPrice": 0
        }
      ],
      "totalPrice": 0,
      "depositPercentage": 0,
      "depositAmount": 0,
      "paidAmount": 0,
      "remainingAmount": 0,
      "currency": "string",
      "status": "string",
      "paymentStatus": "string",
      "createdAt": "2026-11-21T11:20:18.785Z"
    },
    "message": "string"
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
401	
Unauthorized

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
/api/DivingCourseBookings


Parameters
Cancel
Name	Description
pageNumber
integer($int32)
(query)
1
pageSize
integer($int32)
(query)
10
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/DivingCourseBookings?pageNumber=1&pageSize=10' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTg2NDU5OH0.wMAeSO2LcbZgQrQ_x_NOVfgQW8_nxqNrbBulH8e1FqY'
Request URL
https://touristy.runasp.net/api/DivingCourseBookings?pageNumber=1&pageSize=10
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "All DivingCourse bookings retrieved successfully",
  "data": {
    "data": [
      {
        "id": "e126d3c4-d525-4f82-8c04-96bf1a663e60",
        "userId": 1,
        "fullName": "test",
        "email": "user@example.com",
        "phone": "01231654635",
        "roomNo": "200",
        "hotelName": "test",
        "items": [
          {
            "id": "25264409-049c-4770-9274-a2157119a003",
            "divingCourseId": "7b07bcfc-d89b-449a-876a-1f135cac3303",
            "courseName": "PADI Open Water Diving Course",
            "bookingDate": "2026-11-22T11:18:04.351",
            "numberOfParticipants": 2,
            "unitPrice": 350,
            "totalPrice": 700
          }
        ],
        "totalPrice": 700,
        "depositPercentage": 50,
        "depositAmount": 350,
        "paidAmount": 0,
        "remainingAmount": 700,
        "currency": "EUR",
        "status": "Pending",
        "paymentStatus": "Pending",
        "createdAt": "2026-11-21T11:19:50.5627245"
      }
    ],
    "pageNumber": 1,
    "pageSize": 10,
    "totalCount": 1
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,21 Nov 2026 11:20:09 GMT 
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
  "data": "string"
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
401	
Unauthorized

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
/api/DivingCourseBookings/{bookingId}


Parameters
Cancel
Name	Description
bookingId *
string($uuid)
(path)
e126d3c4-d525-4f82-8c04-96bf1a663e60
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/DivingCourseBookings/e126d3c4-d525-4f82-8c04-96bf1a663e60' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTg2NDU5OH0.wMAeSO2LcbZgQrQ_x_NOVfgQW8_nxqNrbBulH8e1FqY'
Request URL
https://touristy.runasp.net/api/DivingCourseBookings/e126d3c4-d525-4f82-8c04-96bf1a663e60
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Booking with ID e126d3c4-d525-4f82-8c04-96bf1a663e60 retrieved successfully",
  "data": {
    "id": "e126d3c4-d525-4f82-8c04-96bf1a663e60",
    "userId": 1,
    "fullName": "test",
    "email": "user@example.com",
    "phone": "01231654635",
    "roomNo": "200",
    "hotelName": "test",
    "items": [
      {
        "id": "25264409-049c-4770-9274-a2157119a003",
        "divingCourseId": "7b07bcfc-d89b-449a-876a-1f135cac3303",
        "courseName": "PADI Open Water Diving Course",
        "bookingDate": "2026-11-22T11:18:04.351",
        "numberOfParticipants": 2,
        "unitPrice": 350,
        "totalPrice": 700
      }
    ],
    "totalPrice": 700,
    "depositPercentage": 50,
    "depositAmount": 350,
    "paidAmount": 0,
    "remainingAmount": 700,
    "currency": "EUR",
    "status": "Pending",
    "paymentStatus": "Pending",
    "createdAt": "2026-11-21T11:19:50.5627245"
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,21 Nov 2026 11:20:14 GMT 
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
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "userId": 0,
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "roomNo": "string",
    "hotelName": "string",
    "items": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "divingCourseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "courseName": "string",
        "bookingDate": "2026-11-21T11:20:18.797Z",
        "numberOfParticipants": 0,
        "unitPrice": 0,
        "totalPrice": 0
      }
    ],
    "totalPrice": 0,
    "depositPercentage": 0,
    "depositAmount": 0,
    "paidAmount": 0,
    "remainingAmount": 0,
    "currency": "string",
    "status": "string",
    "paymentStatus": "string",
    "createdAt": "2026-11-21T11:20:18.797Z"
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
401	
Unauthorized

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
/api/DivingCourseBookings/my-bookings


Parameters
Cancel
Name	Description
pageNumber
integer($int32)
(query)
1
pageSize
integer($int32)
(query)
10
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/DivingCourseBookings/my-bookings?pageNumber=1&pageSize=10' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTg2NDU5OH0.wMAeSO2LcbZgQrQ_x_NOVfgQW8_nxqNrbBulH8e1FqY'
Request URL
https://touristy.runasp.net/api/DivingCourseBookings/my-bookings?pageNumber=1&pageSize=10
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "User bookings retrieved successfully",
  "data": {
    "data": [
      {
        "id": "e126d3c4-d525-4f82-8c04-96bf1a663e60",
        "userId": 1,
        "fullName": "test",
        "email": "user@example.com",
        "phone": "01231654635",
        "roomNo": "200",
        "hotelName": "test",
        "items": [
          {
            "id": "25264409-049c-4770-9274-a2157119a003",
            "divingCourseId": "7b07bcfc-d89b-449a-876a-1f135cac3303",
            "courseName": "PADI Open Water Diving Course",
            "bookingDate": "2026-11-22T11:18:04.351",
            "numberOfParticipants": 2,
            "unitPrice": 350,
            "totalPrice": 700
          }
        ],
        "totalPrice": 700,
        "depositPercentage": 50,
        "depositAmount": 350,
        "paidAmount": 0,
        "remainingAmount": 700,
        "currency": "EUR",
        "status": "Pending",
        "paymentStatus": "Pending",
        "createdAt": "2026-11-21T11:19:50.5627245"
      }
    ],
    "pageNumber": 1,
    "pageSize": 10,
    "totalCount": 1
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Sat,21 Nov 2026 11:20:18 GMT 
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
  "data": "string"
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
401	
Unauthorized

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