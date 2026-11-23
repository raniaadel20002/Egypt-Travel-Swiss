"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PendingPaymentSession } from "@/models/payment";

export interface PaymentStoreState {
  session: PendingPaymentSession | null;
  sessionsByBookingId: Record<string, PendingPaymentSession>;
  hasHydrated: boolean;
  setSession: (session: PendingPaymentSession | null) => void;
  rememberBookingSession: (session: PendingPaymentSession) => void;
  clearSession: () => void;
  setHasHydrated: (val: boolean) => void;
}

export const usePaymentStore = create<PaymentStoreState>()(
  persist(
    (set, get) => ({
      session: null,
      sessionsByBookingId: {},
      hasHydrated: false,
      setSession: (session) => {
        if (!session) {
          set({ session: null });
          return;
        }
        const key = String(session.bookingId || "");
        set((state) => ({
          session,
          sessionsByBookingId: key
            ? { ...state.sessionsByBookingId, [key]: session }
            : state.sessionsByBookingId,
        }));
      },
      rememberBookingSession: (session) => {
        const key = String(session.bookingId || "");
        if (!key) return;
        set((state) => ({
          sessionsByBookingId: { ...state.sessionsByBookingId, [key]: session },
        }));
      },
      clearSession: () => set({ session: null }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "egypt_dreams_payment_session",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
