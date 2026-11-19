import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/api";
import { BackendLanguageCode, TRIP_TYPE_LANGUAGES } from "@/models/tripType";
import {
  CreateTripPayload,
  DurationTypeEnum,
  TripApiItem,
  TripCategoryEnum,
  TripImageActionPayload,
  TripImageApiItem,
  TripMultiLangDetails,
  TripsQueryParams,
  TripTranslationInput,
  UpdateTripPayload,
  UploadTripImagesPayload,
} from "@/models/trip";

const DAY_NAME_TO_NUMBER: Record<string, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

export async function getTrips(
  params?: TripsQueryParams
): Promise<TripApiItem[]> {
  const language = params?.language || "EN";
  const queryParams: Record<string, string | number | boolean> = {};

  if (params?.PageNumber) queryParams.PageNumber = params.PageNumber;
  if (params?.PageSize) queryParams.PageSize = params.PageSize;
  if (params?.MinPrice !== undefined) queryParams.MinPrice = params.MinPrice;
  if (params?.MaxPrice !== undefined) queryParams.MaxPrice = params.MaxPrice;
  if (params?.TypeId !== undefined) queryParams.TypeId = params.TypeId;
  if (params?.DestinationId !== undefined) {
    queryParams.DestinationId = params.DestinationId;
  }
  if (params?.Category !== undefined) queryParams.Category = params.Category;
  if (params?.includeInactive !== undefined) {
    queryParams.includeInactive = params.includeInactive;
  }
  if (params?.SearchItem && params.SearchItem.trim() !== "") {
    queryParams.SearchItem = params.SearchItem.trim();
  }

  const response = await apiClient.get<ApiResponse<TripApiItem[]>>(
    "/api/Trips",
    {
      params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
      headers: {
        "Accept-Language": language,
      },
    }
  );

  return response.data?.data || [];
}

export async function getTripById(
  id: number,
  language: BackendLanguageCode = "EN"
): Promise<TripApiItem> {
  const response = await apiClient.get<ApiResponse<TripApiItem>>(
    `/api/Trips/${id}`,
    {
      headers: {
        "Accept-Language": language,
      },
    }
  );

  return response.data?.data;
}

function zipTranslationLists(
  rawListsByLang: Record<string, string[]>
): TripTranslationInput[] {
  const primaryList = rawListsByLang.en || [];
  const maxLen = Math.max(
    primaryList.length,
    ...Object.values(rawListsByLang).map((l) => l?.length || 0)
  );

  const result: TripTranslationInput[] = [];
  for (let i = 0; i < maxLen; i++) {
    const enVal = rawListsByLang.en?.[i] || "";
    result.push({
      en: enVal,
      fr: rawListsByLang.fr?.[i] || enVal,
      ru: rawListsByLang.ru?.[i] || enVal,
      ro: rawListsByLang.ro?.[i] || enVal,
      it: rawListsByLang.it?.[i] || enVal,
    });
  }
  return result;
}

