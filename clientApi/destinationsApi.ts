import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/api";
import { BackendLanguageCode, TRIP_TYPE_LANGUAGES } from "@/models/tripType";
import {
  CreateDestinationPayload,
  DestinationApiItem,
  DestinationMultiLangDetails,
  DestinationsQueryParams,
  UpdateDestinationImagePayload,
  UpdateDestinationPayload,
} from "@/models/destination";

export async function getDestinations(
  params?: DestinationsQueryParams
): Promise<DestinationApiItem[]> {
  const language = params?.language || "EN";
  const queryParams: Record<string, string | number> = {};

  if (params?.PageNumber) queryParams.PageNumber = params.PageNumber;
  if (params?.PageSize) queryParams.PageSize = params.PageSize;
  if (params?.searchTerm && params.searchTerm.trim() !== "") {
    queryParams.searchTerm = params.searchTerm.trim();
  }

  const response = await apiClient.get<ApiResponse<DestinationApiItem[]>>(
    "/api/Destinations",
    {
      params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
      headers: {
        "Accept-Language": language,
      },
    }
  );

  return response.data?.data || [];
}

export async function getDestinationById(
  id: number,
  language: BackendLanguageCode = "EN"
): Promise<DestinationApiItem> {
  const response = await apiClient.get<ApiResponse<DestinationApiItem>>(
    `/api/Destinations/${id}`,
    {
      headers: {
        "Accept-Language": language,
      },
    }
  );

  return response.data?.data;
}

export async function getDestinationAllLanguages(
  id: number
): Promise<DestinationMultiLangDetails> {
  const results = await Promise.all(
    TRIP_TYPE_LANGUAGES.map(async (lang) => {
      try {
        const item = await getDestinationById(id, lang.code);
        return {
          code: lang.formKey,
          name: item?.name || "",
          imageUrl: item?.imageUrl || "",
          isFeatured: item?.isFeatured ?? false,
          tripsCount: item?.tripsCount ?? 0,
        };
      } catch {
        return {
          code: lang.formKey,
          name: "",
          imageUrl: "",
          isFeatured: false,
          tripsCount: 0,
        };
      }
    })
  );

  const primaryItem = results.find((r) => r.code === "En") || results[0];
  const imageUrl = results.find((r) => r.imageUrl)?.imageUrl || primaryItem.imageUrl;
  const isFeatured = results.find((r) => r.isFeatured !== undefined)?.isFeatured ?? false;
  const tripsCount = results.find((r) => r.tripsCount !== undefined)?.tripsCount ?? 0;

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
    isFeatured,
    tripsCount,
    names,
  };
}

export async function createDestination(
  payload: CreateDestinationPayload
): Promise<DestinationApiItem> {
  const formData = new FormData();
  formData.append("Name.En", payload.names.En.trim());
  formData.append("Name.Fr", payload.names.Fr.trim());
  formData.append("Name.Ru", payload.names.Ru.trim());
  formData.append("Name.Ro", payload.names.Ro.trim());
  formData.append("Name.It", payload.names.It.trim());
  formData.append("IsFeatured", String(payload.isFeatured));
  formData.append("imageFile", payload.imageFile);

  const response = await apiClient.post<ApiResponse<DestinationApiItem>>(
    "/api/Destinations",
    formData,
    {
      headers: {
        "Accept-Language": "EN",
      },
    }
  );

  return response.data?.data;
}

export async function updateDestination(
  payload: UpdateDestinationPayload
): Promise<DestinationApiItem> {
  const formData = new FormData();
  formData.append("Id", String(payload.id));
  formData.append("Name.En", payload.names.En.trim());
  formData.append("Name.Fr", payload.names.Fr.trim());
  formData.append("Name.Ru", payload.names.Ru.trim());
  formData.append("Name.Ro", payload.names.Ro.trim());
  formData.append("Name.It", payload.names.It.trim());
  formData.append("IsFeatured", String(payload.isFeatured));

  if (payload.imageFile) {
    formData.append("imageFile", payload.imageFile);
  }

  const response = await apiClient.put<ApiResponse<DestinationApiItem>>(
    "/api/Destinations",
    formData,
    {
      headers: {
        "Accept-Language": "EN",
      },
    }
  );

  return response.data?.data;
}

export async function deleteDestination(id: number): Promise<void> {
  await apiClient.delete<ApiResponse<string>>(`/api/Destinations/${id}`);
}

export async function updateDestinationImage(
  payload: UpdateDestinationImagePayload
): Promise<DestinationApiItem> {
  const formData = new FormData();
  formData.append("imageFile", payload.imageFile);

  const response = await apiClient.put<ApiResponse<DestinationApiItem>>(
    `/api/Destinations/${payload.id}/image`,
    formData,
    {
      headers: {
        "Accept-Language": "EN",
      },
    }
  );

  return response.data?.data;
}

export async function deleteDestinationImage(id: number): Promise<void> {
  await apiClient.delete<ApiResponse<string>>(`/api/Destinations/${id}/image`);
}
