"use client";

import Image from "next/image";

export default function TransferHeroBanner() {
  return (
    <section className="relative w-full min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] flex items-center overflow-hidden">
      {/* Background Photograph */}
      <Image
        src="/Transfers/transfer-person.jpg"
        alt="Airport and private transfer service in Egypt"
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
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 text-center sm:text-left">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <span className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.25em] text-[#E8B34A] uppercase block mb-3">
            Transfer Services
          </span>

          {/* Title */}
          <h1 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.12] mb-4">
            Comfortable &amp; Reliable <br className="hidden sm:inline" />
            Airport Transfers in Hurghada
          </h1>

          {/* Subtitle */}
          <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base lg:text-lg text-white/90 font-normal leading-relaxed max-w-xl">
            Professional private transfer service with licensed drivers and modern
            air-conditioned vehicles. Fixed transparent rates, meet and greet
            service included.
          </p>
        </div>
      </div>
    </section>
  );
}
