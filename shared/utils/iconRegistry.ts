import { IconType } from "react-icons";
import { TbScubaDiving, TbScubaMask, TbScubaDivingTank } from "react-icons/tb";
import { GiSnorkel, GiScubaTanks, GiPoolDive, GiTropicalFish, GiJellyfish } from "react-icons/gi";
import { FaFishFins } from "react-icons/fa6";
import {
  FaWater,
  FaSwimmingPool,
  FaUmbrellaBeach,
  FaSun,
  FaSwimmer,
  FaFish,
  FaAnchor,
  FaShip,
  FaUtensils,
  FaCoffee,
  FaCocktail,
  FaGlassMartiniAlt,
  FaHeartbeat,
  FaSpa,
  FaHotTub,
  FaDumbbell,
  FaBicycle,
  FaBed,
  FaBath,
  FaShower,
  FaTv,
  FaSnowflake,
  FaWind,
  FaWifi,
  FaLaptop,
  FaSmokingBan,
  FaConciergeBell,
  FaClock,
  FaKey,
  FaLock,
  FaShieldAlt,
  FaSuitcaseRolling,
  FaPhoneAlt,
  FaLanguage,
  FaMedkit,
  FaCar,
  FaShuttleVan,
  FaPlane,
  FaParking,
  FaBus,
  FaMapMarkedAlt,
  FaCompass,
  FaBaby,
  FaWheelchair,
  FaPaw,
  FaShoppingBag,
  FaMusic,
  FaStar,
  FaGraduationCap,
  FaLifeRing,
  FaBookOpen,
  FaAward,
} from "react-icons/fa";

export type IconCategory =
  | "Diving & Marine"
  | "Pool & Beach"
  | "Dining & Bar"
  | "Wellness & Sports"
  | "Room & Comfort"
  | "Services & Safety"
  | "Transport & Tours"
  | "General & Leisure";

export const ICON_CATEGORIES: IconCategory[] = [
  "Diving & Marine",
  "Pool & Beach",
  "Dining & Bar",
  "Wellness & Sports",
  "Room & Comfort",
  "Services & Safety",
  "Transport & Tours",
  "General & Leisure",
];

export interface AppIconOption {
  name: string;
  label: string;
  category: IconCategory;
  keywords: string[];
  icon: IconType;
}

export const DEFAULT_ICON_NAME = "star";
export const DEFAULT_ICON_COMPONENT: IconType = FaStar;

