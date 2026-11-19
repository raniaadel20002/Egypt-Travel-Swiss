"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/shared/providers/LocaleProvider";
import HeroSearchBar from "./HeroSearchBar";

export default function HeroSection() {
  const { locale } = useLocale();

  return (
    <section className="relative w-full overflow-visible bg-[#F7EDE1]">
      {/* Background Image Container */}
      <div className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] w-full flex items-center">
        <Image
          src="/home/hero/Hero.png"
          alt="Discover the Beauty of Egypt"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Hero Content Area */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 w-full pt-10 sm:pt-12 pb-32 sm:pb-40 lg:pb-36">
          <div className="max-w-2xl space-y-4 sm:space-y-6 text-center sm:text-left mx-auto sm:mx-0">
            {/* Main Headline */}
            <h1 className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-6xl lg:text-[76px] font-bold text-white leading-[1.08] tracking-tight">
              Discover the <br />
              Beauty of <span className="italic text-[#E8B34A]">Egypt</span>
            </h1>

            {/* Subheading */}
            <p className="font-[family-name:var(--font-cormorant)] italic text-xl sm:text-2xl lg:text-[32px] text-[#E8B34A] leading-snug">
              Your Journey, Beyond Ordinary
            </p>

            {/* Description */}
            <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base lg:text-[17px] text-white/90 leading-relaxed max-w-xl mx-auto sm:mx-0">
              From the timeless wonders of ancient civilizations to the breathtaking
              beauty of the Red Sea, discover Egypt through exceptional journeys
              crafted around your dreams.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
              <Link
                href={`/${locale}/trips`}
                className="w-full sm:w-auto text-center justify-center px-8 py-3.5 rounded-full bg-[#E8B34A] hover:bg-[#d8a339] text-[#013E51] font-[family-name:var(--font-lato)] font-semibold text-sm sm:text-base transition-colors shadow-md inline-flex items-center gap-2"
              >
                <span>Explore Trips</span>
                <span>&rarr;</span>
              </Link>

              <Link
                href={`/${locale}/bookings`}
                className="w-full sm:w-auto text-center justify-center px-8 py-3.5 rounded-full bg-transparent hover:bg-white/10 text-white font-[family-name:var(--font-lato)] font-semibold text-sm sm:text-base border-2 border-white transition-colors inline-flex items-center"
              >
                Plan Your Journey
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Search Bar (Positioned overlapping bottom edge) */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-10 -mt-24 sm:-mt-28 lg:-mt-20">
        <HeroSearchBar />
      </div>
    </section>
  );
}
