import { TransferLocationItem, VehicleTypeTransferItem } from "@/models/transfer";

export const DEFAULT_FROM_LOCATIONS: TransferLocationItem[] = [
  { id: "hrg-apt", name: "Hurghada International Airport (HRG)", city: "Hurghada", code: "HRG", isAirport: true },
  { id: "cai-apt", name: "Cairo International Airport (CAI)", city: "Cairo", code: "CAI", isAirport: true },
  { id: "ssh-apt", name: "Sharm El Sheikh International Airport (SSH)", city: "Sharm El Sheikh", code: "SSH", isAirport: true },
  { id: "lux-apt", name: "Luxor International Airport (LXR)", city: "Luxor", code: "LXR", isAirport: true },
  { id: "rmy-apt", name: "Marsa Alam International Airport (RMF)", city: "Marsa Alam", code: "RMF", isAirport: true },
];

export const DEFAULT_TO_LOCATIONS: TransferLocationItem[] = [
  { id: "hrg-hotels", name: "Hurghada City / Hotels & Resorts", city: "Hurghada" },
  { id: "el-gouna", name: "El Gouna Resorts", city: "El Gouna" },
  { id: "makadi-bay", name: "Makadi Bay Resorts", city: "Makadi Bay" },
  { id: "soma-bay", name: "Soma Bay Luxury Resorts", city: "Soma Bay" },
  { id: "sahl-hasheesh", name: "Sahl Hasheesh Bay", city: "Sahl Hasheesh" },
  { id: "cairo-downtown", name: "Cairo Downtown / Nile Corniche Hotels", city: "Cairo" },
  { id: "giza-pyramids", name: "Giza Pyramids Area Hotels", city: "Giza" },
];

export const DEFAULT_VEHICLE_TYPES: VehicleTypeTransferItem[] = [
  {
    id: "car",
    name: "Car (Sedan)",
    capacityText: "Max 3 passengers, 3 suitcases, 2 hand bags",
    maxPassengers: 3,
    maxLuggage: 3,
    maxHandBags: 2,
    features: [
      "Air-conditioned",
      "Free Cancellation up to 24h",
      "Flight Delay Protection",
      "Fixed Price - No Hidden Fees",
    ],
    icon: "/Transfers/car.svg",
    oneWayPrice: 25,
    roundTripPrice: 45,
    currency: "EUR",
  },
  {
    id: "minibus",
    name: "Minibus",
    capacityText: "Max 7 passengers, 7 suitcases, 5 hand bags",
    maxPassengers: 7,
    maxLuggage: 7,
    maxHandBags: 5,
    features: [
      "Climate Controlled",
      "Generous Luggage Compartment",
      "Free Cancellation up to 24h",
      "Direct Door-to-Door Service",
    ],
    icon: "/Transfers/minibus.svg",
    oneWayPrice: 45,
    roundTripPrice: 80,
    currency: "EUR",
  },
  {
    id: "bus",
    name: "Tourist Coach (Bus)",
    capacityText: "Max 18 passengers, 20 suitcases, 10 hand bags",
    maxPassengers: 18,
    maxLuggage: 20,
    maxHandBags: 10,
    features: [
      "Maximum Baggage Space",
      "Reclining Executive Seats",
      "Licensed Bilingual Driver",
      "Flight Delay Monitoring",
    ],
    icon: "/Transfers/bus.svg",
    oneWayPrice: 90,
    roundTripPrice: 160,
    currency: "EUR",
  },
];
