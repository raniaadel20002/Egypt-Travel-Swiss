"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  FiUploadCloud,
  FiTrash2,
  FiStar,
  FiCheck,
  FiLoader,
  FiImage,
} from "react-icons/fi";
import { toast } from "sonner";
import { TripApiItem } from "@/models/trip";
import {
  useDeleteTripImageMutation,
  useSetPrimaryTripImageMutation,
  useUploadTripImagesMutation,
} from "@/features/trips/useTrips";
import AdminDrawer from "@/components/adminComp/Common/AdminDrawer";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

interface TripImagesDrawerProps {
  isOpen: boolean;
  trip: TripApiItem | null;
  onClose: () => void;
}

export default function TripImagesDrawer({
  isOpen,
  trip,
  onClose,
}: TripImagesDrawerProps) {
  const uploadMutation = useUploadTripImagesMutation();
  const deleteMutation = useDeleteTripImageMutation();
  const setPrimaryMutation = useSetPrimaryTripImageMutation();

  const isActionLoading =
    uploadMutation.isPending ||
    deleteMutation.isPending ||
    setPrimaryMutation.isPending;

  const handleFilesSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!trip || !e.target.files || e.target.files.length === 0) return;
    const filesArray = Array.from(e.target.files);
    e.target.value = "";

    try {
      await uploadMutation.mutateAsync({
        tripId: trip.id,
        images: filesArray,
      });
      toast.success(
        `${filesArray.length} ${
          filesArray.length === 1 ? "photo" : "photos"
        } uploaded successfully.`
      );
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to upload photos."));
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!trip) return;

    try {
      await deleteMutation.mutateAsync({
        tripId: trip.id,
        imageId,
      });
      toast.success("Photo removed successfully.");
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to delete photo."));
    }
  };

  const handleSetPrimary = async (imageId: number) => {
    if (!trip) return;

    try {
      await setPrimaryMutation.mutateAsync({
        tripId: trip.id,
        imageId,
      });
      toast.success("Primary cover photo updated.");
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to set primary photo."));
    }
  };

  const images = useMemo(() => {
    const list = trip?.images || [];
    const seen = new Set<string>();
    return list.filter((img, idx) => {
      const key =
        typeof img.id === "number" && img.id > 0
          ? `id_${img.id}`
          : `url_${img.imageUrl || idx}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [trip?.images]);

  return (
    <AdminDrawer
      isOpen={isOpen}
      onClose={onClose}
      disableClose={isActionLoading}
      eyebrow={trip ? `ID #${trip.id}` : "Gallery"}
      title="Excursion Gallery"
      subtitle={
        trip
          ? `Manage cover and gallery photos for "${trip.name}".`
          : "Manage excursion photos."
      }
      widthClassName="max-w-xl sm:max-w-2xl"
      footer={
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{images.length} Photos in gallery</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold uppercase tracking-wider text-[#013E51] hover:bg-[#FAF7F2] transition cursor-pointer"
          >
            Done
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Upload Box */}
        <div className="p-4 rounded-2xl border border-dashed border-[#013E51]/20 bg-[#FAF7F2]/60 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#013E51] block">
                Add Excursion Photos
              </span>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Select one or multiple images (WebP, JPG, PNG).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="file"
                multiple
                accept="image/*"
                id="trip-multi-image-upload"
                onChange={handleFilesSelect}
                disabled={isActionLoading}
                className="hidden"
              />
              <label
                htmlFor="trip-multi-image-upload"
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#013E51]/20 bg-white text-xs font-bold text-[#013E51] hover:bg-gray-100 transition cursor-pointer ${
                  isActionLoading ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                {uploadMutation.isPending ? (
                  <>
                    <FiLoader className="w-4 h-4 animate-spin text-[#E8B34A]" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <FiUploadCloud className="w-4 h-4" />
                    <span>Choose & Upload Photos</span>
                  </>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {images.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-gray-200 rounded-2xl text-gray-400 flex flex-col items-center">
            <FiImage className="w-8 h-8 mb-2" />
            <span className="text-xs font-medium">
              No photos uploaded for this excursion yet.
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {images.map((img, idx) => {
              const fullUrl = resolveApiImageUrl(img.imageUrl);
              const cardKey =
                typeof img.id === "number" && img.id > 0
                  ? `trip-img-${img.id}`
                  : `trip-img-idx-${idx}-${img.imageUrl || ""}`;

              return (
                <div
                  key={cardKey}
                  className={`relative rounded-2xl overflow-hidden border group bg-gray-50 flex flex-col ${
                    img.isPrimary
                      ? "border-[#E8B34A] ring-2 ring-[#E8B34A]/40"
                      : "border-gray-200"
                  }`}
                >
                  <div className="relative aspect-4/3 w-full bg-gray-100">
                    {fullUrl ? (
                      <Image
                        src={fullUrl}
                        alt="Trip Photo"
                        fill
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <FiImage className="w-6 h-6" />
                      </div>
                    )}

                    {img.isPrimary && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#E8B34A] text-[#013E51] shadow-xs flex items-center gap-1">
                        <FiStar className="w-3 h-3 fill-[#013E51]" />
                        <span>Primary</span>
                      </span>
                    )}
                  </div>

                  <div className="p-2 bg-white flex items-center justify-between gap-1 border-t border-gray-100">
                    {!img.isPrimary ? (
                      <button
                        type="button"
                        onClick={() => handleSetPrimary(img.id)}
                        disabled={isActionLoading}
                        className="text-[11px] font-bold text-[#013E51] hover:text-[#E8B34A] transition cursor-pointer"
                      >
                        Make Primary
                      </button>
                    ) : (
                      <span className="text-[11px] font-semibold text-gray-400">
                        Cover
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDeleteImage(img.id)}
                      disabled={isActionLoading}
                      title="Delete Image"
                      className="p-1 rounded-lg text-red-500 hover:bg-red-50 transition cursor-pointer"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminDrawer>
  );
}
