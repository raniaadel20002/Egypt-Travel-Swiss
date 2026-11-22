import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/api";
import {
  CompleteTransferBookingPayload,
  CreateTransferBookingPayload,
  TransferBookingApiItem,
  TransferBookingStatusEnum,
  TransferMatchPayload,
  TransferMatchResult,
  TransferPreviewPayload,
  TransferPreviewResult,
  UpdateTransferBookingStatusPayload,
} from "@/models/transferBooking";

const DEFAULT_CURRENCY = "EUR";
const DEFAULT_LANGUAGE = "en";

export async function matchTransferVehicle(
  payload: TransferMatchPayload,
  language = DEFAULT_LANGUAGE
): Promise<TransferMatchResult> {
  const response = await apiClient.post<ApiResponse<TransferMatchResult>>(
    "/api/Transfer/match",
    payload,
    {
      params: { currency: DEFAULT_CURRENCY },
      headers: { "Accept-Language": language },
    }
  );
  return response.data.data;
}

export async function previewTransferPrice(
  payload: TransferPreviewPayload,
  language = DEFAULT_LANGUAGE
): Promise<TransferPreviewResult> {
  const response = await apiClient.post<ApiResponse<TransferPreviewResult>>(
    "/api/Transfer/preview",
    payload,
    {
      params: { currency: DEFAULT_CURRENCY },
      headers: { "Accept-Language": language },
    }
  );
  return response.data.data;
}

export async function createTransferBookingRecord(
  payload: CreateTransferBookingPayload,
  language = DEFAULT_LANGUAGE
): Promise<TransferBookingApiItem> {
  const response = await apiClient.post<ApiResponse<TransferBookingApiItem>>(
    "/api/TransferBooking/create",
    payload,
    {
      params: { currency: DEFAULT_CURRENCY },
      headers: { "Accept-Language": language },
    }
  );
  return response.data.data;
}

export async function completeTransferBooking(
  bookingId: string,
  payload: CompleteTransferBookingPayload
): Promise<TransferBookingApiItem> {
  const response = await apiClient.post<ApiResponse<TransferBookingApiItem>>(
    `/api/TransferBooking/${bookingId}/complete`,
    payload,
    {
      headers: { "Accept-Language": DEFAULT_LANGUAGE },
    }
  );
  return response.data.data;
}

export async function getTransferBookingsList(params?: {
  pageNumber?: number;
  pageSize?: number;
}): Promise<TransferBookingApiItem[]> {
  const response = await apiClient.get<ApiResponse<TransferBookingApiItem[]>>(
    "/api/TransferBooking",
    {
      params: {
        pageNumber: params?.pageNumber ?? 1,
        pageSize: params?.pageSize ?? 10,
      },
      headers: { "Accept-Language": DEFAULT_LANGUAGE },
    }
  );
  return response.data.data || [];
}

export async function getTransferBookingDetail(
  id: string
): Promise<TransferBookingApiItem> {
  const response = await apiClient.get<ApiResponse<TransferBookingApiItem>>(
    `/api/TransferBooking/${id}`,
    {
      headers: { "Accept-Language": DEFAULT_LANGUAGE },
    }
  );
  return response.data.data;
}

export async function getTransferBookingsByStatusList(
  status: TransferBookingStatusEnum,
  params?: { pageNumber?: number; pageSize?: number }
): Promise<TransferBookingApiItem[]> {
  const response = await apiClient.get<ApiResponse<TransferBookingApiItem[]>>(
    `/api/TransferBooking/status/${status}`,
    {
      params: {
        pageNumber: params?.pageNumber ?? 1,
        pageSize: params?.pageSize ?? 10,
      },
      headers: { "Accept-Language": DEFAULT_LANGUAGE },
    }
  );
  return response.data.data || [];
}

export async function getTransferBookingsByCustomerEmail(
  email: string,
  params?: { pageNumber?: number; pageSize?: number }
): Promise<TransferBookingApiItem[]> {
  const response = await apiClient.get<ApiResponse<TransferBookingApiItem[]>>(
    `/api/TransferBooking/customer/${encodeURIComponent(email)}`,
    {
      params: {
        pageNumber: params?.pageNumber ?? 1,
        pageSize: params?.pageSize ?? 10,
      },
      headers: { "Accept-Language": DEFAULT_LANGUAGE },
    }
  );
  return response.data.data || [];
}

export async function updateTransferBookingStatus(
  payload: UpdateTransferBookingStatusPayload
): Promise<void> {
  await apiClient.patch("/api/TransferBooking/status", payload);
}
