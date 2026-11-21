import { apiClient } from "./apiConfig";
import { ApiResponse } from "@/models/api";
import {
  CreateDivingCoursePayload,
  CreateDivingCourseReviewPayload,
  DivingCourseApiItem,
  DivingCourseImageApiItem,
  DivingCourseMultiLangDetails,
  DivingCoursesQueryParams,
  DivingCourseReviewAverageData,
  DivingCourseReviewsQueryParams,
  DUMMY_DIVING_REVIEW_PHONE,
  PaginatedDivingCourseReviewsData,
  PaginatedDivingCoursesData,
  ReorderCourseItemPayload,
  UpdateDivingCourseFacilityInput,
  UpdateDivingCoursePayload,
} from "@/models/divingCourse";

const SUPPORTED_LANGS = ["en", "fr", "ru", "ro", "it"] as const;

export async function getDivingCourses(
  params?: DivingCoursesQueryParams
): Promise<PaginatedDivingCoursesData> {
  const queryParams: Record<string, unknown> = {};
  if (params?.pageNumber) queryParams.pageNumber = params.pageNumber;
  if (params?.pageSize) queryParams.pageSize = params.pageSize;

  const requestHeaders: Record<string, string> = {};
  if (params?.language) {
    requestHeaders["Accept-Language"] = params.language;
  }

  const response = await apiClient.get<ApiResponse<PaginatedDivingCoursesData>>(
    "/api/DivingCourses",
    {
      params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
      headers:
        Object.keys(requestHeaders).length > 0 ? requestHeaders : undefined,
    }
  );

  return (
    response.data?.data || {
      data: [],
      pageNumber: params?.pageNumber || 1,
      pageSize: params?.pageSize || 10,
      totalCount: 0,
    }
  );
}

export async function getDivingCourseById(
  id: string,
  language = "en"
): Promise<DivingCourseApiItem> {
  const response = await apiClient.get<ApiResponse<DivingCourseApiItem>>(
    `/api/DivingCourses/${id}`,
    {
      headers: { "Accept-Language": language },
    }
  );
  return response.data?.data;
}

export async function getDivingCourseAllLanguages(
  id: string
): Promise<DivingCourseMultiLangDetails> {
  const results = await Promise.allSettled(
    SUPPORTED_LANGS.map((lang) => getDivingCourseById(id, lang))
  );

  const langMap: Record<string, DivingCourseApiItem | null> = {};
  SUPPORTED_LANGS.forEach((lang, index) => {
    const res = results[index];
    langMap[lang] = res.status === "fulfilled" ? res.value : null;
  });

  const base = langMap.en || langMap.fr || langMap.ru || langMap.ro || langMap.it;
  if (!base) {
    throw new Error("Failed to load diving course details");
  }

  const facilityMap = new Map<string, UpdateDivingCourseFacilityInput>();
  (base.facilities || []).forEach((fac, idx) => {
    facilityMap.set(fac.id || `idx-${idx}`, {
      id: fac.id,
      icon: fac.icon || "star",
      order: fac.order ?? idx,
      name: { en: "", fr: "", ru: "", ro: "", it: "" },
      values: { en: "", fr: "", ru: "", ro: "", it: "" },
    });
  });

  SUPPORTED_LANGS.forEach((lang) => {
    const item = langMap[lang];
    if (!item?.facilities) return;
    item.facilities.forEach((fac, idx) => {
      const key = fac.id || `idx-${idx}`;
      const entry = facilityMap.get(key);
      if (entry) {
        entry.name[lang] = fac.name || "";
        entry.values[lang] = fac.values || "";
      }
    });
  });

  return {
    id: base.id,
    price: base.price,
    currency: base.currency,
    name: {
      en: langMap.en?.name || "",
      fr: langMap.fr?.name || "",
      ru: langMap.ru?.name || "",
      ro: langMap.ro?.name || "",
      it: langMap.it?.name || "",
    },
    description: {
      en: langMap.en?.description || "",
      fr: langMap.fr?.description || "",
      ru: langMap.ru?.description || "",
      ro: langMap.ro?.description || "",
      it: langMap.it?.description || "",
    },
    facilities: Array.from(facilityMap.values()).sort(
      (a, b) => a.order - b.order
    ),
  };
}

