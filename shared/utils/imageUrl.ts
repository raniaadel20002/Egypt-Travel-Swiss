import { API_BASE_URL } from "@/clientApi/apiConfig";

export function resolveApiImageUrl(imageUrl?: string | null): string {
  if (!imageUrl) return "";

  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://") ||
    imageUrl.startsWith("data:") ||
    imageUrl.startsWith("blob:")
  ) {
    return imageUrl;
  }

  const cleanBase = API_BASE_URL.replace(/\/+$/, "");
  const cleanPath = imageUrl.replace(/^\/+/, "");
  return `${cleanBase}/${cleanPath}`;
}

export async function urlToFile(
  imageUrl: string,
  filename = "triptype-image.webp"
): Promise<File | null> {
  try {
    const fullUrl = resolveApiImageUrl(imageUrl);
    const response = await fetch(fullUrl);
    if (!response.ok) return null;

    const blob = await response.blob();
    const mimeType = blob.type || "image/webp";
    return new File([blob], filename, { type: mimeType });
  } catch {
    return null;
  }
}
