export type BackendLanguageCode = "EN" | "FR" | "RU" | "RO" | "IT";

export interface LanguageOption {
  code: BackendLanguageCode;
  formKey: "En" | "Fr" | "Ru" | "Ro" | "It";
  label: string;
  flagCode: string;
  flagPath: string;
  countryName: string;
}

export const TRIP_TYPE_LANGUAGES: LanguageOption[] = [
  {
    code: "EN",
    formKey: "En",
    label: "English (EN)",
    flagCode: "gb",
    flagPath: "/flags/gb.svg",
    countryName: "United Kingdom",
  },
  {
    code: "FR",
    formKey: "Fr",
    label: "French (FR)",
    flagCode: "fr",
    flagPath: "/flags/fr.svg",
    countryName: "France",
  },
  {
    code: "RU",
    formKey: "Ru",
    label: "Russian (RU)",
    flagCode: "ru",
    flagPath: "/flags/ru.svg",
    countryName: "Russia",
  },
  {
    code: "RO",
    formKey: "Ro",
    label: "Romanian (RO)",
    flagCode: "ro",
    flagPath: "/flags/ro.svg",
    countryName: "Romania",
  },
  {
    code: "IT",
    formKey: "It",
    label: "Italian (IT)",
    flagCode: "it",
    flagPath: "/flags/it.svg",
    countryName: "Italy",
  },
];

export interface TripTypeItem {
  id: number;
  name: string;
  imageUrl: string;
}

export interface TripTypeLocalizedNames {
  En: string;
  Fr: string;
  Ru: string;
  Ro: string;
  It: string;
}

export interface TripTypeMultiLangDetails {
  id: number;
  imageUrl: string;
  names: TripTypeLocalizedNames;
}

export interface TripTypesQueryParams {
  PageNumber?: number;
  PageSize?: number;
  language?: BackendLanguageCode;
}

export interface CreateTripTypePayload {
  names: TripTypeLocalizedNames;
  image: File;
}

export interface UpdateTripTypePayload {
  id: number;
  names: TripTypeLocalizedNames;
  image?: File | null;
  existingImageUrl?: string;
}
