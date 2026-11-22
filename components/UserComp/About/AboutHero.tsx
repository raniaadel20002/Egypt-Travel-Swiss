"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/shared/providers/LocaleProvider";

const PILL_META = [
  { href: "#who-we-are", active: true },
  { href: "#what-we-offer", active: true },
  { href: "#vision-mission", active: true },
  { href: "#what-we-offer", active: false },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AboutHero() {
  const { dictionary: dict } = useLocale();
  const h = dict.about.hero;
  const reduced = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.15 : 0.6, delay: reduced ? 0 : delay, ease: EASE },
  });

  const fadeRight = {
    initial: { opacity: 0, x: reduced ? 0 : 32 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: reduced ? 0.15 : 0.65, delay: reduced ? 0 : 0.2, ease: EASE },
  };

  return (
    <section className="relative w-full bg-[#013E51] overflow-hidden py-10 sm:py-12 lg:py-14 text-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-12">

          {/* Left Column */}
          <div className="max-w-xl">
            {/* Eyebrow */}
            <motion.span
              {...fadeUp(0)}
              className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-white/80 mb-3 sm:mb-4"
            >
              {h.eyebrow}
            </motion.span>

            {/* Heading */}
            <motion.h1
              {...fadeUp(0.1)}
              className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl lg:text-[55px] font-bold text-white tracking-tight leading-[1.12]"
            >
              {h.heading}
            </motion.h1>

            {/* Description */}
            <motion.p
              {...fadeUp(0.2)}
              className="font-[family-name:var(--font-lato)] text-sm sm:text-base text-white/85 font-normal leading-relaxed mt-4 sm:mt-5 max-w-lg"
            >
              {h.description}
            </motion.p>
          </div>

          {/* Right Column: Illustration + Pills */}
          <motion.div
            {...fadeRight}
            className="flex flex-col items-center w-full lg:w-auto"
          >
            <div className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[500px] aspect-1536/1024">
              <Image
                src="/About/4a1aa8c2bf4547cda1865b2666cba3491e82a0f6.png"
                alt="About Us Illustration"
                fill
                sizes="(max-width: 640px) 100vw, 500px"
                className="object-contain"
                priority
              />
            </div>

            {/* Navigation Pills — 2x2 grid on mobile, single row on desktop */}
            <div className="grid grid-cols-2 justify-items-center lg:flex lg:flex-row items-center lg:justify-center gap-2.5 sm:gap-3 mt-4 sm:mt-6">
              {h.pills.map((label, i) => {
                const meta = PILL_META[i];
                return (
                  <motion.a
                    key={label}
                    href={meta?.href ?? "#"}
                    initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reduced ? 0.1 : 0.4,
                      delay: reduced ? 0 : 0.35 + i * 0.07,
                      ease: EASE,
                    }}
                    className={`w-fit whitespace-nowrap rounded-full px-4 py-2 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold transition-all shadow-none ${
                      meta?.active
                        ? "bg-white text-[#013E51] hover:bg-white/90"
                        : "bg-[#013E51] border border-white/70 text-white hover:bg-white/10"
                    }`}
                  >
                    {label}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
