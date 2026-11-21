"use client";

import Image from "next/image";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";

export default function TripsHeroBanner() {
  const { locale } = useLocale();

  return (
    <section className="relative w-full overflow-hidden shadow-[0px_16px_40px_0px_#013E512E]">
      <div className="relative w-full min-h-[300px] sm:min-h-[360px] md:min-h-0 md:aspect-[2160/687] flex items-center">
        {/* Full Width Image (2160 x 687) */}
        <Image
          src="/Trips/heroTrips.png"
          alt="Pyramids of Giza and Sphinx in Egypt"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Gradient Overlay matching UIPromit/Hero.png */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(1, 62, 81, 0.9) 20.67%, rgba(1, 62, 81, 0.7) 58.65%, rgba(1, 62, 81, 0) 94.71%)",
          }}
        />

        {/* Content Container aligned with site grid */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-8 sm:py-12 lg:py-16 xl:py-20 text-white">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[15px] font-[family-name:var(--font-lato)] mb-3 sm:mb-4 lg:mb-6"
          >
            <Link
              href={`/${locale}`}
              className="font-normal text-white/90 hover:text-white transition-colors"
            >
              Home
            </Link>
            <FiChevronRight className="w-4 h-4 text-white/60" />
            <span className="font-bold text-white">Trips</span>
          </nav>

          {/* Heading */}
          <h1 className="font-[family-name:var(--font-cormorant)] font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[60px] xl:text-[72px] leading-tight lg:leading-[78px] tracking-[1px] text-white max-w-3xl mb-3 sm:mb-4 lg:mb-6">
            Your Next Journey Begins Here
          </h1>

          {/* Subtitle */}
          <p className="font-[family-name:var(--font-lato)] font-normal text-sm sm:text-base lg:text-[18px] leading-relaxed lg:leading-[28px] text-white/90 max-w-2xl">
            Discover unforgettable trips, breathtaking destinations, and
            memorable experiences across the Red Sea and beyond.
          </p>
        </div>
      </div>
    </section>
  );
}
