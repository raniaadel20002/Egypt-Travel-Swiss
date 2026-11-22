"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import { useAuthStore, isJwtExpired } from "@/features/auth/useAuthStore";
import AdminSidebar from "./AdminSidebar";

interface AdminShellProps {
  children: React.ReactNode;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function AdminShell({
  children,
  eyebrow,
  title,
  subtitle,
  action,
}: AdminShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { accessToken, hasHydrated, clearAuth } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasHydrated) {
      const isExpired = !accessToken || isJwtExpired(accessToken);
      if (isExpired && pathname.startsWith("/admin") && pathname !== "/admin/login") {
        clearAuth();
        router.replace("/admin/login");
      }
    }
  }, [hasHydrated, accessToken, pathname, router, clearAuth]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [pathname]);

  return (
    <div className="h-screen h-dvh bg-[#FAF7F2] flex overflow-hidden">
      {/* 1. Left Sidebar Navigation */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* 2. Main Workspace Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Mobile Top Bar */}
        <header className="lg:hidden h-16 shrink-0 bg-white border-b border-[#013E51]/10 px-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
            className="p-2 rounded-xl text-[#013E51] hover:bg-gray-100 cursor-pointer"
          >
            <FiMenu className="w-5 h-5" />
          </button>
          <span className="font-[family-name:var(--font-cormorant)] text-lg font-bold text-[#013E51] uppercase tracking-wider">
            Egypt Travel Swiss Admin
          </span>
          <div className="w-9" />
        </header>

        {/* Main Page Workspace Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain"
        >
          <main className="p-5 sm:p-8 lg:p-10 w-full space-y-6 sm:space-y-8 min-h-full">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
              <div>
                {eyebrow && (
                  <span className="font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-[0.22em] text-[#E8B34A] block mb-1.5">
                    {eyebrow}
                  </span>
                )}
                <h1 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#013E51] leading-tight">
                  {title}
                </h1>
                {subtitle && (
                  <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] mt-1 max-w-2xl">
                    {subtitle}
                  </p>
                )}
              </div>

              {action && <div className="shrink-0">{action}</div>}
            </div>

            {/* Children Content */}
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
