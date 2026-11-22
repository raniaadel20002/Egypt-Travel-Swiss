import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  SupportedLocale,
} from "@/features/i18n/i18nConfig";

const PUBLIC_FILE = /\.(.*)$/;

// Top-level public route sections (no detail sub-page)
const VALID_PUBLIC_SUBPATHS = new Set([
  "",
  "trips",
  "destinations",
  "categories",
  "diving-courses",
  "accommodation",
  "transfers",
  "blog",
  "faq",
  "cart",
  "contact",
  "about",
]);

// Sections that allow exactly one additional dynamic slug segment: /<section>/<slug>
const PUBLIC_DETAIL_SUBPATHS = new Set([
  "blog",
  "trips",
  "destinations",
  "diving-courses",
  "accommodation",
  "categories",
  "transfers",
]);

const VALID_ADMIN_SUBPATHS = new Set([
  "",
  "login",
  "dashboard",
  "bookings",
  "hotel-bookings",
  "flight-bookings",
  "transfer-bookings",
  "diving-course-bookings",
  "trips",
  "trip-types",
  "destinations",
  "blogs",
  "gallery",
  "reviews",
  "reviews-project",
  "faq",
  "promo-codes",
  "admins",
  "team-members",
  "services",
  "hotels",
  "transfer-locations",
  "transfer-service",
  "flight-locations",
  "diving-courses",
  "private-vehicles",
]);

function getPreferredLocale(request: NextRequest): SupportedLocale {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value?.toLowerCase();
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as SupportedLocale)) {
    return cookieLocale as SupportedLocale;
  }
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. Bypass internal Next.js assets and public files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // 2. Handle Admin routes
  if (pathname.startsWith("/admin")) {
    const adminPath = pathname.replace(/^\/admin\/?/, "").replace(/\/+$/, "");
    const topAdminSection = adminPath.split("/")[0];
    if (VALID_ADMIN_SUBPATHS.has(topAdminSection)) {
      return NextResponse.next();
    }
    return NextResponse.rewrite(new URL("/_not-found", request.url), {
      status: 404,
    });
  }

  // Normalize path segments without leading/trailing slashes
  const cleanPath = pathname.replace(/^\/+|\/+$/g, "");
  const segments = cleanPath === "" ? [] : cleanPath.split("/");

  const preferredLocale = getPreferredLocale(request);

  // 3. Handle Root route: "/" -> "/${preferredLocale}"
  if (segments.length === 0) {
    const redirectUrl = new URL(`/${preferredLocale}${search}`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  const firstSegment = segments[0].toLowerCase();

  // 4. Handle paths starting with a supported locale
  if (SUPPORTED_LOCALES.includes(firstSegment as SupportedLocale)) {
    const afterLocale = segments.slice(1); // e.g. ["blog", "2-cairo-itinerary"]
    const topSection = afterLocale[0] ?? "";
    const detailSlug = afterLocale[1];

    // Exact match: /en, /en/blog, /en/trips, etc.
    if (VALID_PUBLIC_SUBPATHS.has(afterLocale.join("/"))) {
      return NextResponse.next();
    }

    // Detail page: /en/blog/<slug>, /en/trips/<slug>, etc. (exactly 2 segments after locale)
    if (
      afterLocale.length === 2 &&
      detailSlug &&
      PUBLIC_DETAIL_SUBPATHS.has(topSection)
    ) {
      return NextResponse.next();
    }

    return NextResponse.rewrite(new URL("/_not-found", request.url), {
      status: 404,
    });
  }

  // 5. Handle valid public routes without locale prefix
  const isDirectSubpath = VALID_PUBLIC_SUBPATHS.has(cleanPath);
  const isDirectDetail =
    segments.length === 2 && PUBLIC_DETAIL_SUBPATHS.has(segments[0]);

  if (isDirectSubpath || isDirectDetail) {
    const redirectUrl = new URL(
      `/${preferredLocale}/${cleanPath}${search}`,
      request.url
    );
    return NextResponse.redirect(redirectUrl);
  }

  // 6. Unknown or invalid URL: 404
  return NextResponse.rewrite(new URL("/_not-found", request.url), {
    status: 404,
  });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
