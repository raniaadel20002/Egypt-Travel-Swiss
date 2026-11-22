"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface BookingSuccessHeaderProps {
  guestName?: string;
  bookingType: string;
}

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const badgeVariants: Variants = {
  hidden: { scale: 0.75, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      duration: 0.45,
    },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      delay: 0.12,
      ease: BRAND_EASE,
    },
  },
};

export default function BookingSuccessHeader({
  guestName,
  bookingType,
}: BookingSuccessHeaderProps) {
  const { dictionary: dict } = useLocale();
  const shouldReduce = useReducedMotion();
  const tHeader = dict.bookingSuccess.header;

  const getReadableType = () => {
    switch (bookingType.toLowerCase()) {
      case "hotel":
        return tHeader.hotelSecured;
      case "diving":
        return tHeader.divingSecured;
      case "trip":
        return tHeader.tripSecured;
      case "transfer":
        return tHeader.transferSecured;
      default:
        return tHeader.generalSecured;
    }
  };

  const greeting = guestName
    ? tHeader.thankYouGuest.replace("{name}", guestName)
    : tHeader.thankYou;

  return (
    <div className="text-center space-y-4 max-w-2xl mx-auto">
      {/* Animated Checkmark Badge */}
      <motion.div
        variants={shouldReduce ? undefined : badgeVariants}
        initial="hidden"
        animate="visible"
        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#19B8A5]/15 border-2 border-[#19B8A5]/40 text-[#19B8A5] shadow-xs"
      >
        <FiCheck className="w-10 h-10 stroke-[2.5]" />
      </motion.div>

      {/* Main Heading */}
      <motion.div
        variants={shouldReduce ? undefined : textVariants}
        initial="hidden"
        animate="visible"
        className="space-y-2"
      >
        <span className="block font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-widest text-[#E8B34A]">
          {getReadableType()}
        </span>
        <h1 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#013E51] leading-tight">
          {tHeader.title}
        </h1>
        <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base text-[#555555] leading-relaxed">
          {greeting} {tHeader.description}
        </p>
      </motion.div>
    </div>
  );
}
