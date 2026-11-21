"use client";

import { useState } from "react";
import { FiCheck, FiLoader, FiPercent, FiTag, FiX } from "react-icons/fi";
import { toast } from "sonner";
import { useModalDismiss } from "@/shared/utils/useModalDismiss";
import { useCreatePromoCodeMutation } from "@/features/promoCodes/usePromoCodes";
import { CreatePromoCodePayload } from "@/models/promoCode";
import PromoCodeTripSelector from "./PromoCodeTripSelector";

interface PromoCodeFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (code: number) => void;
}

type DiscountMode = "percent" | "euro";
type ScopeMode = "general" | "trip";

export default function PromoCodeFormDrawer({
  isOpen,
  onClose,
  onCreated,
}: PromoCodeFormDrawerProps) {
  const [discountMode, setDiscountMode] = useState<DiscountMode>("percent");
  const [discountValue, setDiscountValue] = useState<string>("");
  const [limited, setLimited] = useState<number>(20);
  const [scopeMode, setScopeMode] = useState<ScopeMode>("general");
  const [selectedTripId, setSelectedTripId] = useState<number | null>(null);

  const createMutation = useCreatePromoCodeMutation();
  const isSubmitting = createMutation.isPending;

  useModalDismiss({ isOpen, onClose, disabled: isSubmitting });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const numValue = parseFloat(discountValue);
    if (!numValue || numValue <= 0) {
      toast.error("Please enter a valid discount value");
      return;
    }

    if (discountMode === "percent" && numValue > 100) {
      toast.error("Percentage discount cannot exceed 100%");
      return;
    }

    if (!limited || limited < 1) {
      toast.error("Please enter a valid redemption limit (at least 1)");
      return;
    }

    if (scopeMode === "trip" && !selectedTripId) {
      toast.error("Please select a specific trip or switch to General");
      return;
    }

    const payload: CreatePromoCodePayload = {
      discountpercent: discountMode === "percent" ? numValue : null,
      discountEuro: discountMode === "euro" ? numValue : null,
      limited,
      tripId: scopeMode === "trip" ? selectedTripId : null,
    };

    try {
      const result = await createMutation.mutateAsync(payload);
      onCreated(result.code);
      onClose();
      // Reset form
      setDiscountValue("");
      setLimited(20);
      setSelectedTripId(null);
    } catch {
      // Error handled by mutation onError
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-[#013E51]/40 backdrop-blur-xs transition-opacity"
    >
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#013E51]/10 flex items-center justify-center text-[#013E51]">
              <FiTag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#013E51]">
                Generate Promo Code
              </h2>
              <p className="text-xs text-[#888888]">
                Backend automatically assigns a 6-digit numeric coupon code.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close drawer"
            className="p-2 rounded-xl text-gray-400 hover:text-[#013E51] hover:bg-gray-100 transition cursor-pointer"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* Discount Mode Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#013E51] block">
                Discount Type *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDiscountMode("percent")}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                    discountMode === "percent"
                      ? "bg-[#013E51] text-[#E8B34A] border-[#013E51] shadow-xs"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-[#FAF7F2]"
                  }`}
                >
                  <FiPercent className="w-4 h-4" />
                  <span>Percentage (%)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDiscountMode("euro")}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                    discountMode === "euro"
                      ? "bg-[#013E51] text-[#E8B34A] border-[#013E51] shadow-xs"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-[#FAF7F2]"
                  }`}
                >
                  <span className="font-mono text-sm">&euro;</span>
                  <span>Fixed Euro (EUR)</span>
                </button>
              </div>
            </div>

            {/* Discount Value */}
            <div>
              <label className="text-xs font-bold text-[#013E51] block mb-1">
                {discountMode === "percent"
                  ? "Discount Percentage (%) *"
                  : "Discount Amount (EUR / €) *"}
              </label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                max={discountMode === "percent" ? "100" : undefined}
                required
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                placeholder={discountMode === "percent" ? "e.g. 20" : "e.g. 15"}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 bg-white font-semibold focus:outline-hidden focus:border-[#013E51]"
              />
            </div>

            {/* Redemption Limit */}
            <div>
              <label className="text-xs font-bold text-[#013E51] block mb-1">
                Redemption Limit (Usage Count) *
              </label>
              <input
                type="number"
                min="1"
                required
                value={limited}
                onChange={(e) => setLimited(parseInt(e.target.value) || 1)}
                placeholder="e.g. 20"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 bg-white font-semibold focus:outline-hidden focus:border-[#013E51]"
              />
              <span className="block text-[11px] text-gray-400 mt-1">
                The voucher will expire once redeemed this many times.
              </span>
            </div>

            {/* Scope Selection */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="text-xs font-bold uppercase tracking-wider text-[#013E51] block">
                Target Excursion Scope *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setScopeMode("general");
                    setSelectedTripId(null);
                  }}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                    scopeMode === "general"
                      ? "bg-[#013E51] text-[#E8B34A] border-[#013E51]"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-[#FAF7F2]"
                  }`}
                >
                  General (All Trips)
                </button>
                <button
                  type="button"
                  onClick={() => setScopeMode("trip")}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                    scopeMode === "trip"
                      ? "bg-[#013E51] text-[#E8B34A] border-[#013E51]"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-[#FAF7F2]"
                  }`}
                >
                  Specific Trip
                </button>
              </div>

              {scopeMode === "trip" && (
                <PromoCodeTripSelector
                  selectedTripId={selectedTripId}
                  onSelectTrip={setSelectedTripId}
                />
              )}
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 bg-[#FAF7F2] flex items-center justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-xs font-bold text-gray-600 hover:bg-gray-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#013E51] text-white text-xs font-bold hover:bg-[#013E51]/90 transition cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <FiLoader className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <FiCheck className="w-3.5 h-3.5 text-[#E8B34A]" />
              )}
              <span>Generate Code</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
