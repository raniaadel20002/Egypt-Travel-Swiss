"use client";

import {
  FiSearch,
  FiMapPin,
  FiTag,
  FiUsers,
  FiX,
  FiChevronDown,
} from "react-icons/fi";
import { useTripTypesQuery } from "@/features/tripTypes/useTripTypes";
import { useDestinationsQuery } from "@/features/destinations/useDestinations";
import TripsPriceFilterFields from "./TripsPriceFilterFields";

export interface TripsFilterValues {
  typeId?: number;
  destinationId?: number;
  category?: number;
  minPrice?: number;
  maxPrice?: number;
  search: string;
}

interface TripsFiltersPanelProps {
  filters: TripsFilterValues;
  onChange: (next: TripsFilterValues) => void;
  onReset: () => void;
}

export default function TripsFiltersPanel({
  filters,
  onChange,
  onReset,
}: TripsFiltersPanelProps) {
  const { data: tripTypes = [] } = useTripTypesQuery({ PageSize: 100 });
  const { data: destinations = [] } = useDestinationsQuery({ PageSize: 100 });

  const hasActiveFilters = Boolean(
    filters.typeId !== undefined ||
      filters.destinationId !== undefined ||
      filters.category !== undefined ||
      filters.minPrice !== undefined ||
      filters.maxPrice !== undefined ||
      filters.search.trim() !== ""
  );

  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 shadow-[0px_12px_32px_0px_#013E511A] border border-gray-100 font-[family-name:var(--font-lato)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Search Input */}
        <div className="sm:col-span-2 lg:col-span-3 xl:col-span-3 relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
          <input
            type="text"
            placeholder="Search trips..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-[13px] xl:text-sm rounded-xl border border-gray-200 bg-[#F8F9FA] text-[#013E51] placeholder:text-[#013E51]/40 focus:border-[#013E51] focus:ring-1 focus:ring-[#013E51] outline-hidden transition-colors"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onChange({ ...filters, search: "" })}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <FiX className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Trip Type Dropdown */}
        <div className="sm:col-span-1 lg:col-span-3 xl:col-span-2 relative">
          <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
          <select
            value={filters.typeId !== undefined ? String(filters.typeId) : ""}
            onChange={(e) =>
              onChange({
                ...filters,
                typeId: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            aria-label="Filter by trip type"
            className="w-full pl-9 pr-7 py-2.5 text-xs sm:text-[13px] xl:text-sm rounded-xl border border-gray-200 bg-[#F8F9FA] text-[#013E51] focus:border-[#013E51] focus:ring-1 focus:ring-[#013E51] outline-hidden appearance-none cursor-pointer truncate"
          >
            <option value="">All Types</option>
            {tripTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
        </div>

        {/* Destination Dropdown */}
        <div className="sm:col-span-1 lg:col-span-2 xl:col-span-3 relative">
          <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
          <select
            value={
              filters.destinationId !== undefined
                ? String(filters.destinationId)
                : ""
            }
            onChange={(e) =>
              onChange({
                ...filters,
                destinationId: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            aria-label="Filter by destination"
            className="w-full pl-9 pr-7 py-2.5 text-xs sm:text-[13px] xl:text-sm rounded-xl border border-gray-200 bg-[#F8F9FA] text-[#013E51] focus:border-[#013E51] focus:ring-1 focus:ring-[#013E51] outline-hidden appearance-none cursor-pointer truncate"
          >
            <option value="">All Destinations</option>
            {destinations.map((dest) => (
              <option key={dest.id} value={dest.id}>
                {dest.name}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
        </div>

        {/* Category Dropdown */}
        <div className="sm:col-span-1 lg:col-span-2 xl:col-span-2 relative">
          <FiUsers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
          <select
            value={
              filters.category !== undefined ? String(filters.category) : ""
            }
            onChange={(e) =>
              onChange({
                ...filters,
                category: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            aria-label="Filter by category"
            className="w-full pl-9 pr-7 py-2.5 text-xs sm:text-[13px] xl:text-sm rounded-xl border border-gray-200 bg-[#F8F9FA] text-[#013E51] focus:border-[#013E51] focus:ring-1 focus:ring-[#013E51] outline-hidden appearance-none cursor-pointer truncate"
          >
            <option value="">All Categories</option>
            <option value="0">Group Trips</option>
            <option value="1">Private Trips</option>
          </select>
          <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#013E51]/50 pointer-events-none" />
        </div>

        {/* Price Range (Min/Max inputs in EUR) */}
        <div className="sm:col-span-1 lg:col-span-2 xl:col-span-2">
          <TripsPriceFilterFields
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            onMinPriceChange={(val) => onChange({ ...filters, minPrice: val })}
            onMaxPriceChange={(val) => onChange({ ...filters, maxPrice: val })}
          />
        </div>
      </div>

      {/* Clear Filters Row */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 text-xs sm:text-sm">
          <span className="text-[#013E51]/60">Filters applied</span>
          <button
            type="button"
            onClick={onReset}
            className="text-[#013E51] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <FiX className="w-3.5 h-3.5" />
            <span>Clear all filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
