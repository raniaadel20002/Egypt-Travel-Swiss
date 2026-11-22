Blogs


GET
/api/Blogs


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
  "data": [
    {
      "id": 0,
      "title": "string",
      "content": "string",
      "imageUrl": "string",
      "blogSections": [
        {
          "id": 0,
          "sectionNumber": 0,
          "title": "string",
          "content": "string",
          "imageUrl": "string",
          "blogId": 0
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
/api/Blogs


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "title": {
    "en": "string",
    "fr": "string",
    "ru": "string",
    "ro": "string",
    "it": "string"
  },
  "content": {
    "en": "string",
    "fr": "string",
    "ru": "string",
    "ro": "string",
    "it": "string"
  },
  "blogSections": [
    {
      "sectionNumber": 0,
      "title": {
        "en": "string",
        "fr": "string",
        "ru": "string",
        "ro": "string",
        "it": "string"
      },
      "content": {
        "en": "string",
        "fr": "string",
        "ru": "string",
        "ro": "string",
        "it": "string"
      }
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
    "title": "string",
    "content": "string",
    "imageUrl": "string",
    "blogSections": [
      {
        "id": 0,
        "sectionNumber": 0,
        "title": "string",
        "content": "string",
        "imageUrl": "string",
        "blogId": 0
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
/api/Blogs/{id}


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
    "title": "string",
    "content": "string",
    "imageUrl": "string",
    "blogSections": [
      {
        "id": 0,
        "sectionNumber": 0,
        "title": "string",
        "content": "string",
        "imageUrl": "string",
        "blogId": 0
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
/api/Blogs/{id}


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
  "title": {
    "en": "string",
    "fr": "string",
    "ru": "string",
    "ro": "string",
    "it": "string"
  },
  "content": {
    "en": "string",
    "fr": "string",
    "ru": "string",
    "ro": "string",
    "it": "string"
  },
  "blogSections": [
    {
      "id": 0,
      "title": {
        "en": "string",
        "fr": "string",
        "ru": "string",
        "ro": "string",
        "it": "string"
      },
      "sectionNumber": 0,
      "content": {
        "en": "string",
        "fr": "string",
        "ru": "string",
        "ro": "string",
        "it": "string"
      }
    }
  ]
}