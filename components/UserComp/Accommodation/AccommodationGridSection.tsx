"use client";

import { useState } from "react";
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
  const { locale, dictionary: dict } = useLocale();
  const reduced = useReducedMotion();
  const [selectedHotel, setSelectedHotel] = useState<HotelApiItem | null>(null);

  const backendLanguage = localeToBackendLanguage(locale);

  const {
    data: hotels,
    isLoading,
    isError,
    refetch,
  } = useHotelsQuery({ Language: backendLanguage });

  const handleInquire = (hotel: HotelApiItem) => {
    setSelectedHotel(hotel);
  };

  const handleCloseModal = () => {
    setSelectedHotel(null);
  };

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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
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
