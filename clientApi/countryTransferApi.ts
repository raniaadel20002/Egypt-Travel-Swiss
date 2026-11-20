import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/api";
import { BackendLanguageCode, TRIP_TYPE_LANGUAGES } from "@/models/tripType";
import {
  CountryTransferItem,
  CountryTransferLocalizedName,
  CountryTransferMultiLangDetails,
  CountryTransfersQueryParams,
  CreateCountryTransferPayload,
  UpdateCountryTransferPayload,
} from "@/models/countryTransfer";

const DEFAULT_PAGE_SIZE = 50;

export async function getCountryTransfers(
  params?: CountryTransfersQueryParams
): Promise<CountryTransferItem[]> {
  const language = params?.language || "EN";
  const queryParams: Record<string, string | number> = {
    PageNumber: params?.PageNumber ?? 1,
    PageSize: params?.PageSize ?? DEFAULT_PAGE_SIZE,
  };
  if (params?.searchTerm && params.searchTerm.trim() !== "") {
    queryParams.searchTerm = params.searchTerm.trim();
  }

  const response = await apiClient.get<ApiResponse<CountryTransferItem[]>>(
    "/api/CountryTransfer",
    {
      params: queryParams,
      headers: {
        "Accept-Language": language,
      },
    }
  );
  return response.data?.data || [];
}

export async function getCountryTransferById(
  id: number,
  language: BackendLanguageCode | "en" | "fr" | "ru" | "ro" | "it" = "EN"
): Promise<CountryTransferItem> {
  const response = await apiClient.get<ApiResponse<CountryTransferItem>>(
    `/api/CountryTransfer/${id}`,
    {
      headers: {
        "Accept-Language": language,
      },
    }
  );
  return response.data?.data;
}

export async function getCountryTransferAllLanguages(
  id: number
): Promise<CountryTransferMultiLangDetails> {
  const results = await Promise.all(
    TRIP_TYPE_LANGUAGES.map(async (lang) => {
      try {
        const item = await getCountryTransferById(id, lang.code);
        return {
          langKey: lang.code.toLowerCase() as keyof CountryTransferLocalizedName,
          data: item,
        };
      } catch {
        return {
          langKey: lang.code.toLowerCase() as keyof CountryTransferLocalizedName,
          data: null,
        };
      }
    })
  );

  const baseItem = results.find((r) => r.data !== null)?.data;

  const nameTranslations: CountryTransferLocalizedName = {
    en: results.find((r) => r.langKey === "en")?.data?.name || "",
    fr: results.find((r) => r.langKey === "fr")?.data?.name || "",
    ru: results.find((r) => r.langKey === "ru")?.data?.name || "",
    ro: results.find((r) => r.langKey === "ro")?.data?.name || "",
    it: results.find((r) => r.langKey === "it")?.data?.name || "",
  };

  return {
    id,
    name: nameTranslations,
    code: baseItem?.code || "",
    createdAt: baseItem?.createdAt || new Date().toISOString(),
  };
}

export async function createCountryTransfer(
  payload: CreateCountryTransferPayload
): Promise<CountryTransferItem> {
  const response = await apiClient.post<ApiResponse<CountryTransferItem>>(
    "/api/CountryTransfer",
    payload
  );
  return response.data?.data;
}

export async function updateCountryTransfer(
  payload: UpdateCountryTransferPayload
): Promise<CountryTransferItem> {
  const response = await apiClient.put<ApiResponse<CountryTransferItem>>(
    "/api/CountryTransfer",
    payload
  );
  return response.data?.data;
}

export async function deleteCountryTransfer(id: number): Promise<void> {
  await apiClient.delete<ApiResponse<string>>(`/api/CountryTransfer/${id}`);
}
