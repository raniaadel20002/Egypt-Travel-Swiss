"use client";

import { TripCategory, TripCategoryFilter } from "@/models/trip";

interface TripsFilterBarProps {
  categories: TripCategoryFilter[];
  activeCategory: TripCategory;
  onSelectCategory: (category: TripCategory) => void;
}

export default function TripsFilterBar({
  categories,
  activeCategory,
  onSelectCategory,
}: TripsFilterBarProps) {
  return (
    <div className="w-full flex items-start justify-start gap-2.5 sm:gap-4  pb-2 sm:pb-0 font-[family-name:var(--font-lato)]">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`shrink-0 px-6 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-xs ${
              isActive
                ? "bg-[#013E51] text-white shadow-sm"
                : "bg-white text-[#013E51] border border-[#E8B34A] hover:border-[#013E51]"
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
