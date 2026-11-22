"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function DestinationsBanner() {
  const { locale, dictionary: dict } = useLocale();
  const reduced = useReducedMotion();

  const bannerVariants = {
    initial: { opacity: 0, y: reduced ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: {
      duration: reduced ? 0.15 : 0.9,
      ease: EASE,
    },
  };

  const contentVariants = (delay: number) => ({
    initial: { opacity: 0, x: reduced ? 0 : -16 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: {
      duration: reduced ? 0.15 : 0.7,
      delay: reduced ? 0 : delay,
      ease: EASE,
    },
  });

  return (
    <motion.div
      {...bannerVariants}
      className="relative w-full rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] overflow-hidden shadow-2xl min-h-[260px] sm:min-h-[300px] lg:min-h-[340px] flex items-center bg-[#013E51]"
    >
      {/* Yacht Wake Background Image */}
      <Image
        src="/Destinations/7a5a641e46d66818c2937abc2f7d22d2c2606aa1.png"
        alt="Yacht cruising in deep blue sea"
        fill
        sizes="(max-width: 1440px) 100vw, 1440px"
        className="object-cover object-right sm:object-center"
      />

      {/* Content Area */}
      <div className="relative z-10 p-6 sm:p-10 lg:p-14 max-w-xl space-y-3 sm:space-y-4">
        {/* Eyebrow with gold line */}
        <motion.div
          {...contentVariants(0.15)}
          className="inline-flex items-center gap-3"
        >
          <span className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.2em] text-[#E8B34A] uppercase">
            {dict.destinations.banner.eyebrow}
          </span>
          <span
            aria-hidden="true"
            className="block w-10 sm:w-14 h-[1.5px] bg-[#E8B34A]"
          />
        </motion.div>

        {/* Heading */}
        <motion.h2
          {...contentVariants(0.3)}
          className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[46px] font-bold text-white tracking-wide leading-tight"
        >
          {dict.destinations.banner.heading}
        </motion.h2>

        {/* CTA Button */}
        <motion.div {...contentVariants(0.45)} className="pt-2 sm:pt-3">
          <Link
            href={`/${locale}/trips`}
            className="inline-flex items-center gap-2 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#E8B34A] hover:bg-[#d99f33] text-[#013E51] font-[family-name:var(--font-lato)] font-bold text-sm sm:text-base shadow-md transition-all duration-300 hover:scale-[1.02]"
          >
            <span>{dict.destinations.banner.cta}</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
