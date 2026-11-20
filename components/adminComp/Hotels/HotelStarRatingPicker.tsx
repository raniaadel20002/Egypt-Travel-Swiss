"use client";

import { FiStar } from "react-icons/fi";

interface HotelStarRatingPickerProps {
  rate: number;
  onRateChange: (rate: number) => void;
}

export default function HotelStarRatingPicker({
  rate,
  onRateChange,
}: HotelStarRatingPickerProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-wider text-[#013E51] block">
        Resort Star Rating
      </label>
      <div className="flex flex-wrap items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRateChange(star)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
              rate === star
                ? "bg-[#013E51] text-[#E8B34A] border-[#013E51]"
                : "bg-white text-gray-600 border-gray-200 hover:bg-[#FAF7F2]"
            }`}
          >
            <FiStar
              className={`w-4 h-4 ${
                rate >= star
                  ? "fill-[#E8B34A] text-[#E8B34A]"
                  : "text-gray-400"
              }`}
            />
            <span>{star} Star{star > 1 ? "s" : ""}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
