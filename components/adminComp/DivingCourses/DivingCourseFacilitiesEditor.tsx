"use client";

import { FiPlus } from "react-icons/fi";
import {
  CreateDivingCourseFacilityInput,
  UpdateDivingCourseFacilityInput,
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
  const handleAdd = () => {
    const newFacility: CreateDivingCourseFacilityInput = {
      icon: "scuba-diving",
      order: facilities.length,
      name: { en: "", fr: "", ru: "", ro: "", it: "" },
      values: { en: "", fr: "", ru: "", ro: "", it: "" },
    };
    onChange([...facilities, newFacility]);
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

  return (
    <div className="space-y-4 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[#013E51] block">
            Course Facilities & Features ({facilities.length})
          </label>
          <span className="text-[11px] text-[#888888]">
            E.g. certification, duration, dives included, depth, equipment.
          </span>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#013E51]/20 bg-[#FAF7F2] text-xs font-bold text-[#013E51] hover:bg-[#013E51] hover:text-white transition cursor-pointer"
        >
          <FiPlus className="w-3.5 h-3.5" />
          <span>Add Facility</span>
        </button>
      </div>

      {facilities.length === 0 ? (
        <div className="p-6 rounded-2xl border border-dashed border-gray-300 text-center bg-gray-50/50">
          <p className="text-xs text-gray-500 font-medium">
            No facilities configured yet. Click &quot;Add Facility&quot; above.
          </p>
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
