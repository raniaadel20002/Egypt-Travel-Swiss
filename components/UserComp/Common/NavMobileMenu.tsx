"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
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

const menuContainerVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: BRAND_EASE },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.16, ease: BRAND_EASE },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.2,
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-drawer"
          variants={shouldReduce ? undefined : menuContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="xl:hidden bg-white border-t border-[#888888]/20 px-6 py-6 shadow-lg"
        >
          <nav className="flex flex-col space-y-1 font-[family-name:var(--font-lato)] text-base">
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
                    className={`block py-2 transition-colors ${
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

            <motion.div
              custom={navLinks.length}
              variants={shouldReduce ? undefined : itemVariants}
              initial="hidden"
              animate="visible"
              className="pt-3 border-t border-[#888888]/15 space-y-2"
            >
              <span className="text-xs font-semibold text-[#888888] uppercase tracking-wider block">
                {dict.nav.aboutAndInfo}
              </span>
              {aboutDropdownItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="block py-1 text-[#013E51] font-medium hover:text-[#E8B34A] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>

            <motion.div
              custom={navLinks.length + 1}
              variants={shouldReduce ? undefined : itemVariants}
              initial="hidden"
              animate="visible"
              className="pt-3 border-t border-[#888888]/15"
            >
              <LanguageSwitcher
                variant="mobile"
                onSelectLanguage={onClose}
              />
            </motion.div>
          </nav>

          <motion.div
            custom={navLinks.length + 2}
            variants={shouldReduce ? undefined : itemVariants}
            initial="hidden"
            animate="visible"
            className="pt-4 border-t border-[#888888]/15 sm:hidden"
          >
            <Link
              href={`/${locale}/trips`}
              onClick={onClose}
              className="w-full inline-flex items-center justify-center py-3 rounded-full bg-[#013E51] text-white font-[family-name:var(--font-lato)] text-sm font-semibold hover:bg-[#024f67] transition-colors shadow-xs"
            >
              {dict.nav.bookNow}
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
