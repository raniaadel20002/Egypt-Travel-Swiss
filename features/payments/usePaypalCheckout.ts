"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useLocale } from "@/shared/providers/LocaleProvider";
import {
  useCapturePayPalPaymentMutation,
  useInitializePayPalPaymentMutation,
  usePaymentDetailQuery,
} from "./usePayments";
import { usePaymentStore } from "./usePaymentStore";
import {
  initializeOrRecoverTripPayment,
  initializeOrRecoverDivingPayment,
} from "./paymentInitHelper";
import {
  CapturePayPalPaymentPayload,
  OnlinePaymentBookingType,
  PaymentCaptureCategory,
  PendingPaymentSession,
} from "@/models/payment";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

function isCompletedPaymentStatus(status?: string | null): boolean {
  if (!status) return false;
  const n = status.toLowerCase();
  return n === "completed" || n === "paid" || n === "captured";
}

function isFailedPaymentStatus(status?: string | null): boolean {
  if (!status) return false;
  const n = status.toLowerCase();
  return n === "failed" || n === "cancelled" || n === "voided";
}

export function usePaypalCheckout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale } = useLocale();

  const rawSession = usePaymentStore((s) => s.session);
  const sessionsByBookingId = usePaymentStore((s) => s.sessionsByBookingId);
  const hasHydrated = usePaymentStore((s) => s.hasHydrated);
  const setStoreSession = usePaymentStore((s) => s.setSession);
  const clearStoreSession = usePaymentStore((s) => s.clearSession);

  const [isPaying, setIsPaying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const initializeMutation = useInitializePayPalPaymentMutation();
  const captureMutation = useCapturePayPalPaymentMutation();

  const queryType = (searchParams.get("type") || "") as OnlinePaymentBookingType;
  const queryBookingId = searchParams.get("bookingId") || searchParams.get("id") || "";

  const effectiveRawSession = useMemo(() => {
    if (queryBookingId && sessionsByBookingId[queryBookingId]) {
      return sessionsByBookingId[queryBookingId];
    }
    return rawSession;
  }, [queryBookingId, rawSession, sessionsByBookingId]);

  const session = useMemo<PendingPaymentSession | null>(() => {
    if (!effectiveRawSession || !effectiveRawSession.payPalOrderId) return null;
    if (queryType && effectiveRawSession.bookingType !== queryType) return null;

    const fullTotal = effectiveRawSession.fullTotalAmount && effectiveRawSession.fullTotalAmount > 0 ? effectiveRawSession.fullTotalAmount : Number(effectiveRawSession.amount || 0);
    const depositAmount = effectiveRawSession.fullTotalAmount && effectiveRawSession.amount < effectiveRawSession.fullTotalAmount ? Number(effectiveRawSession.amount || 0) : fullTotal * 0.5;
    const remainingOnArrival = effectiveRawSession.remainingOnArrival !== undefined && effectiveRawSession.remainingOnArrival > 0 ? effectiveRawSession.remainingOnArrival : Math.max(0, fullTotal - depositAmount);

    const numericId =
      effectiveRawSession.paymentId && Number(effectiveRawSession.paymentId) > 0
        ? Number(effectiveRawSession.paymentId)
        : undefined;

    return {
      ...effectiveRawSession,
      paymentId: numericId,
      amount: depositAmount,
      fullTotalAmount: fullTotal,
      depositPercentage: 50,
      remainingOnArrival,
    };
  }, [effectiveRawSession, queryType]);

  // GET /api/Payments/{id} only queries Trip payments; never call it for diving courses.
  const tripPaymentId =
    session?.bookingType === "trip" && session.paymentId && session.paymentId > 0
      ? session.paymentId
      : null;

  const { data: livePaymentDetail } = usePaymentDetailQuery(
    tripPaymentId,
    hasHydrated && Boolean(tripPaymentId)
  );

  const matchesCurrentOrder = Boolean(
    livePaymentDetail &&
      session?.bookingType === "trip" &&
      livePaymentDetail.payPalOrderId === session.payPalOrderId
  );

  const isAlreadyPaid = Boolean(
    matchesCurrentOrder && isCompletedPaymentStatus(livePaymentDetail?.status)
  );

  useEffect(() => {
    if (!matchesCurrentOrder || !livePaymentDetail) return;
    if (isFailedPaymentStatus(livePaymentDetail.status) && livePaymentDetail.failureReason) {
      setErrorMessage(livePaymentDetail.failureReason);
    }
  }, [matchesCurrentOrder, livePaymentDetail]);

  const navigateToSuccess = useCallback(
    (captureId?: string, _paidAmount?: number, paidCurrency?: string) => {
      const baseParams = new URLSearchParams(session?.successParams || {});
      baseParams.set("type", session?.bookingType || queryType || "trip");
      baseParams.set("paymentStatus", "Paid");
      if (captureId) baseParams.set("captureId", captureId);
      if (session?.bookingReference) {
        baseParams.set("bookingRef", session.bookingReference);
      }

      const fullTotal = session?.fullTotalAmount && session.fullTotalAmount > 0 ? session.fullTotalAmount : Number(session?.amount || 0);
      const depositDue = session?.fullTotalAmount && session.amount < session.fullTotalAmount ? Number(session.amount || 0) : fullTotal * 0.5;
      const remainingAmount = Math.max(0, fullTotal - depositDue);

      baseParams.set("paidAmount", depositDue.toFixed(2));
      baseParams.set("depositPaid", depositDue.toFixed(2));
      baseParams.set("fullTotal", fullTotal.toFixed(2));
      baseParams.set("total", fullTotal.toFixed(2));
      baseParams.set("remainingAmount", remainingAmount.toFixed(2));

      if (paidCurrency) baseParams.set("paidCurrency", paidCurrency);
      if (session?.bookingType === "diving") {
        baseParams.set("divingPaymentStatus", "Paid");
        baseParams.set("divingStatus", "Confirmed");
        baseParams.set("divingTotal", fullTotal.toFixed(2));
        baseParams.set("divingDeposit", depositDue.toFixed(2));
        baseParams.set("divingRemaining", remainingAmount.toFixed(2));
      }
      clearStoreSession();
      router.replace(`/${locale}/booking-success?${baseParams.toString()}`);
    },
    [clearStoreSession, locale, queryType, router, session]
  );

  const handleRetryInitialize = useCallback(async () => {
    if (!session) return;
    setErrorMessage(null);
    try {
      const fullTotal = session.fullTotalAmount || session.amount;
      const depositAmount = fullTotal * 0.5;
      const remainingOnArrival = fullTotal - depositAmount;

      const recovered =
        session.bookingType === "diving"
          ? await initializeOrRecoverDivingPayment(
              String(session.bookingId),
              depositAmount,
              (p) => initializeMutation.mutateAsync(p)
            )
          : await initializeOrRecoverTripPayment(
              Number(session.bookingId),
              depositAmount,
              (p) => initializeMutation.mutateAsync(p)
            );

      const updated: PendingPaymentSession = {
        ...session,
        payPalOrderId: recovered.payPalOrderId,
        amount: depositAmount,
        fullTotalAmount: fullTotal,
        depositPercentage: 50,
        remainingOnArrival,
        currency: recovered.currency || session.currency,
        bookingReference: recovered.bookingReference || session.bookingReference,
        paymentId: recovered.paymentId ?? session.paymentId,
      };
      setStoreSession(updated);
      toast.info("Payment session refreshed. Please enter your card details.");
    } catch (err) {
      const msg = extractErrorMessage(err, "Unable to re-initialize payment.");
      setErrorMessage(msg);
      toast.error(msg);
    }
  }, [initializeMutation, session, setStoreSession]);

  const createOrder = useCallback(async (): Promise<string> => {
    if (!session?.payPalOrderId) {
      throw new Error("Missing PayPal order ID.");
    }
    setErrorMessage(null);
    return session.payPalOrderId;
  }, [session]);

  const handleApprove = useCallback(
    async (data: { orderID: string }) => {
      if (!session) return;
      setIsPaying(true);
      setErrorMessage(null);

      const category =
        session.bookingType === "diving"
          ? PaymentCaptureCategory.DivingCourse
          : PaymentCaptureCategory.Trip;

      const numPaymentId = Number(session.paymentId);
      if (!Number.isFinite(numPaymentId) || numPaymentId <= 0) {
        const msg = "Invalid payment identifier. Please refresh the payment session.";
        setErrorMessage(msg);
        toast.error(msg);
        setIsPaying(false);
        return;
      }

      const payload: CapturePayPalPaymentPayload = {
        category,
        paymentId: numPaymentId,
        payPalOrderId: session.payPalOrderId || data.orderID,
      };

      try {
        const result = await captureMutation.mutateAsync(payload);
        if (result?.bookingConfirmed || isCompletedPaymentStatus(result?.status)) {
          toast.success("Payment confirmed! Redirecting to your voucher...");
          navigateToSuccess(result.payPalCaptureId, result.amount, result.currency);
          return;
        }
        const reason =
          result?.failureReason ||
          "Your payment could not be completed. Please check your card or try another card.";
        setErrorMessage(reason);
        toast.error(reason);
      } catch (err) {
        const msg = extractErrorMessage(
          err,
          "Payment capture failed. Please try again or use a different card."
        );
        setErrorMessage(msg);
        toast.error(msg);
      } finally {
        setIsPaying(false);
      }
    },
    [captureMutation, navigateToSuccess, session]
  );

  const handleCardError = useCallback((err: Record<string, unknown>) => {
    setIsPaying(false);
    const rawMsg =
      typeof err?.message === "string" && err.message.trim().length > 0
        ? err.message
        : "Card verification failed. Please review your card details and try again.";
    setErrorMessage(rawMsg);
    toast.error(rawMsg);
  }, []);

  return {
    session,
    hydrated: hasHydrated,
    isAlreadyPaid,
    livePaymentDetail: matchesCurrentOrder ? livePaymentDetail : undefined,
    navigateToSuccess,
    isPaying: isPaying || captureMutation.isPending,
    isReinitializing: initializeMutation.isPending,
    errorMessage,
    setIsPaying,
    setErrorMessage,
    createOrder,
    handleApprove,
    handleCardError,
    handleRetryInitialize,
  };
}
