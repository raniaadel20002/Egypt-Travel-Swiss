"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import TripTypeCard from "./TripTypeCard";
import { useTripTypesQuery } from "@/features/tripTypes/useTripTypes";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { localeToBackendLanguage } from "@/shared/utils/localeToBackendLanguage";

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function TripTypesPage() {
  const { locale, dictionary: dict } = useLocale();
  const shouldReduce = useReducedMotion();

  const backendLanguage = useMemo(
    () => localeToBackendLanguage(locale),
    [locale]
  );

  const {
    data: tripTypes = [],
    isLoading,
    isError,
    refetch,
  } = useTripTypesQuery({
    PageSize: 100,
    language: backendLanguage,
  });

  return (
    <main className="w-full bg-[#F7EDE1] py-14 sm:py-18 lg:py-24 min-h-screen">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8 lg:px-10 space-y-10 sm:space-y-12">
        {/* Header Section */}
        <div className="text-center">
          <motion.h1
            initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
            animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: BRAND_EASE }}
            className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-5xl lg:text-[58px] font-semibold text-[#013E51] tracking-tight leading-tight"
          >
            {dict.tripTypesPage.title}
          </motion.h1>

          <motion.p
            initial={shouldReduce ? undefined : { opacity: 0, y: 14 }}
            animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: BRAND_EASE }}
            className="font-[family-name:var(--font-lato)] text-sm sm:text-base lg:text-lg text-[#013E51]/85 font-normal mt-2.5 sm:mt-3"
          >
            {dict.tripTypesPage.subtitle}
          </motion.p>

          {/* Decorative Sun Ornament Divider */}
          <motion.div
            initial={shouldReduce ? undefined : { opacity: 0, scale: 0.94 }}
            animate={shouldReduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.16, ease: BRAND_EASE }}
            className="flex items-center justify-center gap-3 sm:gap-5 my-5 sm:my-7"
          >
            <span
              aria-hidden="true"
              className="w-14 sm:w-24 md:w-32 h-[1.5px] bg-[#E8B34A]"
            />
            <div className="w-10 h-5 sm:w-12 sm:h-6 flex items-center justify-center">
              <Image
                src="/Categories/sun-ornament.svg"
                alt=""
                width={48}
                height={26}
                priority
                className="w-full h-auto object-contain"
              />
            </div>
            <span
              aria-hidden="true"
              className="w-14 sm:w-24 md:w-32 h-[1.5px] bg-[#E8B34A]"
            />
          </motion.div>
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="w-full aspect-[1/1.14] rounded-[20px] sm:rounded-[24px] bg-[#013E51]/10 border-2 border-[#E8B34A]/30 animate-pulse shadow-sm"
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <div className="text-center py-16 bg-white/60 rounded-3xl border border-rose-200/80 p-8 space-y-4 max-w-md mx-auto">
            <p className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
              {dict.tripTypesPage.errorTitle}
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="px-5 py-2.5 rounded-full bg-[#013E51] text-white text-xs font-bold hover:bg-[#024f67] transition-colors cursor-pointer"
            >
              {dict.tripTypesPage.retry}
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && tripTypes.length === 0 && (
          <div className="text-center py-16 bg-white/50 rounded-3xl border border-[#013E51]/10 p-8 max-w-md mx-auto">
            <p className="font-[family-name:var(--font-lato)] text-base text-[#013E51]/75">
              {dict.tripTypesPage.emptyTitle}
            </p>
          </div>
        )}

        {/* Trip Types 3-Column Grid */}
        {!isLoading && !isError && tripTypes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
            {tripTypes.map((type, idx) => (
              <TripTypeCard key={type.id} tripType={type} index={idx} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
