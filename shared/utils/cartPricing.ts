import { CartPricingSummary, CartTripItem } from "@/models/cart";

export function calculateTripItemSubtotal(item: CartTripItem): number {
  const adultTotal = (item.noAdult || 0) * (item.adultPrice || 0);
  const childTotal = (item.noChild || 0) * (item.childPrice || 0);
  const infTotal = (item.noInf || 0) * (item.infPrice || 0);
  const servicesTotal = (item.selectedServices || []).reduce(
    (acc, s) => acc + (s.adultPrice || 0),
    0
  );
  return adultTotal + childTotal + infTotal + servicesTotal;
}

export function calculateCartSummary(items: CartTripItem[]): CartPricingSummary {
  let subtotal = 0;
  let totalTravelers = 0;

  for (const item of items) {
    subtotal += calculateTripItemSubtotal(item);
    totalTravelers +=
      (item.noAdult || 0) + (item.noChild || 0) + (item.noInf || 0);
  }

  return {
    itemCount: items.length,
    totalTravelers,
    subtotal,
  };
}

export function getTomorrowIsoDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}
