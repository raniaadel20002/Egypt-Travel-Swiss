"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useLocale } from "@/shared/providers/LocaleProvider";
import {
  useCapturePayPalPaymentMutation,
  useInitializePayPalPaymentMutation,
  usePaymentDetailQuery,
} from "./usePayments";
import {
  loadPendingPaymentSession,
  savePendingPaymentSession,
  clearPendingPaymentSession,
} from "./paymentSessionStorage";
import {
  CapturePayPalPaymentPayload,
  OnlinePaymentBookingType,
  PendingPaymentSession,
} from "@/models/payment";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

function isCompletedPaymentStatus(status?: string | null): boolean {
  if (!status) return false;
  const normalized = status.toLowerCase();
  return normalized === "completed" || normalized === "paid" || normalized === "captured";
}

function isFailedPaymentStatus(status?: string | null): boolean {
  if (!status) return false;
  const normalized = status.toLowerCase();
  return normalized === "failed" || normalized === "cancelled" || normalized === "voided";
}

export function usePaypalCheckout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale } = useLocale();

  const [session, setSession] = useState<PendingPaymentSession | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const initializeMutation = useInitializePayPalPaymentMutation();
  const captureMutation = useCapturePayPalPaymentMutation();

  const queryPaymentId = Number(searchParams.get("paymentId") || 0) || null;
  const queryType = (searchParams.get("type") || "") as OnlinePaymentBookingType;

  useEffect(() => {
    const stored = loadPendingPaymentSession();
    if (stored) {
      setSession(stored);
    }
    setHydrated(true);
  }, []);

  const numericPaymentId =
    session?.paymentId && session.paymentId > 0
      ? session.paymentId
      : queryPaymentId;

  const { data: livePaymentDetail } = usePaymentDetailQuery(
    numericPaymentId,
    hydrated && Boolean(numericPaymentId)
  );

  const navigateToSuccess = useCallback(
    (captureId?: string, paidAmount?: number, paidCurrency?: string) => {
      const baseParams = new URLSearchParams(session?.successParams || {});
      baseParams.set("type", session?.bookingType || queryType || "trip");
      baseParams.set("paymentStatus", "Paid");
      if (captureId) baseParams.set("captureId", captureId);
      if (session?.bookingReference) {
        baseParams.set("bookingRef", session.bookingReference);
      }
      if (typeof paidAmount === "number" && paidAmount > 0) {
        baseParams.set("paidAmount", paidAmount.toFixed(2));
      }
      if (paidCurrency) {
        baseParams.set("paidCurrency", paidCurrency);
      }
      if (session?.bookingType === "diving") {
        baseParams.set("divingPaymentStatus", "Paid");
        baseParams.set("divingStatus", "Confirmed");
      }
      clearPendingPaymentSession();
      router.replace(`/${locale}/booking-success?${baseParams.toString()}`);
    },
    [locale, queryType, router, session]
  );

  useEffect(() => {
    if (!livePaymentDetail || !session) return;
    if (isCompletedPaymentStatus(livePaymentDetail.status)) {
      navigateToSuccess(
        livePaymentDetail.payPalCaptureId || undefined,
        livePaymentDetail.amount,
        livePaymentDetail.currency
      );
    } else if (isFailedPaymentStatus(livePaymentDetail.status) && livePaymentDetail.failureReason) {
      setErrorMessage(livePaymentDetail.failureReason);
    }
  }, [livePaymentDetail, session, navigateToSuccess]);

  const handleRetryInitialize = useCallback(async () => {
    if (!session) return;
    setErrorMessage(null);
    try {
      const payload =
        session.bookingType === "diving"
          ? { divingCourseBookingId: String(session.bookingId) }
          : { bookingId: Number(session.bookingId) };
      const initialized = await initializeMutation.mutateAsync(payload);
      const updated: PendingPaymentSession = {
        ...session,
        payPalOrderId: initialized.payPalOrderId,
        amount: initialized.amount ?? session.amount,
        currency: initialized.currency || session.currency,
        bookingReference: initialized.bookingReference || session.bookingReference,
        paymentId:
          session.bookingType === "trip" && typeof initialized.paymentId === "number"
            ? initialized.paymentId
            : session.paymentId,
        divingCoursePaymentId:
          session.bookingType === "diving"
            ? String(initialized.divingCoursePaymentId || initialized.paymentId)
            : session.divingCoursePaymentId,
      };
      savePendingPaymentSession(updated);
      setSession(updated);
      toast.info("Payment session refreshed. Please enter your card details.");
    } catch (err) {
      const msg = extractErrorMessage(err, "Unable to re-initialize payment.");
      setErrorMessage(msg);
      toast.error(msg);
    }
  }, [initializeMutation, session]);

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

      const payload: CapturePayPalPaymentPayload = {
        payPalOrderId: data.orderID || session.payPalOrderId,
        ...(session.bookingType === "diving"
          ? {
              divingCoursePaymentId:
                session.divingCoursePaymentId || String(session.paymentId || ""),
            }
          : { paymentId: Number(session.paymentId) }),
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
    hydrated,
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
