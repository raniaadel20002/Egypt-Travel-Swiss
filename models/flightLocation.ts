export interface LocalizedLocationName {
  en: string;
  fr: string;
  ru: string;
  ro: string;
  it: string;
}

export interface FlightLocationLanguageOption {
  code: keyof LocalizedLocationName;
  label: string;
  flagCode: string;
}

export const FLIGHT_LOCATION_LANGUAGES: FlightLocationLanguageOption[] = [
  { code: "en", label: "English (EN)", flagCode: "gb" },
  { code: "fr", label: "French (FR)", flagCode: "fr" },
  { code: "ru", label: "Russian (RU)", flagCode: "ru" },
  { code: "ro", label: "Romanian (RO)", flagCode: "ro" },
  { code: "it", label: "Italian (IT)", flagCode: "it" },
];

export interface CountryApiItem {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface CreateCountryPayload {
  name: LocalizedLocationName;
}

export interface UpdateCountryPayload {
  id: number;
  name: LocalizedLocationName;
}

export interface CountriesQueryParams {
  Search?: string;
  Language?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface CityApiItem {
  id: number;
  countryId: number;
  countryName: string;
  name: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface CreateCityPayload {
  countryId: number;
  name: LocalizedLocationName;
}

export interface UpdateCityPayload {
  id: number;
  countryId: number;
  name: LocalizedLocationName;
}

export interface CitiesQueryParams {
  CountryId?: number;
  Search?: string;
  Language?: string;
  PageNumber?: number;
  PageSize?: number;
}
