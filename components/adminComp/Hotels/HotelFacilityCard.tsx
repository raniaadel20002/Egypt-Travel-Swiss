"use client";

import { FiPlus, FiTrash2 } from "react-icons/fi";
import {
  HotelFacilityPayload,
  HotelTranslationInput,
} from "@/models/hotel";
import { TRIP_TYPE_LANGUAGES } from "@/models/tripType";
import LanguageFlag from "@/components/adminComp/Common/LanguageFlag";
import HotelFacilityIcon from "./HotelFacilityIcon";
import IconPickerField from "@/components/adminComp/Common/IconPickerField";

interface HotelFacilityCardProps {
  facility: HotelFacilityPayload;
  index: number;
  onChange: (updated: HotelFacilityPayload) => void;
  onRemove: () => void;
}

export default function HotelFacilityCard({
  facility,
  index,
  onChange,
  onRemove,
}: HotelFacilityCardProps) {
  const handleNameChange = (
    langKey: keyof HotelTranslationInput,
    value: string
  ) => {
    onChange({
      ...facility,
      name: {
        ...facility.name,
        [langKey]: value,
      },
    });
  };

  const handleAddValue = () => {
    const newValue: HotelTranslationInput = {
      en: "",
      fr: "",
      ru: "",
      ro: "",
      it: "",
    };
    onChange({
      ...facility,
      values: [...facility.values, newValue],
    });
  };

  const handleRemoveValue = (valIdx: number) => {
    onChange({
      ...facility,
      values: facility.values.filter((_, i) => i !== valIdx),
    });
  };

  const handleValueChange = (
    valIdx: number,
    langKey: keyof HotelTranslationInput,
    text: string
  ) => {
    const updated = facility.values.map((v, i) =>
      i === valIdx ? { ...v, [langKey]: text } : v
    );
    onChange({
      ...facility,
      values: updated,
    });
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-[#FAF7F2]/40 p-4 space-y-4">
      {/* Facility Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-[#013E51] text-[#E8B34A] text-xs font-bold flex items-center justify-center">
            {index + 1}
          </span>
          <div className="flex items-center gap-2">
            <HotelFacilityIcon
              iconKey={facility.icon}
              className="w-4 h-4 text-[#013E51]"
            />
            <span className="text-xs font-bold text-[#013E51]">
              {facility.name.en || `Facility #${index + 1}`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Pop-up Icon Picker Trigger */}
          <div className="w-36 sm:w-44">
            <IconPickerField
              compact
              value={facility.icon}
              onChange={(icon) => onChange({ ...facility, icon })}
            />
          </div>

          <button
            type="button"
            onClick={onRemove}
            className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-700 transition cursor-pointer px-2 py-1"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>
      </div>

      {/* Facility Name (5 languages) */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-[#013E51] block">
          Facility Name (EN required, others fallback to EN)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {TRIP_TYPE_LANGUAGES.map((lang) => {
            const key = lang.code.toLowerCase() as keyof HotelTranslationInput;
            const isEn = lang.code === "EN";

            return (
              <div key={lang.code} className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <LanguageFlag code={lang.code} size="xs" />
                  <span className="text-[10px] font-bold text-gray-600">
                    {lang.code} {isEn ? "*" : ""}
                  </span>
                </div>
                <input
                  type="text"
                  required={isEn}
                  value={facility.name[key] || ""}
                  onChange={(e) => handleNameChange(key, e.target.value)}
                  placeholder={`Facility name in ${lang.code}...`}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#013E51]"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Facility Values List */}
      <div className="space-y-2 pt-2 border-t border-gray-200/60">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#013E51] block">
            Specific Highlights / Features ({facility.values.length})
          </label>
          <button
            type="button"
            onClick={handleAddValue}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#013E51]/20 bg-white text-[11px] font-bold text-[#013E51] hover:bg-[#FAF7F2] transition cursor-pointer"
          >
            <FiPlus className="w-3 h-3" />
            <span>Add Highlight</span>
          </button>
        </div>

        {facility.values.length === 0 ? (
          <p className="text-[11px] text-gray-400 italic">
            No specific highlights added yet (e.g. &quot;Outdoor pool&quot;, &quot;Heated pool&quot;).
          </p>
        ) : (
          <div className="space-y-2.5">
            {facility.values.map((val, vIdx) => (
              <div
                key={vIdx}
                className="p-2.5 rounded-xl border border-gray-200 bg-white space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">
                    Feature #{vIdx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveValue(vIdx)}
                    className="text-red-500 hover:text-red-700 text-xs cursor-pointer"
                  >
                    <FiTrash2 className="w-3 h-3" />
                  </button>
                </div>

                {/* Primary EN input */}
                <input
                  type="text"
                  value={val.en}
                  onChange={(e) => handleValueChange(vIdx, "en", e.target.value)}
                  placeholder="Feature in English (e.g. Private sandy beach)..."
                  className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-[#FAF7F2]/40 text-xs text-[#013E51] font-medium placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#013E51]"
                />

                {/* Other 4 languages */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {TRIP_TYPE_LANGUAGES.filter((l) => l.code !== "EN").map(
                    (lang) => {
                      const k =
                        lang.code.toLowerCase() as keyof HotelTranslationInput;
                      return (
                        <div key={lang.code} className="space-y-0.5">
                          <span className="text-[9px] font-bold text-gray-400 uppercase">
                            {lang.code}
                          </span>
                          <input
                            type="text"
                            value={val[k] || ""}
                            onChange={(e) =>
                              handleValueChange(vIdx, k, e.target.value)
                            }
                            placeholder={lang.code}
                            className="w-full px-2 py-1 rounded-md border border-gray-200 bg-white text-[11px] text-[#013E51] placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#013E51]"
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
