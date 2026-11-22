import { PromoCodeItem } from "@/models/promoCode";

export interface CartTripServiceItem {
  id: number;
  name: string;
  adultPrice: number;
  childPrice: number;
  infPrice: number;
}

export interface CartTripItem {
  tripId: number;
  name: string;
  destination: string;
  tripTypeName: string;
  categoryLabel: "Group" | "Private";
  imageUrl: string;
  adultPrice: number;
  childPrice: number;
  infPrice: number;
  availableDays?: string[];
  noAdult: number;
  noChild: number;
  noInf: number;
  leaveDate: string;
  serviceIds?: number[];
  selectedServices?: CartTripServiceItem[];
  transferPrice?: number;
  transferVehicleName?: string;
}

export interface CartPricingSummary {
  itemCount: number;
  totalTravelers: number;
  subtotal: number;
  discountAmount: number;
  finalTotal: number;
  hasOnContactTrip: boolean;
}