export const APP_ICON_CATALOG: AppIconOption[] = [
  // Diving & Marine
  { name: "scuba-diving", label: "Scuba Diving", category: "Diving & Marine", keywords: ["scuba", "dive", "diver", "padi", "water"], icon: TbScubaDiving },
  { name: "scuba-mask", label: "Diving Mask", category: "Diving & Marine", keywords: ["mask", "goggles", "snorkel", "dive"], icon: TbScubaMask },
  { name: "oxygen-tank", label: "Scuba Tank", category: "Diving & Marine", keywords: ["tank", "oxygen", "cylinder", "air"], icon: TbScubaDivingTank },
  { name: "twin-tanks", label: "Twin Tanks", category: "Diving & Marine", keywords: ["tanks", "technical", "deep", "nitrox"], icon: GiScubaTanks },
  { name: "snorkel", label: "Snorkeling", category: "Diving & Marine", keywords: ["snorkel", "tube", "mask", "coral"], icon: GiSnorkel },
  { name: "deep-dive", label: "Deep Dive", category: "Diving & Marine", keywords: ["deep", "drift", "wreck", "dive"], icon: GiPoolDive },
  { name: "tropical-fish", label: "Reef Fish", category: "Diving & Marine", keywords: ["fish", "coral", "reef", "marine"], icon: GiTropicalFish },
  { name: "jellyfish", label: "Marine Life", category: "Diving & Marine", keywords: ["jellyfish", "sea", "wildlife", "ocean"], icon: GiJellyfish },
  { name: "flippers", label: "Fins / Flippers", category: "Diving & Marine", keywords: ["fins", "flippers", "feet", "swim"], icon: FaFishFins },

  // Pool & Beach
  { name: "waves", label: "Waves / Sea", category: "Pool & Beach", keywords: ["water", "ocean", "sea"], icon: FaWater },
  { name: "swimming-pool", label: "Swimming Pool", category: "Pool & Beach", keywords: ["pool", "swim", "water"], icon: FaSwimmingPool },
  { name: "umbrella", label: "Beach Umbrella", category: "Pool & Beach", keywords: ["beach", "sun", "shade"], icon: FaUmbrellaBeach },
  { name: "sun", label: "Sunny / Outdoor", category: "Pool & Beach", keywords: ["weather", "summer", "warm"], icon: FaSun },
  { name: "swimmer", label: "Swimmer", category: "Pool & Beach", keywords: ["swimming", "sports", "water"], icon: FaSwimmer },
  { name: "fish", label: "Marine / Fish", category: "Pool & Beach", keywords: ["snorkeling", "diving", "coral", "sea"], icon: FaFish },
  { name: "anchor", label: "Marina / Anchor", category: "Pool & Beach", keywords: ["boat", "port", "harbor"], icon: FaAnchor },
  { name: "ship", label: "Cruise / Yacht", category: "Pool & Beach", keywords: ["cruise", "boat", "nile"], icon: FaShip },

  // Dining & Bar
  { name: "utensils", label: "Restaurant & Dining", category: "Dining & Bar", keywords: ["food", "buffet", "dinner", "lunch"], icon: FaUtensils },
  { name: "coffee", label: "Cafe & Breakfast", category: "Dining & Bar", keywords: ["tea", "drink", "morning"], icon: FaCoffee },
  { name: "cocktail", label: "Cocktail Bar", category: "Dining & Bar", keywords: ["drinks", "bar", "lounge"], icon: FaCocktail },
  { name: "martini", label: "Lounge & Nightlife", category: "Dining & Bar", keywords: ["wine", "drinks", "party"], icon: FaGlassMartiniAlt },

  // Wellness & Sports
  { name: "heart-pulse", label: "Wellness & Health", category: "Wellness & Sports", keywords: ["fitness", "care", "medical"], icon: FaHeartbeat },
  { name: "spa", label: "Spa & Massage", category: "Wellness & Sports", keywords: ["relaxation", "massage", "sauna"], icon: FaSpa },
  { name: "hot-tub", label: "Jacuzzi / Hot Tub", category: "Wellness & Sports", keywords: ["bath", "steam", "hydrotherapy"], icon: FaHotTub },
  { name: "activity", label: "Gym & Fitness", category: "Wellness & Sports", keywords: ["sports", "workout", "weights"], icon: FaDumbbell },
  { name: "bicycle", label: "Bicycle Rental", category: "Wellness & Sports", keywords: ["bike", "cycling", "ride"], icon: FaBicycle },

  // Room & Comfort
  { name: "bed", label: "Luxury Bedding", category: "Room & Comfort", keywords: ["bedroom", "sleep", "mattress"], icon: FaBed },
  { name: "bath", label: "Bathtub / Ensuite", category: "Room & Comfort", keywords: ["bathroom", "tub"], icon: FaBath },
  { name: "shower", label: "Private Shower", category: "Room & Comfort", keywords: ["bathroom", "water"], icon: FaShower },
  { name: "tv", label: "Satellite TV", category: "Room & Comfort", keywords: ["television", "channels", "screen"], icon: FaTv },
  { name: "snowflake", label: "Air Conditioning", category: "Room & Comfort", keywords: ["cooling", "ac", "climate"], icon: FaSnowflake },
  { name: "wind", label: "Balcony / Breeze", category: "Room & Comfort", keywords: ["terrace", "air", "view"], icon: FaWind },
  { name: "wifi", label: "High-Speed Wi-Fi", category: "Room & Comfort", keywords: ["internet", "network", "free"], icon: FaWifi },
  { name: "laptop", label: "Workspace / Desk", category: "Room & Comfort", keywords: ["business", "office", "computer"], icon: FaLaptop },
  { name: "smoking-ban", label: "Non-Smoking", category: "Room & Comfort", keywords: ["smoke-free", "healthy", "room"], icon: FaSmokingBan },

  // Services & Safety
  { name: "concierge-bell", label: "24h Concierge", category: "Services & Safety", keywords: ["reception", "desk", "service"], icon: FaConciergeBell },
  { name: "clock", label: "24/7 Front Desk", category: "Services & Safety", keywords: ["time", "always", "hours"], icon: FaClock },
  { name: "key", label: "Room Key Card", category: "Services & Safety", keywords: ["access", "entry", "secure"], icon: FaKey },
  { name: "lock", label: "In-Room Safe", category: "Services & Safety", keywords: ["security", "safety", "vault"], icon: FaLock },
  { name: "shield", label: "24h Security", category: "Services & Safety", keywords: ["guard", "safety", "protected"], icon: FaShieldAlt },
  { name: "suitcase", label: "Luggage Storage", category: "Services & Safety", keywords: ["bags", "check-in", "storage"], icon: FaSuitcaseRolling },
  { name: "phone", label: "Room Telephone", category: "Services & Safety", keywords: ["call", "reception", "desk"], icon: FaPhoneAlt },
  { name: "language", label: "Multilingual Staff", category: "Services & Safety", keywords: ["translator", "guide", "languages"], icon: FaLanguage },
  { name: "medkit", label: "First Aid / Clinic", category: "Services & Safety", keywords: ["doctor", "health", "emergency"], icon: FaMedkit },

  // Transport & Tours
  { name: "car", label: "Car Rental", category: "Transport & Tours", keywords: ["vehicle", "drive", "hire"], icon: FaCar },
  { name: "shuttle", label: "Airport Shuttle", category: "Transport & Tours", keywords: ["transfer", "van", "pickup"], icon: FaShuttleVan },
  { name: "plane", label: "Flight Assistance", category: "Transport & Tours", keywords: ["airport", "travel", "tickets"], icon: FaPlane },
  { name: "parking", label: "Free Parking", category: "Transport & Tours", keywords: ["garage", "car", "valet"], icon: FaParking },
  { name: "bus", label: "Excursion Bus", category: "Transport & Tours", keywords: ["tour", "transport", "shuttle"], icon: FaBus },
  { name: "map", label: "Tour Desk / Map", category: "Transport & Tours", keywords: ["excursions", "sightseeing", "trips"], icon: FaMapMarkedAlt },
  { name: "compass", label: "Adventure Tours", category: "Transport & Tours", keywords: ["desert", "safari", "explore"], icon: FaCompass },

  // General & Leisure
  { name: "baby", label: "Kids Club / Crib", category: "General & Leisure", keywords: ["family", "children", "toddler"], icon: FaBaby },
  { name: "wheelchair", label: "Accessible Facilities", category: "General & Leisure", keywords: ["disability", "elevator", "access"], icon: FaWheelchair },
  { name: "paw", label: "Pet Friendly", category: "General & Leisure", keywords: ["animals", "dogs", "cats"], icon: FaPaw },
  { name: "shopping-bag", label: "Shopping Arcade", category: "General & Leisure", keywords: ["store", "boutique", "souvenirs"], icon: FaShoppingBag },
  { name: "music", label: "Live Entertainment", category: "General & Leisure", keywords: ["shows", "music", "nightlife"], icon: FaMusic },
  { name: "star", label: "Featured / Luxury", category: "General & Leisure", keywords: ["vip", "premium", "top"], icon: FaStar },
  { name: "graduation-cap", label: "Course / Training", category: "Services & Safety", keywords: ["course", "learn", "training", "degree", "education"], icon: FaGraduationCap },
  { name: "life-buoy", label: "Safety / Rescue", category: "Wellness & Sports", keywords: ["diving", "rescue", "safety", "water", "float"], icon: FaLifeRing },
  { name: "book-open", label: "Study / Manual", category: "General & Leisure", keywords: ["book", "study", "exam", "theory", "guide"], icon: FaBookOpen },
  { name: "award", label: "Certification / PADI", category: "Services & Safety", keywords: ["padi", "license", "badge", "award", "certificate"], icon: FaAward },
];

