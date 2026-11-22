"use client";

import { Dictionary } from "@/features/i18n/i18nConfig";

interface TripPricingCardProps {
  adultPrice: number;
  childPrice: number;
  infPrice: number;
  currencyName?: string;
  categoryName?: string;
  tripName?: string;
  dict: Dictionary["tripDetails"];
}

const WHATSAPP_NUMBER = "201004829104";

export default function TripPricingCard({
  adultPrice,
  childPrice,
  infPrice,
  currencyName = "EUR",
  categoryName,
  tripName = "Trip",
  dict,
}: TripPricingCardProps) {
  const isOnContact = Number(adultPrice) <= 0;
  const isPrivate = categoryName?.toLowerCase().includes("private");

  const whatsappMessage = encodeURIComponent(
    `Hello! I would like to inquire about the full price for "${tripName}" (${isPrivate ? "Private" : "Group"}). Could you please provide details?`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

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

      {isOnContact ? (
        <div className="rounded-2xl border border-[#E8B34A]/40 bg-[#FAF7F2] p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#013E51] text-white font-bold text-xs sm:text-sm">
              {dict.priceOnContact || "Price available on contact"}
            </span>
            {isPrivate && (
              <span className="text-xs font-semibold text-[#888888]">
                ({dict.privateTransfer || "Private Transfer"} + {dict.selectedServices || "Services"})
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-[#013E51]/85 leading-relaxed">
            {dict.whatsappFullPriceNotice || "Please contact us on WhatsApp to know the full price."}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
          >
            <span>{dict.contactOnWhatsapp || "Contact on WhatsApp"}</span>
          </a>
        </div>
      ) : (
        /* 3-Column Pricing Grid */
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
      )}
    </div>
  );
}
