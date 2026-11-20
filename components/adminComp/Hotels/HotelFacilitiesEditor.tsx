"use client";

import { FiPlus } from "react-icons/fi";
import {
  createEmptyHotelTranslation,
  HotelFacilityPayload,
} from "@/models/hotel";
import HotelFacilityCard from "./HotelFacilityCard";

interface HotelFacilitiesEditorProps {
  facilities: HotelFacilityPayload[];
  onChange: (facilities: HotelFacilityPayload[]) => void;
}

export default function HotelFacilitiesEditor({
  facilities,
  onChange,
}: HotelFacilitiesEditorProps) {
  const handleAddFacility = () => {
    const newFacility: HotelFacilityPayload = {
      icon: "waves",
      order: facilities.length + 1,
      name: createEmptyHotelTranslation(),
      values: [],
    };
    onChange([...facilities, newFacility]);
  };

  const handleUpdateFacility = (
    index: number,
    updated: HotelFacilityPayload
  ) => {
    const next = facilities.map((fac, i) => (i === index ? updated : fac));
    onChange(next);
  };

  const handleRemoveFacility = (index: number) => {
    const next = facilities
      .filter((_, i) => i !== index)
      .map((fac, i) => ({ ...fac, order: i + 1 }));
    onChange(next);
  };

  return (
    <div className="space-y-4 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[#013E51] block">
            Resort Facilities & Amenities ({facilities.length})
          </label>
          <span className="text-[11px] text-[#888888]">
            Configure swimming pools, dining, private beach, spa, Wi-Fi, etc.
          </span>
        </div>
        <button
          type="button"
          onClick={handleAddFacility}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#013E51]/20 bg-[#FAF7F2] text-xs font-bold text-[#013E51] hover:bg-[#013E51] hover:text-white transition cursor-pointer"
        >
          <FiPlus className="w-3.5 h-3.5" />
          <span>Add Facility</span>
        </button>
      </div>

      {facilities.length === 0 ? (
        <div className="p-6 rounded-2xl border border-dashed border-gray-300 text-center bg-gray-50/50">
          <p className="text-xs text-gray-500 font-medium">
            No facilities configured yet. Click &quot;Add Facility&quot; above to add amenities.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {facilities.map((facility, index) => (
            <HotelFacilityCard
              key={facility.id || `fac-${index}`}
              facility={facility}
              index={index}
              onChange={(updated) => handleUpdateFacility(index, updated)}
              onRemove={() => handleRemoveFacility(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
