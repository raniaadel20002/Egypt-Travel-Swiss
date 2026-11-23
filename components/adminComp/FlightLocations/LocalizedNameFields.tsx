import { FiCopy } from "react-icons/fi";
import {
  FLIGHT_LOCATION_LANGUAGES,
  LocalizedLocationName,
} from "@/models/flightLocation";
import LanguageFlag from "@/components/adminComp/Common/LanguageFlag";

interface LocalizedNameFieldsProps {
  names: LocalizedLocationName;
  activeLang?: keyof LocalizedLocationName;
  labelPrefix: string;
  onChangeActiveLang?: (lang: keyof LocalizedLocationName) => void;
  onChangeName: (lang: keyof LocalizedLocationName, val: string) => void;
  onCopyEnToAll: () => void;
}

export default function LocalizedNameFields({
  names,
  labelPrefix,
  onChangeName,
  onCopyEnToAll,
}: LocalizedNameFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-bold text-[#013E51] uppercase tracking-wider block">
            {labelPrefix} Name Across All 5 Languages
          </label>
          <span className="text-[11px] text-[#888888]">
            English is required; other languages auto-fallback to English if left blank.
          </span>
        </div>
        <button
          type="button"
          onClick={onCopyEnToAll}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#013E51]/20 bg-[#FAF7F2] text-xs font-bold text-[#013E51] hover:bg-[#013E51] hover:text-white transition cursor-pointer"
        >
          <FiCopy className="w-3.5 h-3.5 text-[#E8B34A]" />
          <span>Fill Empty from EN</span>
        </button>
      </div>

      <div className="space-y-3">
        {FLIGHT_LOCATION_LANGUAGES.map((lang) => {
          const isEn = lang.code === "en";
          return (
            <div
              key={lang.code}
              className={`p-3.5 rounded-2xl border space-y-2 transition ${
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

              <input
                type="text"
                required={isEn}
                value={names[lang.code] || ""}
                onChange={(e) => onChangeName(lang.code, e.target.value)}
                placeholder={
                  isEn
                    ? labelPrefix.toLowerCase() === "city"
                      ? "e.g. Cairo"
                      : labelPrefix.toLowerCase() === "country"
                        ? "e.g. Egypt"
                        : `${labelPrefix} name in English...`
                    : `${labelPrefix} name in ${lang.label}...`
                }
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 bg-white text-[#013E51] placeholder-gray-400 focus:outline-hidden focus:border-[#013E51]"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
