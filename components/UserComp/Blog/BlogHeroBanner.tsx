"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/shared/providers/LocaleProvider";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BlogHeroBanner() {
  const { dictionary: dict } = useLocale();
  const hero = dict.blog.hero;
  const reduced = useReducedMotion();

  const heroImageVariant = {
    initial: { opacity: 0, scale: reduced ? 1 : 1.05 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: reduced ? 0.2 : 1.2,
      ease: EASE,
    },
  };

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0.15 : 0.6,
      delay: reduced ? 0 : delay,
      ease: EASE,
    },
  });

  return (
    <section className="relative w-full min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] flex items-center overflow-hidden">
      {/* Background Travel Photograph */}
      <motion.div
        {...heroImageVariant}
        className="absolute inset-0"
      >
        <Image
          src="/Blog/best-time-egypt.jpg"
          alt="Egypt travel stories and inspiration"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Dark Ocean Gradient Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#01232e]/79 via-[#013547]/30 to-[#013547]/0"
      />

      {/* Hero Content Area */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.span
            {...fadeUp(0)}
            className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.25em] text-[#E8B34A] uppercase block mb-3 sm:mb-4"
          >
            {hero.eyebrow}
          </motion.span>

          {/* Title */}
          <motion.h1
            {...fadeUp(0.15)}
            className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.12] mb-4 sm:mb-5"
          >
            {hero.heading}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.3)}
            className="font-[family-name:var(--font-lato)] text-sm sm:text-base lg:text-lg text-white/90 font-normal leading-relaxed max-w-xl"
          >
            {hero.description}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
