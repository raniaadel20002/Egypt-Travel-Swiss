"use client";

import React from "react";
import { FiBriefcase, FiClock } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import { useLocale } from "@/shared/providers/LocaleProvider";
import {
  FlightsBannerWatermark,
  FlightsPillPlaneIcon,
} from "./FlightsBannerWatermark";

export default function FlightsTrustAndTransfer() {
  const { dictionary } = useLocale();
  const t = dictionary.flightsPage;

  const trustCards = [
    {
      icon: FiClock,
      title: t.trust1Title,
      desc: t.trust1Desc,
    },
    {
      icon: FaCrown,
      title: t.trust2Title,
      desc: t.trust2Desc,
    },
    {
      icon: FiBriefcase,
      title: t.trust3Title,
      desc: t.trust3Desc,
    },
  ];

  return (
    <div className="space-y-8 pt-2">
      {/* 3 Trust Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trustCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white rounded-[20px] p-5 border border-[#E5DDD0] shadow-xs flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-[#E8B34A]/20 text-[#013E51] flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-[#d49622]" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-cormorant)] text-lg font-bold text-[#013E51] leading-snug">
                  {card.title}
                </h3>
                <p className="font-[family-name:var(--font-lato)] text-xs text-[#013E51]/65 mt-0.5">
                  {card.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Airport & Ground Banner (Static, no link to transfer page) */}
      <div className="relative overflow-hidden rounded-[28px] bg-[#013E51] text-white px-7 py-8 sm:px-11 sm:py-10 shadow-md">
        <FlightsBannerWatermark className="-right-20 sm:-right-8 lg:-right-6" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-lg">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-6 h-[1.5px] bg-[#E8B34A]" />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#E8B34A]">
                {t.transferEyebrow}
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl lg:text-[34px] font-semibold text-white leading-[1.18] mb-2.5 max-w-md">
              {t.transferTitle}
            </h3>
            <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-white/75 leading-relaxed max-w-md">
              {t.transferDesc}
            </p>
          </div>

          <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-2.5 shrink-0">
            {[t.transferPill1, t.transferPill2, t.transferPill3].map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/10 backdrop-blur-[2px] border border-white/20 text-xs font-semibold text-white"
              >
                <FlightsPillPlaneIcon />
                <span>{pill}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
