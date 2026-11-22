"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { useTripsQuery } from "@/features/trips/useTrips";
import { localeToBackendLanguage } from "@/shared/utils/localeToBackendLanguage";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";
import BestTripCard, { BestTripItemData } from "./BestTripCard";

const EASING = [0.22, 1, 0.36, 1] as const;

export default function BestTripsSection() {
  const { locale, dictionary: dict } = useLocale();
  const shouldReduceMotion = useReducedMotion();
  const t = dict.homePage.bestTrips;

  const backendLanguage = useMemo(
    () => localeToBackendLanguage(locale),
    [locale]
  );

  const { data: trips = [], isLoading } = useTripsQuery({
    PageSize: 3,
    language: backendLanguage,
  });

  const bestTrips = useMemo<BestTripItemData[]>(() => {
    return trips.slice(0, 3).map((trip) => {
      const primaryImage = trip.images.find((img) => img.isPrimary);
      const imageUrl = primaryImage?.imageUrl || trip.images[0]?.imageUrl;

      return {
        id: trip.id,
        name: trip.name,
        description: trip.description,
        location: trip.destinationInfo?.name || trip.destination || "Egypt",
        adultPrice: trip.adultPrice,
        currencyName: trip.currencyName,
        categoryName: trip.categoryName,
        imageUrl: imageUrl ? resolveApiImageUrl(imageUrl) : null,
        durationValue: trip.durationValue,
        durationTypeName: trip.durationTypeName,
        markerID: trip.markerID,
      };
    });
  }, [trips]);

  return (
    <section className="relative w-full bg-[#013E51] overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Decorative Subtle Aquatic Background Icons */}
      <motion.div
        className="absolute top-6 left-6 w-24 h-24 sm:w-32 sm:h-32 opacity-40 pointer-events-none"
        initial={shouldReduceMotion ? undefined : { opacity: 0, x: -20 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 0.4, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: EASING }}
      >
        <Image
          src="/home/BestTrips/mask.svg"
          alt=""
          width={120}
          height={120}
          className="w-full h-full object-contain"
        />
      </motion.div>

      <motion.div
        className="absolute top-8 right-6 w-24 h-24 sm:w-32 sm:h-32 opacity-40 pointer-events-none scale-x-[-1]"
        initial={shouldReduceMotion ? undefined : { opacity: 0, x: 20 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 0.4, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: EASING }}
      >
        <Image
          src="/home/BestTrips/mask.svg"
          alt=""
          width={120}
          height={120}
          className="w-full h-full object-contain"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-1/4 w-20 h-20 sm:w-24 sm:h-24 opacity-35 pointer-events-none -rotate-12 hidden sm:block"
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 0.35, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASING }}
      >
        <Image
          src="/home/BestTrips/fish.svg"
          alt=""
          width={90}
          height={90}
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Title with Animated Golden Gradient Lines */}
        <div className="text-center mb-2">
          <div className="inline-flex flex-nowrap items-center justify-center gap-2 sm:gap-4 lg:gap-6">
            <motion.span
              aria-hidden="true"
              className="block shrink-0 w-8 sm:w-24 md:w-28 h-[3px] rounded-l-full"
              style={{
                background: "linear-gradient(90deg, #E8B34A 0%, #FFFFFF 100%)",
                transformOrigin: "left",
              }}
              initial={shouldReduceMotion ? undefined : { scaleX: 0 }}
              whileInView={shouldReduceMotion ? undefined : { scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: EASING }}
            />

            <motion.h2
              className="whitespace-nowrap font-[family-name:var(--font-cormorant)] text-2xl sm:text-4xl lg:text-[56px] font-bold tracking-[0.08em] uppercase leading-none"
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: EASING }}
            >
              <span className="text-white">{t.titlePart1 || "BEST"} </span>
              <span className="text-[#E8B34A] italic">{t.titlePart2 || "TRIPS"}</span>
            </motion.h2>

            <motion.span
              aria-hidden="true"
              className="block shrink-0 w-16 sm:w-24 md:w-28 h-[3px] rounded-r-full"
              style={{
                background: "linear-gradient(90deg, #FFFFFF 0%, #E8B34A 100%)",
                transformOrigin: "right",
              }}
              initial={shouldReduceMotion ? undefined : { scaleX: 0 }}
              whileInView={shouldReduceMotion ? undefined : { scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: EASING }}
            />
          </div>
        </div>

        {/* Section Subtitle */}
        <motion.p
          className="font-[family-name:var(--font-lato)] text-center text-sm sm:text-base text-white/85 max-w-2xl mx-auto mb-12 sm:mb-16"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 15 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASING }}
        >
          {t.subtitle}
        </motion.p>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="bg-white rounded-[28px] overflow-hidden shadow-xl animate-pulse"
              >
                <div className="w-full h-64 sm:h-72 bg-gray-200" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-6 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
                <div className="px-6 pb-6 pt-2 grid grid-cols-2 gap-3">
                  <div className="h-12 bg-gray-200 rounded-xl" />
                  <div className="h-12 bg-gray-200 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && bestTrips.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={shouldReduceMotion ? undefined : { opacity: 0 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASING }}
          >
            <p className="font-[family-name:var(--font-lato)] text-base text-white/70">
              {t.noTrips}
            </p>
          </motion.div>
        )}

        {/* 3 Trips Cards Grid */}
        {!isLoading && bestTrips.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestTrips.map((trip, index) => (
              <BestTripCard
                key={trip.id}
                trip={trip}
                index={index}
                locale={locale}
                dict={dict}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        )}

        {/* View More Button with Smooth Hover Motion */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASING }}
        >
          <Link
            href={`/${locale}/trips`}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-3.5 rounded-full border border-white text-white font-[family-name:var(--font-lato)] font-semibold text-sm sm:text-base hover:bg-white/10 transition-all shadow-sm active:scale-[0.98]"
          >
            <span>{t.viewMore}</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
