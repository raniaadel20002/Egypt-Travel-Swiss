"use client";

import Image from "next/image";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiCheckCircle,
  FiLoader,
  FiTrash2,
} from "react-icons/fi";
import { HotelImageApiItem } from "@/models/hotel";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";

interface HotelImageCardProps {
  img: HotelImageApiItem;
  index: number;
  total: number;
  isDeleting: boolean;
  isReordering: boolean;
  isSettingPrimary: boolean;
  onSetPrimary: (img: HotelImageApiItem) => void;
  onDelete: (imageId: number) => void;
  onShiftOrder: (index: number, direction: "prev" | "next") => void;
}

export default function HotelImageCard({
  img,
  index,
  total,
  isDeleting,
  isReordering,
  isSettingPrimary,
  onSetPrimary,
  onDelete,
  onShiftOrder,
}: HotelImageCardProps) {
  const fullUrl = resolveApiImageUrl(img.imageUrl);
  const isPrimary = img.isPrimary;

  return (
    <div
      className={`rounded-2xl border overflow-hidden bg-white shadow-xs transition-all flex flex-col justify-between ${
        isPrimary
          ? "border-[#E8B34A] ring-2 ring-[#E8B34A]/40"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* Photo Thumbnail */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <Image
          src={fullUrl}
          alt={`Hotel photo #${img.id}`}
          fill
          className="object-cover"
          unoptimized
        />

        {/* Primary Badge */}
        {isPrimary && (
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#013E51] text-[#E8B34A] text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
            <FiCheck className="w-3 h-3 text-[#E8B34A]" />
            <span>Primary</span>
          </span>
        )}

        {/* Order Badge */}
        <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/60 text-white text-[10px] font-bold flex items-center justify-center backdrop-blur-xs">
          {index + 1}
        </span>
      </div>

      {/* Actions Bar */}
      <div className="p-2.5 bg-[#FAF7F2]/40 border-t border-gray-100 flex items-center justify-between gap-1">
        {/* Shift Controls */}
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

        <div className="flex items-center gap-1">
          {/* Set Primary Button */}
          {!isPrimary && (
            <button
              type="button"
              onClick={() => onSetPrimary(img)}
              disabled={isSettingPrimary}
              title="Set as Primary cover photo"
              className="px-2 py-1 rounded-lg border border-[#013E51]/20 bg-white text-[10px] font-bold text-[#013E51] hover:bg-[#013E51] hover:text-white transition cursor-pointer flex items-center gap-1"
            >
              <FiCheckCircle className="w-3 h-3" />
              <span className="hidden sm:inline">Set Primary</span>
            </button>
          )}

          {/* Delete Button */}
          <button
            type="button"
            onClick={() => onDelete(img.id)}
            disabled={isDeleting}
            title="Delete photo"
            className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition cursor-pointer disabled:opacity-40"
          >
            {isDeleting ? (
              <FiLoader className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <FiTrash2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
