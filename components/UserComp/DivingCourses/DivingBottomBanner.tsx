"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";

export default function DivingBottomBanner() {
  const { locale } = useLocale();

  return (
    <section className="w-full pb-16 sm:pb-20 lg:pb-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#013E51] shadow-2xl min-h-[320px] sm:min-h-[380px] flex items-center">
          {/* Scuba Diver Background Image */}
          <Image
            src="/DivingCourses/adventure-banner.png"
            alt="Scuba diver gliding over coral reef"
            fill
            sizes="(max-width: 1440px) 100vw, 1440px"

          />

          {/* Banner Content */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.2em] text-[#E8B34A] uppercase">
                Not sure where to start?
              </span>
              <span
                aria-hidden="true"
                className="h-px w-10 sm:w-16 bg-[#E8B34A]"
              />
            </div>

            {/* Heading */}
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight mb-8">
              Your Next Adventure Awaits
            </h2>

            {/* CTA Button */}
            <Link
              href={`/${locale}/trips`}
              className="inline-flex items-center gap-2.5 bg-[#E8B34A] hover:bg-[#d9a33b] text-[#013E51] font-bold text-sm sm:text-base px-7 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:gap-3.5 group"
            >
              <span>Plan Your Trip</span>
              <FiArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
