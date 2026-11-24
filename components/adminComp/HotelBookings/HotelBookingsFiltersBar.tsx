import { FiSearch, FiX, FiPlus, FiFilter } from "react-icons/fi";
import { HotelBookingStatusEnum } from "@/models/hotelBooking";
import { HotelApiItem } from "@/models/hotel";

interface HotelBookingsFiltersBarProps {
  statusFilter: HotelBookingStatusEnum | "all";
  onStatusChange: (status: HotelBookingStatusEnum | "all") => void;
  hotelIdFilter: number | "all";
  onHotelIdChange: (val: number | "all") => void;
  hotels: HotelApiItem[];
  searchQuery: string;
  onSearchChange: (val: string) => void;
  nationalityFilter: string;
  onNationalityChange: (val: string) => void;
  pageSize: number;
  onPageSizeChange: (val: number) => void;
  onCreateClick: () => void;
}

const STATUS_TABS: Array<{
  label: string;
  value: HotelBookingStatusEnum | "all";
}> = [
  { label: "All", value: "all" },
  { label: "Pending", value: HotelBookingStatusEnum.Pending },
  { label: "Confirmed", value: HotelBookingStatusEnum.Confirmed },
  { label: "Finished", value: HotelBookingStatusEnum.Finished },
  { label: "Cancelled", value: HotelBookingStatusEnum.Cancelled },
];

export default function HotelBookingsFiltersBar({
  statusFilter,
  onStatusChange,
  hotelIdFilter,
  onHotelIdChange,
  hotels,
  searchQuery,
  onSearchChange,
  nationalityFilter,
  onNationalityChange,
  pageSize,
  onPageSizeChange,
  onCreateClick,
}: HotelBookingsFiltersBarProps) {
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

        {/* Right Action: Create Booking */}
        {/* <button
          type="button"
          onClick={onCreateClick}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#013E51] hover:bg-[#024f67] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs shrink-0"
        >
          <FiPlus className="w-4 h-4 text-[#E8B34A]" />
          <span>New Hotel Booking</span>
        </button> */}
      </div>

      {/* Search & Hotel / Nationality Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
        {/* Guest search */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search guest name, email, WhatsApp..."
            className="w-full pl-9 pr-7 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm text-[#013E51] placeholder:text-gray-400 focus:outline-hidden focus:border-[#013E51] focus:ring-1 focus:ring-[#013E51]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <FiX className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Hotel Dropdown */}
        <div>
          <select
            value={hotelIdFilter === "all" ? "" : String(hotelIdFilter)}
            onChange={(e) =>
              onHotelIdChange(
                e.target.value ? Number(e.target.value) : "all"
              )
            }
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm text-[#013E51] font-semibold bg-white cursor-pointer focus:outline-hidden"
          >
            <option value="">All Hotels & Resorts</option>
            {hotels.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name}
              </option>
            ))}
          </select>
        </div>

        {/* Nationality Filter */}
        <div className="relative">
          <input
            type="text"
            value={nationalityFilter}
            onChange={(e) => onNationalityChange(e.target.value)}
            placeholder="Filter by nationality..."
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm text-[#013E51] placeholder:text-gray-400 focus:outline-hidden focus:border-[#013E51] focus:ring-1 focus:ring-[#013E51]"
          />
          {nationalityFilter && (
            <button
              type="button"
              onClick={() => onNationalityChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <FiX className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Page Size */}
        <div className="flex items-center gap-2 justify-end">
          <span className="text-xs text-gray-500 font-semibold">Rows:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="px-2.5 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] font-semibold bg-white cursor-pointer focus:outline-hidden"
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
