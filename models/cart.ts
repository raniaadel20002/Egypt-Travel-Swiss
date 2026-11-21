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
}

export interface CartPricingSummary {
  itemCount: number;
  totalTravelers: number;
  subtotal: number;
}
