"use client";

import { FiCopy, FiCheck } from "react-icons/fi";

interface FaqLanguageSectionProps {
  langKey: string;
  label: string;
  nativeLabel: string;
  isRequired?: boolean;
  questionValue: string;
  answerValue: string;
  onQuestionChange: (val: string) => void;
  onAnswerChange: (val: string) => void;
  onCopyEnglish?: () => void;
  canCopyEnglish?: boolean;
}

export default function FaqLanguageSection({
  langKey,
  label,
  nativeLabel,
  isRequired = false,
  questionValue,
  answerValue,
  onQuestionChange,
  onAnswerChange,
  onCopyEnglish,
  canCopyEnglish = false,
}: FaqLanguageSectionProps) {
  const isFilled = Boolean(questionValue.trim() || answerValue.trim());

  return (
    <div
      className={`rounded-2xl p-4 transition-all duration-200 border ${
        isRequired
          ? "bg-[#FAF7F2] border-[#E8B34A]/50 shadow-xs"
          : "bg-white border-[#013E51]/10 hover:border-[#013E51]/25"
      }`}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-[#013E51]/8">
        <div className="flex items-center gap-2">
          <span className="font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-wider text-[#013E51]">
            {label} ({nativeLabel})
          </span>
          {isRequired ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#013E51] text-[#E8B34A]">
              Required *
            </span>
          ) : isFilled ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
              <FiCheck className="w-3 h-3" />
              <span>Translated</span>
            </span>
          ) : (
            <span className="text-[10px] font-medium text-[#888888]">
              Optional
            </span>
          )}
        </div>

        {canCopyEnglish && onCopyEnglish && (
          <button
            type="button"
            onClick={onCopyEnglish}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#013E51] hover:text-[#025670] cursor-pointer"
            title="Copy English content into this language"
          >
            <FiCopy className="w-3 h-3 text-[#E8B34A]" />
            <span>Copy EN</span>
          </button>
        )}
      </div>

      {/* Fields Container */}
      <div className="space-y-3">
        {/* Question Input */}
        <div>
          <label className="block font-[family-name:var(--font-lato)] text-[11px] font-bold uppercase tracking-wider text-[#013E51]/80 mb-1">
            Question ({langKey.toUpperCase()})
            {isRequired && <span className="text-red-500 ml-0.5">*</span>}
          </label>
          <input
            type="text"
            value={questionValue}
            onChange={(e) => onQuestionChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
            placeholder={`Enter question in ${label}...`}
            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
          />
        </div>

        {/* Answer Textarea */}
        <div>
          <label className="block font-[family-name:var(--font-lato)] text-[11px] font-bold uppercase tracking-wider text-[#013E51]/80 mb-1">
            Answer ({langKey.toUpperCase()})
            {isRequired && <span className="text-red-500 ml-0.5">*</span>}
          </label>
          <textarea
            rows={3}
            value={answerValue}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder={`Enter answer in ${label}...`}
            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51] resize-none"
          />
        </div>
      </div>
    </div>
  );
}
