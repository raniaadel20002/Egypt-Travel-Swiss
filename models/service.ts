import { BackendLanguageCode } from "./tripType";

export interface ServiceTranslationInput {
  en: string;
  fr: string;
  ru: string;
  ro: string;
  it: string;
}

export interface ServiceImageApiItem {
  id: number;
  imageUrl: string;
}

export interface ServiceApiItem {
  id: number;
  name: string;
  description: string;
  adultPrice: number;
  childPrice: number;
  infPrice: number;
  createdAt: string;
  images: ServiceImageApiItem[];
}

export interface ServiceMultiLangDetails {
  id: number;
  name: ServiceTranslationInput;
  description: ServiceTranslationInput;
  adultPrice: number;
  childPrice: number;
  infPrice: number;
  createdAt: string;
  images: ServiceImageApiItem[];
}

export interface ServicesQueryParams {
  PageNumber?: number;
  PageSize?: number;
  language?: BackendLanguageCode;
}

export interface CreateServicePayload {
  name: ServiceTranslationInput;
  description: ServiceTranslationInput;
  adultPrice: number;
  childPrice: number;
  infPrice: number;
}

export interface UpdateServicePayload extends CreateServicePayload {
  id: number;
}

export interface UploadServiceImagesPayload {
  serviceId: number;
  images: File[];
}

export interface DeleteServiceImagePayload {
  serviceId: number;
  imageId: number;
}

export interface AssociateTripServicesPayload {
  tripId: number;
  serviceIds: number[];
}
