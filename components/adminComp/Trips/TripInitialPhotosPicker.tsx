"use client";

import { FiUploadCloud, FiAlertCircle } from "react-icons/fi";

interface TripInitialPhotosPickerProps {
  initialFiles: File[];
  onFilesChange: (files: File[]) => void;
  error?: string | null;
}

export default function TripInitialPhotosPicker({
  initialFiles,
  onFilesChange,
  error,
}: TripInitialPhotosPickerProps) {
  return (
    <div className="space-y-2 pt-4 border-t border-gray-100">
      <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
        Initial Excursion Photos <span >*</span>
      </label>
      <div
        className={`p-4 rounded-xl border border-dashed flex items-center justify-between transition-colors ${
          error
            ? "border-red-400 bg-red-50/50"
            : "border-[#013E51]/20 bg-[#FAF7F2]/60"
        }`}
      >
        <span
          className={`text-xs ${
            error ? "text-red-600 font-medium" : "text-gray-500"
          }`}
        >
          {initialFiles.length > 0
            ? `${initialFiles.length} photo${
                initialFiles.length === 1 ? "" : "s"
              } ready to upload upon creation`
            : "At least one photo is required upon creation"}
        </span>
        <input
          type="file"
          multiple
          accept="image/*"
          id="trip-initial-photos"
          onChange={(e) =>
            onFilesChange(e.target.files ? Array.from(e.target.files) : [])
          }
          className="hidden"
        />
        <label
          htmlFor="trip-initial-photos"
          className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
            error
              ? "border-red-300 bg-white text-red-600 hover:bg-red-50"
              : "border-[#013E51]/20 bg-white text-[#013E51] hover:bg-gray-100"
          }`}
        >
          <FiUploadCloud className="w-3.5 h-3.5" />
          <span>
            {initialFiles.length > 0 ? "Change Photos" : "Pick Photos"}
          </span>
        </label>
      </div>
      {error && (
        <p className="text-xs font-medium text-red-600 flex items-center gap-1.5">
          <FiAlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
