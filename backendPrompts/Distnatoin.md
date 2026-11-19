Destinations


GET
/api/Destinations


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
searchTerm
string
(query)
searchTerm
Accept-Language
string
(header)
en
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/Destinations' \
  -H 'accept: text/plain' \
  -H 'Accept-Language: en' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk1MTA1Mzc1fQ.KIsWHOgLlwV8iiM4d-UeZvBzd0ESqRj0NomD6fpfLCE'
Request URL
https://touristy.runasp.net/api/Destinations
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Destinations Data",
  "data": [
    {
      "id": 1,
      "name": "stringen",
      "imageUrl": "images/destinations/c22c68f2-1300-4005-a5ca-5419e93bd3a2.webp",
      "isFeatured": true,
      "tripsCount": 0
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 16:13:26 GMT 
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
      "imageUrl": "string",
      "isFeatured": true,
      "tripsCount": 0
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
/api/Destinations


Parameters
Cancel
Reset
No parameters

Request body

multipart/form-data
Name.En
string
stringen
Send empty value
Name.Fr
string
stringfr
Send empty value
Name.Ru
string
stringru
Send empty value
Name.Ro
string
stringro
Send empty value
Name.It
string
stringit
Send empty value
IsFeatured
boolean

true
Send empty value
imageFile
string($binary)
North Coast.jpg
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristy.runasp.net/api/Destinations' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk1MTA1Mzc1fQ.KIsWHOgLlwV8iiM4d-UeZvBzd0ESqRj0NomD6fpfLCE' \
  -H 'Content-Type: multipart/form-data' \
  -F 'Name.En=stringen' \
  -F 'Name.Fr=stringfr' \
  -F 'Name.Ru=stringru' \
  -F 'Name.Ro=stringro' \
  -F 'Name.It=stringit' \
  -F 'IsFeatured=true' \
  -F 'imageFile=@North Coast.jpg;type=image/jpeg'
Request URL
https://touristy.runasp.net/api/Destinations
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Destination Created Successfully",
  "data": {
    "id": 1,
    "name": "stringen",
    "imageUrl": "images/destinations/c22c68f2-1300-4005-a5ca-5419e93bd3a2.webp",
    "isFeatured": true,
    "tripsCount": 0
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 16:13:16 GMT 
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
    "imageUrl": "string",
    "isFeatured": true,
    "tripsCount": 0
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
/api/Destinations


Parameters
Cancel
Reset
No parameters

Request body

multipart/form-data
Id
integer($int32)
1
Send empty value
Name.En
string
en
Send empty value
Name.Fr
string
fr
Send empty value
Name.Ru
string
ru
Send empty value
Name.Ro
string
ro
Send empty value
Name.It
string
it
Send empty value
IsFeatured
boolean

true
Send empty value
imageFile
string($binary)
No file chosen
Send empty value
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://touristy.runasp.net/api/Destinations' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk1MTA1Mzc1fQ.KIsWHOgLlwV8iiM4d-UeZvBzd0ESqRj0NomD6fpfLCE' \
  -H 'Content-Type: multipart/form-data' \
  -F 'Id=1' \
  -F 'Name.En=en' \
  -F 'Name.Fr=fr' \
  -F 'Name.Ru=ru' \
  -F 'Name.Ro=ro' \
  -F 'Name.It=it' \
  -F 'IsFeatured=true' \
  -F 'imageFile='
Request URL
https://touristy.runasp.net/api/Destinations
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Destination Updated Successfully",
  "data": {
    "id": 1,
    "name": "en",
    "imageUrl": "images/destinations/c22c68f2-1300-4005-a5ca-5419e93bd3a2.webp",
    "isFeatured": true,
    "tripsCount": 0
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 16:13:53 GMT 
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
    "imageUrl": "string",
    "isFeatured": true,
    "tripsCount": 0
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
/api/Destinations/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
1
Accept-Language
string
(header)
en
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/Destinations/1' \
  -H 'accept: text/plain' \
  -H 'Accept-Language: en' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk1MTA1Mzc1fQ.KIsWHOgLlwV8iiM4d-UeZvBzd0ESqRj0NomD6fpfLCE'
Request URL
https://touristy.runasp.net/api/Destinations/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Destination Data For Id 1",
  "data": {
    "id": 1,
    "name": "en",
    "imageUrl": "images/destinations/c22c68f2-1300-4005-a5ca-5419e93bd3a2.webp",
    "isFeatured": true,
    "tripsCount": 0
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 16:14:05 GMT 
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
    "imageUrl": "string",
    "isFeatured": true,
    "tripsCount": 0
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
/api/Destinations/{id}


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
  'https://touristy.runasp.net/api/Destinations/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk1MTA1Mzc1fQ.KIsWHOgLlwV8iiM4d-UeZvBzd0ESqRj0NomD6fpfLCE'
Request URL
https://touristy.runasp.net/api/Destinations/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Destination Deleted Successfully",
  "data": ""
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 16:14:40 GMT 
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

PUT
/api/Destinations/{id}/image


Parameters
Cancel
Reset
Name	Description
id *
integer($int32)
(path)
1
Request body

multipart/form-data
imageFile
string($binary)
Sheikh Zayed.jpg
Send empty value
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://touristy.runasp.net/api/Destinations/1/image' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk1MTA1Mzc1fQ.KIsWHOgLlwV8iiM4d-UeZvBzd0ESqRj0NomD6fpfLCE' \
  -H 'Content-Type: multipart/form-data' \
  -F 'imageFile=@Sheikh Zayed.jpg;type=image/jpeg'
Request URL
https://touristy.runasp.net/api/Destinations/1/image
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Destination Image Updated Successfully",
  "data": {
    "id": 1,
    "name": "en",
    "imageUrl": "images/destinations/825e3aab-aeab-460c-82b1-e42e4e72e2ba.webp",
    "isFeatured": true,
    "tripsCount": 0
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 16:14:18 GMT 
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
    "imageUrl": "string",
    "isFeatured": true,
    "tripsCount": 0
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
/api/Destinations/{id}/image


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
  'https://touristy.runasp.net/api/Destinations/1/image' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk1MTA1Mzc1fQ.KIsWHOgLlwV8iiM4d-UeZvBzd0ESqRj0NomD6fpfLCE'
Request URL
https://touristy.runasp.net/api/Destinations/1/image
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Destination Image Deleted Successfully",
  "data": ""
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 16:14:22 GMT 
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