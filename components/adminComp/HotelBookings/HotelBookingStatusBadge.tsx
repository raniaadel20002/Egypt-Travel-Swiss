import { HotelBookingStatusEnum } from "@/models/hotelBooking";
import { parseHotelBookingStatus } from "./hotelBookingHelpers";

interface HotelBookingStatusBadgeProps {
  status: string | number;
}

export default function HotelBookingStatusBadge({
  status,
}: HotelBookingStatusBadgeProps) {
  const parsed = parseHotelBookingStatus(status);

  if (parsed === HotelBookingStatusEnum.Pending) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        Pending
      </span>
    );
  }

  if (parsed === HotelBookingStatusEnum.Confirmed) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
        Confirmed
      </span>
    );
  }

  if (parsed === HotelBookingStatusEnum.Finished) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        Finished
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
      Cancelled
    </span>
  );
}
