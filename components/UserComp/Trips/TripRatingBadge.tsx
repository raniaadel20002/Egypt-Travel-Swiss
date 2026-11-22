"use client";

import { FaStar } from "react-icons/fa";
import { useTripReviewSummary } from "@/features/trips/useTripReviewSummary";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface TripRatingBadgeProps {
  tripId: number;
}

export default function TripRatingBadge({ tripId }: TripRatingBadgeProps) {
  const { dictionary } = useLocale();
  const { rating, count, isLoading } = useTripReviewSummary(tripId);

  const t = dictionary.tripsPage?.card;
  const noReviewsText = t?.noReviewsYet || "No reviews yet";
  const reviewLabel =
    count === 1
      ? t?.reviewsSingular || "Review"
      : t?.reviewsPlural || "Reviews";

  if (isLoading) {
    return (
      <span className="flex items-center gap-1.5 animate-pulse whitespace-nowrap shrink-0">
        <span className="w-4 h-4 bg-gray-200 rounded-full shrink-0" />
        <span className="w-14 h-4 bg-gray-200 rounded-sm" />
      </span>
    );
  }

  if (count === 0) {
    return (
      <span className="inline-flex items-center text-xs text-[#888888] font-medium whitespace-nowrap shrink-0">
        {noReviewsText}
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1 sm:gap-1.5 font-[family-name:var(--font-lato)] whitespace-nowrap shrink-0">
      <FaStar className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#E8B34A] shrink-0" />
      <span className="font-bold text-[#013E51] text-sm sm:text-base leading-none">
        {rating}
      </span>
      <span className="text-[#666666] text-xs sm:text-sm font-medium leading-none whitespace-nowrap">
        ({count} {reviewLabel})
      </span>
    </span>
  );
}
