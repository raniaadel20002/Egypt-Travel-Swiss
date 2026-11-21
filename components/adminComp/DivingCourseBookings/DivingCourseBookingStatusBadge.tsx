import { DivingBookingStatusEnum } from "@/models/divingCourseBooking";
import { parseDivingBookingStatus } from "./divingCourseBookingHelpers";

interface DivingCourseBookingStatusBadgeProps {
  status: string | number;
  type?: "booking" | "payment";
}

export default function DivingCourseBookingStatusBadge({
  status,
  type = "booking",
}: DivingCourseBookingStatusBadgeProps) {
  if (type === "payment") {
    const s = String(status || "").trim().toLowerCase();
    const isPaid = s === "paid";
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
          isPaid
            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
            : "bg-amber-50 text-amber-700 border-amber-200"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isPaid ? "bg-emerald-500" : "bg-amber-500 animate-pulse"
          }`}
        />
        {isPaid ? "Paid" : "Pending"}
      </span>
    );
  }

  const parsed = parseDivingBookingStatus(status);

  if (parsed === DivingBookingStatusEnum.Pending) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        Pending
      </span>
    );
  }

  if (parsed === DivingBookingStatusEnum.Confirmed) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
        Confirmed
      </span>
    );
  }

  if (parsed === DivingBookingStatusEnum.Finished) {
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
