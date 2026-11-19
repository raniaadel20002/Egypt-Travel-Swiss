export type DivingCourseCategory =
  | "all"
  | "first-time"
  | "core"
  | "advanced"
  | "specialty";

export interface DivingCourseItem {
  id: string;
  badge: string;
  badgeVariant: "teal" | "gold";
  title: string;
  description: string;
  duration: string;
  depth: string;
  price: number;
  priceUnit: string;
  image: string;
  category: DivingCourseCategory;
  detailsHref: string;
  bookingHref: string;
}

export interface RoadmapStep {
  step: string;
  badgeColor: "teal" | "gold";
  depth: string;
  details: string;
  title: string;
  description: string;
}
