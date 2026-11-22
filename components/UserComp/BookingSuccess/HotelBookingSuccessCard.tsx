"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaHotel, FaMapMarkerAlt, FaCalendarAlt, FaMoon, FaBed, FaUsers } from "react-icons/fa";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface HotelBookingSuccessCardProps {
  hotelName?: string;
  location?: string;
  checkInDate?: string;
  nightsCount?: number | string;
  roomsCount?: number | string;
  adults?: number | string;
  children?: number | string;
  infants?: number | string;
  ratePlanName?: string;
}

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function HotelBookingSuccessCard({
  hotelName = "",
  location = "",
  checkInDate,
  nightsCount = 1,
  roomsCount = 1,
  adults = 1,
  children = 0,
  infants = 0,
  ratePlanName = "",
}: HotelBookingSuccessCardProps) {
  const { dictionary: dict } = useLocale();
  const shouldReduce = useReducedMotion();
  const t = dict.bookingSuccess.hotel;

  const nightsDisplay =
    Number(nightsCount) === 1
      ? t.oneNight
      : t.nights.replace("{count}", String(nightsCount));

  const roomsDisplay = t.roomCount.replace("{count}", String(roomsCount));

  const adultsText = t.adults.replace("{count}", String(adults));
  const childrenText =
    Number(children) > 0 ? `, ${t.children.replace("{count}", String(children))}` : "";
  const infantsText =
    Number(infants) > 0 ? `, ${t.infants.replace("{count}", String(infants))}` : "";

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
          <FaHotel className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] font-bold text-[#888888] uppercase tracking-wider block">
            {t.eyebrow}
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
            {hotelName}
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-[#19B8A5] font-semibold mt-0.5">
            <FaMapMarkerAlt className="w-3.5 h-3.5 shrink-0" />
            <span>{location}</span>
          </div>
        </div>
      </div>

      {/* Grid of Key Stay Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
          <FaCalendarAlt className="w-4 h-4 text-[#E8B34A] mx-auto" />
          <span className="block text-[10px] font-bold text-gray-500 uppercase">
            {t.checkIn}
          </span>
          <span className="font-bold text-xs sm:text-sm text-[#013E51] block truncate">
            {checkInDate || t.badge}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
          <FaMoon className="w-4 h-4 text-[#E8B34A] mx-auto" />
          <span className="block text-[10px] font-bold text-gray-500 uppercase">
            {t.duration}
          </span>
          <span className="font-bold text-xs sm:text-sm text-[#013E51] block">
            {nightsDisplay}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
          <FaBed className="w-4 h-4 text-[#E8B34A] mx-auto" />
          <span className="block text-[10px] font-bold text-gray-500 uppercase">
            {t.rooms}
          </span>
          <span className="font-bold text-xs sm:text-sm text-[#013E51] block">
            {roomsDisplay}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
          <FaUsers className="w-4 h-4 text-[#E8B34A] mx-auto" />
          <span className="block text-[10px] font-bold text-gray-500 uppercase">
            {t.guests}
          </span>
          <span className="font-bold text-xs sm:text-sm text-[#013E51] block truncate">
            {adultsText}{childrenText}{infantsText}
          </span>
        </div>
      </div>

      {/* Package & Inclusions Highlight */}
      <div className="p-4 rounded-2xl bg-[#F7EDE1]/40 border border-[#E8B34A]/30 space-y-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#013E51] block">
          {t.ratePlan}
        </span>
        <p className="font-[family-name:var(--font-cormorant)] text-lg font-bold text-[#013E51]">
          {ratePlanName}
        </p>
        <p className="text-xs text-gray-600 leading-relaxed">
          {t.conciergeNote}
        </p>
      </div>
    </motion.div>
  );
}
