import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/api";
import {
  CreateHotelBookingPayload,
  HotelBookingApiItem,
  HotelBookingsQueryParams,
  UpdateHotelBookingStatusPayload,
} from "@/models/hotelBooking";

export async function getHotelBookings(
  params?: HotelBookingsQueryParams
): Promise<HotelBookingApiItem[]> {
  const queryParams: Record<string, unknown> = {};
  if (params?.PageNumber) queryParams.PageNumber = params.PageNumber;
  if (params?.PageSize) queryParams.PageSize = params.PageSize;
  if (params?.HotelId) queryParams.HotelId = params.HotelId;
  if (params?.Status !== undefined) queryParams.Status = params.Status;
  if (params?.Nationality) queryParams.Nationality = params.Nationality;
  if (params?.CreatedFrom) queryParams.CreatedFrom = params.CreatedFrom;
  if (params?.CreatedTo) queryParams.CreatedTo = params.CreatedTo;
  if (params?.Language) queryParams.Language = params.Language;

  const response = await apiClient.get<ApiResponse<HotelBookingApiItem[]>>(
    "/api/HotelBookings",
    {
      params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
    }
  );

  return response.data?.data || [];
}

export async function getHotelBookingById(
  id: number,
  language = "en"
): Promise<HotelBookingApiItem> {
  const response = await apiClient.get<ApiResponse<HotelBookingApiItem>>(
    `/api/HotelBookings/${id}`,
    {
      params: { language },
    }
  );
  return response.data.data;
}

export async function createHotelBooking(
  payload: CreateHotelBookingPayload
): Promise<HotelBookingApiItem> {
  const response = await apiClient.post<ApiResponse<HotelBookingApiItem>>(
    "/api/HotelBookings",
    payload
  );
  return response.data.data;
}

export async function updateHotelBookingStatus(
  payload: UpdateHotelBookingStatusPayload
): Promise<HotelBookingApiItem> {
  const response = await apiClient.put<ApiResponse<HotelBookingApiItem>>(
    `/api/HotelBookings/${payload.id}/status`,
    payload
  );
  return response.data.data;
}

export async function deleteHotelBooking(id: number): Promise<string> {
  const response = await apiClient.delete<ApiResponse<string>>(
    `/api/HotelBookings/${id}`
  );
  return response.data.data;
}
