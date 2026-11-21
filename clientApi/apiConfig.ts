import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { ApiResponse } from "@/models/api";

export type { ApiResponse };

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://touristy.runasp.net";

let activeLanguageResolver: (() => string) | null = null;

export function setActiveLanguageResolver(resolver: () => string): void {
  activeLanguageResolver = resolver;
}

export function getActiveLanguage(): string {
  if (activeLanguageResolver) {
    try {
      const resolved = activeLanguageResolver();
      if (resolved) return resolved.toUpperCase();
    } catch {
      // Fallback below
    }
  }

  if (typeof window !== "undefined") {
    const segments = window.location.pathname.split("/").filter(Boolean);
    if (segments.length > 0) {
      const first = segments[0].toLowerCase();
      if (["en", "fr", "ru", "ro", "it"].includes(first)) {
        return first.toUpperCase();
      }
    }
  }

  return "EN";
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.headers) {
    config.headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    config.headers["Pragma"] = "no-cache";
    config.headers["Expires"] = "0";

    if (!config.headers["Accept-Language"]) {
      config.headers["Accept-Language"] = getActiveLanguage();
    }

    if (typeof FormData !== "undefined" && config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
  }
  return config;
});
