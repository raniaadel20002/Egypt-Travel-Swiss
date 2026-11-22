import { BackendLanguageCode } from "./tripType";
import { APP_ICON_CATALOG } from "@/shared/utils/iconRegistry";

export interface HotelTranslationInput {
  en: string;
  fr: string;
  ru: string;
  ro: string;
  it: string;
}

export function createEmptyHotelTranslation(): HotelTranslationInput {
  return {
    en: "",
    fr: "",
    ru: "",
    ro: "",
    it: "",
  };
}

export interface HotelFacilityIconOption {
  key: string;
  label: string;
}

export const HOTEL_FACILITY_ICONS: HotelFacilityIconOption[] =
  APP_ICON_CATALOG.map((item) => ({
    key: item.name,
    label: item.label,
  }));

export interface HotelFacilityApiItem {
  id?: string;
  name: string;
  values: string[];
  icon: string;
  order: number;
}

export interface HotelFacilityPayload {
  id?: string;
  name: HotelTranslationInput;
  values: HotelTranslationInput[];
  icon: string;
  order: number;
}

export interface HotelFacilityMultiLangItem {
  id?: string;
  name: HotelTranslationInput;
  values: HotelTranslationInput[];
  icon: string;
  order: number;
}

export interface HotelImageApiItem {
  id: number;
  hotelId: number;
  imageUrl: string;
  isPrimary: boolean;
  displayOrder: number;
}

export interface RatePlanTranslationInput {
  en: string;
  fr: string;
  ru: string;
  ro: string;
  it: string;
}

export function createEmptyRatePlanTranslation(): RatePlanTranslationInput {
  return {
    en: "",
    fr: "",
    ru: "",
    ro: "",
    it: "",
  };
}

export interface HotelRatePlanApiItem {
  id: number;
  hotelId: number;
  hotelName: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface HotelRatePlanMultiLangDetails {
  id: number;
  hotelId: number;
  hotelName: string;
  name: RatePlanTranslationInput;
  description: RatePlanTranslationInput;
  createdAt: string;
  updatedAt: string | null;
}

export interface CreateRatePlanPayload {
  hotelId: number;
  name: RatePlanTranslationInput;
  description: RatePlanTranslationInput;
}

export interface UpdateRatePlanPayload {
  id: number;
  hotelId: number;
  name: RatePlanTranslationInput;
  description: RatePlanTranslationInput;
}

export interface RatePlansQueryParams {
  PageNumber?: number;
  PageSize?: number;
  HotelId?: number;
  Language?: string;
}

export interface HotelApiItem {
  id: number;
  name: string;
  location: string;
  description: string;
  rate: number;
  createdAt: string;
  updatedAt: string | null;
  facilities: HotelFacilityApiItem[];
  images: HotelImageApiItem[];
  ratePlans: HotelRatePlanApiItem[];
}

export interface HotelMultiLangDetails {
  id: number;
  name: HotelTranslationInput;
  location: HotelTranslationInput;
  description: HotelTranslationInput;
  rate: number;
  createdAt: string;
  updatedAt: string | null;
  facilities: HotelFacilityMultiLangItem[];
  images: HotelImageApiItem[];
  ratePlans: HotelRatePlanApiItem[];
}

export interface HotelsQueryParams {
  PageNumber?: number;
  PageSize?: number;
  Search?: string;
  Rate?: number;
  FacilityId?: number;
  Language?: BackendLanguageCode | string;
}

export interface CreateHotelPayload {
  name: HotelTranslationInput;
  location: HotelTranslationInput;
  description: HotelTranslationInput;
  rate: number;
  facilities: HotelFacilityPayload[];
}

export interface UpdateHotelPayload extends CreateHotelPayload {
  id: number;
}

export interface ReorderHotelFacilitiesPayload {
  hotelId: number;
  facilityIds: string[];
}

export interface UploadHotelImagesPayload {
  hotelId: number;
  images: File[];
}

export interface DeleteHotelImagePayload {
  hotelId: number;
  imageId: number;
}

export interface SetPrimaryHotelImagePayload {
  hotelId: number;
  imageId: number;
}

export interface HotelImageOrderItem {
  imageId: number;
  displayOrder: number;
}

export interface ReorderHotelImagesPayload {
  hotelId: number;
  imageOrders: HotelImageOrderItem[];
}
