review this and create a full plan for it if you have any questoin please provide them to me 
Transfer


POST
/api/Transfer/match


Parameters
Cancel
Name	Description
Accept-Language
string
(header)
en
currency
string
(query)
USD
Request body

application/json
{
  "fromLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "toLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "adults": 0,
  "children": 0,
  "tripType": 1
}
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
    "vehicleTypeTransferId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "vehicleName": "string",
    "fromPerson": 0,
    "toPerson": 0,
    "totalPersons": 0,
    "fromId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "fromLocation": "string",
    "toId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "toLocation": "string",
    "tripType": "string",
    "outboundPrice": 0,
    "returnPrice": 0,
    "currency": "string"
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

POST
/api/Transfer/preview


Parameters
Try it out
Name	Description
Accept-Language
string
(header)
Default value : en

en
currency
string
(query)
Default value : USD

USD
Request body

application/json
Example Value
Schema
{
  "fromLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "toLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "adults": 0,
  "children": 0,
  "tripType": 1,
  "additionalHours": 0
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
    "vehicleTypeTransferId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "vehicleName": "string",
    "fromPerson": 0,
    "toPerson": 0,
    "totalPersons": 0,
    "tripType": "string",
    "pricing": {
      "outboundPrice": 0,
      "returnPrice": 0,
      "combinedPrice": 0,
      "discountPercentage": 0,
      "discountAmount": 0,
      "additionalHours": 0,
      "additionalHoursCost": 0,
      "finalPrice": 0,
      "currency": "string"
    }
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
TransferBooking


POST
/api/TransferBooking/create


Parameters
Try it out
Name	Description
Accept-Language
string
(header)
Default value : en

en
currency
string
(query)
Default value : USD

USD
Request body

application/json
Example Value
Schema
{
  "fromLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "toLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "adults": 0,
  "children": 0,
  "tripType": 1,
  "tripDate": "2026-11-21T09:30:32.740Z",
  "tripTime": "string",
  "customerName": "string",
  "countryTransferId": 0,
  "email": "string",
  "communicationMethod": 0,
  "phoneNumber": "string",
  "luggageCount": 0,
  "notes": "string"
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
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "fromLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "fromLocationName": "string",
    "toLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "toLocationName": "string",
    "adults": 0,
    "children": 0,
    "totalPersons": 0,
    "tripType": "string",
    "tripDate": "2026-11-21T09:30:32.741Z",
    "tripTime": "string",
    "customerName": "string",
    "countryTransferId": 0,
    "countryTransferName": "string",
    "email": "string",
    "communicationMethod": 0,
    "phoneNumber": "string",
    "luggageCount": 0,
    "notes": "string",
    "vehicleTypeTransferId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "vehicleName": "string",
    "vehicleFromPerson": 0,
    "vehicleToPerson": 0,
    "pricing": {
      "outboundPriceUsd": 0,
      "returnPriceUsd": 0,
      "combinedPriceUsd": 0,
      "discountPercentage": 0,
      "discountAmountUsd": 0,
      "additionalHoursRateUsd": 0,
      "additionalHours": 0,
      "additionalHoursCostUsd": 0,
      "basePriceUsd": 0,
      "finalPriceUsd": 0,
      "currency": "string",
      "exchangeRate": 0,
      "finalPriceConverted": 0
    },
    "status": "string",
    "isCompleted": true,
    "completedAt": "2026-11-21T09:30:32.741Z",
    "createdAt": "2026-11-21T09:30:32.741Z",
    "updatedAt": "2026-11-21T09:30:32.741Z"
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

POST
/api/TransferBooking/{bookingId}/complete


Parameters
Try it out
Name	Description
bookingId *
string($uuid)
(path)
bookingId
Accept-Language
string
(header)
Default value : en

en
Request body

application/json
Example Value
Schema
{
  "additionalHours": 0
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
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "fromLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "fromLocationName": "string",
    "toLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "toLocationName": "string",
    "adults": 0,
    "children": 0,
    "totalPersons": 0,
    "tripType": "string",
    "tripDate": "2026-11-21T09:30:32.750Z",
    "tripTime": "string",
    "customerName": "string",
    "countryTransferId": 0,
    "countryTransferName": "string",
    "email": "string",
    "communicationMethod": 0,
    "phoneNumber": "string",
    "luggageCount": 0,
    "notes": "string",
    "vehicleTypeTransferId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "vehicleName": "string",
    "vehicleFromPerson": 0,
    "vehicleToPerson": 0,
    "pricing": {
      "outboundPriceUsd": 0,
      "returnPriceUsd": 0,
      "combinedPriceUsd": 0,
      "discountPercentage": 0,
      "discountAmountUsd": 0,
      "additionalHoursRateUsd": 0,
      "additionalHours": 0,
      "additionalHoursCostUsd": 0,
      "basePriceUsd": 0,
      "finalPriceUsd": 0,
      "currency": "string",
      "exchangeRate": 0,
      "finalPriceConverted": 0
    },
    "status": "string",
    "isCompleted": true,
    "completedAt": "2026-11-21T09:30:32.750Z",
    "createdAt": "2026-11-21T09:30:32.750Z",
    "updatedAt": "2026-11-21T09:30:32.750Z"
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
/api/TransferBooking/{id}


Parameters
Try it out
Name	Description
id *
string($uuid)
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
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "fromLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "fromLocationName": "string",
    "toLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "toLocationName": "string",
    "adults": 0,
    "children": 0,
    "totalPersons": 0,
    "tripType": "string",
    "tripDate": "2026-11-21T09:30:32.758Z",
    "tripTime": "string",
    "customerName": "string",
    "countryTransferId": 0,
    "countryTransferName": "string",
    "email": "string",
    "communicationMethod": 0,
    "phoneNumber": "string",
    "luggageCount": 0,
    "notes": "string",
    "vehicleTypeTransferId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "vehicleName": "string",
    "vehicleFromPerson": 0,
    "vehicleToPerson": 0,
    "pricing": {
      "outboundPriceUsd": 0,
      "returnPriceUsd": 0,
      "combinedPriceUsd": 0,
      "discountPercentage": 0,
      "discountAmountUsd": 0,
      "additionalHoursRateUsd": 0,
      "additionalHours": 0,
      "additionalHoursCostUsd": 0,
      "basePriceUsd": 0,
      "finalPriceUsd": 0,
      "currency": "string",
      "exchangeRate": 0,
      "finalPriceConverted": 0
    },
    "status": "string",
    "isCompleted": true,
    "completedAt": "2026-11-21T09:30:32.758Z",
    "createdAt": "2026-11-21T09:30:32.758Z",
    "updatedAt": "2026-11-21T09:30:32.758Z"
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
/api/TransferBooking


Parameters
Try it out
Name	Description
pageNumber
integer($int32)
(query)
Default value : 1

1
pageSize
integer($int32)
(query)
Default value : 10

10
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
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "fromLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "fromLocationName": "string",
      "toLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "toLocationName": "string",
      "adults": 0,
      "children": 0,
      "totalPersons": 0,
      "tripType": "string",
      "tripDate": "2026-11-21T09:30:32.767Z",
      "tripTime": "string",
      "customerName": "string",
      "countryTransferId": 0,
      "countryTransferName": "string",
      "email": "string",
      "communicationMethod": 0,
      "phoneNumber": "string",
      "luggageCount": 0,
      "notes": "string",
      "vehicleTypeTransferId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "vehicleName": "string",
      "vehicleFromPerson": 0,
      "vehicleToPerson": 0,
      "pricing": {
        "outboundPriceUsd": 0,
        "returnPriceUsd": 0,
        "combinedPriceUsd": 0,
        "discountPercentage": 0,
        "discountAmountUsd": 0,
        "additionalHoursRateUsd": 0,
        "additionalHours": 0,
        "additionalHoursCostUsd": 0,
        "basePriceUsd": 0,
        "finalPriceUsd": 0,
        "currency": "string",
        "exchangeRate": 0,
        "finalPriceConverted": 0
      },
      "status": "string",
      "isCompleted": true,
      "completedAt": "2026-11-21T09:30:32.767Z",
      "createdAt": "2026-11-21T09:30:32.767Z",
      "updatedAt": "2026-11-21T09:30:32.767Z"
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
/api/TransferBooking/status/{status}


Parameters
Try it out
Name	Description
status *
integer($int32)
(path)
Available values : 0, 1, 2, 3


0
pageNumber
integer($int32)
(query)
Default value : 1

1
pageSize
integer($int32)
(query)
Default value : 10

10
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
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "fromLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "fromLocationName": "string",
      "toLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "toLocationName": "string",
      "adults": 0,
      "children": 0,
      "totalPersons": 0,
      "tripType": "string",
      "tripDate": "2026-11-21T09:30:32.784Z",
      "tripTime": "string",
      "customerName": "string",
      "countryTransferId": 0,
      "countryTransferName": "string",
      "email": "string",
      "communicationMethod": 0,
      "phoneNumber": "string",
      "luggageCount": 0,
      "notes": "string",
      "vehicleTypeTransferId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "vehicleName": "string",
      "vehicleFromPerson": 0,
      "vehicleToPerson": 0,
      "pricing": {
        "outboundPriceUsd": 0,
        "returnPriceUsd": 0,
        "combinedPriceUsd": 0,
        "discountPercentage": 0,
        "discountAmountUsd": 0,
        "additionalHoursRateUsd": 0,
        "additionalHours": 0,
        "additionalHoursCostUsd": 0,
        "basePriceUsd": 0,
        "finalPriceUsd": 0,
        "currency": "string",
        "exchangeRate": 0,
        "finalPriceConverted": 0
      },
      "status": "string",
      "isCompleted": true,
      "completedAt": "2026-11-21T09:30:32.784Z",
      "createdAt": "2026-11-21T09:30:32.784Z",
      "updatedAt": "2026-11-21T09:30:32.784Z"
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
/api/TransferBooking/customer/{email}


Parameters
Try it out
Name	Description
email *
string
(path)
email
pageNumber
integer($int32)
(query)
Default value : 1

1
pageSize
integer($int32)
(query)
Default value : 10

10
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
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "fromLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "fromLocationName": "string",
      "toLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "toLocationName": "string",
      "adults": 0,
      "children": 0,
      "totalPersons": 0,
      "tripType": "string",
      "tripDate": "2026-11-21T09:30:32.794Z",
      "tripTime": "string",
      "customerName": "string",
      "countryTransferId": 0,
      "countryTransferName": "string",
      "email": "string",
      "communicationMethod": 0,
      "phoneNumber": "string",
      "luggageCount": 0,
      "notes": "string",
      "vehicleTypeTransferId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "vehicleName": "string",
      "vehicleFromPerson": 0,
      "vehicleToPerson": 0,
      "pricing": {
        "outboundPriceUsd": 0,
        "returnPriceUsd": 0,
        "combinedPriceUsd": 0,
        "discountPercentage": 0,
        "discountAmountUsd": 0,
        "additionalHoursRateUsd": 0,
        "additionalHours": 0,
        "additionalHoursCostUsd": 0,
        "basePriceUsd": 0,
        "finalPriceUsd": 0,
        "currency": "string",
        "exchangeRate": 0,
        "finalPriceConverted": 0
      },
      "status": "string",
      "isCompleted": true,
      "completedAt": "2026-11-21T09:30:32.794Z",
      "createdAt": "2026-11-21T09:30:32.794Z",
      "updatedAt": "2026-11-21T09:30:32.794Z"
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

PATCH
/api/TransferBooking/status


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
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
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "fromLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "fromLocationName": "string",
    "toLocationId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "toLocationName": "string",
    "adults": 0,
    "children": 0,
    "totalPersons": 0,
    "tripType": "string",
    "tripDate": "2026-11-21T09:30:32.804Z",
    "tripTime": "string",
    "customerName": "string",
    "countryTransferId": 0,
    "countryTransferName": "string",
    "email": "string",
    "communicationMethod": 0,
    "phoneNumber": "string",
    "luggageCount": 0,
    "notes": "string",
    "vehicleTypeTransferId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "vehicleName": "string",
    "vehicleFromPerson": 0,
    "vehicleToPerson": 0,
    "pricing": {
      "outboundPriceUsd": 0,
      "returnPriceUsd": 0,
      "combinedPriceUsd": 0,
      "discountPercentage": 0,
      "discountAmountUsd": 0,
      "additionalHoursRateUsd": 0,
      "additionalHours": 0,
      "additionalHoursCostUsd": 0,
      "basePriceUsd": 0,
      "finalPriceUsd": 0,
      "currency": "string",
      "exchangeRate": 0,
      "finalPriceConverted": 0
    },
    "status": "string",
    "isCompleted": true,
    "completedAt": "2026-11-21T09:30:32.804Z",
    "createdAt": "2026-11-21T09:30:32.804Z",
    "updatedAt": "2026-11-21T09:30:32.804Z"
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