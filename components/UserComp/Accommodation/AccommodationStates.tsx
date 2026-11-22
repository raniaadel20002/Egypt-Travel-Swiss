"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiAlertCircle, FiHome, FiRefreshCw } from "react-icons/fi";
import { Dictionary } from "@/features/i18n/i18nConfig";

const EASE = [0.22, 1, 0.36, 1] as const;

interface ErrorStateProps {
  dict: Dictionary["accommodation"]["states"];
  onRetry: () => void;
}

interface EmptyStateProps {
  dict: Dictionary["accommodation"]["states"];
}

export function ErrorState({ dict, onRetry }: ErrorStateProps) {
  const reduced = useReducedMotion();

  const containerVariant = {
    initial: { opacity: 0, y: reduced ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0.15 : 0.5,
      ease: EASE,
    },
  };

  const iconVariant = {
    initial: { opacity: 0, scale: reduced ? 1 : 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: reduced ? 0.1 : 0.4,
      delay: reduced ? 0 : 0.1,
      ease: EASE,
    },
  };

  return (
    <motion.div
      {...containerVariant}
      className="bg-white rounded-3xl p-10 text-center max-w-md mx-auto shadow-sm border border-[#013E51]/10"
    >
      <motion.div
        {...iconVariant}
        className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4"
      >
        <FiAlertCircle className="w-8 h-8" />
      </motion.div>
      <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51] mb-2">
        {dict.errorTitle}
      </h3>
      <p className="font-[family-name:var(--font-lato)] text-sm text-[#888888] mb-6">
        {dict.errorDescription}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 bg-[#013E51] hover:bg-[#E8B34A] hover:text-[#013E51] text-white font-[family-name:var(--font-lato)] font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-all cursor-pointer shadow-sm"
      >
        <FiRefreshCw className="w-3.5 h-3.5" />
        <span>{dict.retry}</span>
      </button>
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

  const iconVariant = {
    initial: { opacity: 0, scale: reduced ? 1 : 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: reduced ? 0.1 : 0.4,
      delay: reduced ? 0 : 0.1,
      ease: EASE,
    },
  };

  return (
    <motion.div
      {...containerVariant}
      className="bg-white rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm border border-[#013E51]/10"
    >
      <motion.div
        {...iconVariant}
        className="w-16 h-16 rounded-2xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center mx-auto mb-4"
      >
        <FiHome className="w-8 h-8" />
      </motion.div>
      <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51] mb-2">
        {dict.emptyTitle}
      </h3>
      <p className="font-[family-name:var(--font-lato)] text-sm text-[#888888]">
        {dict.emptyDescription}
      </p>
    </motion.div>
  );
}
