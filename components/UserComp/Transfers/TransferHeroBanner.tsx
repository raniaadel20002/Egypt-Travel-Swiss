"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/shared/providers/LocaleProvider";

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function TransferHeroBanner() {
  const { dictionary: dict } = useLocale();
  const shouldReduce = useReducedMotion();
  const t = dict.transfers.hero;

  return (
    <section className="relative w-full min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] flex items-center overflow-hidden">
      {/* Background Photograph */}
      <Image
        src="/Transfers/transfer-person.jpg"
        alt={t.title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark Ocean Gradient Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#01232e]/85 via-[#013547]/50 to-[#013547]/10"
      />

      {/* Hero Content Area */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 text-center sm:text-left">
        <motion.div
          initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
          animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: BRAND_EASE }}
          className="max-w-2xl"
        >
          {/* Eyebrow */}
          <span className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.25em] text-[#E8B34A] uppercase block mb-3">
            {t.eyebrow}
          </span>

          {/* Title */}
          <h1 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.12] mb-4">
            {t.title}
          </h1>

          {/* Subtitle */}
          <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base lg:text-lg text-white/90 font-normal leading-relaxed max-w-xl">
            {t.description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
