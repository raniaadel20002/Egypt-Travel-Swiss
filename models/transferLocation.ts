export type TransferLocationType = "from" | "to";

export interface TransferLocationLocalizedName {
  en: string;
  fr: string;
  ru: string;
  ro: string;
  it: string;
}

export interface TransferLocationItem {
  id: string;
  name: string;
}

export interface CreateTransferLocationPayload {
  name: TransferLocationLocalizedName;
}

export interface UpdateTransferLocationPayload {
  id: string;
  name: TransferLocationLocalizedName;
}

export interface TransferLocationsQueryParams {
  PageNumber?: number;
  PageSize?: number;
  language?: string;
}

export interface TransferLocationLanguageOption {
  code: keyof TransferLocationLocalizedName;
  label: string;
  flagCode: string;
}

export const TRANSFER_LOCATION_LANGUAGES: TransferLocationLanguageOption[] = [
  { code: "en", label: "English (EN)", flagCode: "gb" },
  { code: "fr", label: "French (FR)", flagCode: "fr" },
  { code: "ru", label: "Russian (RU)", flagCode: "ru" },
  { code: "ro", label: "Romanian (RO)", flagCode: "ro" },
  { code: "it", label: "Italian (IT)", flagCode: "it" },
];
