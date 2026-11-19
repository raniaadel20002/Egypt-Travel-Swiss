"use client";

import Image from "next/image";

export interface LanguageFlagProps {
  code: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  showLabel?: boolean;
  label?: string;
}

const FLAG_CONFIG: Record<string, { path: string; name: string; displayCode: string }> = {
  en: { path: "/flags/gb.svg", name: "United Kingdom", displayCode: "EN" },
  gb: { path: "/flags/gb.svg", name: "United Kingdom", displayCode: "EN" },
  fr: { path: "/flags/fr.svg", name: "France", displayCode: "FR" },
  ru: { path: "/flags/ru.svg", name: "Russia", displayCode: "RU" },
  ro: { path: "/flags/ro.svg", name: "Romania", displayCode: "RO" },
  it: { path: "/flags/it.svg", name: "Italy", displayCode: "IT" },
  de: { path: "/flags/de.svg", name: "Germany", displayCode: "DE" },
  ar: { path: "/flags/eg.svg", name: "Egypt", displayCode: "AR" },
  eg: { path: "/flags/eg.svg", name: "Egypt", displayCode: "AR" },
};

const SIZE_STYLES = {
  xs: { container: "w-4 h-3", px: 16, py: 12 },
  sm: { container: "w-5 h-3.5", px: 20, py: 14 },
  md: { container: "w-6 h-4.5", px: 24, py: 18 },
  lg: { container: "w-8 h-6", px: 32, py: 24 },
} as const;

export default function LanguageFlag({
  code,
  size = "sm",
  className = "",
  showLabel = false,
  label,
}: LanguageFlagProps) {
  const normalizedKey = (code || "").trim().toLowerCase();
  const config = FLAG_CONFIG[normalizedKey] || {
    path: "/flags/gb.svg",
    name: code || "Flag",
    displayCode: (code || "").toUpperCase(),
  };

  const currentSize = SIZE_STYLES[size] || SIZE_STYLES.sm;

  const flagIcon = (
    <span
      className={`relative inline-block ${currentSize.container} rounded-[3px] overflow-hidden border border-black/15 shadow-[0px_1px_2px_rgba(0,0,0,0.06)] shrink-0 bg-gray-100 ${className}`}
      title={config.name}
    >
      <Image
        src={config.path}
        alt={`${config.name} flag`}
        fill
        sizes={`${currentSize.px}px`}
        className="object-cover"
        unoptimized
      />
    </span>
  );

  if (!showLabel) {
    return flagIcon;
  }

  return (
    <span className="inline-flex items-center gap-1.5 align-middle">
      {flagIcon}
      <span className="font-semibold text-xs text-[#013E51]">
        {label || config.displayCode}
      </span>
    </span>
  );
}
