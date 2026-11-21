"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { SupportedLocale } from "@/features/i18n/i18nConfig";
import { useLocale } from "@/shared/providers/LocaleProvider";
import { useModalDismiss } from "@/shared/utils/useModalDismiss";

export interface LanguageItem {
  locale: SupportedLocale;
  code: string;
  name: string;
  flagPath: string;
}

export const CLIENT_LANGUAGES: LanguageItem[] = [
  {
    locale: "en",
    code: "EN",
    name: "English",
    flagPath: "/flags/gb.svg",
  },
  {
    locale: "fr",
    code: "FR",
    name: "Français",
    flagPath: "/flags/fr.svg",
  },
  {
    locale: "ru",
    code: "RU",
    name: "Русский",
    flagPath: "/flags/ru.svg",
  },
  {
    locale: "ro",
    code: "RO",
    name: "Română",
    flagPath: "/flags/ro.svg",
  },
  {
    locale: "it",
    code: "IT",
    name: "Italiano",
    flagPath: "/flags/it.svg",
  },
];

interface LanguageSwitcherProps {
  className?: string;
  variant?: "header" | "mobile";
  onSelectLanguage?: () => void;
}

export default function LanguageSwitcher({
  className = "",
  variant = "header",
  onSelectLanguage,
}: LanguageSwitcherProps) {
  const { locale } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useModalDismiss({
    isOpen,
    onClose: () => setIsOpen(false),
  });

  const activeLang =
    CLIENT_LANGUAGES.find((item) => item.locale === locale) ||
    CLIENT_LANGUAGES[0];

  const handleSelect = (targetLocale: SupportedLocale) => {
    if (targetLocale === locale) {
      setIsOpen(false);
      onSelectLanguage?.();
      return;
    }

    if (typeof document !== "undefined") {
      document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;
    }

    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && CLIENT_LANGUAGES.some((l) => l.locale === segments[0])) {
      segments[0] = targetLocale;
    } else {
      segments.unshift(targetLocale);
    }

    const queryString = searchParams?.toString();
    const newPath = `/${segments.join("/")}${queryString ? `?${queryString}` : ""}`;

    setIsOpen(false);
    onSelectLanguage?.();
    router.push(newPath);
  };

  if (variant === "mobile") {
    return (
      <div className={`space-y-2.5 ${className}`}>
        <span className="text-xs font-semibold text-[#888888] uppercase tracking-wider block">
          Select Language
        </span>
        <div className="grid grid-cols-2 gap-2">
          {CLIENT_LANGUAGES.map((lang) => {
            const isSelected = lang.locale === locale;
            return (
              <button
                key={lang.locale}
                type="button"
                onClick={() => handleSelect(lang.locale)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition border cursor-pointer ${
                  isSelected
                    ? "bg-[#013E51] text-white border-[#013E51] shadow-xs"
                    : "bg-[#FAF7F2] text-[#013E51] border-gray-200 hover:border-[#013E51]/40"
                }`}
              >
                <span className="relative w-5 h-3.5 rounded-[2px] overflow-hidden shrink-0 border border-black/10">
                  <Image
                    src={lang.flagPath}
                    alt={lang.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </span>
                <span className="truncate">{lang.name}</span>
                {isSelected && <FiCheck className="w-3.5 h-3.5 ml-auto text-[#E8B34A]" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Current language: ${activeLang.name}. Click to change language.`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="h-10 sm:h-11 px-3 sm:px-3.5 rounded-full border border-gray-200 hover:border-[#013E51]/40 bg-white hover:bg-[#FAF7F2]/80 text-[#013E51] flex items-center gap-2 transition-all duration-200 cursor-pointer shadow-2xs"
      >
        <span className="relative w-5 h-3.5 rounded-[2px] overflow-hidden shrink-0 border border-black/15 shadow-2xs">
          <Image
            src={activeLang.flagPath}
            alt={`${activeLang.name} flag`}
            fill
            className="object-cover"
            unoptimized
          />
        </span>
        <span className="font-[family-name:var(--font-lato)] text-xs sm:text-[13px] font-semibold text-[#013E51] tracking-wide">
          {activeLang.name}
        </span>
        <FiChevronDown
          className={`w-3.5 h-3.5 text-[#013E51]/60 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#013E51]" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Available languages"
          className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border border-gray-100 shadow-[0px_12px_36px_rgba(1,62,81,0.12)] p-1.5 z-50 animate-in fade-in-50 zoom-in-95 duration-150"
        >
          <div className="px-3 py-1.5 border-b border-gray-100 text-[10px] font-bold uppercase tracking-wider text-[#888888]">
            Select Language
          </div>
          <div className="pt-1 space-y-0.5">
            {CLIENT_LANGUAGES.map((lang) => {
              const isSelected = lang.locale === locale;
              return (
                <button
                  key={lang.locale}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(lang.locale)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    isSelected
                      ? "bg-[#013E51]/8 text-[#013E51] font-bold"
                      : "text-gray-700 hover:bg-[#FAF7F2] hover:text-[#013E51]"
                  }`}
                >
                  <span className="relative w-5 h-3.5 rounded-[2px] overflow-hidden shrink-0 border border-black/10">
                    <Image
                      src={lang.flagPath}
                      alt={`${lang.name} flag`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </span>
                  <span className="flex-1 text-left truncate">{lang.name}</span>
                  <span className="text-[10px] uppercase font-bold text-gray-400">
                    {lang.code}
                  </span>
                  {isSelected && (
                    <FiCheck className="w-3.5 h-3.5 text-[#013E51] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