export async function getTripAllLanguages(
  id: number
): Promise<TripMultiLangDetails> {
  const results = await Promise.all(
    TRIP_TYPE_LANGUAGES.map(async (lang) => {
      try {
        const item = await getTripById(id, lang.code);
        return {
          langKey: lang.code.toLowerCase(),
          data: item,
        };
      } catch {
        return {
          langKey: lang.code.toLowerCase(),
          data: null,
        };
      }
    })
  );

  const enItem =
    results.find((r) => r.langKey === "en")?.data ||
    results.find((r) => r.data !== null)?.data;

  if (!enItem) {
    throw new Error(`Failed to load trip data for ID ${id}`);
  }

  const nameTranslations: TripTranslationInput = {
    en: results.find((r) => r.langKey === "en")?.data?.name || "",
    fr: results.find((r) => r.langKey === "fr")?.data?.name || "",
    ru: results.find((r) => r.langKey === "ru")?.data?.name || "",
    ro: results.find((r) => r.langKey === "ro")?.data?.name || "",
    it: results.find((r) => r.langKey === "it")?.data?.name || "",
  };

  const descTranslations: TripTranslationInput = {
    en: results.find((r) => r.langKey === "en")?.data?.description || "",
    fr: results.find((r) => r.langKey === "fr")?.data?.description || "",
    ru: results.find((r) => r.langKey === "ru")?.data?.description || "",
    ro: results.find((r) => r.langKey === "ro")?.data?.description || "",
    it: results.find((r) => r.langKey === "it")?.data?.description || "",
  };

  const buildListMap = (field: "highlights" | "includes" | "excludes" | "whatToBring") => {
    const map: Record<string, string[]> = {};
    results.forEach((r) => {
      if (r.data?.[field]) {
        map[r.langKey] = r.data[field];
      }
    });
    return zipTranslationLists(map);
  };

  const dayNumbers: number[] = (enItem.availableDays || [])
    .map((d) => DAY_NAME_TO_NUMBER[d.trim().toLowerCase()])
    .filter((n): n is number => n !== undefined);

  let normalizedTime = enItem.timeFrom || "";
  if (normalizedTime && normalizedTime.length >= 5) {
    normalizedTime = normalizedTime.slice(0, 5);
  }

  const durationType =
    enItem.durationTypeName?.toLowerCase() === "days"
      ? DurationTypeEnum.Days
      : DurationTypeEnum.Hours;

  const category =
    enItem.categoryName?.toLowerCase() === "private"
      ? TripCategoryEnum.Private
      : TripCategoryEnum.Normal;

  return {
    id: enItem.id,
    markerID: enItem.markerID || "",
    destinationId: enItem.destinationInfo?.id || 0,
    tripTypeId: 0,
    name: nameTranslations,
    description: descTranslations,
    timeFrom: normalizedTime,
    durationValue: enItem.durationValue || 0,
    durationType,
    adultPrice: enItem.adultPrice || 0,
    childPrice: enItem.childPrice || 0,
    infPrice: enItem.infPrice || 0,
    category,
    availabilityDayNo: dayNumbers.length > 0 ? dayNumbers : [0, 1, 2, 3, 4, 5, 6],
    highlights: buildListMap("highlights"),
    includes: buildListMap("includes"),
    excludes: buildListMap("excludes"),
    whatToBring: buildListMap("whatToBring"),
    images: enItem.images || [],
    isActive: enItem.isActive ?? true,
    currencyName: enItem.currencyName || "EUR",
  };
}

export async function createTrip(
  payload: CreateTripPayload
): Promise<TripApiItem> {
  const response = await apiClient.post<ApiResponse<TripApiItem>>(
    "/api/Trips",
    payload,
    {
      headers: {
        "Accept-Language": "EN",
      },
    }
  );

  return response.data?.data;
}

export async function updateTrip(
  payload: UpdateTripPayload
): Promise<TripApiItem> {
  const response = await apiClient.put<ApiResponse<TripApiItem>>(
    "/api/Trips",
    payload,
    {
      headers: {
        "Accept-Language": "EN",
      },
    }
  );

  return response.data?.data;
}

export async function deactivateTrip(id: number): Promise<void> {
  await apiClient.delete<ApiResponse<string>>(`/api/Trips/${id}/deactivate`);
}

export async function reactivateTrip(id: number): Promise<void> {
  await apiClient.put<ApiResponse<string>>(`/api/Trips/${id}/reactivate`);
}

export async function uploadTripImages(
  payload: UploadTripImagesPayload
): Promise<TripImageApiItem[]> {
  const formData = new FormData();
  payload.images.forEach((file) => {
    formData.append("Images", file);
  });

  const response = await apiClient.post<ApiResponse<TripImageApiItem[]>>(
    `/api/Trips/${payload.tripId}/image`,
    formData
  );

  return response.data?.data || [];
}

export async function deleteTripImage(
  payload: TripImageActionPayload
): Promise<void> {
  await apiClient.delete<ApiResponse<string>>(
    `/api/Trips/${payload.tripId}/image/${payload.imageId}`
  );
}

export async function setPrimaryTripImage(
  payload: TripImageActionPayload
): Promise<void> {
  await apiClient.put<ApiResponse<string>>(
    `/api/Trips/${payload.tripId}/image/${payload.imageId}/set-primary`
  );
}
