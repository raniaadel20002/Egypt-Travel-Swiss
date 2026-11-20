	ReviewStatusReviewStatusinteger($int32)
Enum:
[ 0, 1, 2 ] 0 means pending , 1 means approved , 2 means rejected 

DivingCourses


GET
/api/DivingCourses


Parameters
Cancel
Name	Description
pageNumber
integer($int32)
(query)
1
pageSize
integer($int32)
(query)
10
Accept-Language
string
(header)
en
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/DivingCourses?pageNumber=1&pageSize=10' \
  -H 'accept: text/plain' \
  -H 'Accept-Language: en' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4'
Request URL
https://touristy.runasp.net/api/DivingCourses?pageNumber=1&pageSize=10
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Diving courses retrieved successfully",
  "data": {
    "data": [
      {
        "id": "7b07bcfc-d89b-449a-876a-1f135cac3303",
        "name": "PADI Open Water Diving Course",
        "description": "Discover the underwater world of the Red Sea with our PADI Open Water Diving Course in Hurghada. Learn essential diving skills from certified professional instructors, practice in confined water, and explore beautiful coral reefs during open-water dives. This course is suitable for beginners with no previous diving experience.",
        "price": 350,
        "currency": "EUR",
        "facilities": [
          {
            "id": "82a46707-d7fb-4c4e-b358-db97e9677c83",
            "name": "Professional Instruction",
            "icon": "graduation-cap",
            "values": "Certified PADI diving instructors",
            "order": 1
          },
          {
            "id": "48c33148-550b-4c66-aa9b-4f0a0b8cbe4e",
            "name": "Diving Equipment",
            "icon": "life-buoy",
            "values": "Full diving equipment provided",
            "order": 2
          },
          {
            "id": "eee3298b-d600-4ab3-9185-05f8c5c56274",
            "name": "Practical Training",
            "icon": "waves",
            "values": "Confined water training and open-water dives",
            "order": 3
          },
          {
            "id": "be218d14-cc2b-40fd-a517-0260b33867bd",
            "name": "Learning Materials",
            "icon": "book-open",
            "values": "PADI learning materials and course theory",
            "order": 4
          },
          {
            "id": "f770e8c0-9078-4567-b0ed-0f9958a7dd30",
            "name": "Certification",
            "icon": "award",
            "values": "PADI Open Water Diver certification upon successful completion",
            "order": 5
          },
          {
            "id": "01ed5145-9b9b-4041-84fa-7353e0b5fa6b",
            "name": "Transportation",
            "icon": "bus",
            "values": "Hotel pickup and drop-off in Hurghada",
            "order": 6
          }
        ],
        "images": [
          {
            "id": "4eb9ffa3-a375-4f3e-8e4f-b672182f7b8e",
            "imageUrl": "images/diving-courses/77daf7d8-f095-4be6-a263-b70c49b8283d.webp",
            "order": 1
          },
          {
            "id": "017ab01d-0314-4720-b021-6ea8cc4caf7c",
            "imageUrl": "images/diving-courses/cf5ff376-016a-42c1-bd70-47d1c2893ecd.webp",
            "order": 2
          },
          {
            "id": "c001fc4c-3007-47f4-8ec8-5e810096c712",
            "imageUrl": "images/diving-courses/16c958a8-24ce-4260-ab76-0adbca308f5a.webp",
            "order": 3
          }
        ],
        "averageRating": 0,
        "totalReviews": 0,
        "createdAt": "2026-11-20T11:56:23.644298"
      }
    ],
    "pageNumber": 1,
    "pageSize": 10,
    "totalCount": 1
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 11:57:59 GMT 
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
/api/DivingCourses


Parameters
Cancel
Reset
No parameters

Request body

application/json

{
  "name": {
    "en": "PADI Open Water Diving Course",
    "fr": "Cours de plongée PADI Open Water",
    "ru": "Курс дайвинга PADI Open Water",
    "ro": "Curs de scufundări PADI Open Water",
    "it": "Corso di immersioni PADI Open Water"
  },
  "description": {
    "en": "Discover the underwater world of the Red Sea with our PADI Open Water Diving Course in Hurghada. Learn essential diving skills from certified professional instructors, practice in confined water, and explore beautiful coral reefs during open-water dives. This course is suitable for beginners with no previous diving experience.",
    "fr": "Découvrez le monde sous-marin de la mer Rouge avec notre cours de plongée PADI Open Water à Hurghada. Apprenez les compétences essentielles de plongée avec des instructeurs professionnels certifiés, entraînez-vous en milieu protégé et explorez de magnifiques récifs coralliens lors de plongées en milieu naturel. Ce cours convient aux débutants sans expérience préalable.",
    "ru": "Откройте для себя подводный мир Красного моря на курсе дайвинга PADI Open Water в Хургаде. Изучите основные навыки дайвинга под руководством сертифицированных инструкторов, пройдите практические занятия в бассейне и исследуйте красивые коралловые рифы во время погружений в открытой воде. Курс подходит для начинающих без опыта дайвинга.",
    "ro": "Descoperiți lumea subacvatică a Mării Roșii cu cursul nostru de scufundări PADI Open Water din Hurghada. Învățați abilitățile esențiale de scufundare de la instructori profesioniști certificați, exersați în apă controlată și explorați recifele de corali în timpul scufundărilor în ape deschise. Cursul este potrivit pentru începători fără experiență anterioară.",
    "it": "Scoprite il mondo sottomarino del Mar Rosso con il nostro corso di immersioni PADI Open Water a Hurghada. Imparate le abilità essenziali di immersione con istruttori professionisti certificati, esercitatevi in acque delimitate ed esplorate splendide barriere coralline durante le immersioni in acque libere. Il corso è adatto ai principianti senza esperienza precedente."
  },
  "price": 350,
  "facilities": [
    {
      "name": {
        "en": "Professional Instruction",
        "fr": "Formation professionnelle",
        "ru": "Профессиональное обучение",
        "ro": "Instruire profesională",
        "it": "Formazione professionale"
      },
      "icon": "graduation-cap",
      "values": {
        "en": "Certified PADI diving instructors",
        "fr": "Instructeurs de plongée PADI certifiés",
        "ru": "Сертифицированные инструкторы PADI",
        "ro": "Instructori de scufundări PADI certificați",
        "it": "Istruttori subacquei PADI certificati"
      }
    },
    {
      "name": {
        "en": "Diving Equipment",
        "fr": "Équipement de plongée",
        "ru": "Снаряжение для дайвинга",
        "ro": "Echipament de scufundare",
        "it": "Attrezzatura subacquea"
      },
      "icon": "life-buoy",
      "values": {
        "en": "Full diving equipment provided",
        "fr": "Équipement complet de plongée fourni",
        "ru": "Полный комплект снаряжения для дайвинга",
        "ro": "Echipament complet de scufundare inclus",
        "it": "Attrezzatura completa per immersioni inclusa"
      }
    },
    {
      "name": {
        "en": "Practical Training",
        "fr": "Formation pratique",
        "ru": "Практическое обучение",
        "ro": "Instruire practică",
        "it": "Formazione pratica"
      },
      "icon": "waves",
      "values": {
        "en": "Confined water training and open-water dives",
        "fr": "Entraînement en milieu protégé et plongées en milieu naturel",
        "ru": "Практика в бассейне и погружения в открытой воде",
        "ro": "Antrenament în apă controlată și scufundări în ape deschise",
        "it": "Addestramento in acque delimitate e immersioni in acque libere"
      }
    },
    {
      "name": {
        "en": "Learning Materials",
        "fr": "Matériel pédagogique",
        "ru": "Учебные материалы",
        "ro": "Materiale didactice",
        "it": "Materiale didattico"
      },
      "icon": "book-open",
      "values": {
        "en": "PADI learning materials and course theory",
        "fr": "Supports pédagogiques PADI et théorie du cours",
        "ru": "Учебные материалы PADI и теоретическая подготовка",
        "ro": "Materiale educaționale PADI și teorie",
        "it": "Materiali didattici PADI e teoria del corso"
      }
    },
    {
      "name": {
        "en": "Certification",
        "fr": "Certification",
        "ru": "Сертификация",
        "ro": "Certificare",
        "it": "Certificazione"
      },
      "icon": "award",
      "values": {
        "en": "PADI Open Water Diver certification upon successful completion",
        "fr": "Certification PADI Open Water Diver après réussite du cours",
        "ru": "Сертификат PADI Open Water Diver после успешного завершения курса",
        "ro": "Certificare PADI Open Water Diver după finalizarea cu succes a cursului",
        "it": "Certificazione PADI Open Water Diver al completamento del corso"
      }
    },
    {
      "name": {
        "en": "Transportation",
        "fr": "Transport",
        "ru": "Транспорт",
        "ro": "Transport",
        "it": "Trasporto"
      },
      "icon": "bus",
      "values": {
        "en": "Hotel pickup and drop-off in Hurghada",
        "fr": "Prise en charge et retour à l'hôtel à Hurghada",
        "ru": "Трансфер из отеля и обратно в Хургаде",
        "ro": "Preluare și întoarcere la hotel în Hurghada",
        "it": "Prelievo e rientro in hotel a Hurghada"
      }
    }
  ]
}

Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristy.runasp.net/api/DivingCourses' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4' \
  -H 'Content-Type: application/json' \
  -d '
{
  "name": {
    "en": "PADI Open Water Diving Course",
    "fr": "Cours de plongée PADI Open Water",
    "ru": "Курс дайвинга PADI Open Water",
    "ro": "Curs de scufundări PADI Open Water",
    "it": "Corso di immersioni PADI Open Water"
  },
  "description": {
    "en": "Discover the underwater world of the Red Sea with our PADI Open Water Diving Course in Hurghada. Learn essential diving skills from certified professional instructors, practice in confined water, and explore beautiful coral reefs during open-water dives. This course is suitable for beginners with no previous diving experience.",
    "fr": "Découvrez le monde sous-marin de la mer Rouge avec notre cours de plongée PADI Open Water à Hurghada. Apprenez les compétences essentielles de plongée avec des instructeurs professionnels certifiés, entraînez-vous en milieu protégé et explorez de magnifiques récifs coralliens lors de plongées en milieu naturel. Ce cours convient aux débutants sans expérience préalable.",
    "ru": "Откройте для себя подводный мир Красного моря на курсе дайвинга PADI Open Water в Хургаде. Изучите основные навыки дайвинга под руководством сертифицированных инструкторов, пройдите практические занятия в бассейне и исследуйте красивые коралловые рифы во время погружений в открытой воде. Курс подходит для начинающих без опыта дайвинга.",
    "ro": "Descoperiți lumea subacvatică a Mării Roșii cu cursul nostru de scufundări PADI Open Water din Hurghada. Învățați abilitățile esențiale de scufundare de la instructori profesioniști certificați, exersați în apă controlată și explorați recifele de corali în timpul scufundărilor în ape deschise. Cursul este potrivit pentru începători fără experiență anterioară.",
    "it": "Scoprite il mondo sottomarino del Mar Rosso con il nostro corso di immersioni PADI Open Water a Hurghada. Imparate le abilità essenziali di immersione con istruttori professionisti certificati, esercitatevi in acque delimitate ed esplorate splendide barriere coralline durante le immersioni in acque libere. Il corso è adatto ai principianti senza esperienza precedente."
  },
  "price": 350,
  "facilities": [
    {
      "name": {
        "en": "Professional Instruction",
        "fr": "Formation professionnelle",
        "ru": "Профессиональное обучение",
        "ro": "Instruire profesională",
        "it": "Formazione professionale"
      },
      "icon": "graduation-cap",
      "values": {
        "en": "Certified PADI diving instructors",
        "fr": "Instructeurs de plongée PADI certifiés",
        "ru": "Сертифицированные инструкторы PADI",
        "ro": "Instructori de scufundări PADI certificați",
        "it": "Istruttori subacquei PADI certificati"
      }
    },
    {
      "name": {
        "en": "Diving Equipment",
        "fr": "Équipement de plongée",
        "ru": "Снаряжение для дайвинга",
        "ro": "Echipament de scufundare",
        "it": "Attrezzatura subacquea"
      },
      "icon": "life-buoy",
      "values": {
        "en": "Full diving equipment provided",
        "fr": "Équipement complet de plongée fourni",
        "ru": "Полный комплект снаряжения для дайвинга",
        "ro": "Echipament complet de scufundare inclus",
        "it": "Attrezzatura completa per immersioni inclusa"
      }
    },
    {
      "name": {
        "en": "Practical Training",
        "fr": "Formation pratique",
        "ru": "Практическое обучение",
        "ro": "Instruire practică",
        "it": "Formazione pratica"
      },
      "icon": "waves",
      "values": {
        "en": "Confined water training and open-water dives",
        "fr": "Entraînement en milieu protégé et plongées en milieu naturel",
        "ru": "Практика в бассейне и погружения в открытой воде",
        "ro": "Antrenament în apă controlată și scufundări în ape deschise",
        "it": "Addestramento in acque delimitate e immersioni in acque libere"
      }
    },
    {
      "name": {
        "en": "Learning Materials",
        "fr": "Matériel pédagogique",
        "ru": "Учебные материалы",
        "ro": "Materiale didactice",
        "it": "Materiale didattico"
      },
      "icon": "book-open",
      "values": {
        "en": "PADI learning materials and course theory",
        "fr": "Supports pédagogiques PADI et théorie du cours",
        "ru": "Учебные материалы PADI и теоретическая подготовка",
        "ro": "Materiale educaționale PADI și teorie",
        "it": "Materiali didattici PADI e teoria del corso"
      }
    },
    {
      "name": {
        "en": "Certification",
        "fr": "Certification",
        "ru": "Сертификация",
        "ro": "Certificare",
        "it": "Certificazione"
      },
      "icon": "award",
      "values": {
        "en": "PADI Open Water Diver certification upon successful completion",
        "fr": "Certification PADI Open Water Diver après réussite du cours",
        "ru": "Сертификат PADI Open Water Diver после успешного завершения курса",
        "ro": "Certificare PADI Open Water Diver după finalizarea cu succes a cursului",
        "it": "Certificazione PADI Open Water Diver al completamento del corso"
      }
    },
    {
      "name": {
        "en": "Transportation",
        "fr": "Transport",
        "ru": "Транспорт",
        "ro": "Transport",
        "it": "Trasporto"
      },
      "icon": "bus",
      "values": {
        "en": "Hotel pickup and drop-off in Hurghada",
        "fr": "Prise en charge et retour à l'\''hôtel à Hurghada",
        "ru": "Трансфер из отеля и обратно в Хургаде",
        "ro": "Preluare și întoarcere la hotel în Hurghada",
        "it": "Prelievo e rientro in hotel a Hurghada"
      }
    }
  ]
}
'
Request URL
https://touristy.runasp.net/api/DivingCourses
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Diving course created successfully with ID 7b07bcfc-d89b-449a-876a-1f135cac3303",
  "data": {
    "id": "7b07bcfc-d89b-449a-876a-1f135cac3303",
    "name": "PADI Open Water Diving Course",
    "description": "Discover the underwater world of the Red Sea with our PADI Open Water Diving Course in Hurghada. Learn essential diving skills from certified professional instructors, practice in confined water, and explore beautiful coral reefs during open-water dives. This course is suitable for beginners with no previous diving experience.",
    "price": 350,
    "currency": "EUR",
    "facilities": [
      {
        "id": "82a46707-d7fb-4c4e-b358-db97e9677c83",
        "name": "Professional Instruction",
        "icon": "graduation-cap",
        "values": "Certified PADI diving instructors",
        "order": 1
      },
      {
        "id": "48c33148-550b-4c66-aa9b-4f0a0b8cbe4e",
        "name": "Diving Equipment",
        "icon": "life-buoy",
        "values": "Full diving equipment provided",
        "order": 2
      },
      {
        "id": "eee3298b-d600-4ab3-9185-05f8c5c56274",
        "name": "Practical Training",
        "icon": "waves",
        "values": "Confined water training and open-water dives",
        "order": 3
      },
      {
        "id": "be218d14-cc2b-40fd-a517-0260b33867bd",
        "name": "Learning Materials",
        "icon": "book-open",
        "values": "PADI learning materials and course theory",
        "order": 4
      },
      {
        "id": "f770e8c0-9078-4567-b0ed-0f9958a7dd30",
        "name": "Certification",
        "icon": "award",
        "values": "PADI Open Water Diver certification upon successful completion",
        "order": 5
      },
      {
        "id": "01ed5145-9b9b-4041-84fa-7353e0b5fa6b",
        "name": "Transportation",
        "icon": "bus",
        "values": "Hotel pickup and drop-off in Hurghada",
        "order": 6
      }
    ],
    "images": [],
    "averageRating": 0,
    "totalReviews": 0,
    "createdAt": "2026-11-20T11:56:23.644298Z"
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 11:56:23 GMT 
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
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "string",
    "description": "string",
    "price": 0,
    "currency": "string",
    "facilities": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string",
        "icon": "string",
        "values": "string",
        "order": 0
      }
    ],
    "images": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "imageUrl": "string",
        "order": 0
      }
    ],
    "averageRating": 0,
    "totalReviews": 0,
    "createdAt": "2026-11-20T12:01:47.513Z"
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
/api/DivingCourses/{id}


