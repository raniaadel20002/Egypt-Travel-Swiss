"use client";

import { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";
import { toast } from "sonner";
import { TRIP_TYPE_LANGUAGES } from "@/models/tripType";
import {
  createEmptyRatePlanTranslation,
  RatePlanTranslationInput,
} from "@/models/hotel";
import {
  useCreateRatePlanMutation,
  useRatePlanAllLanguagesQuery,
  useUpdateRatePlanMutation,
} from "@/features/hotels/useRatePlans";
import AdminDrawer from "@/components/adminComp/Common/AdminDrawer";
import LanguageFlag from "@/components/adminComp/Common/LanguageFlag";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

interface HotelRatePlanFormDrawerProps {
  isOpen: boolean;
  hotelId: number;
  hotelName: string;
  ratePlanId: number | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function HotelRatePlanFormDrawer({
  isOpen,
  hotelId,
  hotelName,
  ratePlanId,
  onClose,
  onSuccess,
}: HotelRatePlanFormDrawerProps) {
  const isEdit = Boolean(ratePlanId);

  const [name, setName] = useState<RatePlanTranslationInput>(
    createEmptyRatePlanTranslation()
  );
  const [description, setDescription] = useState<RatePlanTranslationInput>(
    createEmptyRatePlanTranslation()
  );

  const multiLangQuery = useRatePlanAllLanguagesQuery(
    ratePlanId ?? undefined,
    isOpen && isEdit
  );

  const createMutation = useCreateRatePlanMutation();
  const updateMutation = useUpdateRatePlanMutation();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (!isOpen) return;

    if (!isEdit) {
      setName(createEmptyRatePlanTranslation());
      setDescription(createEmptyRatePlanTranslation());
      return;
    }

    if (multiLangQuery.data) {
      setName({
        en: multiLangQuery.data.name.en || "",
        fr: multiLangQuery.data.name.fr || "",
        ru: multiLangQuery.data.name.ru || "",
        ro: multiLangQuery.data.name.ro || "",
        it: multiLangQuery.data.name.it || "",
      });
      setDescription({
        en: multiLangQuery.data.description.en || "",
        fr: multiLangQuery.data.description.fr || "",
        ru: multiLangQuery.data.description.ru || "",
        ro: multiLangQuery.data.description.ro || "",
        it: multiLangQuery.data.description.it || "",
      });
    }
  }, [isOpen, isEdit, multiLangQuery.data]);

  const handleNameChange = (
    key: keyof RatePlanTranslationInput,
    val: string
  ) => {
    setName((prev) => ({ ...prev, [key]: val }));
  };

  const handleDescriptionChange = (
    key: keyof RatePlanTranslationInput,
    val: string
  ) => {
    setDescription((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.en.trim()) {
      toast.error("English plan name is required.");
      return;
    }

    const payloadName: RatePlanTranslationInput = {
      en: name.en.trim(),
      fr: name.fr.trim() || name.en.trim(),
      ru: name.ru.trim() || name.en.trim(),
      ro: name.ro.trim() || name.en.trim(),
      it: name.it.trim() || name.en.trim(),
    };

    const payloadDesc: RatePlanTranslationInput = {
      en: description.en.trim(),
      fr: description.fr.trim() || description.en.trim(),
      ru: description.ru.trim() || description.en.trim(),
      ro: description.ro.trim() || description.en.trim(),
      it: description.it.trim() || description.en.trim(),
    };

    try {
      if (isEdit && ratePlanId) {
        await updateMutation.mutateAsync({
          id: ratePlanId,
          hotelId,
          name: payloadName,
          description: payloadDesc,
        });
        toast.success("Rate plan updated successfully.");
      } else {
        await createMutation.mutateAsync({
          hotelId,
          name: payloadName,
          description: payloadDesc,
        });
        toast.success("Rate plan created successfully.");
      }
      onSuccess();
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to save rate plan."));
    }
  };

  return (
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      eyebrow={hotelName}
      title={isEdit ? "Edit Rate Plan" : "Create New Rate Plan"}
      subtitle="Define board type, inclusions, and room package details across all 5 languages."
      widthClassName="max-w-lg sm:max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6 pb-6">
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-wider text-[#013E51] block">
            Rate Plan Name &amp; Description Across Languages
          </label>

          <div className="space-y-4">
            {TRIP_TYPE_LANGUAGES.map((lang) => {
              const key = lang.code.toLowerCase() as keyof RatePlanTranslationInput;
              const isEn = lang.code === "EN";

              return (
                <div
                  key={lang.code}
                  className={`p-4 rounded-2xl border space-y-3 ${isEn
                    ? "border-[#013E51]/20 bg-[#FAF7F2]/50 ring-1 ring-[#013E51]/10"
                    : "border-gray-200 bg-white"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#013E51] uppercase tracking-wider flex items-center gap-2">
                      <LanguageFlag code={lang.code} size="sm" />
                      <span className="px-2 py-0.5 rounded-md bg-[#013E51]/10 text-[#013E51] font-mono text-[11px]">
                        {lang.code}
                      </span>
                      <span>{lang.label}</span>
                      {isEn && <span>*</span>}
                    </span>
                    {!isEn && (
                      <span className="text-[10px] text-gray-400 font-medium">
                        Auto-falls back to EN
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-600 block">
                      Plan Name ({lang.code}) {isEn ? "*" : ""}
                    </label>
                    <input
                      type="text"
                      required={isEn}
                      value={name[key] || ""}
                      onChange={(e) => handleNameChange(key, e.target.value)}
                      placeholder={`e.g. Deluxe Sea View Room - Bed & Breakfast (${lang.code})...`}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-[#013E51] font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#013E51] block">
                      Detailed Description (EN) <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      value={description[key] || ""}
                      onChange={(e) =>
                        handleDescriptionChange(key, e.target.value)
                      }
                      required
                      placeholder={`Package inclusions, room size, and board type in ${lang.label.split(" ")[0]}...`}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-[#013E51] font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-[#013E51] hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#013E51] text-white text-xs font-bold hover:bg-[#025670] transition shadow-sm disabled:opacity-50 cursor-pointer"
          >
            <FiSave className="w-4 h-4 text-[#E8B34A]" />
            <span>{isSubmitting ? "Saving..." : "Save Rate Plan"}</span>
          </button>
        </div>
      </form>
    </AdminDrawer>
  );
}
