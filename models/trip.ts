import { BackendLanguageCode } from "@/models/tripType";

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

export enum TripCategoryEnum {
  Normal = 0,
  Private = 1,
}

export const TRIP_CATEGORY_OPTIONS = [
  { value: TripCategoryEnum.Normal, label: "Groups" },
  { value: TripCategoryEnum.Private, label: "Private" },
] as const;

export enum DurationTypeEnum {
  Hours = 0,
  Days = 1,
}

export const DURATION_TYPE_OPTIONS = [
  { value: DurationTypeEnum.Hours, label: "Hours" },
  { value: DurationTypeEnum.Days, label: "Days" },
] as const;

export interface DayOfWeekOption {
  dayNo: number;
  label: string;
  short: string;
}

export const TRIP_DAYS_OF_WEEK: DayOfWeekOption[] = [
  { dayNo: 0, label: "Sunday", short: "Sun" },
  { dayNo: 1, label: "Monday", short: "Mon" },
  { dayNo: 2, label: "Tuesday", short: "Tue" },
  { dayNo: 3, label: "Wednesday", short: "Wed" },
  { dayNo: 4, label: "Thursday", short: "Thu" },
  { dayNo: 5, label: "Friday", short: "Fri" },
  { dayNo: 6, label: "Saturday", short: "Sat" },
];

export interface TripTranslationInput {
  en: string;
  fr: string;
  ru: string;
  ro: string;
  it: string;
}

export interface TripDestinationInfo {
  id: number;
  name: string;
  imageUrl: string | null;
  isFeatured: boolean;
}

export interface TripImageApiItem {
  id: number;
  imageUrl: string;
  isPrimary: boolean;
}

export interface TripApiItem {
  id: number;
  markerID: string;
  destinationInfo: TripDestinationInfo | null;
  destination: string | null;
  name: string;
  description: string;
  timeFrom: string | null;
  durationValue: number;
  durationTypeName: string;
  adultPrice: number;
  childPrice: number;
  infPrice: number;
  currencyName: string;
  categoryName: string;
  isActive: boolean;
  tripTypeName: string;
  createdBy: string;
  createdAt: string;
  highlights: string[];
  includes: string[];
  excludes: string[];
  whatToBring: string[];
  availableDays: string[];
  images: TripImageApiItem[];
}

export interface TripMultiLangDetails {
  id: number;
  markerID: string;
  destinationId: number;
  tripTypeId: number;
  name: TripTranslationInput;
  description: TripTranslationInput;
  timeFrom: string;
  durationValue: number;
  durationType: DurationTypeEnum;
  adultPrice: number;
  childPrice: number;
  infPrice: number;
  category: TripCategoryEnum;
  availabilityDayNo: number[];
  highlights: TripTranslationInput[];
  includes: TripTranslationInput[];
  excludes: TripTranslationInput[];
  whatToBring: TripTranslationInput[];
  images: TripImageApiItem[];
  isActive: boolean;
  currencyName: string;
}

export interface TripsQueryParams {
  PageNumber?: number;
  PageSize?: number;
  MinPrice?: number;
  MaxPrice?: number;
  TypeId?: number;
  DestinationId?: number;
  SearchItem?: string;
  Category?: number;
  includeInactive?: boolean;
  language?: BackendLanguageCode;
}

export interface CreateTripPayload {
  destinationId: number;
  tripTypeId: number;
  name: TripTranslationInput;
  description: TripTranslationInput;
  timeFrom?: string | null;
  durationValue: number;
  durationType: DurationTypeEnum;
  adultPrice: number;
  childPrice: number;
  infPrice: number;
  category: TripCategoryEnum;
  highlights?: TripTranslationInput[] | null;
  includes?: TripTranslationInput[] | null;
  excludes?: TripTranslationInput[] | null;
  whatToBring?: TripTranslationInput[] | null;
  availabilityDayNo?: number[] | null;
}

export interface UpdateTripPayload extends CreateTripPayload {
  id: number;
}

export interface UploadTripImagesPayload {
  tripId: number;
  images: File[];
}

export interface TripImageActionPayload {
  tripId: number;
  imageId: number;
}
