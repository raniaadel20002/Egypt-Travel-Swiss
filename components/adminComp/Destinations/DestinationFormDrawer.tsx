"use client";

import { useEffect, useState } from "react";
import { FiCheck, FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import {
  DestinationApiItem,
  DestinationLocalizedNames,
} from "@/models/destination";
import {
  useCreateDestinationMutation,
  useDeleteDestinationImageMutation,
  useDestinationMultiLangQuery,
  useUpdateDestinationImageMutation,
  useUpdateDestinationMutation,
} from "@/features/destinations/useDestinations";
import AdminDrawer from "@/components/adminComp/Common/AdminDrawer";
import DestinationPhotoUpload from "./DestinationPhotoUpload";
import DestinationFeaturedToggle from "./DestinationFeaturedToggle";
import DestinationNamesFields from "./DestinationNamesFields";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

interface DestinationFormDrawerProps {
  isOpen: boolean;
  mode: "create" | "edit-full" | "edit-image";
  item: DestinationApiItem | null;
  onClose: () => void;
}

const emptyNames: DestinationLocalizedNames = {
  En: "",
  Fr: "",
  Ru: "",
  Ro: "",
  It: "",
};

const DRAWER_COPY = {
  create: {
    title: "Create Destination",
    subtitle: "Add a tourist hub or city guide across all 5 supported languages.",
  },
  "edit-image": {
    title: "Update Destination Photo",
    subtitle: "Upload a new cover photo or remove the current image.",
  },
  "edit-full": {
    title: "Edit Destination",
    subtitle: "Modify translations, toggle featured visibility, or update cover photo.",
  },
} as const;

export default function DestinationFormDrawer({
  isOpen,
  mode,
  item,
  onClose,
}: DestinationFormDrawerProps) {
  const isEdit = mode === "edit-full" || mode === "edit-image";
  const [names, setNames] = useState<DestinationLocalizedNames>(emptyNames);
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const multiLangQuery = useDestinationMultiLangQuery(
    isEdit && item ? item.id : null,
    isOpen && isEdit
  );

  const createMutation = useCreateDestinationMutation();
  const updateMutation = useUpdateDestinationMutation();
  const updateImageMutation = useUpdateDestinationImageMutation();
  const deleteImageMutation = useDeleteDestinationImageMutation();

  const isSubmitting =
    createMutation.isPending ||
    updateMutation.isPending ||
    updateImageMutation.isPending ||
    deleteImageMutation.isPending;

  useEffect(() => {
    if (!isOpen) {
      setNames(emptyNames);
      setIsFeatured(false);
      setSelectedFile(null);
      setPreviewUrl("");
      return;
    }

    if (isEdit && multiLangQuery.data) {
      setNames(multiLangQuery.data.names);
      setIsFeatured(multiLangQuery.data.isFeatured);
      if (multiLangQuery.data.imageUrl) {
        setPreviewUrl(resolveApiImageUrl(multiLangQuery.data.imageUrl));
      }
    } else if (isEdit && item) {
      setIsFeatured(item.isFeatured);
      if (item.imageUrl) {
        setPreviewUrl(resolveApiImageUrl(item.imageUrl));
      }
    } else if (!isEdit) {
      setNames(emptyNames);
      setIsFeatured(false);
      setSelectedFile(null);
      setPreviewUrl("");
    }
  }, [isOpen, isEdit, item, multiLangQuery.data]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    if (mode === "edit-image" && item) {
      try {
        setPreviewUrl(URL.createObjectURL(file));
        await updateImageMutation.mutateAsync({
          id: item.id,
          imageFile: file,
        });
        toast.success("Destination photo updated successfully.");
      } catch (err) {
        toast.error(extractErrorMessage(err, "Failed to update photo."));
      }
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDeleteImage = async () => {
    if (!item) return;
    try {
      await deleteImageMutation.mutateAsync(item.id);
      setSelectedFile(null);
      setPreviewUrl("");
      toast.success("Destination photo removed successfully.");
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to remove photo."));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "edit-image") {
      onClose();
      return;
    }

    if (!names.En.trim()) {
      toast.error("English destination name is required.");
      return;
    }

    if (!isEdit && !selectedFile) {
      toast.error("Please upload an image for the new destination.");
      return;
    }

    const normalizedNames: DestinationLocalizedNames = {
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
          isFeatured,
          imageFile: selectedFile,
        });
        toast.success("Destination updated successfully.");
      } else if (selectedFile) {
        await createMutation.mutateAsync({
          names: normalizedNames,
          isFeatured,
          imageFile: selectedFile,
        });
        toast.success("Destination created successfully.");
      }
      onClose();
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to save destination."));
    }
  };

  const { title, subtitle } = DRAWER_COPY[mode];
  const isLoadingData = isEdit && multiLangQuery.isLoading;

  return (
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      disableClose={isSubmitting}
      eyebrow={isEdit ? `ID #${item?.id}` : "Destinations"}
      title={title}
      subtitle={subtitle}
      footer={
        isLoadingData ? undefined : mode === "edit-image" ? (
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
              form="destination-drawer-form"
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
                  <span>{isEdit ? "Update Changes" : "Save Destination"}</span>
                </>
              )}
            </button>
          </div>
        )
      }
    >
      {isLoadingData ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3 text-sm text-[#013E51]">
          <FiLoader className="w-6 h-6 animate-spin text-[#E8B34A]" />
          <span>Loading destination details across 5 languages...</span>
        </div>
      ) : (
        <form id="destination-drawer-form" onSubmit={handleSubmit} className="space-y-6">
          <DestinationPhotoUpload
            previewUrl={previewUrl}
            isEdit={isEdit}
            isSubmitting={isSubmitting}
            isRequired={mode === "create"}
            onFileChange={handleFileChange}
            onDeleteImage={handleDeleteImage}
          />

          {mode !== "edit-image" && (
            <>
              <DestinationFeaturedToggle
                isFeatured={isFeatured}
                onToggle={() => setIsFeatured((prev) => !prev)}
              />

              <DestinationNamesFields
                names={names}
                onChange={(key, val) =>
                  setNames((prev) => ({ ...prev, [key]: val }))
                }
              />
            </>
          )}
        </form>
      )}
    </AdminDrawer>
  );
}
