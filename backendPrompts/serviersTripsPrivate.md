Services


GET
/api/Services


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
  'https://touristy.runasp.net/api/Services' \
  -H 'accept: text/plain' \
  -H 'Accept-Language: en' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk1MTE1NjAzfQ.5QjMVkghDVsXzICyilPAEzm19T5ta4GpYrvY8TPYeyU'
Request URL
https://touristy.runasp.net/api/Services
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Services Data",
  "data": [
    {
      "id": 2,
      "name": "stringen",
      "description": "stringen",
      "adultPrice": 10,
      "childPrice": 0,
      "infPrice": 0,
      "createdAt": "2026-11-19T17:55:15.9771288",
      "images": []
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 17:55:49 GMT 
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
      "description": "string",
      "adultPrice": 0,
      "childPrice": 0,
      "infPrice": 0,
      "createdAt": "2026-11-19T17:55:49.822Z",
      "images": [
        {
          "id": 0,
          "imageUrl": "string"
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
/api/Services


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "name": {
    "en": "stringen",
    "fr": "stringfr",
    "ru": "stringru",
    "ro": "stringro",
    "it": "stringit"
  },
  "description": {
    "en": "stringen",
    "fr": "stringfr",
    "ru": "stringru",
    "ro": "stringro",
    "it": "stringit"
  },
  "adultPrice": 10,
  "childPrice": 0,
  "infPrice": 0
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristy.runasp.net/api/Services' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk1MTE1NjAzfQ.5QjMVkghDVsXzICyilPAEzm19T5ta4GpYrvY8TPYeyU' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": {
    "en": "stringen",
    "fr": "stringfr",
    "ru": "stringru",
    "ro": "stringro",
    "it": "stringit"
  },
  "description": {
    "en": "stringen",
    "fr": "stringfr",
    "ru": "stringru",
    "ro": "stringro",
    "it": "stringit"
  },
  "adultPrice": 10,
  "childPrice": 0,
  "infPrice": 0
}'
Request URL
https://touristy.runasp.net/api/Services
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Service Created Successfully",
  "data": {
    "id": 2,
    "name": "stringen",
    "description": "stringen",
    "adultPrice": 10,
    "childPrice": 0,
    "infPrice": 0,
    "createdAt": "2026-11-19T17:55:15.9771288Z",
    "images": []
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 17:55:15 GMT 
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
    "description": "string",
    "adultPrice": 0,
    "childPrice": 0,
    "infPrice": 0,
    "createdAt": "2026-11-19T17:55:49.829Z",
    "images": [
      {
        "id": 0,
        "imageUrl": "string"
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
/api/Services


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
  "description": {
    "en": "string",
    "fr": "string",
    "ru": "string",
    "ro": "string",
    "it": "string"
  },
  "adultPrice": 0,
  "childPrice": 0,
  "infPrice": 0
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
    "description": "string",
    "adultPrice": 0,
    "childPrice": 0,
    "infPrice": 0,
    "createdAt": "2026-11-19T17:55:49.846Z",
    "images": [
      {
        "id": 0,
        "imageUrl": "string"
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
/api/Services/{id}


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
  'https://touristy.runasp.net/api/Services/1' \
  -H 'accept: text/plain' \
  -H 'Accept-Language: en' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk1MTE1NjAzfQ.5QjMVkghDVsXzICyilPAEzm19T5ta4GpYrvY8TPYeyU'
Request URL
https://touristy.runasp.net/api/Services/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Service Data For Id 1",
  "data": {
    "id": 1,
    "name": "stringen",
    "description": "stringen",
    "adultPrice": 10,
    "childPrice": 0,
    "infPrice": 0,
    "createdAt": "2026-11-19T17:40:07.8504474",
    "images": [
      {
        "id": 1,
        "imageUrl": "images/Services/9585a8f7-3094-480c-a42c-7512a4c12720.webp"
      }
    ]
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 17:44:21 GMT 
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
    "description": "string",
    "adultPrice": 0,
    "childPrice": 0,
    "infPrice": 0,
    "createdAt": "2026-11-19T17:55:49.854Z",
    "images": [
      {
        "id": 0,
        "imageUrl": "string"
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
/api/Services/{id}


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
  'https://touristy.runasp.net/api/Services/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk1MTE1NjAzfQ.5QjMVkghDVsXzICyilPAEzm19T5ta4GpYrvY8TPYeyU'
Request URL
https://touristy.runasp.net/api/Services/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Service Deleted Successfully",
  "data": ""
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 17:45:30 GMT 
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

POST
/api/Services/{id}/image


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
Images
array
No file chosen-
No file chosen-
Add string item
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristy.runasp.net/api/Services/1/image' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk1MTE1NjAzfQ.5QjMVkghDVsXzICyilPAEzm19T5ta4GpYrvY8TPYeyU' \
  -H 'Content-Type: multipart/form-data' \
  -F 'Images=@image4.jpg;type=image/jpeg' \
  -F 'Images=@image3.jpg;type=image/jpeg'
Request URL
https://touristy.runasp.net/api/Services/1/image
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Images Uploaded Successfully",
  "data": [
    {
      "id": 1,
      "imageUrl": "images/Services/9585a8f7-3094-480c-a42c-7512a4c12720.webp"
    },
    {
      "id": 2,
      "imageUrl": "images/Services/d71d93f5-a879-4f71-ab3f-52e2f5503912.webp"
    }
  ]
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 17:40:34 GMT 
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

DELETE
/api/Services/{id}/image/{imageId}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
1
imageId *
integer($int32)
(path)
2
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristy.runasp.net/api/Services/1/image/2' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk1MTE1NjAzfQ.5QjMVkghDVsXzICyilPAEzm19T5ta4GpYrvY8TPYeyU'
Request URL
https://touristy.runasp.net/api/Services/1/image/2
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Image Deleted Successfully",
  "data": ""
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 17:40:44 GMT 
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
/api/Services/{id}/images


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
  'https://touristy.runasp.net/api/Services/1/images' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk1MTE1NjAzfQ.5QjMVkghDVsXzICyilPAEzm19T5ta4GpYrvY8TPYeyU'
Request URL
https://touristy.runasp.net/api/Services/1/images
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Service Images For Id 1",
  "data": [
    {
      "id": 1,
      "imageUrl": "images/Services/9585a8f7-3094-480c-a42c-7512a4c12720.webp"
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 17:40:52 GMT 
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
/api/Services/trip/{tripId}/associate


Parameters
Cancel
Reset
Name	Description
tripId *
integer($int32)
(path)
1
Request body

application/json
[
  2
]
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristy.runasp.net/api/Services/trip/1/associate' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk1MTE1NjAzfQ.5QjMVkghDVsXzICyilPAEzm19T5ta4GpYrvY8TPYeyU' \
  -H 'Content-Type: application/json' \
  -d '[
  2
]'
Request URL
https://touristy.runasp.net/api/Services/trip/1/associate
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Services Associated With Trip Successfully",
  "data": ""
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 17:55:24 GMT 
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
/api/Services/trip/{tripId}


Parameters
Cancel
Name	Description
tripId *
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
  'https://touristy.runasp.net/api/Services/trip/1' \
  -H 'accept: text/plain' \
  -H 'Accept-Language: en' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk1MTE1NjAzfQ.5QjMVkghDVsXzICyilPAEzm19T5ta4GpYrvY8TPYeyU'
Request URL
https://touristy.runasp.net/api/Services/trip/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Services For Trip Id 1",
  "data": [
    {
      "id": 2,
      "name": "stringen",
      "description": "stringen",
      "adultPrice": 10,
      "childPrice": 0,
      "infPrice": 0,
      "createdAt": "2026-11-19T17:55:15.9771288",
      "images": []
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 17:55:28 GMT 
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
      "description": "string",
      "adultPrice": 0,
      "childPrice": 0,
      "infPrice": 0,
      "createdAt": "2026-11-19T17:55:49.898Z",
      "images": [
        {
          "id": 0,
          "imageUrl": "string"
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