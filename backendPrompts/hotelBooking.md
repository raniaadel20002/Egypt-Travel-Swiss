status 0 , 1,2,3
3 = Cancelled
0 = Pending
1 = Contacted
2 = Confirmed

Error: response status is 400

Response body
Download
{
  "Success": false,
  "Message": "Cannot update status of a cancelled booking",
  "Data": null
}



HotelBookings


POST
/api/HotelBookings


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "hotelId": 2,
  "name": "my name ",
  "email": "a@b.com",
  "whatsApp": "20321654654946",
  "nationality": "Egyptian ",
  "adults": 2,
  "children": 0,
  "infants": 0,
  "nightsCount": 1,
  "rooms": [
    {
      "ratePlanId": 2,
      "adults": 2,
      "children": 0,
      "infants": 0
    }
  ]
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristy.runasp.net/api/HotelBookings' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4' \
  -H 'Content-Type: application/json' \
  -d '{
  "hotelId": 2,
  "name": "my name ",
  "email": "a@b.com",
  "whatsApp": "20321654654946",
  "nationality": "Egyptian ",
  "adults": 2,
  "children": 0,
  "infants": 0,
  "nightsCount": 1,
  "rooms": [
    {
      "ratePlanId": 2,
      "adults": 2,
      "children": 0,
      "infants": 0
    }
  ]
}'
Request URL
https://touristy.runasp.net/api/HotelBookings
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Hotel booking created successfully with ID 2",
  "data": {
    "id": 2,
    "hotelId": 2,
    "hotelName": "Red Sea Paradise Resort",
    "name": "my name ",
    "email": "a@b.com",
    "whatsApp": "20321654654946",
    "nationality": "Egyptian ",
    "adults": 2,
    "children": 0,
    "infants": 0,
    "nightsCount": 1,
    "roomsCount": 1,
    "status": "Pending",
    "createdAt": "2026-11-20T13:47:13.1036089Z",
    "updatedAt": null,
    "rooms": [
      {
        "id": 2,
        "ratePlanId": 2,
        "ratePlanName": "All Inclusive Package",
        "adults": 2,
        "children": 0,
        "infants": 0
      }
    ]
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 13:47:12 GMT 
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
    "hotelId": 0,
    "hotelName": "string",
    "name": "string",
    "email": "string",
    "whatsApp": "string",
    "nationality": "string",
    "adults": 0,
    "children": 0,
    "infants": 0,
    "nightsCount": 0,
    "roomsCount": 0,
    "status": "string",
    "createdAt": "2026-11-20T13:47:57.950Z",
    "updatedAt": "2026-11-20T13:47:57.950Z",
    "rooms": [
      {
        "id": 0,
        "ratePlanId": 0,
        "ratePlanName": "string",
        "adults": 0,
        "children": 0,
        "infants": 0
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
/api/HotelBookings


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
HotelId
integer($int32)
(query)
HotelId
Status
integer($int32)
(query)

--
Nationality
string
(query)
Nationality
CreatedFrom
string($date-time)
(query)
CreatedFrom
CreatedTo
string($date-time)
(query)
CreatedTo
Language
string
(query)
Language
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/HotelBookings' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4'
Request URL
https://touristy.runasp.net/api/HotelBookings
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Hotel bookings retrieved successfully",
  "data": [
    {
      "id": 1,
      "hotelId": 2,
      "hotelName": "Red Sea Paradise Resort",
      "name": "my name ",
      "email": "a@b.com",
      "whatsApp": "20321654654946",
      "nationality": "Egyptian ",
      "adults": 2,
      "children": 0,
      "infants": 0,
      "nightsCount": 1,
      "roomsCount": 1,
      "status": "Pending",
      "createdAt": "2026-11-20T13:44:59.5798707",
      "updatedAt": null,
      "rooms": [
        {
          "id": 1,
          "ratePlanId": 2,
          "ratePlanName": "All Inclusive Package",
          "adults": 2,
          "children": 0,
          "infants": 0
        }
      ]
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 13:45:20 GMT 
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
      "hotelId": 0,
      "hotelName": "string",
      "name": "string",
      "email": "string",
      "whatsApp": "string",
      "nationality": "string",
      "adults": 0,
      "children": 0,
      "infants": 0,
      "nightsCount": 0,
      "roomsCount": 0,
      "status": "string",
      "createdAt": "2026-11-20T13:47:57.971Z",
      "updatedAt": "2026-11-20T13:47:57.971Z",
      "rooms": [
        {
          "id": 0,
          "ratePlanId": 0,
          "ratePlanName": "string",
          "adults": 0,
          "children": 0,
          "infants": 0
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

GET
/api/HotelBookings/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
1
language
string
(query)
en
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/HotelBookings/1?language=en' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4'
Request URL
https://touristy.runasp.net/api/HotelBookings/1?language=en
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Hotel booking with ID 1 retrieved successfully",
  "data": {
    "id": 1,
    "hotelId": 2,
    "hotelName": "Red Sea Paradise Resort",
    "name": "my name ",
    "email": "a@b.com",
    "whatsApp": "20321654654946",
    "nationality": "Egyptian ",
    "adults": 2,
    "children": 0,
    "infants": 0,
    "nightsCount": 1,
    "roomsCount": 1,
    "status": "Pending",
    "createdAt": "2026-11-20T13:44:59.5798707",
    "updatedAt": null,
    "rooms": [
      {
        "id": 1,
        "ratePlanId": 2,
        "ratePlanName": "All Inclusive Package",
        "adults": 2,
        "children": 0,
        "infants": 0
      }
    ]
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 13:45:29 GMT 
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
    "hotelId": 0,
    "hotelName": "string",
    "name": "string",
    "email": "string",
    "whatsApp": "string",
    "nationality": "string",
    "adults": 0,
    "children": 0,
    "infants": 0,
    "nightsCount": 0,
    "roomsCount": 0,
    "status": "string",
    "createdAt": "2026-11-20T13:47:57.985Z",
    "updatedAt": "2026-11-20T13:47:57.985Z",
    "rooms": [
      {
        "id": 0,
        "ratePlanId": 0,
        "ratePlanName": "string",
        "adults": 0,
        "children": 0,
        "infants": 0
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
/api/HotelBookings/{id}


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
/api/HotelBookings/{id}/status


Parameters
Cancel
Reset
Name	Description
id *
integer($int32)
(path)
2
Request body

application/json
{
  "id": 2,
  "status": 2
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://touristy.runasp.net/api/HotelBookings/2/status' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 2,
  "status": 2
}'
Request URL
https://touristy.runasp.net/api/HotelBookings/2/status
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Booking status updated successfully",
  "data": {
    "id": 2,
    "hotelId": 2,
    "hotelName": "Red Sea Paradise Resort",
    "name": "my name ",
    "email": "a@b.com",
    "whatsApp": "20321654654946",
    "nationality": "Egyptian ",
    "adults": 2,
    "children": 0,
    "infants": 0,
    "nightsCount": 1,
    "roomsCount": 1,
    "status": "Confirmed",
    "createdAt": "2026-11-20T13:47:13.1036089",
    "updatedAt": "2026-11-20T13:47:58.3346302Z",
    "rooms": [
      {
        "id": 2,
        "ratePlanId": 2,
        "ratePlanName": "All Inclusive Package",
        "adults": 2,
        "children": 0,
        "infants": 0
      }
    ]
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 13:47:57 GMT 
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
    "hotelId": 0,
    "hotelName": "string",
    "name": "string",
    "email": "string",
    "whatsApp": "string",
    "nationality": "string",
    "adults": 0,
    "children": 0,
    "infants": 0,
    "nightsCount": 0,
    "roomsCount": 0,
    "status": "string",
    "createdAt": "2026-11-20T13:47:58.004Z",
    "updatedAt": "2026-11-20T13:47:58.004Z",
    "rooms": [
      {
        "id": 0,
        "ratePlanId": 0,
        "ratePlanName": "string",
        "adults": 0,
        "children": 0,
        "infants": 0
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