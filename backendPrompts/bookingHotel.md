HotelBookings


POST
/api/HotelBookings


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "hotelId": 0,
  "name": "string",
  "email": "string",
  "whatsApp": "string",
  "nationality": "string",
  "adults": 0,
  "children": 0,
  "infants": 0,
  "nightsCount": 0,
  "bookingDate": "2026-11-21T11:47:57.278Z",
  "rooms": [
    {
      "ratePlanId": 0,
      "adults": 0,
      "children": 0,
      "infants": 0
    }
  ]
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
    "email": "string",
    "whatsApp": "string",
    "nationality": "string",
    "adults": 0,
    "children": 0,
    "infants": 0,
    "nightsCount": 0,
    "roomsCount": 0,
    "bookingDate": "2026-11-21T11:47:57.280Z",
    "status": "string",
    "createdAt": "2026-11-21T11:47:57.280Z",
    "updatedAt": "2026-11-21T11:47:57.280Z",
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
Try it out
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
Available values : 0, 1, 2, 3


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
      "bookingDate": "2026-11-21T11:47:57.290Z",
      "status": "string",
      "createdAt": "2026-11-21T11:47:57.290Z",
      "updatedAt": "2026-11-21T11:47:57.290Z",
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
Try it out
Name	Description
id *
integer($int32)
(path)
id
language
string
(query)
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
    "bookingDate": "2026-11-21T11:47:57.298Z",
    "status": "string",
    "createdAt": "2026-11-21T11:47:57.298Z",
    "updatedAt": "2026-11-21T11:47:57.298Z",
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
  "status": 0
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
    "email": "string",
    "whatsApp": "string",
    "nationality": "string",
    "adults": 0,
    "children": 0,
    "infants": 0,
    "nightsCount": 0,
    "roomsCount": 0,
    "bookingDate": "2026-11-21T11:47:57.312Z",
    "status": "string",
    "createdAt": "2026-11-21T11:47:57.312Z",
    "updatedAt": "2026-11-21T11:47:57.312Z",
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