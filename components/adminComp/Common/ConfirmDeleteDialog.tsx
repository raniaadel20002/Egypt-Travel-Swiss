"use client";

import { FiAlertTriangle, FiLoader, FiX } from "react-icons/fi";

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isPending?: boolean;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
}

export default function ConfirmDeleteDialog({
  isOpen,
  title = "Confirm Deletion",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  isPending = false,
  onConfirm,
  onClose,
}: ConfirmDeleteDialogProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#013E51]/40 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isPending) {
          onClose();
        }
      }}
    >
      <div className="relative bg-white rounded-[24px] sm:rounded-[28px] shadow-2xl w-full max-w-md p-6 sm:p-7 border border-[#013E51]/10 text-center flex flex-col items-center">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isPending}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-1.5 rounded-xl text-[#013E51]/60 hover:text-[#013E51] hover:bg-gray-100 cursor-pointer transition disabled:opacity-50"
        >
          <FiX className="w-4 h-4" />
        </button>

        {/* Warning Icon Badge */}
        <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-3.5">
          <FiAlertTriangle className="w-6 h-6" />
        </div>

        {/* Heading & Description */}
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-[26px] font-bold text-[#013E51] leading-tight">
          {title}
        </h3>
        <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] mt-2 mb-6 max-w-sm leading-relaxed">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 w-full">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-[#013E51] border border-[#013E51]/15 hover:bg-gray-100 transition cursor-pointer disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white transition cursor-pointer disabled:opacity-60 shadow-xs"
          >
            {isPending && <FiLoader className="w-3.5 h-3.5 animate-spin" />}
            <span>{isPending ? "Deleting..." : confirmLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
