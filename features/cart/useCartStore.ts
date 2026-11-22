"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartTripItem } from "@/models/cart";
import { TripApiItem } from "@/models/trip";
import { PromoCodeItem } from "@/models/promoCode";
import { resolveApiImageUrl } from "@/shared/utils/imageUrl";
import { getTomorrowIsoDate } from "@/shared/utils/cartPricing";
import {
  getNextAvailableDate,
  isDateAvailableForTrip,
} from "@/shared/utils/tripAvailability";

export interface AddTripResult {
  isNew: boolean;
  item: CartTripItem;
  quantity: number;
}

export interface CustomTripConfig {
  trip: TripApiItem;
  leaveDate: string;
  noAdult: number;
  noChild: number;
  noInf: number;
  serviceIds?: number[];
  selectedServices?: {
    id: number;
    name: string;
    adultPrice: number;
    childPrice: number;
    infPrice: number;
  }[];
  transferPrice?: number;
  transferVehicleName?: string;
  promoCode?: PromoCodeItem | null;
}

export interface CartStoreState {
  items: CartTripItem[];
  promoCode: PromoCodeItem | null;
  hasHydrated: boolean;
  setHasHydrated: (status: boolean) => void;
  setPromoCode: (promo: PromoCodeItem | null) => void;
  addTrip: (trip: TripApiItem) => AddTripResult;
  addCustomConfiguredTrip: (config: CustomTripConfig) => void;
  removeTrip: (tripId: number) => void;
  updateTravelers: (
    tripId: number,
    counts: { noAdult?: number; noChild?: number; noInf?: number }
  ) => void;
  updateTransferPricing: (
    tripId: number,
    transferPrice: number,
    vehicleName?: string
  ) => void;
  updateLeaveDate: (tripId: number, leaveDate: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      hasHydrated: false,

      setHasHydrated: (status) => set({ hasHydrated: status }),

      setPromoCode: (promo) => set({ promoCode: promo }),

      addTrip: (trip) => {
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex(
          (i) => i.tripId === trip.id
        );

        if (existingIndex > -1) {
          const existing = currentItems[existingIndex];
          const newAdults = existing.noAdult + 1;
          const updatedItem: CartTripItem = {
            ...existing,
            noAdult: newAdults,
          };
          const nextItems = [...currentItems];
          nextItems[existingIndex] = updatedItem;
          set({ items: nextItems });

          return { isNew: false, item: updatedItem, quantity: newAdults };
        }

        const primaryImageRaw =
          trip.images?.find((img) => img.isPrimary)?.imageUrl ||
          trip.images?.[0]?.imageUrl ||
          trip.destinationInfo?.imageUrl ||
          "/Trips/heroTrips.png";

        const rawCat = trip.categoryName?.trim().toLowerCase() || "";
        const categoryLabel: "Group" | "Private" = rawCat.includes("private")
          ? "Private"
          : "Group";

        const newItem: CartTripItem = {
          tripId: trip.id,
          name: trip.name,
          destination:
            trip.destination || trip.destinationInfo?.name || "Egypt",
          tripTypeName: trip.tripTypeName || "Trip",
          categoryLabel,
          imageUrl: resolveApiImageUrl(primaryImageRaw),
          adultPrice: Number(trip.adultPrice) || 0,
          childPrice: Number(trip.childPrice) || 0,
          infPrice: Number(trip.infPrice) || 0,
          availableDays: trip.availableDays,
          noAdult: 1,
          noChild: 0,
          noInf: 0,
          leaveDate: getNextAvailableDate(new Date(), trip.availableDays),
        };

        set({ items: [newItem, ...currentItems] });
        return { isNew: true, item: newItem, quantity: 1 };
      },

      addCustomConfiguredTrip: (config) => {
        const {
          trip,
          leaveDate,
          noAdult,
          noChild,
          noInf,
          serviceIds = [],
          selectedServices = [],
          transferPrice,
          transferVehicleName,
          promoCode,
        } = config;

        const currentItems = get().items;
        const existingIndex = currentItems.findIndex(
          (i) => i.tripId === trip.id
        );

        const primaryImageRaw =
          trip.images?.find((img) => img.isPrimary)?.imageUrl ||
          trip.images?.[0]?.imageUrl ||
          trip.destinationInfo?.imageUrl ||
          "/Trips/heroTrips.png";

        const rawCat = trip.categoryName?.trim().toLowerCase() || "";
        const categoryLabel: "Group" | "Private" = rawCat.includes("private")
          ? "Private"
          : "Group";

        const configuredLeaveDate =
          leaveDate && isDateAvailableForTrip(leaveDate, trip.availableDays)
            ? leaveDate
            : getNextAvailableDate(new Date(), trip.availableDays);

        const configuredItem: CartTripItem = {
          tripId: trip.id,
          name: trip.name,
          destination:
            trip.destination || trip.destinationInfo?.name || "Egypt",
          tripTypeName: trip.tripTypeName || "Trip",
          categoryLabel,
          imageUrl: resolveApiImageUrl(primaryImageRaw),
          adultPrice: Number(trip.adultPrice) || 0,
          childPrice: Number(trip.childPrice) || 0,
          infPrice: Number(trip.infPrice) || 0,
          availableDays: trip.availableDays,
          noAdult: Math.max(1, noAdult),
          noChild: Math.max(0, noChild),
          noInf: Math.max(0, noInf),
          leaveDate: configuredLeaveDate,
          serviceIds,
          selectedServices,
          transferPrice,
          transferVehicleName,
        };

        if (promoCode !== undefined) {
          set({ promoCode });
        }

        if (existingIndex > -1) {
          const nextItems = [...currentItems];
          nextItems[existingIndex] = configuredItem;
          set({ items: nextItems });
        } else {
          set({ items: [configuredItem, ...currentItems] });
        }
      },

      removeTrip: (tripId) => {
        set({
          items: get().items.filter((i) => i.tripId !== tripId),
        });
      },

      updateTravelers: (tripId, counts) => {
        set({
          items: get().items.map((item) => {
            if (item.tripId !== tripId) return item;
            return {
              ...item,
              noAdult:
                counts.noAdult !== undefined
                  ? Math.max(1, counts.noAdult)
                  : item.noAdult,
              noChild:
                counts.noChild !== undefined
                  ? Math.max(0, counts.noChild)
                  : item.noChild,
              noInf:
                counts.noInf !== undefined
                  ? Math.max(0, counts.noInf)
                  : item.noInf,
            };
          }),
        });
      },

      updateTransferPricing: (tripId, transferPrice, vehicleName) => {
        set({
          items: get().items.map((item) => {
            if (item.tripId !== tripId) return item;
            return {
              ...item,
              transferPrice,
              transferVehicleName: vehicleName || item.transferVehicleName,
            };
          }),
        });
      },

      updateLeaveDate: (tripId, leaveDate) => {
        set({
          items: get().items.map((item) =>
            item.tripId === tripId ? { ...item, leaveDate } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [], promoCode: null });
      },
    }),
    {
      name: "egypt-dreams-cart",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
