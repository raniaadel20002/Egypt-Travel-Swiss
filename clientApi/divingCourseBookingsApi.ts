import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/api";
import {
  CreateDivingCourseBookingPayload,
  CreateDivingCourseBookingResponseData,
  DivingCourseBookingApiItem,
  DivingCourseBookingsQueryParams,
  PaginatedDivingCourseBookingsData,
} from "@/models/divingCourseBooking";

export async function createDivingCourseBooking(
  payload: CreateDivingCourseBookingPayload
): Promise<CreateDivingCourseBookingResponseData> {
  const response = await apiClient.post<
    ApiResponse<CreateDivingCourseBookingResponseData>
  >("/api/DivingCourseBookings", payload);
  return response.data.data;
}

export async function getDivingCourseBookings(
  params?: DivingCourseBookingsQueryParams
): Promise<PaginatedDivingCourseBookingsData> {
  const queryParams: Record<string, unknown> = {};
  if (params?.pageNumber) queryParams.pageNumber = params.pageNumber;
  if (params?.pageSize) queryParams.pageSize = params.pageSize;

  const response = await apiClient.get<
    ApiResponse<PaginatedDivingCourseBookingsData>
  >("/api/DivingCourseBookings", {
    params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
  });

  return (
    response.data?.data || {
      data: [],
      pageNumber: params?.pageNumber || 1,
      pageSize: params?.pageSize || 10,
      totalCount: 0,
    }
  );
}

export async function getDivingCourseBookingById(
  bookingId: string
): Promise<DivingCourseBookingApiItem> {
  const response = await apiClient.get<ApiResponse<DivingCourseBookingApiItem>>(
    `/api/DivingCourseBookings/${bookingId}`
  );
  return response.data.data;
}

export async function getMyDivingCourseBookings(
  params?: DivingCourseBookingsQueryParams
): Promise<PaginatedDivingCourseBookingsData> {
  const queryParams: Record<string, unknown> = {};
  if (params?.pageNumber) queryParams.pageNumber = params.pageNumber;
  if (params?.pageSize) queryParams.pageSize = params.pageSize;

  const response = await apiClient.get<
    ApiResponse<PaginatedDivingCourseBookingsData>
  >("/api/DivingCourseBookings/my-bookings", {
    params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
  });

  return (
    response.data?.data || {
      data: [],
      pageNumber: params?.pageNumber || 1,
      pageSize: params?.pageSize || 10,
      totalCount: 0,
    }
  );
}
