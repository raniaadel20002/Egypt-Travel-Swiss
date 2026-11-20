import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/api";
import { BackendLanguageCode, TRIP_TYPE_LANGUAGES } from "@/models/tripType";
import {
  CreatePrivateVehiclePayload,
  CreatePrivateVehicleTransferPayload,
  PrivateVehicleApiItem,
  PrivateVehicleLocalizedName,
  PrivateVehicleMultiLangDetails,
  PrivateVehiclesQueryParams,
  PrivateVehicleTransferApiItem,
  PrivateVehicleTransferMatchItem,
  PrivateVehicleTransfersQueryParams,
  UpdatePrivateVehiclePayload,
  UpdatePrivateVehicleTransferPayload,
} from "@/models/privateVehicle";

const DEFAULT_PAGE_SIZE = 50;

export async function getPrivateVehicles(
  params?: PrivateVehiclesQueryParams
): Promise<PrivateVehicleApiItem[]> {
  const language = params?.language || "EN";
  const queryParams: Record<string, string | number> = {
    PageNumber: params?.PageNumber ?? 1,
    PageSize: params?.PageSize ?? DEFAULT_PAGE_SIZE,
  };
  if (params?.searchTerm && params.searchTerm.trim() !== "") {
    queryParams.searchTerm = params.searchTerm.trim();
  }

  const response = await apiClient.get<ApiResponse<PrivateVehicleApiItem[]>>(
    "/api/PrivateVehicles",
    {
      params: queryParams,
      headers: {
        "Accept-Language": language,
      },
    }
  );
  return response.data?.data || [];
}

export async function getPrivateVehicleById(
  id: number,
  language: BackendLanguageCode = "EN"
): Promise<PrivateVehicleApiItem> {
  const response = await apiClient.get<ApiResponse<PrivateVehicleApiItem>>(
    `/api/PrivateVehicles/${id}`,
    {
      headers: {
        "Accept-Language": language,
      },
    }
  );
  return response.data?.data;
}

export async function getPrivateVehicleAllLanguages(
  id: number
): Promise<PrivateVehicleMultiLangDetails> {
  const results = await Promise.all(
    TRIP_TYPE_LANGUAGES.map(async (lang) => {
      try {
        const item = await getPrivateVehicleById(id, lang.code);
        return {
          langKey: lang.code.toLowerCase() as keyof PrivateVehicleLocalizedName,
          data: item,
        };
      } catch {
        return {
          langKey: lang.code.toLowerCase() as keyof PrivateVehicleLocalizedName,
          data: null,
        };
      }
    })
  );

  const nameTranslations: PrivateVehicleLocalizedName = {
    en: results.find((r) => r.langKey === "en")?.data?.name || "",
    fr: results.find((r) => r.langKey === "fr")?.data?.name || "",
    ru: results.find((r) => r.langKey === "ru")?.data?.name || "",
    ro: results.find((r) => r.langKey === "ro")?.data?.name || "",
    it: results.find((r) => r.langKey === "it")?.data?.name || "",
  };

  return {
    id,
    name: nameTranslations,
  };
}

export async function createPrivateVehicle(
  payload: CreatePrivateVehiclePayload
): Promise<PrivateVehicleApiItem> {
  const response = await apiClient.post<ApiResponse<PrivateVehicleApiItem>>(
    "/api/PrivateVehicles",
    payload
  );
  return response.data?.data;
}

export async function updatePrivateVehicle(
  payload: UpdatePrivateVehiclePayload
): Promise<PrivateVehicleApiItem> {
  const response = await apiClient.put<ApiResponse<PrivateVehicleApiItem>>(
    "/api/PrivateVehicles",
    payload
  );
  return response.data?.data;
}

export async function deletePrivateVehicle(id: number): Promise<void> {
  await apiClient.delete<ApiResponse<string>>(`/api/PrivateVehicles/${id}`);
}

export async function getPrivateVehicleTransfers(
  params?: PrivateVehicleTransfersQueryParams
): Promise<PrivateVehicleTransferApiItem[]> {
  const language = params?.language || "EN";
  const queryParams: Record<string, string | number> = {
    PageNumber: params?.PageNumber ?? 1,
    PageSize: params?.PageSize ?? DEFAULT_PAGE_SIZE,
  };
  if (params?.tripId) queryParams.tripId = params.tripId;
  if (params?.vehicleId) queryParams.vehicleId = params.vehicleId;

  const response = await apiClient.get<
    ApiResponse<PrivateVehicleTransferApiItem[]>
  >("/api/PrivateVehicleTransfers", {
    params: queryParams,
    headers: {
      "Accept-Language": language,
    },
  });
  return response.data?.data || [];
}

export async function getPrivateVehicleTransferById(
  id: number,
  language: BackendLanguageCode = "EN"
): Promise<PrivateVehicleTransferApiItem> {
  const response = await apiClient.get<
    ApiResponse<PrivateVehicleTransferApiItem>
  >(`/api/PrivateVehicleTransfers/${id}`, {
    headers: {
      "Accept-Language": language,
    },
  });
  return response.data?.data;
}

export async function createPrivateVehicleTransfer(
  payload: CreatePrivateVehicleTransferPayload
): Promise<PrivateVehicleTransferApiItem> {
  const response = await apiClient.post<
    ApiResponse<PrivateVehicleTransferApiItem>
  >("/api/PrivateVehicleTransfers", payload);
  return response.data?.data;
}

export async function updatePrivateVehicleTransfer(
  payload: UpdatePrivateVehicleTransferPayload
): Promise<PrivateVehicleTransferApiItem> {
  const response = await apiClient.put<
    ApiResponse<PrivateVehicleTransferApiItem>
  >("/api/PrivateVehicleTransfers", payload);
  return response.data?.data;
}

export async function deletePrivateVehicleTransfer(id: number): Promise<void> {
  await apiClient.delete<ApiResponse<string>>(
    `/api/PrivateVehicleTransfers/${id}`
  );
}

export async function matchPrivateVehicleTransfers(
  tripId: number,
  persons: number,
  language: BackendLanguageCode = "EN"
): Promise<PrivateVehicleTransferMatchItem[]> {
  const response = await apiClient.get<
    ApiResponse<PrivateVehicleTransferMatchItem[]>
  >("/api/PrivateVehicleTransfers/match", {
    params: { tripId, persons },
    headers: {
      "Accept-Language": language,
    },
  });
  return response.data?.data || [];
}
