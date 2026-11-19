"use client";

import { FiStar, FiArrowRight } from "react-icons/fi";

const RATING_BREAKDOWN = [
  { star: 5, percent: 86 },
  { star: 4, percent: 10 },
  { star: 3, percent: 3 },
  { star: 2, percent: 1 },
  { star: 1, percent: 0 },
];

interface ReviewRatingCardProps {
  onWriteReview: () => void;
}

export default function ReviewRatingCard({
  onWriteReview,
}: ReviewRatingCardProps) {
  return (
    <div className="bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-sm border border-black/5 flex flex-col justify-between">
      <div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="font-[family-name:var(--font-lato)] text-5xl sm:text-6xl font-bold text-[#013E51] leading-none">
            4.9
          </span>
          <span className="font-[family-name:var(--font-lato)] text-2xl font-normal text-[#013E51]/50">
            / 5
          </span>
        </div>

        {/* Gold Stars */}
        <div className="flex items-center gap-1.5 mb-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <FiStar key={s} className="text-lg fill-[#E8B34A] text-[#E8B34A]" />
          ))}
        </div>

        <p className="font-[family-name:var(--font-lato)] text-xs text-[#013E51]/70 font-medium mb-6">
          Based on 2,400+ verified traveler reviews
        </p>

        <div className="w-full h-px bg-black/5 mb-6" />

        {/* Rating Bars */}
        <div className="space-y-3">
          {RATING_BREAKDOWN.map((item) => (
            <div
              key={item.star}
              className="flex items-center gap-2.5 font-[family-name:var(--font-lato)] text-xs"
            >
              <span className="font-semibold text-[#013E51] flex items-center gap-1 w-7 shrink-0 text-xs">
                <span>{item.star}</span>
                <FiStar className="w-2.5 h-2.5 fill-[#E8B34A] text-[#E8B34A]" />
              </span>
              <div className="flex-1 h-2 bg-[#D1D5DB]/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#E8B34A] rounded-full transition-all duration-500"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
              <span className="text-[#708A93] font-medium w-8 text-right shrink-0">
                {item.percent}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Write a Review Button */}
      <button
        type="button"
        onClick={onWriteReview}
        className="w-full h-[52px] bg-[#013E51] hover:bg-[#024f68] text-white rounded-full font-[family-name:var(--font-lato)] font-bold text-sm sm:text-base transition-colors shadow-sm flex items-center justify-center gap-2 mt-6 sm:mt-8 cursor-pointer"
      >
        <span>Write a Review</span>
        <FiArrowRight className="text-base" />
      </button>
    </div>
  );
}
