public enum TripCategory 
    {
        Normal = 0,
        Private = 1
    }

 public enum DurationType
    {
        Hours = 0,
        Days = 1
    }

the durationValue is the values for the hours or the days is it 5 mean the value of the days or the hours okay?

the tripTypeId should be fetched from the other endpoint okay also as the destinationId okay?

please create a full plan for it okay 


Trips


GET
/api/Trips


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
MinPrice
number($double)
(query)
MinPrice
MaxPrice
number($double)
(query)
MaxPrice
TypeId
integer($int32)
(query)
TypeId
DestinationId
integer($int32)
(query)
DestinationId
SearchItem
string
(query)
SearchItem
Category
integer($int32)
(query)
Category
includeInactive
boolean
(query)

false
Accept-Language
string
(header)
en
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/Trips?includeInactive=false' \
  -H 'accept: text/plain' \
  -H 'Accept-Language: en'
Request URL
https://touristy.runasp.net/api/Trips?includeInactive=false
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Trips Data",
  "data": [
    {
      "id": 1,
      "markerID": "266451",
      "destinationInfo": {
        "id": 2,
        "name": "stringen",
        "imageUrl": null,
        "isFeatured": true
      },
      "destination": null,
      "name": "Abu Dabbab Snorkeling Trip",
      "description": "Discover the beautiful Abu Dabbab Beach, famous for its crystal-clear waters, colorful marine life, and sea turtles. Enjoy a relaxing beach day with snorkeling, explore the underwater world with a professional snorkeling guide, and experience one of the most beautiful beaches of the Red Sea.",
      "timeFrom": "07:00:00",
      "durationValue": 12,
      "durationTypeName": "Hours",
      "adultPrice": 150,
      "childPrice": 120,
      "infPrice": 0,
      "currencyName": "EUR",
      "categoryName": "Private",
      "isActive": true,
      "tripTypeName": "test",
      "createdBy": "Karim Ayman",
      "createdAt": "2026-11-19T16:41:55.1977944",
      "highlights": [
        "Visit the beautiful Abu Dabbab Beach",
        "Discover colorful marine life",
        "Enjoy snorkeling with a professional guide",
        "Relax on one of the Red Sea's beautiful beaches"
      ],
      "includes": [
        "Round-trip transfer",
        "All entrance fees",
        "Beach access and facilities",
        "Bottled water",
        "Professional snorkeling guide",
        "Snorkeling equipment"
      ],
      "excludes": [
        "Personal expenses",
        "Any services not mentioned in the inclusions"
      ],
      "whatToBring": [
        "Swimwear",
        "Towel",
        "Sunscreen",
        "Sunglasses and hat"
      ],
      "availableDays": [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "images": [
        {
          "id": 1,
          "imageUrl": "images/Trips/95a6792d-ff0f-4dc1-b987-ac2da559d1c8.webp",
          "isPrimary": false
        },
        {
          "id": 2,
          "imageUrl": "images/Trips/11f0e35b-4f3f-4790-907a-350e46616bba.webp",
          "isPrimary": true
        }
      ]
    }
  ]
}

POST
/api/Trips


Parameters
Cancel
Reset
No parameters

Request body

application/json

