"use client";

import { useBookingPaymentsQuery, useDivingBookingPaymentsQuery } from "@/features/payments/usePayments";

interface AdminBookingPaidCellProps {
  bookingType: "trip" | "diving";
  bookingId: number | string;
  totalPrice: number;
  initialPaid?: number;
}

export default function AdminBookingPaidCell({
  bookingType,
  bookingId,
  totalPrice,
  initialPaid,
}: AdminBookingPaidCellProps) {
  const numericTripId =
    bookingType === "trip" && typeof bookingId === "number"
      ? bookingId
      : bookingType === "trip"
      ? Number(bookingId) || null
      : null;

  const stringDivingId =
    bookingType === "diving" ? String(bookingId || "") : null;

  const tripPaymentsQuery = useBookingPaymentsQuery(
    numericTripId,
    Boolean(numericTripId && numericTripId > 0)
  );

  const divingPaymentsQuery = useDivingBookingPaymentsQuery(
    stringDivingId,
    Boolean(stringDivingId && stringDivingId.length > 0)
  );

  const isLoading =
    bookingType === "trip"
      ? tripPaymentsQuery.isLoading
      : divingPaymentsQuery.isLoading;

  const payments =
    bookingType === "trip"
      ? tripPaymentsQuery.data || []
      : divingPaymentsQuery.data || [];

  if (isLoading) {
    return (
      <div className="h-4 w-14 bg-gray-100 rounded-md animate-pulse" />
    );
  }

  const hasPaidOnline = payments.some((p) =>
    ["completed", "paid", "captured"].includes((p.status || "").toLowerCase())
  );

  const depositTarget = (totalPrice || 0) * 0.5;

  const effectivePaid = hasPaidOnline
    ? depositTarget
    : initialPaid && initialPaid > 0
    ? initialPaid < totalPrice
      ? initialPaid
      : depositTarget
    : 0;

  if (effectivePaid > 0) {
    return (
      <div>
        <span className="font-extrabold text-emerald-700 text-xs sm:text-sm block whitespace-nowrap">
          &euro;{effectivePaid.toFixed(2)}
        </span>
        <span className="text-[10px] text-gray-400 block font-semibold uppercase tracking-wider">
          50% Deposit
        </span>
      </div>
    );
  }

  return (
    <div>
      <span className="font-bold text-gray-400 text-xs sm:text-sm block whitespace-nowrap">
        &euro;0.00
      </span>
      <span className="text-[10px] text-amber-600 block font-semibold uppercase tracking-wider">
        Unpaid
      </span>
    </div>
  );
}
