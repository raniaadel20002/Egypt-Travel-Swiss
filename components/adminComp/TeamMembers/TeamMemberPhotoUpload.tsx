"use client";

import Image from "next/image";
import { FiUploadCloud, FiRotateCcw } from "react-icons/fi";

interface TeamMemberPhotoUploadProps {
  previewUrl: string;
  isEdit: boolean;
  isRequired?: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetFile?: () => void;
  hasStagedFile?: boolean;
}

export default function TeamMemberPhotoUpload({
  previewUrl,
  isEdit,
  isRequired = false,
  onFileChange,
  onResetFile,
  hasStagedFile = false,
}: TeamMemberPhotoUploadProps) {
  return (
    <div className="space-y-2.5">
      <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
        Profile Portrait {isRequired ? "*" : "(Select to replace)"}
      </label>
      <div className="flex items-center gap-4 p-4 rounded-2xl border border-[#013E51]/10 bg-[#FAF7F2]/40">
        <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-white border border-[#013E51]/15 shrink-0 flex items-center justify-center">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Portrait Preview"
              fill
              sizes="96px"
              className="object-cover object-top"
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
            id="team-member-image-upload"
            onChange={onFileChange}
            className="hidden"
          />
          <div className="flex flex-wrap items-center gap-2">
            <label
              htmlFor="team-member-image-upload"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#013E51]/15 text-xs font-bold uppercase tracking-wider text-[#013E51] bg-white hover:bg-[#013E51] hover:text-white transition cursor-pointer"
            >
              <FiUploadCloud className="w-4 h-4" />
              <span>{previewUrl ? "Change Photo" : "Upload Photo"}</span>
            </label>
            {isEdit && hasStagedFile && onResetFile && (
              <button
                type="button"
                onClick={onResetFile}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 bg-white hover:bg-gray-100 transition cursor-pointer"
              >
                <FiRotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
          <p className="text-[11px] text-[#888888]">
            Square or vertical portrait recommended (WebP, JPG, PNG).
          </p>
        </div>
      </div>
    </div>
  );
}
