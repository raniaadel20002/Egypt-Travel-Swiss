"use client";

import Image from "next/image";
import FlightSearchForm from "./FlightSearchForm";

export default function FlightBookingInquirySection() {
  return (
    <section id="flights" className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#FAF7F2] overflow-hidden">
      {/* Decorative Flying Plane Watermarks */}
      <div className="absolute top-4 sm:top-6 left-6 sm:left-12 lg:left-24 w-12 sm:w-16 md:w-20 pointer-events-none opacity-30 z-0">
        <Image
          src="/home/FlightBookingInquiry/Vector.svg"
          alt=""
          width={85}
          height={57}
          className="w-full h-auto object-contain rotate-12"
        />
      </div>

      <div className="absolute top-4 sm:top-6 right-6 sm:right-12 lg:right-24 w-12 sm:w-16 md:w-20 pointer-events-none opacity-30 z-0">
        <Image
          src="/home/FlightBookingInquiry/Vector.svg"
          alt=""
          width={85}
          height={57}
          className="w-full h-auto object-contain rotate-12"
        />
      </div>

      <div className="absolute -bottom-2 sm:bottom-2 left-1/2 -translate-x-1/2 w-12 sm:w-16 md:w-20 pointer-events-none opacity-30 z-0">
        <Image
          src="/home/FlightBookingInquiry/Vector.svg"
          alt=""
          width={85}
          height={57}
          className="w-full h-auto object-contain rotate-12"
        />
      </div>

      {/* Main Banner Card */}
      <div className="relative z-10 max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="relative rounded-[32px] sm:rounded-[40px] lg:rounded-[44px] overflow-hidden bg-[#F7EDE1] border border-[#013E51]/5 shadow-xl flex flex-col lg:block">
          {/* Mobile/Tablet Top Airplane Banner (improved mobile version matching flightres.png) */}
          <div className="lg:hidden relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[2.2/1] max-h-[340px] overflow-hidden pointer-events-none">
            <Image
              src="/home/FlightBookingInquiry/flight-airplane.png"
              alt="Airplane flying over clouds"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 520px"
              className="object-cover object-center"
            />
            {/* Fade at bottom into cream card background */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-[#F7EDE1] via-[#F7EDE1]/70 to-transparent pointer-events-none"
            />
          </div>

          {/* Desktop Airplane Background on Left (original desktop appearance) */}
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[36%] xl:w-[32%] overflow-hidden pointer-events-none z-0">
            <Image
              src="/home/FlightBookingInquiry/image 4.png"
              alt="Airplane flying over clouds"
              fill
              priority
              className="object-cover object-left"
            />
            {/* Smooth radial dissolve across the full image */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,transparent_40%,rgba(247,237,225,0.45)_65%,#F7EDE1_90%)]"
            />
            {/* Right edge dissolve into cream background */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-0 w-32 sm:w-44 lg:w-60 bg-gradient-to-r from-transparent via-[#F7EDE1]/60 to-[#F7EDE1]"
            />
            {/* Bottom edge dissolve so it fades smoothly across the bottom */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-20 sm:h-28 lg:h-36 bg-gradient-to-t from-[#F7EDE1] via-[#F7EDE1]/70 to-transparent"
            />
          </div>

          {/* Banner Inner Content: Text and Form aligned together (original desktop appearance) */}
          <div className="relative z-10 p-6 sm:p-8 md:p-9 lg:p-10 xl:p-12 lg:pl-[22%] xl:pl-[26%] 2xl:pl-[30%] lg:pr-5 xl:pr-6">
            {/* Header: Title and Subtitle */}
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-1.5 sm:mb-2">
                <Image
                  src="/home/FlightBookingInquiry/title-plane-icon.svg"
                  alt=""
                  width={45}
                  height={45}
                  className="!w-[45px] !h-[45px] sm:w-7 sm:h-7 object-contain"
                />
                <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl lg:text-[45px] font-bold text-[#013E51] tracking-wide leading-tight">
                  Flight Booking Inquiry
                </h2>
              </div>
              <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm lg:text-base text-[#013E51]/80 font-normal">
                Request your flight offer to Egypt – we&apos;ll provide you with
                the best options and prices.
              </p>
            </div>

            {/* Flight Search Form: Aligned with the header */}
            <FlightSearchForm />
          </div>
        </div>
      </div>
    </section>
  );
}
