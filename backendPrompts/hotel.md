Hotels


GET
/api/Hotels


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
Search
string
(query)
Search
Rate
integer($int32)
(query)
Rate
FacilityId
integer($int32)
(query)
FacilityId
Language
string
(query)
Language
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/Hotels' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk1MTE1NjAzfQ.5QjMVkghDVsXzICyilPAEzm19T5ta4GpYrvY8TPYeyU'
Request URL
https://touristy.runasp.net/api/Hotels
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Hotels retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Red Sea Paradise Resort",
      "location": "Hurghada, Red Sea, Egypt",
      "description": "Red Sea Paradise Resort is a beautiful beachfront hotel in Hurghada, offering comfortable accommodation, stunning sea views, swimming pools, delicious dining options, and a variety of recreational activities. Enjoy a relaxing holiday with excellent hospitality and easy access to the beautiful beaches of the Red Sea.",
      "rate": 5,
      "createdAt": "2026-11-19T19:00:31.3144986",
      "updatedAt": null,
      "facilities": [
        {
          "id": "ca161f21-e9b7-4bbd-a333-c6eb6c391fa9",
          "name": "Swimming Pool",
          "values": [
            "Outdoor swimming pool",
            "Children's pool"
          ],
          "icon": "waves",
          "order": 1
        },
        {
          "id": "cd60fa58-8e8f-40b0-82c2-3b04c6421f01",
          "name": "Restaurants & Dining",
          "values": [
            "Main buffet restaurant",
            "International cuisine"
          ],
          "icon": "utensils",
          "order": 2
        },
        {
          "id": "07eb5ca0-72ab-4d5c-8c2e-be1b310310b5",
          "name": "Beach Access",
          "values": [
            "Private sandy beach",
            "Sun loungers and umbrellas"
          ],
          "icon": "umbrella",
          "order": 3
        },
        {
          "id": "d49efa11-5903-4305-84ea-0696387e7794",
          "name": "Wi-Fi & Internet",
          "values": [
            "Free Wi-Fi in public areas",
            "Wi-Fi in guest rooms"
          ],
          "icon": "wifi",
          "order": 4
        },
        {
          "id": "56e03267-e50c-4cfd-bebe-dd8e530afc86",
          "name": "Sports & Activities",
          "values": [
            "Snorkeling",
            "Beach volleyball",
            "Water sports"
          ],
          "icon": "activity",
          "order": 5
        },
        {
          "id": "46923f5d-69c8-4cc2-89c3-c56243855064",
          "name": "Spa & Wellness",
          "values": [
            "Massage services",
            "Sauna and steam room"
          ],
          "icon": "heart-pulse",
          "order": 6
        },
        {
          "id": "8843ed6b-8ca1-4eb6-8914-84504afdc900",
          "name": "Reception Services",
          "values": [
            "24-hour front desk",
            "Airport transfer service"
          ],
          "icon": "concierge-bell",
          "order": 7
        }
      ],
      "images": [],
      "ratePlans": []
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 19:00:39 GMT 
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
      "location": "string",
      "description": "string",
      "rate": 0,
      "createdAt": "2026-11-19T19:05:22.260Z",
      "updatedAt": "2026-11-19T19:05:22.260Z",
      "facilities": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "name": "string",
          "values": [
            "string"
          ],
          "icon": "string",
          "order": 0
        }
      ],
      "images": [
        {
          "id": 0,
          "hotelId": 0,
          "imageUrl": "string",
          "isPrimary": true,
          "displayOrder": 0
        }
      ],
      "ratePlans": [
        {
          "id": 0,
          "hotelId": 0,
          "hotelName": "string",
          "name": "string",
          "description": "string",
          "createdAt": "2026-11-19T19:05:22.260Z",
          "updatedAt": "2026-11-19T19:05:22.260Z"
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
/api/Hotels


Parameters
Cancel
Reset
No parameters

Request body

application/json

{
  "name": {
    "en": "Red Sea Paradise Resort",
    "fr": "Red Sea Paradise Resort",
    "ru": "Red Sea Paradise Resort",
    "ro": "Red Sea Paradise Resort",
    "it": "Red Sea Paradise Resort"
  },
  "location": {
    "en": "Hurghada, Red Sea, Egypt",
    "fr": "Hurghada, Mer Rouge, Égypte",
    "ru": "Хургада, Красное море, Египет",
    "ro": "Hurghada, Marea Roșie, Egipt",
    "it": "Hurghada, Mar Rosso, Egitto"
  },
  "description": {
    "en": "Red Sea Paradise Resort is a beautiful beachfront hotel in Hurghada, offering comfortable accommodation, stunning sea views, swimming pools, delicious dining options, and a variety of recreational activities. Enjoy a relaxing holiday with excellent hospitality and easy access to the beautiful beaches of the Red Sea.",
    "fr": "Red Sea Paradise Resort est un magnifique hôtel en bord de mer à Hurghada. Il propose un hébergement confortable, une vue imprenable sur la mer, des piscines, de délicieuses options de restauration et diverses activités de loisirs. Profitez de vacances relaxantes avec un excellent service et un accès facile aux plages de la mer Rouge.",
    "ru": "Red Sea Paradise Resort — прекрасный отель на берегу моря в Хургаде, предлагающий комфортное размещение, великолепные виды на море, бассейны, разнообразные рестораны и множество развлечений. Насладитесь спокойным отдыхом, отличным обслуживанием и прекрасными пляжами Красного моря.",
    "ro": "Red Sea Paradise Resort este un hotel minunat situat pe malul mării în Hurghada, care oferă cazare confortabilă, priveliști spectaculoase, piscine, opțiuni culinare delicioase și numeroase activități recreative. Bucurați-vă de o vacanță relaxantă și de acces facil la plajele Mării Roșii.",
    "it": "Red Sea Paradise Resort è un magnifico hotel sul mare a Hurghada, che offre sistemazioni confortevoli, splendide viste sul mare, piscine, deliziose opzioni gastronomiche e numerose attività ricreative. Godetevi una vacanza rilassante con un servizio eccellente e un facile accesso alle spiagge del Mar Rosso."
  },
  "rate": 5,
  "facilities": [
    {
      "name": {
        "en": "Swimming Pool",
        "fr": "Piscine",
        "ru": "Бассейн",
        "ro": "Piscină",
        "it": "Piscina"
      },
      "values": [
        {
          "en": "Outdoor swimming pool",
          "fr": "Piscine extérieure",
          "ru": "Открытый бассейн",
          "ro": "Piscină în aer liber",
          "it": "Piscina all'aperto"
        },
        {
          "en": "Children's pool",
          "fr": "Piscine pour enfants",
          "ru": "Детский бассейн",
          "ro": "Piscină pentru copii",
          "it": "Piscina per bambini"
        }
      ],
      "icon": "waves",
      "order": 1
    },
    {
      "name": {
        "en": "Restaurants & Dining",
        "fr": "Restaurants et restauration",
        "ru": "Рестораны и питание",
        "ro": "Restaurante și servirea mesei",
        "it": "Ristoranti e ristorazione"
      },
      "values": [
        {
          "en": "Main buffet restaurant",
          "fr": "Restaurant buffet principal",
          "ru": "Главный ресторан со шведским столом",
          "ro": "Restaurant principal tip bufet",
          "it": "Ristorante principale a buffet"
        },
        {
          "en": "International cuisine",
          "fr": "Cuisine internationale",
          "ru": "Международная кухня",
          "ro": "Bucătărie internațională",
          "it": "Cucina internazionale"
        }
      ],
      "icon": "utensils",
      "order": 2
    },
    {
      "name": {
        "en": "Beach Access",
        "fr": "Accès à la plage",
        "ru": "Доступ к пляжу",
        "ro": "Acces la plajă",
        "it": "Accesso alla spiaggia"
      },
      "values": [
        {
          "en": "Private sandy beach",
          "fr": "Plage privée de sable",
          "ru": "Частный песчаный пляж",
          "ro": "Plajă privată cu nisip",
          "it": "Spiaggia privata di sabbia"
        },
        {
          "en": "Sun loungers and umbrellas",
          "fr": "Chaises longues et parasols",
          "ru": "Шезлонги и зонтики",
          "ro": "Șezlonguri și umbrele",
          "it": "Lettini e ombrelloni"
        }
      ],
      "icon": "umbrella",
      "order": 3
    },
    {
      "name": {
        "en": "Wi-Fi & Internet",
        "fr": "Wi-Fi et Internet",
        "ru": "Wi-Fi и Интернет",
        "ro": "Wi-Fi și Internet",
        "it": "Wi-Fi e Internet"
      },
      "values": [
        {
          "en": "Free Wi-Fi in public areas",
          "fr": "Wi-Fi gratuit dans les espaces communs",
          "ru": "Бесплатный Wi-Fi в общественных зонах",
          "ro": "Wi-Fi gratuit în zonele publice",
          "it": "Wi-Fi gratuito nelle aree comuni"
        },
        {
          "en": "Wi-Fi in guest rooms",
          "fr": "Wi-Fi dans les chambres",
          "ru": "Wi-Fi в номерах",
          "ro": "Wi-Fi în camere",
          "it": "Wi-Fi nelle camere"
        }
      ],
      "icon": "wifi",
      "order": 4
    },
    {
      "name": {
        "en": "Sports & Activities",
        "fr": "Sports et activités",
        "ru": "Спорт и развлечения",
        "ro": "Sport și activități",
        "it": "Sport e attività"
      },
      "values": [
        {
          "en": "Snorkeling",
          "fr": "Plongée avec tuba",
          "ru": "Снорклинг",
          "ro": "Snorkeling",
          "it": "Snorkeling"
        },
        {
          "en": "Beach volleyball",
          "fr": "Beach-volley",
          "ru": "Пляжный волейбол",
          "ro": "Volei pe plajă",
          "it": "Beach volley"
        },
        {
          "en": "Water sports",
          "fr": "Sports nautiques",
          "ru": "Водные виды спорта",
          "ro": "Sporturi nautice",
          "it": "Sport acquatici"
        }
      ],
      "icon": "activity",
      "order": 5
    },
    {
      "name": {
        "en": "Spa & Wellness",
        "fr": "Spa et bien-être",
        "ru": "Спа и оздоровление",
        "ro": "Spa și wellness",
        "it": "Spa e benessere"
      },
      "values": [
        {
          "en": "Massage services",
          "fr": "Services de massage",
          "ru": "Массажные услуги",
          "ro": "Servicii de masaj",
          "it": "Servizi di massaggio"
        },
        {
          "en": "Sauna and steam room",
          "fr": "Sauna et hammam",
          "ru": "Сауна и парная",
          "ro": "Saună și baie de aburi",
          "it": "Sauna e bagno turco"
        }
      ],
      "icon": "heart-pulse",
      "order": 6
    },
    {
      "name": {
        "en": "Reception Services",
        "fr": "Services de réception",
        "ru": "Услуги стойки регистрации",
        "ro": "Servicii de recepție",
        "it": "Servizi di reception"
      },
      "values": [
        {
          "en": "24-hour front desk",
          "fr": "Réception ouverte 24h/24",
          "ru": "Круглосуточная стойка регистрации",
          "ro": "Recepție deschisă non-stop",
          "it": "Reception aperta 24 ore su 24"
        },
        {
          "en": "Airport transfer service",
          "fr": "Service de transfert aéroport",
          "ru": "Трансфер из аэропорта",
          "ro": "Serviciu de transfer de la aeroport",
          "it": "Servizio di trasferimento aeroportuale"
        }
      ],
      "icon": "concierge-bell",
      "order": 7
    }
  ]
}

Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristy.runasp.net/api/Hotels' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk1MTE1NjAzfQ.5QjMVkghDVsXzICyilPAEzm19T5ta4GpYrvY8TPYeyU' \
  -H 'Content-Type: application/json' \
  -d '
{
  "name": {
    "en": "Red Sea Paradise Resort",
    "fr": "Red Sea Paradise Resort",
    "ru": "Red Sea Paradise Resort",
    "ro": "Red Sea Paradise Resort",
    "it": "Red Sea Paradise Resort"
  },
  "location": {
    "en": "Hurghada, Red Sea, Egypt",
    "fr": "Hurghada, Mer Rouge, Égypte",
    "ru": "Хургада, Красное море, Египет",
    "ro": "Hurghada, Marea Roșie, Egipt",
    "it": "Hurghada, Mar Rosso, Egitto"
  },
  "description": {
    "en": "Red Sea Paradise Resort is a beautiful beachfront hotel in Hurghada, offering comfortable accommodation, stunning sea views, swimming pools, delicious dining options, and a variety of recreational activities. Enjoy a relaxing holiday with excellent hospitality and easy access to the beautiful beaches of the Red Sea.",
    "fr": "Red Sea Paradise Resort est un magnifique hôtel en bord de mer à Hurghada. Il propose un hébergement confortable, une vue imprenable sur la mer, des piscines, de délicieuses options de restauration et diverses activités de loisirs. Profitez de vacances relaxantes avec un excellent service et un accès facile aux plages de la mer Rouge.",
    "ru": "Red Sea Paradise Resort — прекрасный отель на берегу моря в Хургаде, предлагающий комфортное размещение, великолепные виды на море, бассейны, разнообразные рестораны и множество развлечений. Насладитесь спокойным отдыхом, отличным обслуживанием и прекрасными пляжами Красного моря.",
    "ro": "Red Sea Paradise Resort este un hotel minunat situat pe malul mării în Hurghada, care oferă cazare confortabilă, priveliști spectaculoase, piscine, opțiuni culinare delicioase și numeroase activități recreative. Bucurați-vă de o vacanță relaxantă și de acces facil la plajele Mării Roșii.",
    "it": "Red Sea Paradise Resort è un magnifico hotel sul mare a Hurghada, che offre sistemazioni confortevoli, splendide viste sul mare, piscine, deliziose opzioni gastronomiche e numerose attività ricreative. Godetevi una vacanza rilassante con un servizio eccellente e un facile accesso alle spiagge del Mar Rosso."
  },
  "rate": 5,
  "facilities": [
    {
      "name": {
        "en": "Swimming Pool",
        "fr": "Piscine",
        "ru": "Бассейн",
        "ro": "Piscină",
        "it": "Piscina"
      },
      "values": [
        {
          "en": "Outdoor swimming pool",
          "fr": "Piscine extérieure",
          "ru": "Открытый бассейн",
          "ro": "Piscină în aer liber",
          "it": "Piscina all'\''aperto"
        },
        {
          "en": "Children'\''s pool",
          "fr": "Piscine pour enfants",
          "ru": "Детский бассейн",
          "ro": "Piscină pentru copii",
          "it": "Piscina per bambini"
        }
      ],
      "icon": "waves",
      "order": 1
    },
    {
      "name": {
        "en": "Restaurants & Dining",
        "fr": "Restaurants et restauration",
        "ru": "Рестораны и питание",
        "ro": "Restaurante și servirea mesei",
        "it": "Ristoranti e ristorazione"
      },
      "values": [
        {
          "en": "Main buffet restaurant",
          "fr": "Restaurant buffet principal",
          "ru": "Главный ресторан со шведским столом",
          "ro": "Restaurant principal tip bufet",
          "it": "Ristorante principale a buffet"
        },
        {
          "en": "International cuisine",
          "fr": "Cuisine internationale",
          "ru": "Международная кухня",
          "ro": "Bucătărie internațională",
          "it": "Cucina internazionale"
        }
      ],
      "icon": "utensils",
      "order": 2
    },
    {
      "name": {
        "en": "Beach Access",
        "fr": "Accès à la plage",
        "ru": "Доступ к пляжу",
        "ro": "Acces la plajă",
        "it": "Accesso alla spiaggia"
      },
      "values": [
        {
          "en": "Private sandy beach",
          "fr": "Plage privée de sable",
          "ru": "Частный песчаный пляж",
          "ro": "Plajă privată cu nisip",
          "it": "Spiaggia privata di sabbia"
        },
        {
          "en": "Sun loungers and umbrellas",
          "fr": "Chaises longues et parasols",
          "ru": "Шезлонги и зонтики",
          "ro": "Șezlonguri și umbrele",
          "it": "Lettini e ombrelloni"
        }
      ],
      "icon": "umbrella",
      "order": 3
    },
    {
      "name": {
        "en": "Wi-Fi & Internet",
        "fr": "Wi-Fi et Internet",
        "ru": "Wi-Fi и Интернет",
        "ro": "Wi-Fi și Internet",
        "it": "Wi-Fi e Internet"
      },
      "values": [
        {
          "en": "Free Wi-Fi in public areas",
          "fr": "Wi-Fi gratuit dans les espaces communs",
          "ru": "Бесплатный Wi-Fi в общественных зонах",
          "ro": "Wi-Fi gratuit în zonele publice",
          "it": "Wi-Fi gratuito nelle aree comuni"
        },
        {
          "en": "Wi-Fi in guest rooms",
          "fr": "Wi-Fi dans les chambres",
          "ru": "Wi-Fi в номерах",
          "ro": "Wi-Fi în camere",
          "it": "Wi-Fi nelle camere"
        }
      ],
      "icon": "wifi",
      "order": 4
    },
    {
      "name": {
        "en": "Sports & Activities",
        "fr": "Sports et activités",
        "ru": "Спорт и развлечения",
        "ro": "Sport și activități",
        "it": "Sport e attività"
      },
      "values": [
        {
          "en": "Snorkeling",
          "fr": "Plongée avec tuba",
          "ru": "Снорклинг",
          "ro": "Snorkeling",
          "it": "Snorkeling"
        },
        {
          "en": "Beach volleyball",
          "fr": "Beach-volley",
          "ru": "Пляжный волейбол",
          "ro": "Volei pe plajă",
          "it": "Beach volley"
        },
        {
          "en": "Water sports",
          "fr": "Sports nautiques",
          "ru": "Водные виды спорта",
          "ro": "Sporturi nautice",
          "it": "Sport acquatici"
        }
      ],
      "icon": "activity",
      "order": 5
    },
    {
      "name": {
        "en": "Spa & Wellness",
        "fr": "Spa et bien-être",
        "ru": "Спа и оздоровление",
        "ro": "Spa și wellness",
        "it": "Spa e benessere"
      },
      "values": [
        {
          "en": "Massage services",
          "fr": "Services de massage",
          "ru": "Массажные услуги",
          "ro": "Servicii de masaj",
          "it": "Servizi di massaggio"
        },
        {
          "en": "Sauna and steam room",
          "fr": "Sauna et hammam",
          "ru": "Сауна и парная",
          "ro": "Saună și baie de aburi",
          "it": "Sauna e bagno turco"
        }
      ],
      "icon": "heart-pulse",
      "order": 6
    },
    {
      "name": {
        "en": "Reception Services",
        "fr": "Services de réception",
        "ru": "Услуги стойки регистрации",
        "ro": "Servicii de recepție",
        "it": "Servizi di reception"
      },
      "values": [
        {
          "en": "24-hour front desk",
          "fr": "Réception ouverte 24h/24",
          "ru": "Круглосуточная стойка регистрации",
          "ro": "Recepție deschisă non-stop",
          "it": "Reception aperta 24 ore su 24"
        },
        {
          "en": "Airport transfer service",
          "fr": "Service de transfert aéroport",
          "ru": "Трансфер из аэропорта",
          "ro": "Serviciu de transfer de la aeroport",
          "it": "Servizio di trasferimento aeroportuale"
        }
      ],
      "icon": "concierge-bell",
      "order": 7
    }
  ]
}
'
Request URL
https://touristy.runasp.net/api/Hotels
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Hotel created successfully with ID 2",
  "data": {
    "id": 2,
    "name": "Red Sea Paradise Resort",
    "location": "Hurghada, Red Sea, Egypt",
    "description": "Red Sea Paradise Resort is a beautiful beachfront hotel in Hurghada, offering comfortable accommodation, stunning sea views, swimming pools, delicious dining options, and a variety of recreational activities. Enjoy a relaxing holiday with excellent hospitality and easy access to the beautiful beaches of the Red Sea.",
    "rate": 5,
    "createdAt": "2026-11-19T19:01:08.8956318Z",
    "updatedAt": null,
    "facilities": [
      {
        "id": "de1a91df-473b-4f99-adc6-c87ae609fdf3",
        "name": "Swimming Pool",
        "values": [
          "Outdoor swimming pool",
          "Children's pool"
        ],
        "icon": "waves",
        "order": 1
      },
      {
        "id": "59fcc103-b259-4da2-958a-17339978e03f",
        "name": "Restaurants & Dining",
        "values": [
          "Main buffet restaurant",
          "International cuisine"
        ],
        "icon": "utensils",
        "order": 2
      },
      {
        "id": "061daf46-ea99-490e-a8e4-a994714e7b47",
        "name": "Beach Access",
        "values": [
          "Private sandy beach",
          "Sun loungers and umbrellas"
        ],
        "icon": "umbrella",
        "order": 3
      },
      {
        "id": "652a17a8-aa90-40c5-badc-d6a60232abf2",
        "name": "Wi-Fi & Internet",
        "values": [
          "Free Wi-Fi in public areas",
          "Wi-Fi in guest rooms"
        ],
        "icon": "wifi",
        "order": 4
      },
      {
        "id": "5bfb96e9-7ce0-474d-a948-a64a07289931",
        "name": "Sports & Activities",
        "values": [
          "Snorkeling",
          "Beach volleyball",
          "Water sports"
        ],
        "icon": "activity",
        "order": 5
      },
      {
        "id": "995c4c52-2b02-41c5-8650-44b61a8ca68a",
        "name": "Spa & Wellness",
        "values": [
          "Massage services",
          "Sauna and steam room"
        ],
        "icon": "heart-pulse",
        "order": 6
      },
      {
        "id": "f16a3141-dce3-4c23-96c0-714ffec3d2e4",
        "name": "Reception Services",
        "values": [
          "24-hour front desk",
          "Airport transfer service"
        ],
        "icon": "concierge-bell",
        "order": 7
      }
    ],
    "images": [],
    "ratePlans": []
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 19:01:08 GMT 
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
    "location": "string",
    "description": "string",
    "rate": 0,
    "createdAt": "2026-11-19T19:05:22.163Z",
    "updatedAt": "2026-11-19T19:05:22.163Z",
    "facilities": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string",
        "values": [
          "string"
        ],
        "icon": "string",
        "order": 0
      }
    ],
    "images": [
      {
        "id": 0,
        "hotelId": 0,
        "imageUrl": "string",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "ratePlans": [
      {
        "id": 0,
        "hotelId": 0,
        "hotelName": "string",
        "name": "string",
        "description": "string",
        "createdAt": "2026-11-19T19:05:22.163Z",
        "updatedAt": "2026-11-19T19:05:22.163Z"
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
/api/Hotels/{id}


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
includeRatePlans
boolean
(query)

false
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/Hotels/1?language=en&includeRatePlans=false' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk1MTE1NjAzfQ.5QjMVkghDVsXzICyilPAEzm19T5ta4GpYrvY8TPYeyU'
Request URL
https://touristy.runasp.net/api/Hotels/1?language=en&includeRatePlans=false
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Hotel with ID 1 retrieved successfully",
  "data": {
    "id": 1,
    "name": "Red Sea Paradise Resort",
    "location": "Hurghada, Red Sea, Egypt",
    "description": "Red Sea Paradise Resort is a beautiful beachfront hotel in Hurghada, offering comfortable accommodation, stunning sea views, swimming pools, delicious dining options, and a variety of recreational activities. Enjoy a relaxing holiday with excellent hospitality and easy access to the beautiful beaches of the Red Sea.",
    "rate": 5,
    "createdAt": "2026-11-19T19:00:31.3144986",
    "updatedAt": null,
    "facilities": [
      {
        "id": "ca161f21-e9b7-4bbd-a333-c6eb6c391fa9",
        "name": "Swimming Pool",
        "values": [
          "Outdoor swimming pool",
          "Children's pool"
        ],
        "icon": "waves",
        "order": 1
      },
      {
        "id": "cd60fa58-8e8f-40b0-82c2-3b04c6421f01",
        "name": "Restaurants & Dining",
        "values": [
          "Main buffet restaurant",
          "International cuisine"
        ],
        "icon": "utensils",
        "order": 2
      },
      {
        "id": "07eb5ca0-72ab-4d5c-8c2e-be1b310310b5",
        "name": "Beach Access",
        "values": [
          "Private sandy beach",
          "Sun loungers and umbrellas"
        ],
        "icon": "umbrella",
        "order": 3
      },
      {
        "id": "d49efa11-5903-4305-84ea-0696387e7794",
        "name": "Wi-Fi & Internet",
        "values": [
          "Free Wi-Fi in public areas",
          "Wi-Fi in guest rooms"
        ],
        "icon": "wifi",
        "order": 4
      },
      {
        "id": "56e03267-e50c-4cfd-bebe-dd8e530afc86",
        "name": "Sports & Activities",
        "values": [
          "Snorkeling",
          "Beach volleyball",
          "Water sports"
        ],
        "icon": "activity",
        "order": 5
      },
      {
        "id": "46923f5d-69c8-4cc2-89c3-c56243855064",
        "name": "Spa & Wellness",
        "values": [
          "Massage services",
          "Sauna and steam room"
        ],
        "icon": "heart-pulse",
        "order": 6
      },
      {
        "id": "8843ed6b-8ca1-4eb6-8914-84504afdc900",
        "name": "Reception Services",
        "values": [
          "24-hour front desk",
          "Airport transfer service"
        ],
        "icon": "concierge-bell",
        "order": 7
      }
    ],
    "images": [],
    "ratePlans": []
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 19:00:51 GMT 
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
    "location": "string",
    "description": "string",
    "rate": 0,
    "createdAt": "2026-11-19T19:05:22.172Z",
    "updatedAt": "2026-11-19T19:05:22.172Z",
    "facilities": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string",
        "values": [
          "string"
        ],
        "icon": "string",
        "order": 0
      }
    ],
    "images": [
      {
        "id": 0,
        "hotelId": 0,
        "imageUrl": "string",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "ratePlans": [
      {
        "id": 0,
        "hotelId": 0,
        "hotelName": "string",
        "name": "string",
        "description": "string",
        "createdAt": "2026-11-19T19:05:22.172Z",
        "updatedAt": "2026-11-19T19:05:22.172Z"
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
/api/Hotels/{id}


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
  "name": {
    "en": "string",
    "fr": "string",
    "ru": "string",
    "ro": "string",
    "it": "string"
  },
  "location": {
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
  "rate": 0,
  "facilities": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": {
        "en": "string",
        "fr": "string",
        "ru": "string",
        "ro": "string",
        "it": "string"
      },
      "values": [
        {
          "en": "string",
          "fr": "string",
          "ru": "string",
          "ro": "string",
          "it": "string"
        }
      ],
      "icon": "string",
      "order": 0
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
    "name": "string",
    "location": "string",
    "description": "string",
    "rate": 0,
    "createdAt": "2026-11-19T19:05:22.178Z",
    "updatedAt": "2026-11-19T19:05:22.178Z",
    "facilities": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string",
        "values": [
          "string"
        ],
        "icon": "string",
        "order": 0
      }
    ],
    "images": [
      {
        "id": 0,
        "hotelId": 0,
        "imageUrl": "string",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "ratePlans": [
      {
        "id": 0,
        "hotelId": 0,
        "hotelName": "string",
        "name": "string",
        "description": "string",
        "createdAt": "2026-11-19T19:05:22.178Z",
        "updatedAt": "2026-11-19T19:05:22.178Z"
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
/api/Hotels/{id}


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
  'https://touristy.runasp.net/api/Hotels/1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk1MTE1NjAzfQ.5QjMVkghDVsXzICyilPAEzm19T5ta4GpYrvY8TPYeyU'
Request URL
https://touristy.runasp.net/api/Hotels/1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Hotel with ID 1 deleted successfully",
  "data": ""
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 19:01:02 GMT 
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
/api/Hotels/{hotelId}/facilities/reorder


Parameters
Cancel
Reset
Name	Description
hotelId *
integer($int32)
(path)
2
Request body

application/json
{
  "facilityIds": [
    "f16a3141-dce3-4c23-96c0-714ffec3d2e4",
    "995c4c52-2b02-41c5-8650-44b61a8ca68a",
    "5bfb96e9-7ce0-474d-a948-a64a07289931",
    "652a17a8-aa90-40c5-badc-d6a60232abf2",
    "061daf46-ea99-490e-a8e4-a994714e7b47",
    "59fcc103-b259-4da2-958a-17339978e03f",
    "de1a91df-473b-4f99-adc6-c87ae609fdf3"
  ]
}
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://touristy.runasp.net/api/Hotels/2/facilities/reorder' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzk1MTE1NjAzfQ.5QjMVkghDVsXzICyilPAEzm19T5ta4GpYrvY8TPYeyU' \
  -H 'Content-Type: application/json' \
  -d '{
  "facilityIds": [
    "f16a3141-dce3-4c23-96c0-714ffec3d2e4",
    "995c4c52-2b02-41c5-8650-44b61a8ca68a",
    "5bfb96e9-7ce0-474d-a948-a64a07289931",
    "652a17a8-aa90-40c5-badc-d6a60232abf2",
    "061daf46-ea99-490e-a8e4-a994714e7b47",
    "59fcc103-b259-4da2-958a-17339978e03f",
    "de1a91df-473b-4f99-adc6-c87ae609fdf3"
  ]
}'
Request URL
https://touristy.runasp.net/api/Hotels/2/facilities/reorder
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Facilities for Hotel ID 2 reordered successfully",
  "data": {
    "id": 2,
    "name": "Red Sea Paradise Resort",
    "location": "Hurghada, Red Sea, Egypt",
    "description": "Red Sea Paradise Resort is a beautiful beachfront hotel in Hurghada, offering comfortable accommodation, stunning sea views, swimming pools, delicious dining options, and a variety of recreational activities. Enjoy a relaxing holiday with excellent hospitality and easy access to the beautiful beaches of the Red Sea.",
    "rate": 5,
    "createdAt": "2026-11-19T19:01:08.8956318",
    "updatedAt": null,
    "facilities": [
      {
        "id": "f16a3141-dce3-4c23-96c0-714ffec3d2e4",
        "name": "Reception Services",
        "values": [
          "24-hour front desk",
          "Airport transfer service"
        ],
        "icon": "concierge-bell",
        "order": 1
      },
      {
        "id": "995c4c52-2b02-41c5-8650-44b61a8ca68a",
        "name": "Spa & Wellness",
        "values": [
          "Massage services",
          "Sauna and steam room"
        ],
        "icon": "heart-pulse",
        "order": 2
      },
      {
        "id": "5bfb96e9-7ce0-474d-a948-a64a07289931",
        "name": "Sports & Activities",
        "values": [
          "Snorkeling",
          "Beach volleyball",
          "Water sports"
        ],
        "icon": "activity",
        "order": 3
      },
      {
        "id": "652a17a8-aa90-40c5-badc-d6a60232abf2",
        "name": "Wi-Fi & Internet",
        "values": [
          "Free Wi-Fi in public areas",
          "Wi-Fi in guest rooms"
        ],
        "icon": "wifi",
        "order": 4
      },
      {
        "id": "061daf46-ea99-490e-a8e4-a994714e7b47",
        "name": "Beach Access",
        "values": [
          "Private sandy beach",
          "Sun loungers and umbrellas"
        ],
        "icon": "umbrella",
        "order": 5
      },
      {
        "id": "59fcc103-b259-4da2-958a-17339978e03f",
        "name": "Restaurants & Dining",
        "values": [
          "Main buffet restaurant",
          "International cuisine"
        ],
        "icon": "utensils",
        "order": 6
      },
      {
        "id": "de1a91df-473b-4f99-adc6-c87ae609fdf3",
        "name": "Swimming Pool",
        "values": [
          "Outdoor swimming pool",
          "Children's pool"
        ],
        "icon": "waves",
        "order": 7
      }
    ],
    "images": [],
    "ratePlans": []
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,19 Nov 2026 19:04:54 GMT 
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
    "location": "string",
    "description": "string",
    "rate": 0,
    "createdAt": "2026-11-19T19:05:22.197Z",
    "updatedAt": "2026-11-19T19:05:22.197Z",
    "facilities": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string",
        "values": [
          "string"
        ],
        "icon": "string",
        "order": 0
      }
    ],
    "images": [
      {
        "id": 0,
        "hotelId": 0,
        "imageUrl": "string",
        "isPrimary": true,
        "displayOrder": 0
      }
    ],
    "ratePlans": [
      {
        "id": 0,
        "hotelId": 0,
        "hotelName": "string",
        "name": "string",
        "description": "string",
        "createdAt": "2026-11-19T19:05:22.197Z",
        "updatedAt": "2026-11-19T19:05:22.197Z"
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