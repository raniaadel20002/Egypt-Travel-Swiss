"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";

const EASE = [0.22, 1, 0.36, 1] as const;

interface FaqSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function FaqSearchBar({
  value,
  onChange,
  placeholder,
}: FaqSearchBarProps) {
  const reduced = useReducedMotion();

  const searchBarVariant = {
    initial: { opacity: 0, scale: reduced ? 1 : 0.96 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: reduced ? 0.15 : 0.5,
      delay: reduced ? 0 : 0.4,
      ease: EASE,
    },
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <motion.div
      {...searchBarVariant}
      className="max-w-xl mx-auto relative"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search FAQ questions"
        className="w-full px-5 py-3.5 pl-12 pr-12 rounded-full bg-white text-[#013E51] text-sm sm:text-base placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#E8B34A] transition-shadow"
      />
      <FiSearch className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      
      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <FiX className="w-4 h-4 text-gray-600" />
        </button>
      )}
    </motion.div>
  );
}
