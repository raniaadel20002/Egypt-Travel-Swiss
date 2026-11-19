import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { ApiResponse } from "@/models/api";

export type { ApiResponse };

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://touristy.runasp.net";

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

    if (typeof FormData !== "undefined" && config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
  }
  return config;
});
