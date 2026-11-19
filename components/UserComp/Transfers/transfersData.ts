import { TransferVehicleItem } from "@/models/transfer";

export const TRANSFER_VEHICLES: TransferVehicleItem[] = [
  {
    id: "car",
    name: "Private Sedan (Car)",
    capacity: "1–3 passengers",
    description: "Modern air-conditioned sedan tailored for individuals, couples, or small parties with luggage.",
    features: ["Fixed transparent rates", "Meet & greet service", "Flight delay tracking"],
    icon: "/Transfers/car.svg",
    inquiryHref: "#inquiry",
  },
  {
    id: "minibus",
    name: "Spacious Minibus",
    capacity: "4–7 passengers",
    description: "Comfortable and roomy ride designed for families and small travel groups with extra bags.",
    features: ["Generous luggage space", "Climate-controlled cabin", "Direct door-to-door transfer"],
    icon: "/Transfers/minibus.svg",
    inquiryHref: "#inquiry",
  },
  {
    id: "bus",
    name: "Tourist Coach (Bus)",
    capacity: "8–18 passengers",
    description: "Premium large-capacity coach configured for groups, tour parties, and corporate transfers.",
    features: ["Maximum baggage capacity", "Reclining seats", "Licensed bilingual driver"],
    icon: "/Transfers/bus.svg",
    inquiryHref: "#inquiry",
  },
];
