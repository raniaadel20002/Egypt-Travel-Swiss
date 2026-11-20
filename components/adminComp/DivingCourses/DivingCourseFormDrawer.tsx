"use client";

import { useEffect, useState } from "react";
import { FiCheck, FiCompass, FiLoader, FiX } from "react-icons/fi";
import { toast } from "sonner";
import {
  CreateDivingCoursePayload,
  DivingCourseLocalizedText,
  UpdateDivingCourseFacilityInput,
  UpdateDivingCoursePayload,
} from "@/models/divingCourse";
import {
  useCreateDivingCourseMutation,
  useDivingCourseMultiLangQuery,
  useUpdateDivingCourseMutation,
} from "@/features/divingCourses/useDivingCourses";
import DivingCourseFacilitiesEditor from "./DivingCourseFacilitiesEditor";
import DivingCourseTranslationsSection from "./DivingCourseTranslationsSection";

interface DivingCourseFormDrawerProps {
  courseId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const emptyLocalized = (): DivingCourseLocalizedText => ({
  en: "",
  fr: "",
  ru: "",
  ro: "",
  it: "",
});

export default function DivingCourseFormDrawer({
  courseId,
  isOpen,
  onClose,
}: DivingCourseFormDrawerProps) {
  const isEdit = Boolean(courseId);
  const [price, setPrice] = useState<number>(0);
  const [name, setName] = useState<DivingCourseLocalizedText>(emptyLocalized());
  const [description, setDescription] = useState<DivingCourseLocalizedText>(emptyLocalized());
  const [facilities, setFacilities] = useState<UpdateDivingCourseFacilityInput[]>([]);

  const { data: multiLangData, isLoading: isLoadingMultiLang } =
    useDivingCourseMultiLangQuery(courseId || undefined, isOpen && isEdit);

  const createMutation = useCreateDivingCourseMutation();
  const updateMutation = useUpdateDivingCourseMutation();
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (isEdit && multiLangData) {
      setPrice(multiLangData.price || 0);
      setName(multiLangData.name || emptyLocalized());
      setDescription(multiLangData.description || emptyLocalized());
      setFacilities(multiLangData.facilities || []);
    } else if (!isEdit && isOpen) {
      setPrice(0);
      setName(emptyLocalized());
      setDescription(emptyLocalized());
      setFacilities([]);
    }
  }, [isEdit, multiLangData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.en?.trim()) {
      toast.error("Please enter English name for the diving course");
      return;
    }
    if (price <= 0) {
      toast.error("Please enter a valid course price");
      return;
    }

    const cleanedFacilities = facilities.map((fac, idx) => ({
      ...fac,
      order: idx,
    }));

    if (isEdit && courseId) {
      const payload: UpdateDivingCoursePayload = {
        id: courseId,
        price,
        name,
        description,
        facilities: cleanedFacilities,
      };
      await updateMutation.mutateAsync(payload);
    } else {
      const payload: CreateDivingCoursePayload = {
        price,
        name,
        description,
        facilities: cleanedFacilities,
      };
      await createMutation.mutateAsync(payload);
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-[#013E51]/40 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#013E51]/10 flex items-center justify-center text-[#013E51]">
              <FiCompass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#013E51]">
                {isEdit ? "Edit Diving Course" : "New Diving Course"}
              </h2>
              <p className="text-xs text-[#888888]">
                {isEdit
                  ? "Update course details & features across all languages"
                  : "Create a new scuba diving course with multi-language support"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close drawer"
            className="p-2 rounded-xl text-gray-400 hover:text-[#013E51] hover:bg-gray-100 transition cursor-pointer"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {isLoadingMultiLang ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-2 text-gray-400">
            <FiLoader className="w-6 h-6 animate-spin text-[#013E51]" />
            <span className="text-xs font-medium">Loading course translations...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <div>
                <label className="text-xs font-bold text-[#013E51] block mb-1.5">
                  Course Price (USD) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={price || ""}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  placeholder="e.g. 290"
                  className="w-full sm:w-48 px-3.5 py-2 text-xs rounded-xl border border-gray-200 bg-white focus:outline-hidden focus:border-[#013E51] font-semibold"
                />
              </div>

              <DivingCourseTranslationsSection
                name={name}
                description={description}
                onNameChange={(langKey, val) =>
                  setName((prev) => ({ ...prev, [langKey]: val }))
                }
                onDescriptionChange={(langKey, val) =>
                  setDescription((prev) => ({ ...prev, [langKey]: val }))
                }
              />

              <DivingCourseFacilitiesEditor
                facilities={facilities}
                onChange={setFacilities}
              />
            </div>

            <div className="p-4 border-t border-gray-100 bg-[#FAF7F2] flex items-center justify-end gap-2 shrink-0">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-600 hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#013E51] text-white text-xs font-bold hover:bg-[#013E51]/90 transition cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <FiLoader className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <FiCheck className="w-3.5 h-3.5 text-[#E8B34A]" />
                )}
                <span>{isEdit ? "Update Course" : "Create Course"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
