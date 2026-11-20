"use client";

import { DivingCourseLocalizedText } from "@/models/divingCourse";
import { TRIP_TYPE_LANGUAGES } from "@/models/tripType";
import LanguageFlag from "@/components/adminComp/Common/LanguageFlag";

interface DivingCourseTranslationsSectionProps {
  name: DivingCourseLocalizedText;
  description: DivingCourseLocalizedText;
  onNameChange: (langKey: keyof DivingCourseLocalizedText, value: string) => void;
  onDescriptionChange: (
    langKey: keyof DivingCourseLocalizedText,
    value: string
  ) => void;
}

export default function DivingCourseTranslationsSection({
  name,
  description,
  onNameChange,
  onDescriptionChange,
}: DivingCourseTranslationsSectionProps) {
  return (
    <div className="space-y-4 pt-4 border-t border-gray-100">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-[#013E51] block">
          Course Information Across All 5 Languages
        </label>
        <p className="text-[11px] text-[#888888] mt-0.5">
          All translations appear simultaneously. English is required; other
          languages auto-fallback to English if left blank.
        </p>
      </div>

      <div className="space-y-3.5">
        {TRIP_TYPE_LANGUAGES.map((lang) => {
          const key = lang.code.toLowerCase() as keyof DivingCourseLocalizedText;
          const isEn = lang.code === "EN";

          return (
            <div
              key={lang.code}
              className={`p-4 rounded-2xl border space-y-3 transition ${
                isEn
                  ? "border-[#013E51]/30 bg-[#FAF7F2]/60 ring-1 ring-[#013E51]/10"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LanguageFlag code={lang.code} size="sm" />
                  <span className="text-xs font-bold text-[#013E51]">
                    {lang.label}
                  </span>
                  {isEn && <span className="text-red-500 font-bold">*</span>}
                </div>
                {!isEn && (
                  <span className="text-[10px] text-gray-400 font-medium">
                    Auto-falls back to EN
                  </span>
                )}
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#013E51] block mb-1">
                  Course Name ({lang.code}) {isEn && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  required={isEn}
                  value={name[key] || ""}
                  onChange={(e) => onNameChange(key, e.target.value)}
                  placeholder={
                    isEn
                      ? "e.g. PADI Open Water Diver"
                      : `Course name in ${lang.label}...`
                  }
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 bg-white focus:outline-hidden focus:border-[#013E51]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#013E51] block mb-1">
                  Description ({lang.code})
                </label>
                <textarea
                  rows={5}
                  value={description[key] || ""}
                  onChange={(e) => onDescriptionChange(key, e.target.value)}
                  placeholder={`Comprehensive course description in ${lang.label}...`}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 bg-white focus:outline-hidden focus:border-[#013E51] min-h-[120px] leading-relaxed resize-y"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
