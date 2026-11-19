"use client";

import Image from "next/image";

export default function BlogHeroBanner() {
  return (
    <section className="relative w-full min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] flex items-center overflow-hidden">
      {/* Background Travel Photograph */}
      <Image
        src="/Blog/best-time-egypt.jpg"
        alt="Egypt travel stories and inspiration"
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

      {/* Hero Content Area */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <span className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.25em] text-[#E8B34A] uppercase block mb-3 sm:mb-4">
            Travel Blog
          </span>

          {/* Title */}
          <h1 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.12] mb-4 sm:mb-5">
            Stories, Tips &amp; <br className="hidden sm:inline" />
            Inspiration
          </h1>

          {/* Subtitle */}
          <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base lg:text-lg text-white/90 font-normal leading-relaxed max-w-xl">
            Expert itineraries, diving guides, and local recommendations to help
            you plan and enjoy your journey through Egypt.
          </p>
        </div>
      </div>
    </section>
  );
}