Parameters
Cancel
Name	Description
id *
string($uuid)
(path)
7b07bcfc-d89b-449a-876a-1f135cac3303
Accept-Language
string
(header)
fr
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/DivingCourses/7b07bcfc-d89b-449a-876a-1f135cac3303' \
  -H 'accept: text/plain' \
  -H 'Accept-Language: fr' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4'
Request URL
https://touristy.runasp.net/api/DivingCourses/7b07bcfc-d89b-449a-876a-1f135cac3303
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Diving course with ID 7b07bcfc-d89b-449a-876a-1f135cac3303 retrieved successfully",
  "data": {
    "id": "7b07bcfc-d89b-449a-876a-1f135cac3303",
    "name": "Cours de plongée PADI Open Water",
    "description": "Découvrez le monde sous-marin de la mer Rouge avec notre cours de plongée PADI Open Water à Hurghada. Apprenez les compétences essentielles de plongée avec des instructeurs professionnels certifiés, entraînez-vous en milieu protégé et explorez de magnifiques récifs coralliens lors de plongées en milieu naturel. Ce cours convient aux débutants sans expérience préalable.",
    "price": 350,
    "currency": "EUR",
    "facilities": [
      {
        "id": "82a46707-d7fb-4c4e-b358-db97e9677c83",
        "name": "Formation professionnelle",
        "icon": "graduation-cap",
        "values": "Instructeurs de plongée PADI certifiés",
        "order": 1
      },
      {
        "id": "48c33148-550b-4c66-aa9b-4f0a0b8cbe4e",
        "name": "Équipement de plongée",
        "icon": "life-buoy",
        "values": "Équipement complet de plongée fourni",
        "order": 2
      },
      {
        "id": "eee3298b-d600-4ab3-9185-05f8c5c56274",
        "name": "Formation pratique",
        "icon": "waves",
        "values": "Entraînement en milieu protégé et plongées en milieu naturel",
        "order": 3
      },
      {
        "id": "be218d14-cc2b-40fd-a517-0260b33867bd",
        "name": "Matériel pédagogique",
        "icon": "book-open",
        "values": "Supports pédagogiques PADI et théorie du cours",
        "order": 4
      },
      {
        "id": "f770e8c0-9078-4567-b0ed-0f9958a7dd30",
        "name": "Certification",
        "icon": "award",
        "values": "Certification PADI Open Water Diver après réussite du cours",
        "order": 5
      },
      {
        "id": "01ed5145-9b9b-4041-84fa-7353e0b5fa6b",
        "name": "Transportation",
        "icon": "bus",
        "values": "Hotel pickup and drop-off in Hurghada",
        "order": 6
      }
    ],
    "images": [
      {
        "id": "4eb9ffa3-a375-4f3e-8e4f-b672182f7b8e",
        "imageUrl": "images/diving-courses/77daf7d8-f095-4be6-a263-b70c49b8283d.webp",
        "order": 1
      },
      {
        "id": "017ab01d-0314-4720-b021-6ea8cc4caf7c",
        "imageUrl": "images/diving-courses/cf5ff376-016a-42c1-bd70-47d1c2893ecd.webp",
        "order": 2
      },
      {
        "id": "c001fc4c-3007-47f4-8ec8-5e810096c712",
        "imageUrl": "images/diving-courses/16c958a8-24ce-4260-ab76-0adbca308f5a.webp",
        "order": 3
      }
    ],
    "averageRating": 0,
    "totalReviews": 0,
    "createdAt": "2026-11-20T11:56:23.644298"
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 11:57:48 GMT 
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
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "string",
    "description": "string",
    "price": 0,
    "currency": "string",
    "facilities": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string",
        "icon": "string",
        "values": "string",
        "order": 0
      }
    ],
    "images": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "imageUrl": "string",
        "order": 0
      }
    ],
    "averageRating": 0,
    "totalReviews": 0,
    "createdAt": "2026-11-20T12:01:47.522Z"
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
/api/DivingCourses/{id}


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Request body

