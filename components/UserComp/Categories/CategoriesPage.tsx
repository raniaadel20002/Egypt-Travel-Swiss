"use client";

import { useMemo } from "react";
import Image from "next/image";
import CategoryCard from "./CategoryCard";
import { useTripTypesQuery } from "@/features/tripTypes/useTripTypes";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { localeToBackendLanguage } from "@/shared/utils/localeToBackendLanguage";

export default function CategoriesPage() {
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
    <div className="w-full bg-[#F7EDE1] py-12 sm:py-16 lg:py-20 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-8 sm:space-y-10 lg:space-y-12">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl lg:text-[64px] font-bold text-[#013E51] tracking-tight leading-tight">
            Find Your Way to Wonder
          </h1>

          <p className="font-[family-name:var(--font-lato)] text-base sm:text-lg lg:text-xl text-[#013E51]/80 font-normal mt-3 sm:mt-4">
            Five ways to experience the extraordinary.
          </p>

          {/* Decorative Sun Ornament Divider */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 my-6 sm:my-8">
            <span
              aria-hidden="true"
              className="w-16 sm:w-28 md:w-36 h-[1.5px] bg-[#E8B34A]"
            />
            <div className="w-12 h-6 sm:w-16 sm:h-8 flex items-center justify-center">
              <Image
                src="/Categories/sun-ornament.svg"
                alt=""
                width={64}
                height={34}
                className="w-full h-auto object-contain"
              />
            </div>
            <span
              aria-hidden="true"
              className="w-16 sm:w-28 md:w-36 h-[1.5px] bg-[#E8B34A]"
            />
          </div>
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="w-full aspect-[1.05/1] sm:aspect-square rounded-[28px] sm:rounded-[34px] lg:rounded-[38px] bg-[#013E51]/10 border-2 border-[#E8B34A]/30 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && tripTypes.length === 0 && (
          <div className="text-center py-16">
            <p className="font-[family-name:var(--font-lato)] text-lg text-[#013E51]/70">
              No categories available at the moment.
            </p>
          </div>
        )}

        {/* Backend Trip Types / Categories Grid */}
        {!isLoading && tripTypes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {tripTypes.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
