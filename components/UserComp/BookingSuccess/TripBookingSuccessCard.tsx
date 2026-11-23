"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaCompass, FaCalendarAlt, FaUsers, FaMapPin, FaShieldAlt } from "react-icons/fa";
import { FiDollarSign } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface TripBookingSuccessCardProps {
  tripTitle?: string;
  isPrivate?: boolean;
  travelDate?: string;
  travelersCount?: number | string;
  pickupLocation?: string;
  tripsCount?: number | string;
  totalAmount?: string;
  fullTotal?: string;
  depositPaid?: string;
  remainingAmount?: string;
  currency?: string;
  onContact?: boolean;
  paymentStatus?: string;
  captureId?: string;
  bookingRef?: string;
}

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function TripBookingSuccessCard({
  tripTitle = "",
  isPrivate = false,
  travelDate,
  travelersCount = 1,
  pickupLocation = "",
  tripsCount = 1,
  totalAmount,
  fullTotal,
  depositPaid,
  remainingAmount,
  currency = "EUR",
  onContact = false,
  paymentStatus,
  captureId,
  bookingRef,
}: TripBookingSuccessCardProps) {
  const { dictionary: dict } = useLocale();
  const shouldReduce = useReducedMotion();
  const t = dict.bookingSuccess.trip;

  const travelersText = t.travelers.replace("{count}", String(travelersCount));
  const numericTripsCount = Number(tripsCount) || 1;
  const displayTitle =
    numericTripsCount > 1
      ? `${tripTitle} (+${numericTripsCount - 1} more excursion${numericTripsCount > 2 ? "s" : ""})`
      : tripTitle;

  const badgeLabel =
    numericTripsCount > 1
      ? `${numericTripsCount} Excursions Booked`
      : isPrivate
      ? t.badgePrivate
      : t.badgeGroup;

  const numFullTotal = Number(fullTotal || totalAmount || 0);
  const numDeposit =
    depositPaid && Number(depositPaid) > 0 && Number(depositPaid) < numFullTotal
      ? Number(depositPaid)
      : numFullTotal * 0.5;
  const numRemaining =
    remainingAmount && Number(remainingAmount) > 0 && Number(remainingAmount) <= numFullTotal
      ? Number(remainingAmount)
      : Math.max(0, numFullTotal - numDeposit);

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
      animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay: 0.15, ease: BRAND_EASE }}
      className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#013E51]/10 space-y-6 font-[family-name:var(--font-lato)]"
    >
      {/* Card Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <div className="w-12 h-12 rounded-2xl bg-[#013E51] text-[#E8B34A] flex items-center justify-center shrink-0 shadow-xs">
          <FaCompass className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#888888] uppercase tracking-wider">
              {t.eyebrow}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#013E51] text-[#E8B34A] text-[10px] font-bold uppercase truncate">
              {badgeLabel}
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51] truncate">
            {displayTitle}
          </h2>
        </div>
      </div>

      {/* Grid of Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
            {pickupLocation || "Hotel Lobby"}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
          <FiDollarSign className="w-4 h-4 text-[#E8B34A] mx-auto" />
          <span className="block text-[10px] font-bold text-gray-500 uppercase">
            Booking Total
          </span>
          <span className="font-bold text-xs sm:text-sm text-[#013E51] block truncate">
            {numFullTotal > 0 ? (
              onContact ? (
                `€${numFullTotal.toFixed(0)} + Contact`
              ) : (
                `€${numFullTotal.toFixed(2)}`
              )
            ) : onContact ? (
              "On Contact"
            ) : (
              "Registered"
            )}
          </span>
        </div>
      </div>

      {/* Online Payment Receipt Strip */}
      {paymentStatus && (
        <div className="p-4 rounded-2xl bg-[#013E51] text-white space-y-2.5 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-white/15">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#E8B34A] text-[#013E51] font-bold uppercase tracking-wider text-[10px]">
                {paymentStatus} (50% Deposit)
              </span>
              {bookingRef && (
                <span className="text-white/80 font-mono">Ref: {bookingRef}</span>
              )}
            </div>
            {captureId && (
              <span className="font-mono text-[11px] text-white/70">
                Transaction: {captureId}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
            <div className="flex justify-between sm:flex-col">
              <span className="text-white/60">50% Deposit Paid:</span>
              <span className="font-bold text-[#E8B34A]">
                {numDeposit.toFixed(2)} {currency}
              </span>
            </div>
            <div className="flex justify-between sm:flex-col">
              <span className="text-white/60">50% Due on Arrival:</span>
              <span className="font-bold text-white/90">
                {numRemaining.toFixed(2)} {currency}
              </span>
            </div>
            <div className="flex justify-between sm:flex-col">
              <span className="text-white/60">Total Excursion Value:</span>
              <span className="font-bold text-white">
                {numFullTotal.toFixed(2)} {currency}
              </span>
            </div>
          </div>
        </div>
      )}

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
