"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import { QuestionItem } from "@/models/question";

const EASE = [0.22, 1, 0.36, 1] as const;

interface FaqAccordionItemProps {
  item: QuestionItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FaqAccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: FaqAccordionItemProps) {
  const reduced = useReducedMotion();

  const itemVariant = {
    initial: { opacity: 0, y: reduced ? 0 : 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-48px" },
    transition: {
      duration: reduced ? 0.1 : 0.4,
      delay: reduced ? 0 : index * 0.06,
      ease: EASE,
    },
  };

  const answerVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: reduced ? 0.1 : 0.3,
        ease: EASE,
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: reduced ? 0.1 : 0.4,
        ease: EASE,
      },
    },
  };

  return (
    <motion.div
      {...itemVariant}
      className="bg-white rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-[0px_4px_16px_0px_rgba(1,62,81,0.06)] border border-[#013E51]/6 transition-all duration-300 hover:shadow-[0px_6px_20px_0px_rgba(1,62,81,0.09)]"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer group"
      >
        <span className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl font-bold text-[#013E51] leading-snug group-hover:text-[#E8B34A] transition-colors">
          {item.text}
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: reduced ? 0.1 : 0.3, ease: EASE }}
          className="shrink-0 w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center transition-colors group-hover:bg-[#E8B34A]/20"
        >
          {isOpen ? (
            <FiMinus className="text-[#E07A5F] text-lg" />
          ) : (
            <FiPlus className="text-[#013E51] text-lg" />
          )}
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            variants={reduced ? undefined : answerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0 border-t border-gray-100">
              <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#013E51]/80 leading-relaxed pt-4">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
