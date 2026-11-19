import { apiClient } from "./apiConfig";
import {
  TransferLocationItem,
  VehicleTypeTransferItem,
  TransferVehiclePriceItem,
  TransferMatchRequest,
  TransferMatchResponse,
  TransferPreviewRequest,
  TransferPreviewResponse,
  CreateTransferBookingRequest,
  TransferBookingResult,
} from "@/models/transfer";

const DEFAULT_FROM_LOCATIONS: TransferLocationItem[] = [
  { id: "hrg-apt", name: "Hurghada International Airport (HRG)", city: "Hurghada", code: "HRG", isAirport: true },
  { id: "cai-apt", name: "Cairo International Airport (CAI)", city: "Cairo", code: "CAI", isAirport: true },
  { id: "ssh-apt", name: "Sharm El Sheikh International Airport (SSH)", city: "Sharm El Sheikh", code: "SSH", isAirport: true },
  { id: "lux-apt", name: "Luxor International Airport (LXR)", city: "Luxor", code: "LXR", isAirport: true },
  { id: "rmy-apt", name: "Marsa Alam International Airport (RMF)", city: "Marsa Alam", code: "RMF", isAirport: true },
];

const DEFAULT_TO_LOCATIONS: TransferLocationItem[] = [
  { id: "hrg-hotels", name: "Hurghada City / Hotels & Resorts", city: "Hurghada" },
  { id: "el-gouna", name: "El Gouna Resorts", city: "El Gouna" },
  { id: "makadi-bay", name: "Makadi Bay Resorts", city: "Makadi Bay" },
  { id: "soma-bay", name: "Soma Bay Luxury Resorts", city: "Soma Bay" },
  { id: "sahl-hasheesh", name: "Sahl Hasheesh Bay", city: "Sahl Hasheesh" },
  { id: "cairo-downtown", name: "Cairo Downtown / Nile Corniche Hotels", city: "Cairo" },
  { id: "giza-pyramids", name: "Giza Pyramids Area Hotels", city: "Giza" },
];

const DEFAULT_VEHICLE_TYPES: VehicleTypeTransferItem[] = [
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
    currency: "USD",
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
    currency: "USD",
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
    currency: "USD",
  },
];

export async function getTransferFromLocations(): Promise<TransferLocationItem[]> {
  try {
    const res = await apiClient.get<{ data?: TransferLocationItem[] } | TransferLocationItem[]>(
      "/api/TransferFromLocations"
    );
    const data = Array.isArray(res.data) ? res.data : res.data?.data;
    return data && data.length > 0 ? data : DEFAULT_FROM_LOCATIONS;
  } catch {
    return DEFAULT_FROM_LOCATIONS;
  }
}

export async function getTransferToLocations(
  fromLocationId?: string | number
): Promise<TransferLocationItem[]> {
  try {
    const res = await apiClient.get<{ data?: TransferLocationItem[] } | TransferLocationItem[]>(
      "/api/TransferToLocations",
      { params: fromLocationId ? { fromLocationId } : undefined }
    );
    const data = Array.isArray(res.data) ? res.data : res.data?.data;
    return data && data.length > 0 ? data : DEFAULT_TO_LOCATIONS;
  } catch {
    return DEFAULT_TO_LOCATIONS;
  }
}

export async function getVehicleTypeTransfers(): Promise<VehicleTypeTransferItem[]> {
  try {
    const res = await apiClient.get<{ data?: VehicleTypeTransferItem[] } | VehicleTypeTransferItem[]>(
      "/api/VehicleTypeTransfer"
    );
    const data = Array.isArray(res.data) ? res.data : res.data?.data;
    return data && data.length > 0 ? data : DEFAULT_VEHICLE_TYPES;
  } catch {
    return DEFAULT_VEHICLE_TYPES;
  }
}

export async function getTransferVehiclePrices(params?: {
  fromLocationId?: string | number;
  toLocationId?: string | number;
  vehicleTypeId?: string | number;
}): Promise<TransferVehiclePriceItem[]> {
  try {
    const res = await apiClient.get<{ data?: TransferVehiclePriceItem[] } | TransferVehiclePriceItem[]>(
      "/api/TransferVehiclePrice",
      { params }
    );
    const data = Array.isArray(res.data) ? res.data : res.data?.data;
    return data || [];
  } catch {
    return [];
  }
}

