import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTrips } from "@/clientApi/tripsApi";
import { TripApiItem, TripsQueryParams } from "@/models/trip";

export interface PublicTripsFilters {
  typeId?: number;
  destinationId?: number;
  category?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  language?: TripsQueryParams["language"];
}

export const PUBLIC_TRIPS_QUERY_KEY = ["publicTrips"] as const;

export function usePublicTripsQuery(filters: PublicTripsFilters) {
  const queryParams: TripsQueryParams = {
    PageNumber: 1,
    PageSize: 100,
    includeInactive: false,
    TypeId: filters.typeId,
    DestinationId: filters.destinationId,
    Category: filters.category,
    MinPrice: filters.minPrice,
    MaxPrice: filters.maxPrice,
    SearchItem: filters.search?.trim() ? filters.search.trim() : undefined,
    language: filters.language || "EN",
  };

  return useQuery<TripApiItem[]>({
    queryKey: [...PUBLIC_TRIPS_QUERY_KEY, queryParams],
    queryFn: () => getTrips(queryParams),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
}
