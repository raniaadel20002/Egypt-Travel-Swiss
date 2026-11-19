"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FiUploadCloud, FiCheck, FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import {
  TripTypeItem,
  TripTypeLocalizedNames,
} from "@/models/tripType";
import TripTypeNamesFields from "./TripTypeNamesFields";
import {
  useCreateTripTypeMutation,
  useTripTypeMultiLangQuery,
  useUpdateTripTypeMutation,
} from "@/features/tripTypes/useTripTypes";
import AdminDrawer from "@/components/adminComp/Common/AdminDrawer";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

interface TripTypeFormModalProps {
  isOpen: boolean;
  mode: "create" | "edit-full" | "edit-image";
  item: TripTypeItem | null;
  onClose: () => void;
}

const emptyNames: TripTypeLocalizedNames = {
  En: "",
  Fr: "",
  Ru: "",
  Ro: "",
  It: "",
};

const DRAWER_COPY = {
  create: {
    title: "Create Trip Type",
    subtitle: "Add a new trip classification across all 5 supported languages.",
  },
  "edit-image": {
    title: "Update Trip Type Image",
    subtitle: "Upload a new cover image while preserving existing 5-language translations.",
  },
  "edit-full": {
    title: "Edit Trip Type",
    subtitle: "Modify translations across all 5 languages or replace the cover photo.",
  },
} as const;

export default function TripTypeFormModal({
  isOpen,
  mode,
  item,
  onClose,
}: TripTypeFormModalProps) {
  const isEdit = mode === "edit-full" || mode === "edit-image";
  const [names, setNames] = useState<TripTypeLocalizedNames>(emptyNames);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [editTranslations, setEditTranslations] = useState(false);

  const multiLangQuery = useTripTypeMultiLangQuery(
    isEdit && item ? item.id : null,
    isOpen && isEdit
  );

  const createMutation = useCreateTripTypeMutation();
  const updateMutation = useUpdateTripTypeMutation();
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (!isOpen) {
      setNames(emptyNames);
      setSelectedFile(null);
      setPreviewUrl("");
      setEditTranslations(false);
      return;
    }

    if (isEdit && multiLangQuery.data) {
      setNames(multiLangQuery.data.names);
      if (multiLangQuery.data.imageUrl) {
        setPreviewUrl(resolveApiImageUrl(multiLangQuery.data.imageUrl));
      }
    } else if (!isEdit) {
      setNames(emptyNames);
      setSelectedFile(null);
      setPreviewUrl("");
    }
  }, [isOpen, isEdit, multiLangQuery.data]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    if (mode === "edit-image" && item && !editTranslations) {
      try {
        setPreviewUrl(URL.createObjectURL(file));
        const activeNames = names.En
          ? names
          : {
              En: item.name,
              Fr: item.name,
              Ru: item.name,
              Ro: item.name,
              It: item.name,
            };
        await updateMutation.mutateAsync({
          id: item.id,
          names: activeNames,
          image: file,
          existingImageUrl: item.imageUrl,
        });
        toast.success("Trip type image updated successfully.");
      } catch (err) {
        toast.error(extractErrorMessage(err, "Failed to update image."));
      }
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleNameChange = (key: keyof TripTypeLocalizedNames, value: string) => {
    setNames((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!names.En.trim()) {
      toast.error("English name is required.");
      return;
    }

    if (!isEdit && !selectedFile) {
      toast.error("Please upload an image for the new trip type.");
      return;
    }

    const normalizedNames: TripTypeLocalizedNames = {
      En: names.En.trim(),
      Fr: (names.Fr || names.En).trim(),
      Ru: (names.Ru || names.En).trim(),
      Ro: (names.Ro || names.En).trim(),
      It: (names.It || names.En).trim(),
    };

    try {
      if (isEdit && item) {
        await updateMutation.mutateAsync({
          id: item.id,
          names: normalizedNames,
          image: selectedFile,
          existingImageUrl: item.imageUrl,
        });
        toast.success("Trip type updated successfully.");
      } else if (selectedFile) {
        await createMutation.mutateAsync({
          names: normalizedNames,
          image: selectedFile,
        });
        toast.success("Trip type created successfully.");
      }
      onClose();
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to save trip type."));
    }
  };

  const { title, subtitle } = DRAWER_COPY[mode];
  const isLoadingTranslations = isEdit && multiLangQuery.isLoading;
  const showEditableInputs = mode !== "edit-image" || editTranslations;

  return (
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      disableClose={isSubmitting}
      eyebrow={isEdit ? `ID #${item?.id}` : "Catalog"}
      title={title}
      subtitle={subtitle}
      footer={
        isLoadingTranslations ? undefined : mode === "edit-image" && !editTranslations ? (
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold uppercase tracking-wider text-[#013E51] hover:bg-[#FAF7F2] transition cursor-pointer disabled:opacity-50"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold uppercase tracking-wider text-[#013E51] hover:bg-[#FAF7F2] transition cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="triptype-drawer-form"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#013E51] hover:bg-[#025670] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="w-4 h-4 animate-spin text-[#E8B34A]" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FiCheck className="w-4 h-4 text-[#E8B34A]" />
                  <span>{isEdit ? "Update Changes" : "Create Trip Type"}</span>
                </>
              )}
            </button>
          </div>
        )
      }
    >
      {isLoadingTranslations ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3 text-sm text-[#013E51]">
          <FiLoader className="w-6 h-6 animate-spin text-[#E8B34A]" />
          <span>Loading 5-language translations from Touristy server...</span>
        </div>
      ) : (
        <form id="triptype-drawer-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
              Cover Photo {mode === "create" ? "*" : "(Upload to replace)"}
            </label>
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-[#013E51]/10 bg-[#FAF7F2]/40">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-white border border-[#013E51]/15 shrink-0 flex items-center justify-center">
                {previewUrl ? (
                  <Image src={previewUrl} alt="Preview" fill sizes="96px" className="object-cover" unoptimized />
                ) : (
                  <FiUploadCloud className="w-8 h-8 text-[#013E51]/40" />
                )}
              </div>
              <div className="flex-1">
                <input type="file" accept="image/*" id="triptype-image-upload" onChange={handleFileChange} className="hidden" />
                <label
                  htmlFor="triptype-image-upload"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#013E51]/15 text-xs font-bold uppercase tracking-wider text-[#013E51] bg-white hover:bg-[#013E51] hover:text-white transition cursor-pointer"
                >
                  <FiUploadCloud className="w-4 h-4" />
                  <span>{previewUrl ? "Change Photo" : "Upload Photo"}</span>
                </label>
                <p className="text-[11px] text-[#888888] mt-2">Recommended: WebP, PNG, or JPG (aspect 1:1 or 4:3).</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#013E51]">
                {showEditableInputs ? "Names Across 5 Languages" : "Preserved Translations"}
              </label>
              {mode === "edit-image" && (
                <button
                  type="button"
                  onClick={() => setEditTranslations((prev) => !prev)}
                  className="text-[11px] font-bold text-[#013E51] hover:text-[#E8B34A] underline transition cursor-pointer"
                >
                  {editTranslations ? "Keep Read-Only" : "Edit Translations"}
                </button>
              )}
            </div>

            <TripTypeNamesFields
              names={names}
              showEditableInputs={showEditableInputs}
              onChange={handleNameChange}
            />
          </div>
        </form>
      )}
    </AdminDrawer>
  );
}
