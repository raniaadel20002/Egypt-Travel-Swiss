import enDict from "@/translations/en.json";
import frDict from "@/translations/fr.json";
import ruDict from "@/translations/ru.json";
import roDict from "@/translations/ro.json";
import itDict from "@/translations/it.json";

export type SupportedLocale = "en" | "fr" | "ru" | "ro" | "it";

export const DEFAULT_LOCALE: SupportedLocale = "en";
export const SUPPORTED_LOCALES: SupportedLocale[] = [
  "en",
  "fr",
  "ru",
  "ro",
  "it",
];

export type Dictionary = typeof enDict;

const DICTIONARIES: Record<SupportedLocale, Dictionary> = {
  en: enDict,
  fr: frDict,
  ru: ruDict,
  ro: roDict,
  it: itDict,
};

export function isValidLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

export function getDictionary(locale: SupportedLocale): Dictionary {
  return DICTIONARIES[locale] || DICTIONARIES[DEFAULT_LOCALE];
}

export function getLocaleDirection(_locale: SupportedLocale): "ltr" | "rtl" {
  return "ltr";
}
