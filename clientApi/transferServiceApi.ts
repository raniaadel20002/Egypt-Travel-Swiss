import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/api";
import { isApiSuccess, extractApiMessage } from "./transferLocationsApi";
import {
  CreateTransferVehiclePricePayload,
  CreateVehicleTypeTransferPayload,
  TransferServiceQueryParams,
  TransferVehiclePriceApiItem,
  UpdateTransferVehiclePricePayload,
  UpdateVehicleTypeTransferPayload,
  VehicleTypeTransferApiItem,
  VehicleTypeTransferMultiLangDetails,
} from "@/models/transferService";
import { TransferLocationLocalizedName } from "@/models/transferLocation";

const SUPPORTED_LANGS = ["en", "fr", "ru", "ro", "it"] as const;

export async function getVehicleTypeTransfers(
  params?: TransferServiceQueryParams
): Promise<ApiResponse<VehicleTypeTransferApiItem[]>> {
  const queryParams: Record<string, unknown> = {
    PageNumber: params?.PageNumber ?? 1,
    PageSize: params?.PageSize ?? 200,
  };

  const headers: Record<string, string> = {};
  if (params?.language) {
    headers["Accept-Language"] = params.language.toLowerCase();
  }

  const response = await apiClient.get<
    ApiResponse<VehicleTypeTransferApiItem[]>
  >("/api/VehicleTypeTransfer", {
    params: queryParams,
    headers: Object.keys(headers).length > 0 ? headers : undefined,
  });

  return response.data;
}

export async function getVehicleTypeTransferById(
  id: string,
  language?: string
): Promise<ApiResponse<VehicleTypeTransferApiItem>> {
  const headers: Record<string, string> = {};
  if (language) {
    headers["Accept-Language"] = language.toLowerCase();
  }

  const response = await apiClient.get<
    ApiResponse<VehicleTypeTransferApiItem>
  >(`/api/VehicleTypeTransfer/${id}`, {
    headers: Object.keys(headers).length > 0 ? headers : undefined,
  });

  return response.data;
}

export async function getVehicleTypeTransferAllLanguages(
  id: string
): Promise<VehicleTypeTransferMultiLangDetails> {
  const results = await Promise.allSettled(
    SUPPORTED_LANGS.map((lang) => getVehicleTypeTransferById(id, lang))
  );

  const langMap: Record<string, VehicleTypeTransferApiItem | null> = {};
  SUPPORTED_LANGS.forEach((lang, index) => {
    const res = results[index];
    langMap[lang] =
      res.status === "fulfilled" && isApiSuccess(res.value)
        ? res.value.data
        : null;
  });

  const base =
    langMap.en || langMap.fr || langMap.ru || langMap.ro || langMap.it;
  if (!base) {
    throw new Error("Failed to load vehicle type translations from server.");
  }

  const name: TransferLocationLocalizedName = {
    en: langMap.en?.name || base.name || "",
    fr: langMap.fr?.name || "",
    ru: langMap.ru?.name || "",
    ro: langMap.ro?.name || "",
    it: langMap.it?.name || "",
  };

  return {
    id: base.id,
    name,
    fromPerson: base.fromPerson,
    toPerson: base.toPerson,
    additionalHoursUsd: base.additionalHoursUsd,
    discountPercentage: base.discountPercentage,
  };
}

export async function createVehicleTypeTransfer(
  payload: CreateVehicleTypeTransferPayload
): Promise<ApiResponse<VehicleTypeTransferApiItem>> {
  const response = await apiClient.post<
    ApiResponse<VehicleTypeTransferApiItem>
  >("/api/VehicleTypeTransfer", payload);

  if (!isApiSuccess(response.data)) {
    throw new Error(
      extractApiMessage(response.data, "Failed to create vehicle type transfer.")
    );
  }
  return response.data;
}

