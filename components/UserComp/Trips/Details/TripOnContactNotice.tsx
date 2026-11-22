"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Dictionary } from "@/features/i18n/i18nConfig";

interface TripOnContactNoticeProps {
  whatsappUrl: string;
  dict: Dictionary["tripDetails"];
}

export default function TripOnContactNotice({
  whatsappUrl,
  dict,
}: TripOnContactNoticeProps) {
  return (
    <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8B34A]/40 space-y-2.5">
      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#013E51] text-white text-[11px] font-bold">
        {dict.priceOnContact || "Price available on contact"}
      </span>
      <p className="text-xs text-[#013E51]/85 leading-relaxed">
        {dict.whatsappFullPriceNotice ||
          "Please contact us on WhatsApp to know the full price."}
      </p>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
      >
        <FaWhatsapp className="w-4 h-4" />
        <span>{dict.contactOnWhatsapp || "Contact on WhatsApp"}</span>
      </a>
    </div>
  );
}
