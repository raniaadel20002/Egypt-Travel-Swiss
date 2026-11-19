"use client";

import { FiUploadCloud } from "react-icons/fi";

interface TripInitialPhotosPickerProps {
  initialFiles: File[];
  onFilesChange: (files: File[]) => void;
}

export default function TripInitialPhotosPicker({
  initialFiles,
  onFilesChange,
}: TripInitialPhotosPickerProps) {
  return (
    <div className="space-y-2 pt-4 border-t border-gray-100">
      <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
        Initial Excursion Photos (Optional)
      </label>
      <div className="p-4 rounded-xl border border-dashed border-[#013E51]/20 bg-[#FAF7F2]/60 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {initialFiles.length > 0
            ? `${initialFiles.length} photos ready to upload upon creation`
            : "You can also add and manage gallery photos anytime later"}
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
          className="px-3 py-1.5 rounded-lg border border-[#013E51]/20 bg-white text-xs font-bold text-[#013E51] hover:bg-gray-100 transition cursor-pointer flex items-center gap-1.5"
        >
          <FiUploadCloud className="w-3.5 h-3.5" />
          <span>
            {initialFiles.length > 0 ? "Change Photos" : "Pick Photos"}
          </span>
        </label>
      </div>
    </div>
  );
}