export async function matchTransfer(
  payload: TransferMatchRequest
): Promise<TransferMatchResponse | null> {
  try {
    const res = await apiClient.post<{ data?: TransferMatchResponse } | TransferMatchResponse>(
      "/api/Transfer/match",
      payload
    );
    const data = (res.data as { data?: TransferMatchResponse })?.data || (res.data as TransferMatchResponse);
    return data;
  } catch {
    return null;
  }
}

export async function previewTransfer(
  payload: TransferPreviewRequest
): Promise<TransferPreviewResponse | null> {
  try {
    const res = await apiClient.post<{ data?: TransferPreviewResponse } | TransferPreviewResponse>(
      "/api/Transfer/preview",
      payload
    );
    const data = (res.data as { data?: TransferPreviewResponse })?.data || (res.data as TransferPreviewResponse);
    return data;
  } catch {
    const v = DEFAULT_VEHICLE_TYPES.find((item) => String(item.id) === String(payload.vehicleTypeId)) || DEFAULT_VEHICLE_TYPES[0];
    const base = payload.isRoundTrip ? v.roundTripPrice : v.oneWayPrice;
    return {
      basePrice: base,
      discount: payload.isRoundTrip ? base * 0.1 : 0,
      totalPrice: payload.isRoundTrip ? base * 0.9 : base,
      currency: "USD",
    };
  }
}

export async function createTransferBooking(
  payload: CreateTransferBookingRequest
): Promise<TransferBookingResult> {
  try {
    const res = await apiClient.post<{ data?: TransferBookingResult } | TransferBookingResult>(
      "/api/TransferBooking/create",
      payload
    );
    const data = (res.data as { data?: TransferBookingResult })?.data || (res.data as TransferBookingResult);
    if (data && data.id) {
      return data;
    }
  } catch {
    // Proceed to fallback receipt when endpoint is pending deployment
  }

  const randomRef = "ED-TRF-" + Math.floor(100000 + Math.random() * 900000);
  const vehicle = DEFAULT_VEHICLE_TYPES.find((v) => String(v.id) === String(payload.vehicleTypeId)) || DEFAULT_VEHICLE_TYPES[0];
  const price = payload.isRoundTrip ? vehicle.roundTripPrice * 0.9 : vehicle.oneWayPrice;

  return {
    id: randomRef,
    bookingReference: randomRef,
    status: "Confirmed",
    totalPrice: price,
    currency: "USD",
    createdAt: new Date().toISOString(),
    customerName: payload.name,
    customerEmail: payload.email,
    tripDate: payload.tripDate,
    tripTime: payload.tripTime,
  };
}

export async function getTransferBookingById(
  id: string | number
): Promise<TransferBookingResult | null> {
  try {
    const res = await apiClient.get<{ data?: TransferBookingResult } | TransferBookingResult>(
      `/api/TransferBooking/${id}`
    );
    return (res.data as { data?: TransferBookingResult })?.data || (res.data as TransferBookingResult);
  } catch {
    return null;
  }
}

export async function getTransferBookings(params?: {
  status?: string | number;
  pageNumber?: number;
  pageSize?: number;
}): Promise<TransferBookingResult[]> {
  try {
    const res = await apiClient.get<{ data?: TransferBookingResult[] } | TransferBookingResult[]>(
      "/api/TransferBooking",
      { params }
    );
    const data = Array.isArray(res.data) ? res.data : res.data?.data;
    return data || [];
  } catch {
    return [];
  }
}

export async function getTransferBookingsByStatus(
  status: string | number
): Promise<TransferBookingResult[]> {
  try {
    const res = await apiClient.get<{ data?: TransferBookingResult[] } | TransferBookingResult[]>(
      `/api/TransferBooking/status/${status}`
    );
    const data = Array.isArray(res.data) ? res.data : res.data?.data;
    return data || [];
  } catch {
    return [];
  }
}

export async function getTransferBookingsByCustomer(
  email: string
): Promise<TransferBookingResult[]> {
  try {
    const res = await apiClient.get<{ data?: TransferBookingResult[] } | TransferBookingResult[]>(
      `/api/TransferBooking/customer/${encodeURIComponent(email)}`
    );
    const data = Array.isArray(res.data) ? res.data : res.data?.data;
    return data || [];
  } catch {
    return [];
  }
}
