import { API_BASE_URL } from "@/clientApi/apiConfig";

export const DEFAULT_TRIP_IMAGE = "/Trips/heroTrips.png";
export const DEFAULT_SERVICE_IMAGE =
  "/home/Categories/5af697b0125109949149af917bc7716385d9cf04.png";

export function resolveApiImageUrl(imageUrl?: string | null): string {
  if (!imageUrl || imageUrl.trim() === "") return "";

  const trimmed = imageUrl.trim();

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:")
  ) {
    return trimmed;
  }

  // Local Next.js public assets
  if (
    trimmed.startsWith("/Trips/") ||
    trimmed.startsWith("/home/") ||
    trimmed.startsWith("/Blog/") ||
    trimmed.startsWith("/Destinations/") ||
    trimmed.startsWith("/Accommodation/") ||
    trimmed.startsWith("/DivingCourses/") ||
    trimmed.startsWith("/Transfers/") ||
    trimmed.startsWith("/Contact/") ||
    trimmed.startsWith("/images/") ||
    trimmed.startsWith("/icons/") ||
    trimmed.startsWith("/logo")
  ) {
    return trimmed;
  }

  const cleanBase = API_BASE_URL.replace(/\/+$/, "");
  const cleanPath = trimmed.replace(/^\/+/, "");
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
