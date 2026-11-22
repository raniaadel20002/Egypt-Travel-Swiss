"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Dictionary } from "@/features/i18n/i18nConfig";
import FaqSearchBar from "./FaqSearchBar";

const EASE = [0.22, 1, 0.36, 1] as const;

interface FaqHeroProps {
  dict: Dictionary["faq"]["hero"];
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function FaqHero({
  dict,
  searchQuery,
  onSearchChange,
}: FaqHeroProps) {
  const reduced = useReducedMotion();

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
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#013E51] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#013E51] via-[#025670] to-[#013E51] opacity-90" />
      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <motion.span
          {...fadeUp(0)}
          className="inline-block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#E8B34A] mb-3"
        >
          {dict.eyebrow}
        </motion.span>

        <motion.h1
          {...fadeUp(0.12)}
          className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-[#F7EDE1]"
        >
          {dict.heading}
        </motion.h1>

        <motion.p
          {...fadeUp(0.24)}
          className="font-[family-name:var(--font-lato)] text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed mb-8"
        >
          {dict.description}
        </motion.p>

        <FaqSearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder={dict.searchPlaceholder}
        />
      </div>
    </section>
  );
}