application/json
Example Value
Schema
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
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
  "price": 0,
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
      "icon": "string",
      "values": {
        "en": "string",
        "fr": "string",
        "ru": "string",
        "ro": "string",
        "it": "string"
      },
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
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "string",
    "description": "string",
    "price": 0,
    "currency": "string",
    "facilities": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string",
        "icon": "string",
        "values": "string",
        "order": 0
      }
    ],
    "images": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "imageUrl": "string",
        "order": 0
      }
    ],
    "averageRating": 0,
    "totalReviews": 0,
    "createdAt": "2026-11-20T12:01:47.531Z"
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
/api/DivingCourses/{id}


Parameters
Try it out
Name	Description
id *
string($uuid)
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
/api/DivingCourses/{courseId}/facilities/reorder


Parameters
Try it out
Name	Description
courseId *
string($uuid)
(path)
courseId
Request body

application/json
Example Value
Schema
{
  "items": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
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
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "string",
    "description": "string",
    "price": 0,
    "currency": "string",
    "facilities": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "string",
        "icon": "string",
        "values": "string",
        "order": 0
      }
    ],
    "images": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "imageUrl": "string",
        "order": 0
      }
    ],
    "averageRating": 0,
    "totalReviews": 0,
    "createdAt": "2026-11-20T12:01:47.544Z"
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
/api/DivingCourses/{courseId}/images


