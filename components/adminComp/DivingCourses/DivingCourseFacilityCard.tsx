"use client";

import { FiTrash2 } from "react-icons/fi";
import {
  DIVING_COURSE_HIGHLIGHT_PRESETS,
  DivingCourseLocalizedText,
  UpdateDivingCourseFacilityInput,
} from "@/models/divingCourse";
import { TRIP_TYPE_LANGUAGES } from "@/models/tripType";
import LanguageFlag from "@/components/adminComp/Common/LanguageFlag";
import IconPickerField from "@/components/adminComp/Common/IconPickerField";
import DynamicIcon from "@/components/adminComp/Common/DynamicIcon";

interface DivingCourseFacilityCardProps {
  facility: UpdateDivingCourseFacilityInput;
  index: number;
  onChange: (updated: UpdateDivingCourseFacilityInput) => void;
  onRemove: () => void;
}

export default function DivingCourseFacilityCard({
  facility,
  index,
  onChange,
  onRemove,
}: DivingCourseFacilityCardProps) {
  const handleUpdate = (
    field: "name" | "values",
    lang: keyof DivingCourseLocalizedText,
    val: string
  ) => {
    onChange({
      ...facility,
      [field]: {
        ...facility[field],
        [lang]: val,
      },
    });
  };

  const handleIconChange = (icon: string) => {
    onChange({ ...facility, icon });
  };

  const matchedPreset = DIVING_COURSE_HIGHLIGHT_PRESETS.find(
    (p) =>
      p.icon === facility.icon ||
      p.name.en.toLowerCase() === (facility.name.en || "").trim().toLowerCase()
  );

  return (
    <div className="rounded-2xl border border-gray-200 bg-[#FAF7F2]/40 p-4 space-y-3.5 shadow-2xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-[#013E51] text-[#E8B34A] text-xs font-bold flex items-center justify-center shrink-0">
            {index + 1}
          </span>
          <div className="flex items-center gap-1.5">
            <DynamicIcon
              name={facility.icon}
              className="w-4 h-4 text-[#013E51]"
            />
            <span className="text-xs font-bold text-[#013E51]">
              {facility.name.en || `Feature #${index + 1}`}
            </span>
            {matchedPreset && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8B34A]/20 text-[#013E51] border border-[#E8B34A]/40">
                Course Highlight ({matchedPreset.label})
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-40 sm:w-48">
            <IconPickerField
              compact
              value={facility.icon}
              onChange={handleIconChange}
            />
          </div>
          <button
            type="button"
            onClick={onRemove}
            title="Remove facility"
            className="p-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#013E51] block">
          Feature Translations (All 5 Languages)
        </span>
        <div className="space-y-2">
          {TRIP_TYPE_LANGUAGES.map((lang) => {
            const key = lang.code.toLowerCase() as keyof DivingCourseLocalizedText;
            const isEn = lang.code === "EN";

            return (
              <div
                key={lang.code}
                className={`grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-2.5 rounded-xl border ${
                  isEn
                    ? "border-[#013E51]/20 bg-[#FAF7F2]/60"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-semibold text-[#013E51] mb-1">
                    <LanguageFlag code={lang.code} size="xs" />
                    <span>
                      Name ({lang.code}) {isEn && <span className="text-red-500">*</span>}
                    </span>
                  </label>
                  <input
                    type="text"
                    required={isEn}
                    value={facility.name[key] || ""}
                    onChange={(e) => handleUpdate("name", key, e.target.value)}
                    placeholder={
                      isEn
                        ? matchedPreset
                          ? `e.g. ${matchedPreset.label}`
                          : "e.g. Course Duration"
                        : `Feature name in ${lang.label}...`
                    }
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 bg-white focus:outline-hidden focus:border-[#013E51]"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-semibold text-[#013E51] mb-1">
                    <LanguageFlag code={lang.code} size="xs" />
                    <span>
                      Value ({lang.code}) {isEn && <span className="text-red-500">*</span>}
                    </span>
                  </label>
                  <input
                    type="text"
                    required={isEn}
                    value={facility.values[key] || ""}
                    onChange={(e) => handleUpdate("values", key, e.target.value)}
                    placeholder={
                      isEn
                        ? matchedPreset
                          ? `e.g. ${matchedPreset.placeholderValue}`
                          : "e.g. 3 Days / 6 Dives"
                        : `Value in ${lang.label}...`
                    }
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 bg-white focus:outline-hidden focus:border-[#013E51]"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
