interface BookingPaginationBarProps {
  pageNumber: number;
  count: number;
  pageSize: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function BookingPaginationBar({
  pageNumber,
  count,
  pageSize,
  onPrev,
  onNext,
}: BookingPaginationBarProps) {
  if (count === 0) return null;

  return (
    <div className="flex items-center justify-between text-xs text-gray-500 bg-white p-4 rounded-2xl border border-[#013E51]/10">
      <span>
        Showing Page {pageNumber} ({count} reservations loaded)
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={onPrev}
          className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-[#013E51] hover:bg-[#FAF7F2] transition disabled:opacity-40 cursor-pointer"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={count < pageSize}
          onClick={onNext}
          className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-[#013E51] hover:bg-[#FAF7F2] transition disabled:opacity-40 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
