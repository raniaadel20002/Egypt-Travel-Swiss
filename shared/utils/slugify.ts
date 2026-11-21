export function slugify(text: string): string {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\p{L}\p{N}-]+/gu, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function buildTripDetailsPath(
  locale: string,
  tripId: number,
  tripName: string
): string {
  const cleanLocale = locale?.trim() || "en";
  const slug = slugify(tripName);
  return slug
    ? `/${cleanLocale}/trips/${tripId}-${slug}`
    : `/${cleanLocale}/trips/${tripId}`;
}
