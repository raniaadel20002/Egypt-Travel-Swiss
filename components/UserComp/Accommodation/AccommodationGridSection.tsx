"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiX } from "react-icons/fi";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { useHotelsQuery } from "@/features/hotels/useHotels";
import { HotelApiItem } from "@/models/hotel";
import { localeToBackendLanguage } from "@/shared/utils/localeToBackendLanguage";
import AccommodationCard from "./AccommodationCard";
import AccommodationCardSkeleton from "./AccommodationCardSkeleton";
import HotelInquiryModal from "./HotelInquiryModal";
import { ErrorState, EmptyState } from "./AccommodationStates";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AccommodationGridSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale, dictionary: dict } = useLocale();
  const reduced = useReducedMotion();
  const [selectedHotel, setSelectedHotel] = useState<HotelApiItem | null>(null);

  const qParam = searchParams.get("q") || "";
  const rateParam = searchParams.get("rate")
    ? Number(searchParams.get("rate"))
    : undefined;

  const backendLanguage = localeToBackendLanguage(locale);

  const {
    data: hotels,
    isLoading,
    isError,
    refetch,
  } = useHotelsQuery({
    Language: backendLanguage,
    Search: qParam || undefined,
    Rate: rateParam,
  });

  const handleInquire = (hotel: HotelApiItem) => {
    setSelectedHotel(hotel);
  };

  const handleCloseModal = () => {
    setSelectedHotel(null);
  };

  const handleClearFilters = () => {
    router.push(`/${locale}/accommodation`);
  };

  const hasActiveFilters = Boolean(qParam || rateParam !== undefined);

  const sectionHeaderVariant = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: {
      duration: reduced ? 0.15 : 0.5,
      delay: reduced ? 0 : delay,
      ease: EASE,
    },
  });

  return (
    <section id="inquiry" className="w-full bg-[#F7EDE1] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <motion.span
              {...sectionHeaderVariant(0)}
              className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#013E51] mb-2 sm:mb-3"
            >
              {dict.accommodation.grid.eyebrow}
            </motion.span>
            <motion.h2
              {...sectionHeaderVariant(0.1)}
              className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[50px] font-bold text-[#013E51] tracking-wide leading-tight mb-2 sm:mb-3"
            >
              {dict.accommodation.grid.heading}
            </motion.h2>
            <motion.p
              {...sectionHeaderVariant(0.2)}
              className="font-[family-name:var(--font-lato)] text-sm sm:text-base text-[#013E51]/80 font-normal max-w-xl"
            >
              {dict.accommodation.grid.description}
            </motion.p>
          </div>

          {/* Active Filter Pill Badge */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#013E51]/20 shadow-xs text-xs font-semibold text-[#013E51]">
              <span>Filter:</span>
              {qParam && <span className="bg-[#FAF7F2] px-2 py-0.5 rounded-md">&quot;{qParam}&quot;</span>}
              {rateParam !== undefined && (
                <span className="bg-[#FAF7F2] px-2 py-0.5 rounded-md">{rateParam} Stars</span>
              )}
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-[#013E51]/60 hover:text-[#013E51] ml-1 cursor-pointer flex items-center gap-1"
              >
                <FiX className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>
          )}
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AccommodationCardSkeleton index={0} />
            <AccommodationCardSkeleton index={1} />
            <AccommodationCardSkeleton index={2} />
          </div>
        )}

        {/* Error State */}
        {!isLoading && isError && (
          <ErrorState dict={dict.accommodation.states} onRetry={() => refetch()} />
        )}

        {/* Empty State */}
        {!isLoading && !isError && (!hotels || hotels.length === 0) && (
          <EmptyState dict={dict.accommodation.states} />
        )}

        {/* Real Data Grid */}
        {!isLoading && !isError && hotels && hotels.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {hotels.map((hotel, index) => (
              <AccommodationCard
                key={hotel.id}
                hotel={hotel}
                index={index}
                onInquire={handleInquire}
              />
            ))}
          </div>
        )}
      </div>

      {/* Inquiry / Booking Modal */}
      <HotelInquiryModal
        hotel={selectedHotel}
        isOpen={Boolean(selectedHotel)}
        onClose={handleCloseModal}
      />
    </section>
  );
}
