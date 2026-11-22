"use client";

import { FaWhatsapp, FaViber, FaTelegramPlane } from "react-icons/fa";
import { useLocale } from "@/shared/providers/LocaleProvider";

const CONCIERGE_PHONE = "201004829104";

export default function TransferHelpContact() {
  const { dictionary: dict } = useLocale();
  const t = dict.transfers.helpContact;

  return (
    <div className="w-full bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.06)] border border-[#013E51]/10 text-center">
      <h3 className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl font-bold text-[#013E51] mb-2">
        {t.title}
      </h3>
      <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] mb-5 max-w-lg mx-auto leading-relaxed">
        {t.description}
      </p>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* WhatsApp */}
        <a
          href={`https://wa.me/${CONCIERGE_PHONE}?text=${encodeURIComponent(
            "Hello Egypt Travel Swiss, I have an inquiry about airport transfer."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold py-3 px-6 rounded-xl transition-all shadow-sm"
        >
          <FaWhatsapp className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        {/* Viber */}
        <a
          href={`viber://chat?number=%2B${CONCIERGE_PHONE}`}
          className="inline-flex items-center gap-2 bg-[#7360F2] hover:bg-[#604ee0] text-white text-xs sm:text-sm font-bold py-3 px-6 rounded-xl transition-all shadow-sm"
        >
          <FaViber className="w-4 h-4" />
          <span>Viber</span>
        </a>

        {/* Telegram */}
        <a
          href="https://t.me/egyptdreams"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#0088cc] hover:bg-[#0077b3] text-white text-xs sm:text-sm font-bold py-3 px-6 rounded-xl transition-all shadow-sm"
        >
          <FaTelegramPlane className="w-4 h-4" />
          <span>Telegram</span>
        </a>
      </div>
    </div>
  );
}
