import { PendingPaymentSession } from "@/models/payment";
import { usePaymentStore } from "./usePaymentStore";

export function savePendingPaymentSession(session: PendingPaymentSession): void {
  usePaymentStore.getState().setSession(session);
}

export function loadPendingPaymentSession(): PendingPaymentSession | null {
  const inStore = usePaymentStore.getState().session;
  if (inStore?.payPalOrderId && inStore?.bookingType) {
    return inStore;
  }
  return null;
}

export function clearPendingPaymentSession(): void {
  usePaymentStore.getState().clearSession();
}
