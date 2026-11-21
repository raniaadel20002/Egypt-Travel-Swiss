import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/features/i18n/i18nConfig";

const PUBLIC_FILE = /\.(.*)$/;

// Only pages that have explicit Figma designs in the design system
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
    // Unknown admin route -> render 404 directly without redirect
    return NextResponse.rewrite(new URL("/_not-found", request.url), {
      status: 404,
    });
  }

  // Normalize path segments without leading/trailing slashes
  const cleanPath = pathname.replace(/^\/+|\/+$/g, "");
  const segments = cleanPath === "" ? [] : cleanPath.split("/");

  // 3. Handle Root route: "/" -> "/${DEFAULT_LOCALE}"
  if (segments.length === 0) {
    const redirectUrl = new URL(`/${DEFAULT_LOCALE}${search}`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  const firstSegment = segments[0];

  // 4. Handle paths starting with a supported locale (e.g., "/en", "/de", "/ar")
  if (SUPPORTED_LOCALES.includes(firstSegment as typeof SUPPORTED_LOCALES[number])) {
    const subpath = segments.slice(1).join("/");
    if (VALID_PUBLIC_SUBPATHS.has(subpath)) {
      return NextResponse.next();
    }
    // Subpath does not match any valid route under locale -> 404 without redirect
    return NextResponse.rewrite(new URL("/_not-found", request.url), {
      status: 404,
    });
  }

  // 5. Handle valid public routes without locale prefix (e.g., "/trips" -> "/en/trips")
  if (VALID_PUBLIC_SUBPATHS.has(cleanPath)) {
    const redirectUrl = new URL(
      `/${DEFAULT_LOCALE}/${cleanPath}${search}`,
      request.url
    );
    return NextResponse.redirect(redirectUrl);
  }

  // 6. Unknown or invalid URL: never redirect to unrelated page, render 404 directly
  return NextResponse.rewrite(new URL("/_not-found", request.url), {
    status: 404,
  });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
