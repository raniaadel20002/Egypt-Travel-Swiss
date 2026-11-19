"use client";

import { FiStar } from "react-icons/fi";

interface DestinationFeaturedToggleProps {
  isFeatured: boolean;
  onToggle: () => void;
}

export default function DestinationFeaturedToggle({
  isFeatured,
  onToggle,
}: DestinationFeaturedToggleProps) {
  return (
    <div className="p-4 rounded-2xl border border-[#013E51]/10 bg-[#FAF7F2]/40 flex items-center justify-between gap-4">
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <FiStar className="w-4 h-4 text-[#E8B34A]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#013E51]">
            Featured Destination
          </span>
        </div>
        <p className="text-[11px] text-[#888888]">
          Pin this destination to the homepage and featured destination carousel.
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={isFeatured}
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          isFeatured ? "bg-[#013E51]" : "bg-gray-200"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            isFeatured ? "translate-x-5 bg-[#E8B34A]" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
