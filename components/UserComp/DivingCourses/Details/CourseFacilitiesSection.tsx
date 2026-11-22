"use client";

import React from "react";
import {
  FiClock,
  FiAward,
  FiCompass,
  FiUserCheck,
  FiCheckCircle,
  FiLifeBuoy,
  FiShield,
} from "react-icons/fi";
import { DivingCourseFacilityApiItem } from "@/models/divingCourse";

interface CourseFacilitiesSectionProps {
  heading: string;
  subtitle?: string;
  facilities: DivingCourseFacilityApiItem[];
}

function resolveFacilityIcon(iconKey?: string, name?: string) {
  const key = `${iconKey || ""} ${name || ""}`.toLowerCase();
  if (key.includes("clock") || key.includes("duration") || key.includes("durée") || key.includes("durata")) {
    return FiClock;
  }
  if (key.includes("water") || key.includes("depth") || key.includes("profondeur")) {
    return FiCompass;
  }
  if (key.includes("certificate") || key.includes("licence") || key.includes("card") || key.includes("padi")) {
    return FiAward;
  }
  if (key.includes("person") || key.includes("instructor") || key.includes("guide") || key.includes("ratio")) {
    return FiUserCheck;
  }
  if (key.includes("boat") || key.includes("trip") || key.includes("transfer") || key.includes("sea")) {
    return FiLifeBuoy;
  }
  if (key.includes("equipment") || key.includes("gear") || key.includes("safety")) {
    return FiShield;
  }
  return FiCheckCircle;
}

export default function CourseFacilitiesSection({
  heading,
  subtitle,
  facilities,
}: CourseFacilitiesSectionProps) {
  if (!facilities || facilities.length === 0) return null;

  const sorted = [...facilities].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <div className="bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 lg:p-10 shadow-sm border border-[#E5DDD0]">
      {/* Section Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#013E51] leading-tight mb-2">
          {heading}
        </h2>
        {subtitle && (
          <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#013E51]/75 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Facilities Rows */}
      <div className="space-y-3.5 sm:space-y-4">
        {sorted.map((item, idx) => {
          const Icon = resolveFacilityIcon(item.icon, item.name);
          const stepNumber = String(idx + 1).padStart(2, "0");

          return (
            <div
              key={item.id || `fac-${idx}`}
              className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-[18px] sm:rounded-[20px] bg-[#FAF7F2] border border-[#013E51]/5 hover:border-[#E8B34A]/30 transition-all duration-300"
            >
              {/* Navy Icon Container */}
              <div className="w-12 h-12 rounded-[14px] bg-[#013E51] text-[#E8B34A] flex items-center justify-center shrink-0 shadow-xs">
                <Icon className="w-5 h-5 text-[#E8B34A]" />
              </div>

              {/* Content Column */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-[family-name:var(--font-lato)] text-[11px] font-bold tracking-wider text-[#013E51]/70 bg-white px-2 py-0.5 rounded-md border border-[#013E51]/10">
                    {stepNumber}
                  </span>
                  <h3 className="font-[family-name:var(--font-cormorant)] text-base sm:text-lg lg:text-xl font-bold text-[#013E51] truncate">
                    {item.name}
                  </h3>
                </div>
                <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#013E51]/75 leading-relaxed">
                  {item.values}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
