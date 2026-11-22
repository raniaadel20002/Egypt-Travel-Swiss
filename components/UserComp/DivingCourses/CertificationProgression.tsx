"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/shared/providers/LocaleProvider";

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function CertificationProgression() {
  const { dictionary } = useLocale();
  const shouldReduce = useReducedMotion();
  const p = dictionary.divingCourses.progression;

  return (
    <section className="w-full pt-14 sm:pt-16 pb-10 sm:pb-12">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
          whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.42, ease: BRAND_EASE }}
          className="text-center mb-14 sm:mb-16"
        >
          <span className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.25em] text-[#888888] uppercase block mb-3">
            {p.eyebrow}
          </span>

          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <span
              aria-hidden="true"
              className="h-px w-12 sm:w-24 bg-[#E8B34A]"
            />
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-5xl font-normal text-[#013E51]">
              {p.heading}
            </h2>
            <span
              aria-hidden="true"
              className="h-px w-12 sm:w-24 bg-[#E8B34A]"
            />
          </div>
        </motion.div>

        {/* 4-Step Progression Grid */}
        <div className="relative">
          {/* Desktop Connecting Line behind step indicators */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-6 left-[12.5%] right-[12.5%] h-[1.5px] bg-[#013E51]/20 -z-0"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-6 relative z-10">
            {p.steps.map((step, idx) => {
              // Step 4 (last step) is gold in the design, steps 1-3 are dark navy
              const isGold = idx === 3;

              return (
                <motion.div
                  key={step.step}
                  initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
                  whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.1,
                    ease: BRAND_EASE,
                  }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step Number Square Pill */}
                  <div
                    className={`w-12 h-12 rounded-[12px] flex items-center justify-center font-bold text-sm tracking-wide shadow-xs transition-transform duration-300 group-hover:scale-110 ${
                      isGold
                        ? "bg-[#E8B34A] text-[#013E51]"
                        : "bg-[#013E51] text-white"
                    }`}
                  >
                    {step.step}
                  </div>

                  {/* Depth & Details Tag */}
                  <span className="font-[family-name:var(--font-lato)] text-[11px] font-bold tracking-[0.16em] text-[#013E51] uppercase mt-5 sm:mt-6 mb-2">
                    {step.depth} • {step.details}
                  </span>

                  {/* Step Title */}
                  <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-[26px] font-normal text-[#013E51] mb-2 leading-snug">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="font-[family-name:var(--font-lato)] text-xs sm:text-[13px] text-[#013E51]/75 leading-relaxed max-w-[250px]">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Subtle Horizontal Divider below steps */}
        <div
          aria-hidden="true"
          className="w-full border-t border-dashed border-[#013E51]/20 mt-14 sm:mt-16"
        />
      </div>
    </section>
  );
}
