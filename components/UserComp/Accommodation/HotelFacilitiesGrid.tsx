"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { HotelFacilityApiItem } from "@/models/hotel";
import { resolveIconComponent } from "@/shared/utils/iconRegistry";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface HotelFacilitiesGridProps {
  facilities?: HotelFacilityApiItem[];
}

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const DEFAULT_FACILITIES: HotelFacilityApiItem[] = [
  {
    name: "Beach & Lagoon Pools",
    icon: "umbrella",
    order: 1,
    values: [
      "Private sandy beach & house coral reef",
      "3 heated freshwater lagoon swimming pools",
      "Complimentary luxury cabanas & beach service",
    ],
  },
  {
    name: "Dining & Sunset Lounges",
    icon: "utensils",
    order: 2,
    values: [
      "International gourmet buffet & beachfront grill",
      "4 a la carte Mediterranean & Oriental restaurants",
      "Swim-up lagoon bar & Bedouin rooftop terrace",
    ],
  },
  {
    name: "Wellness & Thalasso Spa",
    icon: "spa",
    order: 3,
    values: [
      "Full-service Red Sea Thalasso spa & hammam",
      "Panoramic sea-view fitness & yoga pavilion",
      "Finnish sauna, steam room & couples massage suites",
    ],
  },
  {
    name: "Suite & Concierge Services",
    icon: "concierge-bell",
    order: 4,
    values: [
      "24-hour multilingual guest concierge desk",
      "Complimentary high-speed Wi-Fi across the resort",
      "Private Hurghada Airport transfer arrangement",
    ],
  },
];

export default function HotelFacilitiesGrid({
  facilities,
}: HotelFacilitiesGridProps) {
  const { dictionary } = useLocale();
  const shouldReduce = useReducedMotion();
  const t = dictionary.accommodation.detail;

  const displayFacilities =
    facilities && facilities.length > 0 ? facilities : DEFAULT_FACILITIES;

  return (
    <section className="space-y-6">
      {/* Section Header with decorative horizontal line */}
      <div className="flex items-center gap-4">
        <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51] whitespace-nowrap">
          {t.facilitiesHeading}
        </h2>
        <div className="h-px bg-[#E8B34A]/40 w-full" />
      </div>

      {/* 2x2 Grid of Luxury Amenity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayFacilities.map((fac, idx) => {
          const IconComp = resolveIconComponent(fac.icon || fac.name);

          return (
            <motion.div
              key={fac.id || fac.name || idx}
              initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
              whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.35,
                delay: idx * 0.08,
                ease: BRAND_EASE,
              }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-[#013E51]/10 space-y-4 hover:shadow-md transition-shadow"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#013E51] text-[#E8B34A] flex items-center justify-center shrink-0 shadow-xs">
                  <IconComp className="w-4 h-4" />
                </div>
                <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-[#013E51]">
                  {fac.name}
                </h3>
              </div>

              {/* Verified Checklist */}
              {fac.values && fac.values.length > 0 && (
                <ul className="space-y-2 pt-1 font-[family-name:var(--font-lato)] text-sm text-[#4b5563]">
                  {fac.values.map((val, vIdx) => (
                    <li key={vIdx} className="flex items-start gap-2.5">
                      <FiCheck className="w-4 h-4 text-[#E8B34A] shrink-0 mt-0.5" />
                      <span className="leading-snug">{val}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
