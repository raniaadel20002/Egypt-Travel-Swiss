"use client";

import { useState } from "react";
import { QuestionItem } from "@/models/question";
import FaqAccordionItem from "./FaqAccordionItem";
import { NoResultsState } from "./FaqStates";
import { Dictionary } from "@/features/i18n/i18nConfig";

interface FaqAccordionProps {
  questions: QuestionItem[];
  dict: Dictionary["faq"]["content"];
  hasSearchQuery: boolean;
}

export default function FaqAccordion({
  questions,
  dict,
  hasSearchQuery,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (questions.length === 0 && hasSearchQuery) {
    return <NoResultsState dict={dict} />;
  }

  return (
    <div className="space-y-4">
      {questions.map((item, index) => (
        <FaqAccordionItem
          key={item.id}
          item={item}
          index={index}
          isOpen={openIndex === index}
          onToggle={() => toggleAccordion(index)}
        />
      ))}
    </div>
  );
}
