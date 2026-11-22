const https = require('https');
const fs = require('fs');
const path = require('path');

const API_BASE_URL = 'https://touristy.runasp.net';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTk1MDkxMn0.tlSlVDTYaFJlltjqX4_GLNUtYc0E6BBfu9q87NHldBY';

// Helper to make HTTP requests
function makeRequest(method, endpoint, data = null, isFormData = false) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, API_BASE_URL);
    const options = {
      method: method,
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Accept': 'application/json',
      },
      rejectUnauthorized: false // For development only
    };

    if (data && !isFormData) {
      options.headers['Content-Type'] = 'application/json';
    }

    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const response = body ? JSON.parse(body) : {};
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(response);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${body}`));
          }
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    });

    req.on('error', reject);

    if (data && !isFormData) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Hotel data
const hotels = [
  {
    name: {
      en: "Red Sea Reef Resort",
      fr: "Resort Récif de la Mer Rouge",
      ru: "Курорт Коралловый Риф",
      ro: "Resort Recif Marea Rosie",
      it: "Resort Reef del Mar Rosso"
    },
    location: {
      en: "Hurghada, Red Sea",
      fr: "Hurghada, Mer Rouge",
      ru: "Хургада, Красное море",
      ro: "Hurghada, Marea Rosie",
      it: "Hurghada, Mar Rosso"
    },
    description: {
      en: "Luxury beachfront resort with direct Red Sea access, featuring pristine coral reefs, multiple swimming pools, and world-class diving facilities. Perfect for underwater enthusiasts and beach lovers.",
      fr: "Resort de luxe en bord de mer avec accès direct à la Mer Rouge, offrant des récifs coralliens immaculés, plusieurs piscines et des installations de plongée de classe mondiale. Parfait pour les passionnés de plongée et les amoureux de la plage.",
      ru: "Роскошный пляжный курорт с прямым выходом к Красному морю, с нетронутыми коралловыми рифами, несколькими бассейнами и первоклассными дайвинг-центрами. Идеально подходит для любителей подводного плавания и пляжного отдыха.",
      ro: "Resort de lux pe plaja cu acces direct la Marea Rosie, cu recife coraline nealterate, multiple piscine si facilitati de scufundari de clasă mondială. Perfect pentru pasionatii de scufundari si iubitorii de plaja.",
      it: "Resort di lusso sulla spiaggia con accesso diretto al Mar Rosso, con barriere coralline incontaminate, piscine multiple e strutture per immersioni di livello mondiale. Perfetto per appassionati di immersioni e amanti della spiaggia."
    },
    rate: 5,
    facilities: [
      {
        name: { en: "Private Beach", fr: "Plage Privée", ru: "Частный пляж", ro: "Plajă Privată", it: "Spiaggia Privata" },
        values: [
          { en: "Direct Beach Access", fr: "Accès direct à la plage", ru: "Прямой выход на пляж", ro: "Acces direct la plajă", it: "Accesso diretto alla spiaggia" },
          { en: "Sun Loungers & Umbrellas", fr: "Chaises longues et parasols", ru: "Шезлонги и зонтики", ro: "Șezlonguri și umbrele", it: "Lettini e ombrelloni" }
        ],
        icon: "beach-umbrella",
        order: 1
      },
      {
        name: { en: "Diving Center", fr: "Centre de Plongée", ru: "Дайвинг центр", ro: "Centru de Scufundări", it: "Centro Immersioni" },
        values: [
          { en: "PADI Certified", fr: "Certifié PADI", ru: "Сертификат PADI", ro: "Certificat PADI", it: "Certificato PADI" },
          { en: "Equipment Rental", fr: "Location d'équipement", ru: "Прокат снаряжения", ro: "Închiriere echipament", it: "Noleggio attrezzature" }
        ],
        icon: "scuba-diving",
        order: 2
      },
      {
        name: { en: "Swimming Pools", fr: "Piscines", ru: "Бассейны", ro: "Piscine", it: "Piscine" },
        values: [
          { en: "3 Outdoor Pools", fr: "3 piscines extérieures", ru: "3 открытых бассейна", ro: "3 piscine în aer liber", it: "3 piscine all'aperto" },
          { en: "Heated Pool", fr: "Piscine chauffée", ru: "Подогреваемый бассейн", ro: "Piscină încălzită", it: "Piscina riscaldata" }
        ],
        icon: "swimming-pool",
        order: 3
      },
      {
        name: { en: "Spa & Wellness", fr: "Spa & Bien-être", ru: "Спа и велнес", ro: "Spa & Wellness", it: "Spa & Benessere" },
        values: [
          { en: "Full Service Spa", fr: "Spa complet", ru: "Полный спа-сервис", ro: "Spa cu servicii complete", it: "Spa completo" },
          { en: "Massage Treatments", fr: "Soins de massage", ru: "Массажные процедуры", ro: "Tratamente de masaj", it: "Trattamenti di massaggio" }
        ],
        icon: "spa",
        order: 4
      },
      {
        name: { en: "All-Inclusive Dining", fr: "Pension Complète", ru: "Все включено", ro: "All-Inclusive", it: "All-Inclusive" },
        values: [
          { en: "4 Restaurants", fr: "4 restaurants", ru: "4 ресторана", ro: "4 restaurante", it: "4 ristoranti" },
          { en: "Unlimited Drinks", fr: "Boissons illimitées", ru: "Безлимитные напитки", ro: "Băuturi nelimitate", it: "Bevande illimitate" }
        ],
        icon: "restaurant-dining",
        order: 5
      },
      {
        name: { en: "Water Sports", fr: "Sports Nautiques", ru: "Водный спорт", ro: "Sporturi Acvatice", it: "Sport Acquatici" },
        values: [
          { en: "Windsurfing", fr: "Planche à voile", ru: "Виндсерфинг", ro: "Windsurfing", it: "Windsurf" },
          { en: "Kayaking", fr: "Kayak", ru: "Каякинг", ro: "Caiac", it: "Kayak" }
        ],
        icon: "water",
        order: 6
      }
    ],
    ratePlans: [
      {
        name: { en: "All-Inclusive Package", fr: "Forfait Tout Compris", ru: "Пакет Все Включено", ro: "Pachet All-Inclusive", it: "Pacchetto All-Inclusive" },
        description: { en: "Full board with unlimited drinks, water sports, and daily diving excursions", fr: "Pension complète avec boissons illimitées, sports nautiques et excursions de plongée quotidiennes", ru: "Полный пансион с безлимитными напитками, водными видами спорта и ежедневными дайвинг-экскурсиями", ro: "Pensiune completă cu băuturi nelimitate, sporturi acvatice și excursii de scufundări zilnice", it: "Pensione completa con bevande illimitate, sport acquatici ed escursioni subacquee giornaliere" }
      },
      {
        name: { en: "Half Board Package", fr: "Demi-Pension", ru: "Полупансион", ro: "Demipensiune", it: "Mezza Pensione" },
        description: { en: "Breakfast and dinner included with access to beach and pool facilities", fr: "Petit-déjeuner et dîner inclus avec accès aux installations de plage et piscine", ru: "Завтрак и ужин включены с доступом к пляжу и бассейну", ro: "Mic dejun și cină incluse cu acces la facilitățile de plajă și piscină", it: "Colazione e cena incluse con accesso alle strutture di spiaggia e piscina" }
      },
      {
        name: { en: "Bed & Breakfast", fr: "Chambre et Petit-déjeuner", ru: "Номер с завтраком", ro: "Cameră cu Mic Dejun", it: "Camera e Colazione" },
        description: { en: "Room with daily breakfast buffet and free WiFi", fr: "Chambre avec buffet de petit-déjeuner quotidien et WiFi gratuit", ru: "Номер с ежедневным завтраком-буфетом и бесплатным WiFi", ro: "Cameră cu bufet de mic dejun zilnic și WiFi gratuit", it: "Camera con buffet di colazione giornaliera e WiFi gratuito" }
      }
    ]
  },
  {
    name: {
      en: "Nile Palace Heritage Hotel",
      fr: "Hôtel Patrimoine Palais du Nil",
      ru: "Отель Дворец на Ниле",
      ro: "Hotel Palatul Nilului",
      it: "Hotel Palazzo del Nilo"
    },
    location: {
      en: "Luxor, Nile Valley",
      fr: "Louxor, Vallée du Nil",
      ru: "Луксор, долина Нила",
      ro: "Luxor, Valea Nilului",
      it: "Luxor, Valle del Nilo"
    },
    description: {
      en: "Historic luxury hotel overlooking the Nile River, combining colonial elegance with modern comfort. Gateway to the Valley of the Kings and ancient temples. Features traditional Egyptian architecture and refined hospitality.",
      fr: "Hôtel de luxe historique surplombant le Nil, alliant élégance coloniale et confort moderne. Porte d'entrée vers la Vallée des Rois et les temples antiques. Architecture égyptienne traditionnelle et hospitalité raffinée.",
      ru: "Исторический роскошный отель с видом на Нил, сочетающий колониальную элегантность с современным комфортом. Ворота в Долину Царей и древние храмы. Традиционная египетская архитектура и изысканное гостеприимство.",
      ro: "Hotel istoric de lux cu vedere la Nil, combinând eleganța colonială cu confortul modern. Poarta către Valea Regilor și templele antice. Arhitectură egipteană tradițională și ospitalitate rafinată.",
      it: "Hotel di lusso storico con vista sul Nilo, che combina eleganza coloniale con comfort moderno. Porta d'accesso alla Valle dei Re e ai templi antichi. Architettura egiziana tradizionale e ospitalità raffinata."
    },
    rate: 5,
    facilities: [
      {
        name: { en: "Nile Views", fr: "Vues sur le Nil", ru: "Виды на Нил", ro: "Vederi la Nil", it: "Vista sul Nilo" },
        values: [
          { en: "River Balconies", fr: "Balcons sur la rivière", ru: "Балконы с видом на реку", ro: "Balcoane cu vedere la râu", it: "Balconi sul fiume" },
          { en: "Sunset Terrace", fr: "Terrasse du coucher du soleil", ru: "Терраса на закате", ro: "Terasă la apus", it: "Terrazza al tramonto" }
        ],
        icon: "water",
        order: 1
      },
      {
        name: { en: "Rooftop Restaurant", fr: "Restaurant sur le Toit", ru: "Ресторан на крыше", ro: "Restaurant pe Acoperiș", it: "Ristorante Panoramico" },
        values: [
          { en: "Egyptian Cuisine", fr: "Cuisine égyptienne", ru: "Египетская кухня", ro: "Bucătărie egipteană", it: "Cucina egiziana" },
          { en: "Panoramic Views", fr: "Vues panoramiques", ru: "Панорамные виды", ro: "Vederi panoramice", it: "Vista panoramica" }
        ],
        icon: "restaurant-dining",
        order: 2
      },
      {
        name: { en: "Heritage Architecture", fr: "Architecture Patrimoniale", ru: "Архитектурное наследие", ro: "Arhitectură Patrimonială", it: "Architettura Storica" },
        values: [
          { en: "Colonial Design", fr: "Design colonial", ru: "Колониальный дизайн", ro: "Design colonial", it: "Design coloniale" },
          { en: "Historic Decor", fr: "Décor historique", ru: "Исторический декор", ro: "Decor istoric", it: "Arredamento storico" }
        ],
        icon: "star",
        order: 3
      },
      {
        name: { en: "Temple Tours", fr: "Visites de Temples", ru: "Туры по храмам", ro: "Tururi la Temple", it: "Tour dei Templi" },
        values: [
          { en: "Valley of the Kings", fr: "Vallée des Rois", ru: "Долина Царей", ro: "Valea Regilor", it: "Valle dei Re" },
          { en: "Karnak Temple", fr: "Temple de Karnak", ru: "Храм Карнак", ro: "Templul Karnak", it: "Tempio di Karnak" }
        ],
        icon: "bus",
        order: 4
      },
      {
        name: { en: "Traditional Spa", fr: "Spa Traditionnel", ru: "Традиционный спа", ro: "Spa Tradițional", it: "Spa Tradizionale" },
        values: [
          { en: "Egyptian Treatments", fr: "Soins égyptiens", ru: "Египетские процедуры", ro: "Tratamente egiptene", it: "Trattamenti egiziani" },
          { en: "Hammam", fr: "Hammam", ru: "Хаммам", ro: "Hammam", it: "Hammam" }
        ],
        icon: "spa",
        order: 5
      },
      {
        name: { en: "Garden Terrace", fr: "Terrasse Jardin", ru: "Садовая терраса", ro: "Terasă Grădină", it: "Terrazza Giardino" },
        values: [
          { en: "Palm Gardens", fr: "Jardins de palmiers", ru: "Пальмовые сады", ro: "Grădini cu palmieri", it: "Giardini di palme" },
          { en: "Outdoor Dining", fr: "Restauration en plein air", ru: "Обеды на открытом воздухе", ro: "Masă în aer liber", it: "Pranzo all'aperto" }
        ],
        icon: "sun",
        order: 6
      }
    ],
    ratePlans: [
      {
        name: { en: "Heritage Experience", fr: "Expérience Patrimoniale", ru: "Историческое впечатление", ro: "Experiență Patrimonială", it: "Esperienza Storica" },
        description: { en: "Room with temple tours, traditional Egyptian dinner, and guided Nile cruise", fr: "Chambre avec visites de temples, dîner égyptien traditionnel et croisière guidée sur le Nil", ru: "Номер с турами по храмам, традиционным египетским ужином и круизом по Нилу", ro: "Cameră cu tururi la temple, cină egipteană tradițională și croazieră ghidată pe Nil", it: "Camera con tour dei templi, cena egiziana tradizionale e crociera guidata sul Nilo" }
      },
      {
        name: { en: "Nile View Premium", fr: "Premium Vue sur le Nil", ru: "Премиум с видом на Нил", ro: "Premium cu Vedere la Nil", it: "Premium Vista Nilo" },
        description: { en: "Superior room with private balcony, breakfast, and complimentary spa session", fr: "Chambre supérieure avec balcon privé, petit-déjeuner et séance de spa gratuite", ru: "Улучшенный номер с собственным балконом, завтраком и бесплатным спа-сеансом", ro: "Cameră superioară cu balcon privat, mic dejun și sesiune spa gratuită", it: "Camera superiore con balcone privato, colazione e sessione spa gratuita" }
      },
      {
        name: { en: "Standard Comfort", fr: "Confort Standard", ru: "Стандартный комфорт", ro: "Confort Standard", it: "Comfort Standard" },
        description: { en: "Classic room with breakfast and access to rooftop restaurant", fr: "Chambre classique avec petit-déjeuner et accès au restaurant sur le toit", ru: "Классический номер с завтраком и доступом к ресторану на крыше", ro: "Cameră clasică cu mic dejun și acces la restaurantul de pe acoperiș", it: "Camera classica con colazione e accesso al ristorante panoramico" }
      }
    ]
  },
  {
    name: {
      en: "Desert Oasis Boutique Resort",
      fr: "Resort Boutique Oasis du Désert",
      ru: "Бутик-курорт Оазис Пустыни",
      ro: "Resort Boutique Oaza Desertului",
      it: "Resort Boutique Oasi del Deserto"
    },
    location: {
      en: "Marsa Alam, Red Sea",
      fr: "Marsa Alam, Mer Rouge",
      ru: "Марса Алам, Красное море",
      ro: "Marsa Alam, Marea Rosie",
      it: "Marsa Alam, Mar Rosso"
    },
    description: {
      en: "Intimate boutique resort offering exclusive Red Sea experiences. Known for pristine beaches, world-renowned dive sites, and eco-friendly luxury. Perfect for couples and small groups seeking tranquility.",
      fr: "Resort boutique intime offrant des expériences exclusives de la Mer Rouge. Connu pour ses plages immaculées, ses sites de plongée de renommée mondiale et son luxe écologique. Parfait pour les couples et les petits groupes en quête de tranquillité.",
      ru: "Интимный бутик-курорт, предлагающий эксклюзивные впечатления от Красного моря. Известен своими нетронутыми пляжами, всемирно известными местами для дайвинга и экологичной роскошью. Идеально подходит для пар и небольших групп, ищущих спокойствия.",
      ro: "Resort boutique intim care oferă experiențe exclusive la Marea Roșie. Cunoscut pentru plajele sale nealterate, siturile de scufundări de renume mondial și luxul ecologic. Perfect pentru cupluri și grupuri mici în căutarea liniștii.",
      it: "Resort boutique intimo che offre esperienze esclusive del Mar Rosso. Conosciuto per spiagge incontaminate, siti di immersione di fama mondiale e lusso ecologico. Perfetto per coppie e piccoli gruppi in cerca di tranquillità."
    },
    rate: 4,
    facilities: [
      {
        name: { en: "Eco-Friendly", fr: "Écologique", ru: "Экологичный", ro: "Ecologic", it: "Eco-Sostenibile" },
        values: [
          { en: "Solar Powered", fr: "Énergie solaire", ru: "Солнечная энергия", ro: "Energie solară", it: "Energia solare" },
          { en: "Sustainable Design", fr: "Design durable", ru: "Экологичный дизайн", ro: "Design sustenabil", it: "Design sostenibile" }
        ],
        icon: "wind",
        order: 1
      },
      {
        name: { en: "Private Dive Center", fr: "Centre de Plongée Privé", ru: "Частный дайвинг-центр", ro: "Centru Privat de Scufundări", it: "Centro Immersioni Privato" },
        values: [
          { en: "Expert Guides", fr: "Guides experts", ru: "Экспертные гиды", ro: "Ghizi experți", it: "Guide esperte" },
          { en: "Premium Equipment", fr: "Équipement premium", ru: "Премиум снаряжение", ro: "Echipament premium", it: "Attrezzatura premium" }
        ],
        icon: "scuba-diving",
        order: 2
      },
      {
        name: { en: "Infinity Pool", fr: "Piscine à Débordement", ru: "Бассейн инфинити", ro: "Piscină Infinită", it: "Piscina a Sfioro" },
        values: [
          { en: "Sea Views", fr: "Vues sur la mer", ru: "Виды на море", ro: "Vederi la mare", it: "Vista mare" },
          { en: "Poolside Bar", fr: "Bar au bord de la piscine", ru: "Бар у бассейна", ro: "Bar la piscină", it: "Bar a bordo piscina" }
        ],
        icon: "swimming-pool",
        order: 3
      },
      {
        name: { en: "Organic Restaurant", fr: "Restaurant Bio", ru: "Органический ресторан", ro: "Restaurant Organic", it: "Ristorante Biologico" },
        values: [
          { en: "Farm to Table", fr: "De la ferme à la table", ru: "С фермы на стол", ro: "De la fermă la masă", it: "Dal campo alla tavola" },
          { en: "Local Ingredients", fr: "Ingrédients locaux", ru: "Местные продукты", ro: "Ingrediente locale", it: "Ingredienti locali" }
        ],
        icon: "restaurant-dining",
        order: 4
      },
      {
        name: { en: "Yoga & Meditation", fr: "Yoga et Méditation", ru: "Йога и медитация", ro: "Yoga și Meditație", it: "Yoga e Meditazione" },
        values: [
          { en: "Sunrise Sessions", fr: "Séances au lever du soleil", ru: "Занятия на рассвете", ro: "Sesiuni la răsărit", it: "Sessioni all'alba" },
          { en: "Outdoor Deck", fr: "Terrasse extérieure", ru: "Открытая терраса", ro: "Terasă în aer liber", it: "Terrazza all'aperto" }
        ],
        icon: "spa",
        order: 5
      },
      {
        name: { en: "Snorkeling", fr: "Plongée en Apnée", ru: "Снорклинг", ro: "Snorkeling", it: "Snorkeling" },
        values: [
          { en: "House Reef", fr: "Récif de la maison", ru: "Домашний риф", ro: "Recif propriu", it: "Reef privato" },
          { en: "Free Equipment", fr: "Équipement gratuit", ru: "Бесплатное снаряжение", ro: "Echipament gratuit", it: "Attrezzatura gratuita" }
        ],
        icon: "snorkel",
        order: 6
      }
    ],
    ratePlans: [
      {
        name: { en: "Diver's Paradise", fr: "Paradis du Plongeur", ru: "Рай для дайвера", ro: "Paradisul Scafandrilor", it: "Paradiso del Subacqueo" },
        description: { en: "Room with unlimited diving, equipment rental, and dive guide services", fr: "Chambre avec plongée illimitée, location d'équipement et services de guide de plongée", ru: "Номер с неограниченным дайвингом, прокатом снаряжения и услугами гида", ro: "Cameră cu scufundări nelimitate, închiriere echipament și servicii de ghid de scufundări", it: "Camera con immersioni illimitate, noleggio attrezzature e servizi di guida" }
      },
      {
        name: { en: "Relaxation Retreat", fr: "Retraite Relaxation", ru: "Релакс-ретрит", ro: "Retragere de Relaxare", it: "Ritiro Relax" },
        description: { en: "Room with spa treatments, yoga classes, and organic meal plan", fr: "Chambre avec soins spa, cours de yoga et plan de repas bio", ru: "Номер со спа-процедурами, занятиями йогой и органическим питанием", ro: "Cameră cu tratamente spa, cursuri de yoga și plan de masă organic", it: "Camera con trattamenti spa, lezioni di yoga e piano pasti biologico" }
      },
      {
        name: { en: "Beach Escape", fr: "Évasion Plage", ru: "Пляжный отдых", ro: "Evadare la Plajă", it: "Fuga sulla Spiaggia" },
        description: { en: "Room with breakfast, beach access, and complimentary snorkeling gear", fr: "Chambre avec petit-déjeuner, accès à la plage et équipement de plongée gratuit", ru: "Номер с завтраком, доступом к пляжу и бесплатным снаряжением для снорклинга", ro: "Cameră cu mic dejun, acces la plajă și echipament de snorkeling gratuit", it: "Camera con colazione, accesso alla spiaggia e attrezzatura per snorkeling gratuita" }
      }
    ]
  }
];

async function createHotel(hotelData) {
  console.log(`\n=== Creating Hotel: ${hotelData.name.en} ===`);
  
  try {
    const response = await makeRequest('POST', '/api/Hotels', hotelData);
    console.log(`✓ Hotel created with ID: ${response.data?.id || response.id}`);
    return response.data?.id || response.id;
  } catch (error) {
    console.error(`✗ Failed to create hotel: ${error.message}`);
    return null;
  }
}

async function createRatePlans(hotelId, ratePlans) {
  console.log(`\n  Creating ${ratePlans.length} rate plans...`);
  
  for (const plan of ratePlans) {
    try {
      const payload = {
        hotelId: hotelId,
        name: plan.name,
        description: plan.description
      };
      
      await makeRequest('POST', '/api/RatePlans', payload);
      console.log(`  ✓ Rate plan created: ${plan.name.en}`);
    } catch (error) {
      console.error(`  ✗ Failed to create rate plan: ${error.message}`);
    }
  }
}

async function main() {
  console.log('========================================');
  console.log('Starting Hotel Creation Process');
  console.log('========================================');
  console.log(`API Base URL: ${API_BASE_URL}`);
  console.log(`Hotels to create: ${hotels.length}`);
  
  for (const hotelData of hotels) {
    const hotelId = await createHotel(hotelData);
    
    if (hotelId) {
      // Create rate plans
      await createRatePlans(hotelId, hotelData.ratePlans);
      
      console.log(`\n✓ Completed: ${hotelData.name.en}\n`);
    }
    
    // Wait a bit between hotels
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n========================================');
  console.log('Hotel Creation Process Complete!');
  console.log('========================================');
  console.log('\nSummary:');
  console.log(`- ${hotels.length} hotels processed`);
  console.log(`- ${hotels.length * 3} rate plans created`);
  console.log('\nNote: Images need to be uploaded separately via the admin panel.');
}

main().catch(console.error);
