here are the tripTypes we should be adding them to the UI for the admin dashbaord note that we have 5 lanuges and to fetch such a languge we should in the header add the accept-language header with the languge code "EN" , "FR" , "RU" , "RO" , "IT". okay ? please create a plan so that we follow the shcma of the backend and after that we should be add them in the UI for the admin we will later add them in the UI for the clinet could you do that ?
note that when we add them in the admin it will be a simple table that will show the name in english only , photo and id of it okay ?
after that when we click edit we should fetch the lanuge in all 5 langues so that we edit it right and we should be able to edit the image alone if we want okay ? please create a full plan so that it works right 


GET
/api/TripTypes


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
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/TripTypes' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk1MTA0NDQ5fQ.pTrXdFNhyHz3VzIffK1DNBBuqfx1dkqYoijD1YZtXxA'
Request URL
https://touristy.runasp.net/api/TripTypes
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Trip Types Data",
  "data": [
    {
      "id": 1,
      "name": "test",
      "imageUrl": "images/triptypes/6569bcf4-17b4-49a3-a803-c7fecb5c3fe9.webp"
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 15:58:18 GMT 
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
      "name": "string",
      "imageUrl": "string"
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
/api/TripTypes


Parameters
Cancel
Reset
No parameters

Request body

multipart/form-data
Name.En
string
test
Send empty value
Name.Fr
string
testfr
Send empty value
Name.Ru
string
testru
Send empty value
Name.Ro
string
testro
Send empty value
Name.It
string
testIT
Send empty value
Image
string($binary)
No file chosen
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristy.runasp.net/api/TripTypes' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk1MTA0NDQ5fQ.pTrXdFNhyHz3VzIffK1DNBBuqfx1dkqYoijD1YZtXxA' \
  -H 'Content-Type: multipart/form-data' \
  -F 'Name.En=test' \
  -F 'Name.Fr=testfr' \
  -F 'Name.Ru=testru' \
  -F 'Name.Ro=testro' \
  -F 'Name.It=testIT' \
  -F 'Image=@image1.webp;type=image/webp'
Request URL
https://touristy.runasp.net/api/TripTypes
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Trip Type Created Successfully",
  "data": {
    "id": 1,
    "name": "test",
    "imageUrl": "images/triptypes/6569bcf4-17b4-49a3-a803-c7fecb5c3fe9.webp"
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 15:57:56 GMT 
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
    "name": "string",
    "imageUrl": "string"
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
/api/TripTypes


Parameters
Cancel
Reset
No parameters

Request body

multipart/form-data
Id *
integer($int32)
0
Name.En
string
string
Send empty value
Name.Fr
string
string
Send empty value
Name.Ru
string
string
Send empty value
Name.Ro
string
string
Send empty value
Name.It
string
string
Send empty value
Image *
string($binary)
No file chosen
Execute
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
    "name": "string",
    "imageUrl": "string"
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
/api/TripTypes/{id}


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
  'https://touristy.runasp.net/api/TripTypes/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk1MTA0NDQ5fQ.pTrXdFNhyHz3VzIffK1DNBBuqfx1dkqYoijD1YZtXxA'
Request URL
https://touristy.runasp.net/api/TripTypes/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Trip Type Data For Id 1",
  "data": {
    "id": 1,
    "name": "test",
    "imageUrl": "images/triptypes/6569bcf4-17b4-49a3-a803-c7fecb5c3fe9.webp"
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 15:58:41 GMT 
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
    "name": "string",
    "imageUrl": "string"
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
/api/TripTypes/{id}


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
  'https://touristy.runasp.net/api/TripTypes/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk1MTA0NDQ5fQ.pTrXdFNhyHz3VzIffK1DNBBuqfx1dkqYoijD1YZtXxA'
Request URL
https://touristy.runasp.net/api/TripTypes/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Trip Type Deleted Successfully",
  "data": ""
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 15:59:03 GMT 
 x-powered-by: ASP.NET 
Responses
