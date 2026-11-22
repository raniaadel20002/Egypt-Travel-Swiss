"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { useFaqList } from "@/features/faq/useFaq";
import { QuestionItem } from "@/models/question";

const VALID_API_LANGS = ["en", "fr", "ru", "ro", "it"] as const;
type ApiLang = (typeof VALID_API_LANGS)[number];

const BRAND_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function getValidApiLang(locale: string): ApiLang {
  const code = locale.toLowerCase().slice(0, 2);
  if (VALID_API_LANGS.includes(code as ApiLang)) {
    return code as ApiLang;
  }
  return "en";
}

export default function FaqSection() {
  const { locale, dictionary: dict } = useLocale();
  const shouldReduce = useReducedMotion();
  const apiLang = getValidApiLang(locale);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const { data, isLoading, isError } = useFaqList(
    { PageNumber: 1, PageSize: 50 },
    apiLang
  );

  const rawQuestions: QuestionItem[] = data?.data ?? [];

  // Filter questions with valid translations; do not invent or fall back to English
  const questions = rawQuestions.filter(
    (q) => Boolean(q.text && q.text.trim() && q.answer && q.answer.trim())
  );

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const showSkeleton = isLoading;
  const showEmpty = !isLoading && !isError && questions.length === 0;
  const showItems = !isLoading && !isError && questions.length > 0;

  return (
    <section id="faq" className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#F7EDE1] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.85fr] gap-10 lg:gap-14 xl:gap-20 items-start">
          {/* Left Column: Heading, Subtitle & CTA */}
          <div className="lg:sticky lg:top-28">
            <motion.span
              initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
              whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: BRAND_EASE }}
              className="block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#708A93] mb-2 sm:mb-3"
            >
              {dict.homePage.faq.eyebrow}
            </motion.span>

            <motion.h2
              initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
              whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.08, ease: BRAND_EASE }}
              className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[48px] xl:text-[54px] font-bold text-[#013E51] leading-[1.12] mb-4 sm:mb-5"
            >
              {dict.homePage.faq.heading}
            </motion.h2>

            <motion.p
              initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
              whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: BRAND_EASE }}
              className="font-[family-name:var(--font-lato)] text-xs sm:text-sm lg:text-base text-[#013E51]/75 font-normal leading-relaxed mb-7 sm:mb-9 max-w-sm"
            >
              {dict.homePage.faq.subtitle}
            </motion.p>

            <motion.div
              initial={shouldReduce ? undefined : { opacity: 0, y: 12 }}
              whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: BRAND_EASE }}
            >
              <Link
                href={`/${locale}/contact`}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 sm:px-9 sm:py-4 rounded-full bg-[#013E51] text-white font-[family-name:var(--font-lato)] font-bold text-sm sm:text-base hover:bg-[#024f68] transition-colors text-center"
              >
                {dict.homePage.faq.contactUs}
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Accordion List */}
          <div className="space-y-3.5 sm:space-y-4">
            {/* Loading Skeletons */}
            {showSkeleton &&
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-[0px_4px_14px_0px_#013E510D] animate-pulse"
                >
                  <div className="p-5 sm:p-6 lg:px-7">
                    <div className="h-5 bg-gray-200 rounded-lg w-3/4" />
                  </div>
                </div>
              ))}

            {/* Error State */}
            {isError && !isLoading && (
              <div className="bg-white rounded-[20px] sm:rounded-[24px] p-6 shadow-[0px_4px_14px_0px_#013E510D] text-center">
                <p className="font-[family-name:var(--font-lato)] text-sm text-[#888888]">
                  Unable to load questions at this time.
                </p>
              </div>
            )}

            {/* Empty State */}
            {showEmpty && (
              <div className="bg-white rounded-[20px] sm:rounded-[24px] p-8 sm:p-10 shadow-[0px_4px_14px_0px_#013E510D] text-center">
                <p className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl font-bold text-[#013E51] mb-2">
                  No questions have been added yet.
                </p>
                <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888]">
                  Check back soon or reach out to us directly.
                </p>
              </div>
            )}

            {/* Accordion Items from Questions API */}
            {showItems &&
              questions.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <motion.div
                    key={item.id}
                    initial={shouldReduce ? undefined : { opacity: 0, y: 20 }}
                    whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.5,
                      delay: shouldReduce ? 0 : index * 0.08,
                      ease: BRAND_EASE,
                    }}
                    className="bg-white rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-[0px_4px_14px_0px_#013E510D] transition-all duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(index)}
                      aria-expanded={isOpen}
                      className="w-full text-left p-5 sm:p-6 lg:px-7 flex items-center justify-between gap-4 cursor-pointer group"
                    >
                      <span className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl font-bold text-[#013E51] leading-snug group-hover:text-[#E8B34A] transition-colors">
                        {item.text}
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
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: BRAND_EASE }}
                        className="px-5 pb-5 sm:px-7 sm:pb-6 pt-0"
                      >
                        <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#013E51]/75 leading-relaxed">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
