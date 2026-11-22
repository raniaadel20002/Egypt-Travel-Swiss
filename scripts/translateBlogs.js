const axios = require("axios");

const BASE_URL = "https://touristy.runasp.net";
const TOKEN = "YOUR_JWT_TOKEN_HERE"; // Replace with your actual token

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

// Fetch all blogs
async function fetchAllBlogs() {
  try {
    const response = await api.get("/api/Blogs", {
      params: { PageNumber: 1, PageSize: 100 },
    });
    return response.data?.data || response.data?.Data || [];
  } catch (error) {
    console.error("Error fetching blogs:", error.response?.data || error.message);
    return [];
  }
}

// Fetch single blog with all languages
async function fetchBlogInAllLanguages(blogId) {
  const languages = ["en", "fr", "ru", "ro", "it"];
  const results = {};

  for (const lang of languages) {
    try {
      const response = await api.get(`/api/Blogs/${blogId}`, {
        headers: { "Accept-Language": lang },
      });
      results[lang] = response.data?.data || response.data?.Data || null;
    } catch (error) {
      console.error(`Error fetching blog ${blogId} in ${lang}:`, error.message);
      results[lang] = null;
    }
  }

  return results;
}

// Translation dictionary with comprehensive terms
const TRANSLATION_DICT = {
  // Location names
  "Red Sea": { fr: "Mer Rouge", ru: "Красное море", ro: "Marea Roșie", it: "Mar Rosso" },
  "Pyramids": { fr: "Pyramides", ru: "Пирамиды", ro: "Piramide", it: "Piramidi" },
  "Giza": { fr: "Gizeh", ru: "Гиза", ro: "Giza", it: "Giza" },
  "Cairo": { fr: "Le Caire", ru: "Каир", ro: "Cairo", it: "Il Cairo" },
  "Luxor": { fr: "Louxor", ru: "Луксор", ro: "Luxor", it: "Luxor" },
  "Egypt": { fr: "Égypte", ru: "Египет", ro: "Egipt", it: "Egitto" },
  "Egyptian": { fr: "Égyptien", ru: "Египетский", ro: "Egiptean", it: "Egiziano" },
  "Nile": { fr: "Nil", ru: "Нил", ro: "Nil", it: "Nilo" },
  "Sahara": { fr: "Sahara", ru: "Сахара", ro: "Sahara", it: "Sahara" },
  "Sinai": { fr: "Sinaï", ru: "Синай", ro: "Sinai", it: "Sinai" },
  "Alexandria": { fr: "Alexandrie", ru: "Александрия", ro: "Alexandria", it: "Alessandria" },
  "Aswan": { fr: "Assouan", ru: "Асуан", ro: "Aswan", it: "Assuan" },
  "Hurghada": { fr: "Hurghada", ru: "Хургада", ro: "Hurghada", it: "Hurghada" },
  "Sharm El Sheikh": { fr: "Charm el-Cheikh", ru: "Шарм-эш-Шейх", ro: "Sharm El Sheikh", it: "Sharm el-Sheikh" },

  // Activities & Tourism
  "diving": { fr: "plongée", ru: "дайвинг", ro: "scufundări", it: "immersioni" },
  "snorkeling": { fr: "plongée avec tuba", ru: "снорклинг", ro: "snorkeling", it: "snorkeling" },
  "cruise": { fr: "croisière", ru: "круиз", ro: "croazieră", it: "crociera" },
  "tour": { fr: "visite", ru: "тур", ro: "tur", it: "tour" },
  "excursion": { fr: "excursion", ru: "экскурсия", ro: "excursie", it: "escursione" },
  "safari": { fr: "safari", ru: "сафари", ro: "safari", it: "safari" },
  "trekking": { fr: "randonnée", ru: "треккинг", ro: "drumeție", it: "trekking" },
  "camel ride": { fr: "balade à dos de chameau", ru: "прогулка на верблюде", ro: "plimbare cu cămila", it: "giro in cammello" },

  // Places & Monuments
  "temple": { fr: "temple", ru: "храм", ro: "templu", it: "tempio" },
  "pyramid": { fr: "pyramide", ru: "пирамида", ro: "piramidă", it: "piramide" },
  "sphinx": { fr: "sphinx", ru: "сфинкс", ro: "sfinx", it: "sfinge" },
  "tomb": { fr: "tombe", ru: "гробница", ro: "mormânt", it: "tomba" },
  "pharaoh": { fr: "pharaon", ru: "фараон", ro: "faraon", it: "faraone" },
  "museum": { fr: "musée", ru: "музей", ro: "muzeu", it: "museo" },
  "palace": { fr: "palais", ru: "дворец", ro: "palat", it: "palazzo" },
  "fortress": { fr: "forteresse", ru: "крепость", ro: "fortăreață", it: "fortezza" },
  "mosque": { fr: "mosquée", ru: "мечеть", ro: "moschee", it: "moschea" },
  "church": { fr: "église", ru: "церковь", ro: "biserică", it: "chiesa" },
  "market": { fr: "marché", ru: "рынок", ro: "piață", it: "mercato" },
  "bazaar": { fr: "bazar", ru: "базар", ro: "bazar", it: "bazar" },

  // Nature & Geography
  "desert": { fr: "désert", ru: "пустыня", ro: "deșert", it: "deserto" },
  "oasis": { fr: "oasis", ru: "оазис", ro: "oază", it: "oasi" },
  "beach": { fr: "plage", ru: "пляж", ro: "plajă", it: "spiaggia" },
  "island": { fr: "île", ru: "остров", ro: "insulă", it: "isola" },
  "reef": { fr: "récif", ru: "риф", ro: "recif", it: "scogliera" },
  "coral": { fr: "corail", ru: "коралл", ro: "coral", it: "corallo" },
  "mountain": { fr: "montagne", ru: "гора", ro: "munte", it: "montagna" },
  "valley": { fr: "vallée", ru: "долина", ro: "vale", it: "valle" },
  "river": { fr: "rivière", ru: "река", ro: "râu", it: "fiume" },
  "lake": { fr: "lac", ru: "озеро", ro: "lac", it: "lago" },
  "sea": { fr: "mer", ru: "море", ro: "mare", it: "mare" },
  "coast": { fr: "côte", ru: "побережье", ro: "coastă", it: "costa" },
  "sunset": { fr: "coucher de soleil", ru: "закат", ro: "apus", it: "tramonto" },
  "sunrise": { fr: "lever du soleil", ru: "рассвет", ro: "răsărit", it: "alba" },

  // Culture & Heritage
  "ancient": { fr: "ancien", ru: "древний", ro: "antic", it: "antico" },
  "historic": { fr: "historique", ru: "исторический", ro: "istoric", it: "storico" },
  "culture": { fr: "culture", ru: "культура", ro: "cultură", it: "cultura" },
  "heritage": { fr: "patrimoine", ru: "наследие", ro: "patrimoniu", it: "patrimonio" },
  "history": { fr: "histoire", ru: "история", ro: "istorie", it: "storia" },
  "civilization": { fr: "civilisation", ru: "цивилизация", ro: "civilizație", it: "civiltà" },
  "tradition": { fr: "tradition", ru: "традиция", ro: "tradiție", it: "tradizione" },
  "legend": { fr: "légende", ru: "легенда", ro: "legendă", it: "leggenda" },
  "artifact": { fr: "artefact", ru: "артефакт", ro: "artefact", it: "artefatto" },

  // Travel & Experience
  "adventure": { fr: "aventure", ru: "приключение", ro: "aventură", it: "avventura" },
  "experience": { fr: "expérience", ru: "опыт", ro: "experiență", it: "esperienza" },
  "discover": { fr: "découvrir", ru: "открыть", ro: "descoperi", it: "scoprire" },
  "explore": { fr: "explorer", ru: "исследовать", ro: "explora", it: "esplorare" },
  "journey": { fr: "voyage", ru: "путешествие", ro: "călătorie", it: "viaggio" },
  "trip": { fr: "voyage", ru: "поездка", ro: "excursie", it: "viaggio" },
  "vacation": { fr: "vacances", ru: "отпуск", ro: "vacanță", it: "vacanza" },
  "holiday": { fr: "vacances", ru: "праздник", ro: "sărbătoare", it: "vacanza" },
  "tourist": { fr: "touriste", ru: "турист", ro: "turist", it: "turista" },
  "traveler": { fr: "voyageur", ru: "путешественник", ro: "călător", it: "viaggiatore" },
  "visitor": { fr: "visiteur", ru: "посетитель", ro: "vizitator", it: "visitatore" },
  "guide": { fr: "guide", ru: "гид", ro: "ghid", it: "guida" },

  // Accommodation & Services
  "hotel": { fr: "hôtel", ru: "отель", ro: "hotel", it: "hotel" },
  "resort": { fr: "complexe", ru: "курорт", ro: "stațiune", it: "resort" },
  "accommodation": { fr: "hébergement", ru: "размещение", ro: "cazare", it: "alloggio" },
  "restaurant": { fr: "restaurant", ru: "ресторан", ro: "restaurant", it: "ristorante" },
  "cafe": { fr: "café", ru: "кафе", ro: "cafenea", it: "caffè" },
  "booking": { fr: "réservation", ru: "бронирование", ro: "rezervare", it: "prenotazione" },
  "reservation": { fr: "réservation", ru: "резервирование", ro: "rezervare", it: "prenotazione" },

  // Adjectives & Descriptions
  "beautiful": { fr: "magnifique", ru: "красивый", ro: "frumos", it: "bellissimo" },
  "stunning": { fr: "époustouflant", ru: "потрясающий", ro: "uluitor", it: "stupendo" },
  "amazing": { fr: "incroyable", ru: "удивительный", ro: "uimitor", it: "fantastico" },
  "spectacular": { fr: "spectaculaire", ru: "впечатляющий", ro: "spectaculos", it: "spettacolare" },
  "breathtaking": { fr: "à couper le souffle", ru: "захватывающий", ro: "uluitoare", it: "mozzafiato" },
  "unforgettable": { fr: "inoubliable", ru: "незабываемый", ro: "de neuitat", it: "indimenticabile" },
  "unique": { fr: "unique", ru: "уникальный", ro: "unic", it: "unico" },
  "authentic": { fr: "authentique", ru: "подлинный", ro: "autentic", it: "autentico" },
  "traditional": { fr: "traditionnel", ru: "традиционный", ro: "tradițional", it: "tradizionale" },
  "modern": { fr: "moderne", ru: "современный", ro: "modern", it: "moderno" },
  "luxury": { fr: "luxe", ru: "роскошь", ro: "lux", it: "lusso" },
  "comfortable": { fr: "confortable", ru: "комфортный", ro: "confortabil", it: "comodo" },
};

