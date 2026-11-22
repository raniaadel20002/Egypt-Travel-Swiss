"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/shared/providers/LocaleProvider";

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function DivingHeroBanner() {
  const { dictionary } = useLocale();
  const shouldReduce = useReducedMotion();
  const t = dictionary.divingCourses.hero;

  return (
    <section className="relative w-full min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] flex items-center overflow-hidden shadow-[0px_16px_40px_rgba(1,62,81,0.18)]">
      {/* Background Hero Image */}
      <Image
        src="/DivingCourses/Gemini_Generated_Image_fdmthjfdmthjfdmt 1.png"
        alt="Scuba diving in the Red Sea"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Banner Content Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
        <motion.div
          initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
          animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: BRAND_EASE }}
          className="max-w-2xl"
        >
          {/* Eyebrow */}
          <span className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.25em] text-[#E8B34A] uppercase block mb-3 sm:mb-4">
            {t.eyebrow}
          </span>

          {/* Title */}
          <h1 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.12] mb-4 sm:mb-5">
            {t.title}
          </h1>

          {/* Subtitle */}
          <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base lg:text-lg text-white/90 font-normal leading-relaxed max-w-xl">
            {t.subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
