"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/shared/providers/LocaleProvider";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function DestinationsHeader() {
  const { dictionary: dict } = useLocale();
  const reduced = useReducedMotion();

  const palmVariants = (delay: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: reduced ? 0.15 : 1.2,
      delay: reduced ? 0 : delay,
      ease: EASE,
    },
  });

  const titleVariants = {
    initial: { opacity: 0, y: reduced ? 0 : 12 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0.15 : 0.8,
      delay: reduced ? 0 : 0.3,
      ease: EASE,
    },
  };

  const lineVariants = (delay: number) => ({
    initial: { opacity: 0, scaleX: reduced ? 1 : 0 },
    animate: { opacity: 1, scaleX: 1 },
    transition: {
      duration: reduced ? 0.15 : 0.8,
      delay: reduced ? 0 : delay,
      ease: EASE,
    },
  });

  const subtitleVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: reduced ? 0.15 : 0.6,
      delay: reduced ? 0 : 0.6,
      ease: EASE,
    },
  };

  return (
    <div className="relative w-full overflow-hidden pt-10 sm:pt-14 pb-4 sm:pb-6">
      {/* Palm Trees Watermark Left */}
      <motion.div
        {...palmVariants(0)}
        className="absolute left-0 top-0 bottom-0 w-36 sm:w-56 md:w-72 lg:w-96 pointer-events-none select-none opacity-40 sm:opacity-60 lg:opacity-85 z-0"
      >
        <Image
          src="/Destinations/39f0a17e81137e954d1d170cfba0553370b2b2b7.png"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 150px, 400px"
          className="object-contain object-left-bottom"
        />
      </motion.div>

      {/* Palm Trees Watermark Right (Mirrored) */}
      <motion.div
        {...palmVariants(0.1)}
        className="absolute right-0 top-0 bottom-0 w-36 sm:w-56 md:w-72 lg:w-96 pointer-events-none select-none opacity-40 sm:opacity-60 lg:opacity-85 z-0 scale-x-[-1]"
      >
        <Image
          src="/Destinations/39f0a17e81137e954d1d170cfba0553370b2b2b7.png"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 150px, 400px"
          className="object-contain object-left-bottom"
        />
      </motion.div>

      {/* Header Center Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Title with Gold Lines */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-3 sm:mb-4">
          <motion.span
            {...lineVariants(0.2)}
            aria-hidden="true"
            className="block w-12 sm:w-24 md:w-76 h-[2.5px] bg-[#E8B34A] shrink-0 origin-right"
          />
          <motion.h1
            {...titleVariants}
            className="whitespace-nowrap font-[family-name:var(--font-cormorant)] text-3xl sm:text-5xl lg:text-[56px] font-bold text-[#013E51] tracking-tight leading-tight"
          >
            {dict.destinations.header.title}
          </motion.h1>
          <motion.span
            {...lineVariants(0.25)}
            aria-hidden="true"
            className="block w-12 sm:w-24 md:w-76 h-[2.5px] bg-[#E8B34A] shrink-0 origin-left"
          />
        </div>

        {/* Subtitle */}
        <motion.p
          {...subtitleVariants}
          className="font-[family-name:var(--font-lato)] text-sm sm:text-base lg:text-lg text-[#013E51]/80 font-normal"
        >
          {dict.destinations.header.subtitle}
        </motion.p>
      </div>
    </div>
  );
}
