/**
 * Normalizes text to an SEO-friendly URL slug.
 * Removes diacritics and accents (French, Romanian, Italian), strips non-alphanumeric
 * characters, collapses spaces and hyphens, and trims edges.
 */
export function slugify(text: string): string {
  if (!text) return "";
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "-and-")
    .replace(/[^a-z0-9\s-_]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Builds SEO-friendly path for a single trip: /${locale}/trips/${id}-${slug}
 */
export function buildTripDetailsPath(
  locale: string,
  tripId: number | string,
  tripName: string
): string {
  const cleanLocale = locale?.trim() || "en";
  const slug = slugify(tripName);
  return slug
    ? `/${cleanLocale}/trips/${tripId}-${slug}`
    : `/${cleanLocale}/trips/${tripId}`;
}

/**
 * Builds SEO-friendly path for a single diving course: /${locale}/diving-courses/${slug}-${uuid}
 */
export function buildDivingCourseDetailsPath(
  locale: string,
  courseId: string,
  courseName: string
): string {
  const cleanLocale = locale?.trim() || "en";
  const slug = slugify(courseName);
  return slug
    ? `/${cleanLocale}/diving-courses/${slug}-${courseId}`
    : `/${cleanLocale}/diving-courses/${courseId}`;
}

/**
 * Builds SEO-friendly path for a single blog article: /${locale}/blog/${id}-${slug}
 */
export function buildBlogDetailsPath(
  locale: string,
  blogId: number | string,
  blogTitle: string
): string {
  const cleanLocale = locale?.trim() || "en";
  const slug = slugify(blogTitle);
  return slug
    ? `/${cleanLocale}/blog/${blogId}-${slug}`
    : `/${cleanLocale}/blog/${blogId}`;
}

const UUID_REGEX =
  /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;

/**
 * Extracts numeric ID from an SEO slug parameter (e.g. "12-luxor-day-tour" -> 12, or "12" -> 12).
 */
export function parseNumericIdFromSlug(slugOrId?: string | null): number | null {
  if (!slugOrId) return null;
  const decoded = decodeURIComponent(slugOrId).trim();

  // Try leading numeric ID: "12-luxor-tour"
  const prefixMatch = decoded.match(/^(\d+)(?:-.*)?$/);
  if (prefixMatch) {
    const val = parseInt(prefixMatch[1], 10);
    return isNaN(val) ? null : val;
  }

  // Try trailing numeric ID: "luxor-tour-12"
  const suffixMatch = decoded.match(/(?:.*-)?(\d+)$/);
  if (suffixMatch) {
    const val = parseInt(suffixMatch[1], 10);
    return isNaN(val) ? null : val;
  }

  return null;
}

/**
 * Extracts 36-character UUID from an SEO slug parameter
 * (e.g. "padi-open-water-course-7b07bcfc-d89b-449a-876a-1f135cac3303" -> "7b07bcfc-d89b-449a-876a-1f135cac3303").
 */
export function parseUuidFromSlug(slugOrId?: string | null): string | null {
  if (!slugOrId) return null;
  const decoded = decodeURIComponent(slugOrId).trim();
  const match = decoded.match(UUID_REGEX);
  return match ? match[0].toLowerCase() : null;
}
