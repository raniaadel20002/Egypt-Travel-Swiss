"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiCheck,
  FiImage,
  FiLoader,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";
import { DivingCourseApiItem, DivingCourseImageApiItem } from "@/models/divingCourse";
import {
  useDeleteDivingCourseImageMutation,
  useDivingCourseImagesQuery,
  useReorderDivingCourseImagesMutation,
  useUploadDivingCourseImageMutation,
} from "@/features/divingCourses/useDivingCourseImages";
import DivingCourseImageCard from "./DivingCourseImageCard";

interface DivingCourseImagesDrawerProps {
  course: DivingCourseApiItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DivingCourseImagesDrawer({
  course,
  isOpen,
  onClose,
}: DivingCourseImagesDrawerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localImages, setLocalImages] = useState<DivingCourseImageApiItem[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { data: images, isLoading } = useDivingCourseImagesQuery(
    course?.id,
    isOpen && Boolean(course?.id)
  );

  const uploadMutation = useUploadDivingCourseImageMutation(course?.id);
  const deleteMutation = useDeleteDivingCourseImageMutation(course?.id);
  const reorderMutation = useReorderDivingCourseImagesMutation(course?.id);

  useEffect(() => {
    if (images) {
      const sorted = [...images].sort((a, b) => a.order - b.order);
      setLocalImages(sorted);
    }
  }, [images]);

  if (!isOpen || !course) return null;

  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setIsUploading(true);
    try {
      for (const file of files) {
        await uploadMutation.mutateAsync(file);
      }
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async (imageId: string) => {
    setDeletingId(imageId);
    try {
      await deleteMutation.mutateAsync(imageId);
      setLocalImages((prev) => prev.filter((img) => img.id !== imageId));
    } finally {
      setDeletingId(null);
    }
  };

  const handleShiftOrder = (index: number, direction: "prev" | "next") => {
    const targetIndex = direction === "prev" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= localImages.length) return;

    const copy = [...localImages];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;

    const updated = copy.map((img, i) => ({ ...img, order: i }));
    setLocalImages(updated);
  };

  const handleSaveOrder = async () => {
    const items = localImages.map((img, index) => ({
      id: img.id,
      order: index,
    }));
    await reorderMutation.mutateAsync(items);
  };

  const isOrderDirty =
    images &&
    images.length === localImages.length &&
    localImages.some((img, idx) => img.id !== images[idx]?.id);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-[#013E51]/40 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isUploading) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#013E51]/10 flex items-center justify-center text-[#013E51]">
              <FiImage className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#013E51]">
                Course Gallery Photos
              </h2>
              <p className="text-xs text-[#888888] line-clamp-1">
                {course.name} ({localImages.length} images)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isUploading}
            aria-label="Close drawer"
            className="p-2 rounded-xl text-gray-400 hover:text-[#013E51] hover:bg-gray-100 transition cursor-pointer"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 hover:border-[#013E51] rounded-2xl p-6 text-center bg-[#FAF7F2]/50 hover:bg-[#FAF7F2] transition cursor-pointer flex flex-col items-center justify-center gap-2"
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFilesSelected}
              disabled={isUploading}
            />
            {isUploading ? (
              <>
                <FiLoader className="w-8 h-8 text-[#013E51] animate-spin" />
                <span className="text-xs font-bold text-[#013E51]">
                  Uploading photos...
                </span>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-white shadow-xs flex items-center justify-center text-[#013E51]">
                  <FiUploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#013E51]">
                    Click to browse and upload photos
                  </p>
                  <p className="text-[11px] text-gray-500">
                    PNG, JPG, WEBP. Instant upload on selection.
                  </p>
                </div>
              </>
            )}
          </div>

          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2 text-gray-400">
              <FiLoader className="w-6 h-6 animate-spin" />
              <span className="text-xs font-medium">Loading photos...</span>
            </div>
          ) : localImages.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-xs">
              No photos added yet. Upload the first course image above.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {localImages.map((img, idx) => (
                <DivingCourseImageCard
                  key={img.id}
                  img={img}
                  index={idx}
                  total={localImages.length}
                  isDeleting={deletingId === img.id}
                  isReordering={reorderMutation.isPending}
                  onDelete={handleDelete}
                  onShiftOrder={handleShiftOrder}
                />
              ))}
            </div>
          )}
        </div>

        {isOrderDirty && (
          <div className="p-4 border-t border-gray-100 bg-[#FAF7F2] flex items-center justify-between shrink-0">
            <span className="text-xs text-[#013E51] font-medium">
              Image order changed. Save order now?
            </span>
            <button
              type="button"
              onClick={handleSaveOrder}
              disabled={reorderMutation.isPending}
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
        )}
      </div>
    </div>
  );
}
