import { useTripReviewAverage } from "@/features/reviews/useTripReviews";

export interface TripReviewSummary {
  rating: string;
  count: number;
  isLoading: boolean;
}

export function useTripReviewSummary(tripId: number): TripReviewSummary {
  const { data, isLoading } = useTripReviewAverage(tripId, Boolean(tripId));
  const averageRate = data?.data?.averageRate ?? 0;
  const totalReviews = data?.data?.totalReviews ?? 0;

  const rating =
    totalReviews > 0 && averageRate > 0 ? averageRate.toFixed(1) : "5.0";

  return {
    rating,
    count: totalReviews,
    isLoading,
  };
}
