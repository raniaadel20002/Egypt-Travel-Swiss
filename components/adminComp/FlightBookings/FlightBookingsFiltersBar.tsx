import { FiSearch, FiRotateCcw } from "react-icons/fi";
import {
  FlightBookingTypeEnum,
  FlightTripTypeEnum,
} from "@/models/flightBooking";
import { CountryApiItem } from "@/models/flightLocation";

interface FlightBookingsFiltersBarProps {
  bookingTypeFilter: FlightBookingTypeEnum | "all";
  onBookingTypeChange: (val: FlightBookingTypeEnum | "all") => void;
  tripTypeFilter: FlightTripTypeEnum | "all";
  onTripTypeChange: (val: FlightTripTypeEnum | "all") => void;
  countryFilter: number | "all";
  onCountryFilterChange: (val: number | "all") => void;
  countries: CountryApiItem[];
  searchQuery: string;
  onSearchChange: (val: string) => void;
  pageSize: number;
  onPageSizeChange: (val: number) => void;
  onResetFilters: () => void;
}

const BOOKING_TYPE_TABS: {
  label: string;
  value: FlightBookingTypeEnum | "all";
}[] = [
  { label: "All Types", value: "all" },
  { label: "Egypt to Country", value: FlightBookingTypeEnum.EgyptToCountry },
  { label: "Country to Egypt", value: FlightBookingTypeEnum.CountryToEgypt },
  { label: "Local Flights", value: FlightBookingTypeEnum.Local },
];

export default function FlightBookingsFiltersBar({
  bookingTypeFilter,
  onBookingTypeChange,
  tripTypeFilter,
  onTripTypeChange,
  countryFilter,
  onCountryFilterChange,
  countries,
  searchQuery,
  onSearchChange,
  pageSize,
  onPageSizeChange,
  onResetFilters,
}: FlightBookingsFiltersBarProps) {
  const hasActiveFilters =
    bookingTypeFilter !== "all" ||
    tripTypeFilter !== "all" ||
    countryFilter !== "all" ||
    searchQuery.trim() !== "";

  return (
    <div className="bg-white rounded-2xl p-4 border border-[#013E51]/10 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.03)] space-y-3.5 font-[family-name:var(--font-lato)]">
      {/* Top Row: Booking Type Tabs & Trip Type Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {BOOKING_TYPE_TABS.map((tab) => {
            const isActive = bookingTypeFilter === tab.value;
            return (
              <button
                key={String(tab.value)}
                type="button"
                onClick={() => onBookingTypeChange(tab.value)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#013E51] text-white shadow-xs"
                    : "bg-[#F8F9FA] text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={tripTypeFilter}
            onChange={(e) => {
              const v = e.target.value;
              onTripTypeChange(
                v === "all" ? "all" : (Number(v) as FlightTripTypeEnum)
              );
            }}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-[#013E51] bg-white focus:outline-hidden cursor-pointer"
          >
            <option value="all">All Trip Types</option>
            <option value={FlightTripTypeEnum.OneWay}>One Way</option>
            <option value={FlightTripTypeEnum.RoundTrip}>Round Trip</option>
          </select>

          <select
            value={countryFilter}
            onChange={(e) => {
              const v = e.target.value;
              onCountryFilterChange(v === "all" ? "all" : Number(v));
            }}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-[#013E51] bg-white focus:outline-hidden cursor-pointer"
          >
            <option value="all">All Countries</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bottom Row: Search, Page Size & Reset */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-gray-100">
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by passenger name, passport, airport, or city..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-gray-200 text-xs text-[#013E51] placeholder:text-gray-400 focus:outline-hidden focus:border-[#013E51]"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <FiRotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-[#013E51] bg-white focus:outline-hidden cursor-pointer"
          >
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={50}>50 / page</option>
          </select>
        </div>
      </div>
    </div>
  );
}