Parameters
Cancel
Reset
Name	Description
courseId *
string($uuid)
(path)
7b07bcfc-d89b-449a-876a-1f135cac3303
Request body

multipart/form-data
file
string($binary)
6th of October.jpg
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristy.runasp.net/api/DivingCourses/7b07bcfc-d89b-449a-876a-1f135cac3303/images' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@6th of October.jpg;type=image/jpeg'
Request URL
https://touristy.runasp.net/api/DivingCourses/7b07bcfc-d89b-449a-876a-1f135cac3303/images
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "id": "c001fc4c-3007-47f4-8ec8-5e810096c712",
    "imageUrl": "images/diving-courses/16c958a8-24ce-4260-ab76-0adbca308f5a.webp",
    "order": 3
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 11:57:27 GMT 
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
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "imageUrl": "string",
    "order": 0
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
/api/DivingCourses/{courseId}/images


Parameters
Cancel
Name	Description
courseId *
string($uuid)
(path)
7b07bcfc-d89b-449a-876a-1f135cac3303
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/DivingCourses/7b07bcfc-d89b-449a-876a-1f135cac3303/images' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4'
Request URL
https://touristy.runasp.net/api/DivingCourses/7b07bcfc-d89b-449a-876a-1f135cac3303/images
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Images for course ID 7b07bcfc-d89b-449a-876a-1f135cac3303 retrieved successfully",
  "data": [
    {
      "id": "4eb9ffa3-a375-4f3e-8e4f-b672182f7b8e",
      "imageUrl": "images/diving-courses/77daf7d8-f095-4be6-a263-b70c49b8283d.webp",
      "order": 1
    },
    {
      "id": "017ab01d-0314-4720-b021-6ea8cc4caf7c",
      "imageUrl": "images/diving-courses/cf5ff376-016a-42c1-bd70-47d1c2893ecd.webp",
      "order": 2
    },
    {
      "id": "c001fc4c-3007-47f4-8ec8-5e810096c712",
      "imageUrl": "images/diving-courses/16c958a8-24ce-4260-ab76-0adbca308f5a.webp",
      "order": 3
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 11:57:33 GMT 
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
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "imageUrl": "string",
      "order": 0
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
/api/DivingCourses/{courseId}/images/{imageId}


Parameters
Try it out
Name	Description
courseId *
string($uuid)
(path)
courseId
imageId *
string($uuid)
(path)
imageId
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
/api/DivingCourses/{courseId}/images/reorder


Parameters
Try it out
Name	Description
courseId *
string($uuid)
(path)
courseId
Request body

application/json
Example Value
Schema
{
  "items": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
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
  "data": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "imageUrl": "string",
      "order": 0
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
/api/DivingCourses/{courseId}/reviews


Parameters
Cancel
Reset
Name	Description
courseId *
string($uuid)
(path)
7b07bcfc-d89b-449a-876a-1f135cac3303
Request body

application/json
{
  "rating": 5,
  "fullName": "example full name",
  "phone": "13213265465",
  "comment": "wowo such a great course thx a lot "
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://touristy.runasp.net/api/DivingCourses/7b07bcfc-d89b-449a-876a-1f135cac3303/reviews' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4' \
  -H 'Content-Type: application/json' \
  -d '{
  "rating": 5,
  "fullName": "example full name",
  "phone": "13213265465",
  "comment": "wowo such a great course thx a lot "
}'
Request URL
https://touristy.runasp.net/api/DivingCourses/7b07bcfc-d89b-449a-876a-1f135cac3303/reviews
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Review submitted successfully. It will be visible after approval.",
  "data": {
    "id": "db2c4308-2a71-4e81-a92b-cad115a6eaff",
    "fullName": "example full name",
    "phone": "13213265465",
    "divingCourseId": "7b07bcfc-d89b-449a-876a-1f135cac3303",
    "rating": 5,
    "comment": "wowo such a great course thx a lot ",
    "status": 0,
    "createdAt": "2026-11-20T11:58:59.5002855Z",
    "updatedAt": null
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 11:58:58 GMT 
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
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "fullName": "string",
    "phone": "string",
    "divingCourseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "rating": 0,
    "comment": "string",
    "status": 0,
    "createdAt": "2026-11-20T12:01:47.572Z",
    "updatedAt": "2026-11-20T12:01:47.572Z"
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
/api/DivingCourses/{courseId}/reviews


Parameters
Cancel
Name	Description
courseId *
string($uuid)
(path)
7b07bcfc-d89b-449a-876a-1f135cac3303
pageNumber
integer($int32)
(query)
1
pageSize
integer($int32)
(query)
10
status
integer($int32)
(query)

--
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/DivingCourses/7b07bcfc-d89b-449a-876a-1f135cac3303/reviews?pageNumber=1&pageSize=10' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4'
Request URL
https://touristy.runasp.net/api/DivingCourses/7b07bcfc-d89b-449a-876a-1f135cac3303/reviews?pageNumber=1&pageSize=10
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Reviews retrieved successfully",
  "data": {
    "data": [
      {
        "id": "db2c4308-2a71-4e81-a92b-cad115a6eaff",
        "fullName": "example full name",
        "phone": "13213265465",
        "divingCourseId": "7b07bcfc-d89b-449a-876a-1f135cac3303",
        "rating": 5,
        "comment": "wowo such a great course thx a lot ",
        "status": 0,
        "createdAt": "2026-11-20T11:58:59.5002855",
        "updatedAt": null
      }
    ],
    "pageNumber": 1,
    "pageSize": 10,
    "totalCount": 1
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 11:59:06 GMT 
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

PATCH
/api/DivingCourses/reviews/{reviewId}/status


Parameters
Cancel
Reset
Name	Description
reviewId *
string($uuid)
(path)
db2c4308-2a71-4e81-a92b-cad115a6eaff
Request body

application/json
{
  "status":1
}
Execute
Clear
Responses
Curl

curl -X 'PATCH' \
  'https://touristy.runasp.net/api/DivingCourses/reviews/db2c4308-2a71-4e81-a92b-cad115a6eaff/status' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4' \
  -H 'Content-Type: application/json' \
  -d '{
  "status":1
}'
Request URL
https://touristy.runasp.net/api/DivingCourses/reviews/db2c4308-2a71-4e81-a92b-cad115a6eaff/status
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Review status updated to Approved",
  "data": {
    "id": "db2c4308-2a71-4e81-a92b-cad115a6eaff",
    "fullName": "example full name",
    "phone": "13213265465",
    "divingCourseId": "7b07bcfc-d89b-449a-876a-1f135cac3303",
    "rating": 5,
    "comment": "wowo such a great course thx a lot ",
    "status": 1,
    "createdAt": "2026-11-20T11:58:59.5002855",
    "updatedAt": "2026-11-20T12:01:47.8194752Z"
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 12:01:47 GMT 
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
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "fullName": "string",
    "phone": "string",
    "divingCourseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "rating": 0,
    "comment": "string",
    "status": 0,
    "createdAt": "2026-11-20T12:01:47.587Z",
    "updatedAt": "2026-11-20T12:01:47.587Z"
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
/api/DivingCourses/{courseId}/reviews/average


Parameters
Cancel
Name	Description
courseId *
string($uuid)
(path)
7b07bcfc-d89b-449a-876a-1f135cac3303
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://touristy.runasp.net/api/DivingCourses/7b07bcfc-d89b-449a-876a-1f135cac3303/reviews/average' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTc3ODQ1Nn0.iJGbdZ2RYtmpR_H1N9sbx_pHPlajpPSsoHZw2sHdZp4'
Request URL
https://touristy.runasp.net/api/DivingCourses/7b07bcfc-d89b-449a-876a-1f135cac3303/reviews/average
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Average rating retrieved successfully",
  "data": {
    "courseId": "7b07bcfc-d89b-449a-876a-1f135cac3303",
    "averageRating": 5,
    "totalReviews": 1,
    "ratingDistribution": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 1
    }
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Fri,20 Nov 2026 12:01:10 GMT 
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
    "courseId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "averageRating": 0,
    "totalReviews": 0,
    "ratingDistribution": {
      "additionalProp1": 0,
      "additionalProp2": 0,
      "additionalProp3": 0
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