"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiHelpCircle, FiAlertCircle, FiSearch } from "react-icons/fi";
import { Dictionary } from "@/features/i18n/i18nConfig";

const EASE = [0.22, 1, 0.36, 1] as const;

interface LoadingStateProps {
  count?: number;
}

interface ErrorStateProps {
  dict: Dictionary["faq"]["content"];
}

interface EmptyStateProps {
  dict: Dictionary["faq"]["content"];
  locale: string;
}

interface NoResultsStateProps {
  dict: Dictionary["faq"]["content"];
}

export function LoadingState({ count = 6 }: LoadingStateProps) {
  const reduced = useReducedMotion();

  const skeletonVariant = (i: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 12 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0.1 : 0.3,
      delay: reduced ? 0 : i * 0.05,
      ease: EASE,
    },
  });

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          {...skeletonVariant(i)}
          className="bg-white rounded-[22px] sm:rounded-[26px] p-6 sm:p-7 shadow-[0px_4px_16px_0px_rgba(1,62,81,0.06)] border border-[#013E51]/6"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="h-6 bg-gray-200 rounded-lg animate-pulse w-3/4" />
              <div className="h-4 bg-gray-100 rounded-lg animate-pulse w-1/2" />
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse shrink-0" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function ErrorState({ dict }: ErrorStateProps) {
  const reduced = useReducedMotion();

  const containerVariant = {
    initial: { opacity: 0, y: reduced ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0.15 : 0.5,
      ease: EASE,
    },
  };

  return (
    <motion.div
      {...containerVariant}
      className="bg-white rounded-[24px] sm:rounded-[28px] p-10 sm:p-14 text-center border border-red-100 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)]"
    >
      <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
        <FiAlertCircle className="w-8 h-8" />
      </div>
      <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51] mb-2">
        {dict.errorTitle}
      </h2>
      <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] max-w-md mx-auto">
        {dict.errorDescription}
      </p>
    </motion.div>
  );
}

export function EmptyState({ dict, locale }: EmptyStateProps) {
  const reduced = useReducedMotion();

  const containerVariant = {
    initial: { opacity: 0, y: reduced ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0.15 : 0.5,
      ease: EASE,
    },
  };

  return (
    <motion.div
      {...containerVariant}
      className="bg-white rounded-[28px] p-12 sm:p-16 text-center border border-[#013E51]/10 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]"
    >
      <div className="w-16 h-16 rounded-2xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center mx-auto mb-4">
        <FiHelpCircle className="w-8 h-8" />
      </div>
      <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51] mb-2">
        {dict.emptyTitle}
      </h2>
      <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] max-w-md mx-auto mb-6">
        {dict.emptyDescription}
      </p>
      <Link
        href={`/${locale}/contact`}
        className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-[#013E51] text-white font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-wider hover:bg-[#025670] transition"
      >
        {dict.contactSupport}
      </Link>
    </motion.div>
  );
}

export function NoResultsState({ dict }: NoResultsStateProps) {
  const reduced = useReducedMotion();

  const containerVariant = {
    initial: { opacity: 0, y: reduced ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0.15 : 0.4,
      ease: EASE,
    },
  };

  return (
    <motion.div
      {...containerVariant}
      className="bg-white rounded-[24px] p-10 sm:p-12 text-center border border-[#E8B34A]/20 shadow-[0px_4px_16px_0px_rgba(0,0,0,0.04)]"
    >
      <div className="w-14 h-14 rounded-xl bg-[#E8B34A]/10 text-[#E8B34A] flex items-center justify-center mx-auto mb-4">
        <FiSearch className="w-7 h-7" />
      </div>
      <h3 className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl font-bold text-[#013E51] mb-2">
        {dict.noResultsTitle}
      </h3>
      <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] max-w-md mx-auto">
        {dict.noResultsDescription}
      </p>
    </motion.div>
  );
}
