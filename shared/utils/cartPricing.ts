import { CartPricingSummary, CartTripItem } from "@/models/cart";
import { PromoCodeItem } from "@/models/promoCode";

export function calculateTripItemSubtotal(item: CartTripItem): number {
  const isOnContact = (item.adultPrice || 0) <= 0;
  const adultTotal = isOnContact ? 0 : (item.noAdult || 0) * (item.adultPrice || 0);
  const childTotal = isOnContact ? 0 : (item.noChild || 0) * (item.childPrice || 0);
  const infTotal = isOnContact ? 0 : (item.noInf || 0) * (item.infPrice || 0);
  const transferTotal =
    item.categoryLabel === "Private" ? (item.transferPrice || 0) : 0;
  const servicesTotal = (item.selectedServices || []).reduce(
    (acc, s) => acc + (s.adultPrice || 0),
    0
  );
  return adultTotal + childTotal + infTotal + transferTotal + servicesTotal;
}

export function calculateCartSummary(
  items: CartTripItem[],
  promoCode?: PromoCodeItem | null
): CartPricingSummary {
  let subtotal = 0;
  let totalTravelers = 0;
  let hasOnContactTrip = false;

  for (const item of items) {
    if ((item.adultPrice || 0) <= 0) {
      hasOnContactTrip = true;
    }
    subtotal += calculateTripItemSubtotal(item);
    totalTravelers +=
      (item.noAdult || 0) + (item.noChild || 0) + (item.noInf || 0);
  }

  let discountAmount = 0;
  if (promoCode) {
    if (promoCode.discountpercent > 0) {
      discountAmount = (subtotal * promoCode.discountpercent) / 100;
    } else if (promoCode.discountEuro > 0) {
      discountAmount = Math.min(subtotal, promoCode.discountEuro);
    }
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);

  return {
    itemCount: items.length,
    totalTravelers,
    subtotal,
    discountAmount,
    finalTotal,
    hasOnContactTrip,
  };
}

export function getTomorrowIsoDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}
