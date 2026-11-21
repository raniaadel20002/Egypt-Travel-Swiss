"use client";

import { useState } from "react";
import { FiCheck, FiCopy, FiTag, FiX } from "react-icons/fi";
import { useModalDismiss } from "@/shared/utils/useModalDismiss";

interface PromoCodeSuccessModalProps {
  isOpen: boolean;
  code: number | null;
  onClose: () => void;
}

export default function PromoCodeSuccessModal({
  isOpen,
  code,
  onClose,
}: PromoCodeSuccessModalProps) {
  useModalDismiss({ isOpen, onClose });

  const [copied, setCopied] = useState(false);

  if (!isOpen || !code) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(String(code));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#013E51]/50 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#013E51]/10 text-center animate-in zoom-in-95 duration-150">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-[#013E51] hover:bg-gray-100 transition cursor-pointer"
        >
          <FiX className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
          <FiTag className="w-6 h-6" />
        </div>

        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
          Promo Code Generated
        </h3>
        <p className="font-[family-name:var(--font-lato)] text-xs text-[#888888] mt-1 max-w-xs mx-auto">
          The voucher is now active in the system. Share this code with travelers or campaign managers.
        </p>

        <div className="my-6 p-4 rounded-2xl bg-[#FAF7F2] border border-[#013E51]/10">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-[#013E51]/60 mb-1">
            Voucher Code
          </span>
          <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[#013E51] tracking-widest">
            {code}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#013E51] hover:bg-[#025670] text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-sm"
          >
            {copied ? (
              <>
                <FiCheck className="w-4 h-4 text-[#E8B34A]" />
                <span>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <FiCopy className="w-4 h-4 text-[#E8B34A]" />
                <span>Copy Voucher Code</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-600 hover:bg-gray-50 transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
