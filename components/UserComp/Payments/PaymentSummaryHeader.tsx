"use client";

import { FiShield, FiTag, FiUser } from "react-icons/fi";
import { PendingPaymentSession } from "@/models/payment";

interface PaymentSummaryHeaderProps {
  session: PendingPaymentSession;
  labels: {
    orderSummary: string;
    bookingTypeTrip: string;
    bookingTypeDiving: string;
    reference: string;
    guest: string;
    amountDue: string;
    verifiedByServer: string;
  };
}

export default function PaymentSummaryHeader({
  session,
  labels,
}: PaymentSummaryHeaderProps) {
  const currency = (session.currency || "EUR").toUpperCase();
  const symbol =
    currency === "EUR" ? "\u20AC" : currency === "USD" ? "$" : currency === "GBP" ? "\u00A3" : `${currency} `;

  return (
    <div className="bg-[#013E51] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-lg border border-[#E8B34A]/20 space-y-5 font-[family-name:var(--font-lato)]">
      <div className="pb-4 border-b border-white/10">
        <span className="inline-block px-2.5 py-1 rounded-full bg-[#E8B34A]/20 text-[#E8B34A] text-[11px] font-bold uppercase tracking-wider mb-2">
          {session.bookingType === "diving"
            ? labels.bookingTypeDiving
            : labels.bookingTypeTrip}
        </span>
        <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-white leading-snug">
          {session.title}
        </h2>
      </div>

      <div className="space-y-3 text-xs sm:text-sm">
        {session.customerName && (
          <div className="flex items-center justify-between gap-3">
            <span className="text-white/70 flex items-center gap-1.5">
              <FiUser className="w-3.5 h-3.5 text-[#E8B34A]" />
              {labels.guest}
            </span>
            <span className="font-semibold text-white truncate">
              {session.customerName}
            </span>
          </div>
        )}

        {(session.bookingReference || session.bookingId) && (
          <div className="flex items-center justify-between gap-3">
            <span className="text-white/70 flex items-center gap-1.5">
              <FiTag className="w-3.5 h-3.5 text-[#E8B34A]" />
              {labels.reference}
            </span>
            <span className="font-mono text-xs font-semibold text-white/95">
              {session.bookingReference || `#${session.bookingId}`}
            </span>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-white/15 flex items-baseline justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-white/80">
          {labels.amountDue}
        </span>
        <div className="text-right">
          <span className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-bold text-[#E8B34A]">
            {symbol}
            {Number(session.amount || 0).toFixed(2)}
          </span>
          <span className="block text-[11px] text-white/60 mt-0.5">
            {currency}
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] text-white/75">
        <FiShield className="w-4 h-4 text-[#E8B34A] shrink-0" />
        <span>{labels.verifiedByServer}</span>
      </div>
    </div>
  );
}
