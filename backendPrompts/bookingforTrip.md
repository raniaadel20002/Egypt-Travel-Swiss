Bookings


GET
/api/Bookings


Parameters
Cancel
Name	Description
PageNumber
integer($int32)
(query)
PageNumber
PageSize
integer($int32)
(query)
PageSize
Nationality
string
(query)
Nationality
SearchItem
string
(query)
SearchItem
Phone
string
(query)
Phone
Date
string($date-time)
(query)
Date
Status
integer($int32)
(query)

--
TripId
integer($int32)
(query)
TripId
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/Bookings' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4'
Request URL
https://touristy.runasp.net/api/Bookings
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Bookings Data",
  "data": [
    {
      "id": 1,
      "firstName": "Ahmed",
      "lastName": "Mohamed",
      "email": "ahmed.mohamed@example.com",
      "phone": "+201001234567",
      "nationality": "Egyptian",
      "bookingDate": "2026-11-20T16:09:40.8128352",
      "hotelName": "Red Sea Paradise Resort",
      "roomNo": "305",
      "totalPrice": 440,
      "status": "Pending",
      "createdAt": "2026-11-20T16:09:40.9",
      "tripsBookings": [
        {
          "id": 1,
          "tripId": 1,
          "title": "Abu Dabbab Snorkeling Trip",
          "priceForChild": 120,
          "priceForAdult": 150,
          "noAdult": 2,
          "noChild": 1,
          "noInf": 0,
          "leaveDate": "2026-11-25",
          "subTotal": 440
        }
      ]
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 15:09:58 GMT 
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
      "id": 0,
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string",
      "nationality": "string",
      "bookingDate": "2026-11-20T15:10:06.606Z",
      "hotelName": "string",
      "roomNo": "string",
      "totalPrice": 0,
      "status": "string",
      "createdAt": "2026-11-20T15:10:06.606Z",
      "tripsBookings": [
        {
          "id": 0,
          "tripId": 0,
          "title": "string",
          "priceForChild": 0,
          "priceForAdult": 0,
          "noAdult": 0,
          "noChild": 0,
          "noInf": 0,
          "leaveDate": "2026-11-20",
          "subTotal": 0
        }
      ]
    }
  ]
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

POST
/api/Bookings


Parameters
Cancel
Reset
No parameters

Request body

application/json

{
  "firstName": "Ahmed",
  "lastName": "Mohamed",
  "email": "ahmed.mohamed@example.com",
  "phone": "+201001234567",
  "code": null,
  "nationality": "Egyptian",
  "hotelName": "Red Sea Paradise Resort",
  "roomNo": "305",
  "tripsBookings": [
    {
      "tripId": 1,
      "noAdult": 2,
      "noChild": 1,
      "noInf": 0,
      "leaveDate": "2026-11-25",
      "serviceIds": [
       
        2
      ]
    }
  ]
}

Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristy.runasp.net/api/Bookings' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4' \
  -H 'Content-Type: application/json' \
  -d '
{
  "firstName": "Ahmed",
  "lastName": "Mohamed",
  "email": "ahmed.mohamed@example.com",
  "phone": "+201001234567",
  "code": null,
  "nationality": "Egyptian",
  "hotelName": "Red Sea Paradise Resort",
  "roomNo": "305",
  "tripsBookings": [
    {
      "tripId": 1,
      "noAdult": 2,
      "noChild": 1,
      "noInf": 0,
      "leaveDate": "2026-11-25",
      "serviceIds": [
       
        2
      ]
    }
  ]
}
'
Request URL
https://touristy.runasp.net/api/Bookings
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Booking Created Successfuly and Id 1",
  "data": {
    "id": 1,
    "firstName": "Ahmed",
    "lastName": "Mohamed",
    "email": "ahmed.mohamed@example.com",
    "phone": "+201001234567",
    "nationality": "Egyptian",
    "bookingDate": "2026-11-20T16:09:40.8128352+01:00",
    "hotelName": "Red Sea Paradise Resort",
    "roomNo": "305",
    "totalPrice": 440,
    "status": "Pending",
    "createdAt": "2026-11-20T16:09:40.9",
    "tripsBookings": [
      {
        "id": 1,
        "tripId": 1,
        "title": "Abu Dabbab Snorkeling Trip",
        "priceForChild": 120,
        "priceForAdult": 150,
        "noAdult": 2,
        "noChild": 1,
        "noInf": 0,
        "leaveDate": "2026-11-25",
        "subTotal": 440
      }
    ]
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 15:09:40 GMT 
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
    "id": 0,
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "nationality": "string",
    "bookingDate": "2026-11-20T15:10:06.622Z",
    "hotelName": "string",
    "roomNo": "string",
    "totalPrice": 0,
    "status": "string",
    "createdAt": "2026-11-20T15:10:06.622Z",
    "tripsBookings": [
      {
        "id": 0,
        "tripId": 0,
        "title": "string",
        "priceForChild": 0,
        "priceForAdult": 0,
        "noAdult": 0,
        "noChild": 0,
        "noInf": 0,
        "leaveDate": "2026-11-20",
        "subTotal": 0
      }
    ]
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
/api/Bookings/{id}


Parameters
Try it out
Name	Description
id *
integer($int32)
(path)
id
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
    "id": 0,
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "nationality": "string",
    "bookingDate": "2026-11-20T15:10:06.633Z",
    "hotelName": "string",
    "roomNo": "string",
    "totalPrice": 0,
    "status": "string",
    "createdAt": "2026-11-20T15:10:06.633Z",
    "tripsBookings": [
      {
        "id": 0,
        "tripId": 0,
        "title": "string",
        "priceForChild": 0,
        "priceForAdult": 0,
        "noAdult": 0,
        "noChild": 0,
        "noInf": 0,
        "leaveDate": "2026-11-20",
        "subTotal": 0
      }
    ]
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

DELETE
/api/Bookings/{id}


Parameters
Try it out
Name	Description
id *
integer($int32)
(path)
id
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

PUT
/api/Bookings/confirm


Parameters
Try it out
Name	Description
id
integer($int32)
(query)
id
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
    "id": 0,
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "nationality": "string",
    "bookingDate": "2026-11-20T15:10:06.655Z",
    "hotelName": "string",
    "roomNo": "string",
    "totalPrice": 0,
    "status": "string",
    "createdAt": "2026-11-20T15:10:06.655Z",
    "tripsBookings": [
      {
        "id": 0,
        "tripId": 0,
        "title": "string",
        "priceForChild": 0,
        "priceForAdult": 0,
        "noAdult": 0,
        "noChild": 0,
        "noInf": 0,
        "leaveDate": "2026-11-20",
        "subTotal": 0
      }
    ]
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

PUT
/api/Bookings/finish


Parameters
Try it out
Name	Description
id
integer($int32)
(query)
id
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
    "id": 0,
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "nationality": "string",
    "bookingDate": "2026-11-20T15:10:06.667Z",
    "hotelName": "string",
    "roomNo": "string",
    "totalPrice": 0,
    "status": "string",
    "createdAt": "2026-11-20T15:10:06.667Z",
    "tripsBookings": [
      {
        "id": 0,
        "tripId": 0,
        "title": "string",
        "priceForChild": 0,
        "priceForAdult": 0,
        "noAdult": 0,
        "noChild": 0,
        "noInf": 0,
        "leaveDate": "2026-11-20",
        "subTotal": 0
      }
    ]
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