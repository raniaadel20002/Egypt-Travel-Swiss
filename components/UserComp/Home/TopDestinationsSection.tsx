"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiChevronRight } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { useDestinationsQuery } from "@/features/destinations/useDestinations";
import { localeToBackendLanguage } from "@/shared/utils/localeToBackendLanguage";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";

const DEFAULT_IMAGE =
  "/home/destnation/5b4d6afe2ce17f5d0136422bb6f1990407152f95.jpg";

export default function TopDestinationsSection() {
  const { locale } = useLocale();
  const backendLanguage = useMemo(
    () => localeToBackendLanguage(locale),
    [locale]
  );

  const { data: destinations = [], isLoading } = useDestinationsQuery({
    PageSize: 100,
    language: backendLanguage,
  });

  const displayDestinations = destinations.slice(0, 4);

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-14 bg-white overflow-hidden">
      {/* Mountain Watermark (Top-Left): Subtle outline accent on left edge */}
      <div className="absolute left-0 top-12 sm:top-14 md:top-16 lg:top-18 w-[140px] sm:w-[170px] md:w-[200px] lg:w-[230px] pointer-events-none z-0">
        <Image
          src="/home/destnation/Gemini_Generated_Image_k0fqckk0fqckk0fq-removebg-preview 1.svg"
          alt=""
          width={230}
          height={139}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Sun Watermark (Top-Right): Delicate half-sun on right edge */}
      <div className="absolute right-0 top-6 sm:top-8 md:top-10 lg:top-12 w-[32px] sm:w-[40px] md:w-[48px] lg:w-[56px] pointer-events-none z-0">
        <Image
          src="/home/destnation/garden_sun-fill-16.svg"
          alt=""
          width={56}
          height={106}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Title with Decorative Lines */}
        <div className="text-center mb-2 ">
          <div className="inline-flex flex-nowrap items-center justify-center gap-2 sm:gap-4 lg:gap-6">
            <span
              aria-hidden="true"
              className="block shrink-0 w-8 sm:w-24 md:w-28 h-[3px] rounded-l-full"
              style={{
                background: "linear-gradient(to right, #013E51, transparent)",
              }}
            />

            <h2 className="whitespace-nowrap font-[family-name:var(--font-cormorant)] text-2xl sm:text-4xl lg:text-[50px] font-bold tracking-[0.04em] text-[#013E51] leading-tight">
              Top Destinations
            </h2>

            <span
              aria-hidden="true"
              className="block shrink-0 w-8 sm:w-24 md:w-28 h-[3px] rounded-r-full"
              style={{
                background: "linear-gradient(to left, #013E51, transparent)",
              }}
            />
          </div>
        </div>

        {/* Section Subtitle */}
        <p className="font-[family-name:var(--font-lato)] text-center text-sm sm:text-base text-[#013E51]/80 max-w-xl mx-auto mb-6 sm:mb-8">
          Sea, desert and history in perfect harmony
        </p>

        {/* View All Destinations Link */}
        <div className="flex justify-start sm:justify-end mb-4 sm:mb-5">
          <Link
            href={`/${locale}/destinations`}
            className="inline-flex items-center gap-1.5 font-[family-name:var(--font-lato)] text-sm sm:text-base font-semibold text-[#013E51] hover:text-[#E8B34A] transition-colors group"
          >
            <span>View All Destinations</span>
            <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Cards Wrapper with Anchored Watermarks */}
        <div className="relative">
          {/* Camel Watermark (Center): Small delicate line art resting above the gap */}
          <div className="hidden sm:block absolute -top-8 sm:-top-9 md:-top-10 lg:-top-11 left-1/2 -translate-x-1/2 w-[64px] sm:w-[76px] md:w-[86px] lg:w-[96px] pointer-events-none z-0">
            <Image
              src="/home/destnation/camal.svg"
              alt=""
              width={96}
              height={67}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Palm Tree (Bottom-Left): Small silhouette accent */}
          <div className="hidden md:block absolute -bottom-15 left-2 sm:-bottom-0 md:-bottom-7 lg:-bottom-15 -left-29 sm:-left-29 md:left-2 lg:-left-29 w-[80px] sm:w-[95px] md:w-[110px] lg:w-[125px] pointer-events-none z-0">
            <Image
              src="/home/destnation/Vector.svg"
              alt=""
              width={125}
              height={136}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Palm Tree (Bottom-Right): Small silhouette accent, mirrored */}
          <div className="hidden md:block absolute -bottom-15 sm:-bottom-12 md:-bottom-12 lg:-bottom-15 -right-29 sm:-right-3 md:-right-4 lg:-right-29 w-[80px] sm:w-[95px] md:w-[110px] lg:w-[125px] pointer-events-none z-0 scale-x-[-1]">
            <Image
              src="/home/destnation/Vector.svg"
              alt=""
              width={125}
              height={136}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Loading Skeleton */}
          {isLoading && (
            <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-7">
              {[1, 2, 3, 4].map((idx) => (
                <div
                  key={idx}
                  className="aspect-[1/1.3] sm:aspect-[1/1.1] lg:aspect-[1/1.05] rounded-[20px] sm:rounded-[28px] bg-[#013E51]/10 animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && displayDestinations.length === 0 && (
            <div className="relative z-10 text-center py-10">
              <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base text-[#013E51]/70">
                No destinations available at the moment.
              </p>
            </div>
          )}

          {/* Actual Backend Destinations */}
          {!isLoading && displayDestinations.length > 0 && (
            <div
              className={`relative z-10 grid gap-3.5 sm:gap-6 lg:gap-7 ${
                displayDestinations.length === 1
                  ? "grid-cols-1 max-w-sm mx-auto"
                  : "grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {displayDestinations.map((dest) => {
                const imageSrc = dest.imageUrl
                  ? resolveApiImageUrl(dest.imageUrl)
                  : DEFAULT_IMAGE;

                return (
                  <Link
                    key={dest.id}
                    href={`/${locale}/trips?dest=${dest.id}`}
                    className="group relative block aspect-[1/1.3] sm:aspect-[1/1.1] lg:aspect-[1/1.05] rounded-[20px] sm:rounded-[28px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-[#013E51]"
                  >
                    <Image
                      src={imageSrc}
                      alt={dest.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Bottom Gradient Overlay */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#013E51]/95 via-[#013E51]/25 to-transparent"
                    />

                    {/* Card Bottom Content */}
                    <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-5 lg:p-6 flex items-end justify-between z-10">
                      <div className="pr-1 sm:pr-3">
                        <h3 className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl lg:text-[28px] font-bold text-white tracking-wide leading-tight mb-1">
                          {dest.name}
                        </h3>
                        {dest.tripsCount !== undefined && (
                          <p className="font-[family-name:var(--font-lato)] text-[11px] sm:text-xs lg:text-sm text-white/85 font-normal leading-snug line-clamp-2">
                            {dest.tripsCount}{" "}
                            {dest.tripsCount === 1 ? "Trip" : "Trips"}
                          </p>
                        )}
                      </div>

                      <div className="hidden sm:flex shrink-0 w-8 h-8 rounded-full items-center justify-center text-white transition-transform group-hover:translate-x-1">
                        <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
