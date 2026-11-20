"use client";

import { useState } from "react";
import { FiCheck, FiCompass, FiCopy, FiTag, FiUsers } from "react-icons/fi";
import { PromoCodeItem } from "@/models/promoCode";

interface PromoCodesTableProps {
  items: PromoCodeItem[];
  isLoading: boolean;
}

export default function PromoCodesTable({
  items,
  isLoading,
}: PromoCodesTableProps) {
  const [copiedCode, setCopiedCode] = useState<number | null>(null);

  const handleCopy = (code: number) => {
    navigator.clipboard.writeText(String(code));
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode((prev) => (prev === code ? null : prev));
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-[24px] p-8 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-100 rounded-xl w-full" />
          <div className="h-14 bg-gray-50 rounded-xl w-full" />
          <div className="h-14 bg-gray-50 rounded-xl w-full" />
          <div className="h-14 bg-gray-50 rounded-xl w-full" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-[24px] p-12 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center mx-auto mb-3">
          <FiTag className="w-6 h-6 text-[#013E51]" />
        </div>
        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
          No Promo Codes Found
        </h3>
        <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] max-w-sm mx-auto mt-1">
          No vouchers match your current filter. Click &quot;New Promo Code&quot; to generate a campaign coupon.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[24px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#013E51]/10 bg-[#FAF7F2]/60 text-[11px] font-bold uppercase tracking-wider text-[#013E51]/60 font-[family-name:var(--font-lato)]">
              <th className="py-4 px-5 sm:px-6">Voucher Code</th>
              <th className="py-4 px-5 sm:px-6">Discount</th>
              <th className="py-4 px-5 sm:px-6">Applied Scope</th>
              <th className="py-4 px-5 sm:px-6">Redemption Limit</th>
              <th className="py-4 px-5 sm:px-6">Created Info</th>
              <th className="py-4 px-5 sm:px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#013E51]/6 text-xs sm:text-sm font-[family-name:var(--font-lato)]">
            {items.map((item) => {
              const isCopied = copiedCode === item.code;
              const isPercent = Number(item.discountpercent || 0) > 0;
              const isTripSpecific = Number(item.tripId || 0) > 0;

              return (
                <tr
                  key={item.id}
                  className="hover:bg-[#FAF7F2]/40 transition-colors"
                >
                  <td className="py-4 px-5 sm:px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm sm:text-base font-extrabold text-[#013E51] tracking-wider bg-[#FAF7F2] px-3 py-1 rounded-xl border border-[#013E51]/10">
                        {item.code}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-5 sm:px-6">
                    {isPercent ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-extrabold">
                        {item.discountpercent}% OFF
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 text-xs font-extrabold font-mono">
                        &euro;{Number(item.discountEuro || 0).toLocaleString()} OFF
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-5 sm:px-6">
                    {isTripSpecific ? (
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 font-bold text-[#013E51]">
                          <FiCompass className="w-3.5 h-3.5 text-[#E8B34A] shrink-0" />
                          <span className="truncate max-w-[220px]">
                            {item.tripName || `Trip #${item.tripId}`}
                          </span>
                        </div>
                        {item.tripType && (
                          <span className="inline-block text-[10px] text-gray-500 font-medium">
                            Type: {item.tripType}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#013E51]/5 text-[#013E51] border border-[#013E51]/10">
                        General Voucher (All Trips)
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-5 sm:px-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#013E51]/5 text-[#013E51] border border-[#013E51]/10">
                      <FiUsers className="w-3.5 h-3.5 text-[#E8B34A]" />
                      <span>{item.limited} Redemptions</span>
                    </span>
                  </td>

                  <td className="py-4 px-5 sm:px-6">
                    <div className="text-xs text-gray-600">
                      <span className="block font-semibold text-[#013E51]">
                        {item.createdBy || "System"}
                      </span>
                      {item.createdAt && (
                        <span className="text-[10px] text-gray-400">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-5 sm:px-6 text-right">
                    <button
                      type="button"
                      onClick={() => handleCopy(item.code)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-[#FAF7F2] text-xs font-bold text-[#013E51] transition cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <FiCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <FiCopy className="w-3.5 h-3.5 text-gray-400" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
