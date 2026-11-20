import { FiCopy } from "react-icons/fi";
import {
  FLIGHT_LOCATION_LANGUAGES,
  LocalizedLocationName,
} from "@/models/flightLocation";

interface LocalizedNameFieldsProps {
  names: LocalizedLocationName;
  activeLang: keyof LocalizedLocationName;
  labelPrefix: string;
  onChangeActiveLang: (lang: keyof LocalizedLocationName) => void;
  onChangeName: (lang: keyof LocalizedLocationName, val: string) => void;
  onCopyEnToAll: () => void;
}

export default function LocalizedNameFields({
  names,
  activeLang,
  labelPrefix,
  onChangeActiveLang,
  onChangeName,
  onCopyEnToAll,
}: LocalizedNameFieldsProps) {
  const activeLangConfig = FLIGHT_LOCATION_LANGUAGES.find(
    (l) => l.code === activeLang
  );

  return (
    <div className="space-y-4">
      {/* Language Tabs */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-[#013E51] uppercase tracking-wider">
            Languages
          </label>
          <button
            type="button"
            onClick={onCopyEnToAll}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#013E51]/70 hover:text-[#013E51] hover:underline cursor-pointer"
          >
            <FiCopy className="w-3 h-3 text-[#E8B34A]" />
            <span>Fill Empty from EN</span>
          </button>
        </div>

        <div className="grid grid-cols-5 gap-1.5 p-1 bg-[#FAF7F2] rounded-xl border border-[#013E51]/10">
          {FLIGHT_LOCATION_LANGUAGES.map((lang) => {
            const hasVal = Boolean(names[lang.code]?.trim());
            const isActive = activeLang === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => onChangeActiveLang(lang.code)}
                className={`py-2 px-1 text-center rounded-lg text-xs font-bold transition cursor-pointer relative ${
                  isActive
                    ? "bg-[#013E51] text-white shadow-xs"
                    : "text-[#013E51]/70 hover:bg-white"
                }`}
              >
                <span className="uppercase">{lang.code}</span>
                {hasVal && (
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full ml-1 ${
                      isActive ? "bg-[#E8B34A]" : "bg-emerald-500"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Language Input */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold text-[#013E51]">
            {labelPrefix} Name ({activeLang.toUpperCase()}){" "}
            {activeLang === "en" && <span className="text-red-500">*</span>}
          </label>
          <span className="text-[11px] text-[#888888]">
            {activeLangConfig?.label}
          </span>
        </div>
        <input
          type="text"
          required={activeLang === "en"}
          value={names[activeLang]}
          onChange={(e) => onChangeName(activeLang, e.target.value)}
          placeholder={`e.g. ${
            activeLang === "en"
              ? `Enter ${labelPrefix.toLowerCase()} name`
              : "Enter translation"
          }`}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
        />
      </div>

      {/* Preview of All Entered Translations */}
      <div className="bg-[#FAF7F2] rounded-xl p-3.5 border border-[#013E51]/10 space-y-2">
        <p className="text-[11px] font-bold text-[#013E51]/70 uppercase tracking-wider">
          Translation Status
        </p>
        <div className="space-y-1.5">
          {FLIGHT_LOCATION_LANGUAGES.map((lang) => (
            <div
              key={lang.code}
              onClick={() => onChangeActiveLang(lang.code)}
              className="flex items-center justify-between text-xs py-1 px-2 rounded-lg hover:bg-white cursor-pointer transition"
            >
              <span className="font-semibold text-[#013E51] uppercase w-8">
                {lang.code}:
              </span>
              <span className="flex-1 text-[#888888] truncate mx-2">
                {names[lang.code]?.trim() || (
                  <em className="text-gray-400">Not set</em>
                )}
              </span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  names[lang.code]?.trim()
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {names[lang.code]?.trim() ? "Ready" : "Empty"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
