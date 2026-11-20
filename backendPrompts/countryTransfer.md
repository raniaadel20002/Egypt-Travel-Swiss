CountryTransfer


GET
/api/CountryTransfer


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
Accept-Language
string
(header)
en
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/CountryTransfer' \
  -H 'accept: text/plain' \
  -H 'Accept-Language: en' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4'
Request URL
https://touristy.runasp.net/api/CountryTransfer
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Country Transfers Data",
  "data": []
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 14:31:41 GMT 
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
      "code": "string",
      "createdAt": "2026-11-20T14:32:34.007Z"
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
/api/CountryTransfer


Parameters
Cancel
Reset
No parameters

Request body

application/json

{
  "name": {
    "en": "Egypt Airport & Hotel Transfers",
    "fr": "Transferts Aéroport et Hôtel en Égypte",
    "ru": "Трансферы из аэропорта и в отели Египта",
    "ro": "Transferuri Aeroport și Hotel în Egipt",
    "it": "Trasferimenti Aeroporto e Hotel in Egitto"
  },
  "code": "EG"
}

Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristy.runasp.net/api/CountryTransfer' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4' \
  -H 'Content-Type: application/json' \
  -d '
{
  "name": {
    "en": "Egypt Airport & Hotel Transfers",
    "fr": "Transferts Aéroport et Hôtel en Égypte",
    "ru": "Трансферы из аэропорта и в отели Египта",
    "ro": "Transferuri Aeroport și Hotel în Egipt",
    "it": "Trasferimenti Aeroporto e Hotel in Egitto"
  },
  "code": "EG"
}
'
Request URL
https://touristy.runasp.net/api/CountryTransfer
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Country Transfer Created Successfully",
  "data": {
    "id": 1,
    "name": "Egypt Airport & Hotel Transfers",
    "code": "EG",
    "createdAt": "2026-11-20T14:32:28.476742Z"
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 14:32:28 GMT 
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
    "code": "string",
    "createdAt": "2026-11-20T14:32:34.023Z"
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
/api/CountryTransfer


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "id": 0,
  "name": {
    "en": "string",
    "fr": "string",
    "ru": "string",
    "ro": "string",
    "it": "string"
  },
  "code": "string"
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
    "id": 0,
    "name": "string",
    "code": "string",
    "createdAt": "2026-11-20T14:32:34.037Z"
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
/api/CountryTransfer/{id}


Parameters
Try it out
Name	Description
id *
integer($int32)
(path)
id
Accept-Language
string
(header)
Default value : en

en
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
    "code": "string",
    "createdAt": "2026-11-20T14:32:34.049Z"
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
/api/CountryTransfer/{id}


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