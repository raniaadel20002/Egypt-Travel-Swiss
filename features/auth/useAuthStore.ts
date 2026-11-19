"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiClient } from "@/clientApi/apiConfig";
import { attachAuthInterceptors } from "@/clientApi/authApi";
import { AdminRole, AuthTokenData, CurrentAdminSession } from "@/models/auth";

interface JwtPayload {
  nameid?: string;
  email?: string;
  unique_name?: string;
  role?: string | string[];
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
  exp?: number;
}

function parseJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload) as JwtPayload;
  } catch {
    return null;
  }
}

export function isSuperAdminSession(
  user: CurrentAdminSession | null,
  accessToken?: string | null
): boolean {
  if (user?.role === "SuperAdmin" || user?.roles?.includes("SuperAdmin")) {
    return true;
  }

  if (accessToken) {
    const claims = parseJwtPayload(accessToken);
    const jwtRole =
      claims?.role ||
      claims?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    if (Array.isArray(jwtRole) && jwtRole.includes("SuperAdmin")) {
      return true;
    }
    if (typeof jwtRole === "string" && jwtRole === "SuperAdmin") {
      return true;
    }
  }

  return false;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: CurrentAdminSession | null;
  hasHydrated: boolean;
  setHasHydrated: (status: boolean) => void;
  setAuth: (data: Partial<AuthTokenData> & { accessToken: string }) => void;
  setAccessToken: (token: string) => void;
  updateCurrentUser: (info: { userName: string; email: string }) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      hasHydrated: false,

      setHasHydrated: (status) => set({ hasHydrated: status }),

      setAuth: (data) => {
        // Use refreshToken as accessToken per backend requirements
        const effectiveToken = data.refreshToken || data.accessToken;
        const claims = parseJwtPayload(effectiveToken);
        const jwtRole =
          claims?.role ||
          claims?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        const resolvedRole: AdminRole =
          data.role ||
          (data.roles && data.roles[0]) ||
          (typeof jwtRole === "string" ? (jwtRole as AdminRole) : undefined) ||
          (Array.isArray(jwtRole) ? (jwtRole[0] as AdminRole) : undefined) ||
          "Admin";

        const resolvedRoles: AdminRole[] =
          data.roles && data.roles.length > 0
            ? data.roles
            : Array.isArray(jwtRole)
              ? (jwtRole as AdminRole[])
              : [resolvedRole];

        set((state) => {
          const sessionUser: CurrentAdminSession = {
            id: claims?.nameid || state.user?.id || "",
            email: data.email || claims?.email || state.user?.email || "",
            fullName:
              data.fullName ||
              claims?.unique_name ||
              state.user?.fullName ||
              "Admin",
            role: resolvedRole,
            roles: resolvedRoles,
          };

          return {
            accessToken: effectiveToken,
            refreshToken: data.refreshToken || state.refreshToken || effectiveToken,
            user: sessionUser,
          };
        });
      },

      setAccessToken: (token: string) => {
        const claims = parseJwtPayload(token);
        set((state) => {
          if (!state.user) {
            return {
              accessToken: token,
              refreshToken: token,
            };
          }
          return {
            accessToken: token,
            refreshToken: state.refreshToken || token,
            user: {
              ...state.user,
              id: claims?.nameid || state.user.id,
              email: claims?.email || state.user.email,
            },
          };
        });
      },

      updateCurrentUser: ({ userName, email }) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                fullName: userName,
                email,
              }
            : null,
        })),

      clearAuth: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
        }),
    }),
    {
      name: "egypt-dreams-admin-auth",
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (state.refreshToken && state.accessToken !== state.refreshToken) {
            state.accessToken = state.refreshToken;
          }
          state.setHasHydrated(true);
        }
      },
    }
  )
);

function getEffectiveStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("egypt-dreams-admin-auth");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.state?.refreshToken || parsed?.state?.accessToken || null;
  } catch {
    return null;
  }
}

attachAuthInterceptors(apiClient, {
  getAccessToken: () =>
    useAuthStore.getState().refreshToken ||
    useAuthStore.getState().accessToken ||
    getEffectiveStoredToken(),
  getRefreshToken: () =>
    useAuthStore.getState().refreshToken ||
    useAuthStore.getState().accessToken ||
    getEffectiveStoredToken(),
  onTokenRefreshed: (token) => useAuthStore.getState().setAccessToken(token),
  onAuthFailed: () => {
    useAuthStore.getState().clearAuth();
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      if (path.startsWith("/admin") && path !== "/admin/login") {
        window.location.href = "/admin/login";
      }
    }
  },
});
