"use client";

import { useEffect, useState } from "react";
import {
  FiArrowDown,
  FiArrowUp,
  FiCheck,
  FiLayers,
  FiLoader,
  FiX,
} from "react-icons/fi";
import {
  DivingCourseApiItem,
  DivingCourseFacilityApiItem,
} from "@/models/divingCourse";
import { useModalDismiss } from "@/shared/utils/useModalDismiss";
import { useReorderDivingCourseFacilitiesMutation } from "@/features/divingCourses/useDivingCourses";
import DynamicIcon from "@/components/adminComp/Common/DynamicIcon";

interface DivingCourseFacilitiesReorderDrawerProps {
  course: DivingCourseApiItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DivingCourseFacilitiesReorderDrawer({
  course,
  isOpen,
  onClose,
}: DivingCourseFacilitiesReorderDrawerProps) {
  const [items, setItems] = useState<DivingCourseFacilityApiItem[]>([]);

  useEffect(() => {
    if (course?.facilities) {
      const sorted = [...course.facilities].sort((a, b) => a.order - b.order);
      setItems(sorted);
    }
  }, [course]);

  const reorderMutation = useReorderDivingCourseFacilitiesMutation(course?.id);

  useModalDismiss({ isOpen, onClose, disabled: reorderMutation.isPending });

  if (!isOpen || !course) return null;

  const handleShift = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const copy = [...items];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;

    const updated = copy.map((fac, i) => ({ ...fac, order: i }));
    setItems(updated);
  };

  const handleSave = async () => {
    const payload = items.map((fac, index) => ({
      id: fac.id,
      order: index,
    }));
    await reorderMutation.mutateAsync(payload);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-[#013E51]/40 backdrop-blur-xs transition-opacity"
    >
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#013E51]/10 flex items-center justify-center text-[#013E51]">
              <FiLayers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#013E51]">
                Reorder Facilities
              </h2>
              <p className="text-xs text-[#888888] line-clamp-1">
                {course.name} ({items.length} facilities)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={reorderMutation.isPending}
            aria-label="Close drawer"
            className="p-2 rounded-xl text-gray-400 hover:text-[#013E51] hover:bg-gray-100 transition cursor-pointer"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-2">
          {items.length === 0 ? (
            <p className="text-center text-xs text-gray-400 py-12">
              No facilities available to reorder.
            </p>
          ) : (
            items.map((fac, idx) => (
              <div
                key={fac.id || `fac-${idx}`}
                className="flex items-center justify-between p-3 rounded-2xl border border-gray-200 bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-[#013E51] text-[#E8B34A] text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-[#013E51] shrink-0">
                    <DynamicIcon name={fac.icon} className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#013E51] truncate">
                      {fac.name}
                    </p>
                    {fac.values && (
                      <p className="text-[11px] text-gray-500 truncate">
                        {fac.values}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <button
                    type="button"
                    onClick={() => handleShift(idx, "up")}
                    disabled={idx === 0 || reorderMutation.isPending}
                    title="Move Up"
                    className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:text-[#013E51] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <FiArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleShift(idx, "down")}
                    disabled={idx === items.length - 1 || reorderMutation.isPending}
                    title="Move Down"
                    className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:text-[#013E51] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <FiArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-gray-100 bg-[#FAF7F2] flex items-center justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={reorderMutation.isPending}
            className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-600 hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={reorderMutation.isPending || items.length === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#013E51] text-white text-xs font-bold hover:bg-[#013E51]/90 transition cursor-pointer disabled:opacity-50"
          >
            {reorderMutation.isPending ? (
              <FiLoader className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <FiCheck className="w-3.5 h-3.5 text-[#E8B34A]" />
            )}
            <span>Save Order</span>
          </button>
        </div>
      </div>
    </div>
  );
}
