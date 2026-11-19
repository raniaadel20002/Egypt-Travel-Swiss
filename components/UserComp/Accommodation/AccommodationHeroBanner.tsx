"use client";

import Image from "next/image";

export default function AccommodationHeroBanner() {
  return (
    <section className="relative w-full min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] flex items-center overflow-hidden">
      {/* Background Resort Photograph */}
      <Image
        src="/Accommodation/11321959834a248722878fa22ef11979f7f876d0.jpg"
        alt="Luxury resort in Egypt"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Dark Ocean Gradient Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#01232e]/79 via-[#013547]/30 to-[#013547]/0"
      />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <span className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.25em] text-[#E8B34A] uppercase block mb-3 sm:mb-4">
            Stay With Us
          </span>

          {/* Heading */}
          <h1 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.12] mb-4 sm:mb-5">
            Handpicked Hotels &amp; <br className="hidden sm:inline" />
            Resorts in Egypt
          </h1>

          {/* Subtitle */}
          <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base lg:text-lg text-white/90 font-normal leading-relaxed max-w-xl">
            From peaceful Red Sea beachfronts to historic Nile palaces, discover
            exceptional comfort crafted for unforgettable journeys.
          </p>
        </div>
      </div>
    </section>
  );
}
