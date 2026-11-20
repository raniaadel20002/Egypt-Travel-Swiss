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

export const DUMMY_DIVING_REVIEW_PHONE = "0123456789";

export enum DivingCourseReviewStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
}

export interface DivingCourseLocalizedText {
  en: string;
  fr: string;
  ru: string;
  ro: string;
  it: string;
}

export interface DivingCourseFacilityApiItem {
  id: string;
  icon: string;
  order: number;
  name: string;
  values: string;
}

export interface DivingCourseImageApiItem {
  id: string;
  order: number;
  imageUrl?: string;
  url?: string;
}

export interface DivingCourseApiItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  rating: number;
  reviewsCount: number;
  images: DivingCourseImageApiItem[];
  facilities: DivingCourseFacilityApiItem[];
}

export interface PaginatedDivingCoursesData {
  data: DivingCourseApiItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

export interface DivingCoursesQueryParams {
  pageNumber?: number;
  pageSize?: number;
  language?: string;
}

export interface CreateDivingCourseFacilityInput {
  icon: string;
  order: number;
  name: DivingCourseLocalizedText;
  values: DivingCourseLocalizedText;
}

export interface UpdateDivingCourseFacilityInput extends CreateDivingCourseFacilityInput {
  id?: string;
}

export interface CreateDivingCoursePayload {
  price: number;
  name: DivingCourseLocalizedText;
  description: DivingCourseLocalizedText;
  facilities: CreateDivingCourseFacilityInput[];
}

export interface UpdateDivingCoursePayload {
  id: string;
  price: number;
  name: DivingCourseLocalizedText;
  description: DivingCourseLocalizedText;
  facilities: UpdateDivingCourseFacilityInput[];
}

export interface ReorderCourseItemPayload {
  id: string;
  order: number;
}

export interface DivingCourseReviewApiItem {
  id: string;
  divingCourseId: string;
  name: string;
  email: string;
  phone?: string;
  reviewDate?: string;
  comment: string;
  status: number;
  rating: number;
  isApproved?: boolean;
}

export interface PaginatedDivingCourseReviewsData {
  data: DivingCourseReviewApiItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}

export interface DivingCourseReviewsQueryParams {
  pageNumber?: number;
  pageSize?: number;
  status?: number;
}

export interface CreateDivingCourseReviewPayload {
  name: string;
  email: string;
  phone?: string;
  comment: string;
  rating: number;
}

export interface DivingCourseReviewAverageData {
  averageRating: number;
  totalReviews: number;
  ratingDistribution?: Record<number, number>;
}

export interface DivingCourseMultiLangDetails {
  id: string;
  price: number;
  currency: string;
  name: DivingCourseLocalizedText;
  description: DivingCourseLocalizedText;
  facilities: UpdateDivingCourseFacilityInput[];
}
