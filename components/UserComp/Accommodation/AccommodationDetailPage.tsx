"use client";

import Link from "next/link";
import { FiArrowLeft, FiCheck, FiPackage } from "react-icons/fi";
import { useHotelByIdQuery, useHotelsQuery } from "@/features/hotels/useHotels";
import { parseNumericIdFromSlug } from "@/shared/utils/slugify";
import AccommodationBookingCard from "./AccommodationBookingCard";
import AccommodationCard from "./AccommodationCard";
import AccommodationDetailHero from "./AccommodationDetailHero";

interface AccommodationDetailPageProps {
  slug: string;
  locale: string;
}

function AccommodationDetailSkeleton() {
  return (
    <div className="animate-pulse max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="h-4 bg-slate-200 rounded w-32" />
      <div className="h-8 bg-slate-200 rounded w-2/3" />
      <div className="w-full h-[360px] sm:h-[460px] bg-slate-200 rounded-3xl" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-6 bg-slate-200 rounded w-1/4" />
          <div className="h-4 bg-slate-200 rounded w-full" />
          <div className="h-4 bg-slate-200 rounded w-5/6" />
        </div>
        <div className="h-96 bg-slate-200 rounded-3xl" />
      </div>
    </div>
  );
}

export default function AccommodationDetailPage({
  slug,
  locale,
}: AccommodationDetailPageProps) {
  const hotelId = parseNumericIdFromSlug(slug);
  const backHref = `/${locale}/accommodation`;

  const {
    data: hotel,
    isLoading,
    isError,
  } = useHotelByIdQuery(hotelId, locale.toUpperCase(), true, Boolean(hotelId));

  const { data: allHotels } = useHotelsQuery();
  const otherHotels = (allHotels || [])
    .filter((h) => h.id !== hotelId)
    .slice(0, 3);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F7EDE1]/30">
        <AccommodationDetailSkeleton />
      </main>
    );
  }

  if (isError || !hotel) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-20 text-center">
        <p className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-bold text-[#013E51] mb-4">
          Accommodation Not Found
        </p>
        <p className="font-[family-name:var(--font-lato)] text-[#888888] mb-8 max-w-sm">
          The hotel or resort you requested does not exist or has been removed.
        </p>
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 font-[family-name:var(--font-lato)] text-sm font-semibold text-white bg-[#013E51] hover:bg-[#E8B34A] hover:text-[#013E51] transition-colors px-6 py-3 rounded-full"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Accommodations
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7EDE1]/20 pb-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Hero & Image Gallery */}
        <AccommodationDetailHero hotel={hotel} backHref={backHref} />

        {/* Content Body & Booking Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-10">
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* About Property */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#013E51]/10">
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51] mb-4">
                About the Property
              </h2>
              <p className="font-[family-name:var(--font-lato)] text-base sm:text-[17px] text-[#374151] leading-[1.85] whitespace-pre-line">
                {hotel.description}
              </p>
            </section>

            {/* Rate Plans & Packages */}
            {hotel.ratePlans && hotel.ratePlans.length > 0 && (
              <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#013E51]/10">
                <div className="flex items-center gap-2 mb-5">
                  <FiPackage className="w-5 h-5 text-[#E8B34A]" />
                  <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
                    Available Packages &amp; Board Plans
                  </h2>
                </div>
                <div className="space-y-4">
                  {hotel.ratePlans.map((plan) => (
                    <div
                      key={plan.id}
                      className="p-5 rounded-2xl bg-[#F7EDE1]/50 border border-[#E8B34A]/30"
                    >
                      <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-[#013E51] mb-1.5">
                        {plan.name}
                      </h3>
                      <p className="font-[family-name:var(--font-lato)] text-sm text-[#374151] leading-relaxed">
                        {plan.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Comprehensive Amenities & Facilities */}
            {hotel.facilities && hotel.facilities.length > 0 && (
              <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#013E51]/10">
                <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51] mb-6">
                  Facilities &amp; Amenities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {hotel.facilities.map((fac) => (
                    <div
                      key={fac.id || fac.name}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-100"
                    >
                      <h4 className="font-[family-name:var(--font-lato)] text-sm font-bold text-[#013E51] uppercase tracking-wider mb-2.5">
                        {fac.name}
                      </h4>
                      <ul className="space-y-1.5">
                        {(fac.values || []).map((val, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-xs sm:text-sm text-[#555555]"
                          >
                            <FiCheck className="w-4 h-4 text-[#19B8A5] shrink-0 mt-0.5" />
                            <span>{val}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sticky Booking Inquiry Column */}
          <div className="lg:col-span-1">
            <AccommodationBookingCard hotel={hotel} />
          </div>
        </div>

        {/* Other Recommended Accommodations */}
        {otherHotels.length > 0 && (
          <section className="mt-16 sm:mt-24 pt-12 border-t border-[#013E51]/10">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-bold text-[#013E51] mb-2 text-center">
              Other Handpicked Stays
            </h2>
            <p className="font-[family-name:var(--font-lato)] text-sm text-[#888888] text-center mb-10">
              Explore more luxury hotels &amp; beachfront resorts in Egypt
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {otherHotels.map((other) => (
                <AccommodationCard
                  key={other.id}
                  hotel={other}
                  onInquire={() => {}}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
