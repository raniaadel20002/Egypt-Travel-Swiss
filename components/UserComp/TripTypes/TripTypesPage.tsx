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
    <main className="w-full bg-[#F7EDE1] py-16 sm:py-20 lg:py-28 min-h-screen">
      <div className="max-w-[1540px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12 sm:space-y-16">
        {/* Header Section with Monumental Editorial Title */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={shouldReduce ? undefined : { opacity: 0, y: 22 }}
            animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: BRAND_EASE }}
            className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[88px] font-semibold text-[#013E51] tracking-[-0.01em] leading-[1.05]"
          >
            {dict.tripTypesPage.title}
          </motion.h1>

          <motion.p
            initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
            animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: BRAND_EASE }}
            className="font-[family-name:var(--font-lato)] text-base sm:text-xl lg:text-[23px] text-[#013E51] font-normal mt-3 sm:mt-4"
          >
            {dict.tripTypesPage.subtitle}
          </motion.p>

          {/* Decorative Sun Ornament Divider */}
          <div className="flex items-center justify-center gap-3 sm:gap-5 my-6 sm:my-8 overflow-hidden">
            <motion.span
              aria-hidden="true"
              initial={shouldReduce ? undefined : { scaleX: 0 }}
              animate={shouldReduce ? undefined : { scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.12, ease: BRAND_EASE }}
              className="origin-right w-20 sm:w-36 md:w-48 lg:w-56 h-[1.5px] sm:h-[2px] bg-[#E8B34A]"
            />
            <motion.div
              initial={shouldReduce ? undefined : { opacity: 0, scale: 0.85 }}
              animate={shouldReduce ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.16, ease: BRAND_EASE }}
              className="w-12 h-7 sm:w-16 sm:h-8 flex items-center justify-center shrink-0"
            >
              <Image
                src="/Categories/sun-ornament.svg"
                alt=""
                width={56}
                height={30}
                priority
                className="w-full h-auto object-contain"
              />
            </motion.div>
            <motion.span
              aria-hidden="true"
              initial={shouldReduce ? undefined : { scaleX: 0 }}
              animate={shouldReduce ? undefined : { scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.12, ease: BRAND_EASE }}
              className="origin-left w-20 sm:w-36 md:w-48 lg:w-56 h-[1.5px] sm:h-[2px] bg-[#E8B34A]"
            />
          </div>
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 xl:gap-9">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="w-full aspect-[1/1.15] min-h-[420px] sm:min-h-[460px] xl:min-h-[520px] rounded-[22px] sm:rounded-[28px] bg-[#013E51]/10 border-[2.5px] border-[#E8B34A]/30 animate-pulse shadow-sm"
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
              className="px-6 py-3 rounded-full bg-[#013E51] text-white text-xs sm:text-sm font-bold hover:bg-[#024f67] transition-colors cursor-pointer"
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

        {/* Trip Types 3-Column Grid with Big Cards */}
        {!isLoading && !isError && tripTypes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 xl:gap-9">
            {tripTypes.map((type, idx) => (
              <TripTypeCard key={type.id} tripType={type} index={idx} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
