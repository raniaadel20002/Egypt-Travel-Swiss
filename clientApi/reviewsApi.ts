import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/api";
import {
  CreateTripReviewDto,
  DUMMY_REVIEW_PHONE,
  TripReviewAverage,
  TripReviewItem,
  TripReviewsQueryParams,
} from "@/models/review";

export function isApiSuccess(res: unknown): boolean {
  if (!res || typeof res !== "object") return false;
  const obj = res as Record<string, unknown>;
  return obj.success === true || obj.Success === true;
}

export function extractApiMessage(res: unknown, fallback: string): string {
  if (!res || typeof res !== "object") return fallback;
  const obj = res as Record<string, unknown>;
  return (
    (typeof obj.message === "string" ? obj.message : null) ||
    (typeof obj.Message === "string" ? obj.Message : null) ||
    (typeof obj.title === "string" ? obj.title : null) ||
    (typeof obj.detail === "string" ? obj.detail : null) ||
    fallback
  );
}

export async function getTripReviews(
  params?: TripReviewsQueryParams
): Promise<ApiResponse<TripReviewItem[]>> {
  const queryParams: Record<string, unknown> = {
    PageNumber: params?.PageNumber ?? 1,
    PageSize: params?.PageSize ?? 20,
  };

  if (params?.TripId !== undefined && params.TripId !== null) {
    queryParams.TripId = params.TripId;
  }

  const response = await apiClient.get<ApiResponse<TripReviewItem[]>>(
    "/api/Reviews",
    { params: queryParams }
  );
  return response.data;
}

export async function getTripReviewById(
  id: number
): Promise<ApiResponse<TripReviewItem>> {
  const response = await apiClient.get<ApiResponse<TripReviewItem>>(
    `/api/Reviews/${id}`
  );
  return response.data;
}

export async function createTripReview(
  payload: CreateTripReviewDto
): Promise<ApiResponse<TripReviewItem>> {
  const requestBody = {
    ...payload,
    phone: payload.phone?.trim() || DUMMY_REVIEW_PHONE,
  };

  const response = await apiClient.post<ApiResponse<TripReviewItem>>(
    "/api/Reviews",
    requestBody
  );

  if (!isApiSuccess(response.data)) {
    throw new Error(
      extractApiMessage(response.data, "Failed to submit review.")
    );
  }
  return response.data;
}

export async function deleteTripReview(
  id: number
): Promise<ApiResponse<string>> {
  const response = await apiClient.delete<ApiResponse<string>>(
    `/api/Reviews/${id}`
  );

  if (!isApiSuccess(response.data)) {
    throw new Error(
      extractApiMessage(response.data, "Failed to delete review.")
    );
  }
  return response.data;
}

export async function getTripReviewAverage(
  tripId: number
): Promise<ApiResponse<TripReviewAverage>> {
  const response = await apiClient.get<ApiResponse<TripReviewAverage>>(
    `/api/Reviews/trip/${tripId}/average`
  );
  return response.data;
}
