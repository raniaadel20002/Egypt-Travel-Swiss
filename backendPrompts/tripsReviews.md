Reviews


GET
/api/Reviews


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
TripId
integer($int32)
(query)
TripId
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/Reviews' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTcyMTM3OX0.ltb4GXqFUl3TuOZ7CWEm0G39BVs7mWQ-8yM96PqYtbk'
Request URL
https://touristy.runasp.net/api/Reviews
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Reviews Data",
  "data": []
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 19:39:27 GMT 
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
      "comment": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string",
      "rate": 0,
      "createdAt": "2026-11-19T19:40:30.421Z",
      "tripName": "string",
      "description": "string",
      "markerID": "string",
      "destination": "string",
      "tripTypeName": "string",
      "adultPrice": 0,
      "childPrice": 0,
      "currencyName": "string"
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
/api/Reviews


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "firstName": "name",
  "lastName": "second name",
  "email": "a@b.com",
  "phone": "0123456789",
  "tripId": 1,
  "comment": "my comment",
  "rate": 5
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristy.runasp.net/api/Reviews' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTcyMTM3OX0.ltb4GXqFUl3TuOZ7CWEm0G39BVs7mWQ-8yM96PqYtbk' \
  -H 'Content-Type: application/json' \
  -d '{
  "firstName": "name",
  "lastName": "second name",
  "email": "a@b.com",
  "phone": "0123456789",
  "tripId": 1,
  "comment": "my comment",
  "rate": 5
}'
Request URL
https://touristy.runasp.net/api/Reviews
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Review Created Successfully",
  "data": {
    "id": 1,
    "comment": "my comment",
    "firstName": "name",
    "lastName": "second name",
    "email": "a@b.com",
    "phone": "0123456789",
    "rate": 5,
    "createdAt": "2026-11-19T19:40:10.976848Z",
    "tripName": "Abu Dabbab Snorkeling Trip",
    "description": "Discover the beautiful Abu Dabbab Beach, famous for its crystal-clear waters, colorful marine life, and sea turtles. Enjoy a relaxing beach day with snorkeling, explore the underwater world with a professional snorkeling guide, and experience one of the most beautiful beaches of the Red Sea.",
    "markerID": "266451",
    "destination": "stringen",
    "tripTypeName": "test",
    "adultPrice": 150,
    "childPrice": 120,
    "currencyName": "EUR"
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 19:40:10 GMT 
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
    "comment": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "rate": 0,
    "createdAt": "2026-11-19T19:40:30.430Z",
    "tripName": "string",
    "description": "string",
    "markerID": "string",
    "destination": "string",
    "tripTypeName": "string",
    "adultPrice": 0,
    "childPrice": 0,
    "currencyName": "string"
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
/api/Reviews/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
1
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/Reviews/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTcyMTM3OX0.ltb4GXqFUl3TuOZ7CWEm0G39BVs7mWQ-8yM96PqYtbk'
Request URL
https://touristy.runasp.net/api/Reviews/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Review Data For Id 1",
  "data": {
    "id": 1,
    "comment": "my comment",
    "firstName": "name",
    "lastName": "second name",
    "email": "a@b.com",
    "phone": "0123456789",
    "rate": 5,
    "createdAt": "2026-11-19T19:40:10.976848",
    "tripName": "Abu Dabbab Snorkeling Trip",
    "description": "Discover the beautiful Abu Dabbab Beach, famous for its crystal-clear waters, colorful marine life, and sea turtles. Enjoy a relaxing beach day with snorkeling, explore the underwater world with a professional snorkeling guide, and experience one of the most beautiful beaches of the Red Sea.",
    "markerID": "266451",
    "destination": "stringen",
    "tripTypeName": "test",
    "adultPrice": 150,
    "childPrice": 120,
    "currencyName": "EUR"
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 19:40:15 GMT 
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
    "comment": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "rate": 0,
    "createdAt": "2026-11-19T19:40:30.443Z",
    "tripName": "string",
    "description": "string",
    "markerID": "string",
    "destination": "string",
    "tripTypeName": "string",
    "adultPrice": 0,
    "childPrice": 0,
    "currencyName": "string"
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
/api/Reviews/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
1
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristy.runasp.net/api/Reviews/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTcyMTM3OX0.ltb4GXqFUl3TuOZ7CWEm0G39BVs7mWQ-8yM96PqYtbk'
Request URL
https://touristy.runasp.net/api/Reviews/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Review Removed Successfully",
  "data": ""
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 19:40:30 GMT 
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
/api/Reviews/trip/{tripId}/average


Parameters
Cancel
Name	Description
tripId *
integer($int32)
(path)
1
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/Reviews/trip/1/average' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTcyMTM3OX0.ltb4GXqFUl3TuOZ7CWEm0G39BVs7mWQ-8yM96PqYtbk'
Request URL
https://touristy.runasp.net/api/Reviews/trip/1/average
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Average Review For Trip 1",
  "data": {
    "averageRate": 5,
    "totalReviews": 1
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 19:40:24 GMT 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK