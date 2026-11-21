"use client";

import { FiAlertTriangle, FiX } from "react-icons/fi";
import { useModalDismiss } from "@/shared/utils/useModalDismiss";
import { TripTypeItem } from "@/models/tripType";

interface TripTypeDeleteModalProps {
  isOpen: boolean;
  item: TripTypeItem | null;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function TripTypeDeleteModal({
  isOpen,
  item,
  isLoading,
  onClose,
  onConfirm,
}: TripTypeDeleteModalProps) {
  useModalDismiss({ isOpen, onClose, disabled: isLoading });

  if (!isOpen || !item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#01232e]/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="w-full max-w-md bg-white rounded-[28px] p-6 sm:p-8 shadow-2xl border border-[#013E51]/10 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
            <FiAlertTriangle className="w-6 h-6" />
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="p-2 rounded-xl text-gray-400 hover:text-[#013E51] hover:bg-[#FAF7F2] transition cursor-pointer"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
            Delete Trip Type
          </h3>
          <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] mt-2 leading-relaxed">
            Are you sure you want to remove &quot;{item.name}&quot; (ID #{item.id})? This action cannot be undone and will delete the classification from the catalog.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold uppercase tracking-wider text-[#013E51] hover:bg-[#FAF7F2] transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "Deleting..." : "Delete Permanently"}
          </button>
        </div>
      </div>
    </div>
  );
}
