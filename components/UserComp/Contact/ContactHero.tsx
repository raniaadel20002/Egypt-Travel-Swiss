"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/shared/providers/LocaleProvider";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ContactHero() {
  const { dictionary: dict } = useLocale();
  const h = dict.contact.hero;
  const reduced = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.15 : 0.6, delay: reduced ? 0 : delay, ease: EASE },
  });

  return (
    <section className="relative w-full bg-[#013E51] overflow-hidden py-14 sm:py-16 lg:py-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-12">

          {/* Left Column: Heading and Subtitle */}
          <div className="max-w-xl">
            <motion.h1
              {...fadeUp(0)}
              className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl lg:text-[56px] font-bold text-white tracking-tight leading-[1.12]"
            >
              {h.heading}
            </motion.h1>

            <motion.p
              {...fadeUp(0.14)}
              className="font-[family-name:var(--font-lato)] text-sm sm:text-base text-white/85 font-normal leading-relaxed mt-4 sm:mt-5 max-w-lg"
            >
              {h.description}
            </motion.p>
          </div>

          {/* Right Column: Building + Divider + Office Info */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 lg:gap-10 self-start lg:self-auto">

            {/* Building Image — slides in from right */}
            <motion.div
              initial={{ opacity: 0, x: reduced ? 0 : 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: reduced ? 0.15 : 0.6, delay: reduced ? 0 : 0.18, ease: EASE }}
              className="relative w-[238px] h-[188px] shrink-0"
            >
              <Image
                src="/Contact/photo-wrap.png"
                alt="Egypt Travel Swiss Headquarters"
                fill
                sizes="238px"
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Vertical Divider — fades in after image */}
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, scaleY: reduced ? 1 : 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: reduced ? 0.1 : 0.45, delay: reduced ? 0 : 0.32, ease: EASE }}
              style={{ originY: "top" }}
              className="hidden sm:block w-[1px] h-[105px] bg-[#E8B34A]/70 shrink-0"
            />

            {/* Office Info — fades up last */}
            <motion.div
              {...fadeUp(0.38)}
              className="flex items-center gap-4 shrink-0"
            >
              <div className="relative w-[34px] h-[105px] shrink-0">
                <Image
                  src="/Contact/phone-handset.png"
                  alt="Phone Handset"
                  fill
                  sizes="34px"
                  className="object-contain"
                  priority
                />
              </div>

              <div>
                <span className="block font-[family-name:var(--font-lato)] text-sm sm:text-base font-bold tracking-[0.16em] uppercase text-[#E8B34A]">
                  EGYPT TRAVEL SWISS
                </span>
                <span className="block font-[family-name:var(--font-lato)] text-sm sm:text-base text-white font-medium mt-1">
                  {h.location}
                </span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
