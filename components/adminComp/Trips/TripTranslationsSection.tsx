"use client";

import { TRIP_TYPE_LANGUAGES } from "@/models/tripType";
import { TripTranslationInput } from "@/models/trip";
import LanguageFlag from "@/components/adminComp/Common/LanguageFlag";

interface TripTranslationsSectionProps {
  name: TripTranslationInput;
  onNameChange: (langKey: keyof TripTranslationInput, value: string) => void;
  description: TripTranslationInput;
  onDescriptionChange: (
    langKey: keyof TripTranslationInput,
    value: string
  ) => void;
}

export default function TripTranslationsSection({
  name,
  onNameChange,
  description,
  onDescriptionChange,
}: TripTranslationsSectionProps) {
  return (
    <div className="space-y-4 pt-4 border-t border-gray-100">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-[#013E51] block">
          Name & Description Across All 5 Languages
        </label>
        <p className="text-[11px] text-[#888888] mt-0.5">
          All languages appear at once with national flags. English is required; other languages auto-fallback to English if blank.
        </p>
      </div>

      <div className="space-y-4">
        {TRIP_TYPE_LANGUAGES.map((lang) => {
          const key = lang.code.toLowerCase() as keyof TripTranslationInput;
          const isEn = lang.code === "EN";

          return (
            <div
              key={lang.code}
              className={`p-4 rounded-2xl border space-y-3 ${
                isEn
                  ? "border-[#013E51]/20 bg-[#FAF7F2]/50 ring-1 ring-[#013E51]/10"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#013E51] uppercase tracking-wider flex items-center gap-2">
                  <LanguageFlag code={lang.code} size="sm" />
                  <span className="px-2 py-0.5 rounded-md bg-[#013E51]/10 text-[#013E51] font-mono text-[11px]">
                    {lang.code}
                  </span>
                  <span>{lang.label}</span>
                  {isEn && <span className="text-red-500">*</span>}
                </span>
                {!isEn && (
                  <span className="text-[10px] text-gray-400 font-medium">
                    Auto-falls back to EN
                  </span>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600">
                  <LanguageFlag code={lang.code} size="xs" />
                  <span>Excursion Title ({lang.code}) {isEn ? "*" : ""}</span>
                </label>
                <input
                  type="text"
                  required={isEn}
                  value={name[key] || ""}
                  onChange={(e) => onNameChange(key, e.target.value)}
                  placeholder={`Title in ${lang.label.split(" ")[0]}...`}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-[#013E51] font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600">
                  <LanguageFlag code={lang.code} size="xs" />
                  <span>Detailed Description ({lang.code})</span>
                </label>
                <textarea
                  rows={3}
                  value={description[key] || ""}
                  onChange={(e) => onDescriptionChange(key, e.target.value)}
                  placeholder={`Description and itinerary in ${lang.label.split(" ")[0]}...`}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-[#013E51] font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