// Translation helper with word boundary and case preservation
function translateText(text, targetLang) {
  if (!text || typeof text !== "string") return text;
  
  let translated = text;

  // Sort by length (longest first) to handle multi-word phrases before single words
  const sortedEntries = Object.entries(TRANSLATION_DICT).sort(
    ([a], [b]) => b.length - a.length
  );

  sortedEntries.forEach(([enTerm, langMap]) => {
    if (langMap[targetLang]) {
      // Use word boundaries for better matching
      const regex = new RegExp(`\\b${enTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, "gi");
      translated = translated.replace(regex, (match) => {
        const targetText = langMap[targetLang];
        // Preserve ALL CAPS
        if (match === match.toUpperCase()) {
          return targetText.toUpperCase();
        }
        // Preserve Title Case (first letter uppercase)
        if (match[0] === match[0].toUpperCase()) {
          return targetText.charAt(0).toUpperCase() + targetText.slice(1);
        }
        // Otherwise lowercase
        return targetText.toLowerCase();
      });
    }
  });

  return translated;
}

// Generate multilingual content
function generateMultiLangText(existingData, baseText) {
  const result = {
    en: baseText || existingData.en || "",
    fr: existingData.fr || "",
    ru: existingData.ru || "",
    ro: existingData.ro || "",
    it: existingData.it || "",
  };

  // If we have English text, auto-translate for any language that:
  // - is missing, OR
  // - is identical to English (backend not returning proper translations)
  if (result.en) {
    ["fr", "ru", "ro", "it"].forEach((lang) => {
      if (!result[lang] || result[lang] === result.en || result[lang].trim() === result.en.trim()) {
        result[lang] = translateText(result.en, lang);
      }
    });
  }

  return result;
}

// Update blog with translations
async function updateBlogWithTranslations(blogId, multiLangData) {
  try {
    // Combine all language data
    const enData = multiLangData.en || {};
    const frData = multiLangData.fr || {};
    const ruData = multiLangData.ru || {};
    const roData = multiLangData.ro || {};
    const itData = multiLangData.it || {};

    // Build multilingual title
    const titleObj = generateMultiLangText({
      en: enData.title || "",
      fr: frData.title || "",
      ru: ruData.title || "",
      ro: roData.title || "",
      it: itData.title || "",
    }, enData.title);

    // Build multilingual content
    const contentObj = generateMultiLangText({
      en: enData.content || "",
      fr: frData.content || "",
      ru: ruData.content || "",
      ro: roData.content || "",
      it: itData.content || "",
    }, enData.content);

    // Build multilingual sections
    const sections = (enData.blogSections || []).map((enSection, index) => {
      const frSection = (frData.blogSections || [])[index] || {};
      const ruSection = (ruData.blogSections || [])[index] || {};
      const roSection = (roData.blogSections || [])[index] || {};
      const itSection = (itData.blogSections || [])[index] || {};

      return {
        id: enSection.id || 0,
        sectionNumber: enSection.sectionNumber || index + 1,
        title: generateMultiLangText({
          en: enSection.title || "",
          fr: frSection.title || "",
          ru: ruSection.title || "",
          ro: roSection.title || "",
          it: itSection.title || "",
        }, enSection.title),
        content: generateMultiLangText({
          en: enSection.content || "",
          fr: frSection.content || "",
          ru: ruSection.content || "",
          ro: roSection.content || "",
          it: itSection.content || "",
        }, enSection.content),
      };
    });

    const payload = {
      id: blogId,
      title: titleObj,
      content: contentObj,
      blogSections: sections,
    };

    console.log(`\nUpdating blog ${blogId}...`);
    console.log("Title (EN):", titleObj.en);
    console.log("Title (FR):", titleObj.fr);
    console.log("Sections:", sections.length);

    const response = await api.put(`/api/Blogs/${blogId}`, payload);

    console.log(`✓ Blog ${blogId} updated successfully`);
    return response.data;
  } catch (error) {
    console.error(`✗ Error updating blog ${blogId}:`, error.response?.data || error.message);
    throw error;
  }
}

// Main execution
async function main() {
  console.log("=".repeat(60));
  console.log("BLOG TRANSLATION SCRIPT");
  console.log("=".repeat(60));

  // Step 1: Fetch all blogs
  console.log("\n[1/3] Fetching all blogs...");
  const blogs = await fetchAllBlogs();

  if (blogs.length === 0) {
    console.log("No blogs found in the backend.");
    return;
  }

  console.log(`Found ${blogs.length} blog(s)`);

  // Step 2: Fetch each blog in all languages
  console.log("\n[2/3] Fetching multilingual data for each blog...");
  const multiLangBlogs = [];

  for (const blog of blogs) {
    console.log(`- Fetching blog ${blog.id} in all languages...`);
    const langData = await fetchBlogInAllLanguages(blog.id);
    multiLangBlogs.push({ id: blog.id, langData });
  }

  // Step 3: Update each blog with translations
  console.log("\n[3/3] Updating blogs with translations...");

  for (const { id, langData } of multiLangBlogs) {
    try {
      await updateBlogWithTranslations(id, langData);
      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Failed to update blog ${id}, continuing...`);
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("TRANSLATION COMPLETE");
  console.log("=".repeat(60));
  console.log("\nAll blogs have been processed.");
  console.log("Please test language switching on:");
  console.log("- Blog listing page: /[locale]/blog");
  console.log("- Single blog pages: /[locale]/blog/[slug]");
}

// Run the script
main().catch((error) => {
  console.error("\nFatal error:", error);
  process.exit(1);
});