export async function updateVehicleTypeTransfer(
  payload: UpdateVehicleTypeTransferPayload
): Promise<ApiResponse<VehicleTypeTransferApiItem>> {
  const response = await apiClient.put<
    ApiResponse<VehicleTypeTransferApiItem>
  >("/api/VehicleTypeTransfer", payload);

  if (!isApiSuccess(response.data)) {
    throw new Error(
      extractApiMessage(response.data, "Failed to update vehicle type transfer.")
    );
  }
  return response.data;
}

export async function deleteVehicleTypeTransfer(
  id: string
): Promise<ApiResponse<string>> {
  const response = await apiClient.delete<ApiResponse<string>>(
    `/api/VehicleTypeTransfer/${id}`
  );

  if (!isApiSuccess(response.data)) {
    throw new Error(
      extractApiMessage(response.data, "Failed to delete vehicle type transfer.")
    );
  }
  return response.data;
}

export async function matchVehicleTypeTransfer(
  persons: number,
  language?: string
): Promise<ApiResponse<VehicleTypeTransferApiItem>> {
  const headers: Record<string, string> = {};
  if (language) {
    headers["Accept-Language"] = language.toLowerCase();
  }

  const response = await apiClient.get<
    ApiResponse<VehicleTypeTransferApiItem>
  >(`/api/VehicleTypeTransfer/match/${persons}`, {
    headers: Object.keys(headers).length > 0 ? headers : undefined,
  });

  return response.data;
}

export async function getTransferVehiclePrices(
  params?: TransferServiceQueryParams
): Promise<ApiResponse<TransferVehiclePriceApiItem[]>> {
  const queryParams: Record<string, unknown> = {
    PageNumber: params?.PageNumber ?? 1,
    PageSize: params?.PageSize ?? 200,
  };

  const headers: Record<string, string> = {};
  if (params?.language) {
    headers["Accept-Language"] = params.language.toLowerCase();
  }

  const response = await apiClient.get<
    ApiResponse<TransferVehiclePriceApiItem[]>
  >("/api/TransferVehiclePrice", {
    params: queryParams,
    headers: Object.keys(headers).length > 0 ? headers : undefined,
  });

  return response.data;
}

export async function getTransferVehiclePriceById(
  id: string,
  language?: string
): Promise<ApiResponse<TransferVehiclePriceApiItem>> {
  const headers: Record<string, string> = {};
  if (language) {
    headers["Accept-Language"] = language.toLowerCase();
  }

  const response = await apiClient.get<
    ApiResponse<TransferVehiclePriceApiItem>
  >(`/api/TransferVehiclePrice/${id}`, {
    headers: Object.keys(headers).length > 0 ? headers : undefined,
  });

  return response.data;
}

export async function createTransferVehiclePrice(
  payload: CreateTransferVehiclePricePayload
): Promise<ApiResponse<TransferVehiclePriceApiItem>> {
  const response = await apiClient.post<
    ApiResponse<TransferVehiclePriceApiItem>
  >("/api/TransferVehiclePrice", payload);

  if (!isApiSuccess(response.data)) {
    throw new Error(
      extractApiMessage(response.data, "Failed to create transfer vehicle price.")
    );
  }
  return response.data;
}

export async function updateTransferVehiclePrice(
  payload: UpdateTransferVehiclePricePayload
): Promise<ApiResponse<TransferVehiclePriceApiItem>> {
  const response = await apiClient.put<
    ApiResponse<TransferVehiclePriceApiItem>
  >("/api/TransferVehiclePrice", payload);

  if (!isApiSuccess(response.data)) {
    throw new Error(
      extractApiMessage(response.data, "Failed to update transfer vehicle price.")
    );
  }
  return response.data;
}

export async function deleteTransferVehiclePrice(
  id: string
): Promise<ApiResponse<string>> {
  const response = await apiClient.delete<ApiResponse<string>>(
    `/api/TransferVehiclePrice/${id}`
  );

  if (!isApiSuccess(response.data)) {
    throw new Error(
      extractApiMessage(response.data, "Failed to delete transfer vehicle price.")
    );
  }
  return response.data;
}
