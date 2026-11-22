"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function DivingBottomBanner() {
  const { locale, dictionary } = useLocale();
  const shouldReduce = useReducedMotion();
  const b = dictionary.divingCourses.bottomBanner;

  return (
    <section className="w-full pb-16 sm:pb-20 lg:pb-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
          whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: BRAND_EASE }}
          className="relative rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#013E51] shadow-xl w-full h-[210px] sm:h-[240px] lg:h-[260px] flex items-center"
        >
          {/* Scuba Diver Background Image */}
          <Image
            src="/DivingCourses/adventure-banner.png"
            alt="Scuba diver gliding over coral reef"
            fill
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover object-right sm:object-center select-none"
            priority
          />

          {/* Left Dark Ocean Gradient Overlay for Text Readability */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#012633] via-[#012b38]/85 sm:via-[#012b38]/70 to-transparent"
          />

          {/* Banner Content */}
          <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 lg:px-14 max-w-xl">
            {/* Eyebrow with gold dash */}
            <div className="flex items-center gap-2.5 mb-1.5 sm:mb-2">
              <span className="font-[family-name:var(--font-lato)] text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#E8B34A] uppercase">
                {b.eyebrow}
              </span>
              <span
                aria-hidden="true"
                className="h-[1.5px] w-6 sm:w-10 bg-[#E8B34A]"
              />
            </div>

            {/* Heading */}
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl lg:text-[36px] font-normal text-white leading-tight mb-4 sm:mb-5">
              {b.heading}
            </h2>

            {/* CTA Button */}
            <div>
              <Link
                href={`/${locale}/trips`}
                className="inline-flex items-center gap-2 bg-[#E8B34A] hover:bg-[#d9a33b] text-[#013E51] font-bold text-xs sm:text-sm px-6 py-2.5 sm:px-7 sm:py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:gap-3 group"
              >
                <span>{b.cta}</span>
                <FiArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
