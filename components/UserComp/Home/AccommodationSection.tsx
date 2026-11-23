"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { useHotelsQuery } from "@/features/hotels/useHotels";
import { localeToBackendLanguage } from "@/shared/utils/localeToBackendLanguage";
import AccommodationCard from "../Accommodation/AccommodationCard";
import AccommodationCardSkeleton from "../Accommodation/AccommodationCardSkeleton";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AccommodationSection() {
  const { locale, dictionary: dict } = useLocale();
  const reduced = useReducedMotion();

  const backendLanguage = useMemo(
    () => localeToBackendLanguage(locale),
    [locale]
  );

  const {
    data: hotels,
    isLoading,
    isError,
  } = useHotelsQuery({ Language: backendLanguage });

  // Show only first 3 hotels for homepage
  const displayHotels = useMemo(() => {
    return hotels?.slice(0, 3) || [];
  }, [hotels]);

  const headerVariant = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: {
      duration: reduced ? 0.15 : 0.6,
      delay: reduced ? 0 : delay,
      ease: EASE,
    },
  });

  return (
    <section id="accommodation" className="w-full bg-[#013E51] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header: Left details & Right View All button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <motion.span
              {...headerVariant(0)}
              className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#E8B34A] mb-2 sm:mb-3"
            >
              {dict.homePage?.accommodation?.eyebrow || "Stay With Us"}
            </motion.span>
            <motion.h2
              {...headerVariant(0.1)}
              className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[50px] font-bold text-white tracking-wide leading-tight mb-2 sm:mb-3"
            >
              {dict.homePage?.accommodation?.heading || "Accommodation in Egypt"}
            </motion.h2>
            <motion.p
              {...headerVariant(0.2)}
              className="font-[family-name:var(--font-lato)] text-sm sm:text-base text-white/80 font-normal max-w-xl"
            >
              {dict.homePage?.accommodation?.subtitle || "Handpicked hotels & resorts, from the Red Sea to the Nile."}
            </motion.p>
          </div>

          <motion.div
            {...headerVariant(0.3)}
            className="hidden sm:block"
          >
            <Link
              href={`/${locale}/accommodation`}
              className="inline-flex self-start sm:self-auto px-7 sm:px-8 py-2.5 sm:py-3 rounded-full border border-white/90 text-white font-[family-name:var(--font-lato)] text-sm sm:text-base font-medium hover:bg-white hover:text-[#013E51] transition-all duration-300 shadow-sm"
            >
              {dict.homePage?.accommodation?.viewAll || "View All"}
            </Link>
          </motion.div>
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            <AccommodationCardSkeleton index={0} />
            <AccommodationCardSkeleton index={1} />
            <AccommodationCardSkeleton index={2} />
          </div>
        )}

        {/* Error State */}
        {!isLoading && isError && (
          <div className="bg-white/10 backdrop-blur-sm rounded-[24px] p-8 sm:p-12 text-center border border-white/20">
            <p className="font-[family-name:var(--font-lato)] text-base text-white/90 mb-4">
              {dict.homePage?.accommodation?.errorLoading || "Unable to load accommodations at this time."}
            </p>
            <Link
              href={`/${locale}/accommodation`}
              className="inline-flex px-6 py-2.5 rounded-full bg-white text-[#013E51] font-[family-name:var(--font-lato)] text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              {dict.homePage?.accommodation?.browseAll || "Browse All Hotels"}
            </Link>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && displayHotels.length === 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-[24px] p-8 sm:p-12 text-center border border-white/20">
            <p className="font-[family-name:var(--font-lato)] text-base text-white/90">
              {dict.homePage?.accommodation?.noHotels || "No accommodations available at the moment."}
            </p>
          </div>
        )}

        {/* 3 Accommodation Cards Grid */}
        {!isLoading && !isError && displayHotels.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            {displayHotels.map((hotel, index) => (
              <AccommodationCard
                key={hotel.id}
                hotel={hotel}
                index={index}
                showInquire={false}
              />
            ))}
          </div>
        )}

        {/* Mobile View All Button */}
        <motion.div
          {...headerVariant(0.4)}
          className="mt-8 text-center block sm:hidden"
        >
          <Link
            href={`/${locale}/accommodation`}
            className="w-full inline-flex items-center justify-center py-3.5 px-8 rounded-full border border-white text-white font-[family-name:var(--font-lato)] font-bold text-sm hover:bg-white/10 transition-colors shadow-sm"
          >
            {dict.homePage?.accommodation?.viewAll || "View All"}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
