"use client";

import { useState } from "react";
import {
  FiCreditCard,
  FiRefreshCw,
  FiAlertCircle,
  FiClock,
  FiCopy,
  FiCheck,
  FiShield,
} from "react-icons/fi";
import { FaPaypal } from "react-icons/fa";
import { PaymentDetailData } from "@/models/payment";

interface AdminBookingPaymentsSectionProps {
  bookingType: "trip" | "diving";
  bookingId: number | string;
  totalPrice: number;
  currency?: string;
  depositPercentage?: number;
  depositAmount?: number;
  paidAmount?: number;
  remainingAmount?: number;
  paymentStatus?: string;
  payments: PaymentDetailData[];
  isLoading?: boolean;
  onRefresh?: () => void;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!text || copied) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title="Copy to clipboard"
      className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-[#013E51] transition cursor-pointer"
    >
      {copied ? (
        <>
          <FiCheck className="w-3 h-3 text-emerald-600" />
          <span className="text-emerald-600 font-semibold text-[10px]">Copied</span>
        </>
      ) : (
        <FiCopy className="w-3 h-3" />
      )}
    </button>
  );
}

export default function AdminBookingPaymentsSection({
  bookingType,
  bookingId: _bookingId,
  totalPrice,
  currency = "EUR",
  depositPercentage = 50,
  depositAmount,
  paidAmount = 0,
  remainingAmount,
  paymentStatus,
  payments,
  isLoading = false,
  onRefresh,
}: AdminBookingPaymentsSectionProps) {
  const upperCurrency = currency.toUpperCase();
  const symbol =
    upperCurrency === "EUR" ? "\u20AC" : upperCurrency === "USD" ? "$" : `${upperCurrency} `;

  const calcDeposit = depositAmount ?? totalPrice * (depositPercentage / 100);
  const hasSuccessfulPayment = payments.some((p) =>
    ["completed", "paid", "captured"].includes((p.status || "").toLowerCase())
  );
  const effectivePaid = hasSuccessfulPayment ? calcDeposit : Math.min(paidAmount, calcDeposit);
  const effectiveRemaining = remainingAmount ?? Math.max(0, totalPrice - effectivePaid);

  return (
    <div className="space-y-4 font-[family-name:var(--font-lato)]">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#013E51] flex items-center gap-1.5">
          <FiCreditCard className="w-3.5 h-3.5 text-[#E8B34A]" />
          <span>PayPal Online Payments ({bookingType === "diving" ? "Diving Course" : "Trip"})</span>
        </h4>

        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={isLoading}
            title="Refresh payment records"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-[#013E51] transition cursor-pointer disabled:opacity-50"
          >
            <FiRefreshCw className={`w-3 h-3 ${isLoading ? "animate-spin text-[#E8B34A]" : ""}`} />
            <span>Refresh</span>
          </button>
        )}
      </div>

      {/* 50% Deposit & Financial Matrix Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
        <div className="p-3 rounded-2xl bg-gray-50/80 border border-gray-200/80">
          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
            Total Booking
          </span>
          <span className="font-extrabold text-[#013E51] text-sm mt-1 block">
            {symbol}{Number(totalPrice || 0).toFixed(2)}
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8B34A]/30">
          <span className="text-[10px] uppercase font-bold text-[#E8B34A] block tracking-wider">
            Deposit ({depositPercentage}%)
          </span>
          <span className="font-extrabold text-[#013E51] text-sm mt-1 block">
            {symbol}{Number(calcDeposit || 0).toFixed(2)}
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200">
          <span className="text-[10px] uppercase font-bold text-emerald-800 block tracking-wider">
            Paid Online
          </span>
          <span className="font-extrabold text-emerald-700 text-sm mt-1 block">
            {symbol}{Number(effectivePaid || 0).toFixed(2)}
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200">
          <span className="text-[10px] uppercase font-bold text-amber-800 block tracking-wider">
            Due on Arrival
          </span>
          <span className="font-extrabold text-amber-700 text-sm mt-1 block">
            {symbol}{Number(effectiveRemaining || 0).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Payment Transactions List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="font-semibold text-[11px] uppercase tracking-wider text-gray-400">
            Payment History ({payments.length})
          </span>
          {paymentStatus && (
            <span className="text-[10px] font-bold text-[#013E51] bg-[#FAF7F2] px-2.5 py-0.5 rounded-full border border-[#013E51]/10 uppercase tracking-wider">
              Status: {paymentStatus}
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="p-6 text-center text-xs text-gray-400 bg-gray-50 rounded-2xl animate-pulse">
            Loading PayPal payment records...
          </div>
        ) : payments.length === 0 ? (
          <div className="p-5 rounded-2xl bg-gray-50/60 border border-gray-200 text-center text-xs text-gray-500 space-y-1">
            <p className="font-semibold text-gray-700">No online payments recorded yet</p>
            <p className="text-[11px] text-gray-400">
              Online card payments processed via PayPal will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {payments.map((p) => {
              const isCompleted = ["completed", "paid", "captured"].includes(
                (p.status || "").toLowerCase()
              );
              const isFailed = ["failed", "cancelled", "voided"].includes(
                (p.status || "").toLowerCase()
              );
              const displayDeposit =
                p.amount && p.amount < totalPrice ? p.amount : calcDeposit;

              return (
                <div
                  key={p.paymentId}
                  className="p-4 rounded-2xl bg-white border border-gray-200 shadow-2xs space-y-3"
                >
                  {/* Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#003087]/10 text-[#003087] text-[11px] font-bold">
                        <FaPaypal className="w-3 h-3 text-[#0079C1]" />
                        <span>PayPal</span>
                      </span>
                      <span className="font-mono text-xs font-bold text-[#013E51]">
                        Payment #{p.paymentId}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isCompleted
                            ? "bg-emerald-100 text-emerald-800"
                            : isFailed
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {isCompleted ? "50% Deposit Paid" : p.status || "Pending"}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 block font-semibold uppercase tracking-wider">
                        Collected Deposit
                      </span>
                      <span className="font-extrabold text-sm sm:text-base text-[#013E51]">
                        {symbol}{Number(displayDeposit || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Clean 4-Column Metadata Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-gray-50/70 border border-gray-100 space-y-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                        PayPal Capture ID
                      </span>
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono text-xs font-semibold text-[#013E51] break-all">
                          {p.payPalCaptureId || "—"}
                        </span>
                        {p.payPalCaptureId && <CopyButton text={p.payPalCaptureId} />}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-gray-50/70 border border-gray-100 space-y-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                        PayPal Order ID
                      </span>
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono text-xs font-semibold text-[#013E51] break-all">
                          {p.payPalOrderId || "—"}
                        </span>
                        {p.payPalOrderId && <CopyButton text={p.payPalOrderId} />}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-gray-50/70 border border-gray-100 space-y-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                        Transaction Date
                      </span>
                      <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                        <FiClock className="w-3 h-3 text-gray-400 shrink-0" />
                        <span>
                          {p.paidAt
                            ? new Date(p.paidAt).toLocaleString()
                            : p.createdAt
                            ? new Date(p.createdAt).toLocaleString()
                            : "—"}
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-gray-50/70 border border-gray-100 space-y-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                        Payment Method
                      </span>
                      <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                        <FiShield className="w-3 h-3 text-[#E8B34A] shrink-0" />
                        <span>Direct Card via PayPal</span>
                      </div>
                    </div>
                  </div>

                  {/* Failure Reason */}
                  {p.failureReason && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2">
                      <FiAlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">Payment Failed</span>
                        <span className="text-red-700">{p.failureReason}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
