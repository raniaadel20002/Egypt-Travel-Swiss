"use client";

import { FiSearch, FiX } from "react-icons/fi";
import { DestinationApiItem } from "@/models/destination";
import { TripTypeItem } from "@/models/tripType";

interface TripsFiltersBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  statusFilter: "all" | "active" | "deactivated";
  onStatusChange: (val: "all" | "active" | "deactivated") => void;
  destinationId: number | "all";
  onDestinationChange: (val: number | "all") => void;
  typeId: number | "all";
  onTypeChange: (val: number | "all") => void;
  category: number | "all";
  onCategoryChange: (val: number | "all") => void;
  destinations: DestinationApiItem[];
  tripTypes: TripTypeItem[];
  counts: { all: number; active: number; deactivated: number };
  onReset: () => void;
  hasActiveFilters: boolean;
}

export default function TripsFiltersBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  destinationId,
  onDestinationChange,
  typeId,
  onTypeChange,
  category,
  onCategoryChange,
  destinations,
  tripTypes,
  counts,
  onReset,
  hasActiveFilters,
}: TripsFiltersBarProps) {
  return (
    <div className="bg-white rounded-[20px] p-4 sm:p-5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 space-y-4">
      {/* Search and Status Pills */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, marker ID, or city..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
          />
          <FiSearch className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 shrink-0">
          <button
            type="button"
            onClick={() => onStatusChange("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
              statusFilter === "all"
                ? "bg-[#013E51] text-white shadow-xs"
                : "bg-[#FAF7F2] text-[#013E51] hover:bg-gray-200/60"
            }`}
          >
            <span>All</span>
            <span className="text-[11px] opacity-80">({counts.all})</span>
          </button>

          <button
            type="button"
            onClick={() => onStatusChange("active")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
              statusFilter === "active"
                ? "bg-[#013E51] text-white shadow-xs"
                : "bg-[#FAF7F2] text-[#013E51] hover:bg-gray-200/60"
            }`}
          >
            <span>Active</span>
            <span className="text-[11px] opacity-80">({counts.active})</span>
          </button>

          <button
            type="button"
            onClick={() => onStatusChange("deactivated")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
              statusFilter === "deactivated"
                ? "bg-[#013E51] text-white shadow-xs"
                : "bg-[#FAF7F2] text-[#013E51] hover:bg-gray-200/60"
            }`}
          >
            <span>Deactivated</span>
            <span className="text-[11px] opacity-80">({counts.deactivated})</span>
          </button>
        </div>
      </div>

      {/* Filter Dropdowns */}
      <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center gap-3">
        {/* Destination Filter */}
        <select
          value={destinationId}
          onChange={(e) =>
            onDestinationChange(
              e.target.value === "all" ? "all" : Number(e.target.value)
            )
          }
          className="px-3 py-2 rounded-xl border border-gray-200 bg-[#FAF7F2]/60 text-xs font-semibold text-[#013E51] focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 cursor-pointer"
        >
          <option value="all">All Destinations</option>
          {destinations.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Trip Type Filter */}
        <select
          value={typeId}
          onChange={(e) =>
            onTypeChange(e.target.value === "all" ? "all" : Number(e.target.value))
          }
          className="px-3 py-2 rounded-xl border border-gray-200 bg-[#FAF7F2]/60 text-xs font-semibold text-[#013E51] focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 cursor-pointer"
        >
          <option value="all">All Trip Types</option>
          {tripTypes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) =>
            onCategoryChange(
              e.target.value === "all" ? "all" : Number(e.target.value)
            )
          }
          className="px-3 py-2 rounded-xl border border-gray-200 bg-[#FAF7F2]/60 text-xs font-semibold text-[#013E51] focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 cursor-pointer"
        >
          <option value="all">All Categories</option>
          <option value="0">Groups</option>
          <option value="1">Private</option>
        </select>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition cursor-pointer"
          >
            <FiX className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
