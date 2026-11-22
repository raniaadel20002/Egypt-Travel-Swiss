"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/shared/providers/LocaleProvider";
import FlightSearchForm from "./FlightSearchForm";

export default function FlightBookingInquirySection() {
  const { dictionary } = useLocale();
  const shouldReduceMotion = useReducedMotion();
  const t = dictionary.homePage?.flightInquiry || {
    title: "Flight Booking Inquiry",
    subtitle: "Request your flight offer to Egypt – we will provide you with the best options and prices.",
  };

  const floatTransition = shouldReduceMotion
    ? undefined
    : {
        duration: 4.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut" as const,
      };

  const floatTransitionTwo = shouldReduceMotion
    ? undefined
    : {
        duration: 5.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut" as const,
      };

  const floatTransitionThree = shouldReduceMotion
    ? undefined
    : {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut" as const,
      };

  return (
    <section id="flights" className="relative w-full py-10 sm:py-14 lg:py-16 bg-[#FAF7F2] overflow-hidden">
      {/* Decorative Flying Plane Watermarks */}
      <motion.div
        animate={shouldReduceMotion ? undefined : { y: [0, -8, 0], x: [0, 3, 0] }}
        transition={floatTransition}
        className="absolute top-4 sm:top-6 left-6 sm:left-12 lg:left-24 w-12 sm:w-16 md:w-20 pointer-events-none opacity-30 z-0"
      >
        <Image
          src="/home/FlightBookingInquiry/Vector.svg"
          alt=""
          width={85}
          height={57}
          className="w-full h-auto object-contain rotate-12"
        />
      </motion.div>

      <motion.div
        animate={shouldReduceMotion ? undefined : { y: [0, 8, 0], x: [0, -3, 0] }}
        transition={floatTransitionTwo}
        className="absolute top-4 sm:top-6 right-6 sm:right-12 lg:right-24 w-12 sm:w-16 md:w-20 pointer-events-none opacity-30 z-0"
      >
        <Image
          src="/home/FlightBookingInquiry/Vector.svg"
          alt=""
          width={85}
          height={57}
          className="w-full h-auto object-contain rotate-12"
        />
      </motion.div>

      <motion.div
        animate={shouldReduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={floatTransitionThree}
        className="absolute -bottom-2 sm:bottom-2 left-1/2 -translate-x-1/2 w-12 sm:w-16 md:w-20 pointer-events-none opacity-30 z-0"
      >
        <Image
          src="/home/FlightBookingInquiry/Vector.svg"
          alt=""
          width={85}
          height={57}
          className="w-full h-auto object-contain rotate-12"
        />
      </motion.div>

      {/* Main Banner Card */}
      <div className="relative z-10 max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] overflow-hidden bg-[#F7EDE1] border border-[#013E51]/10 shadow-xl flex flex-col lg:block"
        >
          {/* Mobile/Tablet Top Airplane Banner */}
          <div className="lg:hidden relative w-full aspect-[16/9] sm:aspect-[2.2/1] max-h-[260px] overflow-hidden pointer-events-none">
            <Image
              src="/home/FlightBookingInquiry/flight-airplane.png"
              alt="Airplane flying over clouds"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 520px"
              className="object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-14 sm:h-16 bg-gradient-to-t from-[#F7EDE1] via-[#F7EDE1]/70 to-transparent pointer-events-none"
            />
          </div>

          {/* Desktop Airplane Background on Left - Clearly Visible */}
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[28%] xl:w-[25%] 2xl:w-[23%] overflow-hidden pointer-events-none z-0">
            <Image
              src="/home/FlightBookingInquiry/image 4.png"
              alt="Airplane flying over clouds"
              fill
              priority
              className="object-cover object-left"
            />
            {/* Soft right fade into card cream background */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-0 w-20 sm:w-28 bg-gradient-to-r from-transparent via-[#F7EDE1]/60 to-[#F7EDE1]"
            />
          </div>

          {/* Banner Inner Content */}
          <div className="relative z-10 p-5 sm:p-6 md:p-7 lg:p-7 xl:p-8 lg:pl-[26%] xl:pl-[23%] 2xl:pl-[21%] lg:pr-4 xl:pr-6">
            {/* Header: Title and Subtitle */}
            <div className="mb-4 sm:mb-5">
              <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-1.5">
                <Image
                  src="/home/FlightBookingInquiry/title-plane-icon.svg"
                  alt=""
                  width={38}
                  height={38}
                  className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 object-contain"
                />
                <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#013E51] tracking-wide leading-tight">
                  {t.title}
                </h2>
              </div>
              <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#013E51]/80 font-normal">
                {t.subtitle}
              </p>
            </div>

            {/* Flight Search Form */}
            <FlightSearchForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
