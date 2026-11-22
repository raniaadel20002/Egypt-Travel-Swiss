"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useLocale } from "@/shared/providers/LocaleProvider";

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, delay, ease: BRAND_EASE },
  }),
};

const socialVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.15 + i * 0.06,
      duration: 0.28,
      ease: BRAND_EASE,
    },
  }),
};

const bottomVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, delay: 0.1, ease: BRAND_EASE },
  },
};

export default function Footer() {
  const { locale, dictionary: dict } = useLocale();
  const shouldReduce = useReducedMotion();

  const exploreLinks = [
    { label: dict.footer.links.home, href: `/${locale}` },
    { label: dict.footer.links.trips, href: `/${locale}/trips` },
    { label: dict.footer.links.tripTypes, href: `/${locale}/trip-types` },
    { label: dict.footer.links.destinations, href: `/${locale}/destinations` },
    { label: dict.footer.links.divingCourses, href: `/${locale}/diving-courses` },
  ];

  const serviceLinks = [
    { label: dict.footer.links.accommodation, href: `/${locale}/accommodation` },
    { label: dict.footer.links.transfers, href: `/${locale}/transfers` },
    { label: dict.footer.links.flighting, href: `/${locale}/flights` },
  ];

  const companyLinks = [
    { label: dict.footer.links.aboutUs, href: `/${locale}/about` },
    { label: dict.footer.links.blog, href: `/${locale}/blog` },
    { label: dict.footer.links.faq, href: `/${locale}/faq` },
    { label: dict.footer.links.contactUs, href: `/${locale}/contact` },
  ];

  const socialLinks = [
    { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
    { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
    { label: "X", href: "https://x.com", icon: FaXTwitter },
    { label: "TikTok", href: "https://tiktok.com", icon: FaTiktok },
  ];

  return (
    <footer className="w-full bg-[#013E51] text-white">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 pb-12">
          {/* Brand Info Column */}
          <motion.div
            custom={0}
            variants={shouldReduce ? undefined : columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="col-span-2 lg:col-span-4 space-y-4"
          >
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl lg:text-[26px] font-bold tracking-[0.08em] text-white uppercase">
              Egypt Travel Swiss
            </h2>
            <p className="font-[family-name:var(--font-lato)] text-sm text-white/80 leading-relaxed max-w-sm">
              {dict.footer.tagline}
            </p>
          </motion.div>

          {/* Explore Column */}
          <motion.div
            custom={0.08}
            variants={shouldReduce ? undefined : columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="col-span-1 lg:col-span-2 space-y-4"
          >
            <h3 className="font-[family-name:var(--font-lato)] text-base font-semibold text-[#E8B34A]">
              {dict.footer.explore}
            </h3>
            <ul className="space-y-3 font-[family-name:var(--font-lato)] text-sm">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/85 hover:text-[#E8B34A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Column */}
          <motion.div
            custom={0.14}
            variants={shouldReduce ? undefined : columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="col-span-1 lg:col-span-2 space-y-4"
          >
            <h3 className="font-[family-name:var(--font-lato)] text-base font-semibold text-[#E8B34A]">
              {dict.footer.services}
            </h3>
            <ul className="space-y-3 font-[family-name:var(--font-lato)] text-sm">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/85 hover:text-[#E8B34A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Column */}
          <motion.div
            custom={0.2}
            variants={shouldReduce ? undefined : columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="col-span-2 sm:col-span-1 lg:col-span-2 space-y-4"
          >
            <h3 className="font-[family-name:var(--font-lato)] text-base font-semibold text-[#E8B34A]">
              {dict.footer.company}
            </h3>
            <ul className="space-y-3 font-[family-name:var(--font-lato)] text-sm">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/85 hover:text-[#E8B34A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Follow Us Column */}
          <motion.div
            custom={0.26}
            variants={shouldReduce ? undefined : columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="col-span-2 sm:col-span-1 lg:col-span-2 space-y-4"
          >
            <h3 className="font-[family-name:var(--font-lato)] text-base font-semibold text-[#E8B34A]">
              {dict.footer.followUs}
            </h3>
            <div className="flex items-center gap-3">
              {socialLinks.map((s, i) => {
                const IconComponent = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    custom={i}
                    variants={shouldReduce ? undefined : socialVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${s.label}`}
                    whileHover={shouldReduce ? undefined : { scale: 1.1, transition: { duration: 0.15 } }}
                    className="w-10 h-10 rounded-full border border-white/60 hover:border-[#E8B34A] text-white hover:text-[#E8B34A] flex items-center justify-center transition-colors"
                  >
                    <IconComponent className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Horizontal Divider */}
        <div className="border-t border-white/15" />

        {/* Bottom Bar */}
        <motion.div
          variants={shouldReduce ? undefined : bottomVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          className="pt-8 flex flex-row items-center justify-between gap-4 font-[family-name:var(--font-lato)] text-xs sm:text-sm text-white/70 w-full"
        >
          <p className="text-left">
            &copy; 2026 Egypt Travel Swiss. {dict.footer.allRights}
          </p>

          <div className="flex items-center gap-1.5 text-right shrink-0">
            <span>{dict.footer.poweredBy}</span>
            <a
              href="https://tech-gear.net/en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#E8B34A] font-semibold transition-colors underline-offset-4 hover:underline"
            >
              Tech Gear Solutions
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
