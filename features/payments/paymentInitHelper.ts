"use client";

import {
  InitializePayPalPaymentPayload,
  InitializePayPalPaymentData,
} from "@/models/payment";
import {
  getPaymentsByBookingId,
  getPaymentsByDivingCourseBookingId,
} from "@/clientApi/paymentsApi";
import { usePaymentStore } from "./usePaymentStore";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

const GUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isValidGuid(val?: unknown): val is string {
  return typeof val === "string" && GUID_REGEX.test(val.trim());
}

function isAlreadyExistsError(err: unknown): boolean {
  const msg = (extractErrorMessage(err) || "").toLowerCase();
  return msg.includes("already exists") || msg.includes("active payment attempt");
}

function isPendingStatus(status?: string | null): boolean {
  const normalized = (status || "").toLowerCase();
  return !["completed", "paid", "captured", "failed", "cancelled", "voided"].includes(
    normalized
  );
}

export async function initializeOrRecoverTripPayment(
  bookingId: number,
  depositAmount: number,
  initializeFn: (
    payload: InitializePayPalPaymentPayload
  ) => Promise<InitializePayPalPaymentData>
): Promise<{
  paymentId: number;
  payPalOrderId: string;
  currency?: string;
  bookingReference?: string;
}> {
  try {
    const initialized = await initializeFn({
      bookingId,
    });
    return {
      paymentId: Number(initialized.paymentId),
      payPalOrderId: initialized.payPalOrderId,
      currency: initialized.currency,
      bookingReference: initialized.bookingReference,
    };
  } catch (err: unknown) {
    if (isAlreadyExistsError(err)) {
      const state = usePaymentStore.getState();
      const stored =
        (state.session && String(state.session.bookingId) === String(bookingId)
          ? state.session
          : null) || state.sessionsByBookingId[String(bookingId)];
      if (stored && stored.payPalOrderId && stored.paymentId) {
        return {
          paymentId: Number(stored.paymentId),
          payPalOrderId: stored.payPalOrderId,
          currency: stored.currency,
          bookingReference: stored.bookingReference,
        };
      }

      const existing = await getPaymentsByBookingId(bookingId);
      const active = existing.find((p) => isPendingStatus(p.status));
      if (active && active.payPalOrderId) {
        return {
          paymentId: Number(active.paymentId),
          payPalOrderId: active.payPalOrderId,
          currency: active.currency,
          bookingReference: `#${bookingId}`,
        };
      }
    }
    throw err;
  }
}

export async function initializeOrRecoverDivingPayment(
  divingCourseBookingId: string,
  depositAmount: number,
  initializeFn: (
    payload: InitializePayPalPaymentPayload
  ) => Promise<InitializePayPalPaymentData>
): Promise<{
  paymentId?: number;
  payPalOrderId: string;
  currency?: string;
  bookingReference?: string;
}> {
  try {
    const initialized = await initializeFn({
      divingCourseBookingId,
    });

    const numericId = Number(initialized.paymentId);

    return {
      paymentId: Number.isFinite(numericId) && numericId > 0 ? numericId : undefined,
      payPalOrderId: initialized.payPalOrderId,
      currency: initialized.currency,
      bookingReference: initialized.bookingReference,
    };
  } catch (err: unknown) {
    if (isAlreadyExistsError(err)) {
      const state = usePaymentStore.getState();
      const stored =
        (state.session &&
        String(state.session.bookingId) === String(divingCourseBookingId)
          ? state.session
          : null) || state.sessionsByBookingId[divingCourseBookingId];
      if (stored && stored.payPalOrderId) {
        return {
          paymentId: stored.paymentId,
          payPalOrderId: stored.payPalOrderId,
          currency: stored.currency,
          bookingReference: stored.bookingReference,
        };
      }

      const existing = await getPaymentsByDivingCourseBookingId(
        divingCourseBookingId
      );
      const active = existing.find((p) => isPendingStatus(p.status));
      if (active && active.payPalOrderId) {
        return {
          paymentId: Number(active.paymentId) || undefined,
          payPalOrderId: active.payPalOrderId,
          currency: active.currency,
          bookingReference: divingCourseBookingId,
        };
      }
    }
    throw err;
  }
}
