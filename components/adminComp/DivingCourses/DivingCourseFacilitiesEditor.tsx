"use client";

import {
  FiAward,
  FiCheckCircle,
  FiClock,
  FiCompass,
  FiLayers,
  FiPlus,
} from "react-icons/fi";
import {
  CreateDivingCourseFacilityInput,
  DIVING_COURSE_HIGHLIGHT_PRESETS,
  DivingCourseHighlightPreset,
  UpdateDivingCourseFacilityInput,
  createDefaultDivingCourseFacilities,
} from "@/models/divingCourse";
import DivingCourseFacilityCard from "./DivingCourseFacilityCard";

interface DivingCourseFacilitiesEditorProps {
  facilities: UpdateDivingCourseFacilityInput[];
  onChange: (facilities: UpdateDivingCourseFacilityInput[]) => void;
}

export default function DivingCourseFacilitiesEditor({
  facilities,
  onChange,
}: DivingCourseFacilitiesEditorProps) {
  const handleAddCustom = () => {
    const newFacility: CreateDivingCourseFacilityInput = {
      icon: "scuba-diving",
      order: facilities.length,
      name: { en: "", fr: "", ru: "", ro: "", it: "" },
      values: { en: "", fr: "", ru: "", ro: "", it: "" },
    };
    onChange([...facilities, newFacility]);
  };

  const handleAddPreset = (preset: DivingCourseHighlightPreset) => {
    const newFacility: CreateDivingCourseFacilityInput = {
      icon: preset.icon,
      order: facilities.length,
      name: { ...preset.name },
      values: { en: "", fr: "", ru: "", ro: "", it: "" },
    };
    onChange([...facilities, newFacility]);
  };

  const handleApplyAllPresets = () => {
    const defaults = createDefaultDivingCourseFacilities();
    if (facilities.length === 0) {
      onChange(defaults);
      return;
    }
    const existingIcons = new Set(facilities.map((f) => f.icon.toLowerCase()));
    const existingEnNames = new Set(
      facilities.map((f) => (f.name.en || "").trim().toLowerCase())
    );

    const missingDefaults = defaults.filter(
      (d) =>
        !existingIcons.has(d.icon.toLowerCase()) &&
        !existingEnNames.has(d.name.en.toLowerCase())
    );

    const reorderedMissing = missingDefaults.map((d, idx) => ({
      ...d,
      order: facilities.length + idx,
    }));

    onChange([...facilities, ...reorderedMissing]);
  };

  const handleRemove = (index: number) => {
    const updated = facilities
      .filter((_, i) => i !== index)
      .map((fac, i) => ({ ...fac, order: i }));
    onChange(updated);
  };

  const handleUpdate = (
    index: number,
    updated: UpdateDivingCourseFacilityInput
  ) => {
    const copy = [...facilities];
    copy[index] = updated;
    onChange(copy);
  };

  const renderPresetIcon = (key: string) => {
    switch (key) {
      case "duration":
        return <FiClock className="w-3.5 h-3.5 text-[#013E51]" />;
      case "depth":
        return <FiCompass className="w-3.5 h-3.5 text-[#013E51]" />;
      case "certification":
        return <FiAward className="w-3.5 h-3.5 text-[#013E51]" />;
      case "dives":
        return <FiCheckCircle className="w-3.5 h-3.5 text-[#013E51]" />;
      default:
        return <FiPlus className="w-3.5 h-3.5 text-[#013E51]" />;
    }
  };

  return (
    <div className="space-y-4 pt-4 border-t border-gray-100">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[#013E51] block">
            Course Highlights & Facilities ({facilities.length})
          </label>
          <span className="text-[11px] text-[#888888]">
            Key specifications (Duration, Max Depth, Certification, Required Dives) and extra perks.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleApplyAllPresets}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#013E51]/20 bg-[#FAF7F2] text-xs font-bold text-[#013E51] hover:bg-[#013E51] hover:text-white transition cursor-pointer"
          >
            <FiLayers className="w-3.5 h-3.5" />
            <span>Apply 4 Key Highlights</span>
          </button>
          <button
            type="button"
            onClick={handleAddCustom}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#013E51]/20 bg-[#FAF7F2] text-xs font-bold text-[#013E51] hover:bg-[#013E51] hover:text-white transition cursor-pointer"
          >
            <FiPlus className="w-3.5 h-3.5" />
            <span>Add Custom</span>
          </button>
        </div>
      </div>

      {/* Quick Add Presets Bar */}
      <div className="p-3 rounded-xl bg-[#FAF7F2]/60 border border-gray-200 space-y-2">
        <span className="text-[11px] font-bold text-[#013E51] uppercase tracking-wider block">
          Quick Preset Highlights
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {DIVING_COURSE_HIGHLIGHT_PRESETS.map((preset) => {
            const isAlreadyAdded = facilities.some(
              (f) =>
                f.icon.toLowerCase() === preset.icon.toLowerCase() ||
                (f.name.en || "").trim().toLowerCase() === preset.name.en.toLowerCase()
            );

            return (
              <button
                key={preset.key}
                type="button"
                onClick={() => handleAddPreset(preset)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                  isAlreadyAdded
                    ? "bg-white/80 border-gray-200 text-gray-500 hover:border-[#013E51]"
                    : "bg-white border-[#013E51]/30 text-[#013E51] hover:bg-[#013E51] hover:text-white shadow-2xs"
                }`}
              >
                {renderPresetIcon(preset.key)}
                <span>+ {preset.label}</span>
                {isAlreadyAdded && (
                  <span className="text-[10px] text-gray-400 font-normal">
                    (added)
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {facilities.length === 0 ? (
        <div className="p-6 rounded-2xl border border-dashed border-gray-300 text-center bg-gray-50/50 space-y-3">
          <p className="text-xs text-gray-500 font-medium">
            No highlights or facilities configured yet. Click below to add the 4 standard highlights.
          </p>
          <button
            type="button"
            onClick={handleApplyAllPresets}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#013E51] text-white text-xs font-bold hover:bg-[#013E51]/90 transition cursor-pointer"
          >
            <FiLayers className="w-3.5 h-3.5 text-[#E8B34A]" />
            <span>Add Duration, Max Depth, Certification & Required Dives</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {facilities.map((fac, idx) => (
            <DivingCourseFacilityCard
              key={fac.id || `fac-${idx}`}
              facility={fac}
              index={idx}
              onChange={(updated) => handleUpdate(idx, updated)}
              onRemove={() => handleRemove(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
