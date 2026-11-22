import { apiClient, getActiveLanguage } from "./apiConfig";
import { localeToBackendLanguage } from "@/shared/utils/localeToBackendLanguage";
import { ApiResponse } from "@/models/api";
import {
  BlogApiItem,
  BlogLocalizedText,
  BlogMultiLangDetails,
  BlogMultiLangSectionItem,
  BlogsQueryParams,
  CreateBlogPayload,
  UpdateBlogPayload,
} from "@/models/blog";

const SUPPORTED_LANGS = ["en", "fr", "ru", "ro", "it"] as const;

export function normalizeBlogLocalizedText(
  text: BlogLocalizedText
): BlogLocalizedText {
  const enVal = (text.en || "").trim();
  return {
    en: enVal,
    fr: (text.fr || "").trim() || enVal,
    ru: (text.ru || "").trim() || enVal,
    ro: (text.ro || "").trim() || enVal,
    it: (text.it || "").trim() || enVal,
  };
}

export async function getBlogs(
  params?: BlogsQueryParams
): Promise<BlogApiItem[]> {
  try {
    const resolvedLang = params?.language
      ? localeToBackendLanguage(params.language)
      : getActiveLanguage();

    const response = await apiClient.get<ApiResponse<BlogApiItem[]>>(
      "/api/Blogs",
      {
        params: {
          PageNumber: params?.PageNumber ?? 1,
          PageSize: params?.PageSize ?? 20,
        },
        headers: {
          "Accept-Language": resolvedLang,
        },
      }
    );
    const data =
      response.data?.data ||
      (response.data as unknown as { Data?: BlogApiItem[] })?.Data;
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getBlogById(
  id: number,
  language?: string
): Promise<BlogApiItem> {
  const resolvedLang = language
    ? localeToBackendLanguage(language)
    : getActiveLanguage();

  const response = await apiClient.get<ApiResponse<BlogApiItem>>(
    `/api/Blogs/${id}`,
    {
      headers: {
        "Accept-Language": resolvedLang,
      },
    }
  );
  const data =
    response.data?.data ||
    (response.data as unknown as { Data?: BlogApiItem })?.Data;
  return data as BlogApiItem;
}

export async function getBlogAllLanguages(
  id: number
): Promise<BlogMultiLangDetails> {
  const results = await Promise.allSettled(
    SUPPORTED_LANGS.map((lang) => getBlogById(id, lang))
  );

  const langMap: Record<string, BlogApiItem | null> = {};
  SUPPORTED_LANGS.forEach((lang, index) => {
    const res = results[index];
    langMap[lang] = res.status === "fulfilled" ? res.value : null;
  });

  const base =
    langMap.en || langMap.fr || langMap.ru || langMap.ro || langMap.it;
  if (!base) {
    throw new Error("Failed to load blog article details across languages");
  }

  const sectionMap = new Map<string, BlogMultiLangSectionItem>();
  (base.blogSections || []).forEach((sec, idx) => {
    const key = sec.id ? `id-${sec.id}` : `num-${sec.sectionNumber ?? idx}`;
    sectionMap.set(key, {
      id: sec.id || 0,
      sectionNumber: sec.sectionNumber ?? idx + 1,
      imageUrl: sec.imageUrl,
      title: { en: "", fr: "", ru: "", ro: "", it: "" },
      content: { en: "", fr: "", ru: "", ro: "", it: "" },
    });
  });

  SUPPORTED_LANGS.forEach((lang) => {
    const item = langMap[lang];
    if (!item?.blogSections) return;
    item.blogSections.forEach((sec, idx) => {
      const key =
        (sec.id && sectionMap.has(`id-${sec.id}`) ? `id-${sec.id}` : null) ||
        `num-${sec.sectionNumber ?? idx}`;
      const entry =
        sectionMap.get(key) ||
        Array.from(sectionMap.values()).find(
          (s) => s.sectionNumber === sec.sectionNumber
        );
      if (entry) {
        entry.title[lang] = sec.title || "";
        entry.content[lang] = sec.content || "";
        if (!entry.imageUrl && sec.imageUrl) {
          entry.imageUrl = sec.imageUrl;
        }
      }
    });
  });

  return {
    id: base.id,
    imageUrl: base.imageUrl,
    title: {
      en: langMap.en?.title || "",
      fr: langMap.fr?.title || "",
      ru: langMap.ru?.title || "",
      ro: langMap.ro?.title || "",
      it: langMap.it?.title || "",
    },
    content: {
      en: langMap.en?.content || "",
      fr: langMap.fr?.content || "",
      ru: langMap.ru?.content || "",
      ro: langMap.ro?.content || "",
      it: langMap.it?.content || "",
    },
    blogSections: Array.from(sectionMap.values()).sort(
      (a, b) => a.sectionNumber - b.sectionNumber
    ),
  };
}

export async function createBlog(
  payload: CreateBlogPayload
): Promise<BlogApiItem> {
  const normalizedPayload: CreateBlogPayload = {
    title: normalizeBlogLocalizedText(payload.title),
    content: normalizeBlogLocalizedText(payload.content),
    blogSections: (payload.blogSections || []).map((sec) => ({
      sectionNumber: sec.sectionNumber,
      title: normalizeBlogLocalizedText(sec.title),
      content: normalizeBlogLocalizedText(sec.content),
    })),
  };

  const response = await apiClient.post<ApiResponse<BlogApiItem>>(
    "/api/Blogs",
    normalizedPayload
  );
  return response.data.data;
}

export async function updateBlog(
  id: number,
  payload: UpdateBlogPayload
): Promise<BlogApiItem> {
  const normalizedPayload: UpdateBlogPayload = {
    id,
    title: normalizeBlogLocalizedText(payload.title),
    content: normalizeBlogLocalizedText(payload.content),
    blogSections: (payload.blogSections || []).map((sec) => ({
      id: sec.id || 0,
      sectionNumber: sec.sectionNumber,
      title: normalizeBlogLocalizedText(sec.title),
      content: normalizeBlogLocalizedText(sec.content),
    })),
  };

  const response = await apiClient.put<ApiResponse<BlogApiItem>>(
    `/api/Blogs/${id}`,
    normalizedPayload
  );
  return response.data.data;
}

export async function deleteBlog(id: number): Promise<void> {
  await apiClient.delete(`/api/Blogs/${id}`);
}

export async function uploadBlogImage(
  blogId: number,
  file: File
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post<ApiResponse<string>>(
    "/api/Blogs/image",
    formData,
    {
      params: { blogid: blogId },
    }
  );
  return response.data.data;
}

export async function uploadBlogSectionImage(
  blogId: number,
  sectionId: number,
  file: File
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post<ApiResponse<string>>(
    "/api/Blogs/section/image",
    formData,
    {
      params: { blogid: blogId, sectionid: sectionId },
    }
  );
  return response.data.data;
}

export async function deleteBlogImage(id: number): Promise<void> {
  await apiClient.delete(`/api/Blogs/${id}/image`);
}

export async function deleteBlogSectionImage(sectionId: number): Promise<void> {
  await apiClient.delete(`/api/Blogs/section/${sectionId}/image`);
}
