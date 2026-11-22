"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { FaCompass } from "react-icons/fa";
import { HotelApiItem } from "@/models/hotel";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { SelectedRoomItem } from "./HotelRoomSelectionStep";
import { GuestDetailsState } from "./HotelGuestDetailsStep";

interface HotelReservationSummarySidebarProps {
  hotel: HotelApiItem;
  selectedRooms: SelectedRoomItem[];
  guestDetails: GuestDetailsState;
}

const FALLBACK_IMAGE =
  "/Accommodation/11321959834a248722878fa22ef11979f7f876d0.jpg";

function formatDisplayDate(dateStr: string, locale: string, fallbackText: string): string {
  if (!dateStr) return fallbackText;
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString(locale || "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function HotelReservationSummarySidebar({
  hotel,
  selectedRooms,
  guestDetails,
}: HotelReservationSummarySidebarProps) {
  const { locale, dictionary } = useLocale();
  const shouldReduce = useReducedMotion();
  const b = dictionary.accommodation.detail.booking;

  const primaryImg =
    hotel.images && hotel.images.length > 0
      ? resolveApiImageUrl(hotel.images[0].imageUrl)
      : FALLBACK_IMAGE;

  const totalAdults = selectedRooms.reduce((acc, r) => acc + r.adults, 0);
  const totalChildren = selectedRooms.reduce((acc, r) => acc + r.children, 0);
  const totalInfants = selectedRooms.reduce((acc, r) => acc + r.infants, 0);

  return (
    <motion.aside
      initial={shouldReduce ? undefined : { opacity: 0, x: 14 }}
      animate={shouldReduce ? undefined : { opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-3xl p-6 sm:p-7 shadow-lg border border-[#013E51]/10 sticky top-28 self-start space-y-6"
    >
      {/* Header with LIVE STAY OVERVIEW badge */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <span className="block font-[family-name:var(--font-lato)] text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#E8B34A] mb-1">
            {b.sidebarEyebrow}
          </span>
          <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
            {b.sidebarHeading}
          </h3>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#013E51] text-[#E8B34A] flex items-center justify-center shrink-0">
          <FaCompass className="w-4 h-4" />
        </div>
      </div>

      {/* Property Snippet Card */}
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
        <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-200">
          <Image
            src={primaryImg}
            alt={hotel.name}
            fill
            sizes="60px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <h4 className="font-[family-name:var(--font-cormorant)] text-base font-bold text-[#013E51] truncate">
            {hotel.name}
          </h4>
          <p className="font-[family-name:var(--font-lato)] text-xs text-[#888888] truncate">
            {hotel.location}
          </p>
        </div>
      </div>

      {/* Check-in & Duration Box */}
      <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#F7EDE1]/40 border border-[#E8B34A]/30 text-center">
        <div className="space-y-0.5">
          <span className="block text-[10px] font-bold text-[#888888] uppercase tracking-wider">
            {b.checkIn}
          </span>
          <span className="font-bold text-xs sm:text-sm text-[#013E51]">
            {formatDisplayDate(guestDetails.checkInDate, locale, b.selectDate)}
          </span>
        </div>
        <div className="space-y-0.5 border-l border-[#E8B34A]/30">
          <span className="block text-[10px] font-bold text-[#888888] uppercase tracking-wider">
            {b.stayDuration}
          </span>
          <span className="font-bold text-xs sm:text-sm text-[#013E51]">
            {guestDetails.nightsCount}{" "}
            {guestDetails.nightsCount === 1 ? b.nightSingle : b.nightPlural}
          </span>
        </div>
      </div>

      {/* Aggregated Guests */}
      <div className="space-y-2">
        <span className="block text-[11px] font-bold text-[#888888] uppercase tracking-wider">
          {b.totalGuests}
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#013E51] text-white text-xs font-bold">
            {totalAdults} {totalAdults === 1 ? b.adult : b.adults}
          </span>
          <span className="px-3 py-1 rounded-full bg-[#013E51] text-white text-xs font-bold">
            {totalChildren} {totalChildren === 1 ? b.child : b.children}
          </span>
          <span className="px-3 py-1 rounded-full bg-[#013E51] text-white text-xs font-bold">
            {totalInfants} {totalInfants === 1 ? b.infant : b.infants}
          </span>
        </div>
      </div>

      {/* Selected Rooms Breakdown */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <span className="block text-[11px] font-bold text-[#888888] uppercase tracking-wider">
          {b.selectedPlans}
        </span>

        {selectedRooms.length === 0 ? (
          <p className="text-xs text-[#888888] italic py-2">
            {b.noRoomsSelected}
          </p>
        ) : (
          <div className="space-y-2">
            {selectedRooms.map((room, idx) => (
              <div
                key={room.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1"
              >
                <div className="flex items-center justify-between text-xs font-bold text-[#013E51]">
                  <span className="truncate max-w-[200px]">
                    {b.roomPrefix}{idx + 1}: {room.ratePlanName}
                  </span>
                </div>
                <p className="text-[11px] text-[#6b7280]">
                  {room.adults} {b.adults}, {room.children} {b.children}, {room.infants} {b.infants}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Trust Guarantees */}
      <div className="pt-3 border-t border-slate-100 space-y-2 font-[family-name:var(--font-lato)] text-xs text-[#4b5563]">
        <div className="flex items-center gap-2">
          <FiCheckCircle className="w-4 h-4 text-[#19B8A5] shrink-0" />
          <span>{b.freeCancellation}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiCheckCircle className="w-4 h-4 text-[#19B8A5] shrink-0" />
          <span>{b.instantConfirmation}</span>
        </div>
      </div>
    </motion.aside>
  );
}
