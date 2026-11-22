"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface TransferDiscountBannerProps {
  isRoundTrip: boolean;
  discountPercentage?: number;
  onActivateRoundTrip: () => void;
}

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function TransferDiscountBanner({
  isRoundTrip,
  discountPercentage = 10,
  onActivateRoundTrip,
}: TransferDiscountBannerProps) {
  const { dictionary: dict } = useLocale();
  const shouldReduce = useReducedMotion();
  const t = dict.transfers.discountBanner;

  const pct = Math.max(1, Math.round(discountPercentage));
  const titleText = t.title.replace("{pct}", String(pct));

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 12 }}
      animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: BRAND_EASE }}
      className="w-full bg-[#013E51] text-white rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 shadow-md border border-[#E8B34A]/30 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <div className="flex items-center gap-3.5 text-center sm:text-left">
        <div className="w-11 h-11 rounded-full bg-[#E8B34A]/20 flex items-center justify-center shrink-0 text-[#E8B34A]">
          <FiAward className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-[family-name:var(--font-cormorant)] text-lg sm:text-xl font-bold text-[#E8B34A]">
            {titleText}
          </h4>
          <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-white/80">
            {t.description}
          </p>
        </div>
      </div>

      {!isRoundTrip && (
        <button
          type="button"
          onClick={onActivateRoundTrip}
          className="shrink-0 bg-[#E8B34A] hover:bg-[#d69f37] text-[#013E51] font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors cursor-pointer"
        >
          {t.button}
        </button>
      )}
    </motion.div>
  );
}
