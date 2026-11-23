import type { ReactPayPalScriptOptions } from "@paypal/react-paypal-js";

export type PayPalEnvironment = "sandbox" | "live";

const RAW_CLIENT_ID = (process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "").trim();
const RAW_ENV = (process.env.NEXT_PUBLIC_PAYPAL_ENV || "sandbox").toLowerCase();

export const PAYPAL_ENVIRONMENT: PayPalEnvironment =
  RAW_ENV === "live" ? "live" : "sandbox";

export const PAYPAL_DEFAULT_CURRENCY = (
  process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || "EUR"
).toUpperCase();

export const PAYPAL_CLIENT_ID = RAW_CLIENT_ID;

export function isPayPalConfigured(): boolean {
  return PAYPAL_CLIENT_ID.length > 0 && PAYPAL_CLIENT_ID !== "your_paypal_client_id_here";
}

const PAYPAL_LOCALE_MAP: Record<string, string> = {
  en: "en_US",
  fr: "fr_FR",
  it: "it_IT",
  ro: "ro_RO",
  ru: "ru_RU",
};

export function resolvePayPalLocale(appLocale?: string): string {
  if (!appLocale) return "en_US";
  return PAYPAL_LOCALE_MAP[appLocale.toLowerCase()] || "en_US";
}

export function getPayPalScriptOptions(options?: {
  currency?: string;
  locale?: string;
}): ReactPayPalScriptOptions {
  if (!isPayPalConfigured() && process.env.NODE_ENV !== "production") {
    console.warn(
      "[PayPalConfig] NEXT_PUBLIC_PAYPAL_CLIENT_ID is missing. Add it to .env.local to enable card payments."
    );
  }

  return {
    clientId: PAYPAL_CLIENT_ID || "sb",
    components: "card-fields",
    currency: (options?.currency || PAYPAL_DEFAULT_CURRENCY).toUpperCase(),
    intent: "capture",
    locale: resolvePayPalLocale(options?.locale),
    dataSdkIntegrationSource: "developer-studio",
  };
}
