import { API_BASE_URL } from "@/clientApi/apiConfig";
import {
  BlogApiItem,
  BlogLocalizedText,
  BlogMultiLangDetails,
  BlogSectionApiItem,
} from "@/models/blog";
import { BlogSectionDraft } from "./BlogSectionFormCard";

export const BLOG_LANGUAGES: Array<{
  key: keyof BlogLocalizedText;
  code: string;
  label: string;
}> = [
  { key: "en", code: "EN", label: "English" },
  { key: "fr", code: "FR", label: "French" },
  { key: "ru", code: "RU", label: "Russian" },
  { key: "ro", code: "RO", label: "Romanian" },
  { key: "it", code: "IT", label: "Italian" },
];

export function emptyBlogLocalizedText(initialEn = ""): BlogLocalizedText {
  return { en: initialEn, fr: "", ru: "", ro: "", it: "" };
}

export function buildBlogDraftState(
  editingBlog: BlogApiItem | null,
  multiLangBlog?: BlogMultiLangDetails
): {
  title: BlogLocalizedText;
  content: BlogLocalizedText;
  sections: BlogSectionDraft[];
} {
  if (!editingBlog) {
    return {
      title: emptyBlogLocalizedText(),
      content: emptyBlogLocalizedText(),
      sections: [],
    };
  }
  if (multiLangBlog && multiLangBlog.id === editingBlog.id) {
    return {
      title: multiLangBlog.title,
      content: multiLangBlog.content,
      sections: multiLangBlog.blogSections.map((s) => ({
        id: s.id,
        sectionNumber: s.sectionNumber,
        title: s.title,
        content: s.content,
        existingImageUrl: s.imageUrl,
        newImageFile: null,
      })),
    };
  }
  const sorted = sortBlogSections(editingBlog.blogSections);
  return {
    title: emptyBlogLocalizedText(editingBlog.title || ""),
    content: emptyBlogLocalizedText(editingBlog.content || ""),
    sections: sorted.map((s) => ({
      id: s.id,
      sectionNumber: s.sectionNumber,
      title: emptyBlogLocalizedText(s.title || ""),
      content: emptyBlogLocalizedText(s.content || ""),
      existingImageUrl: s.imageUrl,
      newImageFile: null,
    })),
  };
}

export function resolveBlogImageUrl(url?: string | null): string {
  if (!url || typeof url !== "string" || !url.trim()) return "";
  const cleaned = url.trim();
  if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) {
    return cleaned;
  }
  const baseUrl = API_BASE_URL.replace(/\/+$/, "");
  const path = cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
  return `${baseUrl}${path}`;
}

export function sortBlogSections(
  sections?: BlogSectionApiItem[] | null
): BlogSectionApiItem[] {
  if (!sections || !Array.isArray(sections)) return [];
  return [...sections].sort((a, b) => a.sectionNumber - b.sectionNumber);
}

export function truncateText(text?: string | null, maxLength = 120): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}
