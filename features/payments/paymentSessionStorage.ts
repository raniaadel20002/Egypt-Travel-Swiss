import { PendingPaymentSession } from "@/models/payment";

const STORAGE_KEY = "ets_pending_paypal_payment";

export function savePendingPaymentSession(session: PendingPaymentSession): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Ignore storage quota errors
  }
}

export function loadPendingPaymentSession(): PendingPaymentSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PendingPaymentSession;
    if (!parsed || !parsed.payPalOrderId || !parsed.bookingType) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearPendingPaymentSession(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
}
