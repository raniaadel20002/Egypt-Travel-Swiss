import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/api";
import { BackendLanguageCode, TRIP_TYPE_LANGUAGES } from "@/models/tripType";
import {
  CreateHotelPayload,
  DeleteHotelImagePayload,
  HotelApiItem,
  HotelFacilityMultiLangItem,
  HotelImageApiItem,
  HotelMultiLangDetails,
  HotelsQueryParams,
  HotelTranslationInput,
  ReorderHotelFacilitiesPayload,
  ReorderHotelImagesPayload,
  SetPrimaryHotelImagePayload,
  UpdateHotelPayload,
  UploadHotelImagesPayload,
} from "@/models/hotel";

export async function getHotels(
  params?: HotelsQueryParams
): Promise<HotelApiItem[]> {
  try {
    const queryParams: Record<string, unknown> = {};

    if (params?.PageNumber) queryParams.PageNumber = params.PageNumber;
    if (params?.PageSize) queryParams.PageSize = params.PageSize;
    if (params?.Search) queryParams.Search = params.Search;
    if (params?.Rate) queryParams.Rate = params.Rate;
    if (params?.FacilityId) queryParams.FacilityId = params.FacilityId;
    if (params?.Language) queryParams.Language = params.Language;

    const headers: Record<string, string> = {};
    if (params?.Language) {
      headers["Accept-Language"] = String(params.Language);
    }

    const response = await apiClient.get<ApiResponse<HotelApiItem[]>>(
      "/api/Hotels",
      {
        params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
        headers: Object.keys(headers).length > 0 ? headers : undefined,
      }
    );

    const data =
      response.data?.data ||
      (response.data as unknown as { Data?: HotelApiItem[] })?.Data;
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getHotelById(
  id: number,
  language: BackendLanguageCode | string = "EN",
  includeRatePlans = false
): Promise<HotelApiItem> {
  const response = await apiClient.get<ApiResponse<HotelApiItem>>(
    `/api/Hotels/${id}`,
    {
      params: {
        language: language.toLowerCase(),
        includeRatePlans,
      },
      headers: {
        "Accept-Language": language,
      },
    }
  );

  const data =
    response.data?.data ||
    (response.data as unknown as { Data?: HotelApiItem })?.Data;
  return data as HotelApiItem;
}

export async function getHotelAllLanguages(
  id: number
): Promise<HotelMultiLangDetails> {
  const results = await Promise.all(
    TRIP_TYPE_LANGUAGES.map(async (lang) => {
      try {
        const data = await getHotelById(id, lang.code, true);
        return {
          langKey: lang.code.toLowerCase() as keyof HotelTranslationInput,
          data,
        };
      } catch {
        return {
          langKey: lang.code.toLowerCase() as keyof HotelTranslationInput,
          data: null,
        };
      }
    })
  );

  const enItem = results.find((r) => r.langKey === "en")?.data;
  const firstAvailable = results.find((r) => r.data)?.data;
  const baseItem = enItem || firstAvailable;

  const nameTranslations: HotelTranslationInput = {
    en: results.find((r) => r.langKey === "en")?.data?.name || "",
    fr: results.find((r) => r.langKey === "fr")?.data?.name || "",
    ru: results.find((r) => r.langKey === "ru")?.data?.name || "",
    ro: results.find((r) => r.langKey === "ro")?.data?.name || "",
    it: results.find((r) => r.langKey === "it")?.data?.name || "",
  };

  const locationTranslations: HotelTranslationInput = {
    en: results.find((r) => r.langKey === "en")?.data?.location || "",
    fr: results.find((r) => r.langKey === "fr")?.data?.location || "",
    ru: results.find((r) => r.langKey === "ru")?.data?.location || "",
    ro: results.find((r) => r.langKey === "ro")?.data?.location || "",
    it: results.find((r) => r.langKey === "it")?.data?.location || "",
  };

  const descTranslations: HotelTranslationInput = {
    en: results.find((r) => r.langKey === "en")?.data?.description || "",
    fr: results.find((r) => r.langKey === "fr")?.data?.description || "",
    ru: results.find((r) => r.langKey === "ru")?.data?.description || "",
    ro: results.find((r) => r.langKey === "ro")?.data?.description || "",
    it: results.find((r) => r.langKey === "it")?.data?.description || "",
  };

  const baseFacilities = baseItem?.facilities || [];
  const facilitiesMultiLang: HotelFacilityMultiLangItem[] = baseFacilities.map(
    (baseFac, index) => {
      const facName: HotelTranslationInput = {
        en: "",
        fr: "",
        ru: "",
        ro: "",
        it: "",
      };

      const maxValuesCount = Math.max(
        ...results.map((r) => {
          const matching = r.data?.facilities?.find(
            (f) => (f.id && f.id === baseFac.id) || f.order === baseFac.order
          );
          return matching?.values?.length || 0;
        }),
        baseFac.values?.length || 0
      );

      const facValues: HotelTranslationInput[] = Array.from(
        { length: maxValuesCount },
        () => ({
          en: "",
          fr: "",
          ru: "",
          ro: "",
          it: "",
        })
      );

      results.forEach((r) => {
        const matching = r.data?.facilities?.find(
          (f) => (f.id && f.id === baseFac.id) || f.order === baseFac.order
        );
        if (matching) {
          facName[r.langKey] = matching.name || "";
          matching.values?.forEach((val, vIdx) => {
            if (facValues[vIdx]) {
              facValues[vIdx][r.langKey] = val || "";
            }
          });
        }
      });

      return {
        id: baseFac.id,
        icon: baseFac.icon || "waves",
        order: baseFac.order ?? index + 1,
        name: facName,
        values: facValues,
      };
    }
  );

  return {
    id,
    name: nameTranslations,
    location: locationTranslations,
    description: descTranslations,
    rate: baseItem?.rate || 5,
    createdAt: baseItem?.createdAt || new Date().toISOString(),
    updatedAt: baseItem?.updatedAt || null,
    facilities: facilitiesMultiLang,
    images: baseItem?.images || [],
    ratePlans: baseItem?.ratePlans || [],
  };
}

export async function createHotel(
  payload: CreateHotelPayload
): Promise<HotelApiItem> {
  const response = await apiClient.post<ApiResponse<HotelApiItem>>(
    "/api/Hotels",
    payload
  );

  return response.data?.data;
}

export async function updateHotel(
  payload: UpdateHotelPayload
): Promise<HotelApiItem> {
  const response = await apiClient.put<ApiResponse<HotelApiItem>>(
    `/api/Hotels/${payload.id}`,
    payload
  );

  return response.data?.data;
}

export async function deleteHotel(id: number): Promise<void> {
  await apiClient.delete<ApiResponse<string>>(`/api/Hotels/${id}`);
}

export async function reorderHotelFacilities(
  payload: ReorderHotelFacilitiesPayload
): Promise<HotelApiItem> {
  const response = await apiClient.put<ApiResponse<HotelApiItem>>(
    `/api/Hotels/${payload.hotelId}/facilities/reorder`,
    {
      facilityIds: payload.facilityIds,
    }
  );

  return response.data?.data;
}

export async function getHotelImages(
  hotelId: number
): Promise<HotelImageApiItem[]> {
  const response = await apiClient.get<ApiResponse<HotelImageApiItem[]>>(
    `/api/HotelImages/${hotelId}`
  );

  return response.data?.data || [];
}

export async function uploadHotelImages(
  payload: UploadHotelImagesPayload
): Promise<HotelImageApiItem[]> {
  const formData = new FormData();
  payload.images.forEach((file) => {
    formData.append("images", file);
  });

  const response = await apiClient.post<ApiResponse<HotelImageApiItem[]>>(
    `/api/HotelImages/${payload.hotelId}`,
    formData
  );

  return response.data?.data || [];
}

export async function deleteHotelImage(
  payload: DeleteHotelImagePayload
): Promise<void> {
  await apiClient.delete<ApiResponse<string>>(
    `/api/HotelImages/${payload.hotelId}/${payload.imageId}`
  );
}

export async function setPrimaryHotelImage(
  payload: SetPrimaryHotelImagePayload
): Promise<void> {
  await apiClient.put<ApiResponse<string>>(
    `/api/HotelImages/${payload.hotelId}/${payload.imageId}/primary`
  );
}

export async function reorderHotelImages(
  payload: ReorderHotelImagesPayload
): Promise<void> {
  await apiClient.put<ApiResponse<string>>(
    `/api/HotelImages/${payload.hotelId}/reorder`,
    {
      imageOrders: payload.imageOrders,
    }
  );
}
