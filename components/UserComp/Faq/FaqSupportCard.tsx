"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiMail } from "react-icons/fi";
import { Dictionary } from "@/features/i18n/i18nConfig";

const EASE = [0.22, 1, 0.36, 1] as const;

interface FaqSupportCardProps {
  dict: Dictionary["faq"]["support"];
  locale: string;
}

export default function FaqSupportCard({ dict, locale }: FaqSupportCardProps) {
  const reduced = useReducedMotion();

  const supportCardVariant = {
    initial: { opacity: 0, y: reduced ? 0 : 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      duration: reduced ? 0.15 : 0.6,
      ease: EASE,
    },
  };

  return (
    <motion.div
      {...supportCardVariant}
      className="mt-14 sm:mt-16 bg-white rounded-[28px] p-8 sm:p-10 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.05)] border border-[#013E51]/10 flex flex-col md:flex-row items-center justify-between gap-6"
    >
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#E8B34A] font-[family-name:var(--font-lato)]">
          {dict.eyebrow}
        </span>
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51] mt-1">
          {dict.heading}
        </h3>
        <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] mt-1">
          {dict.description}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <Link
          href={`/${locale}/contact`}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#013E51] hover:bg-[#025670] text-white font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-wider transition shadow-sm"
        >
          <FiMail className="w-4 h-4 text-[#E8B34A]" />
          <span>{dict.contactButton}</span>
        </Link>
      </div>
    </motion.div>
  );
}
