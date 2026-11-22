"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaCompass, FaCalendarAlt, FaUsers, FaMapPin, FaShieldAlt } from "react-icons/fa";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface TripBookingSuccessCardProps {
  tripTitle?: string;
  isPrivate?: boolean;
  travelDate?: string;
  travelersCount?: number | string;
  pickupLocation?: string;
}

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function TripBookingSuccessCard({
  tripTitle = "",
  isPrivate = false,
  travelDate,
  travelersCount = 1,
  pickupLocation = "",
}: TripBookingSuccessCardProps) {
  const { dictionary: dict } = useLocale();
  const shouldReduce = useReducedMotion();
  const t = dict.bookingSuccess.trip;

  const travelersText = t.travelers.replace("{count}", String(travelersCount));
  const badgeLabel = isPrivate ? t.badgePrivate : t.badgeGroup;

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
      animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay: 0.15, ease: BRAND_EASE }}
      className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#013E51]/10 space-y-6"
    >
      {/* Card Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <div className="w-12 h-12 rounded-2xl bg-[#013E51] text-[#E8B34A] flex items-center justify-center shrink-0 shadow-xs">
          <FaCompass className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#888888] uppercase tracking-wider">
              {t.eyebrow}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#013E51] text-[#E8B34A] text-[10px] font-bold uppercase">
              {badgeLabel}
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
            {tripTitle}
          </h2>
        </div>
      </div>

      {/* Grid of Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
          <FaCalendarAlt className="w-4 h-4 text-[#E8B34A] mx-auto" />
          <span className="block text-[10px] font-bold text-gray-500 uppercase">
            {t.departureDate}
          </span>
          <span className="font-bold text-xs sm:text-sm text-[#013E51] block truncate">
            {travelDate || t.eyebrow}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
          <FaUsers className="w-4 h-4 text-[#E8B34A] mx-auto" />
          <span className="block text-[10px] font-bold text-gray-500 uppercase">
            {t.groupSize}
          </span>
          <span className="font-bold text-xs sm:text-sm text-[#013E51] block">
            {travelersText}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
          <FaMapPin className="w-4 h-4 text-[#E8B34A] mx-auto" />
          <span className="block text-[10px] font-bold text-gray-500 uppercase">
            {t.pickupLocation}
          </span>
          <span className="font-bold text-xs sm:text-sm text-[#013E51] block truncate">
            {pickupLocation}
          </span>
        </div>
      </div>

      {/* Day of Trip Instructions */}
      <div className="p-4 rounded-2xl bg-[#F7EDE1]/40 border border-[#E8B34A]/30 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#013E51]">
          <FaShieldAlt className="w-3.5 h-3.5 text-[#E8B34A]" />
          <span>{t.hotelPickup}</span>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">
          {t.note}
        </p>
      </div>
    </motion.div>
  );
}
