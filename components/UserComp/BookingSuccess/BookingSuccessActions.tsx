"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface BookingSuccessActionsProps {
  bookingTitle?: string;
}

const CONCIERGE_WHATSAPP_NUMBER = "201063084594";
const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function BookingSuccessActions({
  bookingTitle,
}: BookingSuccessActionsProps) {
  const { dictionary: dict } = useLocale();
  const shouldReduce = useReducedMotion();
  const t = dict.bookingSuccess.actions;

  const rawMessage = t.defaultInquiry.replace("{title}", bookingTitle || "Egypt Experience");
  const encodedMessage = encodeURIComponent(rawMessage);
  const whatsAppUrl = `https://wa.me/${CONCIERGE_WHATSAPP_NUMBER}?text=${encodedMessage}`;

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 12 }}
      animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.36, delay: 0.32, ease: BRAND_EASE }}
      className="flex items-center justify-center pt-4 print:hidden"
    >
      {/* WhatsApp Primary Connect Button */}
      <motion.a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={shouldReduce ? undefined : { scale: 1.02 }}
        whileTap={shouldReduce ? undefined : { scale: 0.98 }}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-bold uppercase tracking-wider transition-colors shadow-md hover:shadow-lg cursor-pointer"
      >
        <FaWhatsapp className="w-5 h-5" />
        <span>{t.chatWhatsApp}</span>
      </motion.a>
    </motion.div>
  );
}
