"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import { useHotelByIdQuery, useHotelsQuery } from "@/features/hotels/useHotels";
import { parseNumericIdFromSlug } from "@/shared/utils/slugify";
import { useLocale } from "@/shared/providers/LocaleProvider";
import AccommodationCard from "./AccommodationCard";
import HotelDetailHeroCard from "./HotelDetailHeroCard";
import HotelAboutSection from "./HotelAboutSection";
import HotelFacilitiesGrid from "./HotelFacilitiesGrid";
import HotelBookingEngine from "./HotelBookingEngine";

interface AccommodationDetailPageProps {
  slug: string;
  locale: string;
}

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function AccommodationDetailSkeleton() {
  return (
    <div className="animate-pulse max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="h-4 bg-slate-200 rounded w-48" />
      <div className="h-9 bg-slate-200 rounded w-2/3" />
      <div className="w-full h-[400px] bg-slate-200 rounded-3xl" />
      <div className="h-40 bg-slate-200 rounded-3xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-48 bg-slate-200 rounded-3xl" />
        <div className="h-48 bg-slate-200 rounded-3xl" />
      </div>
    </div>
  );
}

export default function AccommodationDetailPage({
  slug,
  locale,
}: AccommodationDetailPageProps) {
  const { dictionary } = useLocale();
  const shouldReduce = useReducedMotion();
  const t = dictionary.accommodation.detail;

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
      <main className="min-h-screen bg-[#FBF8F3]">
        <AccommodationDetailSkeleton />
      </main>
    );
  }

  if (isError || !hotel) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-20 text-center">
        <p className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-bold text-[#013E51] mb-4">
          {t.notFoundTitle}
        </p>
        <p className="font-[family-name:var(--font-lato)] text-[#888888] mb-8 max-w-sm">
          {t.notFoundDesc}
        </p>
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 font-[family-name:var(--font-lato)] text-sm font-semibold text-white bg-[#013E51] hover:bg-[#E8B34A] hover:text-[#013E51] transition-colors px-6 py-3 rounded-full"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>{t.backToAccommodations}</span>
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBF8F3] pb-24">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        {/* Top Hero Showcase & Mosaic Gallery */}
        <motion.div
          initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
          animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: BRAND_EASE }}
        >
          <HotelDetailHeroCard hotel={hotel} backHref={backHref} />
        </motion.div>

        {/* About Property Card */}
        <motion.div
          initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
          whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.42, ease: BRAND_EASE }}
        >
          <HotelAboutSection description={hotel.description} />
        </motion.div>

        {/* Facilities & Amenities Grid */}
        <motion.div
          initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
          whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.42, ease: BRAND_EASE }}
        >
          <HotelFacilitiesGrid facilities={hotel.facilities} />
        </motion.div>

        {/* Interactive 2-Step Multi-Room Booking Engine & Live Stay Overview */}
        <motion.div
          initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
          whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45, ease: BRAND_EASE }}
        >
          <HotelBookingEngine hotel={hotel} />
        </motion.div>

        {/* Other Recommended Accommodations */}
        {otherHotels.length > 0 && (
          <motion.section
            initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
            whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: BRAND_EASE }}
            className="pt-16 border-t border-[#013E51]/10 space-y-8"
          >
            <div className="text-center space-y-1">
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-bold text-[#013E51]">
                {t.otherStaysTitle}
              </h2>
              <p className="font-[family-name:var(--font-lato)] text-sm text-[#888888]">
                {t.otherStaysSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {otherHotels.map((other) => (
                <AccommodationCard
                  key={other.id}
                  hotel={other}
                />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </main>
  );
}
