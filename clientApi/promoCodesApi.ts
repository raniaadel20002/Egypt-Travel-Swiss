import { apiClient, ApiResponse } from "./apiConfig";
import {
  CreatePromoCodePayload,
  CreatePromoCodeResult,
  PromoCodeItem,
  PromoCodesQueryParams,
} from "@/models/promoCode";

const DEFAULT_PAGE_SIZE = 50;

export async function getPromoCodes(
  params?: PromoCodesQueryParams
): Promise<PromoCodeItem[]> {
  const pageNumber = params?.PageNumber ?? 1;
  const pageSize = params?.PageSize ?? DEFAULT_PAGE_SIZE;

  const response = await apiClient.get<ApiResponse<PromoCodeItem[]>>(
    "/api/PromoCodes",
    {
      params: {
        PageNumber: pageNumber,
        PageSize: pageSize,
      },
    }
  );
  return response.data?.data || [];
}

export async function getNonRelatedTripPromoCodes(
  params?: PromoCodesQueryParams
): Promise<PromoCodeItem[]> {
  const pageNumber = params?.PageNumber ?? 1;
  const pageSize = params?.PageSize ?? DEFAULT_PAGE_SIZE;

  const response = await apiClient.get<ApiResponse<PromoCodeItem[]>>(
    "/api/PromoCodes/nonrelatedtrip",
    {
      params: {
        PageNumber: pageNumber,
        PageSize: pageSize,
      },
    }
  );
  return response.data?.data || [];
}

export async function getRelatedTripPromoCodes(
  params?: PromoCodesQueryParams
): Promise<PromoCodeItem[]> {
  const pageNumber = params?.PageNumber ?? 1;
  const pageSize = params?.PageSize ?? DEFAULT_PAGE_SIZE;

  const response = await apiClient.get<ApiResponse<PromoCodeItem[]>>(
    "/api/PromoCodes/relatedtrip",
    {
      params: {
        PageNumber: pageNumber,
        PageSize: pageSize,
      },
    }
  );
  return response.data?.data || [];
}

export async function getPromoCodeById(id: number): Promise<PromoCodeItem> {
  const response = await apiClient.get<ApiResponse<PromoCodeItem>>(
    `/api/PromoCodes/${id}`
  );
  return response.data.data;
}

export async function getPromoCodeByCode(
  code: number | string
): Promise<PromoCodeItem> {
  const response = await apiClient.get<ApiResponse<PromoCodeItem>>(
    `/api/PromoCodes/code/${code}`
  );
  return response.data.data;
}

export async function createPromoCode(
  payload: CreatePromoCodePayload
): Promise<CreatePromoCodeResult> {
  const response = await apiClient.post<ApiResponse<CreatePromoCodeResult>>(
    "/api/PromoCodes",
    payload
  );
  return response.data.data;
}
