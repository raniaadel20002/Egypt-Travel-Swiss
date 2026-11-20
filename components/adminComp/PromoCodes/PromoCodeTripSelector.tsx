"use client";

import { useMemo, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { useTripsQuery } from "@/features/trips/useTrips";

interface PromoCodeTripSelectorProps {
  selectedTripId: number | null;
  onSelectTrip: (id: number) => void;
}

export default function PromoCodeTripSelector({
  selectedTripId,
  onSelectTrip,
}: PromoCodeTripSelectorProps) {
  const [tripSearch, setTripSearch] = useState("");
  const tripsQuery = useTripsQuery({ PageNumber: 1, PageSize: 100 });

  const filteredTrips = useMemo(() => {
    const list = tripsQuery.data || [];
    if (!tripSearch.trim()) return list;
    const q = tripSearch.toLowerCase();
    return list.filter(
      (t) =>
        t.name?.toLowerCase().includes(q) ||
        String(t.id).includes(q) ||
        t.tripTypeName?.toLowerCase().includes(q)
    );
  }, [tripsQuery.data, tripSearch]);

  return (
    <div className="space-y-2 mt-3 p-3 rounded-2xl bg-[#FAF7F2] border border-[#013E51]/10">
      <div className="relative">
        <input
          type="text"
          value={tripSearch}
          onChange={(e) => setTripSearch(e.target.value)}
          placeholder="Search trip title or ID..."
          className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-200 bg-white focus:outline-hidden focus:border-[#013E51]"
        />
      </div>

      <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
        {tripsQuery.isLoading ? (
          <div className="py-4 text-center text-xs text-gray-400">
            Loading trips...
          </div>
        ) : filteredTrips.length === 0 ? (
          <div className="py-4 text-center text-xs text-gray-400">
            No trips found.
          </div>
        ) : (
          filteredTrips.map((trip) => {
            const isSelected = selectedTripId === trip.id;
            return (
              <button
                key={trip.id}
                type="button"
                onClick={() => onSelectTrip(trip.id)}
                className={`w-full p-2.5 rounded-xl border text-left text-xs transition flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? "bg-[#013E51] text-white border-[#013E51]"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="min-w-0 pr-2">
                  <span className="block font-bold truncate">
                    {trip.name}
                  </span>
                  <span
                    className={`text-[10px] ${
                      isSelected ? "text-[#E8B34A]" : "text-gray-400"
                    }`}
                  >
                    ID: #{trip.id} {trip.tripTypeName && `• ${trip.tripTypeName}`}
                  </span>
                </div>
                {isSelected && (
                  <FiCheck className="w-4 h-4 text-[#E8B34A] shrink-0" />
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
