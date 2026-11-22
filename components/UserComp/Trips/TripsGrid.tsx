"use client";

import { TripApiItem } from "@/models/trip";
import { useLocale } from "@/shared/providers/LocaleProvider";
import TripCard from "./TripCard";
import TripCardSkeleton from "./TripCardSkeleton";

interface TripsGridProps {
  trips: TripApiItem[];
  isLoading: boolean;
  onClearFilters: () => void;
}

export default function TripsGrid({
  trips,
  isLoading,
  onClearFilters,
}: TripsGridProps) {
  const { dictionary } = useLocale();
  const t = dictionary.tripsPage?.grid || {
    noTrips: "No trips found",
    noTripsDesc:
      "We could not find any trips matching your current filter criteria. Try adjusting your price range, destination, or category.",
    resetFilters: "Reset all filters",
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
        {Array.from({ length: 6 }).map((_, idx) => (
          <TripCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div className="bg-white rounded-[28px] p-8 sm:p-12 text-center shadow-[0px_12px_32px_0px_#013E511A] border border-gray-100 max-w-xl mx-auto space-y-4 font-[family-name:var(--font-lato)]">
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
          {t.noTrips}
        </h3>
        <p className="text-sm text-[#013E51]/70">
          {t.noTripsDesc}
        </p>
        <div>
          <button
            type="button"
            onClick={onClearFilters}
            className="px-6 py-3 rounded-xl bg-[#013E51] hover:bg-[#024f67] text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            {t.resetFilters}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
      {trips.map((trip, idx) => (
        <TripCard key={trip.id} trip={trip} index={idx} />
      ))}
    </div>
  );
}
