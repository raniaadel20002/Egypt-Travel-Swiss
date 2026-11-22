"use client";

import { useState, useMemo } from "react";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { useFaqList } from "@/features/faq/useFaq";
import { QuestionItem } from "@/models/question";
import { useDebouncedValue } from "@/shared/utils/useDebouncedValue";
import FaqHero from "./FaqHero";
import FaqAccordion from "./FaqAccordion";
import FaqSupportCard from "./FaqSupportCard";
import { LoadingState, ErrorState, EmptyState } from "./FaqStates";

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
  const { locale, dictionary: dict } = useLocale();
  const apiLang = getValidApiLang(locale);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebouncedValue(searchQuery, 400);

  const { data, isLoading, isError } = useFaqList(
    { PageNumber: 1, PageSize: 50 },
    apiLang
  );

  const rawQuestions: QuestionItem[] = data?.data ?? [];

  const validQuestions = useMemo(() => {
    return rawQuestions.filter(
      (q) => Boolean(q.text && q.text.trim() && q.answer && q.answer.trim())
    );
  }, [rawQuestions]);

  const filteredQuestions = useMemo(() => {
    if (!debouncedQuery.trim()) return validQuestions;

    const query = debouncedQuery.toLowerCase();
    return validQuestions.filter(
      (q) =>
        q.text.toLowerCase().includes(query) ||
        q.answer.toLowerCase().includes(query)
    );
  }, [debouncedQuery, validQuestions]);

  return (
    <div className="w-full bg-[#FAF7F2] min-h-screen">
      <FaqHero
        dict={dict.faq.hero}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <section className="w-full py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          {isLoading && <LoadingState count={6} />}

          {isError && !isLoading && <ErrorState dict={dict.faq.content} />}

          {!isLoading && !isError && validQuestions.length === 0 && (
            <EmptyState dict={dict.faq.content} locale={locale} />
          )}

          {!isLoading &&
            !isError &&
            validQuestions.length > 0 && (
              <>
                <FaqAccordion
                  questions={filteredQuestions}
                  dict={dict.faq.content}
                  hasSearchQuery={Boolean(debouncedQuery.trim())}
                />
                <FaqSupportCard dict={dict.faq.support} locale={locale} />
              </>
            )}
        </div>
      </section>
    </div>
  );
}
