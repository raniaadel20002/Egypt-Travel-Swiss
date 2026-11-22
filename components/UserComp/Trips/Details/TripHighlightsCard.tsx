"use client";

import { Dictionary } from "@/features/i18n/i18nConfig";

interface TripHighlightsCardProps {
  highlights: string[];
  dict: Dictionary["tripDetails"];
}

export default function TripHighlightsCard({
  highlights = [],
  dict,
}: TripHighlightsCardProps) {
  if (!highlights || highlights.length === 0) return null;

  return (
    <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#E8B34A]/30 shadow-xs space-y-5 font-[family-name:var(--font-lato)]">
      {/* Header with Gold Divider */}
      <div className="flex items-center gap-4">
        <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51] whitespace-nowrap">
          {dict.tripHighlights}
        </h2>
        <span
          aria-hidden="true"
          className="flex-1 h-[1.5px] bg-[#E8B34A]/60 rounded-full"
        />
      </div>

      {/* Numbered Highlight Rows */}
      <div className="space-y-2.5">
        {highlights.map((highlight, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3.5 p-3 sm:p-3.5 rounded-xl border border-gray-200/90 bg-white hover:border-[#E8B34A] transition-colors"
          >
            <span className="w-6 h-6 rounded-full bg-[#013E51] text-[#E8B34A] text-xs font-bold flex items-center justify-center shrink-0 shadow-2xs">
              {idx + 1}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#013E51] leading-relaxed">
              {highlight}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