export async function createDivingCourse(
  payload: CreateDivingCoursePayload
): Promise<DivingCourseApiItem> {
  const response = await apiClient.post<ApiResponse<DivingCourseApiItem>>(
    "/api/DivingCourses",
    payload
  );
  return response.data?.data;
}

export async function updateDivingCourse(
  payload: UpdateDivingCoursePayload
): Promise<DivingCourseApiItem> {
  const response = await apiClient.put<ApiResponse<DivingCourseApiItem>>(
    `/api/DivingCourses/${payload.id}`,
    payload
  );
  return response.data?.data;
}

export async function deleteDivingCourse(id: string): Promise<void> {
  await apiClient.delete(`/api/DivingCourses/${id}`);
}

export async function reorderDivingCourseFacilities(
  courseId: string,
  items: ReorderCourseItemPayload[]
): Promise<void> {
  await apiClient.put(
    `/api/DivingCourses/${courseId}/facilities/reorder`,
    items
  );
}

export async function getDivingCourseImages(
  courseId: string
): Promise<DivingCourseImageApiItem[]> {
  const response = await apiClient.get<ApiResponse<DivingCourseImageApiItem[]>>(
    `/api/DivingCourses/${courseId}/images`
  );
  return response.data?.data || [];
}

export async function uploadDivingCourseImage(
  courseId: string,
  file: File
): Promise<DivingCourseImageApiItem> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post<ApiResponse<DivingCourseImageApiItem>>(
    `/api/DivingCourses/${courseId}/images`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data?.data;
}

export async function deleteDivingCourseImage(
  courseId: string,
  imageId: string
): Promise<void> {
  await apiClient.delete(`/api/DivingCourses/${courseId}/images/${imageId}`);
}

export async function reorderDivingCourseImages(
  courseId: string,
  items: ReorderCourseItemPayload[]
): Promise<void> {
  await apiClient.put(`/api/DivingCourses/${courseId}/images/reorder`, items);
}

export async function getDivingCourseReviews(
  courseId: string,
  params?: DivingCourseReviewsQueryParams
): Promise<PaginatedDivingCourseReviewsData> {
  const queryParams: Record<string, unknown> = {};
  if (params?.pageNumber) queryParams.pageNumber = params.pageNumber;
  if (params?.pageSize) queryParams.pageSize = params.pageSize;
  if (typeof params?.status === "number") queryParams.status = params.status;

  const response = await apiClient.get<
    ApiResponse<PaginatedDivingCourseReviewsData>
  >(`/api/DivingCourses/${courseId}/reviews`, {
    params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
  });

  return (
    response.data?.data || {
      data: [],
      pageNumber: params?.pageNumber || 1,
      pageSize: params?.pageSize || 10,
      totalCount: 0,
    }
  );
}

export async function createDivingCourseReview(
  courseId: string,
  payload: CreateDivingCourseReviewPayload
): Promise<void> {
  const body = {
    ...payload,
    phone: payload.phone?.trim() || DUMMY_DIVING_REVIEW_PHONE,
  };
  await apiClient.post(`/api/DivingCourses/${courseId}/reviews`, body);
}

export async function updateDivingCourseReviewStatus(
  reviewId: string,
  status: number
): Promise<void> {
  await apiClient.patch(`/api/DivingCourses/reviews/${reviewId}/status`, {
    status,
  });
}

export async function getDivingCourseReviewsAverage(
  courseId: string
): Promise<DivingCourseReviewAverageData> {
  const response = await apiClient.get<
    ApiResponse<DivingCourseReviewAverageData>
  >(`/api/DivingCourses/${courseId}/reviews/average`);
  return (
    response.data?.data || {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: {},
    }
  );
}
