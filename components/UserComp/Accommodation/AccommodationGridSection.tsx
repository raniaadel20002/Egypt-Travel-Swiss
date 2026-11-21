"use client";

import { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { useHotelsQuery } from "@/features/hotels/useHotels";
import { HotelApiItem } from "@/models/hotel";
import AccommodationCard from "./AccommodationCard";
import AccommodationCardSkeleton from "./AccommodationCardSkeleton";
import HotelInquiryModal from "./HotelInquiryModal";

export default function AccommodationGridSection() {
  const [selectedHotel, setSelectedHotel] = useState<HotelApiItem | null>(null);

  const {
    data: hotels,
    isLoading,
    isError,
    refetch,
  } = useHotelsQuery();

  const handleInquire = (hotel: HotelApiItem) => {
    setSelectedHotel(hotel);
  };

  const handleCloseModal = () => {
    setSelectedHotel(null);
  };

  return (
    <section id="inquiry" className="w-full bg-[#F7EDE1] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <span className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#013E51] mb-2 sm:mb-3">
              Stay With Us
            </span>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[50px] font-bold text-[#013E51] tracking-wide leading-tight mb-2 sm:mb-3">
              Accommodation in Egypt
            </h2>
            <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base text-[#013E51]/80 font-normal max-w-xl">
              Handpicked hotels &amp; luxury resorts, from the Red Sea to the Nile.
            </p>
          </div>
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AccommodationCardSkeleton />
            <AccommodationCardSkeleton />
            <AccommodationCardSkeleton />
          </div>
        )}

        {/* Error State */}
        {!isLoading && isError && (
          <div className="bg-white rounded-3xl p-10 text-center max-w-md mx-auto shadow-sm border border-[#013E51]/10">
            <p className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51] mb-2">
              Unable to Load Accommodations
            </p>
            <p className="font-[family-name:var(--font-lato)] text-sm text-[#888888] mb-6">
              There was an issue connecting to the server. Please try again.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 bg-[#013E51] hover:bg-[#E8B34A] hover:text-[#013E51] text-white font-[family-name:var(--font-lato)] font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-all cursor-pointer shadow-sm"
            >
              <FiRefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && (!hotels || hotels.length === 0) && (
          <div className="bg-white rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm border border-[#013E51]/10">
            <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51] mb-2">
              No Accommodations Found
            </h3>
            <p className="font-[family-name:var(--font-lato)] text-sm text-[#888888]">
              We are currently curating new luxury stays across Egypt. Check back soon!
            </p>
          </div>
        )}

        {/* Real Data Grid */}
        {!isLoading && !isError && hotels && hotels.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {hotels.map((hotel) => (
              <AccommodationCard
                key={hotel.id}
                hotel={hotel}
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
