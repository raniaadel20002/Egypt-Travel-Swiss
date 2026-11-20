interface BookingStatusBadgeProps {
  status: string;
}

export default function BookingStatusBadge({ status }: BookingStatusBadgeProps) {
  const normalized = status?.toLowerCase().trim();

  if (normalized === "pending") {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
        Pending
      </span>
    );
  }

  if (normalized === "confirmed") {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200">
        Confirmed
      </span>
    );
  }

  if (normalized === "finished") {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
        Finished
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gray-100 text-gray-700 border border-gray-200">
      {status || "Unknown"}
    </span>
  );
}
