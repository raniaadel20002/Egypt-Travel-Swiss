import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/api";
import {
  CreateFlightBookingPayload,
  FlightBookingApiItem,
  FlightBookingsQueryParams,
  UpdateFlightBookingPayload,
} from "@/models/flightBooking";

const DEFAULT_LANGUAGE = "en";

function buildFlightQueryParams(
  params?: FlightBookingsQueryParams
): Record<string, unknown> {
  const query: Record<string, unknown> = {
    PageNumber: params?.PageNumber ?? 1,
    PageSize: params?.PageSize ?? 10,
    Language: params?.Language ?? DEFAULT_LANGUAGE,
  };

  if (params?.BookingType !== undefined) query.BookingType = params.BookingType;
  if (params?.TripType !== undefined) query.TripType = params.TripType;
  if (params?.FromCountryId !== undefined) query.FromCountryId = params.FromCountryId;
  if (params?.FromCityId !== undefined) query.FromCityId = params.FromCityId;
  if (params?.ToCountryId !== undefined) query.ToCountryId = params.ToCountryId;
  if (params?.ToCityId !== undefined) query.ToCityId = params.ToCityId;
  if (params?.DepartureDateFrom) query.DepartureDateFrom = params.DepartureDateFrom;
  if (params?.DepartureDateTo) query.DepartureDateTo = params.DepartureDateTo;
  if (params?.ReturnDateFrom) query.ReturnDateFrom = params.ReturnDateFrom;
  if (params?.ReturnDateTo) query.ReturnDateTo = params.ReturnDateTo;
  if (params?.MinPeople !== undefined) query.MinPeople = params.MinPeople;
  if (params?.MaxPeople !== undefined) query.MaxPeople = params.MaxPeople;

  return query;
}

export async function getFlightBookings(
  params?: FlightBookingsQueryParams
): Promise<FlightBookingApiItem[]> {
  const response = await apiClient.get<ApiResponse<FlightBookingApiItem[]>>(
    "/api/FlightBookings",
    {
      params: buildFlightQueryParams(params),
      headers: {
        "Accept-Language": params?.Language ?? DEFAULT_LANGUAGE,
      },
    }
  );
  return response.data?.data || [];
}

export async function getFlightBookingsCount(
  params?: FlightBookingsQueryParams
): Promise<number> {
  const response = await apiClient.get<ApiResponse<number | string>>(
    "/api/FlightBookings/count",
    {
      params: buildFlightQueryParams(params),
      headers: {
        "Accept-Language": params?.Language ?? DEFAULT_LANGUAGE,
      },
    }
  );
  const raw = response.data?.data;
  const parsed = Number(raw);
  return isNaN(parsed) ? 0 : parsed;
}

export async function getFlightBookingById(
  id: number,
  language: string = DEFAULT_LANGUAGE
): Promise<FlightBookingApiItem> {
  const response = await apiClient.get<ApiResponse<FlightBookingApiItem>>(
    `/api/FlightBookings/${id}`,
    {
      params: { language },
      headers: { "Accept-Language": language },
    }
  );
  return response.data.data;
}

export async function createFlightBooking(
  payload: CreateFlightBookingPayload
): Promise<FlightBookingApiItem> {
  const response = await apiClient.post<ApiResponse<FlightBookingApiItem>>(
    "/api/FlightBookings",
    payload
  );
  return response.data.data;
}

export async function updateFlightBooking(
  id: number,
  payload: UpdateFlightBookingPayload
): Promise<FlightBookingApiItem> {
  const response = await apiClient.put<ApiResponse<FlightBookingApiItem>>(
    `/api/FlightBookings/${id}`,
    payload
  );
  return response.data.data;
}

export async function deleteFlightBooking(id: number): Promise<void> {
  await apiClient.delete(`/api/FlightBookings/${id}`);
}
