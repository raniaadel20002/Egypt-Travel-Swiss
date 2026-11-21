"use client";

import { useEffect, useState } from "react";
import { FiCheck, FiCopy, FiLoader, FiX } from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import { toast } from "sonner";
import { useModalDismiss } from "@/shared/utils/useModalDismiss";
import {
  TRANSFER_LOCATION_LANGUAGES,
} from "@/models/transferLocation";
import LanguageFlag from "@/components/adminComp/Common/LanguageFlag";
import {
  CreatePrivateVehiclePayload,
  PrivateVehicleApiItem,
  PrivateVehicleLocalizedName,
  UpdatePrivateVehiclePayload,
} from "@/models/privateVehicle";
import {
  useCreatePrivateVehicleMutation,
  usePrivateVehicleMultiLangQuery,
  useUpdatePrivateVehicleMutation,
} from "@/features/privateVehicles/usePrivateVehicles";

interface PrivateVehicleFormDrawerProps {
  isOpen: boolean;
  item: PrivateVehicleApiItem | null;
  onClose: () => void;
}

const emptyNames = (): PrivateVehicleLocalizedName => ({
  en: "",
  fr: "",
  ru: "",
  ro: "",
  it: "",
});

export default function PrivateVehicleFormDrawer({
  isOpen,
  item,
  onClose,
}: PrivateVehicleFormDrawerProps) {
  const isEdit = Boolean(item);
  const [names, setNames] = useState<PrivateVehicleLocalizedName>(emptyNames());

  const multiLangQuery = usePrivateVehicleMultiLangQuery(
    item?.id || null,
    isOpen && isEdit
  );

  const createMutation = useCreatePrivateVehicleMutation();
  const updateMutation = useUpdatePrivateVehicleMutation();
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  useModalDismiss({ isOpen, onClose, disabled: isSubmitting });

  useEffect(() => {
    if (isEdit && multiLangQuery.data) {
      setNames(multiLangQuery.data.name || emptyNames());
    } else if (!isEdit && isOpen) {
      setNames(emptyNames());
    }
  }, [isEdit, multiLangQuery.data, isOpen]);

  if (!isOpen) return null;

  const handleCopyEnToAll = () => {
    const enVal = names.en.trim();
    if (!enVal) {
      toast.warning("Please enter English name first.");
      return;
    }
    setNames((prev) => ({
      en: enVal,
      fr: prev.fr?.trim() || enVal,
      ru: prev.ru?.trim() || enVal,
      ro: prev.ro?.trim() || enVal,
      it: prev.it?.trim() || enVal,
    }));
    toast.success("Filled empty languages from English.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const enVal = names.en.trim();
    if (!enVal) {
      toast.error("English vehicle name is required.");
      return;
    }

    const cleanedNames: PrivateVehicleLocalizedName = {
      en: enVal,
      fr: names.fr?.trim() || enVal,
      ru: names.ru?.trim() || enVal,
      ro: names.ro?.trim() || enVal,
      it: names.it?.trim() || enVal,
    };

    if (isEdit && item) {
      const payload: UpdatePrivateVehiclePayload = {
        id: item.id,
        name: cleanedNames,
      };
      await updateMutation.mutateAsync(payload);
    } else {
      const payload: CreatePrivateVehiclePayload = {
        name: cleanedNames,
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
    >
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#013E51]/10 flex items-center justify-center text-[#013E51]">
              <FaCar className="w-5 h-5 text-[#E8B34A]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#013E51]">
                {isEdit ? "Edit Private Vehicle" : "New Private Vehicle"}
              </h2>
              <p className="text-xs text-[#888888]">
                {isEdit
                  ? "Update vehicle class name across all 5 languages"
                  : "Add a vehicle class (e.g. Standard Sedan, VIP Minivan)"}
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

        {isEdit && multiLangQuery.isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-2 text-gray-400">
            <FiLoader className="w-6 h-6 animate-spin text-[#013E51]" />
            <span className="text-xs font-medium">Loading translations...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-xs font-bold text-[#013E51] uppercase tracking-wider block">
                    Vehicle Name (5 Languages)
                  </label>
                  <span className="text-[11px] text-[#888888]">
                    English is required; others auto-fallback to English.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEnToAll}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#013E51]/20 bg-[#FAF7F2] text-xs font-bold text-[#013E51] hover:bg-[#013E51] hover:text-white transition cursor-pointer"
                >
                  <FiCopy className="w-3.5 h-3.5 text-[#E8B34A]" />
                  <span>Fill Empty from EN</span>
                </button>
              </div>

              <div className="space-y-3">
                {TRANSFER_LOCATION_LANGUAGES.map((lang) => {
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
                        onChange={(e) =>
                          setNames((prev) => ({ ...prev, [lang.code]: e.target.value }))
                        }
                        placeholder={
                          isEn
                            ? "e.g. Standard Sedan (1-4 Persons)"
                            : `Vehicle name in ${lang.label}...`
                        }
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 bg-white text-[#013E51] placeholder-gray-400 focus:outline-hidden focus:border-[#013E51]"
                      />
                    </div>
                  );
                })}
              </div>
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
                <span>{isEdit ? "Update Vehicle" : "Add Vehicle"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