const ALIAS_MAP: Record<string, string> = {
  scuba: "scuba-diving",
  diver: "scuba-diving",
  diving: "scuba-diving",
  mask: "scuba-mask",
  tank: "oxygen-tank",
  cylinder: "oxygen-tank",
  fins: "flippers",
  flipper: "flippers",
  water: "waves",
  pool: "swimming-pool",
  beach: "umbrella",
  parasol: "umbrella",
  dining: "utensils",
  restaurant: "utensils",
  food: "utensils",
  cafe: "coffee",
  bar: "cocktail",
  drinks: "cocktail",
  gym: "activity",
  fitness: "activity",
  sports: "activity",
  wellness: "spa",
  massage: "spa",
  reception: "concierge-bell",
  desk: "concierge-bell",
  concierge: "concierge-bell",
  internet: "wifi",
  ac: "snowflake",
  climate: "snowflake",
  balcony: "wind",
  transfer: "shuttle",
  airport: "shuttle",
  security: "shield",
  safe: "lock",
  kids: "baby",
  children: "baby",
  "life-ring": "life-buoy",
  lifering: "life-buoy",
  diploma: "graduation-cap",
  certificate: "award",
  fawater: "waves",
  faswimmingpool: "swimming-pool",
  faumbrellabeach: "umbrella",
  fawifi: "wifi",
  fautensils: "utensils",
  facoffee: "coffee",
  faheartbeat: "heart-pulse",
  faspa: "spa",
  fadumbbell: "activity",
  faconciergebell: "concierge-bell",
  fastar: "star",
};

const LOOKUP_MAP = new Map<string, AppIconOption>();

APP_ICON_CATALOG.forEach((item) => {
  LOOKUP_MAP.set(item.name.toLowerCase(), item);
});

export function normalizeIconName(name?: string | null): string {
  if (!name) return DEFAULT_ICON_NAME;
  const clean = name.trim().toLowerCase();
  if (LOOKUP_MAP.has(clean)) return clean;
  if (ALIAS_MAP[clean] && LOOKUP_MAP.has(ALIAS_MAP[clean])) {
    return ALIAS_MAP[clean];
  }
  return clean;
}

export function isKnownIconName(name?: string | null): boolean {
  if (!name) return false;
  const normalized = normalizeIconName(name);
  return LOOKUP_MAP.has(normalized);
}

export function getIconOptionByName(
  name?: string | null
): AppIconOption | null {
  if (!name) return null;
  const normalized = normalizeIconName(name);
  return LOOKUP_MAP.get(normalized) || null;
}

export function resolveIconComponent(name?: string | null): IconType {
  const option = getIconOptionByName(name);
  return option ? option.icon : DEFAULT_ICON_COMPONENT;
}
