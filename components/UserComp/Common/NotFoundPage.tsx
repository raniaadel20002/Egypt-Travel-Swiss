"use client";

import Link from "next/link";
import { FiHome, FiCompass, FiArrowLeft } from "react-icons/fi";

export default function NotFoundPage() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Trips", href: "/trips" },
    { label: "Destinations", href: "/destinations" },
    { label: "Diving Courses", href: "/diving-courses" },
    { label: "Accommodation", href: "/accommodation" },
    { label: "Transfers", href: "/transfers" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <div className="min-h-screen bg-[#F7EDE1] flex flex-col justify-between text-[#013E51] font-[family-name:var(--font-lato)]">
      {/* Brand Header */}
      <header className="w-full bg-white border-b border-[#888888]/20 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.05)]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3.5 group">
            {/* Golden Pyramid Mark */}
            <div className="shrink-0 flex items-center justify-center">
              <svg
                width="32"
                height="28"
                viewBox="0 0 36 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="18,0 36,32 0,32" fill="#E8B34A" />
              </svg>
            </div>
            {/* Brand Typography */}
            <div className="flex flex-col leading-tight">
              <span className="font-[family-name:var(--font-cormorant)] text-2xl font-bold tracking-[0.14em] text-[#013E51] uppercase transition-colors group-hover:text-[#024f67]">
                Egypt Travel
              </span>
              <span className="font-[family-name:var(--font-lato)] text-[10px] font-semibold tracking-[0.32em] text-[#E8B34A] uppercase -mt-0.5">
                Swiss
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#013E51] hover:text-[#E8B34A] transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main 404 Hero Container */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-2xl w-full bg-white rounded-[28px] sm:rounded-[36px] p-8 sm:p-12 lg:p-14 text-center shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] border border-[#888888]/20">
          {/* Eyebrow */}
          <span className="font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.25em] text-[#E8B34A] uppercase block mb-3">
            404 • Page Not Found
          </span>

          {/* Large Stylized 404 Heading */}
          <h1 className="font-[family-name:var(--font-cormorant)] text-7xl sm:text-8xl lg:text-9xl font-bold text-[#013E51] leading-none mb-3">
            404
          </h1>

          {/* Subheading */}
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl lg:text-4xl font-normal text-[#013E51] mb-4">
            The page you requested could not be found
          </h2>

          {/* Explanatory Text */}
          <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base text-[#888888] leading-relaxed max-w-lg mx-auto mb-8 sm:mb-10">
            The link you followed may be broken, or the page may have been
            removed. Explore our popular sections below or return to the home
            page.
          </p>

          {/* Primary & Secondary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#013E51] hover:bg-[#024f67] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 rounded-full transition-colors shadow-sm"
            >
              <FiHome className="w-4 h-4 text-[#E8B34A]" />
              <span>Return Home</span>
            </Link>

            <Link
              href="/trips"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#013E51] text-[#013E51] hover:bg-[#013E51]/5 font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 rounded-full transition-colors"
            >
              <FiCompass className="w-4 h-4 text-[#E8B34A]" />
              <span>Explore Trips</span>
            </Link>
          </div>

          {/* Quick Helpful Directory Links */}
          <div className="pt-6 border-t border-[#888888]/15">
            <span className="font-[family-name:var(--font-lato)] text-xs text-[#888888] uppercase tracking-wider block mb-3">
              Popular Destinations & Services
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {quickLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-4 py-1.5 rounded-full bg-[#F7EDE1]/80 hover:bg-[#F7EDE1] text-[#013E51] text-xs font-semibold transition-colors border border-[#888888]/15"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Brand Footer Strip */}
      <footer className="w-full py-6 text-center text-xs text-[#888888] border-t border-[#888888]/15 bg-white">
        <p>© 2026 Egypt Travel Swiss. All rights reserved.</p>
      </footer>
    </div>
  );
}
