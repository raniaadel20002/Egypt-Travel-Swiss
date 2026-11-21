import { SupportedLocale } from "@/features/i18n/i18nConfig";
import { BackendLanguageCode } from "@/models/tripType";

export function localeToBackendLanguage(
  locale?: SupportedLocale | string | null
): BackendLanguageCode {
  if (!locale) return "EN";
  const normalized = locale.toLowerCase().trim();

  switch (normalized) {
    case "fr":
      return "FR";
    case "ru":
      return "RU";
    case "ro":
      return "RO";
    case "it":
      return "IT";
    case "en":
    default:
      return "EN";
  }
}
