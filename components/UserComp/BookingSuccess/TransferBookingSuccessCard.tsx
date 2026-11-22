"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  FaCar,
  FaCalendarAlt,
  FaUsers,
  FaTag,
  FaFileAlt,
  FaCheckCircle,
  FaUser,
  FaClock,
  FaArrowRight,
  FaExchangeAlt,
} from "react-icons/fa";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface TransferBookingSuccessCardProps {
  id?: string;
  fromLocation?: string;
  toLocation?: string;
  vehicleName?: string;
  tripType?: string;
  tripDate?: string;
  tripTime?: string;
  adults?: number | string;
  children?: number | string;
  totalPersons?: number | string;
  customerName?: string;
  phoneNumber?: string;
  email?: string;
  price?: number | string;
  currency?: string;
  status?: string;
  notes?: string;
  returnDate?: string;
  returnTime?: string;
}

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function TransferBookingSuccessCard({
  id = "",
  fromLocation = "",
  toLocation = "",
  vehicleName = "",
  tripType = "OneWay",
  tripDate = "",
  tripTime = "",
  adults = 2,
  children = 0,
  totalPersons = 2,
  customerName = "",
  phoneNumber = "",
  price = 0,
  currency = "EUR",
  status = "Pending",
  notes = "",
  returnDate = "",
  returnTime = "",
}: TransferBookingSuccessCardProps) {
  const { dictionary: dict } = useLocale();
  const shouldReduce = useReducedMotion();
  const t = dict.bookingSuccess.transfer;

  const numericPrice = typeof price === "number" ? price : parseFloat(String(price || "0"));
  const shortId = id ? `#${id.slice(0, 8).toUpperCase()}` : "";
  const normalizedTripType = String(tripType || "").toLowerCase().replace(/[\s_-]/g, "");
  const isRoundTrip =
    normalizedTripType === "roundtrip" ||
    normalizedTripType === "2" ||
    Boolean(returnDate);

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
      animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay: 0.15, ease: BRAND_EASE }}
      className="bg-white rounded-[28px] sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-[#013E51]/10 border-t-4 border-t-[#E8B34A] space-y-6 overflow-hidden"
    >
      {/* Header: Vehicle Name, Reference ID & Status Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#013E51] text-[#E8B34A] flex items-center justify-center shrink-0 shadow-xs">
            <FaCar className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#888888] uppercase tracking-wider block">
                {t.eyebrow}
              </span>
              {shortId && (
                <span className="font-mono text-xs font-bold text-[#013E51] bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-gray-200">
                  {shortId}
                </span>
              )}
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51] tracking-tight">
              {vehicleName || "Private Luxury Vehicle"}
            </h2>
          </div>
        </div>

        {/* Live Status Indicators */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs">
            <FaClock className="w-3 h-3" />
            {status}
          </span>
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#013E51] text-[#E8B34A] shadow-2xs">
            {isRoundTrip ? "Round Trip" : "One Way"}
          </span>
        </div>
      </div>

      {/* Premium Boarding-Pass Style Route Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#FAF7F2] via-white to-[#FAF7F2] p-5 sm:p-6 border border-[#013E51]/10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-5 sm:gap-6">
          {/* Origin / Pickup Point */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#888888] uppercase tracking-wider block">
              {t.pickupPoint}
            </span>
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#19B8A5] shrink-0 ring-4 ring-[#19B8A5]/20" />
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
                {fromLocation || "Pickup Point"}
              </h3>
            </div>
            {tripDate && (
              <p className="text-xs text-[#555555] font-medium pl-5.5">
                {tripDate} {tripTime ? `at ${tripTime}` : ""}
              </p>
            )}
          </div>

          {/* Connector with Round-Trip (⇄) or One-Way (→) Indicator */}
          <div className="flex flex-col items-center justify-center gap-1.5 py-1 md:py-0">
            <div className="flex items-center gap-1 text-[#013E51]/30">
              <span className="w-8 sm:w-12 border-b-2 border-dashed border-[#013E51]/20" />
              <div
                className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-2xs flex items-center justify-center text-[#E8B34A]"
                title={isRoundTrip ? "Round Trip" : "One Way"}
              >
                {isRoundTrip ? (
                  <FaExchangeAlt className="w-3.5 h-3.5 text-[#E8B34A]" />
                ) : (
                  <FaArrowRight className="w-3.5 h-3.5 text-[#E8B34A]" />
                )}
              </div>
              <span className="w-8 sm:w-12 border-b-2 border-dashed border-[#013E51]/20" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#013E51]/60">
              {isRoundTrip ? "Round Trip" : "One Way"}
            </span>
          </div>

          {/* Destination */}
          <div className="space-y-1 md:text-right">
            <span className="text-[10px] font-bold text-[#888888] uppercase tracking-wider block">
              {t.destination}
            </span>
            <div className="flex items-center md:justify-end gap-2.5">
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
                {toLocation || "Destination"}
              </h3>
              <span className="w-3 h-3 rounded-full bg-[#E8B34A] shrink-0 ring-4 ring-[#E8B34A]/20" />
            </div>
            {isRoundTrip && returnDate && (
              <p className="text-xs text-[#555555] font-medium pr-5.5">
                Return: {returnDate} {returnTime ? `at ${returnTime}` : ""}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Balanced 4-Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Metric 1: Departure Schedule */}
        <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-2xs space-y-1.5 hover:border-gray-200 transition">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            <FaCalendarAlt className="w-3.5 h-3.5 text-[#E8B34A]" />
            <span>{t.schedule}</span>
          </div>
          <span className="font-bold text-sm text-[#013E51] block truncate">
            {tripDate || "Confirmed"} {tripTime ? `at ${tripTime}` : ""}
          </span>
        </div>

        {/* Metric 2: Passenger Count */}
        <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-2xs space-y-1.5 hover:border-gray-200 transition">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            <FaUsers className="w-3.5 h-3.5 text-[#E8B34A]" />
            <span>{t.passengers}</span>
          </div>
          <span className="font-bold text-sm text-[#013E51] block">
            {totalPersons} Guests ({adults} Adults{Number(children) > 0 ? `, ${children} Children` : ""})
          </span>
        </div>

        {/* Metric 3: Primary Contact */}
        <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-2xs space-y-1.5 hover:border-gray-200 transition">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            <FaUser className="w-3.5 h-3.5 text-[#E8B34A]" />
            <span>Primary Contact</span>
          </div>
          <span className="font-bold text-sm text-[#013E51] block truncate">
            {customerName} {phoneNumber ? `• ${phoneNumber}` : ""}
          </span>
        </div>

        {/* Metric 4: Total Price */}
        <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-2xs space-y-1.5 hover:border-gray-200 transition">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            <FaTag className="w-3.5 h-3.5 text-[#E8B34A]" />
            <span>{t.totalFare}</span>
          </div>
          <span className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-[#013E51] block truncate">
            &euro;{numericPrice.toFixed(2)} {currency}
          </span>
        </div>
      </div>

      {/* Special Requests / Flight Note (Only if provided) */}
      {notes && (
        <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#013E51]/10 flex items-start gap-3">
          <FaFileAlt className="w-4 h-4 text-[#E8B34A] mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-[#888888] uppercase tracking-wider block">
              {t.notes}
            </span>
            <p className="text-xs font-semibold text-[#013E51]">
              &ldquo;{notes}&rdquo;
            </p>
          </div>
        </div>
      )}

      {/* Driver Meet & Greet Guidance Notice */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#013E51]/5 border border-[#013E51]/15 text-xs text-[#013E51] font-medium leading-relaxed flex items-center gap-3.5">
        <div className="w-8 h-8 rounded-full bg-[#19B8A5]/20 flex items-center justify-center shrink-0 text-[#19B8A5]">
          <FaCheckCircle className="w-4 h-4" />
        </div>
        <div>
          <span className="font-bold text-[#013E51] block text-xs mb-0.5">
            VIP Chauffeur Service Included
          </span>
          <span className="text-[#555555]">{t.note}</span>
        </div>
      </div>
    </motion.div>
  );
}
