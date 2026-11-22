"use client";

import { FaHotel } from "react-icons/fa";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface HotelAboutSectionProps {
  description: string;
}

export default function HotelAboutSection({
  description,
}: HotelAboutSectionProps) {
  const { dictionary } = useLocale();
  const t = dictionary.accommodation.detail;

  if (!description) return null;

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#013E51]/10 space-y-4">
      {/* Header with circular icon badge and divider line */}
      <div className="flex items-center gap-3 pb-2 border-b border-[#E8B34A]/30">
        <div className="w-10 h-10 rounded-full bg-[#013E51] text-[#E8B34A] flex items-center justify-center shrink-0 shadow-xs">
          <FaHotel className="w-4 h-4" />
        </div>
        <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
          {t.aboutHeading}
        </h2>
      </div>

      {/* Description text */}
      <p className="font-[family-name:var(--font-lato)] text-base sm:text-[17px] text-[#374151] leading-[1.85] whitespace-pre-line">
        {description}
      </p>
    </section>
  );
}
