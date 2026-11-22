"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function TripsHeroBanner() {
  const { locale, dictionary } = useLocale();
  const shouldReduce = useReducedMotion();
  const t = dictionary.tripsPage?.hero || {
    breadcrumbHome: "Home",
    breadcrumbTrips: "Trips",
    heading: "Your Next Journey Begins Here",
    subtitle:
      "Discover unforgettable trips, breathtaking destinations, and memorable experiences across the Red Sea and beyond.",
  };

  return (
    <section className="relative w-full overflow-hidden shadow-[0px_16px_40px_0px_#013E512E]">
      <div className="relative w-full h-[250px] sm:h-[300px] lg:h-[350px] xl:h-[360px] flex items-center overflow-hidden">
        {/* Full Width Image (2160 x 687) with smooth scale */}
        <motion.div
          initial={shouldReduce ? undefined : { scale: 1.05 }}
          animate={shouldReduce ? undefined : { scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/Trips/heroTrips.png"
            alt="Pyramids of Giza and Sphinx in Egypt"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Gradient Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(1, 62, 81, 0.9) 20.67%, rgba(1, 62, 81, 0.7) 58.65%, rgba(1, 62, 81, 0) 94.71%)",
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-4 sm:py-6 lg:py-8 text-white">
          {/* Breadcrumbs */}
          <motion.nav
            aria-label="Breadcrumb"
            initial={shouldReduce ? undefined : { opacity: 0, y: 12 }}
            animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: BRAND_EASE }}
            className="flex items-center gap-2 text-xs sm:text-sm font-[family-name:var(--font-lato)] mb-2 sm:mb-2.5 lg:mb-3"
          >
            <Link
              href={`/${locale}`}
              className="font-normal text-white/90 hover:text-white transition-colors"
            >
              {t.breadcrumbHome}
            </Link>
            <FiChevronRight className="w-3.5 h-3.5 text-white/60" />
            <span className="font-bold text-white">{t.breadcrumbTrips}</span>
          </motion.nav>

          {/* Heading */}
          <motion.h1
            initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
            animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: BRAND_EASE }}
            className="font-[family-name:var(--font-cormorant)] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] leading-tight lg:leading-[48px] tracking-[0.5px] text-white max-w-3xl mb-1.5 sm:mb-2 lg:mb-2.5"
          >
            {t.heading}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
            animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: BRAND_EASE }}
            className="font-[family-name:var(--font-lato)] font-normal text-xs sm:text-sm lg:text-base leading-relaxed text-white/90 max-w-2xl"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
