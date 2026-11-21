"use client";

import { createContext, useContext, useEffect, useRef, ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dictionary,
  getDictionary,
  getLocaleDirection,
  SupportedLocale,
  DEFAULT_LOCALE,
} from "@/features/i18n/i18nConfig";
import { setActiveLanguageResolver } from "@/clientApi/apiConfig";
import { localeToBackendLanguage } from "@/shared/utils/localeToBackendLanguage";

interface LocaleContextValue {
  locale: SupportedLocale;
  direction: "ltr" | "rtl";
  dictionary: Dictionary;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  direction: "ltr",
  dictionary: getDictionary(DEFAULT_LOCALE),
});

interface LocaleProviderProps {
  locale: SupportedLocale;
  children: ReactNode;
}

export default function LocaleProvider({
  locale,
  children,
}: LocaleProviderProps) {
  const queryClient = useQueryClient();
  const direction = getLocaleDirection(locale);
  const dictionary = getDictionary(locale);
  const previousLocaleRef = useRef<SupportedLocale>(locale);

  useEffect(() => {
    setActiveLanguageResolver(() => localeToBackendLanguage(locale));

    if (typeof document !== "undefined") {
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = locale;
      document.documentElement.dir = direction;
    }

    if (previousLocaleRef.current !== locale) {
      previousLocaleRef.current = locale;
      queryClient.invalidateQueries();
    }
  }, [locale, direction, queryClient]);

  return (
    <LocaleContext.Provider value={{ locale, direction, dictionary }}>
      <div dir={direction} className="min-h-screen">
        {children}
      </div>
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
