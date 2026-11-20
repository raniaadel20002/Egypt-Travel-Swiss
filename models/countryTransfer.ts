import { BackendLanguageCode } from "@/models/tripType";

export interface CountryTransferLocalizedName {
  en: string;
  fr: string;
  ru: string;
  ro: string;
  it: string;
}

export interface CountryTransferItem {
  id: number;
  name: string;
  code: string;
  createdAt: string;
}

export interface CountryTransferMultiLangDetails {
  id: number;
  name: CountryTransferLocalizedName;
  code: string;
  createdAt: string;
}

export interface CountryTransfersQueryParams {
  PageNumber?: number;
  PageSize?: number;
  searchTerm?: string;
  language?: BackendLanguageCode | "en" | "fr" | "ru" | "ro" | "it";
}

export interface CreateCountryTransferPayload {
  name: CountryTransferLocalizedName;
  code: string;
}

export interface UpdateCountryTransferPayload {
  id: number;
  name: CountryTransferLocalizedName;
  code: string;
}
