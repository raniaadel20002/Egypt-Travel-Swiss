"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { TripCategory } from "@/models/trip";
import { ALL_TRIPS, TRIP_CATEGORIES } from "./tripsData";
import TripCard from "./TripCard";
import TripsFilterBar from "./TripsFilterBar";
import TripsPagination from "./TripsPagination";

export default function TripsPage() {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get("category") as TripCategory | null;

  const validInitialCategory =
    initialCategoryParam &&
    TRIP_CATEGORIES.some((c) => c.id === initialCategoryParam)
      ? initialCategoryParam
      : "all";

  const [activeCategory, setActiveCategory] = useState<TripCategory>(validInitialCategory);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTrips = useMemo(() => {
    if (activeCategory === "all") {
      return ALL_TRIPS;
    }
    return ALL_TRIPS.filter((trip) => trip.category === activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (category: TripCategory) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="w-full bg-[#F7EDE1] py-12 sm:py-16 lg:py-20 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 space-y-8 sm:space-y-10 lg:space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-3 sm:space-y-4">
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#013E51] tracking-wide leading-tight">
            Our <span className="uppercase">TRIPS</span>
          </h1>

          <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base lg:text-lg text-[#013E51]/75 font-normal max-w-xl mx-auto">
            Handpicked adventures loved by thousands of travelers
          </p>
        </div>

        {/* Category Filter Pills */}
        <TripsFilterBar
          categories={TRIP_CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={handleCategoryChange}
        />

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {filteredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>

        {/* Empty State Fallback */}
        {filteredTrips.length === 0 && (
          <div className="text-center py-12">
            <p className="font-[family-name:var(--font-lato)] text-[#013E51]/70 text-base">
              No trips found for this category at the moment.
            </p>
          </div>
        )}

        {/* Pagination Controls */}
        <TripsPagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
