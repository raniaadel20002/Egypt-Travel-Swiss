"use client";

import { useState } from "react";
import Link from "next/link";
import { FiPlus, FiMinus, FiSearch, FiHelpCircle, FiMail, FiPhone } from "react-icons/fi";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { useFaqList } from "@/features/faq/useFaq";
import { QuestionItem } from "@/models/question";

const VALID_API_LANGS = ["en", "fr", "ru", "ro", "it"] as const;
type ApiLang = (typeof VALID_API_LANGS)[number];

function getValidApiLang(locale: string): ApiLang {
  const code = locale.toLowerCase().slice(0, 2);
  if (VALID_API_LANGS.includes(code as ApiLang)) {
    return code as ApiLang;
  }
  return "en";
}

export default function PublicFaqPage() {
  const { locale } = useLocale();
  const apiLang = getValidApiLang(locale);

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError } = useFaqList(
    { PageNumber: 1, PageSize: 50 },
    apiLang
  );

  const rawQuestions: QuestionItem[] = data?.data ?? [];

  // Filter questions with valid translations for current language
  const validQuestions = rawQuestions.filter(
    (q) => Boolean(q.text && q.text.trim() && q.answer && q.answer.trim())
  );

  // Optional in-page search
  const questions = searchQuery.trim()
    ? validQuestions.filter(
        (q) =>
          q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : validQuestions;

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-[#FAF7F2] min-h-screen">
      {/* Hero Banner Header */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#013E51] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#013E51] via-[#025670] to-[#013E51] opacity-90" />
        <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <span className="inline-block font-[family-name:var(--font-lato)] text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#E8B34A] mb-3">
            Help &amp; Support
          </span>
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-[#F7EDE1]">
            Frequently Asked Questions
          </h1>
          <p className="font-[family-name:var(--font-lato)] text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed mb-8">
            Find answers to common questions about tour bookings, pickup locations, cancellation policies, and travel tips in Egypt.
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions or keywords..."
              className="w-full px-5 py-3.5 pl-12 rounded-full bg-white text-[#013E51] text-sm sm:text-base placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#E8B34A]"
            />
            <FiSearch className="w-5 h-5 text-gray-400 absolute left-4.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="w-full py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          {/* Loading Skeletons */}
          {isLoading && (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[22px] p-6 shadow-[0px_4px_16px_0px_rgba(1,62,81,0.06)] animate-pulse"
                >
                  <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-3" />
                  <div className="h-4 bg-gray-100 rounded-lg w-full" />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {isError && !isLoading && (
            <div className="bg-white rounded-[24px] p-10 sm:p-14 text-center border border-red-100 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)]">
              <p className="font-[family-name:var(--font-lato)] text-base text-red-600 font-semibold mb-2">
                Unable to load questions at this time.
              </p>
              <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888]">
                Please check your internet connection or reach out to us directly.
              </p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && questions.length === 0 && (
            <div className="bg-white rounded-[28px] p-12 sm:p-16 text-center border border-[#013E51]/10 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)]">
              <div className="w-16 h-16 rounded-2xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center mx-auto mb-4">
                <FiHelpCircle className="w-8 h-8" />
              </div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51] mb-2">
                No questions have been added yet.
              </h2>
              <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] max-w-md mx-auto mb-6">
                Check back soon or contact our support team if you need immediate assistance.
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-[#013E51] text-white font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-wider hover:bg-[#025670] transition"
              >
                Contact Support
              </Link>
            </div>
          )}

          {/* Accordion Questions List */}
          {!isLoading && !isError && questions.length > 0 && (
            <div className="space-y-4">
              {questions.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-[22px] sm:rounded-[26px] overflow-hidden shadow-[0px_4px_16px_0px_rgba(1,62,81,0.06)] border border-[#013E51]/6 transition-all duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(index)}
                      aria-expanded={isOpen}
                      className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer group"
                    >
                      <span className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl font-bold text-[#013E51] leading-snug group-hover:text-[#E8B34A] transition-colors">
                        {item.text}
                      </span>

                      <span className="shrink-0 w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center transition-colors group-hover:bg-[#E8B34A]/20">
                        {isOpen ? (
                          <FiMinus className="text-[#E07A5F] text-lg" />
                        ) : (
                          <FiPlus className="text-[#013E51] text-lg" />
                        )}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0 border-t border-gray-100">
                        <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#013E51]/80 leading-relaxed pt-4">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Contact Support Card */}
          <div className="mt-14 sm:mt-16 bg-white rounded-[28px] p-8 sm:p-10 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.05)] border border-[#013E51]/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E8B34A]">
                Still Need Assistance?
              </span>
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51] mt-1">
                We are Here to Help You 24/7
              </h3>
              <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] mt-1">
                Reach out to our customer care specialists for tailored inquiries and custom travel requests.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#013E51] hover:bg-[#025670] text-white font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-wider transition shadow-sm"
              >
                <FiMail className="w-4 h-4 text-[#E8B34A]" />
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
