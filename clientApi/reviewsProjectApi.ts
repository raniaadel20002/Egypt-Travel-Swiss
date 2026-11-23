import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/api";
import {
  ReviewProjectItem,
  CreateReviewProjectDto,
  ReviewsProjectQueryParams,
  DUMMY_PROJECT_REVIEW_PHONE,
} from "@/models/reviewsProject";

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

export async function getReviewsProject(
  params?: ReviewsProjectQueryParams
): Promise<ApiResponse<ReviewProjectItem[]>> {
  const queryParams = {
    pageNumber: params?.pageNumber ?? 1,
    pageSize: params?.pageSize ?? 20,
  };

  const response = await apiClient.get<ApiResponse<ReviewProjectItem[]>>(
    "/api/ReviewsProject",
    { params: queryParams }
  );
  return response.data;
}

export async function getReviewProjectById(
  id: number
): Promise<ApiResponse<ReviewProjectItem>> {
  const response = await apiClient.get<ApiResponse<ReviewProjectItem>>(
    `/api/ReviewsProject/${id}`
  );
  return response.data;
}

export async function createReviewProject(
  payload: CreateReviewProjectDto
): Promise<ApiResponse<ReviewProjectItem>> {
  const requestBody = {
    ...payload,
    phone: payload.phone?.trim() || DUMMY_PROJECT_REVIEW_PHONE,
  };

  const response = await apiClient.post<ApiResponse<ReviewProjectItem>>(
    "/api/ReviewsProject",
    requestBody
  );
  if (!isApiSuccess(response.data)) {
    throw new Error(
      extractApiMessage(response.data, "Failed to submit review.")
    );
  }
  return response.data;
}

export async function deleteReviewProject(
  id: number
): Promise<ApiResponse<string>> {
  const response = await apiClient.delete<ApiResponse<string>>(
    `/api/ReviewsProject/${id}`
  );
  if (!isApiSuccess(response.data)) {
    throw new Error(
      extractApiMessage(response.data, "Failed to delete review.")
    );
  }
  return response.data;
}
