RatePlans


GET
/api/RatePlans


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
Language
string
(query)
Language
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/RatePlans' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTcyMTM3OX0.ltb4GXqFUl3TuOZ7CWEm0G39BVs7mWQ-8yM96PqYtbk'
Request URL
https://touristy.runasp.net/api/RatePlans
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Rate plans retrieved successfully",
  "data": [
    {
      "id": 2,
      "hotelId": 2,
      "hotelName": "Red Sea Paradise Resort",
      "name": "All Inclusive Package",
      "description": "Enjoy a complete holiday experience with comfortable accommodation, daily breakfast, lunch and dinner, unlimited soft drinks, access to swimming pools and private beach facilities, and a variety of recreational activities.",
      "createdAt": "2026-11-19T19:30:39.8359785",
      "updatedAt": null
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 19:30:43 GMT 
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
      "description": "string",
      "createdAt": "2026-11-19T19:30:43.565Z",
      "updatedAt": "2026-11-19T19:30:43.565Z"
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
/api/RatePlans


Parameters
Cancel
Reset
No parameters

Request body

application/json

{
  "hotelId": 2,
  "name": {
    "en": "All Inclusive Package",
    "fr": "Forfait Tout Compris",
    "ru": "Пакет «Всё включено»",
    "ro": "Pachet All Inclusive",
    "it": "Pacchetto All Inclusive"
  },
  "description": {
    "en": "Enjoy a complete holiday experience with comfortable accommodation, daily breakfast, lunch and dinner, unlimited soft drinks, access to swimming pools and private beach facilities, and a variety of recreational activities.",
    "fr": "Profitez de vacances complètes avec un hébergement confortable, le petit-déjeuner, le déjeuner et le dîner quotidiens, des boissons sans alcool à volonté, l'accès aux piscines et à la plage privée, ainsi que diverses activités de loisirs.",
    "ru": "Насладитесь полноценным отдыхом с комфортным проживанием, ежедневным завтраком, обедом и ужином, неограниченным количеством безалкогольных напитков, доступом к бассейнам и частному пляжу, а также различными развлечениями.",
    "ro": "Bucurați-vă de o vacanță completă cu cazare confortabilă, mic dejun, prânz și cină zilnic, băuturi răcoritoare nelimitate, acces la piscine și plaja privată, precum și diverse activități recreative.",
    "it": "Godetevi una vacanza completa con sistemazione confortevole, colazione, pranzo e cena giornalieri, bevande analcoliche illimitate, accesso alle piscine e alla spiaggia privata, oltre a diverse attività ricreative."
  }
}

Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristy.runasp.net/api/RatePlans' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTcyMTM3OX0.ltb4GXqFUl3TuOZ7CWEm0G39BVs7mWQ-8yM96PqYtbk' \
  -H 'Content-Type: application/json' \
  -d '
{
  "hotelId": 2,
  "name": {
    "en": "All Inclusive Package",
    "fr": "Forfait Tout Compris",
    "ru": "Пакет «Всё включено»",
    "ro": "Pachet All Inclusive",
    "it": "Pacchetto All Inclusive"
  },
  "description": {
    "en": "Enjoy a complete holiday experience with comfortable accommodation, daily breakfast, lunch and dinner, unlimited soft drinks, access to swimming pools and private beach facilities, and a variety of recreational activities.",
    "fr": "Profitez de vacances complètes avec un hébergement confortable, le petit-déjeuner, le déjeuner et le dîner quotidiens, des boissons sans alcool à volonté, l'\''accès aux piscines et à la plage privée, ainsi que diverses activités de loisirs.",
    "ru": "Насладитесь полноценным отдыхом с комфортным проживанием, ежедневным завтраком, обедом и ужином, неограниченным количеством безалкогольных напитков, доступом к бассейнам и частному пляжу, а также различными развлечениями.",
    "ro": "Bucurați-vă de o vacanță completă cu cazare confortabilă, mic dejun, prânz și cină zilnic, băuturi răcoritoare nelimitate, acces la piscine și plaja privată, precum și diverse activități recreative.",
    "it": "Godetevi una vacanza completa con sistemazione confortevole, colazione, pranzo e cena giornalieri, bevande analcoliche illimitate, accesso alle piscine e alla spiaggia privata, oltre a diverse attività ricreative."
  }
}
'
Request URL
https://touristy.runasp.net/api/RatePlans
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Rate plan created successfully with ID 2",
  "data": {
    "id": 2,
    "hotelId": 2,
    "hotelName": "Red Sea Paradise Resort",
    "name": "All Inclusive Package",
    "description": "Enjoy a complete holiday experience with comfortable accommodation, daily breakfast, lunch and dinner, unlimited soft drinks, access to swimming pools and private beach facilities, and a variety of recreational activities.",
    "createdAt": "2026-11-19T19:30:39.8359785Z",
    "updatedAt": null
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 19:30:39 GMT 
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
    "description": "string",
    "createdAt": "2026-11-19T19:30:43.574Z",
    "updatedAt": "2026-11-19T19:30:43.574Z"
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
/api/RatePlans/{id}


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
  'https://touristy.runasp.net/api/RatePlans/1?language=en' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTcyMTM3OX0.ltb4GXqFUl3TuOZ7CWEm0G39BVs7mWQ-8yM96PqYtbk'
Request URL
https://touristy.runasp.net/api/RatePlans/1?language=en
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Rate plan with ID 1 retrieved successfully",
  "data": {
    "id": 1,
    "hotelId": 2,
    "hotelName": "Red Sea Paradise Resort",
    "name": "All Inclusive Package",
    "description": "Enjoy a complete holiday experience with comfortable accommodation, daily breakfast, lunch and dinner, unlimited soft drinks, access to swimming pools and private beach facilities, and a variety of recreational activities.",
    "createdAt": "2026-11-19T19:30:00.8937265",
    "updatedAt": null
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 19:30:09 GMT 
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
    "description": "string",
    "createdAt": "2026-11-19T19:30:43.583Z",
    "updatedAt": "2026-11-19T19:30:43.583Z"
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
/api/RatePlans/{id}


Parameters
Try it out
Name	Description
id *
integer($int32)
(path)
id
Request body

application/json
Example Value
Schema
{
  "id": 0,
  "hotelId": 0,
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
    "hotelId": 0,
    "hotelName": "string",
    "name": "string",
    "description": "string",
    "createdAt": "2026-11-19T19:30:43.589Z",
    "updatedAt": "2026-11-19T19:30:43.589Z"
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
/api/RatePlans/{id}


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
  'https://touristy.runasp.net/api/RatePlans/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTcyMTM3OX0.ltb4GXqFUl3TuOZ7CWEm0G39BVs7mWQ-8yM96PqYtbk'
Request URL
https://touristy.runasp.net/api/RatePlans/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Rate plan with ID 1 deleted successfully",
  "data": ""
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 19:30:31 GMT 
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