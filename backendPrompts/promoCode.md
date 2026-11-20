PromoCodes


GET
/api/PromoCodes


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
  'https://touristy.runasp.net/api/PromoCodes' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4'
Request URL
https://touristy.runasp.net/api/PromoCodes
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "PromoCodes Data",
  "data": [
    {
      "id": 1,
      "code": 903878,
      "discountEuro": 10,
      "discountpercent": 0,
      "limited": 20,
      "tripId": 0,
      "tripName": null,
      "tripType": null,
      "priceForChild": 0,
      "priceForAdult": 0,
      "createdAt": null,
      "createdBy": "Karim Ayman"
    },
    {
      "id": 2,
      "code": 821418,
      "discountEuro": 0,
      "discountpercent": 20,
      "limited": 20,
      "tripId": 1,
      "tripName": "Abu Dabbab Snorkeling Trip",
      "tripType": "test",
      "priceForChild": 120,
      "priceForAdult": 150,
      "createdAt": "2026-11-19T16:41:55.1977944",
      "createdBy": "Karim Ayman"
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 13:27:35 GMT 
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
      "code": 0,
      "discountEuro": 0,
      "discountpercent": 0,
      "limited": 0,
      "tripId": 0,
      "tripName": "string",
      "tripType": "string",
      "priceForChild": 0,
      "priceForAdult": 0,
      "createdAt": "2026-11-20T13:28:20.164Z",
      "createdBy": "string"
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
/api/PromoCodes


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "discountEuro": null,
  "discountpercent": 20,
  "limited": 20,
  "tripId": 1
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristy.runasp.net/api/PromoCodes' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4' \
  -H 'Content-Type: application/json' \
  -d '{
  "discountEuro": null,
  "discountpercent": 20,
  "limited": 20,
  "tripId": 1
}'
Request URL
https://touristy.runasp.net/api/PromoCodes
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "PromoCode Created Successfuly",
  "data": {
    "id": 2,
    "code": 821418
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 13:27:29 GMT 
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
    "code": 0
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
/api/PromoCodes/nonrelatedtrip


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
  'https://touristy.runasp.net/api/PromoCodes/nonrelatedtrip' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4'
Request URL
https://touristy.runasp.net/api/PromoCodes/nonrelatedtrip
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "PromoCodes Data",
  "data": [
    {
      "id": 1,
      "code": 903878,
      "discountEuro": 10,
      "discountpercent": 0,
      "limited": 20,
      "isActived": true
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 13:27:45 GMT 
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
      "code": 0,
      "discountEuro": 0,
      "discountpercent": 0,
      "limited": 0,
      "isActived": true
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
/api/PromoCodes/relatedtrip


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
  'https://touristy.runasp.net/api/PromoCodes/relatedtrip' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4'
Request URL
https://touristy.runasp.net/api/PromoCodes/relatedtrip
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "PromoCodes Data",
  "data": [
    {
      "id": 2,
      "code": 821418,
      "discountEuro": 0,
      "discountpercent": 20,
      "limited": 20,
      "tripId": 1,
      "tripName": "Abu Dabbab Snorkeling Trip",
      "tripType": "test",
      "priceForChild": 120,
      "priceForAdult": 150,
      "createdAt": "2026-11-19T16:41:55.1977944",
      "createdBy": "Karim Ayman"
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 13:27:51 GMT 
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
      "code": 0,
      "discountEuro": 0,
      "discountpercent": 0,
      "limited": 0,
      "tripId": 0,
      "tripName": "string",
      "tripType": "string",
      "priceForChild": 0,
      "priceForAdult": 0,
      "createdAt": "2026-11-20T13:28:20.185Z",
      "createdBy": "string"
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
/api/PromoCodes/{id}


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
  'https://touristy.runasp.net/api/PromoCodes/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4'
Request URL
https://touristy.runasp.net/api/PromoCodes/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "PromoCode Data For Id 1",
  "data": {
    "id": 1,
    "code": 903878,
    "discountEuro": 10,
    "discountpercent": 0,
    "limited": 20,
    "tripId": 0,
    "tripName": null,
    "tripType": null,
    "priceForChild": 0,
    "priceForAdult": 0,
    "createdAt": null,
    "createdBy": "Karim Ayman"
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 13:28:09 GMT 
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
    "code": 0,
    "discountEuro": 0,
    "discountpercent": 0,
    "limited": 0,
    "tripId": 0,
    "tripName": "string",
    "tripType": "string",
    "priceForChild": 0,
    "priceForAdult": 0,
    "createdAt": "2026-11-20T13:28:20.192Z",
    "createdBy": "string"
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
/api/PromoCodes/code/{Code}


Parameters
Cancel
Name	Description
Code *
number($double)
(path)
903878
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/PromoCodes/code/903878' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4'
Request URL
https://touristy.runasp.net/api/PromoCodes/code/903878
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "PromoCode Data For Id 1",
  "data": {
    "id": 1,
    "code": 903878,
    "discountEuro": 10,
    "discountpercent": 0,
    "limited": 20,
    "tripId": 0,
    "tripName": null,
    "tripType": null,
    "priceForChild": 0,
    "priceForAdult": 0,
    "createdAt": null,
    "createdBy": "Karim Ayman"
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 13:28:19 GMT 
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
    "code": 0,
    "discountEuro": 0,
    "discountpercent": 0,
    "limited": 0,
    "tripId": 0,
    "tripName": "string",
    "tripType": "string",
    "priceForChild": 0,
    "priceForAdult": 0,
    "createdAt": "2026-11-20T13:28:20.200Z",
    "createdBy": "string"
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