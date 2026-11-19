import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/api";
import { BackendLanguageCode, TRIP_TYPE_LANGUAGES } from "@/models/tripType";
import {
  AssociateTripServicesPayload,
  CreateServicePayload,
  DeleteServiceImagePayload,
  ServiceApiItem,
  ServiceImageApiItem,
  ServiceMultiLangDetails,
  ServicesQueryParams,
  ServiceTranslationInput,
  UpdateServicePayload,
  UploadServiceImagesPayload,
} from "@/models/service";

export async function getServices(
  params?: ServicesQueryParams
): Promise<ServiceApiItem[]> {
  const language = params?.language || "EN";
  const queryParams: Record<string, number> = {};

  if (params?.PageNumber) queryParams.PageNumber = params.PageNumber;
  if (params?.PageSize) queryParams.PageSize = params.PageSize;

  const response = await apiClient.get<ApiResponse<ServiceApiItem[]>>(
    "/api/Services",
    {
      params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
      headers: {
        "Accept-Language": language,
      },
    }
  );

  return response.data?.data || [];
}

export async function getServiceById(
  id: number,
  language: BackendLanguageCode = "EN"
): Promise<ServiceApiItem> {
  const response = await apiClient.get<ApiResponse<ServiceApiItem>>(
    `/api/Services/${id}`,
    {
      headers: {
        "Accept-Language": language,
      },
    }
  );

  return response.data?.data;
}

export async function getServiceAllLanguages(
  id: number
): Promise<ServiceMultiLangDetails> {
  const results = await Promise.all(
    TRIP_TYPE_LANGUAGES.map(async (lang) => {
      try {
        const data = await getServiceById(id, lang.code);
        return {
          langKey: lang.code.toLowerCase() as keyof ServiceTranslationInput,
          data,
        };
      } catch {
        return {
          langKey: lang.code.toLowerCase() as keyof ServiceTranslationInput,
          data: null,
        };
      }
    })
  );

  const enItem = results.find((r) => r.langKey === "en")?.data;
  const firstAvailable = results.find((r) => r.data)?.data;
  const baseItem = enItem || firstAvailable;

  const nameTranslations: ServiceTranslationInput = {
    en: results.find((r) => r.langKey === "en")?.data?.name || "",
    fr: results.find((r) => r.langKey === "fr")?.data?.name || "",
    ru: results.find((r) => r.langKey === "ru")?.data?.name || "",
    ro: results.find((r) => r.langKey === "ro")?.data?.name || "",
    it: results.find((r) => r.langKey === "it")?.data?.name || "",
  };

  const descTranslations: ServiceTranslationInput = {
    en: results.find((r) => r.langKey === "en")?.data?.description || "",
    fr: results.find((r) => r.langKey === "fr")?.data?.description || "",
    ru: results.find((r) => r.langKey === "ru")?.data?.description || "",
    ro: results.find((r) => r.langKey === "ro")?.data?.description || "",
    it: results.find((r) => r.langKey === "it")?.data?.description || "",
  };

  return {
    id,
    name: nameTranslations,
    description: descTranslations,
    adultPrice: baseItem?.adultPrice || 0,
    childPrice: baseItem?.childPrice || 0,
    infPrice: baseItem?.infPrice || 0,
    createdAt: baseItem?.createdAt || new Date().toISOString(),
    images: baseItem?.images || [],
  };
}

export async function createService(
  payload: CreateServicePayload
): Promise<ServiceApiItem> {
  const response = await apiClient.post<ApiResponse<ServiceApiItem>>(
    "/api/Services",
    payload
  );

  return response.data?.data;
}

export async function updateService(
  payload: UpdateServicePayload
): Promise<ServiceApiItem> {
  const response = await apiClient.put<ApiResponse<ServiceApiItem>>(
    "/api/Services",
    payload
  );

  return response.data?.data;
}

export async function deleteService(id: number): Promise<void> {
  await apiClient.delete<ApiResponse<string>>(`/api/Services/${id}`);
}

export async function getServiceImages(
  id: number
): Promise<ServiceImageApiItem[]> {
  const response = await apiClient.get<ApiResponse<ServiceImageApiItem[]>>(
    `/api/Services/${id}/images`
  );

  return response.data?.data || [];
}

export async function uploadServiceImages(
  payload: UploadServiceImagesPayload
): Promise<ServiceImageApiItem[]> {
  const formData = new FormData();
  payload.images.forEach((file) => {
    formData.append("Images", file);
  });

  const response = await apiClient.post<ApiResponse<ServiceImageApiItem[]>>(
    `/api/Services/${payload.serviceId}/image`,
    formData
  );

  return response.data?.data || [];
}

export async function deleteServiceImage(
  payload: DeleteServiceImagePayload
): Promise<void> {
  await apiClient.delete<ApiResponse<string>>(
    `/api/Services/${payload.serviceId}/image/${payload.imageId}`
  );
}

export async function getTripServices(
  tripId: number,
  language: BackendLanguageCode = "EN"
): Promise<ServiceApiItem[]> {
  const response = await apiClient.get<ApiResponse<ServiceApiItem[]>>(
    `/api/Services/trip/${tripId}`,
    {
      headers: {
        "Accept-Language": language,
      },
    }
  );

  return response.data?.data || [];
}

export async function associateTripServices(
  payload: AssociateTripServicesPayload
): Promise<void> {
  await apiClient.post<ApiResponse<string>>(
    `/api/Services/trip/${payload.tripId}/associate`,
    payload.serviceIds
  );
}
