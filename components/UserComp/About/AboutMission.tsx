"use client";

import Image from "next/image";
import { FiTarget, FiCheck, FiArrowRight } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";

export default function AboutMission() {
  const { dictionary: dict } = useLocale();
  const s = dict.about.mission;

  return (
    <section id="vision-mission" className="w-full scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 items-stretch">
        {/* Left: Beach & Coconut Cart Photo (24px radius, no shadow) */}
        <div className="relative w-full min-h-[340px] sm:min-h-[400px] lg:min-h-[420px] rounded-[24px] overflow-hidden">
          <Image
            src="/About/5e42af6a958b0d867cb4afe7b0a51e14fa1b9bb5.png"
            alt="Travelers enjoying fresh coconuts on the beach in Egypt"
            fill
            sizes="(max-width: 1024px) 100vw, 580px"
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Right: Our Mission Card (Big card: 24px radius, no shadow) */}
        <div className="bg-[#013E51] rounded-[24px] p-7 sm:p-9 lg:p-10 text-white flex flex-col justify-between">
          <div>
            {/* Top Row: Title & Concentric Target Icon */}
            <div className="flex items-center justify-between gap-4 mb-3">
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-tight">
                {s.heading}
              </h2>

              <div className="w-11 h-11 rounded-[16px] border border-[#E8B34A] bg-[#013E51] flex items-center justify-center shrink-0 shadow-[2px_2px_20px_0px_#E8B34A4D]">
                <FiTarget className="w-6 h-6 text-[#E8B34A]" />
              </div>
            </div>

            {/* Core Mission Statement */}
            <h3 className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl lg:text-[25px] text-white font-medium leading-snug mb-6">
              {s.statement}
            </h3>

            {/* 3 Checklist Bullet Items */}
            <ul className="space-y-3.5 sm:space-y-4">
              {s.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <FiCheck className="w-4 h-4 text-[#E8B34A] shrink-0 mt-1" />
                  <span className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-white/90 leading-relaxed font-normal">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Divider & Actionable Standards Link */}
          <div className="border-t border-[#E8B34A] mt-6 pt-5">
            <div className="flex items-center gap-2 font-[family-name:var(--font-lato)] text-xs sm:text-sm font-semibold text-[#E8B34A]">
              <FiArrowRight className="w-4 h-4 text-[#E8B34A]" />
              <span>{s.footer}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
