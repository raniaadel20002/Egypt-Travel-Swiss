"use client";

import Image from "next/image";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiImage,
  FiLoader,
  FiTrash2,
} from "react-icons/fi";
import { DivingCourseImageApiItem } from "@/models/divingCourse";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";

interface DivingCourseImageCardProps {
  img: DivingCourseImageApiItem;
  index: number;
  total: number;
  isDeleting: boolean;
  isReordering: boolean;
  onDelete: (imageId: string) => void;
  onShiftOrder: (index: number, direction: "prev" | "next") => void;
}

export default function DivingCourseImageCard({
  img,
  index,
  total,
  isDeleting,
  isReordering,
  onDelete,
  onShiftOrder,
}: DivingCourseImageCardProps) {
  const rawPath = img.imageUrl || img.url || "";
  const fullUrl = rawPath ? resolveApiImageUrl(rawPath) : null;
  const isCover = index === 0;

  return (
    <div
      className={`rounded-2xl border overflow-hidden bg-white shadow-xs transition-all flex flex-col justify-between ${
        isCover
          ? "border-[#E8B34A] ring-2 ring-[#E8B34A]/40"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        {fullUrl ? (
          <Image
            src={fullUrl}
            alt={`Course photo #${img.id}`}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <FiImage className="w-6 h-6" />
          </div>
        )}

        {isCover && (
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#013E51] text-[#E8B34A] text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
            <FiCheck className="w-3 h-3 text-[#E8B34A]" />
            <span>Cover Photo</span>
          </span>
        )}

        <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/60 text-white text-[10px] font-bold flex items-center justify-center backdrop-blur-xs">
          {index + 1}
        </span>
      </div>

      <div className="p-2.5 bg-[#FAF7F2]/40 border-t border-gray-100 flex items-center justify-between gap-1">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onShiftOrder(index, "prev")}
            disabled={index === 0 || isReordering}
            title="Move left"
            className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:text-[#013E51] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <FiArrowLeft className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={() => onShiftOrder(index, "next")}
            disabled={index === total - 1 || isReordering}
            title="Move right"
            className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:text-[#013E51] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <FiArrowRight className="w-3 h-3" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => onDelete(img.id)}
          disabled={isDeleting}
          title="Delete image"
          className="p-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition disabled:opacity-50 cursor-pointer"
        >
          {isDeleting ? (
            <FiLoader className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <FiTrash2 className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}
