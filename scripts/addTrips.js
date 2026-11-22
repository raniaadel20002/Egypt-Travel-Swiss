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
      },
      rejectUnauthorized: false
    };

    if (data) {
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

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Fetch destinations
async function getDestinations() {
  try {
    const response = await makeRequest('GET', '/api/Destinations?PageSize=100');
    return response.data || response.Data || [];
  } catch (error) {
    console.error('Failed to fetch destinations:', error.message);
    return [];
  }
}

// Fetch trip types
async function getTripTypes() {
  try {
    const response = await makeRequest('GET', '/api/TripTypes?PageSize=100');
    return response.data || response.Data || [];
  } catch (error) {
    console.error('Failed to fetch trip types:', error.message);
    return [];
  }
}

// Find destination by name (case insensitive, partial match)
function findDestination(destinations, searchTerm) {
  return destinations.find(d => 
    d.name && d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

// Find trip type by name (case insensitive, partial match)
function findTripType(tripTypes, searchTerm) {
  return tripTypes.find(t => 
    t.name && t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

const trips = [
  // Trip 1: Private Giza Pyramids & Sphinx VIP Tour
  {
    destinationSearch: 'giza',
    tripTypeSearch: 'historical',
    fallbackDestinationId: 1,
    fallbackTripTypeId: 1,
    data: {
      name: {
        en: "Private Giza Pyramids & Sphinx VIP Tour",
        fr: "Visite VIP Privée des Pyramides de Gizeh et du Sphinx",
        ru: "Частный VIP тур к пирамидам Гизы и Сфинксу",
        ro: "Tur VIP Privat la Piramidele din Giza și Sfinx",
        it: "Tour VIP Privato delle Piramidi di Giza e Sfinge"
      },
      description: {
        en: "Experience the majesty of ancient Egypt with an exclusive private tour. Visit the Great Pyramids, marvel at the Sphinx, and explore the Valley Temple with your personal Egyptologist guide. Includes luxury transportation, entrance fees, and lunch.",
        fr: "Découvrez la majesté de l'Égypte ancienne avec une visite privée exclusive. Visitez les Grandes Pyramides, admirez le Sphinx et explorez le Temple de la Vallée avec votre guide égyptologue personnel. Comprend transport de luxe, frais d'entrée et déjeuner.",
        ru: "Ощутите величие древнего Египта с эксклюзивным частным туром. Посетите Великие пирамиды, полюбуйтесь Сфинксом и исследуйте Долинный храм с личным гидом-египтологом. Включает роскошный транспорт, входные билеты и обед.",
        ro: "Experimentați maiestatea Egiptului antic cu un tur privat exclusiv. Vizitați Marile Piramide, admirați Sfinxul și explorați Templul din Vale cu ghidul dumneavoastră egiptolog personal. Include transport de lux, taxe de intrare și prânz.",
        it: "Vivi la maestosità dell'antico Egitto con un tour privato esclusivo. Visita le Grandi Piramidi, ammira la Sfinge ed esplora il Tempio della Valle con la tua guida egittologa personale. Include trasporto di lusso, biglietti d'ingresso e pranzo."
      },
      timeFrom: "07:00",
      durationValue: 8,
      durationType: 0,
      adultPrice: 150,
      childPrice: 75,
      infPrice: 0,
      category: 1,
      highlights: [
        {
          en: "Skip-the-line VIP access to all sites",
          fr: "Accès VIP coupe-file à tous les sites",
          ru: "VIP доступ без очередей",
          ro: "Acces VIP fără coadă",
          it: "Accesso VIP salta fila"
        },
        {
          en: "Personal Egyptologist guide",
          fr: "Guide égyptologue personnel",
          ru: "Личный гид-египтолог",
          ro: "Ghid egiptolog personal",
          it: "Guida egittologa personale"
        },
        {
          en: "Luxury air-conditioned vehicle",
          fr: "Véhicule climatisé de luxe",
          ru: "Роскошный автомобиль с кондиционером",
          ro: "Vehicul de lux climatizat",
          it: "Veicolo di lusso climatizzato"
        },
        {
          en: "Camel ride experience",
          fr: "Balade à chameau",
          ru: "Прогулка на верблюде",
          ro: "Plimbare cu cămila",
          it: "Esperienza in cammello"
        }
      ],
      includes: [
        {
          en: "Hotel pickup and drop-off",
          fr: "Prise en charge et retour à l'hôtel",
          ru: "Трансфер из отеля и обратно",
          ro: "Preluare și returnare la hotel",
          it: "Ritiro e rientro in hotel"
        },
        {
          en: "Private air-conditioned vehicle",
          fr: "Véhicule privé climatisé",
          ru: "Частный автомобиль с кондиционером",
          ro: "Vehicul privat climatizat",
          it: "Veicolo privato climatizzato"
        },
        {
          en: "All entrance fees",
          fr: "Tous les frais d'entrée",
          ru: "Все входные билеты",
          ro: "Toate taxele de intrare",
          it: "Tutti i biglietti d'ingresso"
        },
        {
          en: "Lunch at local restaurant",
          fr: "Déjeuner au restaurant local",
          ru: "Обед в местном ресторане",
          ro: "Prânz la restaurant local",
          it: "Pranzo in ristorante locale"
        },
        {
          en: "Bottled water",
          fr: "Eau en bouteille",
          ru: "Бутилированная вода",
          ro: "Apă îmbuteliată",
          it: "Acqua in bottiglia"
        }
      ],
      excludes: [
        {
          en: "Gratuities (optional)",
          fr: "Pourboires (facultatif)",
          ru: "Чаевые (по желанию)",
          ro: "Bacșișuri (opțional)",
          it: "Mance (opzionali)"
        },
        {
          en: "Entry inside the pyramids",
          fr: "Entrée à l'intérieur des pyramides",
          ru: "Вход внутрь пирамид",
          ro: "Intrare în interiorul piramidelor",
          it: "Ingresso all'interno delle piramidi"
        },
        {
          en: "Personal expenses",
          fr: "Dépenses personnelles",
          ru: "Личные расходы",
          ro: "Cheltuieli personale",
          it: "Spese personali"
        }
      ],
      whatToBring: [
        {
          en: "Comfortable walking shoes",
          fr: "Chaussures de marche confortables",
          ru: "Удобная обувь для прогулок",
          ro: "Încălțăminte confortabilă de mers",
          it: "Scarpe comode da passeggio"
        },
        {
          en: "Sun hat and sunglasses",
          fr: "Chapeau et lunettes de soleil",
          ru: "Шляпа и солнцезащитные очки",
          ro: "Pălărie și ochelari de soare",
          it: "Cappello e occhiali da sole"
        },
        {
          en: "Camera",
          fr: "Appareil photo",
          ru: "Камера",
          ro: "Cameră foto",
          it: "Macchina fotografica"
        },
        {
          en: "Cash for extras",
          fr: "Argent liquide pour extras",
          ru: "Наличные на дополнительные расходы",
          ro: "Bani gheată pentru extra",
          it: "Contanti per extra"
        }
      ],
      availabilityDayNo: [0, 1, 2, 3, 4, 5, 6]
    }
  },

  // Trip 2: Private Luxor Hot Air Balloon & Temples
  {
    destinationSearch: 'luxor',
    tripTypeSearch: 'adventure',
    fallbackDestinationId: 1,
    fallbackTripTypeId: 1,
    data: {
      name: {
        en: "Private Luxor Hot Air Balloon & Temples Experience",
        fr: "Expérience Privée Montgolfière et Temples de Louxor",
        ru: "Частный тур на воздушном шаре и храмы Луксора",
        ro: "Experiență Privată Balon cu Aer Cald și Temple Luxor",
        it: "Esperienza Privata Mongolfiera e Templi di Luxor"
      },
      description: {
        en: "Begin your day floating over the ancient Nile Valley at sunrise. After your breathtaking balloon flight, explore Karnak Temple and Valley of the Kings with your private Egyptologist. Exclusive experience combining adventure and history.",
        fr: "Commencez votre journée en flottant au-dessus de l'ancienne Vallée du Nil au lever du soleil. Après votre vol en montgolfière à couper le souffle, explorez le Temple de Karnak et la Vallée des Rois avec votre égyptologue privé. Expérience exclusive alliant aventure et histoire.",
        ru: "Начните свой день, паря над древней долиной Нила на восходе солнца. После захватывающего полета на воздушном шаре исследуйте храм Карнак и Долину Царей с личным египтологом. Эксклюзивный опыт, сочетающий приключения и историю.",
        ro: "Începeți ziua plutind deasupra vechii Văi a Nilului la răsărit. După zborul spectacular cu balonul, explorați Templul Karnak și Valea Regilor cu egiptologul dumneavoastră privat. Experiență exclusivă care combină aventura și istoria.",
        it: "Inizia la giornata fluttuando sopra l'antica Valle del Nilo all'alba. Dopo il tuo volo mozzafiato in mongolfiera, esplora il Tempio di Karnak e la Valle dei Re con il tuo egittologo privato. Esperienza esclusiva che unisce avventura e storia."
      },
      timeFrom: "04:30",
      durationValue: 10,
      durationType: 0,
      adultPrice: 220,
      childPrice: 110,
      infPrice: 0,
      category: 1,
      highlights: [
        {
          en: "Sunrise hot air balloon flight",
          fr: "Vol en montgolfière au lever du soleil",
          ru: "Полет на воздушном шаре на рассвете",
          ro: "Zbor cu balonul la răsărit",
          it: "Volo in mongolfiera all'alba"
        },
        {
          en: "Valley of the Kings exclusive tour",
          fr: "Visite exclusive de la Vallée des Rois",
          ru: "Эксклюзивный тур в Долину Царей",
          ro: "Tur exclusiv Valea Regilor",
          it: "Tour esclusivo Valle dei Re"
        },
        {
          en: "Karnak Temple complex",
          fr: "Complexe du Temple de Karnak",
          ru: "Комплекс храма Карнак",
          ro: "Complexul Templului Karnak",
          it: "Complesso del Tempio di Karnak"
        },
        {
          en: "Private luxury vehicle and guide",
          fr: "Véhicule de luxe privé et guide",
          ru: "Частный роскошный автомобиль и гид",
          ro: "Vehicul de lux privat și ghid",
          it: "Veicolo di lusso privato e guida"
        }
      ],
      includes: [
        {
          en: "Hot air balloon flight with certificate",
          fr: "Vol en montgolfière avec certificat",
          ru: "Полет на воздушном шаре с сертификатом",
          ro: "Zbor cu balonul cu certificat",
          it: "Volo in mongolfiera con certificato"
        },
        {
          en: "All temple entrance fees",
          fr: "Tous les frais d'entrée des temples",
          ru: "Все входные билеты в храмы",
          ro: "Toate taxele de intrare la temple",
          it: "Tutti i biglietti d'ingresso ai templi"
        },
        {
          en: "Private Egyptologist guide",
          fr: "Guide égyptologue privé",
          ru: "Частный гид-египтолог",
          ro: "Ghid egiptolog privat",
          it: "Guida egittologa privata"
        },
        {
          en: "Breakfast and lunch",
          fr: "Petit-déjeuner et déjeuner",
          ru: "Завтрак и обед",
          ro: "Mic dejun și prânz",
          it: "Colazione e pranzo"
        },
        {
          en: "Hotel transfers",
          fr: "Transferts hôtel",
          ru: "Трансферы из отеля",
          ro: "Transferuri hotel",
          it: "Trasferimenti hotel"
        }
      ],
      excludes: [
        {
          en: "Tips for staff",
          fr: "Pourboires pour le personnel",
          ru: "Чаевые персоналу",
          ro: "Bacșișuri pentru personal",
          it: "Mance per lo staff"
        },
        {
          en: "Optional tomb entries",
          fr: "Entrées facultatives aux tombes",
          ru: "Дополнительные входы в гробницы",
          ro: "Intrări opționale în morminte",
          it: "Ingressi opzionali alle tombe"
        }
      ],
      whatToBring: [
        {
          en: "Warm jacket for balloon flight",
          fr: "Veste chaude pour le vol en montgolfière",
          ru: "Теплая куртка для полета",
          ro: "Jachetă caldă pentru zbor",
          it: "Giacca calda per il volo"
        },
        {
          en: "Sunscreen and hat",
          fr: "Crème solaire et chapeau",
          ru: "Солнцезащитный крем и шляпа",
          ro: "Cremă solară și pălărie",
          it: "Crema solare e cappello"
        },
        {
          en: "Camera or smartphone",
          fr: "Appareil photo ou smartphone",
          ru: "Камера или смартфон",
          ro: "Cameră foto sau smartphone",
          it: "Fotocamera o smartphone"
        }
      ],
      availabilityDayNo: [0, 1, 2, 3, 4, 5, 6]
    }
  },

  // Trip 3: Red Sea Snorkeling Adventure - Small Group
  {
    destinationSearch: 'hurghada',
    tripTypeSearch: 'snorkel',
    fallbackDestinationId: 1,
    fallbackTripTypeId: 1,
    data: {
      name: {
        en: "Red Sea Snorkeling Adventure - Small Group",
        fr: "Aventure Snorkeling en Mer Rouge - Petit Groupe",
        ru: "Приключение с снорклингом в Красном море - Малая группа",
        ro: "Aventură Snorkeling în Marea Roșie - Grup Mic",
        it: "Avventura Snorkeling Mar Rosso - Piccolo Gruppo"
      },
      description: {
        en: "Discover the vibrant underwater world of the Red Sea. Visit pristine coral reefs, swim with colorful fish, and enjoy a freshly prepared lunch on board. Perfect for families and snorkeling enthusiasts. Small groups ensure personal attention.",
        fr: "Découvrez le monde sous-marin vibrant de la Mer Rouge. Visitez des récifs coralliens immaculés, nagez avec des poissons colorés et profitez d'un déjeuner fraîchement préparé à bord. Parfait pour les familles et les amateurs de snorkeling. Petits groupes garantissent une attention personnelle.",
        ru: "Откройте для себя яркий подводный мир Красного моря. Посетите нетронутые коралловые рифы, поплавайте с разноцветными рыбами и насладитесь свежеприготовленным обедом на борту. Идеально для семей и любителей снорклинга. Малые группы обеспечивают личное внимание.",
        ro: "Descoperă lumea subacvatică vibrantă a Mării Roșii. Vizitează recife coraline nealterate, înoată cu pești colorați și bucură-te de un prânz proaspăt pregătit la bord. Perfect pentru familii și pasionați de snorkeling. Grupurile mici asigură atenție personalizată.",
        it: "Scopri il vibrante mondo sottomarino del Mar Rosso. Visita barriere coralline incontaminate, nuota con pesci colorati e goditi un pranzo appena preparato a bordo. Perfetto per famiglie e appassionati di snorkeling. Piccoli gruppi garantiscono attenzione personale."
      },
      timeFrom: "08:00",
      durationValue: 7,
      durationType: 0,
      adultPrice: 45,
      childPrice: 25,
      infPrice: 0,
      category: 0,
      highlights: [
        {
          en: "3 premium snorkeling spots",
          fr: "3 sites de snorkeling premium",
          ru: "3 премиальных места для снорклинга",
          ro: "3 locații premium de snorkeling",
          it: "3 siti premium di snorkeling"
        },
        {
          en: "Professional snorkeling guide",
          fr: "Guide professionnel de snorkeling",
          ru: "Профессиональный гид по снорклингу",
          ro: "Ghid profesionist de snorkeling",
          it: "Guida professionale di snorkeling"
        },
        {
          en: "Fresh seafood lunch buffet",
          fr: "Buffet déjeuner fruits de mer frais",
          ru: "Свежий буфет с морепродуктами",
          ro: "Bufet prânz fructe de mare proaspete",
          it: "Buffet pranzo pesce fresco"
        },
        {
          en: "Small group maximum 15 people",
          fr: "Petit groupe maximum 15 personnes",
          ru: "Малая группа максимум 15 человек",
          ro: "Grup mic maxim 15 persoane",
          it: "Piccolo gruppo massimo 15 persone"
        }
      ],
      includes: [
        {
          en: "Hotel pickup and return",
          fr: "Prise en charge et retour à l'hôtel",
          ru: "Трансфер из отеля и обратно",
          ro: "Preluare și returnare la hotel",
          it: "Ritiro e rientro in hotel"
        },
        {
          en: "Snorkeling equipment",
          fr: "Équipement de snorkeling",
          ru: "Снаряжение для снорклинга",
          ro: "Echipament de snorkeling",
          it: "Attrezzatura per snorkeling"
        },
        {
          en: "Professional guide",
          fr: "Guide professionnel",
          ru: "Профессиональный гид",
          ro: "Ghid profesionist",
          it: "Guida professionale"
        },
        {
          en: "Lunch and soft drinks",
          fr: "Déjeuner et boissons non alcoolisées",
          ru: "Обед и безалкогольные напитки",
          ro: "Prânz și băuturi răcoritoare",
          it: "Pranzo e bibite"
        },
        {
          en: "Life jackets and safety briefing",
          fr: "Gilets de sauvetage et briefing de sécurité",
          ru: "Спасательные жилеты и инструктаж по безопасности",
          ro: "Veste de salvare și briefing de siguranță",
          it: "Giubbotti di salvataggio e briefing di sicurezza"
        }
      ],
      excludes: [
        {
          en: "Underwater camera rental",
          fr: "Location de caméra sous-marine",
          ru: "Аренда подводной камеры",
          ro: "Închiriere cameră subacvatică",
          it: "Noleggio fotocamera subacquea"
        },
        {
          en: "Wetsuit rental",
          fr: "Location de combinaison",
          ru: "Аренда гидрокостюма",
          ro: "Închiriere costum de neopren",
          it: "Noleggio muta"
        },
        {
          en: "Gratuities",
          fr: "Pourboires",
          ru: "Чаевые",
          ro: "Bacșișuri",
          it: "Mance"
        }
      ],
      whatToBring: [
        {
          en: "Swimwear and towel",
          fr: "Maillot de bain et serviette",
          ru: "Купальник и полотенце",
          ro: "Costum de baie și prosop",
          it: "Costume da bagno e asciugamano"
        },
        {
          en: "Sunscreen (reef-safe)",
          fr: "Crème solaire (respectueuse des récifs)",
          ru: "Солнцезащитный крем (безопасный для рифов)",
          ro: "Cremă solară (sigură pentru recif)",
          it: "Crema solare (sicura per la barriera corallina)"
        },
        {
          en: "Waterproof phone case",
          fr: "Étui étanche pour téléphone",
          ru: "Водонепроницаемый чехол для телефона",
          ro: "Husă impermeabilă pentru telefon",
          it: "Custodia impermeabile per telefono"
        }
      ],
      availabilityDayNo: [0, 1, 2, 3, 4, 6]
    }
  },

  // Trip 4: Nile Cruise Full-Day Experience - Group
  {
    destinationSearch: 'luxor',
    tripTypeSearch: 'cruise',
    fallbackDestinationId: 1,
    fallbackTripTypeId: 1,
    data: {
      name: {
        en: "Nile Cruise Full-Day Experience - Group Tour",
        fr: "Croisière sur le Nil Journée Complète - Tour de Groupe",
        ru: "Круиз по Нилу на целый день - Групповой тур",
        ro: "Croazieră pe Nil Zi Întreagă - Tur de Grup",
        it: "Crociera sul Nilo Giornata Intera - Tour di Gruppo"
      },
      description: {
        en: "Sail down the legendary Nile River aboard a traditional felucca and modern cruise boat. Visit ancient temples, enjoy traditional Egyptian entertainment, and savor an authentic buffet lunch. Experience the magic of the Nile with a friendly group atmosphere.",
        fr: "Naviguez sur le légendaire fleuve Nil à bord d'une felouque traditionnelle et d'un bateau de croisière moderne. Visitez des temples anciens, profitez de divertissements égyptiens traditionnels et savourez un buffet authentique. Découvrez la magie du Nil dans une ambiance de groupe conviviale.",
        ru: "Плывите по легендарной реке Нил на традиционной фелуке и современном круизном судне. Посетите древние храмы, насладитесь традиционными египетскими развлечениями и отведайте аутентичный шведский стол. Испытайте магию Нила в дружеской групповой атмосфере.",
        ro: "Navighează pe legendarul râu Nil la bordul unei feluci tradiționale și a unei ambarcațiuni de croazieră moderne. Vizitează temple antice, bucură-te de divertisment egiptean tradițional și savurează un bufet autentic. Experimentează magia Nilului într-o atmosferă prietenoasă de grup.",
        it: "Naviga sul leggendario fiume Nilo a bordo di una tradizionale feluca e di una moderna nave da crociera. Visita templi antichi, goditi l'intrattenimento egiziano tradizionale e assapora un autentico buffet. Vivi la magia del Nilo in un'atmosfera di gruppo amichevole."
      },
      timeFrom: "07:00",
      durationValue: 12,
      durationType: 0,
      adultPrice: 85,
      childPrice: 45,
      infPrice: 0,
      category: 0,
      highlights: [
        {
          en: "Traditional felucca sailing",
          fr: "Navigation en felouque traditionnelle",
          ru: "Плавание на традиционной фелуке",
          ro: "Navigare cu feluca tradițională",
          it: "Navigazione tradizionale in feluca"
        },
        {
          en: "Visit Kom Ombo Temple",
          fr: "Visite du Temple de Kom Ombo",
          ru: "Посещение храма Ком Омбо",
          ro: "Vizită la Templul Kom Ombo",
          it: "Visita al Tempio di Kom Ombo"
        },
        {
          en: "Live Egyptian folkloric show",
          fr: "Spectacle folklorique égyptien en direct",
          ru: "Живое египетское фольклорное шоу",
          ro: "Spectacol folcloric egiptean live",
          it: "Spettacolo folcloristico egiziano dal vivo"
        },
        {
          en: "Gourmet buffet with Nile views",
          fr: "Buffet gastronomique avec vue sur le Nil",
          ru: "Изысканный буфет с видом на Нил",
          ro: "Bufet gurmand cu vedere la Nil",
          it: "Buffet gourmet con vista sul Nilo"
        }
      ],
      includes: [
        {
          en: "Hotel pickup and drop-off",
          fr: "Prise en charge et retour à l'hôtel",
          ru: "Трансфер из отеля и обратно",
          ro: "Preluare și returnare la hotel",
          it: "Ritiro e rientro in hotel"
        },
        {
          en: "Nile cruise with lunch and dinner",
          fr: "Croisière sur le Nil avec déjeuner et dîner",
          ru: "Круиз по Нилу с обедом и ужином",
          ro: "Croazieră pe Nil cu prânz și cină",
          it: "Crociera sul Nilo con pranzo e cena"
        },
        {
          en: "Temple entrance fees",
          fr: "Frais d'entrée aux temples",
          ru: "Входные билеты в храмы",
          ro: "Taxe de intrare la temple",
          it: "Biglietti d'ingresso ai templi"
        },
        {
          en: "Live entertainment onboard",
          fr: "Divertissement en direct à bord",
          ru: "Живые развлечения на борту",
          ro: "Divertisment live la bord",
          it: "Intrattenimento dal vivo a bordo"
        },
        {
          en: "English-speaking guide",
          fr: "Guide anglophone",
          ru: "Англоговорящий гид",
          ro: "Ghid vorbitor de engleză",
          it: "Guida di lingua inglese"
        }
      ],
      excludes: [
        {
          en: "Beverages (available for purchase)",
          fr: "Boissons (disponibles à l'achat)",
          ru: "Напитки (можно приобрести)",
          ro: "Băuturi (disponibile pentru cumpărare)",
          it: "Bevande (disponibili per l'acquisto)"
        },
        {
          en: "Gratuities",
          fr: "Pourboires",
          ru: "Чаевые",
          ro: "Bacșișuri",
          it: "Mance"
        }
      ],
      whatToBring: [
        {
          en: "Comfortable clothing",
          fr: "Vêtements confortables",
          ru: "Удобная одежда",
          ro: "Îmbrăcăminte confortabilă",
          it: "Abbigliamento comodo"
        },
        {
          en: "Sun protection",
          fr: "Protection solaire",
          ru: "Защита от солнца",
          ro: "Protecție solară",
          it: "Protezione solare"
        },
        {
          en: "Camera",
          fr: "Appareil photo",
          ru: "Камера",
          ro: "Cameră foto",
          it: "Fotocamera"
        },
        {
          en: "Cash for drinks and souvenirs",
          fr: "Argent liquide pour boissons et souvenirs",
          ru: "Наличные на напитки и сувениры",
          ro: "Bani gheață pentru băuturi și suveniruri",
          it: "Contanti per bevande e souvenir"
        }
      ],
      availabilityDayNo: [0, 2, 4, 6]
    }
  }
];

async function createTrip(tripConfig, destinations, tripTypes) {
  console.log(`\n=== Creating Trip: ${tripConfig.data.name.en} ===`);
  
  // Find destination
  let destination = findDestination(destinations, tripConfig.destinationSearch);
  if (!destination) {
    console.log(`  ⚠ Destination "${tripConfig.destinationSearch}" not found, using fallback ID ${tripConfig.fallbackDestinationId}`);
    destination = { id: tripConfig.fallbackDestinationId };
  } else {
    console.log(`  ✓ Destination: ${destination.name} (ID: ${destination.id})`);
  }

  // Find trip type
  let tripType = findTripType(tripTypes, tripConfig.tripTypeSearch);
  if (!tripType) {
    console.log(`  ⚠ Trip type "${tripConfig.tripTypeSearch}" not found, using fallback ID ${tripConfig.fallbackTripTypeId}`);
    tripType = { id: tripConfig.fallbackTripTypeId };
  } else {
    console.log(`  ✓ Trip Type: ${tripType.name} (ID: ${tripType.id})`);
  }

  // Build payload
  const payload = {
    ...tripConfig.data,
    destinationId: destination.id,
    tripTypeId: tripType.id
  };

  try {
    const response = await makeRequest('POST', '/api/Trips', payload);
    const tripId = response.data?.id || response.id;
    console.log(`  ✓ Trip created successfully (ID: ${tripId})`);
    console.log(`  - Category: ${payload.category === 1 ? 'Private' : 'Group'}`);
    console.log(`  - Duration: ${payload.durationValue} hours`);
    console.log(`  - Price: $${payload.adultPrice} adult / $${payload.childPrice} child`);
    return tripId;
  } catch (error) {
    console.error(`  ✗ Failed to create trip: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('========================================');
  console.log('Trip Creation Process Started');
  console.log('========================================');
  console.log(`API Base URL: ${API_BASE_URL}`);
  console.log(`Trips to create: ${trips.length}`);
  console.log('  - 2 Private trips');
  console.log('  - 2 Group trips');
  console.log('  - All with full translations (EN, FR, RU, RO, IT)');
  
  console.log('\n--- Fetching Prerequisites ---');
  const destinations = await getDestinations();
  console.log(`✓ Fetched ${destinations.length} destinations`);
  
  const tripTypes = await getTripTypes();
  console.log(`✓ Fetched ${tripTypes.length} trip types`);

  console.log('\n--- Creating Trips ---');
  const createdTripIds = [];
  
  for (const tripConfig of trips) {
    const tripId = await createTrip(tripConfig, destinations, tripTypes);
    if (tripId) {
      createdTripIds.push(tripId);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n========================================');
  console.log('Trip Creation Process Complete!');
  console.log('========================================');
  console.log(`\nSummary:`);
  console.log(`- Trips created: ${createdTripIds.length}/${trips.length}`);
  console.log(`- Private trips: ${trips.filter(t => t.data.category === 1).length}`);
  console.log(`- Group trips: ${trips.filter(t => t.data.category === 0).length}`);
  console.log(`- Languages: EN, FR, RU, RO, IT`);
  
  if (createdTripIds.length > 0) {
    console.log(`\nCreated Trip IDs: ${createdTripIds.join(', ')}`);
    console.log('\nNext Steps:');
    console.log('- Upload images via admin panel');
    console.log('- Visit /[locale]/trips to view your trips');
    console.log('- Test language switching');
  }
}

main().catch(console.error);
