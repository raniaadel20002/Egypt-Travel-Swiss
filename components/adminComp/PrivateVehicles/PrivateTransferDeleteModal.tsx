"use client";

import { FiAlertTriangle, FiLoader, FiTrash2, FiX } from "react-icons/fi";
import { useModalDismiss } from "@/shared/utils/useModalDismiss";
import { PrivateVehicleTransferApiItem } from "@/models/privateVehicle";

interface PrivateTransferDeleteModalProps {
  isOpen: boolean;
  item: PrivateVehicleTransferApiItem | null;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function PrivateTransferDeleteModal({
  isOpen,
  item,
  isLoading,
  onClose,
  onConfirm,
}: PrivateTransferDeleteModalProps) {
  useModalDismiss({ isOpen, onClose, disabled: isLoading });

  if (!isOpen || !item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#013E51]/50 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-red-100 text-center animate-in zoom-in-95 duration-150">
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-[#013E51] hover:bg-gray-100 transition cursor-pointer"
        >
          <FiX className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 border border-red-100 flex items-center justify-center mx-auto mb-4">
          <FiAlertTriangle className="w-6 h-6" />
        </div>

        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
          Remove Transfer Rate
        </h3>
        <p className="font-[family-name:var(--font-lato)] text-xs text-gray-500 mt-1.5 leading-relaxed">
          Are you sure you want to remove the rate of{" "}
          <strong className="text-emerald-700 font-bold">
            &euro;{item.price}
          </strong>{" "}
          for{" "}
          <strong className="text-[#013E51] font-bold">
            {item.vehicleName} ({item.from} - {item.to} persons)
          </strong>{" "}
          on trip &quot;{item.tripName || `#${item.tripId}`}&quot;?
        </p>

        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-600 hover:bg-gray-50 transition cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer disabled:opacity-50 shadow-sm"
          >
            {isLoading ? (
              <FiLoader className="w-4 h-4 animate-spin" />
            ) : (
              <FiTrash2 className="w-4 h-4" />
            )}
            <span>Delete Rate</span>
          </button>
        </div>
      </div>
    </div>
  );
}
