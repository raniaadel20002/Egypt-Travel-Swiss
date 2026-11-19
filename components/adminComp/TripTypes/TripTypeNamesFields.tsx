"use client";

import { TRIP_TYPE_LANGUAGES } from "@/models/tripType";
import { TripTypeLocalizedNames } from "@/models/tripType";
import LanguageFlag from "@/components/adminComp/Common/LanguageFlag";

interface TripTypeNamesFieldsProps {
  names: TripTypeLocalizedNames;
  showEditableInputs: boolean;
  onChange: (key: keyof TripTypeLocalizedNames, val: string) => void;
}

export default function TripTypeNamesFields({
  names,
  showEditableInputs,
  onChange,
}: TripTypeNamesFieldsProps) {
  if (showEditableInputs) {
    return (
      <div className="grid grid-cols-1 gap-3.5">
        {TRIP_TYPE_LANGUAGES.map((lang) => (
          <div key={lang.code} className="space-y-1">
            <div className="flex items-center gap-1.5">
              <LanguageFlag code={lang.code} size="sm" />
              <span className="text-[11px] font-bold text-[#013E51]/80">
                {lang.label} {lang.code === "EN" ? "*" : ""}
              </span>
            </div>
            <input
              type="text"
              required={lang.code === "EN"}
              value={names[lang.formKey]}
              onChange={(e) => onChange(lang.formKey, e.target.value)}
              placeholder={`Trip type name in ${lang.label.split(" ")[0]}`}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#013E51]/10 bg-[#FAF7F2]/50 divide-y divide-[#013E51]/5">
      {TRIP_TYPE_LANGUAGES.map((lang) => (
        <div
          key={lang.code}
          className="px-4 py-2.5 flex items-center justify-between gap-4 text-xs"
        >
          <span className="flex items-center gap-1.5 font-bold text-[#888888]">
            <LanguageFlag code={lang.code} size="xs" />
            <span>{lang.label}</span>
          </span>
          <span className="font-semibold text-[#013E51] truncate">
            {names[lang.formKey] || names.En || "-"}
          </span>
        </div>
      ))}
    </div>
  );
}
