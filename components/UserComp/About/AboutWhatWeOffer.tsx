"use client";

import { FiStar } from "react-icons/fi";
import { BsSunFill, BsGeoAltFill } from "react-icons/bs";
import { motion, useReducedMotion } from "framer-motion";
import { ElementType } from "react";
import { useLocale } from "@/shared/providers/LocaleProvider";

type IconEntry = ElementType | string;

const PILLAR_ICONS: IconEntry[] = [
  BsSunFill,
  BsGeoAltFill,
  FiStar,
  "/About/coolicons_hotel-fill-sharp.svg",
  "/About/Vector.svg",
  "/About/Vector (1).svg",
];

export default function AboutWhatWeOffer() {
  const { dictionary: dict } = useLocale();
  const s = dict.about.whatWeOffer;
  const reduced = useReducedMotion();

  return (
    <section id="what-we-offer" className="w-full scroll-mt-24">
      {/* Big Outer Card: 24px radius, no shadow, gold border */}
      <div className="bg-white rounded-[24px] p-7 sm:p-9 lg:p-10 border-[1px] border-[#E8B34A]">
        {/* Section Header */}
        <div className="mb-7 sm:mb-8">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#013E51] tracking-tight mb-2 sm:mb-3">
            {s.heading}
          </h2>

          <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base text-[#000000] max-w-3xl font-normal leading-relaxed">
            {s.description}
          </p>
        </div>

        {/* 6 Small Cards Grid: 16px radius, no shadow, gold-accented border */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {s.pillars.map((pillar, i) => {
            const icon = PILLAR_ICONS[i];
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: reduced ? 0 : 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: reduced ? 0.1 : 0.45,
                  delay: reduced ? 0 : i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="bg-[#F7EDE1] rounded-[16px] p-5 sm:p-6 border border-[#E8B34A] shadow-none flex flex-col justify-between"
              >
                <div>
                  {/* Icon Circle (Dark Teal with Gold Icon) */}
                  <div className="w-10 h-10 rounded-full bg-[#013E51] flex items-center justify-center text-[#E8B34A] shrink-0 mb-4">
                    {typeof icon === "string" ? (
                      <img src={icon} alt="" className="w-5 h-5" />
                    ) : (
                      (() => {
                        const IconComponent = icon;
                        return <IconComponent className="w-5 h-5" />;
                      })()
                    )}
                  </div>

                  {/* Pillar Title */}
                  <h3 className="font-[family-name:var(--font-cormorant)] text-xl sm:text-[22px] font-bold text-[#013E51] mb-2 leading-snug">
                    {pillar.title}
                  </h3>

                  {/* Pillar Description */}
                  <p className="font-[family-name:var(--font-lato)] text-xs sm:text-[13px] text-[#000000] leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
