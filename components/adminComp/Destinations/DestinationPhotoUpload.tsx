"use client";

import Image from "next/image";
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";

interface DestinationPhotoUploadProps {
  previewUrl: string;
  isEdit: boolean;
  isSubmitting: boolean;
  isRequired?: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteImage?: () => void;
}

export default function DestinationPhotoUpload({
  previewUrl,
  isEdit,
  isSubmitting,
  isRequired = false,
  onFileChange,
  onDeleteImage,
}: DestinationPhotoUploadProps) {
  return (
    <div className="space-y-2.5">
      <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
        Cover Photo {isRequired ? "*" : "(Select to replace)"}
      </label>
      <div className="flex items-center gap-4 p-4 rounded-2xl border border-[#013E51]/10 bg-[#FAF7F2]/40">
        <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-white border border-[#013E51]/15 shrink-0 flex items-center justify-center">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Destination Preview"
              fill
              sizes="96px"
              className="object-cover"
              unoptimized
            />
          ) : (
            <FiUploadCloud className="w-8 h-8 text-[#013E51]/40" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            type="file"
            accept="image/*"
            id="destination-image-upload"
            onChange={onFileChange}
            className="hidden"
          />
          <div className="flex flex-wrap items-center gap-2">
            <label
              htmlFor="destination-image-upload"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#013E51]/15 text-xs font-bold uppercase tracking-wider text-[#013E51] bg-white hover:bg-[#013E51] hover:text-white transition cursor-pointer"
            >
              <FiUploadCloud className="w-4 h-4" />
              <span>{previewUrl ? "Change Photo" : "Upload Photo"}</span>
            </label>
            {isEdit && previewUrl && onDeleteImage && (
              <button
                type="button"
                onClick={onDeleteImage}
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-red-200 text-xs font-bold text-red-600 bg-white hover:bg-red-50 transition cursor-pointer disabled:opacity-50"
              >
                <FiTrash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            )}
          </div>
          <p className="text-[11px] text-[#888888]">
            Recommended: WebP, JPG or PNG landscape format.
          </p>
        </div>
      </div>
    </div>
  );
}
