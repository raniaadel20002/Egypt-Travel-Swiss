import { TransferBookingStatusEnum } from "@/models/transferBooking";
import { parseTransferStatus } from "./transferBookingHelpers";

interface TransferBookingStatusBadgeProps {
  status: string | number;
  isCompleted?: boolean;
}

export default function TransferBookingStatusBadge({
  status,
  isCompleted,
}: TransferBookingStatusBadgeProps) {
  const numericStatus = parseTransferStatus(status);

  if (numericStatus === TransferBookingStatusEnum.Pending) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        Pending
      </span>
    );
  }

  if (numericStatus === TransferBookingStatusEnum.Confirmed) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
        Confirmed
      </span>
    );
  }

  if (numericStatus === TransferBookingStatusEnum.Completed || isCompleted) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        Completed
      </span>
    );
  }

  if (numericStatus === TransferBookingStatusEnum.Cancelled) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
        Cancelled
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gray-100 text-gray-700 border border-gray-200">
      {String(status)}
    </span>
  );
}
