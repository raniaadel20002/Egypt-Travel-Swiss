here we will create a full plan on how the pricing will work you should understand that as we will be working on it
the goups trips the transfer is not counted but the private the trasnfer is counted that is what we are wokring on right now when we create a private trip the pricing for it should be set to 0 as the price is the serviers it has + transfer itself
but the gourps we could have serviers or not but we don't have the transfer to it so it's the price of the trip + servers okay?
now for the things we are doing right is we are setting the vhicales we have for the private trips + the pricing for them okay please review this and create a full plan for it as after that we will work on the booking but before that we should set the pricing right 
PrivateVehicles


GET
/api/PrivateVehicles


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
  'https://touristy.runasp.net/api/PrivateVehicles' \
  -H 'accept: text/plain' \
  -H 'Accept-Language: en' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4'
Request URL
https://touristy.runasp.net/api/PrivateVehicles
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Private Vehicles Data",
  "data": [
    {
      "id": 1,
      "name": "Standard Sedan"
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 14:05:55 GMT 
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
      "name": "string"
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
/api/PrivateVehicles


Parameters
Cancel
Reset
No parameters

Request body

application/json

{
  "name": {
    "en": "Standard Sedan",
    "fr": "Berline Standard",
    "ru": "Стандартный седан",
    "ro": "Sedan Standard",
    "it": "Berlina Standard"
  }
}

Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristy.runasp.net/api/PrivateVehicles' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4' \
  -H 'Content-Type: application/json' \
  -d '
{
  "name": {
    "en": "Standard Sedan",
    "fr": "Berline Standard",
    "ru": "Стандартный седан",
    "ro": "Sedan Standard",
    "it": "Berlina Standard"
  }
}
'
Request URL
https://touristy.runasp.net/api/PrivateVehicles
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Private Vehicle Created Successfully",
  "data": {
    "id": 1,
    "name": "Standard Sedan"
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 14:05:50 GMT 
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
    "name": "string"
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
/api/PrivateVehicles


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
  }
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
    "name": "string"
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
/api/PrivateVehicles/{id}


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
    "name": "string"
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
/api/PrivateVehicles/{id}


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
PrivateVehicleTransfers


GET
/api/PrivateVehicleTransfers


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
tripId
integer($int32)
(query)
tripId
vehicleId
integer($int32)
(query)
vehicleId
Accept-Language
string
(header)
en
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/PrivateVehicleTransfers' \
  -H 'accept: text/plain' \
  -H 'Accept-Language: en' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4'
Request URL
https://touristy.runasp.net/api/PrivateVehicleTransfers
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Private Vehicle Transfers Data",
  "data": [
    {
      "id": 1,
      "tripId": 2,
      "tripName": "string",
      "privateVehicleId": 1,
      "vehicleName": "Standard Sedan",
      "from": 1,
      "to": 4,
      "price": 20
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 14:06:50 GMT 
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
      "tripId": 0,
      "tripName": "string",
      "privateVehicleId": 0,
      "vehicleName": "string",
      "from": 0,
      "to": 0,
      "price": 0
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
/api/PrivateVehicleTransfers


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "tripId": 2,
  "privateVehicleId": 1,
  "from": 1,
  "to": 4,
  "price": 20
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristy.runasp.net/api/PrivateVehicleTransfers' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4' \
  -H 'Content-Type: application/json' \
  -d '{
  "tripId": 2,
  "privateVehicleId": 1,
  "from": 1,
  "to": 4,
  "price": 20
}'
Request URL
https://touristy.runasp.net/api/PrivateVehicleTransfers
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Private Vehicle Transfer Created Successfully",
  "data": {
    "id": 1,
    "tripId": 2,
    "tripName": "string",
    "privateVehicleId": 1,
    "vehicleName": "Standard Sedan",
    "from": 1,
    "to": 4,
    "price": 20
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 14:06:44 GMT 
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
    "tripId": 0,
    "tripName": "string",
    "privateVehicleId": 0,
    "vehicleName": "string",
    "from": 0,
    "to": 0,
    "price": 0
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
/api/PrivateVehicleTransfers


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "id": 0,
  "tripId": 0,
  "privateVehicleId": 0,
  "from": 0,
  "to": 0,
  "price": 0
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
    "tripId": 0,
    "tripName": "string",
    "privateVehicleId": 0,
    "vehicleName": "string",
    "from": 0,
    "to": 0,
    "price": 0
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
/api/PrivateVehicleTransfers/{id}


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
    "tripId": 0,
    "tripName": "string",
    "privateVehicleId": 0,
    "vehicleName": "string",
    "from": 0,
    "to": 0,
    "price": 0
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
/api/PrivateVehicleTransfers/{id}


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

GET
/api/PrivateVehicleTransfers/match


Parameters
Cancel
Name	Description
tripId
integer($int32)
(query)
2
persons
integer($int32)
(query)
3
Accept-Language
string
(header)
en
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/PrivateVehicleTransfers/match?tripId=2&persons=3' \
  -H 'accept: text/plain' \
  -H 'Accept-Language: en' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4'
Request URL
https://touristy.runasp.net/api/PrivateVehicleTransfers/match?tripId=2&persons=3
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Matching Private Vehicle Transfers",
  "data": [
    {
      "id": 1,
      "tripId": 2,
      "privateVehicleId": 1,
      "vehicleName": "Standard Sedan",
      "from": 1,
      "to": 4,
      "price": 20
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 14:07:06 GMT 
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
      "tripId": 0,
      "privateVehicleId": 0,
      "vehicleName": "string",
      "from": 0,
      "to": 0,
      "price": 0
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