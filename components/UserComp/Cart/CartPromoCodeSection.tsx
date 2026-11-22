"use client";

import React, { useState } from "react";
import { FiTag, FiCheck, FiX, FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { PromoCodeItem } from "@/models/promoCode";
import { getPromoCodeByCode } from "@/clientApi/promoCodesApi";
import { useLocale } from "@/shared/providers/LocaleProvider";

interface CartPromoCodeSectionProps {
  appliedPromo: PromoCodeItem | null;
  onApplyPromo: (promo: PromoCodeItem | null) => void;
}

export default function CartPromoCodeSection({
  appliedPromo,
  onApplyPromo,
}: CartPromoCodeSectionProps) {
  const { dictionary } = useLocale();
  const t = dictionary.cartPage;
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) return;

    setIsLoading(true);
    try {
      const promo = await getPromoCodeByCode(trimmed);
      if (!promo || promo.isActived === false) {
        toast.error(t?.promoInvalid || "Invalid or expired promo code");
        return;
      }

      onApplyPromo(promo);
      setCode("");
      toast.success(t?.promoApplied || "Promo code applied successfully!");
    } catch {
      toast.error(t?.promoInvalid || "Invalid or expired promo code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = () => {
    onApplyPromo(null);
    setCode("");
  };

  if (appliedPromo) {
    const discountLabel =
      appliedPromo.discountpercent > 0
        ? `-${appliedPromo.discountpercent}%`
        : `-${appliedPromo.discountEuro} €`;

    return (
      <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
        <div className="flex items-center gap-2 text-emerald-800 font-semibold truncate">
          <FiTag className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="truncate">Code: {appliedPromo.code}</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-bold shrink-0">
            {discountLabel}
          </span>
        </div>
        <button
          type="button"
          onClick={handleRemove}
          className="text-emerald-700 hover:text-red-600 p-1 transition-colors cursor-pointer shrink-0"
          title={t?.remove || "Remove"}
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleApply} className="space-y-1.5">
      <label className="block text-xs font-bold text-[#013E51]">
        <span className="flex items-center gap-1.5">
          <FiTag className="text-[#E8B34A]" />
          {t?.promoCode || "Promo Code"}
        </span>
      </label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={t?.enterPromoCode || "Enter promo code"}
          className="flex-1 px-3.5 py-2 rounded-xl border border-gray-200 bg-[#F8F9FA] text-xs text-slate-800 placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#013E51] focus:border-[#013E51] transition-all"
        />
        <button
          type="submit"
          disabled={!code.trim() || isLoading}
          className="px-4 py-2 rounded-xl bg-[#013E51] hover:bg-[#024f67] disabled:opacity-40 text-white font-bold text-xs transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
        >
          {isLoading ? (
            <FiLoader className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <FiCheck className="w-3.5 h-3.5" />
          )}
          <span>{t?.apply || "Apply"}</span>
        </button>
      </div>
    </form>
  );
}