{
  "destinationId": 2,
  "name": {
    "en": "Abu Dabbab Snorkeling Trip",
    "fr": "Excursion de plongée avec tuba à Abu Dabbab",
    "ru": "Экскурсия с маской и трубкой в Абу-Дабаб",
    "ro": "Excursie de snorkeling la Abu Dabbab",
    "it": "Escursione di snorkeling ad Abu Dabbab"
  },
  "description": {
    "en": "Discover the beautiful Abu Dabbab Beach, famous for its crystal-clear waters, colorful marine life, and sea turtles. Enjoy a relaxing beach day with snorkeling, explore the underwater world with a professional snorkeling guide, and experience one of the most beautiful beaches of the Red Sea.",
    "fr": "Découvrez la magnifique plage d'Abu Dabbab, célèbre pour ses eaux cristallines, sa vie marine colorée et ses tortues de mer. Profitez d'une journée de détente à la plage avec une séance de snorkeling, explorez le monde sous-marin avec un guide professionnel et découvrez l'une des plus belles plages de la mer Rouge.",
    "ru": "Откройте для себя прекрасный пляж Абу-Дабаб, известный кристально чистой водой, красочным подводным миром и морскими черепахами. Насладитесь отдыхом на пляже, займитесь снорклингом с профессиональным гидом и откройте для себя один из самых красивых пляжей Красного моря.",
    "ro": "Descoperiți frumoasa plajă Abu Dabbab, renumită pentru apele cristaline, viața marină colorată și țestoasele marine. Bucurați-vă de o zi relaxantă la plajă, faceți snorkeling alături de un ghid profesionist și explorați una dintre cele mai frumoase plaje ale Mării Roșii.",
    "it": "Scoprite la splendida spiaggia di Abu Dabbab, famosa per le sue acque cristalline, la vita marina colorata e le tartarughe marine. Godetevi una giornata rilassante in spiaggia, praticate snorkeling con una guida professionale ed esplorate una delle spiagge più belle del Mar Rosso."
  },
  "timeFrom": "07:00",
  "durationValue": 12,
  "durationType": 0,
  "adultPrice": 150,
  "childPrice": 120,
  "infPrice": 0,
  "category": 1,
  "tripTypeId": 2,
  "highlights": [
    {
      "en": "Visit the beautiful Abu Dabbab Beach",
      "fr": "Visitez la magnifique plage d'Abu Dabbab",
      "ru": "Посетите прекрасный пляж Абу-Дабаб",
      "ro": "Vizitați frumoasa plajă Abu Dabbab",
      "it": "Visitate la splendida spiaggia di Abu Dabbab"
    },
    {
      "en": "Discover colorful marine life",
      "fr": "Découvrez une vie marine colorée",
      "ru": "Откройте для себя красочный подводный мир",
      "ro": "Descoperiți viața marină colorată",
      "it": "Scoprite la colorata vita marina"
    },
    {
      "en": "Enjoy snorkeling with a professional guide",
      "fr": "Profitez du snorkeling avec un guide professionnel",
      "ru": "Насладитесь снорклингом с профессиональным гидом",
      "ro": "Bucurați-vă de snorkeling cu un ghid profesionist",
      "it": "Godetevi lo snorkeling con una guida professionale"
    },
    {
      "en": "Relax on one of the Red Sea's beautiful beaches",
      "fr": "Détendez-vous sur l'une des belles plages de la mer Rouge",
      "ru": "Отдохните на одном из красивейших пляжей Красного моря",
      "ro": "Relaxați-vă pe una dintre cele mai frumoase plaje ale Mării Roșii",
      "it": "Rilassatevi su una delle spiagge più belle del Mar Rosso"
    }
  ],
  "includes": [
    {
      "en": "Round-trip transfer",
      "fr": "Transfert aller-retour",
      "ru": "Трансфер туда и обратно",
      "ro": "Transfer dus-întors",
      "it": "Trasferimento di andata e ritorno"
    },
    {
      "en": "All entrance fees",
      "fr": "Tous les frais d'entrée",
      "ru": "Все входные сборы",
      "ro": "Toate taxele de intrare",
      "it": "Tutti i biglietti d'ingresso"
    },
    {
      "en": "Beach access and facilities",
      "fr": "Accès à la plage et à ses installations",
      "ru": "Доступ на пляж и к его удобствам",
      "ro": "Acces la plajă și facilități",
      "it": "Accesso alla spiaggia e ai suoi servizi"
    },
    {
      "en": "Bottled water",
      "fr": "Eau en bouteille",
      "ru": "Бутилированная вода",
      "ro": "Apă îmbuteliată",
      "it": "Acqua in bottiglia"
    },
    {
      "en": "Professional snorkeling guide",
      "fr": "Guide professionnel de snorkeling",
      "ru": "Профессиональный гид по снорклингу",
      "ro": "Ghid profesionist de snorkeling",
      "it": "Guida professionale per lo snorkeling"
    },
    {
      "en": "Snorkeling equipment",
      "fr": "Équipement de snorkeling",
      "ru": "Оборудование для снорклинга",
      "ro": "Echipament de snorkeling",
      "it": "Attrezzatura per lo snorkeling"
    }
  ],
  "excludes": [
    {
      "en": "Personal expenses",
      "fr": "Dépenses personnelles",
      "ru": "Личные расходы",
      "ro": "Cheltuieli personale",
      "it": "Spese personali"
    },
    {
      "en": "Any services not mentioned in the inclusions",
      "fr": "Tout service non mentionné dans les inclusions",
      "ru": "Услуги, не указанные в разделе включённых услуг",
      "ro": "Servicii care nu sunt menționate la secțiunea de includeri",
      "it": "Servizi non menzionati nella sezione dei servizi inclusi"
    }
  ],
  "whatToBring": [
    {
      "en": "Swimwear",
      "fr": "Maillot de bain",
      "ru": "Купальник",
      "ro": "Costum de baie",
      "it": "Costume da bagno"
    },
    {
      "en": "Towel",
      "fr": "Serviette",
      "ru": "Serviette",
      "ro": "Prosop",
      "it": "Asciugamano"
    },
    {
      "en": "Sunscreen",
      "fr": "Crème solaire",
      "ru": "Солнцезащитный крем",
      "ro": "Cremă de protecție solară",
      "it": "Crema solare"
    },
    {
      "en": "Sunglasses and hat",
      "fr": "Lunettes de soleil et chapeau",
      "ru": "Солнцезащитные очки и головной убор",
      "ro": "Ochelari de soare și pălărie",
      "it": "Occhiali da sole e cappello"
    }
  ],
  "availabilityDayNo": [0, 1, 2, 3, 4, 5, 6]
}

Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristy.runasp.net/api/Trips' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTcwOTU3NX0.W59KlxkM3i6zxgABp3S2q09Tr8BBOxGpXyWc6PKfz7I' \
  -H 'Content-Type: application/json' \
  -d '
{
  "destinationId": 2,
  "name": {
    "en": "Abu Dabbab Snorkeling Trip",
    "fr": "Excursion de plongée avec tuba à Abu Dabbab",
    "ru": "Экскурсия с маской и трубкой в Абу-Дабаб",
    "ro": "Excursie de snorkeling la Abu Dabbab",
    "it": "Escursione di snorkeling ad Abu Dabbab"
  },
  "description": {
    "en": "Discover the beautiful Abu Dabbab Beach, famous for its crystal-clear waters, colorful marine life, and sea turtles. Enjoy a relaxing beach day with snorkeling, explore the underwater world with a professional snorkeling guide, and experience one of the most beautiful beaches of the Red Sea.",
    "fr": "Découvrez la magnifique plage d'\''Abu Dabbab, célèbre pour ses eaux cristallines, sa vie marine colorée et ses tortues de mer. Profitez d'\''une journée de détente à la plage avec une séance de snorkeling, explorez le monde sous-marin avec un guide professionnel et découvrez l'\''une des plus belles plages de la mer Rouge.",
    "ru": "Откройте для себя прекрасный пляж Абу-Дабаб, известный кристально чистой водой, красочным подводным миром и морскими черепахами. Насладитесь отдыхом на пляже, займитесь снорклингом с профессиональным гидом и откройте для себя один из самых красивых пляжей Красного моря.",
    "ro": "Descoperiți frumoasa plajă Abu Dabbab, renumită pentru apele cristaline, viața marină colorată și țestoasele marine. Bucurați-vă de o zi relaxantă la plajă, faceți snorkeling alături de un ghid profesionist și explorați una dintre cele mai frumoase plaje ale Mării Roșii.",
    "it": "Scoprite la splendida spiaggia di Abu Dabbab, famosa per le sue acque cristalline, la vita marina colorata e le tartarughe marine. Godetevi una giornata rilassante in spiaggia, praticate snorkeling con una guida professionale ed esplorate una delle spiagge più belle del Mar Rosso."
  },
  "timeFrom": "07:00",
  "durationValue": 12,
  "durationType": 0,
  "adultPrice": 150,
  "childPrice": 120,
  "infPrice": 0,
  "category": 1,
  "tripTypeId": 2,
  "highlights": [
    {
      "en": "Visit the beautiful Abu Dabbab Beach",
      "fr": "Visitez la magnifique plage d'\''Abu Dabbab",
      "ru": "Посетите прекрасный пляж Абу-Дабаб",
      "ro": "Vizitați frumoasa plajă Abu Dabbab",
      "it": "Visitate la splendida spiaggia di Abu Dabbab"
    },
    {
      "en": "Discover colorful marine life",
      "fr": "Découvrez une vie marine colorée",
      "ru": "Откройте для себя красочный подводный мир",
      "ro": "Descoperiți viața marină colorată",
      "it": "Scoprite la colorata vita marina"
    },
    {
      "en": "Enjoy snorkeling with a professional guide",
      "fr": "Profitez du snorkeling avec un guide professionnel",
      "ru": "Насладитесь снорклингом с профессиональным гидом",
      "ro": "Bucurați-vă de snorkeling cu un ghid profesionist",
      "it": "Godetevi lo snorkeling con una guida professionale"
    },
    {
      "en": "Relax on one of the Red Sea'\''s beautiful beaches",
      "fr": "Détendez-vous sur l'\''une des belles plages de la mer Rouge",
      "ru": "Отдохните на одном из красивейших пляжей Красного моря",
      "ro": "Relaxați-vă pe una dintre cele mai frumoase plaje ale Mării Roșii",
      "it": "Rilassatevi su una delle spiagge più belle del Mar Rosso"
    }
  ],
  "includes": [
    {
      "en": "Round-trip transfer",
      "fr": "Transfert aller-retour",
      "ru": "Трансфер туда и обратно",
      "ro": "Transfer dus-întors",
      "it": "Trasferimento di andata e ritorno"
    },
    {
      "en": "All entrance fees",
      "fr": "Tous les frais d'\''entrée",
      "ru": "Все входные сборы",
      "ro": "Toate taxele de intrare",
      "it": "Tutti i biglietti d'\''ingresso"
    },
    {
      "en": "Beach access and facilities",
      "fr": "Accès à la plage et à ses installations",
      "ru": "Доступ на пляж и к его удобствам",
      "ro": "Acces la plajă și facilități",
      "it": "Accesso alla spiaggia e ai suoi servizi"
    },
    {
      "en": "Bottled water",
      "fr": "Eau en bouteille",
      "ru": "Бутилированная вода",
      "ro": "Apă îmbuteliată",
      "it": "Acqua in bottiglia"
    },
    {
      "en": "Professional snorkeling guide",
      "fr": "Guide professionnel de snorkeling",
      "ru": "Профессиональный гид по снорклингу",
      "ro": "Ghid profesionist de snorkeling",
      "it": "Guida professionale per lo snorkeling"
    },
    {
      "en": "Snorkeling equipment",
      "fr": "Équipement de snorkeling",
      "ru": "Оборудование для снорклинга",
      "ro": "Echipament de snorkeling",
      "it": "Attrezzatura per lo snorkeling"
    }
  ],
  "excludes": [
    {
      "en": "Personal expenses",
      "fr": "Dépenses personnelles",
      "ru": "Личные расходы",
      "ro": "Cheltuieli personale",
      "it": "Spese personali"
    },
    {
      "en": "Any services not mentioned in the inclusions",
      "fr": "Tout service non mentionné dans les inclusions",
      "ru": "Услуги, не указанные в разделе включённых услуг",
      "ro": "Servicii care nu sunt menționate la secțiunea de includeri",
      "it": "Servizi non menzionati nella sezione dei servizi inclusi"
    }
  ],
  "whatToBring": [
    {
      "en": "Swimwear",
      "fr": "Maillot de bain",
      "ru": "Купальник",
      "ro": "Costum de baie",
      "it": "Costume da bagno"
    },
    {
      "en": "Towel",
      "fr": "Serviette",
      "ru": "Serviette",
      "ro": "Prosop",
      "it": "Asciugamano"
    },
    {
      "en": "Sunscreen",
      "fr": "Crème solaire",
      "ru": "Солнцезащитный крем",
      "ro": "Cremă de protecție solară",
      "it": "Crema solare"
    },
    {
      "en": "Sunglasses and hat",
      "fr": "Lunettes de soleil et chapeau",
      "ru": "Солнцезащитные очки и головной убор",
      "ro": "Ochelari de soare și pălărie",
      "it": "Occhiali da sole e cappello"
    }
  ],
  "availabilityDayNo": [0, 1, 2, 3, 4, 5, 6]
}
'
Request URL
https://touristy.runasp.net/api/Trips
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Trip Created Successfully",
  "data": {
    "id": 1,
    "markerID": "266451",
    "destinationInfo": {
      "id": 2,
      "name": "stringen",
      "imageUrl": null,
      "isFeatured": true
    },
    "destination": null,
    "name": "Abu Dabbab Snorkeling Trip",
    "description": "Discover the beautiful Abu Dabbab Beach, famous for its crystal-clear waters, colorful marine life, and sea turtles. Enjoy a relaxing beach day with snorkeling, explore the underwater world with a professional snorkeling guide, and experience one of the most beautiful beaches of the Red Sea.",
    "timeFrom": "07:00:00",
    "durationValue": 12,
    "durationTypeName": "Hours",
    "adultPrice": 150,
    "childPrice": 120,
    "infPrice": 0,
    "currencyName": "EUR",
    "categoryName": "Private",
    "isActive": true,
    "tripTypeName": "test",
    "createdBy": "Karim Ayman",
    "createdAt": "2026-11-19T16:41:55.1977944Z",
    "highlights": [
      "Visit the beautiful Abu Dabbab Beach",
      "Discover colorful marine life",
      "Enjoy snorkeling with a professional guide",
      "Relax on one of the Red Sea's beautiful beaches"
    ],
    "includes": [
      "Round-trip transfer",
      "All entrance fees",
      "Beach access and facilities",
      "Bottled water",
      "Professional snorkeling guide",
      "Snorkeling equipment"
    ],
    "excludes": [
      "Personal expenses",
      "Any services not mentioned in the inclusions"
    ],
    "whatToBring": [
      "Swimwear",
      "Towel",
      "Sunscreen",
      "Sunglasses and hat"
    ],
    "availableDays": [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "images": []
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 16:41:55 GMT 
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
    "markerID": "string",
    "destinationInfo": {
      "id": 0,
      "name": "string",
      "imageUrl": "string",
      "isFeatured": true
    },
    "destination": "string",
    "name": "string",
    "description": "string",
    "timeFrom": "string",
    "durationValue": 0,
    "durationTypeName": "string",
    "adultPrice": 0,
    "childPrice": 0,
    "infPrice": 0,
    "currencyName": "string",
    "categoryName": "string",
    "isActive": true,
    "tripTypeName": "string",
    "createdBy": "string",
    "createdAt": "2026-11-19T16:44:33.419Z",
    "highlights": [
      "string"
    ],
    "includes": [
      "string"
    ],
    "excludes": [
      "string"
    ],
    "whatToBring": [
      "string"
    ],
    "availableDays": [
      "string"
    ],
    "images": [
      {
        "id": 0,
        "imageUrl": "string",
        "isPrimary": true
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
/api/Trips


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "id": 0,
  "destinationId": 0,
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
  "timeFrom": "string",
  "durationValue": 0,
  "durationType": 0,
  "adultPrice": 0,
  "childPrice": 0,
  "infPrice": 0,
  "category": 0,
  "tripTypeId": 0,
  "highlights": [
    {
      "en": "string",
      "fr": "string",
      "ru": "string",
      "ro": "string",
      "it": "string"
    }
  ],
  "includes": [
    {
      "en": "string",
      "fr": "string",
      "ru": "string",
      "ro": "string",
      "it": "string"
    }
  ],
  "excludes": [
    {
      "en": "string",
      "fr": "string",
      "ru": "string",
      "ro": "string",
      "it": "string"
    }
  ],
  "whatToBring": [
    {
      "en": "string",
      "fr": "string",
      "ru": "string",
      "ro": "string",
      "it": "string"
    }
  ],
  "availabilityDayNo": [
    0
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
    "markerID": "string",
    "destinationInfo": {
      "id": 0,
      "name": "string",
      "imageUrl": "string",
      "isFeatured": true
    },
    "destination": "string",
    "name": "string",
    "description": "string",
    "timeFrom": "string",
    "durationValue": 0,
    "durationTypeName": "string",
    "adultPrice": 0,
    "childPrice": 0,
    "infPrice": 0,
    "currencyName": "string",
    "categoryName": "string",
    "isActive": true,
    "tripTypeName": "string",
    "createdBy": "string",
    "createdAt": "2026-11-19T16:44:33.425Z",
    "highlights": [
      "string"
    ],
    "includes": [
      "string"
    ],
    "excludes": [
      "string"
    ],
    "whatToBring": [
      "string"
    ],
    "availableDays": [
      "string"
    ],
    "images": [
      {
        "id": 0,
        "imageUrl": "string",
        "isPrimary": true
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
/api/Trips/{id}


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
  'https://touristy.runasp.net/api/Trips/1' \
  -H 'accept: text/plain' \
  -H 'Accept-Language: en' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTcwOTU3NX0.W59KlxkM3i6zxgABp3S2q09Tr8BBOxGpXyWc6PKfz7I'
Request URL
https://touristy.runasp.net/api/Trips/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Trip Data For Id 1",
  "data": {
    "id": 1,
    "markerID": "266451",
    "destinationInfo": {
      "id": 2,
      "name": "stringen",
      "imageUrl": null,
      "isFeatured": true
    },
    "destination": null,
    "name": "Abu Dabbab Snorkeling Trip",
    "description": "Discover the beautiful Abu Dabbab Beach, famous for its crystal-clear waters, colorful marine life, and sea turtles. Enjoy a relaxing beach day with snorkeling, explore the underwater world with a professional snorkeling guide, and experience one of the most beautiful beaches of the Red Sea.",
    "timeFrom": "07:00:00",
    "durationValue": 12,
    "durationTypeName": "Hours",
    "adultPrice": 150,
    "childPrice": 120,
    "infPrice": 0,
    "currencyName": "EUR",
    "categoryName": "Private",
    "isActive": true,
    "tripTypeName": "test",
    "createdBy": "Karim Ayman",
    "createdAt": "2026-11-19T16:41:55.1977944",
    "highlights": [
      "Visit the beautiful Abu Dabbab Beach",
      "Discover colorful marine life",
      "Enjoy snorkeling with a professional guide",
      "Relax on one of the Red Sea's beautiful beaches"
    ],
    "includes": [
      "Round-trip transfer",
      "All entrance fees",
      "Beach access and facilities",
      "Bottled water",
      "Professional snorkeling guide",
      "Snorkeling equipment"
    ],
    "excludes": [
      "Personal expenses",
      "Any services not mentioned in the inclusions"
    ],
    "whatToBring": [
      "Swimwear",
      "Towel",
      "Sunscreen",
      "Sunglasses and hat"
    ],
    "availableDays": [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "images": []
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 16:42:25 GMT 
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
    "markerID": "string",
    "destinationInfo": {
      "id": 0,
      "name": "string",
      "imageUrl": "string",
      "isFeatured": true
    },
    "destination": "string",
    "name": "string",
    "description": "string",
    "timeFrom": "string",
    "durationValue": 0,
    "durationTypeName": "string",
    "adultPrice": 0,
    "childPrice": 0,
    "infPrice": 0,
    "currencyName": "string",
    "categoryName": "string",
    "isActive": true,
    "tripTypeName": "string",
    "createdBy": "string",
    "createdAt": "2026-11-19T16:44:33.433Z",
    "highlights": [
      "string"
    ],
    "includes": [
      "string"
    ],
    "excludes": [
      "string"
    ],
    "whatToBring": [
      "string"
    ],
    "availableDays": [
      "string"
    ],
    "images": [
      {
        "id": 0,
        "imageUrl": "string",
        "isPrimary": true
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
/api/Trips/{id}/deactivate


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
  'https://touristy.runasp.net/api/Trips/1/deactivate' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTcwOTU3NX0.W59KlxkM3i6zxgABp3S2q09Tr8BBOxGpXyWc6PKfz7I'
Request URL
https://touristy.runasp.net/api/Trips/1/deactivate
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Trip Deactivated Successfully",
  "data": ""
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 16:43:29 GMT 
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
/api/Trips/{id}/reactivate


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

curl -X 'PUT' \
  'https://touristy.runasp.net/api/Trips/1/reactivate' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTcwOTU3NX0.W59KlxkM3i6zxgABp3S2q09Tr8BBOxGpXyWc6PKfz7I'
Request URL
https://touristy.runasp.net/api/Trips/1/reactivate
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Trip Reactivated Successfully",
  "data": ""
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 16:43:35 GMT 
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
/api/Trips/{id}/image


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
image4.jpg-
image3.jpg-
image2.jpg-
Add string item
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristy.runasp.net/api/Trips/1/image' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTcwOTU3NX0.W59KlxkM3i6zxgABp3S2q09Tr8BBOxGpXyWc6PKfz7I' \
  -H 'Content-Type: multipart/form-data' \
  -F 'Images=@image4.jpg;type=image/jpeg' \
  -F 'Images=@image3.jpg;type=image/jpeg' \
  -F 'Images=@image2.jpg;type=image/jpeg'
Request URL
https://touristy.runasp.net/api/Trips/1/image
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Image Added Successfully",
  "data": [
    {
      "id": 1,
      "imageUrl": "images/Trips/95a6792d-ff0f-4dc1-b987-ac2da559d1c8.webp"
    },
    {
      "id": 2,
      "imageUrl": "images/Trips/11f0e35b-4f3f-4790-907a-350e46616bba.webp"
    },
    {
      "id": 3,
      "imageUrl": "images/Trips/0a6904f0-dcf2-462c-ac3a-b7f8bd7febf7.webp"
    }
  ]
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 16:44:18 GMT 
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
/api/Trips/{id}/image/{imageId}


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
3
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://touristy.runasp.net/api/Trips/1/image/3' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTcwOTU3NX0.W59KlxkM3i6zxgABp3S2q09Tr8BBOxGpXyWc6PKfz7I'
Request URL
https://touristy.runasp.net/api/Trips/1/image/3
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
 date: Thu,19 Nov 2026 16:44:26 GMT 
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
/api/Trips/{id}/image/{imageId}/set-primary


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

curl -X 'PUT' \
  'https://touristy.runasp.net/api/Trips/1/image/2/set-primary' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTcwOTU3NX0.W59KlxkM3i6zxgABp3S2q09Tr8BBOxGpXyWc6PKfz7I'
Request URL
https://touristy.runasp.net/api/Trips/1/image/2/set-primary
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Primary Image Set Successfully",
  "data": ""
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 16:44:32 GMT 
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