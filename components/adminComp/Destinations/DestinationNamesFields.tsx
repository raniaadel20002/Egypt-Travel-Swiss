"use client";

import { TRIP_TYPE_LANGUAGES } from "@/models/tripType";
import { DestinationLocalizedNames } from "@/models/destination";
import LanguageFlag from "@/components/adminComp/Common/LanguageFlag";

interface DestinationNamesFieldsProps {
  names: DestinationLocalizedNames;
  onChange: (key: keyof DestinationLocalizedNames, value: string) => void;
}

export default function DestinationNamesFields({
  names,
  onChange,
}: DestinationNamesFieldsProps) {
  return (
    <div className="space-y-3 pt-3 border-t border-gray-100">
      <label className="text-xs font-bold uppercase tracking-wider text-[#013E51] block">
        Destination Name Across 5 Languages
      </label>
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
              placeholder={`City or region name in ${lang.label.split(" ")[0]}`}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
