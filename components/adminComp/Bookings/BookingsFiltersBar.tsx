"use client";

import { FiCalendar, FiFilter, FiPhone, FiRotateCcw, FiSearch, FiUser } from "react-icons/fi";
import { BookingStatusFilter } from "@/models/booking";
import { TripApiItem } from "@/models/trip";

interface BookingsFiltersBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  statusFilter: BookingStatusFilter;
  onStatusChange: (val: BookingStatusFilter) => void;
  tripIdFilter: number | "all";
  onTripIdChange: (val: number | "all") => void;
  dateFilter: string;
  onDateChange: (val: string) => void;
  nationalityFilter: string;
  onNationalityChange: (val: string) => void;
  phoneFilter: string;
  onPhoneChange: (val: string) => void;
  trips: TripApiItem[];
  onReset: () => void;
}

const statusTabs: { id: BookingStatusFilter; label: string }[] = [
  { id: "all", label: "All Bookings" },
  { id: "pending", label: "Pending" },
  { id: "confirmed", label: "Confirmed" },
  { id: "finished", label: "Finished" },
];

export default function BookingsFiltersBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  tripIdFilter,
  onTripIdChange,
  dateFilter,
  onDateChange,
  nationalityFilter,
  onNationalityChange,
  phoneFilter,
  onPhoneChange,
  trips,
  onReset,
}: BookingsFiltersBarProps) {
  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    statusFilter !== "all" ||
    tripIdFilter !== "all" ||
    dateFilter.trim() !== "" ||
    nationalityFilter.trim() !== "" ||
    phoneFilter.trim() !== "";

  return (
    <div className="bg-white rounded-[20px] p-4 sm:p-5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 space-y-4">
      {/* Top Row: Search & Status Tabs */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by customer name or email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-hidden focus:border-[#013E51]"
          />
          <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {statusTabs.map((tab) => {
            const isActive = statusFilter === tab.id;
            return (
              <button
                key={String(tab.id)}
                type="button"
                onClick={() => onStatusChange(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? "bg-[#013E51] text-white shadow-xs"
                    : "text-[#013E51]/70 hover:bg-[#FAF7F2]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Filter Row */}
      <div className="pt-3 border-t border-[#013E51]/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
        {/* Excursion Trip Selector */}
        <div className="relative">
          <select
            value={tripIdFilter}
            onChange={(e) =>
              onTripIdChange(e.target.value === "all" ? "all" : Number(e.target.value))
            }
            aria-label="Filter by excursion"
            className="w-full pl-3 pr-8 py-2 text-xs rounded-xl border border-gray-200 bg-white text-[#013E51] focus:outline-hidden focus:border-[#013E51] cursor-pointer"
          >
            <option value="all">All Excursions</option>
            {trips.map((t) => (
              <option key={t.id} value={t.id}>
                #{t.id} - {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Departure Date */}
        <div className="relative">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => onDateChange(e.target.value)}
            aria-label="Filter by date"
            className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-gray-200 bg-white text-[#013E51] focus:outline-hidden focus:border-[#013E51]"
          />
          <FiCalendar className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Nationality */}
        <div className="relative">
          <input
            type="text"
            value={nationalityFilter}
            onChange={(e) => onNationalityChange(e.target.value)}
            placeholder="Nationality..."
            className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-gray-200 bg-white text-[#013E51] placeholder-gray-400 focus:outline-hidden focus:border-[#013E51]"
          />
          <FiUser className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Phone */}
        <div className="relative">
          <input
            type="text"
            value={phoneFilter}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="Phone number..."
            className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-gray-200 bg-white text-[#013E51] placeholder-gray-400 focus:outline-hidden focus:border-[#013E51]"
          />
          <FiPhone className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Reset Action */}
        <div className="flex items-center justify-end sm:justify-start">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:text-[#013E51] hover:bg-[#FAF7F2] transition cursor-pointer"
            >
              <FiRotateCcw className="w-3.5 h-3.5 text-[#E8B34A]" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
