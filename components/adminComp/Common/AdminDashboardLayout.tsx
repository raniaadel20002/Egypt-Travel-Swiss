"use client";

import { useState, createContext, useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore, isJwtExpired } from "@/features/auth/useAuthStore";
import AdminSidebar from "./AdminSidebar";

interface AdminSidebarContextValue {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isPersistent: boolean;
}

const AdminSidebarContext = createContext<AdminSidebarContextValue>({
  sidebarOpen: false,
  setSidebarOpen: () => {},
  isPersistent: false,
});

export function useAdminSidebarContext() {
  return useContext(AdminSidebarContext);
}

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { accessToken, hasHydrated, clearAuth } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (hasHydrated) {
      const isExpired = !accessToken || isJwtExpired(accessToken);
      if (isExpired && pathname.startsWith("/admin") && pathname !== "/admin/login") {
        clearAuth();
        router.replace("/admin/login");
      }
    }
  }, [hasHydrated, accessToken, pathname, router, clearAuth]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <AdminSidebarContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        isPersistent: true,
      }}
    >
      <div className="h-screen h-dvh bg-[#FAF7F2] flex overflow-hidden">
        {/* 1. Persistent Left Sidebar Navigation - stays mounted during dashboard navigation */}
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* 2. Main Workspace Container */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {children}
        </div>
      </div>
    </AdminSidebarContext.Provider>
  );
}
