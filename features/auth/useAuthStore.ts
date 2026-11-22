"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiClient } from "@/clientApi/apiConfig";
import { attachAuthInterceptors } from "@/clientApi/authApi";
import { AdminRole, AuthTokenData, CurrentAdminSession } from "@/models/auth";
import { parseJwtPayload, isJwtExpired } from "@/shared/utils/jwt";

export { isJwtExpired, parseJwtPayload };

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
      claims?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
      claims?.role;
    if (Array.isArray(jwtRole) && jwtRole.includes("SuperAdmin")) {
      return true;
    }
    if (typeof jwtRole === "string" && jwtRole.toLowerCase() === "superadmin") {
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
  updateCurrentUser: (info: Partial<CurrentAdminSession>) => void;
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
        const primaryToken = data.accessToken || data.refreshToken || "";
        const claims = parseJwtPayload(primaryToken);
        const jwtRole =
          claims?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
          claims?.role;

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

        const resolvedId =
          claims?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ||
          claims?.nameid ||
          "";

        const resolvedEmail =
          data.email ||
          claims?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] ||
          claims?.email ||
          "";

        const resolvedPhone =
          claims?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"] ||
          "";

        const resolvedFullName =
          data.fullName ||
          claims?.unique_name ||
          (resolvedEmail ? resolvedEmail.split("@")[0] : "Admin");

        const sessionUser: CurrentAdminSession = {
          id: resolvedId,
          email: resolvedEmail,
          fullName: resolvedFullName,
          role: resolvedRole,
          roles: resolvedRoles,
          phone: resolvedPhone,
        };

        set({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken || null,
          user: sessionUser,
        });
      },

      setAccessToken: (token: string) => {
        const claims = parseJwtPayload(token);
        set((state) => {
          if (!state.user) {
            return { accessToken: token };
          }
          return {
            accessToken: token,
            user: {
              ...state.user,
              id:
                claims?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ||
                claims?.nameid ||
                state.user.id,
              email:
                claims?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] ||
                claims?.email ||
                state.user.email,
            },
          };
        });
      },

      updateCurrentUser: (info) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...info } : null,
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
          state.setHasHydrated(true);
        }
      },
    }
  )
);

function getEffectiveStoredToken(key: "accessToken" | "refreshToken"): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("egypt-dreams-admin-auth");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.state?.[key] || null;
  } catch {
    return null;
  }
}

attachAuthInterceptors(apiClient, {
  getAccessToken: () =>
    useAuthStore.getState().accessToken ||
    getEffectiveStoredToken("accessToken") ||
    useAuthStore.getState().refreshToken ||
    getEffectiveStoredToken("refreshToken"),
  getRefreshToken: () =>
    useAuthStore.getState().refreshToken ||
    getEffectiveStoredToken("refreshToken"),
  onTokenRefreshed: (token) => useAuthStore.getState().setAccessToken(token),
  onAuthFailed: () => {
    useAuthStore.getState().clearAuth();
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      if (path.startsWith("/admin") && path !== "/admin/login") {
        window.location.replace("/admin/login");
      }
    }
  },
});
