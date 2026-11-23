"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { FiShoppingCart, FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { useCartStore } from "@/features/cart/useCartStore";
import { useModalDismiss } from "@/shared/utils/useModalDismiss";
import LanguageSwitcher from "./LanguageSwitcher";
import NavMobileMenu from "./NavMobileMenu";

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const logoVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.36, ease: BRAND_EASE },
  },
};

const navLinkVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.06 + i * 0.04,
      duration: 0.28,
      ease: BRAND_EASE,
    },
  }),
};

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -6, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.18, ease: BRAND_EASE },
  },
  exit: {
    opacity: 0,
    y: -4,
    scale: 0.98,
    transition: { duration: 0.14, ease: BRAND_EASE },
  },
};

export default function Navbar() {
  const pathname = usePathname();
  const { locale, dictionary: dict } = useLocale();
  const { items: cartItems, hasHydrated } = useCartStore();
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shouldReduce = useReducedMotion();

  useModalDismiss({
    isOpen: isMobileMenuOpen,
    onClose: () => setIsMobileMenuOpen(false),
  });

  const navLinks = [
    { key: "home", label: dict.nav.home, href: `/${locale}` },
    { key: "trips", label: dict.nav.trips, href: `/${locale}/trips` },
    { key: "destinations", label: dict.nav.destinations, href: `/${locale}/destinations` },
    { key: "divingCourses", label: dict.nav.divingCourses, href: `/${locale}/diving-courses` },
    { key: "accommodation", label: dict.nav.accommodation, href: `/${locale}/accommodation` },
    { key: "transfers", label: dict.nav.transfers, href: `/${locale}/transfers` },
    { key: "flights", label: dict.nav.flights, href: `/${locale}/flights` },
  ];

  const aboutDropdownItems = [
    { label: dict.nav.aboutUs, href: `/${locale}/about` },
    { label: dict.nav.contactUs, href: `/${locale}/contact` },
  ];

  const isHomeActive = pathname === `/${locale}` || pathname === `/${locale}/`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#888888]/20 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.05)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-20 sm:h-24 flex items-center justify-between">
        {/* Brand Logo */}
        <motion.div
          variants={shouldReduce ? undefined : logoVariants}
          initial="hidden"
          animate="visible"
        >
          <Link href={`/${locale}`} className="flex items-center gap-2.5 sm:gap-3.5 group">
            <div className="shrink-0 flex items-center justify-center">
              <svg
                width="32"
                height="28"
                viewBox="0 0 36 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="sm:w-9 sm:h-8 drop-shadow-xs"
              >
                <polygon points="18,0 36,32 0,32" fill="#E8B34A" />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl font-bold tracking-[0.14em] text-[#013E51] uppercase transition-colors group-hover:text-[#024f67]">
                Egypt Travel
              </span>
              <span className="font-[family-name:var(--font-lato)] text-[9px] sm:text-[10px] font-semibold tracking-[0.32em] text-[#E8B34A] uppercase -mt-0.5">
                Swiss
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-7 2xl:gap-8 font-[family-name:var(--font-lato)] text-[15px]">
          {navLinks.map((link, i) => {
            const isActive =
              link.key === "home"
                ? isHomeActive
                : pathname.startsWith(link.href);

            return (
              <motion.div
                key={link.key}
                custom={i}
                variants={shouldReduce ? undefined : navLinkVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  href={link.href}
                  className={`transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-[#E8B34A] font-semibold"
                      : "text-[#013E51] font-medium hover:text-[#E8B34A]"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            );
          })}

          {/* About Dropdown */}
          <motion.div
            custom={navLinks.length}
            variants={shouldReduce ? undefined : navLinkVariants}
            initial="hidden"
            animate="visible"
            className="relative"
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsAboutOpen(!isAboutOpen)}
              className="flex items-center gap-1.5 text-[#013E51] font-medium hover:text-[#E8B34A] transition-colors whitespace-nowrap py-2"
            >
              <span>{dict.nav.about}</span>
              <FiChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isAboutOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isAboutOpen && (
                <motion.div
                  key="about-dropdown"
                  variants={shouldReduce ? undefined : dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute left-0 top-full pt-1 z-50"
                >
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
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <LanguageSwitcher />

          <Link
            href={`/${locale}/cart`}
            aria-label={dict.nav.cartAriaLabel}
            className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#F7EDE1] flex items-center justify-center text-[#013E51] hover:bg-[#ebd9c7] transition-colors shadow-xs"
          >
            <FiShoppingCart className="w-5 h-5" />
            {hasHydrated && cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-[#013E51] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
                {cartItems.length > 99 ? "99+" : cartItems.length}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={
              isMobileMenuOpen
                ? dict.nav.menuCloseAriaLabel
                : dict.nav.menuOpenAriaLabel
            }
            className="xl:hidden w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#F7EDE1] flex items-center justify-center text-[#013E51] hover:bg-[#ebd9c7] transition-colors shadow-xs cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <FiX className="w-5 h-5" />
            ) : (
              <FiMenu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <NavMobileMenu
        isOpen={isMobileMenuOpen}
        locale={locale}
        pathname={pathname}
        dict={dict}
        navLinks={navLinks}
        aboutDropdownItems={aboutDropdownItems}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
