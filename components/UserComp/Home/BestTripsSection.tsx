"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { useTripsQuery } from "@/features/trips/useTrips";
import { localeToBackendLanguage } from "@/shared/utils/localeToBackendLanguage";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";

interface BestTripItem {
  id: string;
  badge: string;
  title: string;
  location: string;
  rating: number;
  reviewsCount: number;
  price: string;
  image: string;
  href: string;
}

const EASING = [0.22, 1, 0.36, 1] as const;

export default function BestTripsSection() {
  const { locale, dictionary: dict } = useLocale();
  const shouldReduceMotion = useReducedMotion();
  const backendLanguage = useMemo(
    () => localeToBackendLanguage(locale),
    [locale]
  );

  const { data: trips = [], isLoading } = useTripsQuery({
    PageSize: 3,
    language: backendLanguage,
  });

  const bestTrips = useMemo(() => {
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
    <section className="relative w-full bg-[#013E51] overflow-hidden py-16 sm:py-20 lg:py-20">
      {/* Background Watermark Outlines */}
      <motion.div
        className="absolute top-6 left-6 w-24 h-24 sm:w-32 sm:h-32 opacity-50 pointer-events-none"
        initial={shouldReduceMotion ? undefined : { opacity: 0, x: -20 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 0.5, x: 0 }}
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
        className="absolute top-8 right-6 w-24 h-24 sm:w-32 sm:h-32 opacity-50 pointer-events-none scale-x-[-1]"
        initial={shouldReduceMotion ? undefined : { opacity: 0, x: 20 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 0.5, x: 0 }}
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
        className="absolute bottom-170 left-1/2 -translate-x-1/2 w-20 h-20 sm:w-28 sm:h-28 opacity-50 pointer-events-none"
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 0.5, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASING }}
      >
        <Image
          src="/home/BestTrips/fish.svg"
          alt=""
          width={110}
          height={110}
          className="w-full h-full object-contain"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-39 left-1/4 w-20 h-20 sm:w-24 sm:h-24 opacity-50 pointer-events-none -rotate-12 hidden sm:block"
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 0.5, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.3, ease: EASING }}
      >
        <Image
          src="/home/BestTrips/fish.svg"
          alt=""
          width={90}
          height={90}
          className="w-full h-full object-contain"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-29 right-10 w-24 h-24 sm:w-28 sm:h-28 opacity-50 pointer-events-none hidden sm:block"
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 0.5, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.4, ease: EASING }}
      >
        <Image
          src="/home/BestTrips/fish.svg"
          alt=""
          width={100}
          height={100}
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Title with Golden Fading Gradient Lines */}
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
              <span className="text-white">BEST </span>
              <span className="text-[#E8B34A] italic">TRIPS</span>
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
          {dict.homePage.bestTrips.subtitle}
        </motion.p>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="bg-white rounded-[28px] overflow-hidden shadow-xl animate-pulse"
              >
                <div className="w-full h-64 sm:h-72 bg-gray-300" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4" />
                  <div className="h-6 bg-gray-300 rounded w-full" />
                  <div className="h-4 bg-gray-300 rounded w-1/2" />
                </div>
                <div className="px-6 pb-6 pt-2 grid grid-cols-2 gap-3">
                  <div className="h-12 bg-gray-300 rounded-xl" />
                  <div className="h-12 bg-gray-300 rounded-xl" />
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
              {dict.homePage.bestTrips.noTrips}
            </p>
          </motion.div>
        )}

        {/* 3 Trips Cards Grid */}
        {!isLoading && bestTrips.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                className="group bg-white rounded-[28px] overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 30 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: EASING,
                }}
              >
                <div>
                  {/* Image & Badge Container */}
                  <div className="relative w-full h-64 sm:h-72 overflow-hidden">
                    <span className="absolute top-4 left-4 z-10 px-4 py-1.5 rounded-full bg-[#013E51]/95 text-white text-xs font-semibold backdrop-blur-xs">
                      {trip.categoryName}
                    </span>

                    {trip.imageUrl ? (
                      <Image
                        src={trip.imageUrl}
                        alt={trip.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#013E51] to-[#025a75] flex items-center justify-center">
                        <span className="text-white/50 text-sm">{dict.homePage.bestTrips.noImage}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Information */}
                  <div className="p-6 space-y-4">
                    {/* Location & Duration Row */}
                    <div className="flex items-center justify-between text-xs font-[family-name:var(--font-lato)]">
                      <span className="flex items-center gap-1.5 text-[#888888] font-medium">
                        <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#888888]" />
                        <span>{trip.location}</span>
                      </span>

                      <span className="text-[#888888] font-medium">
                        {trip.durationValue} {trip.durationTypeName}
                      </span>
                    </div>

                    {/* Trip Title */}
                    <h3 className="font-[family-name:var(--font-cormorant)] text-2xl lg:text-[26px] font-bold text-[#013E51] leading-tight line-clamp-2">
                      {trip.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 pt-1 font-[family-name:var(--font-lato)]">
                      <span className="font-bold text-2xl text-[#013E51]">
                        {trip.adultPrice.toFixed(2)} {trip.currencyName}
                      </span>
                      <span className="text-xs text-[#888888]">{dict.homePage.bestTrips.perPerson}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="px-6 pb-6 pt-2 grid grid-cols-2 gap-3 font-[family-name:var(--font-lato)]">
                  <Link
                    href={`/${locale}/trips/${trip.markerID}`}
                    className="w-full py-3 px-4 rounded-xl bg-[#013E51] hover:bg-[#024f67] text-white text-sm font-semibold transition-colors flex items-center justify-center text-center shadow-xs"
                  >
                    {dict.homePage.bestTrips.bookNow}
                  </Link>

                  <Link
                    href={`/${locale}/trips/${trip.markerID}`}
                    className="w-full py-3 px-4 rounded-xl border border-[#013E51] hover:bg-[#013E51]/5 text-[#013E51] text-sm font-semibold transition-colors flex items-center justify-center gap-2 text-center"
                  >
                    <FiShoppingCart className="w-4 h-4 shrink-0" />
                    <span>{dict.homePage.bestTrips.addToCart}</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View More Button */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASING }}
        >
          <Link
            href={`/${locale}/trips`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-3.5 rounded-full border border-white text-white font-[family-name:var(--font-lato)] font-semibold text-sm sm:text-base hover:bg-white/10 transition-colors shadow-sm"
          >
            <span>{dict.homePage.bestTrips.viewMore}</span>
            <span>&rarr;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
