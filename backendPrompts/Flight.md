 public enum FlightTripType
 {
     OneWay = 1,
     RoundTrip = 2
 }
note that
 public enum FlightBookingType
   {
       EgyptToCountry = 1, from counrty , city are nulls and the to counrty and cites should be seleted
       CountryToEgypt = 2, same as before but refresed
       Local = 3 evertyhing will be null from and to okay ?
   }
 public enum BaggageType
    {
        CarryOn = 1,
        PersonalItem = 2,
        CheckedBaggage = 3,
        SpecialBaggage = 4
    }
 public enum PassengerType
    {
        Adult = 1,
        Child = 2,
        Infant = 3
    }
    FlightBookings


POST
/api/FlightBookings


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "bookingType": 1,
  "tripType": 1,
  "fromCountryId": 0,
  "fromCityId": 0,
  "toCountryId": 0,
  "toCityId": 0,
  "departureAirport": "string",
  "arrivalAirport": "string",
  "departureDate": "2026-11-21T13:14:40.054Z",
  "returnDepartureAirport": "string",
  "returnArrivalAirport": "string",
  "returnDate": "2026-11-21T13:14:40.054Z",
  "numberOfPeople": 0,
  "passengers": [
    {
      "fullName": "string",
      "passportNumber": "string",
      "passengerType": 1,
      "baggages": [
        {
          "baggageType": 1,
          "quantity": 0,
          "weightPerItem": 0
        }
      ]
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
    "bookingType": 1,
    "tripType": 1,
    "fromCountryId": 0,
    "fromCountryName": "string",
    "fromCityId": 0,
    "fromCityName": "string",
    "toCountryId": 0,
    "toCountryName": "string",
    "toCityId": 0,
    "toCityName": "string",
    "departureAirport": "string",
    "arrivalAirport": "string",
    "departureDate": "2026-11-21T13:14:40.056Z",
    "returnDepartureAirport": "string",
    "returnArrivalAirport": "string",
    "returnDate": "2026-11-21T13:14:40.056Z",
    "numberOfPeople": 0,
    "passengers": [
      {
        "id": 0,
        "flightBookingId": 0,
        "fullName": "string",
        "passportNumber": "string",
        "passengerType": 1,
        "baggages": [
          {
            "id": 0,
            "flightPassengerId": 0,
            "baggageType": 1,
            "quantity": 0,
            "weightPerItem": 0
          }
        ]
      }
    ],
    "createdAt": "2026-11-21T13:14:40.056Z",
    "updatedAt": "2026-11-21T13:14:40.056Z"
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
/api/FlightBookings


Parameters
Try it out
Name	Description
BookingType
integer($int32)
(query)
Available values : 1, 2, 3


--
TripType
integer($int32)
(query)
Available values : 1, 2


--
FromCountryId
integer($int32)
(query)
FromCountryId
FromCityId
integer($int32)
(query)
FromCityId
ToCountryId
integer($int32)
(query)
ToCountryId
ToCityId
integer($int32)
(query)
ToCityId
DepartureDateFrom
string($date-time)
(query)
DepartureDateFrom
DepartureDateTo
string($date-time)
(query)
DepartureDateTo
ReturnDateFrom
string($date-time)
(query)
ReturnDateFrom
ReturnDateTo
string($date-time)
(query)
ReturnDateTo
MinPeople
integer($int32)
(query)
MinPeople
MaxPeople
integer($int32)
(query)
MaxPeople
Language
string
(query)
Language
PageNumber
integer($int32)
(query)
PageNumber
PageSize
integer($int32)
(query)
PageSize
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
      "bookingType": 1,
      "tripType": 1,
      "fromCountryId": 0,
      "fromCountryName": "string",
      "fromCityId": 0,
      "fromCityName": "string",
      "toCountryId": 0,
      "toCountryName": "string",
      "toCityId": 0,
      "toCityName": "string",
      "departureAirport": "string",
      "arrivalAirport": "string",
      "departureDate": "2026-11-21T13:14:40.074Z",
      "returnDepartureAirport": "string",
      "returnArrivalAirport": "string",
      "returnDate": "2026-11-21T13:14:40.074Z",
      "numberOfPeople": 0,
      "passengers": [
        {
          "id": 0,
          "flightBookingId": 0,
          "fullName": "string",
          "passportNumber": "string",
          "passengerType": 1,
          "baggages": [
            {
              "id": 0,
              "flightPassengerId": 0,
              "baggageType": 1,
              "quantity": 0,
              "weightPerItem": 0
            }
          ]
        }
      ],
      "createdAt": "2026-11-21T13:14:40.075Z",
      "updatedAt": "2026-11-21T13:14:40.075Z"
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
/api/FlightBookings/count


Parameters
Try it out
Name	Description
BookingType
integer($int32)
(query)
Available values : 1, 2, 3


--
TripType
integer($int32)
(query)
Available values : 1, 2


--
FromCountryId
integer($int32)
(query)
FromCountryId
FromCityId
integer($int32)
(query)
FromCityId
ToCountryId
integer($int32)
(query)
ToCountryId
ToCityId
integer($int32)
(query)
ToCityId
DepartureDateFrom
string($date-time)
(query)
DepartureDateFrom
DepartureDateTo
string($date-time)
(query)
DepartureDateTo
ReturnDateFrom
string($date-time)
(query)
ReturnDateFrom
ReturnDateTo
string($date-time)
(query)
ReturnDateTo
MinPeople
integer($int32)
(query)
MinPeople
MaxPeople
integer($int32)
(query)
MaxPeople
Language
string
(query)
Language
PageNumber
integer($int32)
(query)
PageNumber
PageSize
integer($int32)
(query)
PageSize
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
/api/FlightBookings/{id}


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
    "bookingType": 1,
    "tripType": 1,
    "fromCountryId": 0,
    "fromCountryName": "string",
    "fromCityId": 0,
    "fromCityName": "string",
    "toCountryId": 0,
    "toCountryName": "string",
    "toCityId": 0,
    "toCityName": "string",
    "departureAirport": "string",
    "arrivalAirport": "string",
    "departureDate": "2026-11-21T13:14:40.096Z",
    "returnDepartureAirport": "string",
    "returnArrivalAirport": "string",
    "returnDate": "2026-11-21T13:14:40.096Z",
    "numberOfPeople": 0,
    "passengers": [
      {
        "id": 0,
        "flightBookingId": 0,
        "fullName": "string",
        "passportNumber": "string",
        "passengerType": 1,
        "baggages": [
          {
            "id": 0,
            "flightPassengerId": 0,
            "baggageType": 1,
            "quantity": 0,
            "weightPerItem": 0
          }
        ]
      }
    ],
    "createdAt": "2026-11-21T13:14:40.096Z",
    "updatedAt": "2026-11-21T13:14:40.096Z"
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
/api/FlightBookings/{id}


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
  "bookingType": 1,
  "tripType": 1,
  "fromCountryId": 0,
  "fromCityId": 0,
  "toCountryId": 0,
  "toCityId": 0,
  "departureAirport": "string",
  "arrivalAirport": "string",
  "departureDate": "2026-11-21T13:14:40.104Z",
  "returnDepartureAirport": "string",
  "returnArrivalAirport": "string",
  "returnDate": "2026-11-21T13:14:40.104Z",
  "numberOfPeople": 0,
  "passengers": [
    {
      "fullName": "string",
      "passportNumber": "string",
      "passengerType": 1,
      "baggages": [
        {
          "baggageType": 1,
          "quantity": 0,
          "weightPerItem": 0
        }
      ]
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
    "bookingType": 1,
    "tripType": 1,
    "fromCountryId": 0,
    "fromCountryName": "string",
    "fromCityId": 0,
    "fromCityName": "string",
    "toCountryId": 0,
    "toCountryName": "string",
    "toCityId": 0,
    "toCityName": "string",
    "departureAirport": "string",
    "arrivalAirport": "string",
    "departureDate": "2026-11-21T13:14:40.105Z",
    "returnDepartureAirport": "string",
    "returnArrivalAirport": "string",
    "returnDate": "2026-11-21T13:14:40.105Z",
    "numberOfPeople": 0,
    "passengers": [
      {
        "id": 0,
        "flightBookingId": 0,
        "fullName": "string",
        "passportNumber": "string",
        "passengerType": 1,
        "baggages": [
          {
            "id": 0,
            "flightPassengerId": 0,
            "baggageType": 1,
            "quantity": 0,
            "weightPerItem": 0
          }
        ]
      }
    ],
    "createdAt": "2026-11-21T13:14:40.105Z",
    "updatedAt": "2026-11-21T13:14:40.105Z"
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
/api/FlightBookings/{id}


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