"use client";

import { Dictionary } from "@/features/i18n/i18nConfig";

interface TripPricingCardProps {
  adultPrice: number;
  childPrice: number;
  infPrice: number;
  currencyName?: string;
  dict: Dictionary["tripDetails"];
}

export default function TripPricingCard({
  adultPrice,
  childPrice,
  infPrice,
  currencyName = "EUR",
  dict,
}: TripPricingCardProps) {
  return (
    <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#E8B34A]/30 shadow-xs space-y-5 font-[family-name:var(--font-lato)]">
      {/* Header with Gold Divider */}
      <div className="flex items-center gap-4">
        <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51] whitespace-nowrap">
          {dict.pricing}
        </h2>
        <span
          aria-hidden="true"
          className="flex-1 h-[1.5px] bg-[#E8B34A]/60 rounded-full"
        />
      </div>

      {/* 3-Column Pricing Grid */}
      <div className="grid grid-cols-3 rounded-2xl border border-gray-200/90 divide-x divide-gray-200/90 bg-[#FDFDFD] overflow-hidden text-center">
        {/* Adults */}
        <div className="p-4 sm:p-5 space-y-1">
          <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
            {dict.adults}
          </span>
          <div className="text-[#013E51]">
            <span className="text-xl sm:text-2xl font-extrabold">
              {Number(adultPrice).toFixed(0)}&nbsp;&euro;
            </span>
            <span className="text-[10px] sm:text-xs text-gray-500 font-semibold ml-1">
              {dict.person}
            </span>
          </div>
        </div>

        {/* Child */}
        <div className="p-4 sm:p-5 space-y-1">
          <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
            {dict.child}
          </span>
          <div className="text-[#013E51]">
            <span className="text-xl sm:text-2xl font-extrabold">
              {Number(childPrice).toFixed(0)}&nbsp;&euro;
            </span>
            <span className="text-[10px] sm:text-xs text-gray-500 font-semibold ml-1">
              {dict.person}
            </span>
          </div>
        </div>

        {/* Infant */}
        <div className="p-4 sm:p-5 space-y-1">
          <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
            {dict.infant}
          </span>
          <div className="text-[#013E51]">
            <span className="text-xl sm:text-2xl font-extrabold text-[#19B8A5]">
              {Number(infPrice) > 0 ? `${Number(infPrice).toFixed(0)} €` : dict.free}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
