"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { localeToBackendLanguage } from "@/shared/utils/localeToBackendLanguage";
import { usePublicTripsQuery } from "@/features/trips/usePublicTrips";
import TripsHeroBanner from "./TripsHeroBanner";
import TripsFiltersPanel, { TripsFilterValues } from "./TripsFiltersPanel";
import TripsGrid from "./TripsGrid";
import TripsPagination from "./TripsPagination";

const PAGE_SIZE = 6;

export default function TripsPage() {
  const { locale } = useLocale();
  const searchParams = useSearchParams();

  const initialTypeId = searchParams.get("type")
    ? Number(searchParams.get("type"))
    : undefined;
  const initialDestId = searchParams.get("dest")
    ? Number(searchParams.get("dest"))
    : undefined;
  const initialCategory = searchParams.get("cat")
    ? Number(searchParams.get("cat"))
    : undefined;
  const initialMinPrice = searchParams.get("minPrice")
    ? Number(searchParams.get("minPrice"))
    : undefined;
  const initialMaxPrice = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : undefined;
  const initialSearch = searchParams.get("q") || "";
  const initialPage = searchParams.get("page")
    ? Math.max(1, Number(searchParams.get("page")))
    : 1;

  const [filters, setFilters] = useState<TripsFilterValues>({
    typeId: initialTypeId,
    destinationId: initialDestId,
    category: initialCategory,
    minPrice: initialMinPrice,
    maxPrice: initialMaxPrice,
    search: initialSearch,
  });

  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 350);
    return () => clearTimeout(timer);
  }, [filters.search]);

  const backendLanguage = useMemo(
    () => localeToBackendLanguage(locale),
    [locale]
  );

  const { data: allTrips = [], isLoading } = usePublicTripsQuery({
    typeId: filters.typeId,
    destinationId: filters.destinationId,
    category: filters.category,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    search: debouncedSearch,
    language: backendLanguage,
  });

  const totalPages = Math.max(1, Math.ceil(allTrips.length / PAGE_SIZE));

  const paginatedTrips = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return allTrips.slice(startIndex, startIndex + PAGE_SIZE);
  }, [allTrips, currentPage]);

  const handleFilterChange = (nextFilters: TripsFilterValues) => {
    setFilters(nextFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      typeId: undefined,
      destinationId: undefined,
      category: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      search: "",
    });
    setDebouncedSearch("");
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 380, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-[#F7EDE1] min-h-screen">
      {/* Hero Banner */}
      <TripsHeroBanner />

      {/* Main Content Area */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-8 sm:py-12 lg:py-16 space-y-6 sm:space-y-8 lg:space-y-10">
        {/* Filters Panel */}
        <TripsFiltersPanel
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {/* Trips Grid */}
        <TripsGrid
          trips={paginatedTrips}
          isLoading={isLoading}
          onClearFilters={handleResetFilters}
        />

        {/* Pagination Controls */}
        {!isLoading && totalPages > 1 && (
          <TripsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
}
