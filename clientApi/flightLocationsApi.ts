import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/api";
import {
  CitiesQueryParams,
  CityApiItem,
  CountriesQueryParams,
  CountryApiItem,
  CreateCityPayload,
  CreateCountryPayload,
  LocalizedLocationName,
  UpdateCityPayload,
  UpdateCountryPayload,
} from "@/models/flightLocation";

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

/* =========================================================
   COUNTRIES API
   ========================================================= */

export async function getCountries(
  params?: CountriesQueryParams
): Promise<ApiResponse<CountryApiItem[]>> {
  const queryParams: Record<string, unknown> = {
    PageNumber: params?.PageNumber ?? 1,
    PageSize: params?.PageSize ?? 50,
  };

  if (params?.Search?.trim()) {
    queryParams.Search = params.Search.trim();
  }
  if (params?.Language) {
    queryParams.Language = params.Language.toLowerCase();
  }

  const headers: Record<string, string> = {};
  if (params?.Language) {
    headers["Accept-Language"] = params.Language.toLowerCase();
  }

  const response = await apiClient.get<ApiResponse<CountryApiItem[]>>(
    "/api/Countries",
    {
      params: queryParams,
      headers: Object.keys(headers).length > 0 ? headers : undefined,
    }
  );
  return response.data;
}

export async function getCountryById(
  id: number,
  language?: string
): Promise<ApiResponse<CountryApiItem>> {
  const queryParams: Record<string, string> = {};
  if (language) {
    queryParams.language = language.toLowerCase();
  }

  const headers: Record<string, string> = {};
  if (language) {
    headers["Accept-Language"] = language.toLowerCase();
  }

  const response = await apiClient.get<ApiResponse<CountryApiItem>>(
    `/api/Countries/${id}`,
    {
      params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
      headers: Object.keys(headers).length > 0 ? headers : undefined,
    }
  );
  return response.data;
}

export async function getCountryAllLanguages(
  id: number
): Promise<LocalizedLocationName> {
  const langs: (keyof LocalizedLocationName)[] = ["en", "fr", "ru", "ro", "it"];
  const results = await Promise.all(
    langs.map((l) =>
      getCountryById(id, l)
        .then((res) => ({ lang: l, name: res.data?.name || "" }))
        .catch(() => ({ lang: l, name: "" }))
    )
  );

  const localized: LocalizedLocationName = {
    en: "",
    fr: "",
    ru: "",
    ro: "",
    it: "",
  };
  results.forEach((r) => {
    localized[r.lang] = r.name;
  });
  return localized;
}

export async function createCountry(
  payload: CreateCountryPayload
): Promise<ApiResponse<CountryApiItem>> {
  const response = await apiClient.post<ApiResponse<CountryApiItem>>(
    "/api/Countries",
    payload
  );

  if (!isApiSuccess(response.data)) {
    throw new Error(
      extractApiMessage(response.data, "Failed to create country.")
    );
  }
  return response.data;
}

export async function updateCountry(
  payload: UpdateCountryPayload
): Promise<ApiResponse<CountryApiItem>> {
  const response = await apiClient.put<ApiResponse<CountryApiItem>>(
    `/api/Countries/${payload.id}`,
    payload
  );

  if (!isApiSuccess(response.data)) {
    throw new Error(
      extractApiMessage(response.data, "Failed to update country.")
    );
  }
  return response.data;
}

export async function deleteCountry(id: number): Promise<ApiResponse<string>> {
  const response = await apiClient.delete<ApiResponse<string>>(
    `/api/Countries/${id}`
  );

  if (!isApiSuccess(response.data)) {
    throw new Error(
      extractApiMessage(response.data, "Failed to delete country.")
    );
  }
  return response.data;
}

/* =========================================================
   CITIES API
   ========================================================= */

export async function getCities(
  params?: CitiesQueryParams
): Promise<ApiResponse<CityApiItem[]>> {
  const queryParams: Record<string, unknown> = {
    PageNumber: params?.PageNumber ?? 1,
    PageSize: params?.PageSize ?? 50,
  };

  if (params?.CountryId !== undefined && params.CountryId !== null) {
    queryParams.CountryId = params.CountryId;
  }
  if (params?.Search?.trim()) {
    queryParams.Search = params.Search.trim();
  }
  if (params?.Language) {
    queryParams.Language = params.Language.toLowerCase();
  }

  const headers: Record<string, string> = {};
  if (params?.Language) {
    headers["Accept-Language"] = params.Language.toLowerCase();
  }

  const response = await apiClient.get<ApiResponse<CityApiItem[]>>(
    "/api/Cities",
    {
      params: queryParams,
      headers: Object.keys(headers).length > 0 ? headers : undefined,
    }
  );
  return response.data;
}

export async function getCityById(
  id: number,
  language?: string
): Promise<ApiResponse<CityApiItem>> {
  const queryParams: Record<string, string> = {};
  if (language) {
    queryParams.language = language.toLowerCase();
  }

  const headers: Record<string, string> = {};
  if (language) {
    headers["Accept-Language"] = language.toLowerCase();
  }

  const response = await apiClient.get<ApiResponse<CityApiItem>>(
    `/api/Cities/${id}`,
    {
      params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
      headers: Object.keys(headers).length > 0 ? headers : undefined,
    }
  );
  return response.data;
}

export async function getCityAllLanguages(
  id: number
): Promise<LocalizedLocationName> {
  const langs: (keyof LocalizedLocationName)[] = ["en", "fr", "ru", "ro", "it"];
  const results = await Promise.all(
    langs.map((l) =>
      getCityById(id, l)
        .then((res) => ({ lang: l, name: res.data?.name || "" }))
        .catch(() => ({ lang: l, name: "" }))
    )
  );

  const localized: LocalizedLocationName = {
    en: "",
    fr: "",
    ru: "",
    ro: "",
    it: "",
  };
  results.forEach((r) => {
    localized[r.lang] = r.name;
  });
  return localized;
}

export async function createCity(
  payload: CreateCityPayload
): Promise<ApiResponse<CityApiItem>> {
  const response = await apiClient.post<ApiResponse<CityApiItem>>(
    "/api/Cities",
    payload
  );

  if (!isApiSuccess(response.data)) {
    throw new Error(extractApiMessage(response.data, "Failed to create city."));
  }
  return response.data;
}

export async function updateCity(
  payload: UpdateCityPayload
): Promise<ApiResponse<CityApiItem>> {
  const response = await apiClient.put<ApiResponse<CityApiItem>>(
    `/api/Cities/${payload.id}`,
    payload
  );

  if (!isApiSuccess(response.data)) {
    throw new Error(extractApiMessage(response.data, "Failed to update city."));
  }
  return response.data;
}

export async function deleteCity(id: number): Promise<ApiResponse<string>> {
  const response = await apiClient.delete<ApiResponse<string>>(
    `/api/Cities/${id}`
  );

  if (!isApiSuccess(response.data)) {
    throw new Error(extractApiMessage(response.data, "Failed to delete city."));
  }
  return response.data;
}
