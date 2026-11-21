import { API_BASE_URL } from "@/clientApi/apiConfig";
import { BlogApiItem, BlogSectionApiItem } from "@/models/blog";

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
