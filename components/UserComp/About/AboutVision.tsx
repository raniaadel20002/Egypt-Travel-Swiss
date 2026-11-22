"use client";

import Image from "next/image";
import { FiEye, FiArrowRight } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";

export default function AboutVision() {
  const { dictionary: dict } = useLocale();
  const s = dict.about.vision;

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 items-stretch">
        {/* Left: Our Vision Card (Big card: 24px radius, no shadow, gold border) */}
        <div className="bg-white rounded-[24px] p-7 sm:p-9 lg:p-10 border-[1.5px] border-[#E8B34A] shadow-none flex flex-col justify-between">
          <div>
            {/* Top Row: Title & Eye Icon Container */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#013E51] tracking-tight">
                {s.heading}
              </h2>

              <div className="w-11 h-11 rounded-[16px] bg-[#F8F9FA] flex items-center justify-center text-[#013E51] shrink-0 shadow-[0px_4px_12px_0px_#013E514D]">
                <FiEye className="w-5 h-5 text-[#013E51]" />
              </div>
            </div>

            {/* Vision Statement */}
            <h3 className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl lg:text-[25px] text-[#013E51] font-semibold leading-snug mb-4">
              {s.statement}
            </h3>

            {/* Vision Description Paragraph */}
            <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base text-[#000000] leading-relaxed font-normal">
              {s.description}
            </p>
          </div>

          {/* Bottom Divider & Stewardship Link */}
          <div className="border-t border-solid border-[#E8B34A] mt-6 pt-5">
            <div className="flex items-center gap-2 font-[family-name:var(--font-lato)] text-xs sm:text-sm font-semibold text-[#013E51]">
              <FiArrowRight className="w-4 h-4 text-[#E8B34A]" />
              <span>{s.footer}</span>
            </div>
          </div>
        </div>

        {/* Right: Airplane Window Sunset Photo (24px radius, no shadow) */}
        <div className="relative w-full min-h-[340px] sm:min-h-[400px] lg:min-h-[420px] rounded-[24px] overflow-hidden">
          <Image
            src="/About/789ae46d5f51ff276b7869fffc1461a9b42baf12.jpg"
            alt="Airplane window view overlooking sunset above clouds with passport and travel notebook"
            fill
            sizes="(max-width: 1024px) 100vw, 580px"
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </section>
  );
}
