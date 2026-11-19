"use client";

import { useState } from "react";
import Link from "next/link";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "how-to-book",
    question: "How do I book a trip?",
    answer:
      "Choose a trip, select your date and guests, then add it to your cart and complete the booking form. You'll receive a confirmation by email.",
  },
  {
    id: "hotel-pickup",
    question: "Is hotel pick-up included?",
    answer:
      "Yes, complimentary hotel pick-up and drop-off is included for all central hotels in Hurghada, Cairo, Sharm El Sheikh, Luxor, and Marsa Alam.",
  },
  {
    id: "cancellation",
    question: "Can I cancel or change my booking?",
    answer:
      "Yes, you can cancel or change your booking up to 24 hours before the scheduled departure for a full refund.",
  },
  {
    id: "diving-experience",
    question: "Do I need diving experience?",
    answer:
      "No prior diving experience is needed for our beginner courses (such as Discover Scuba Diving). Full equipment and certified PADI instructors are provided.",
  },
  {
    id: "payment-methods",
    question: "Which payment methods do you accept?",
    answer:
      "We accept major credit and debit cards (Visa, MasterCard, American Express), bank transfers, and cash payment upon arrival.",
  },
  {
    id: "safety-in-egypt",
    question: "Is Egypt safe for tourists?",
    answer:
      "Egypt is very safe and welcoming for international travelers. Tourist destinations and resorts have dedicated tourism police and modern security standards.",
  },
];

export default function FaqSection() {
  const { locale } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#F7EDE1] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.85fr] gap-10 lg:gap-14 xl:gap-20 items-start">
          {/* Left Column: Heading, Subtitle & CTA */}
          <div className="lg:sticky lg:top-28">
            <span className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#708A93] mb-2 sm:mb-3">
              FAQ
            </span>

            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[48px] xl:text-[54px] font-bold text-[#013E51] leading-[1.12] mb-4 sm:mb-5">
              Frequently Asked <br className="hidden sm:inline" /> Questions
            </h2>

            <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm lg:text-base text-[#013E51]/75 font-normal leading-relaxed mb-7 sm:mb-9 max-w-sm">
              Can&apos;t find what you need? Our team replies within a few hours.
            </p>

            <Link
              href={`/${locale}/contact`}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 sm:px-9 sm:py-4 rounded-full bg-[#013E51] text-white font-[family-name:var(--font-lato)] font-bold text-sm sm:text-base hover:bg-[#024f68] transition-colors text-center"
            >
              Contact Us
            </Link>
          </div>

          {/* Right Column: Accordion List */}
          <div className="space-y-3.5 sm:space-y-4">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-[0px_4px_14px_0px_#013E510D] transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 sm:p-6 lg:px-7 flex items-center justify-between gap-4 cursor-pointer group"
                  >
                    <span className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl font-bold text-[#013E51] leading-snug group-hover:text-[#E8B34A] transition-colors">
                      {item.question}
                    </span>

                    <span className="shrink-0 flex items-center justify-center w-7 h-7">
                      {isOpen ? (
                        <FiMinus className="text-[#E07A5F] text-xl" />
                      ) : (
                        <FiPlus className="text-gray-400 group-hover:text-[#013E51] transition-colors text-xl" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-7 sm:pb-6 pt-0">
                      <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#013E51]/75 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
