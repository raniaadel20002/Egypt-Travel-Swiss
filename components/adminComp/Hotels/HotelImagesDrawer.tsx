"use client";

import { useMemo, useState } from "react";
import { FiImage, FiLoader, FiUploadCloud } from "react-icons/fi";
import { toast } from "sonner";
import { HotelApiItem, HotelImageApiItem } from "@/models/hotel";
import {
  useDeleteHotelImageMutation,
  useHotelImagesQuery,
  useReorderHotelImagesMutation,
  useSetPrimaryHotelImageMutation,
  useUploadHotelImagesMutation,
} from "@/features/hotels/useHotels";
import AdminDrawer from "@/components/adminComp/Common/AdminDrawer";
import HotelImageCard from "./HotelImageCard";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

interface HotelImagesDrawerProps {
  isOpen: boolean;
  hotel: HotelApiItem | null;
  onClose: () => void;
}

export default function HotelImagesDrawer({
  isOpen,
  hotel,
  onClose,
}: HotelImagesDrawerProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const imagesQuery = useHotelImagesQuery(
    hotel ? hotel.id : null,
    isOpen && Boolean(hotel)
  );

  const uploadMutation = useUploadHotelImagesMutation();
  const deleteMutation = useDeleteHotelImageMutation();
  const setPrimaryMutation = useSetPrimaryHotelImageMutation();
  const reorderMutation = useReorderHotelImagesMutation();

  const isUploading = uploadMutation.isPending;

  const rawImages = imagesQuery.data || hotel?.images || [];

  const images: HotelImageApiItem[] = useMemo(() => {
    const map = new Map<number, HotelImageApiItem>();
    rawImages.forEach((img) => map.set(img.id, img));
    return Array.from(map.values()).sort(
      (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
    );
  }, [rawImages]);

  const handleFilesSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hotel || !e.target.files || e.target.files.length === 0) return;
    const filesArray = Array.from(e.target.files);
    e.target.value = "";

    try {
      await uploadMutation.mutateAsync({
        hotelId: hotel.id,
        images: filesArray,
      });
      toast.success(`${filesArray.length} photo(s) uploaded successfully.`);
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to upload photos."));
    }
  };

  const handleSetPrimary = async (img: HotelImageApiItem) => {
    if (!hotel || img.isPrimary) return;

    try {
      await setPrimaryMutation.mutateAsync({
        hotelId: hotel.id,
        imageId: img.id,
      });
      toast.success("Primary resort photo updated.");
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to set primary image."));
    }
  };

  const handleDelete = async (imageId: number) => {
    if (!hotel) return;
    setDeletingId(imageId);

    try {
      await deleteMutation.mutateAsync({
        hotelId: hotel.id,
        imageId,
      });
      toast.success("Photo removed successfully.");
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to delete photo."));
    } finally {
      setDeletingId(null);
    }
  };

  const handleShiftOrder = async (index: number, direction: "prev" | "next") => {
    if (!hotel) return;
    const targetIndex = direction === "prev" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const reordered = [...images];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    const imageOrders = reordered.map((img, idx) => ({
      imageId: img.id,
      displayOrder: idx + 1,
    }));

    try {
      await reorderMutation.mutateAsync({
        hotelId: hotel.id,
        imageOrders,
      });
      toast.success("Image sequence updated.");
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to reorder images."));
    }
  };

  return (
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      eyebrow={`Hotel #${hotel?.id}`}
      title="Resort Photos Gallery"
      subtitle={`Upload, reorder, and set primary cover photos for ${hotel?.name || "Hotel"}.`}
      widthClassName="max-w-2xl sm:max-w-3xl"
      footer={
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-gray-500 font-medium">
            Total Photos: <strong className="text-[#013E51]">{images.length}</strong>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#013E51] hover:bg-[#025670] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
          >
            Done
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Instant Upload Bar */}
        <div className="p-4 sm:p-5 rounded-2xl border border-dashed border-[#013E51]/25 bg-[#FAF7F2]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#013E51] text-[#E8B34A] flex items-center justify-center shrink-0">
              <FiImage className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#013E51]">
                Upload Resort Photos
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Select one or multiple images; they upload instantly to the gallery.
              </p>
            </div>
          </div>

          <div>
            <input
              type="file"
              multiple
              accept="image/*"
              id="hotel-gallery-upload-input"
              onChange={handleFilesSelect}
              disabled={isUploading}
              className="hidden"
            />
            <label
              htmlFor="hotel-gallery-upload-input"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#013E51] hover:bg-[#025670] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer ${
                isUploading ? "opacity-60 cursor-not-allowed pointer-events-none" : ""
              }`}
            >
              {isUploading ? (
                <>
                  <FiLoader className="w-4 h-4 animate-spin text-[#E8B34A]" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <FiUploadCloud className="w-4 h-4 text-[#E8B34A]" />
                  <span>Add Photos</span>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Gallery Grid */}
        {imagesQuery.isLoading ? (
          <div className="py-20 text-center">
            <FiLoader className="w-6 h-6 animate-spin text-[#013E51] mx-auto mb-2" />
            <span className="text-xs font-semibold text-[#013E51]">
              Loading resort photos...
            </span>
          </div>
        ) : images.length === 0 ? (
          <div className="py-16 text-center bg-gray-50 rounded-2xl border border-gray-200">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-2">
              <FiImage className="w-6 h-6" />
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#013E51]">
              No Photos Added Yet
            </p>
            <p className="text-[11px] text-gray-400 mt-1">
              Click &quot;Add Photos&quot; above to upload resort and room imagery.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {images.map((img, idx) => (
              <HotelImageCard
                key={img.id}
                img={img}
                index={idx}
                total={images.length}
                isDeleting={deletingId === img.id}
                isReordering={reorderMutation.isPending}
                isSettingPrimary={setPrimaryMutation.isPending}
                onSetPrimary={handleSetPrimary}
                onDelete={handleDelete}
                onShiftOrder={handleShiftOrder}
              />
            ))}
          </div>
        )}
      </div>
    </AdminDrawer>
  );
}
