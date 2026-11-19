"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiShoppingCart, FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { locale } = useLocale();
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: `/${locale}` },
    { label: "Trips", href: `/${locale}/trips` },
    { label: "Destinations", href: `/${locale}/destinations` },
    { label: "Diving Courses", href: `/${locale}/diving-courses` },
    { label: "Accommodation", href: `/${locale}/accommodation` },
    { label: "Transfers", href: `/${locale}/transfers` },
    { label: "Blog", href: `/${locale}/blog` },
  ];

  const aboutDropdownItems = [
    { label: "About Us", href: `/${locale}#why-choose-us` },
    { label: "FAQ", href: `/${locale}#faq` },
  ];

  const isHomeActive = pathname === `/${locale}` || pathname === `/${locale}/`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#888888]/20 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.05)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-24 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-3.5 group">
          {/* Golden Triangle / Pyramid Mark */}
          <div className="shrink-0 flex items-center justify-center">
            <svg
              width="36"
              height="32"
              viewBox="0 0 36 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-xs"
            >
              <polygon points="18,0 36,32 0,32" fill="#E8B34A" />
            </svg>
          </div>

          {/* Brand Typography */}
          <div className="flex flex-col leading-tight">
            <span className="font-[family-name:var(--font-cormorant)] text-2xl font-bold tracking-[0.14em] text-[#013E51] uppercase transition-colors group-hover:text-[#024f67]">
              Egypt Dreams
            </span>
            <span className="font-[family-name:var(--font-lato)] text-[10px] font-semibold tracking-[0.32em] text-[#E8B34A] uppercase -mt-0.5">
              Travel
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-7 2xl:gap-8 font-[family-name:var(--font-lato)] text-[15px]">
          {navLinks.map((link) => {
            const isActive =
              link.label === "Home"
                ? isHomeActive
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`transition-colors whitespace-nowrap ${
                  isActive
                    ? "text-[#E8B34A] font-semibold"
                    : "text-[#013E51] font-medium hover:text-[#E8B34A]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* About Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsAboutOpen(!isAboutOpen)}
              className="flex items-center gap-1.5 text-[#013E51] font-medium hover:text-[#E8B34A] transition-colors whitespace-nowrap py-2"
            >
              <span>About</span>
              <FiChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isAboutOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isAboutOpen && (
              <div className="absolute left-0 top-full pt-1 z-50">
                <div className="w-44 bg-white rounded-xl border border-[#888888]/20 shadow-[0px_4px_16px_0px_rgba(0,0,0,0.1)] py-2">
                  {aboutDropdownItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsAboutOpen(false)}
                      className="block px-4 py-2 text-sm text-[#013E51] hover:text-[#E8B34A] hover:bg-[#F7EDE1]/30 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Cart Icon Button */}
          <Link
            href={`/${locale}/trips`}
            aria-label="View trips"
            className="w-12 h-12 rounded-full bg-[#F7EDE1] flex items-center justify-center text-[#013E51] hover:bg-[#ebd9c7] transition-colors shadow-xs"
          >
            <FiShoppingCart className="w-5 h-5" />
          </Link>

          {/* Book Now Button */}
          <Link
            href={`/${locale}/trips`}
            className="hidden sm:inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#013E51] text-white font-[family-name:var(--font-lato)] text-[15px] font-semibold hover:bg-[#024f67] transition-colors shadow-xs whitespace-nowrap"
          >
            Book Now
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="xl:hidden flex items-center gap-1.5 px-3 py-1.5 text-[#E8B34A] font-[family-name:var(--font-lato)] font-bold text-sm sm:text-base hover:text-[#d8a33a] transition-colors cursor-pointer"
          >
            <span>{isMobileMenuOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-[#888888]/20 px-6 py-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 font-[family-name:var(--font-lato)] text-base">
            {navLinks.map((link) => {
              const isActive =
                link.label === "Home"
                  ? isHomeActive
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-1.5 transition-colors ${
                    isActive
                      ? "text-[#E8B34A] font-semibold"
                      : "text-[#013E51] font-medium hover:text-[#E8B34A]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-2 border-t border-[#888888]/15 space-y-2">
              <span className="text-xs font-semibold text-[#888888] uppercase tracking-wider block">
                About & Information
              </span>
              {aboutDropdownItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1 text-[#013E51] font-medium hover:text-[#E8B34A] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="pt-4 border-t border-[#888888]/15 sm:hidden">
            <Link
              href={`/${locale}/trips`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center py-3 rounded-full bg-[#013E51] text-white font-[family-name:var(--font-lato)] text-sm font-semibold hover:bg-[#024f67] transition-colors shadow-xs"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
