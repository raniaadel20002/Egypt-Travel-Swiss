"use client";

import { useState } from "react";
import { FiPhone, FiMail, FiClock, FiMessageCircle } from "react-icons/fi";
import { motion, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import { useLocale } from "@/shared/providers/LocaleProvider";

export default function ContactInfoCards() {
  const { dictionary: dict } = useLocale();
  const c = dict.contact.cards;
  const reduced = useReducedMotion();

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, label: string, key: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      toast.success(`${label} ${c.copiedToClipboard}`);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const cardVariant = (i: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: {
      duration: reduced ? 0.1 : 0.45,
      delay: reduced ? 0 : i * 0.08,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  });

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 items-stretch">
        {/* Card 1: WhatsApp */}
        <motion.div {...cardVariant(0)} className="bg-white rounded-[20px] p-7 sm:p-5 lg:p-8 border border-[#E8B34A] flex flex-col justify-between h-full min-h-[158px]">
          <div className="flex items-center gap-2">
            <FiMessageCircle className="w-4 h-4 text-[#E8B34A]" />
            <span className="font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-[0.14em] text-[#013E51]">
              {c.whatsapp}
            </span>
          </div>

          <p className="font-[family-name:var(--font-lato)] text-base sm:text-[17px] font-bold text-[#000000] leading-snug">
            +20 100 482 9104
          </p>

          <div className="flex items-center gap-2 min-h-[30px]">
            <a
              href="https://wa.me/201004829104"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#013E51] text-white rounded-full px-4 py-1.5 text-xs font-semibold hover:bg-[#024f68] transition-colors inline-flex items-center justify-center"
            >
              {c.chat}
            </a>
            <button
              type="button"
              onClick={() => handleCopy("+20 100 482 9104", c.whatsapp, "wa")}
              className="bg-[#F7EDE1] text-[#013E51] rounded-full px-4 py-1.5 text-xs font-semibold hover:bg-[#ebd9c7] transition-colors cursor-pointer inline-flex items-center justify-center"
            >
              {copiedKey === "wa" ? c.copied : c.copy}
            </button>
          </div>
        </motion.div>

        {/* Card 2: Phone */}
        <motion.div {...cardVariant(1)} className="bg-white rounded-[20px] p-7 sm:p-5 lg:p-8 border border-[#E8B34A] flex flex-col justify-between h-full min-h-[158px]">
          <div className="flex items-center gap-2">
            <FiPhone className="w-4 h-4 text-[#E8B34A]" />
            <span className="font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-[0.14em] text-[#013E51]">
              {c.phone}
            </span>
          </div>

          <p className="font-[family-name:var(--font-lato)] text-base sm:text-[17px] font-bold text-[#000000] leading-snug">
            +20 65 344 8210
          </p>

          <div className="flex items-center gap-2 min-h-[30px]">
            <a
              href="tel:+20653448210"
              className="bg-[#013E51] text-white rounded-full px-4 py-1.5 text-xs font-semibold hover:bg-[#024f68] transition-colors inline-flex items-center justify-center"
            >
              {c.call}
            </a>
            <button
              type="button"
              onClick={() => handleCopy("+20 65 344 8210", c.phone, "phone")}
              className="bg-[#F7EDE1] text-[#013E51] rounded-full px-4 py-1.5 text-xs font-semibold hover:bg-[#ebd9c7] transition-colors cursor-pointer inline-flex items-center justify-center"
            >
              {copiedKey === "phone" ? c.copied : c.copy}
            </button>
          </div>
        </motion.div>

        {/* Card 3: Email */}
        <motion.div {...cardVariant(2)} className="bg-white rounded-[20px] p-7 sm:p-5 lg:p-8 border border-[#E8B34A] flex flex-col justify-between h-full min-h-[158px]">
          <div className="flex items-center gap-2">
            <FiMail className="w-4 h-4 text-[#E8B34A]" />
            <span className="font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-[0.14em] text-[#013E51]">
              {c.email}
            </span>
          </div>

          <p className="font-[family-name:var(--font-lato)] text-base sm:text-[17px] font-bold text-[#000000] leading-snug truncate">
            hello@egyptdreams.com
          </p>

          <div className="flex items-center gap-2 min-h-[30px]">
            <a
              href="mailto:hello@egyptdreams.com"
              className="bg-[#013E51] text-white rounded-full px-4 py-1.5 text-xs font-semibold hover:bg-[#024f68] transition-colors inline-flex items-center justify-center"
            >
              {c.email}
            </a>
            <button
              type="button"
              onClick={() => handleCopy("hello@egyptdreams.com", c.email, "email")}
              className="bg-[#F7EDE1] text-[#013E51] rounded-full px-4 py-1.5 text-xs font-semibold hover:bg-[#ebd9c7] transition-colors cursor-pointer inline-flex items-center justify-center"
            >
              {copiedKey === "email" ? c.copied : c.copy}
            </button>
          </div>
        </motion.div>

        {/* Card 4: Red Sea Desk Hours */}
        <motion.div {...cardVariant(3)} className="bg-white rounded-[20px] p-7 sm:p-5 lg:p-8 border border-[#E8B34A] flex flex-col justify-between h-full min-h-[158px]">
          <div className="flex items-center gap-2">
            <FiClock className="w-4 h-4 text-[#E8B34A]" />
            <span className="font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-[0.14em] text-[#013E51]">
              {c.hours}
            </span>
          </div>

          <p className="font-[family-name:var(--font-lato)] text-base sm:text-[17px] font-bold text-[#000000] leading-snug">
            {c.hoursValue}
          </p>

          <div className="flex items-center min-h-[30px]">
            <span className="font-[family-name:var(--font-lato)] text-xs text-[#013E51] font-normal leading-normal">
              {c.airportLine}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
