import { FiSearch, FiX, FiPlus } from "react-icons/fi";
import { TransferBookingStatusEnum } from "@/models/transferBooking";

interface TransferBookingsFiltersBarProps {
  statusFilter: TransferBookingStatusEnum | "all";
  onStatusChange: (status: TransferBookingStatusEnum | "all") => void;
  searchEmail: string;
  onSearchChange: (val: string) => void;
  pageSize: number;
  onPageSizeChange: (val: number) => void;
  onCreateClick: () => void;
}

const STATUS_TABS: Array<{ label: string; value: TransferBookingStatusEnum | "all" }> = [
  { label: "All", value: "all" },
  { label: "Pending", value: TransferBookingStatusEnum.Pending },
  { label: "Confirmed", value: TransferBookingStatusEnum.Confirmed },
  { label: "Completed", value: TransferBookingStatusEnum.Completed },
  { label: "Cancelled", value: TransferBookingStatusEnum.Cancelled },
];

export default function TransferBookingsFiltersBar({
  statusFilter,
  onStatusChange,
  searchEmail,
  onSearchChange,
  pageSize,
  onPageSizeChange,
  onCreateClick,
}: TransferBookingsFiltersBarProps) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] space-y-3 font-[family-name:var(--font-lato)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#F8F9FA] p-1 rounded-xl border border-gray-100">
          {STATUS_TABS.map((tab) => {
            const isActive = statusFilter === tab.value;
            return (
              <button
                key={String(tab.value)}
                type="button"
                onClick={() => onStatusChange(tab.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#013E51] text-white shadow-xs"
                    : "text-gray-600 hover:text-[#013E51] hover:bg-white/60"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right Action: Create Booking Button */}
        <button
          type="button"
          onClick={onCreateClick}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#013E51] hover:bg-[#024f67] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs shrink-0"
        >
          <FiPlus className="w-4 h-4 text-[#E8B34A]" />
          <span>New Transfer Booking</span>
        </button>
      </div>

      {/* Search by Customer Email & Page Size */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
        <div className="relative flex-1 w-full">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="email"
            value={searchEmail}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by customer email address..."
            className="w-full pl-10 pr-9 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm text-[#013E51] placeholder:text-gray-400 focus:outline-hidden focus:border-[#013E51] focus:ring-1 focus:ring-[#013E51]"
          />
          {searchEmail && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <span className="text-xs text-gray-500 font-semibold">Rows:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="px-2.5 py-1.5 rounded-xl border border-gray-200 text-xs text-[#013E51] font-semibold bg-white cursor-pointer focus:outline-hidden"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
}
