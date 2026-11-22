"use client";

import React from "react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { MdFlight } from "react-icons/md";
import { useLocale } from "@/shared/providers/LocaleProvider";

export default function FlightsHeroBanner() {
  const { locale, dictionary } = useLocale();
  const t = dictionary.flightsPage;

  return (
    <>
      {/* Full-width Teal Hero Banner */}
      <section className="relative w-full bg-[#013E51] text-white overflow-hidden">
        {/* Subtle decorative circles & airplane line-art watermark on the right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 top-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-white/10 flex items-center justify-center opacity-20"
        >
          <div className="w-[260px] h-[260px] rounded-full border border-white/15 flex items-center justify-center">
            <MdFlight className="w-36 h-36 text-white/70 rotate-45" />
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-6 h-[1.5px] bg-[#E8B34A]" />
              <span className="font-[family-name:var(--font-lato)] text-[11px] font-bold tracking-[0.22em] uppercase text-[#E8B34A]">
                {t.heroEyebrow}
              </span>
            </div>

            <h1 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[48px] font-bold leading-[1.12] text-white mb-4">
              {t.heroTitle}
            </h1>

            <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base text-white/80 leading-relaxed">
              {t.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb Bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-5 pb-2">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-[family-name:var(--font-lato)] text-[#013E51]/60"
        >
          <Link href={`/${locale}`} className="hover:text-[#013E51] transition-colors">
            {t.breadcrumbHome}
          </Link>
          <FiChevronRight className="w-3.5 h-3.5" />
          <span className="font-bold text-[#013E51]">{t.breadcrumbFlights}</span>
        </nav>
      </div>
    </>
  );
}
