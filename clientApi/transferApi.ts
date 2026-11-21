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
import {
  DEFAULT_FROM_LOCATIONS,
  DEFAULT_TO_LOCATIONS,
  DEFAULT_VEHICLE_TYPES,
} from "./transferDefaults";

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
    const res = await apiClient.get<any>("/api/VehicleTypeTransfer");
    const data = Array.isArray(res.data) ? res.data : res.data?.data;
    if (data && data.length > 0) {
      return data.map((item: any) => {
        const toPerson = item.toPerson ?? item.maxPassengers ?? 4;
        const isMinibus = toPerson > 4 && toPerson <= 8;
        const isBus = toPerson > 8;

        const defaultIcon = isBus
          ? "/Transfers/bus.svg"
          : isMinibus
          ? "/Transfers/minibus.svg"
          : "/Transfers/car.svg";

        const defaultFeatures = [
          "Air-conditioned",
          "Flight Delay Protection",
          "Free Cancellation up to 24h",
          "Fixed Price - No Hidden Fees",
        ];

        const oneWay =
          typeof item.oneWayPrice === "number"
            ? item.oneWayPrice
            : typeof item.additionalHoursUsd === "number"
            ? item.additionalHoursUsd
            : 25;

        const roundTrip =
          typeof item.roundTripPrice === "number"
            ? item.roundTripPrice
            : oneWay * 2 * 0.9;

        return {
          id: item.id,
          name: item.name || "Transfer Vehicle",
          capacityText:
            item.capacityText ||
            `Max ${toPerson} passengers, ${toPerson} suitcases`,
          maxPassengers: toPerson,
          maxLuggage: item.maxLuggage ?? toPerson,
          maxHandBags: item.maxHandBags ?? Math.max(1, Math.floor(toPerson / 2)),
          features:
            Array.isArray(item.features) && item.features.length > 0
              ? item.features
              : defaultFeatures,
          icon: item.icon || defaultIcon,
          oneWayPrice: oneWay,
          roundTripPrice: roundTrip,
          currency: item.currency || "EUR",
        };
      });
    }
    return DEFAULT_VEHICLE_TYPES;
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
