import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTripReview,
  deleteTripReview,
  getTripReviewAverage,
  getTripReviewById,
  getTripReviews,
} from "@/clientApi/reviewsApi";
import {
  CreateTripReviewDto,
  TripReviewsQueryParams,
} from "@/models/review";

export const TRIP_REVIEWS_QUERY_KEYS = {
  all: ["tripReviews"] as const,
  list: (params?: TripReviewsQueryParams) =>
    ["tripReviews", "list", params] as const,
  detail: (id: number) => ["tripReviews", "detail", id] as const,
  average: (tripId: number) => ["tripReviews", "average", tripId] as const,
};

export function useTripReviewsList(params?: TripReviewsQueryParams) {
  return useQuery({
    queryKey: TRIP_REVIEWS_QUERY_KEYS.list(params),
    queryFn: () => getTripReviews(params),
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

export function useTripReviewById(id: number | null, enabled = true) {
  return useQuery({
    queryKey: id
      ? TRIP_REVIEWS_QUERY_KEYS.detail(id)
      : ["tripReviews", "detail", "none"],
    queryFn: () => (id ? getTripReviewById(id) : Promise.reject("No id")),
    enabled: Boolean(enabled && id),
    staleTime: 1000 * 60 * 3,
  });
}

export function useTripReviewAverage(tripId: number | null, enabled = true) {
  return useQuery({
    queryKey: tripId
      ? TRIP_REVIEWS_QUERY_KEYS.average(tripId)
      : ["tripReviews", "average", "none"],
    queryFn: () =>
      tripId ? getTripReviewAverage(tripId) : Promise.reject("No tripId"),
    enabled: Boolean(enabled && tripId),
    staleTime: 1000 * 60 * 3,
  });
}

export function useCreateTripReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTripReviewDto) => createTripReview(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TRIP_REVIEWS_QUERY_KEYS.all,
      });
    },
  });
}

export function useDeleteTripReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteTripReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TRIP_REVIEWS_QUERY_KEYS.all,
      });
    },
  });
}
