"use client";

import { useMemo } from "react";
import DestinationCard from "./DestinationCard";
import DestinationsBanner from "./DestinationsBanner";
import DestinationsHeader from "./DestinationsHeader";
import { useDestinationsQuery } from "@/features/destinations/useDestinations";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { localeToBackendLanguage } from "@/shared/utils/localeToBackendLanguage";

export default function DestinationsPage() {
  const { locale } = useLocale();
  const backendLanguage = useMemo(
    () => localeToBackendLanguage(locale),
    [locale]
  );

  const { data: destinations = [], isLoading } = useDestinationsQuery({
    PageSize: 100,
    language: backendLanguage,
  });

  return (
    <div className="w-full bg-[#F7EDE1] min-h-screen">
      {/* Decorative Palm Trees Header */}
      <DestinationsHeader />

      {/* Main Content Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-16 sm:py-14 lg:py-14 space-y-10 sm:space-y-12 lg:space-y-14">
        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="w-full aspect-[1.05/1] sm:aspect-square rounded-[12px] bg-[#013E51]/10 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && destinations.length === 0 && (
          <div className="text-center py-16">
            <p className="font-[family-name:var(--font-lato)] text-lg text-[#013E51]/70">
              No destinations available at the moment.
            </p>
          </div>
        )}

        {/* Backend Destinations Grid */}
        {!isLoading && destinations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
            {destinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        )}

        {/* Bottom Yacht Adventure Banner */}
        <DestinationsBanner />
      </div>
    </div>
  );
}
