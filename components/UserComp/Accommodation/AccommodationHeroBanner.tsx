"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/shared/providers/LocaleProvider";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AccommodationHeroBanner() {
  const { dictionary: dict } = useLocale();
  const hero = dict.accommodation.hero;
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
    <section className="relative w-full h-[250px] sm:h-[300px] lg:h-[350px] xl:h-[360px] flex items-center overflow-hidden">
      {/* Background Resort Photograph */}
      <motion.div {...heroImageVariant} className="absolute inset-0">
        <Image
          src="/Accommodation/11321959834a248722878fa22ef11979f7f876d0.jpg"
          alt="Luxury resort in Egypt"
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

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-4 sm:py-6">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.span
            {...fadeUp(0)}
            className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.22em] text-[#E8B34A] uppercase block mb-1.5 sm:mb-2"
          >
            {hero.eyebrow}
          </motion.span>

          {/* Heading */}
          <motion.h1
            {...fadeUp(0.15)}
            className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-4xl lg:text-[44px] font-normal text-white leading-tight mb-2"
          >
            {hero.heading}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.3)}
            className="font-[family-name:var(--font-lato)] text-xs sm:text-sm lg:text-base text-white/90 font-normal leading-relaxed max-w-xl"
          >
            {hero.description}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
