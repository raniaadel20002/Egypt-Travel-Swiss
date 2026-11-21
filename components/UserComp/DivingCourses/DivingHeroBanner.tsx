"use client";

import Image from "next/image";

export default function DivingHeroBanner() {
  return (
    <section className="relative w-full min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] flex items-center overflow-hidden shadow-[0px_16px_40px_rgba(1,62,81,0.18)]">

      {/* Background Hero Image */}
      <Image
        src="/DivingCourses/Gemini_Generated_Image_fdmthjfdmthjfdmt 1.png"
        alt="Scuba diving in the Red Sea"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Banner Content Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <span className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.25em] text-[#E8B34A] uppercase block mb-3 sm:mb-4">
            Diving Courses
          </span>

          {/* Title */}
          <h1 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.12] mb-4 sm:mb-5">
            Learn to Dive in <br className="hidden sm:inline" />
            the Red Sea
          </h1>

          {/* Subtitle */}
          <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base lg:text-lg text-white/90 font-normal leading-relaxed max-w-xl">
            Take your skills to the next level with certified instructors, top
            locations and international standards.
          </p>
        </div>
      </div>
    </section>
  );
}
