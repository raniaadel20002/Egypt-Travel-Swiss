"use client";

import DestinationCard from "./DestinationCard";
import DestinationsBanner from "./DestinationsBanner";
import DestinationsHeader from "./DestinationsHeader";
import { DESTINATION_ITEMS } from "./destinationsData";

export default function DestinationsPage() {
  return (
    <div className="w-full bg-[#F7EDE1] min-h-screen">
      {/* Decorative Palm Trees Header */}
      <DestinationsHeader />

      {/* Main Content Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-14 lg:py-14 space-y-10 sm:space-y-12 lg:space-y-14">
        {/* 6 Destinations Grid (2 rows of 3 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {DESTINATION_ITEMS.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>

        {/* Bottom Yacht Adventure Banner */}
        <DestinationsBanner />
      </div>
    </div>
  );
}
