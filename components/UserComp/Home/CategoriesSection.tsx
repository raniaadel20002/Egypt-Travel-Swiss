"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { useTripTypesQuery } from "@/features/tripTypes/useTripTypes";
import { localeToBackendLanguage } from "@/shared/utils/localeToBackendLanguage";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";

const DEFAULT_IMAGE =
  "/home/Categories/5af697b0125109949149af917bc7716385d9cf04.png";

export default function CategoriesSection() {
  const { locale } = useLocale();
  const backendLanguage = useMemo(
    () => localeToBackendLanguage(locale),
    [locale]
  );

  const { data: tripTypes = [], isLoading } = useTripTypesQuery({
    PageSize: 100,
    language: backendLanguage,
  });

  return (
    <section className="w-full py-16 sm:py-20 bg-[#F7EDE1]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Title with Decorative Lines */}
        <div className="text-center mb-2">
          <div className="inline-flex flex-nowrap items-center justify-center gap-2 sm:gap-4 lg:gap-6">
            <span
              aria-hidden="true"
              className="block shrink-0 w-8 sm:w-24 md:w-28 h-[3px] rounded-l-full"
              style={{
                background:
                  "linear-gradient(to right, rgb(1, 62, 81) 0%, rgb(1, 62, 81) 35%, rgba(1, 62, 81) 0%)",
              }}
            />

            <h2 className="whitespace-nowrap font-[family-name:var(--font-cormorant)] text-2xl sm:text-4xl lg:text-[50px] font-bold tracking-[0.04em] text-[#013E51] uppercase leading-none">
              Categories
            </h2>

            <span
              aria-hidden="true"
              className="block shrink-0 w-8 sm:w-24 md:w-28 h-[3px] rounded-l-none rounded-r-full"
              style={{
                background:
                  "linear-gradient(to left, rgb(1, 62, 81) 0%, rgb(1, 62, 81) 35%, rgba(1, 62, 81, 0%)",
              }}
            />
          </div>
        </div>

        {/* Subtitle & View All Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12 text-center sm:text-left">
          <p className="font-[family-name:var(--font-lato)] text-base sm:text-xl lg:text-[22px] text-[#888888] font-normal mx-auto sm:mx-0">
            Everything for Your Egyptian Adventure
          </p>

          <Link
            href={`/${locale}/categories`}
            className="hidden sm:inline-flex items-center gap-1.5 font-[family-name:var(--font-lato)] text-base font-semibold text-[#013E51] hover:text-[#E8B34A] transition-colors group self-start sm:self-auto"
          >
            <span>View All Categories</span>
            <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="flex sm:grid overflow-x-auto sm:overflow-visible pb-3 sm:pb-0 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-7">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div
                key={idx}
                className="flex flex-col items-center w-[200px] sm:w-auto shrink-0 sm:shrink animate-pulse"
              >
                <div className="w-full aspect-[1/1.7] rounded-[200px] bg-[#013E51]/10 border-[4px] border-[#E8B34A]/30" />
                <div className="h-4 bg-gray-300 rounded w-24 mt-4" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && tripTypes.length === 0 && (
          <div className="text-center py-12">
            <p className="font-[family-name:var(--font-lato)] text-base text-[#013E51]/70">
              No categories available at the moment.
            </p>
          </div>
        )}

        {/* Backend Trip Types / Categories Grid */}
        {!isLoading && tripTypes.length > 0 && (
          <div className="flex sm:grid overflow-x-auto sm:overflow-visible pb-3 sm:pb-0 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-7 snap-x snap-mandatory">
            {tripTypes.map((type) => {
              const imageSrc = type.imageUrl
                ? resolveApiImageUrl(type.imageUrl)
                : DEFAULT_IMAGE;

              return (
                <Link
                  key={type.id}
                  href={`/${locale}/trips?type=${type.id}`}
                  className="group flex flex-col items-center w-[200px] sm:w-auto shrink-0 sm:shrink snap-center"
                >
                  {/* Arch / Pill Capsule Container with Golden Border */}
                  <div className="relative w-full aspect-[1/1.7] rounded-[200px] overflow-hidden border-[4px] sm:border-[5px] border-[#E8B34A] shadow-sm transition-all duration-300 group-hover:shadow-md bg-[#013E51]">
                    <Image
                      src={imageSrc}
                      alt={type.name}
                      fill
                      sizes="(max-width: 640px) 200px, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                    />
                  </div>

                  {/* Title */}
                  <div className="text-center mt-3.5 sm:mt-5 space-y-1">
                    <h3 className="font-[family-name:var(--font-lato)] text-base sm:text-xl lg:text-[22px] font-bold text-[#013E51] group-hover:text-[#E8B34A] transition-colors">
                      {type.name}
                    </h3>
                    <p className="font-[family-name:var(--font-lato)] text-[11px] sm:text-[13px] text-[#013E51]/80 font-bold">
                      Explore Trips
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="mt-8 sm:hidden flex justify-center w-full">
          <Link
            href={`/${locale}/categories`}
            className="w-full max-w-sm h-[50px] rounded-full border-2 border-[#013E51] text-[#013E51] font-[family-name:var(--font-lato)] font-bold text-sm flex items-center justify-center hover:bg-[#013E51] hover:text-white transition-colors"
          >
            View all Categories
          </Link>
        </div>
      </div>
    </section>
  );
}
