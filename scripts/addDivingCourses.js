const https = require('https');

const API_BASE_URL = 'https://touristy.runasp.net';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTk1MDkxMn0.tlSlVDTYaFJlltjqX4_GLNUtYc0E6BBfu9q87NHldBY';

function makeRequest(method, endpoint, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, API_BASE_URL);
    const options = {
      method: method,
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      rejectUnauthorized: false
    };

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

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

const divingCourses = [
  {
    name: {
      en: "Discover Scuba Diving",
      fr: "Découverte de la Plongée Sous-Marine",
      ru: "Пробное погружение с аквалангом",
      ro: "Descoperă Scufundările",
      it: "Scopri le Immersioni"
    },
    description: {
      en: "Perfect introduction for first-time divers. Experience the underwater world of the Red Sea with a certified instructor in a safe, controlled environment. No prior experience needed.",
      fr: "Introduction parfaite pour les plongeurs débutants. Découvrez le monde sous-marin de la Mer Rouge avec un instructeur certifié dans un environnement sûr et contrôlé. Aucune expérience préalable requise.",
      ru: "Идеальное введение для начинающих дайверов. Познакомьтесь с подводным миром Красного моря с сертифицированным инструктором в безопасной контролируемой среде. Предварительный опыт не требуется.",
      ro: "Introducere perfectă pentru scafandrii începători. Experimentează lumea subacvatică a Mării Roșii cu un instructor certificat într-un mediu sigur și controlat. Nu este necesară experiență prealabilă.",
      it: "Introduzione perfetta per i subacquei principianti. Sperimenta il mondo sottomarino del Mar Rosso con un istruttore certificato in un ambiente sicuro e controllato. Nessuna esperienza precedente richiesta."
    },
    price: 55,
    facilities: [
      {
        name: {
          en: "Duration",
          fr: "Durée",
          ru: "Продолжительность",
          ro: "Durată",
          it: "Durata"
        },
        values: {
          en: "Half Day (3-4 hours)",
          fr: "Demi-journée (3-4 heures)",
          ru: "Полдня (3-4 часа)",
          ro: "Jumătate de zi (3-4 ore)",
          it: "Mezza giornata (3-4 ore)"
        },
        icon: "clock",
        order: 1
      },
      {
        name: {
          en: "Max Depth",
          fr: "Profondeur Max",
          ru: "Макс. глубина",
          ro: "Adâncime Max",
          it: "Profondità Max"
        },
        values: {
          en: "12 meters (40 feet)",
          fr: "12 mètres (40 pieds)",
          ru: "12 метров (40 футов)",
          ro: "12 metri (40 picioare)",
          it: "12 metri (40 piedi)"
        },
        icon: "water",
        order: 2
      },
      {
        name: {
          en: "Certification",
          fr: "Certification",
          ru: "Сертификация",
          ro: "Certificare",
          it: "Certificazione"
        },
        values: {
          en: "Experience Certificate",
          fr: "Certificat d'expérience",
          ru: "Сертификат опыта",
          ro: "Certificat de experiență",
          it: "Certificato di esperienza"
        },
        icon: "certificate",
        order: 3
      },
      {
        name: {
          en: "Equipment",
          fr: "Équipement",
          ru: "Снаряжение",
          ro: "Echipament",
          it: "Attrezzatura"
        },
        values: {
          en: "All gear included",
          fr: "Tout l'équipement inclus",
          ru: "Все снаряжение включено",
          ro: "Tot echipamentul inclus",
          it: "Tutta l'attrezzatura inclusa"
        },
        icon: "scuba-diving",
        order: 4
      },
      {
        name: {
          en: "Prerequisites",
          fr: "Prérequis",
          ru: "Требования",
          ro: "Cerințe preliminare",
          it: "Prerequisiti"
        },
        values: {
          en: "Age 10+, Basic swimming",
          fr: "Âge 10+, Natation de base",
          ru: "Возраст 10+, Базовое плавание",
          ro: "Vârsta 10+, Înot de bază",
          it: "Età 10+, Nuoto di base"
        },
        icon: "person",
        order: 5
      },
      {
        name: {
          en: "Instructor Ratio",
          fr: "Ratio Instructeur",
          ru: "Соотношение инструктор",
          ro: "Raport Instructor",
          it: "Rapporto Istruttore"
        },
        values: {
          en: "1:2 (One instructor per 2 divers)",
          fr: "1:2 (Un instructeur pour 2 plongeurs)",
          ru: "1:2 (Один инструктор на 2 дайверов)",
          ro: "1:2 (Un instructor la 2 scafandri)",
          it: "1:2 (Un istruttore ogni 2 subacquei)"
        },
        icon: "group",
        order: 6
      }
    ]
  },
  {
    name: {
      en: "PADI Open Water Diver",
      fr: "PADI Plongeur Eau Libre",
      ru: "PADI Дайвер открытой воды",
      ro: "PADI Scafandru Ape Deschise",
      it: "PADI Subacqueo Acque Libere"
    },
    description: {
      en: "The world's most popular scuba diving certification. Learn fundamental diving skills and safety procedures to dive independently with a buddy to 18 meters depth. Internationally recognized PADI certification.",
      fr: "La certification de plongée sous-marine la plus populaire au monde. Apprenez les compétences fondamentales de plongée et les procédures de sécurité pour plonger de manière indépendante avec un binôme jusqu'à 18 mètres de profondeur. Certification PADI reconnue internationalement.",
      ru: "Самая популярная сертификация подводного плавания в мире. Изучите основные навыки дайвинга и процедуры безопасности для самостоятельного погружения с напарником на глубину до 18 метров. Международно признанная сертификация PADI.",
      ro: "Cea mai populară certificare de scufundări din lume. Învață abilitățile fundamentale de scufundare și procedurile de siguranță pentru a scufunda independent cu un partener până la 18 metri adâncime. Certificare PADI recunoscută internațional.",
      it: "La certificazione subacquea più popolare al mondo. Impara le competenze fondamentali di immersione e le procedure di sicurezza per immergerti in modo indipendente con un compagno fino a 18 metri di profondità. Certificazione PADI riconosciuta a livello internazionale."
    },
    price: 390,
    facilities: [
      {
        name: {
          en: "Duration",
          fr: "Durée",
          ru: "Продолжительность",
          ro: "Durată",
          it: "Durata"
        },
        values: {
          en: "3-4 Days",
          fr: "3-4 Jours",
          ru: "3-4 Дня",
          ro: "3-4 Zile",
          it: "3-4 Giorni"
        },
        icon: "clock",
        order: 1
      },
      {
        name: {
          en: "Max Depth",
          fr: "Profondeur Max",
          ru: "Макс. глубина",
          ro: "Adâncime Max",
          it: "Profondità Max"
        },
        values: {
          en: "18 meters (60 feet)",
          fr: "18 mètres (60 pieds)",
          ru: "18 метров (60 футов)",
          ro: "18 metri (60 picioare)",
          it: "18 metri (60 piedi)"
        },
        icon: "water",
        order: 2
      },
      {
        name: {
          en: "Certification",
          fr: "Certification",
          ru: "Сертификация",
          ro: "Certificare",
          it: "Certificazione"
        },
        values: {
          en: "PADI Open Water Diver Card",
          fr: "Carte PADI Plongeur Eau Libre",
          ru: "Карта PADI Open Water Diver",
          ro: "Card PADI Scafandru Ape Deschise",
          it: "Tessera PADI Subacqueo Acque Libere"
        },
        icon: "certificate",
        order: 3
      },
      {
        name: {
          en: "Course Structure",
          fr: "Structure du Cours",
          ru: "Структура курса",
          ro: "Structura Cursului",
          it: "Struttura del Corso"
        },
        values: {
          en: "Theory, Pool, 4 Open Water Dives",
          fr: "Théorie, Piscine, 4 Plongées en Eau Libre",
          ru: "Теория, Бассейн, 4 Открытых Погружения",
          ro: "Teorie, Piscină, 4 Scufundări în Ape Deschise",
          it: "Teoria, Piscina, 4 Immersioni in Acque Libere"
        },
        icon: "book",
        order: 4
      },
      {
        name: {
          en: "Included",
          fr: "Inclus",
          ru: "Включено",
          ro: "Inclus",
          it: "Incluso"
        },
        values: {
          en: "Manual, Equipment, Certification Fee",
          fr: "Manuel, Équipement, Frais de Certification",
          ru: "Учебник, Снаряжение, Стоимость Сертификации",
          ro: "Manual, Echipament, Taxa de Certificare",
          it: "Manuale, Attrezzatura, Tassa di Certificazione"
        },
        icon: "star",
        order: 5
      },
      {
        name: {
          en: "Prerequisites",
          fr: "Prérequis",
          ru: "Требования",
          ro: "Cerințe preliminare",
          it: "Prerequisiti"
        },
        values: {
          en: "Age 10+, Medical clearance",
          fr: "Âge 10+, Autorisation médicale",
          ru: "Возраст 10+, Медицинское разрешение",
          ro: "Vârsta 10+, Aprobare medicală",
          it: "Età 10+, Autorizzazione medica"
        },
        icon: "health",
        order: 6
      }
    ]
  },
  {
    name: {
      en: "PADI Advanced Open Water Diver",
      fr: "PADI Plongeur Avancé Eau Libre",
      ru: "PADI Продвинутый дайвер открытой воды",
      ro: "PADI Scafandru Avansat Ape Deschise",
      it: "PADI Subacqueo Avanzato Acque Libere"
    },
    description: {
      en: "Build confidence and expand your diving skills through adventure dives. Deep diving, underwater navigation, and three specialty dives of your choice. Increase your maximum depth to 30 meters.",
      fr: "Renforcez votre confiance et élargissez vos compétences de plongée grâce à des plongées d'aventure. Plongée profonde, navigation sous-marine et trois plongées spécialisées de votre choix. Augmentez votre profondeur maximale à 30 mètres.",
      ru: "Укрепите уверенность и расширьте свои навыки дайвинга через приключенческие погружения. Глубокое погружение, подводная навигация и три специализированных погружения на выбор. Увеличьте максимальную глубину до 30 метров.",
      ro: "Construiește încredere și extindeți-vă abilitățile de scufundare prin scufundări de aventură. Scufundare profundă, navigare subacvatică și trei scufundări de specialitate la alegere. Crește adâncimea maximă la 30 de metri.",
      it: "Costruisci fiducia ed espandi le tue abilità subacquee attraverso immersioni avventurose. Immersioni profonde, navigazione subacquea e tre immersioni specialistiche a scelta. Aumenta la tua profondità massima a 30 metri."
    },
    price: 330,
    facilities: [
      {
        name: {
          en: "Duration",
          fr: "Durée",
          ru: "Продолжительность",
          ro: "Durată",
          it: "Durata"
        },
        values: {
          en: "2-3 Days",
          fr: "2-3 Jours",
          ru: "2-3 Дня",
          ro: "2-3 Zile",
          it: "2-3 Giorni"
        },
        icon: "clock",
        order: 1
      },
      {
        name: {
          en: "Max Depth",
          fr: "Profondeur Max",
          ru: "Макс. глубина",
          ro: "Adâncime Max",
          it: "Profondità Max"
        },
        values: {
          en: "30 meters (100 feet)",
          fr: "30 mètres (100 pieds)",
          ru: "30 метров (100 футов)",
          ro: "30 metri (100 picioare)",
          it: "30 metri (100 piedi)"
        },
        icon: "water",
        order: 2
      },
      {
        name: {
          en: "Certification",
          fr: "Certification",
          ru: "Сертификация",
          ro: "Certificare",
          it: "Certificazione"
        },
        values: {
          en: "PADI Advanced Open Water Card",
          fr: "Carte PADI Plongeur Avancé",
          ru: "Карта PADI Advanced Open Water",
          ro: "Card PADI Scafandru Avansat",
          it: "Tessera PADI Subacqueo Avanzato"
        },
        icon: "certificate",
        order: 3
      },
      {
        name: {
          en: "Required Dives",
          fr: "Plongées Requises",
          ru: "Обязательные погружения",
          ro: "Scufundări Necesare",
          it: "Immersioni Richieste"
        },
        values: {
          en: "5 Adventure Dives",
          fr: "5 Plongées d'Aventure",
          ru: "5 Приключенческих Погружений",
          ro: "5 Scufundări de Aventură",
          it: "5 Immersioni Avventurose"
        },
        icon: "scuba-diving",
        order: 4
      },
      {
        name: {
          en: "Specialty Options",
          fr: "Options de Spécialité",
          ru: "Варианты специализации",
          ro: "Opțiuni de Specialitate",
          it: "Opzioni di Specialità"
        },
        values: {
          en: "Wreck, Night, Photography, etc.",
          fr: "Épave, Nuit, Photographie, etc.",
          ru: "Рэк, Ночь, Фотография и т.д.",
          ro: "Epavă, Noapte, Fotografie, etc.",
          it: "Relitto, Notturna, Fotografia, ecc."
        },
        icon: "camera",
        order: 5
      },
      {
        name: {
          en: "Prerequisites",
          fr: "Prérequis",
          ru: "Требования",
          ro: "Cerințe preliminare",
          it: "Prerequisiti"
        },
        values: {
          en: "PADI Open Water Diver (or equivalent)",
          fr: "PADI Plongeur Eau Libre (ou équivalent)",
          ru: "PADI Open Water Diver (или эквивалент)",
          ro: "PADI Scafandru Ape Deschise (sau echivalent)",
          it: "PADI Subacqueo Acque Libere (o equivalente)"
        },
        icon: "check-circle",
        order: 6
      }
    ]
  }
];

async function createDivingCourse(courseData) {
  console.log(`\n=== Creating Diving Course: ${courseData.name.en} ===`);
  
  try {
    const response = await makeRequest('POST', '/api/DivingCourses', courseData);
    const courseId = response.data?.id || response.id;
    console.log(`✓ Diving course created with ID: ${courseId}`);
    return courseId;
  } catch (error) {
    console.error(`✗ Failed to create diving course: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('========================================');
  console.log('Starting Diving Courses Creation Process');
  console.log('========================================');
  console.log(`API Base URL: ${API_BASE_URL}`);
  console.log(`Courses to create: ${divingCourses.length}`);
  
  for (const courseData of divingCourses) {
    await createDivingCourse(courseData);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n========================================');
  console.log('Diving Courses Creation Complete!');
  console.log('========================================');
  console.log('\nSummary:');
  console.log(`- ${divingCourses.length} diving courses created`);
  console.log(`- All courses include 6 facilities each`);
  console.log(`- Full translations in EN, FR, RU, RO, IT`);
  console.log('\nNote: Images need to be uploaded separately via the admin panel.');
}

main().catch(console.error);
