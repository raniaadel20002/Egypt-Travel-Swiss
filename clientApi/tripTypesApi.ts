import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/api";
import {
  BackendLanguageCode,
  CreateTripTypePayload,
  TRIP_TYPE_LANGUAGES,
  TripTypeItem,
  TripTypeMultiLangDetails,
  TripTypesQueryParams,
  UpdateTripTypePayload,
} from "@/models/tripType";
import { urlToFile } from "@/shared/utils/imageUrl";

export async function getTripTypes(
  params?: TripTypesQueryParams
): Promise<TripTypeItem[]> {
  const language = params?.language || "EN";
  const queryParams: Record<string, number> = {};

  if (params?.PageNumber) queryParams.PageNumber = params.PageNumber;
  if (params?.PageSize) queryParams.PageSize = params.PageSize;

  const response = await apiClient.get<ApiResponse<TripTypeItem[]>>(
    "/api/TripTypes",
    {
      params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
      headers: {
        "Accept-Language": language,
      },
    }
  );

  return response.data?.data || [];
}

export async function getTripTypeById(
  id: number,
  language: BackendLanguageCode = "EN"
): Promise<TripTypeItem> {
  const response = await apiClient.get<ApiResponse<TripTypeItem>>(
    `/api/TripTypes/${id}`,
    {
      headers: {
        "Accept-Language": language,
      },
    }
  );

  return response.data?.data;
}

export async function getTripTypeAllLanguages(
  id: number
): Promise<TripTypeMultiLangDetails> {
  const results = await Promise.all(
    TRIP_TYPE_LANGUAGES.map(async (lang) => {
      try {
        const item = await getTripTypeById(id, lang.code);
        return {
          code: lang.formKey,
          name: item?.name || "",
          imageUrl: item?.imageUrl || "",
        };
      } catch {
        return {
          code: lang.formKey,
          name: "",
          imageUrl: "",
        };
      }
    })
  );

  const primaryItem = results.find((r) => r.code === "En") || results[0];
  const imageUrl = results.find((r) => r.imageUrl)?.imageUrl || primaryItem.imageUrl;

  const names = {
    En: results.find((r) => r.code === "En")?.name || "",
    Fr: results.find((r) => r.code === "Fr")?.name || "",
    Ru: results.find((r) => r.code === "Ru")?.name || "",
    Ro: results.find((r) => r.code === "Ro")?.name || "",
    It: results.find((r) => r.code === "It")?.name || "",
  };

  return {
    id,
    imageUrl,
    names,
  };
}

export async function createTripType(
  payload: CreateTripTypePayload
): Promise<TripTypeItem> {
  const formData = new FormData();
  formData.append("Name.En", payload.names.En.trim());
  formData.append("Name.Fr", payload.names.Fr.trim());
  formData.append("Name.Ru", payload.names.Ru.trim());
  formData.append("Name.Ro", payload.names.Ro.trim());
  formData.append("Name.It", payload.names.It.trim());
  formData.append("Image", payload.image);

  const response = await apiClient.post<ApiResponse<TripTypeItem>>(
    "/api/TripTypes",
    formData,
    {
      headers: {
        "Accept-Language": "EN",
      },
    }
  );

  return response.data?.data;
}

export async function updateTripType(
  payload: UpdateTripTypePayload
): Promise<TripTypeItem> {
  const formData = new FormData();
  formData.append("Id", String(payload.id));
  formData.append("Name.En", payload.names.En.trim());
  formData.append("Name.Fr", payload.names.Fr.trim());
  formData.append("Name.Ru", payload.names.Ru.trim());
  formData.append("Name.Ro", payload.names.Ro.trim());
  formData.append("Name.It", payload.names.It.trim());

  if (payload.image) {
    formData.append("Image", payload.image);
  } else if (payload.existingImageUrl) {
    const fallbackFile = await urlToFile(payload.existingImageUrl);
    if (fallbackFile) {
      formData.append("Image", fallbackFile);
    }
  }

  const response = await apiClient.put<ApiResponse<TripTypeItem>>(
    "/api/TripTypes",
    formData,
    {
      headers: {
        "Accept-Language": "EN",
      },
    }
  );

  return response.data?.data;
}

export async function deleteTripType(id: number): Promise<void> {
  await apiClient.delete<ApiResponse<string>>(`/api/TripTypes/${id}`);
}
