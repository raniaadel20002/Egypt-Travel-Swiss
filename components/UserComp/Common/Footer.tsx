"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useLocale } from "@/shared/providers/LocaleProvider";

export default function Footer() {
  const { locale } = useLocale();

  const exploreLinks = [
    { label: "Home", href: `/${locale}` },
    { label: "Trips", href: `/${locale}/trips` },
    { label: "Destinations", href: `/${locale}/destinations` },
    { label: "Diving Courses", href: `/${locale}/diving-courses` },
  ];

  const serviceLinks = [
    { label: "Accommodation", href: `/${locale}/accommodation` },
    { label: "Transfers", href: `/${locale}/transfers` },
    { label: "Flighting", href: `/${locale}#flights` },
    { label: "Blog", href: `/${locale}/blog` },
  ];

  const companyLinks = [
    { label: "About Us", href: `/${locale}#why-choose-us` },
    { label: "FAQ", href: `/${locale}#faq` },
    { label: "Contact Us", href: `/${locale}#reviews` },
  ];

  const socialLinks = [
    {
      label: "Facebook",
      href: "https://facebook.com",
      icon: FaFacebookF,
    },
    {
      label: "Instagram",
      href: "https://instagram.com",
      icon: FaInstagram,
    },
    {
      label: "X",
      href: "https://x.com",
      icon: FaXTwitter,
    },
    {
      label: "TikTok",
      href: "https://tiktok.com",
      icon: FaTiktok,
    },
  ];

  return (
    <footer className="w-full bg-[#013E51] text-white">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-8">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 pb-12">
          {/* Brand Info Column */}
          <div className="col-span-2 lg:col-span-4 space-y-4">
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl lg:text-[26px] font-bold tracking-[0.08em] text-white uppercase">
              Egypt Travel Swiss
            </h2>
            <p className="font-[family-name:var(--font-lato)] text-sm text-white/80 leading-relaxed max-w-sm">
              Exceptional journeys crafted around your dreams, from the Red Sea to
              the Nile.
            </p>
          </div>

          {/* Explore Column */}
          <div className="col-span-1 lg:col-span-2 space-y-4">
            <h3 className="font-[family-name:var(--font-lato)] text-base font-semibold text-[#E8B34A]">
              Explore
            </h3>
            <ul className="space-y-3 font-[family-name:var(--font-lato)] text-sm">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/85 hover:text-[#E8B34A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="col-span-1 lg:col-span-2 space-y-4">
            <h3 className="font-[family-name:var(--font-lato)] text-base font-semibold text-[#E8B34A]">
              Services
            </h3>
            <ul className="space-y-3 font-[family-name:var(--font-lato)] text-sm">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/85 hover:text-[#E8B34A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-2 space-y-4">
            <h3 className="font-[family-name:var(--font-lato)] text-base font-semibold text-[#E8B34A]">
              Company
            </h3>
            <ul className="space-y-3 font-[family-name:var(--font-lato)] text-sm">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/85 hover:text-[#E8B34A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us Column */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-2 space-y-4">
            <h3 className="font-[family-name:var(--font-lato)] text-base font-semibold text-[#E8B34A]">
              Follow Us
            </h3>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => {
                const IconComponent = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${s.label}`}
                    className="w-10 h-10 rounded-full border border-white/60 hover:border-[#E8B34A] text-white hover:text-[#E8B34A] flex items-center justify-center transition-colors"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="border-t border-white/15" />

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-[family-name:var(--font-lato)] text-xs sm:text-sm text-white/70">
          <p>© 2026 Egypt Travel Swiss. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}/about`}
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link
              href={`/${locale}/about`}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
