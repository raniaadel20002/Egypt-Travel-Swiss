"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { FiX, FiChevronRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Dictionary } from "@/features/i18n/i18nConfig";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavLinkItem {
  key: string;
  label: string;
  href: string;
}

interface AboutItem {
  label: string;
  href: string;
}

interface NavMobileMenuProps {
  isOpen: boolean;
  locale: string;
  pathname: string;
  dict: Dictionary;
  navLinks: NavLinkItem[];
  aboutDropdownItems: AboutItem[];
  onClose: () => void;
}

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.24, ease: BRAND_EASE } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: BRAND_EASE } },
};

const drawerVariants: Variants = {
  hidden: { x: "100%" },
  visible: { x: "0%", transition: { duration: 0.32, ease: BRAND_EASE } },
  exit: { x: "100%", transition: { duration: 0.25, ease: BRAND_EASE } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 14 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.08 + i * 0.035,
      duration: 0.24,
      ease: BRAND_EASE,
    },
  }),
};

export default function NavMobileMenu({
  isOpen,
  locale,
  pathname,
  dict,
  navLinks,
  aboutDropdownItems,
  onClose,
}: NavMobileMenuProps) {
  const shouldReduce = useReducedMotion();
  const isHomeActive = pathname === `/${locale}` || pathname === `/${locale}/`;

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop overlay */}
          <motion.div
            key="drawer-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-[#013E51]/50 backdrop-blur-xs"
          />

          {/* Drawer side panel */}
          <motion.aside
            key="drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            variants={shouldReduce ? undefined : drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 w-[86vw] max-w-[380px] h-full bg-white shadow-[-12px_0px_36px_0px_rgba(1,62,81,0.22)] flex flex-col z-50 font-[family-name:var(--font-lato)]"
          >
            {/* Drawer Header with Brand & Close Button */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0 bg-white">
              <Link href={`/${locale}`} onClick={onClose} className="flex items-center gap-2.5">
                <div className="shrink-0 flex items-center justify-center">
                  <svg width="28" height="24" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="18,0 36,32 0,32" fill="#E8B34A" />
                  </svg>
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-[family-name:var(--font-cormorant)] text-lg font-bold tracking-[0.14em] text-[#013E51] uppercase">
                    Egypt Travel
                  </span>
                  <span className="font-[family-name:var(--font-lato)] text-[9px] font-semibold tracking-[0.32em] text-[#E8B34A] uppercase -mt-0.5">
                    Swiss
                  </span>
                </div>
              </Link>

              <button
                type="button"
                onClick={onClose}
                aria-label={dict.nav.menuCloseAriaLabel || "Close Menu"}
                className="w-10 h-10 rounded-full bg-[#FAF7F2] hover:bg-[#E8B34A]/20 text-[#013E51] flex items-center justify-center transition-colors cursor-pointer"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Navigation Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 overscroll-contain">
              {/* Primary Navigation Links */}
              <nav className="flex flex-col space-y-1.5">
                <span className="text-[11px] font-bold text-[#888888] uppercase tracking-wider block mb-1 px-1">
                  Menu
                </span>
                {navLinks.map((link, i) => {
                  const isActive =
                    link.key === "home"
                      ? isHomeActive
                      : pathname.startsWith(link.href);

                  return (
                    <motion.div
                      key={link.key}
                      custom={i}
                      variants={shouldReduce ? undefined : itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={`flex items-center justify-between px-4 py-3 rounded-2xl text-[15px] transition-all ${
                          isActive
                            ? "bg-[#013E51] text-[#E8B34A] font-bold shadow-xs"
                            : "text-[#013E51] font-semibold hover:bg-[#FAF7F2] hover:text-[#E8B34A]"
                        }`}
                      >
                        <span>{link.label}</span>
                        <FiChevronRight
                          className={`w-4 h-4 transition-transform ${
                            isActive ? "text-[#E8B34A]" : "text-gray-400"
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Company & Info Links */}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <span className="text-[11px] font-bold text-[#888888] uppercase tracking-wider block px-1">
                  {dict.nav.aboutAndInfo}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {aboutDropdownItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className="px-4 py-2.5 rounded-xl bg-[#FAF7F2] text-[#013E51] text-xs font-semibold hover:bg-[#E8B34A]/20 hover:text-[#013E51] transition-colors text-center truncate"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Language Switcher Section */}
              <div className="pt-4 border-t border-gray-100">
                <LanguageSwitcher
                  variant="mobile"
                  onSelectLanguage={onClose}
                />
              </div>
            </div>

            {/* Pinned Bottom Footer Actions */}
            <div className="p-5 border-t border-gray-100 bg-[#FAF7F2]/60 shrink-0">
              <a
                href="https://wa.me/201004829104"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-white border border-[#25D366]/40 text-[#013E51] hover:bg-[#25D366]/10 text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
