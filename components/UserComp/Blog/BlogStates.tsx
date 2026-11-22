"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiAlertCircle, FiFileText } from "react-icons/fi";
import { Dictionary } from "@/features/i18n/i18nConfig";

const EASE = [0.22, 1, 0.36, 1] as const;

interface LoadingStateProps {
  count?: number;
}

interface ErrorStateProps {
  dict: Dictionary["blog"]["states"];
}

interface EmptyStateProps {
  dict: Dictionary["blog"]["states"];
}

interface EndOfContentProps {
  dict: Dictionary["blog"]["states"];
}

export function LoadingState({ count = 6 }: LoadingStateProps) {
  const reduced = useReducedMotion();

  const skeletonVariant = (i: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0.1 : 0.4,
      delay: reduced ? 0 : i * 0.06,
      ease: EASE,
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          {...skeletonVariant(i)}
          className="bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-sm h-[380px] animate-pulse border border-[#888888]/15"
        >
          <div className="w-full h-[220px] sm:h-[240px] lg:h-[250px] bg-gray-200" />
          <div className="p-6 sm:p-7 space-y-3">
            <div className="h-3 bg-gray-200 rounded w-1/3" />
            <div className="h-6 bg-gray-200 rounded w-full" />
            <div className="h-6 bg-gray-200 rounded w-4/5" />
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-3/4" />
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
      className="text-center py-16 bg-white rounded-3xl border border-red-100 shadow-sm p-8 max-w-xl mx-auto"
    >
      <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
        <FiAlertCircle className="w-8 h-8" />
      </div>
      <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51] mb-2">
        {dict.errorTitle}
      </h3>
      <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888]">
        {dict.errorDescription}
      </p>
    </motion.div>
  );
}

export function EmptyState({ dict }: EmptyStateProps) {
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
      className="text-center py-16 bg-white rounded-3xl border border-[#888888]/20 shadow-sm p-8 max-w-xl mx-auto"
    >
      <div className="w-16 h-16 rounded-2xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center mx-auto mb-4">
        <FiFileText className="w-8 h-8" />
      </div>
      <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51] mb-2">
        {dict.emptyTitle}
      </h3>
      <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888]">
        {dict.emptyDescription}
      </p>
    </motion.div>
  );
}

export function EndOfContent({ dict }: EndOfContentProps) {
  const reduced = useReducedMotion();

  const containerVariant = {
    initial: { opacity: 0, y: reduced ? 0 : 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: {
      duration: reduced ? 0.15 : 0.5,
      ease: EASE,
    },
  };

  const dividerVariant = {
    initial: { scaleX: 0 },
    whileInView: { scaleX: 1 },
    viewport: { once: true, margin: "-40px" },
    transition: {
      duration: reduced ? 0.1 : 0.6,
      ease: EASE,
    },
  };

  return (
    <motion.div
      {...containerVariant}
      className="mt-14 sm:mt-18 text-center pt-10 border-t border-[#013E51]/15 max-w-xl mx-auto"
    >
      <div className="flex items-center justify-center gap-4 mb-2">
        <motion.span
          {...dividerVariant}
          aria-hidden="true"
          className="h-px w-10 sm:w-16 bg-[#E8B34A] origin-center"
        />
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
          {dict.endOfStoriesTitle}
        </h3>
        <motion.span
          {...dividerVariant}
          aria-hidden="true"
          className="h-px w-10 sm:w-16 bg-[#E8B34A] origin-center"
        />
      </div>
      <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888]">
        {dict.endOfStoriesDescription}
      </p>
    </motion.div>
  );
}
