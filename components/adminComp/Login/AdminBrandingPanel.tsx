"use client";

import Image from "next/image";
import Link from "next/link";

export default function AdminBrandingPanel() {
  return (
    <section className="relative w-full lg:w-1/2 xl:w-[52%] min-h-[380px] sm:min-h-[460px] lg:min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-16 overflow-hidden bg-[#013E51]">
      {/* Background Visual Photograph */}
      <Image
        src="/home/hero/Hero.png"
        alt="Egypt Travel Swiss Red Sea Coastline"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 55vw"
        className="object-cover object-center"
      />


      {/* Top Floating Circular Logo Emblem */}
      <div className="relative z-10 flex justify-center lg:justify-start">
        <Link
          href="/"
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white shadow-2xl flex flex-col items-center justify-center border-4 border-white/25 hover:scale-105 transition-transform duration-300 gap-1"
        >
          <svg
            width="32"
            height="28"
            viewBox="0 0 36 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 mb-1"
          >
            <polygon points="18,0 36,32 0,32" fill="#E8B34A" />
          </svg>

          <span className="font-[family-name:var(--font-cormorant)] text-xs sm:text-sm font-bold tracking-[0.1em] text-[#013E51] uppercase leading-none text-center">
            Egypt Travel
          </span>

          <span className="font-[family-name:var(--font-lato)] text-[8px] sm:text-[9px] font-semibold tracking-[0.25em] text-[#E8B34A] uppercase leading-none text-center mt-0.5">
            Swiss
          </span>
        </Link>
      </div>

      {/* Bottom Typography Area */}
      <div className="relative z-10 mt-auto pt-8">
        <span className="font-[family-name:var(--font-lato)] text-xs font-bold tracking-[0.25em] text-[#E8B34A] uppercase block mb-2 sm:mb-3">
          Admin Workspace
        </span>

        <h1 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-3 sm:mb-4 max-w-xl">
          Manage travel experiences with clarity.
        </h1>

        <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm lg:text-base text-white/85 leading-relaxed max-w-md">
          Secure access for keeping tours, content, and daily operations in one
          calm dashboard.
        </p>
      </div>
    </section>
  );
}
