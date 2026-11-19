export type TripCategory =
  | "all"
  | "safari"
  | "relax"
  | "historical"
  | "snorkeling"
  | "adventure";

export interface TripItem {
  id: string;
  badge: string;
  title: string;
  location: string;
  rating: number;
  reviewsCount: number;
  price: string;
  currency: string;
  priceUnit: string;
  image: string;
  category: TripCategory | string;
  href: string;
}

export interface TripCategoryFilter {
  id: TripCategory;
  label: string;
}
