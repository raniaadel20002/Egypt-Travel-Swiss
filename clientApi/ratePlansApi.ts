import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/api";
import { TRIP_TYPE_LANGUAGES } from "@/models/tripType";
import {
  CreateRatePlanPayload,
  HotelRatePlanApiItem,
  HotelRatePlanMultiLangDetails,
  RatePlansQueryParams,
  RatePlanTranslationInput,
  UpdateRatePlanPayload,
} from "@/models/hotel";

export async function getRatePlans(
  params?: RatePlansQueryParams
): Promise<HotelRatePlanApiItem[]> {
  try {
    const queryParams: Record<string, unknown> = {};

    if (params?.PageNumber) queryParams.PageNumber = params.PageNumber;
    if (params?.PageSize) queryParams.PageSize = params.PageSize;
    if (params?.HotelId) queryParams.HotelId = params.HotelId;
    if (params?.Language) queryParams.Language = params.Language;

    const headers: Record<string, string> = {};
    if (params?.Language) {
      headers["Accept-Language"] = String(params.Language);
    }

    const response = await apiClient.get<ApiResponse<HotelRatePlanApiItem[]>>(
      "/api/RatePlans",
      {
        params: queryParams,
        headers,
      }
    );

    if (response.data?.success && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching rate plans:", error);
    throw error;
  }
}

export async function getRatePlanById(
  id: number,
  language?: string
): Promise<HotelRatePlanApiItem> {
  try {
    const headers: Record<string, string> = {};
    if (language) {
      headers["Accept-Language"] = language;
    }

    const response = await apiClient.get<ApiResponse<HotelRatePlanApiItem>>(
      `/api/RatePlans/${id}`,
      {
        params: language ? { Language: language } : undefined,
        headers,
      }
    );

    if (response.data?.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data?.message || "Failed to fetch rate plan");
  } catch (error) {
    console.error(`Error fetching rate plan with ID ${id}:`, error);
    throw error;
  }
}

export async function getRatePlanAllLanguages(
  id: number
): Promise<HotelRatePlanMultiLangDetails> {
  const results = await Promise.all(
    TRIP_TYPE_LANGUAGES.map(async (lang) => {
      try {
        const data = await getRatePlanById(id, lang.code);
        return {
          langKey: lang.code.toLowerCase() as keyof RatePlanTranslationInput,
          data,
        };
      } catch {
        return {
          langKey: lang.code.toLowerCase() as keyof RatePlanTranslationInput,
          data: null,
        };
      }
    })
  );

  const enItem = results.find((r) => r.langKey === "en")?.data;
  const firstAvailable = results.find((r) => r.data)?.data;
  const baseItem = enItem || firstAvailable;

  const nameTranslations: RatePlanTranslationInput = {
    en: results.find((r) => r.langKey === "en")?.data?.name || "",
    fr: results.find((r) => r.langKey === "fr")?.data?.name || "",
    ru: results.find((r) => r.langKey === "ru")?.data?.name || "",
    ro: results.find((r) => r.langKey === "ro")?.data?.name || "",
    it: results.find((r) => r.langKey === "it")?.data?.name || "",
  };

  const descriptionTranslations: RatePlanTranslationInput = {
    en: results.find((r) => r.langKey === "en")?.data?.description || "",
    fr: results.find((r) => r.langKey === "fr")?.data?.description || "",
    ru: results.find((r) => r.langKey === "ru")?.data?.description || "",
    ro: results.find((r) => r.langKey === "ro")?.data?.description || "",
    it: results.find((r) => r.langKey === "it")?.data?.description || "",
  };

  return {
    id,
    hotelId: baseItem?.hotelId || 0,
    hotelName: baseItem?.hotelName || "",
    name: nameTranslations,
    description: descriptionTranslations,
    createdAt: baseItem?.createdAt || "",
    updatedAt: baseItem?.updatedAt || null,
  };
}

export async function createRatePlan(
  payload: CreateRatePlanPayload
): Promise<HotelRatePlanApiItem> {
  try {
    const response = await apiClient.post<ApiResponse<HotelRatePlanApiItem>>(
      "/api/RatePlans",
      payload
    );

    if (response.data?.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data?.message || "Failed to create rate plan");
  } catch (error) {
    console.error("Error creating rate plan:", error);
    throw error;
  }
}

export async function updateRatePlan(
  payload: UpdateRatePlanPayload
): Promise<HotelRatePlanApiItem> {
  try {
    const response = await apiClient.put<ApiResponse<HotelRatePlanApiItem>>(
      `/api/RatePlans/${payload.id}`,
      payload
    );

    if (response.data?.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data?.message || "Failed to update rate plan");
  } catch (error) {
    console.error(`Error updating rate plan with ID ${payload.id}:`, error);
    throw error;
  }
}

export async function deleteRatePlan(id: number): Promise<void> {
  try {
    const response = await apiClient.delete<ApiResponse<string>>(
      `/api/RatePlans/${id}`
    );

    if (!response.data?.success) {
      throw new Error(response.data?.message || "Failed to delete rate plan");
    }
  } catch (error) {
    console.error(`Error deleting rate plan with ID ${id}:`, error);
    throw error;
  }
}
