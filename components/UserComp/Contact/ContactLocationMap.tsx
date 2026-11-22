"use client";

import { FiExternalLink } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";

const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1sHurghada+Marina+Boulevard,+Red+Sea,+Egypt";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Hurghada+Marina+Boulevard+Red+Sea+Egypt";

export default function ContactLocationMap() {
  const { dictionary: dict } = useLocale();
  const m = dict.contact.map;

  return (
    <div className="bg-white rounded-[24px] p-7 sm:p-9 lg:p-10 border-[1px] border-[#E8B34A] flex flex-col justify-between">
      <div>
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 sm:mb-6">
          <div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#013E51] tracking-tight leading-tight">
              {m.heading}
            </h2>
            <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#013E51]/75 mt-1 font-normal">
              {m.address}
            </p>
          </div>

          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-[24px] border-[1px] border-[#E8B34A] text-xs sm:text-sm font-semibold text-[#013E51] hover:bg-gray-50 hover:border-[#013E51] transition-colors"
          >
            <span>{m.openInMaps}</span>
            <FiExternalLink className="w-3.5 h-3.5 text-[#013E51]" />
          </a>
        </div>

        {/* Live Interactive Google Maps Embed */}
        <div className="relative w-full aspect-1044/833 max-h-[460px] min-h-[360px] rounded-[22px] overflow-hidden border-[1px] border-[#E8B34A] bg-[#EBF4F7]">
          <iframe
            title="Hurghada Marina Location on Google Maps"
            src={GOOGLE_MAPS_EMBED_URL}
            className="w-full h-full min-h-[360px] border-0 rounded-[22px]"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
