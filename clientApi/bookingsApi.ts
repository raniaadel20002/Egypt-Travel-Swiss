import { apiClient, ApiResponse } from "./apiConfig";
import {
  BookingApiItem,
  BookingsQueryParams,
  CreateBookingPayload,
} from "@/models/booking";

const DEFAULT_PAGE_SIZE = 50;

export async function getBookings(
  params?: BookingsQueryParams
): Promise<BookingApiItem[]> {
  const queryParams: Record<string, string | number> = {
    PageNumber: params?.PageNumber ?? 1,
    PageSize: params?.PageSize ?? DEFAULT_PAGE_SIZE,
  };

  if (params?.Nationality && params.Nationality.trim() !== "") {
    queryParams.Nationality = params.Nationality.trim();
  }
  if (params?.SearchItem && params.SearchItem.trim() !== "") {
    queryParams.SearchItem = params.SearchItem.trim();
  }
  if (params?.Phone && params.Phone.trim() !== "") {
    queryParams.Phone = params.Phone.trim();
  }
  if (params?.Date && params.Date.trim() !== "") {
    queryParams.Date = params.Date.trim();
  }
  if (params?.Status !== undefined) {
    queryParams.Status = params.Status;
  }
  if (params?.TripId !== undefined) {
    queryParams.TripId = params.TripId;
  }

  const response = await apiClient.get<ApiResponse<BookingApiItem[]>>(
    "/api/Bookings",
    { params: queryParams }
  );

  return response.data?.data || [];
}

export async function getBookingById(id: number): Promise<BookingApiItem> {
  const response = await apiClient.get<ApiResponse<BookingApiItem>>(
    `/api/Bookings/${id}`
  );
  return response.data?.data;
}

export async function createBooking(
  payload: CreateBookingPayload
): Promise<BookingApiItem> {
  const response = await apiClient.post<ApiResponse<BookingApiItem>>(
    "/api/Bookings",
    payload
  );
  return response.data?.data;
}

export async function confirmBooking(id: number): Promise<BookingApiItem> {
  const response = await apiClient.put<ApiResponse<BookingApiItem>>(
    "/api/Bookings/confirm",
    null,
    { params: { id } }
  );
  return response.data?.data;
}

export async function finishBooking(id: number): Promise<BookingApiItem> {
  const response = await apiClient.put<ApiResponse<BookingApiItem>>(
    "/api/Bookings/finish",
    null,
    { params: { id } }
  );
  return response.data?.data;
}

export async function deleteBooking(id: number): Promise<string> {
  const response = await apiClient.delete<ApiResponse<string>>(
    `/api/Bookings/${id}`
  );
  return response.data?.data || "";
}
