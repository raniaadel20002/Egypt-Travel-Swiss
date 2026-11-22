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
    <section className="relative w-full h-[250px] sm:h-[300px] lg:h-[350px] xl:h-[360px] flex items-center overflow-hidden shadow-[0px_16px_40px_rgba(1,62,81,0.18)]">
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
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-4 sm:py-6">
        <motion.div
          initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
          animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: BRAND_EASE }}
          className="max-w-2xl"
        >
          {/* Eyebrow */}
          <span className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.22em] text-[#E8B34A] uppercase block mb-1.5 sm:mb-2">
            {t.eyebrow}
          </span>

          {/* Title */}
          <h1 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-4xl lg:text-[44px] font-normal text-white leading-tight mb-2">
            {t.title}
          </h1>

          {/* Subtitle */}
          <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm lg:text-base text-white/90 font-normal leading-relaxed max-w-xl">
            {t.subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
