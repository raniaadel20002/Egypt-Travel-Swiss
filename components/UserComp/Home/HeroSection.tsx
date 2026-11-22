"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/shared/providers/LocaleProvider";
import HeroSearchBar from "./HeroSearchBar";

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function HeroSection() {
  const { locale, dictionary } = useLocale();
  const shouldReduce = useReducedMotion();
  const t = dictionary.homePage?.hero || {
    titlePart1: "Discover the",
    titlePart2: "Beauty of",
    titleHighlight: "Egypt",
    subheading: "Your Journey, Beyond Ordinary",
    description:
      "From the timeless wonders of ancient civilizations to the breathtaking beauty of the Red Sea, discover Egypt through exceptional journeys crafted around your dreams.",
    exploreTrips: "Explore Trips",
    exploreDestinations: "Explore Destinations",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduce ? 0 : 0.14,
        delayChildren: shouldReduce ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: BRAND_EASE },
    },
  };

  return (
    <section className="relative w-full overflow-visible bg-[#F7EDE1]">
      {/* Background Image Container with subtle cinematic scale entrance */}
      <div className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] w-full flex items-center overflow-hidden">
        <motion.div
          initial={shouldReduce ? undefined : { scale: 1.06, opacity: 0.9 }}
          animate={shouldReduce ? undefined : { scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/home/hero/Hero.png"
            alt="Discover the Beauty of Egypt"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Hero Content Area */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 w-full pt-10 sm:pt-12 pb-32 sm:pb-40 lg:pb-36">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl space-y-4 sm:space-y-6 text-center sm:text-left mx-auto sm:mx-0"
          >
            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-6xl lg:text-[76px] font-bold text-white leading-[1.08] tracking-tight"
            >
              {t.titlePart1} <br />
              {t.titlePart2}{" "}
              <span className="italic text-[#E8B34A]">{t.titleHighlight}</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="font-[family-name:var(--font-cormorant)] italic text-xl sm:text-2xl lg:text-[32px] text-[#E8B34A] leading-snug"
            >
              {t.subheading}
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="font-[family-name:var(--font-lato)] text-sm sm:text-base lg:text-[17px] text-white/90 leading-relaxed max-w-xl mx-auto sm:mx-0"
            >
              {t.description}
            </motion.p>

            {/* CTA Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-3 sm:gap-4 pt-2 w-full sm:w-auto"
            >
              <motion.div
                whileHover={shouldReduce ? undefined : { scale: 1.04 }}
                whileTap={shouldReduce ? undefined : { scale: 0.98 }}
              >
                <Link
                  href={`/${locale}/trips`}
                  className="w-full sm:w-auto text-center justify-center px-8 py-3.5 rounded-full bg-[#E8B34A] hover:bg-[#d8a339] text-[#013E51] font-[family-name:var(--font-lato)] font-semibold text-sm sm:text-base transition-colors shadow-md inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>{t.exploreTrips}</span>
                  <span>&rarr;</span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={shouldReduce ? undefined : { scale: 1.04 }}
                whileTap={shouldReduce ? undefined : { scale: 0.98 }}
              >
                <Link
                  href={`/${locale}/destinations`}
                  className="w-full sm:w-auto text-center justify-center px-8 py-3.5 rounded-full bg-transparent hover:bg-white/10 text-white font-[family-name:var(--font-lato)] font-semibold text-sm sm:text-base border-2 border-white transition-colors inline-flex items-center cursor-pointer"
                >
                  {t.exploreDestinations}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Search Bar (Animated smooth slide-up entrance) */}
      <motion.div
        initial={shouldReduce ? undefined : { opacity: 0, y: 32 }}
        animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: shouldReduce ? 0 : 0.35, ease: BRAND_EASE }}
        className="relative z-20 px-4 sm:px-6 lg:px-10 -mt-24 sm:-mt-28 lg:-mt-20"
      >
        <HeroSearchBar />
      </motion.div>
    </section>
  );
}
