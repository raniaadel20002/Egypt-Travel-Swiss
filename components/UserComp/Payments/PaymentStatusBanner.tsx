"use client";

import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

interface PaymentStatusBannerProps {
  message: string;
  variant?: "error" | "warning";
  onRetry?: () => void;
  retryLabel?: string;
  isRetrying?: boolean;
}

export default function PaymentStatusBanner({
  message,
  variant = "error",
  onRetry,
  retryLabel = "Refresh Payment Session",
  isRetrying = false,
}: PaymentStatusBannerProps) {
  const styles =
    variant === "warning"
      ? "bg-amber-50 border-amber-300 text-amber-900"
      : "bg-red-50 border-red-200 text-red-900";

  const iconColor = variant === "warning" ? "text-amber-700" : "text-red-600";

  return (
    <div
      role="alert"
      className={`p-4 rounded-2xl border text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-[family-name:var(--font-lato)] ${styles}`}
    >
      <div className="flex items-start gap-2.5">
        <FiAlertCircle className={`w-4 h-4 shrink-0 mt-0.5 ${iconColor}`} />
        <p className="leading-relaxed font-medium">{message}</p>
      </div>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          disabled={isRetrying}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-current/20 font-bold text-xs shrink-0 hover:bg-white/80 transition cursor-pointer disabled:opacity-50"
        >
          <FiRefreshCw className={`w-3.5 h-3.5 ${isRetrying ? "animate-spin" : ""}`} />
          <span>{retryLabel}</span>
        </button>
      )}
    </div>
  );
}
