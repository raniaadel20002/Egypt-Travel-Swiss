"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiCheckCircle, FiMessageSquare, FiHeadphones } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.22,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: BRAND_EASE,
    },
  },
};

export default function BookingNextStepsTimeline() {
  const { dictionary: dict } = useLocale();
  const shouldReduce = useReducedMotion();
  const t = dict.bookingSuccess.timeline;

  const steps = [
    {
      number: "01",
      icon: FiCheckCircle,
      title: t.step1Title,
      description: t.step1Desc,
    },
    {
      number: "02",
      icon: FiMessageSquare,
      title: t.step2Title,
      description: t.step2Desc,
    },
    {
      number: "03",
      icon: FiHeadphones,
      title: t.step3Title,
      description: t.step3Desc,
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#013E51]/10 space-y-6">
      <div className="space-y-1">
        <span className="text-[11px] font-bold text-[#888888] uppercase tracking-wider block">
          {t.eyebrow}
        </span>
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
          {t.title}
        </h3>
      </div>

      <motion.div
        variants={shouldReduce ? undefined : containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2"
      >
        {steps.map((step) => {
          const IconComp = step.icon;

          return (
            <motion.div
              key={step.number}
              variants={shouldReduce ? undefined : itemVariants}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 relative hover:border-[#013E51]/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#013E51] text-[#E8B34A] flex items-center justify-center shadow-xs">
                  <IconComp className="w-5 h-5" />
                </div>
                <span className="font-mono text-xl font-bold text-[#013E51]/20">
                  {step.number}
                </span>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-sm text-[#013E51]">
                  {step.title}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
