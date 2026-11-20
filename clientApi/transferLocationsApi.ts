import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/api";
import {
  CreateTransferLocationPayload,
  TransferLocationItem,
  TransferLocationsQueryParams,
  TransferLocationType,
  UpdateTransferLocationPayload,
} from "@/models/transferLocation";

function getEndpoint(type: TransferLocationType): string {
  return type === "from"
    ? "/api/TransferFromLocations"
    : "/api/TransferToLocations";
}

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

export async function getTransferLocations(
  type: TransferLocationType,
  params?: TransferLocationsQueryParams
): Promise<ApiResponse<TransferLocationItem[]>> {
  const endpoint = getEndpoint(type);
  const queryParams: Record<string, unknown> = {
    PageNumber: params?.PageNumber ?? 1,
    PageSize: params?.PageSize ?? 50,
  };

  const headers: Record<string, string> = {};
  if (params?.language) {
    headers["Accept-Language"] = params.language.toLowerCase();
  }

  const response = await apiClient.get<ApiResponse<TransferLocationItem[]>>(
    endpoint,
    {
      params: queryParams,
      headers: Object.keys(headers).length > 0 ? headers : undefined,
    }
  );
  return response.data;
}

export async function getTransferLocationById(
  type: TransferLocationType,
  id: string,
  language?: string
): Promise<ApiResponse<TransferLocationItem>> {
  const endpoint = `${getEndpoint(type)}/${id}`;
  const headers: Record<string, string> = {};
  if (language) {
    headers["Accept-Language"] = language.toLowerCase();
  }

  const response = await apiClient.get<ApiResponse<TransferLocationItem>>(
    endpoint,
    {
      headers: Object.keys(headers).length > 0 ? headers : undefined,
    }
  );
  return response.data;
}

export async function createTransferLocation(
  type: TransferLocationType,
  payload: CreateTransferLocationPayload
): Promise<ApiResponse<TransferLocationItem>> {
  const endpoint = getEndpoint(type);
  const response = await apiClient.post<ApiResponse<TransferLocationItem>>(
    endpoint,
    payload
  );

  if (!isApiSuccess(response.data)) {
    throw new Error(
      extractApiMessage(response.data, "Failed to create transfer location.")
    );
  }
  return response.data;
}

export async function updateTransferLocation(
  type: TransferLocationType,
  payload: UpdateTransferLocationPayload
): Promise<ApiResponse<TransferLocationItem>> {
  const endpoint = getEndpoint(type);
  const response = await apiClient.put<ApiResponse<TransferLocationItem>>(
    endpoint,
    payload
  );

  if (!isApiSuccess(response.data)) {
    throw new Error(
      extractApiMessage(response.data, "Failed to update transfer location.")
    );
  }
  return response.data;
}

export async function deleteTransferLocation(
  type: TransferLocationType,
  id: string
): Promise<ApiResponse<string>> {
  const endpoint = `${getEndpoint(type)}/${id}`;
  const response = await apiClient.delete<ApiResponse<string>>(endpoint);

  if (!isApiSuccess(response.data)) {
    throw new Error(
      extractApiMessage(response.data, "Failed to delete transfer location.")
    );
  }
  return response.data;
}
