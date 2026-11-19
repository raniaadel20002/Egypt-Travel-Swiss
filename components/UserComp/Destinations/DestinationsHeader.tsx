"use client";

import Image from "next/image";

export default function DestinationsHeader() {
  return (
    <div className="relative w-full overflow-hidden pt-10 sm:pt-14 pb-4 sm:pb-6">
      {/* Palm Trees Watermark Left */}
      <div className="absolute left-0 top-0 bottom-0 w-36 sm:w-56 md:w-72 lg:w-96 pointer-events-none select-none opacity-40 sm:opacity-60 lg:opacity-85 z-0">
        <Image
          src="/Destinations/39f0a17e81137e954d1d170cfba0553370b2b2b7.png"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 150px, 400px"
          className="object-contain object-left-bottom"
        />
      </div>

      {/* Palm Trees Watermark Right (Mirrored) */}
      <div className="absolute right-0 top-0 bottom-0 w-36 sm:w-56 md:w-72 lg:w-96 pointer-events-none select-none opacity-40 sm:opacity-60 lg:opacity-85 z-0 scale-x-[-1]">
        <Image
          src="/Destinations/39f0a17e81137e954d1d170cfba0553370b2b2b7.png"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 150px, 400px"
          className="object-contain object-left-bottom"
        />
      </div>

      {/* Header Center Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Title with Gold Lines */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-3 sm:mb-4">
          <span
            aria-hidden="true"
            className="block w-12 sm:w-24 md:w-36 h-[1.5px] bg-[#E8B34A] shrink-0"
          />
          <h1 className="whitespace-nowrap font-[family-name:var(--font-cormorant)] text-3xl sm:text-5xl lg:text-[56px] font-bold text-[#013E51] tracking-tight leading-tight">
            Explore Our Destinations
          </h1>
          <span
            aria-hidden="true"
            className="block w-12 sm:w-24 md:w-36 h-[1.5px] bg-[#E8B34A] shrink-0"
          />
        </div>

        {/* Subtitle */}
        <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base lg:text-lg text-[#013E51]/80 font-normal">
          From ancient wonders to natural paradises
        </p>
      </div>
    </div>
  );
}
