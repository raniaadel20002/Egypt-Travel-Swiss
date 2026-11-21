"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiLogOut, FiX, FiUser, FiKey } from "react-icons/fi";
import { useAuthStore, isSuperAdminSession } from "@/features/auth/useAuthStore";
import { useLogoutMutation } from "@/features/auth/useAuthMutations";
import { useModalDismiss } from "@/shared/utils/useModalDismiss";
import { getAdminNavGroups } from "./adminNavConfig";
import ChangePasswordModal from "./ChangePasswordModal";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, accessToken } = useAuthStore();
  const logoutMutation = useLogoutMutation();
  const [mounted, setMounted] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = () => {
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        router.push("/admin/login");
      },
    });
  };

  const isSuperAdmin = mounted ? isSuperAdminSession(user, accessToken) : false;

  const rawGroups = getAdminNavGroups(pathname);
  const navGroups = rawGroups
    .map((group) => {
      if (group.title === "System" && !isSuperAdmin) {
        return null;
      }
      return {
        ...group,
        items: group.items.filter((item) => {
          if (item.href === "/admin/admins" && !isSuperAdmin) {
            return false;
          }
          return true;
        }),
      };
    })
    .filter((g): g is NonNullable<typeof g> => Boolean(g && g.items.length > 0));

  useModalDismiss({ isOpen, onClose });

  return (
    <>
      {isOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-[#01232e]/50 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 h-screen h-dvh bg-white border-r border-[#013E51]/10 flex flex-col justify-between shrink-0 transition-transform duration-300 ease-in-out lg:static lg:h-full lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-[#013E51]/10 bg-white shrink-0">
          <div className="flex items-center justify-between">
            <Link href="/admin/dashboard" className="flex items-center gap-3 group">
              <svg
                width="28"
                height="24"
                viewBox="0 0 36 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="18,0 36,32 0,32" fill="#E8B34A" />
              </svg>
              <div className="flex flex-col leading-tight">
                <span className="font-[family-name:var(--font-cormorant)] text-xl font-bold tracking-[0.12em] text-[#013E51] uppercase">
                  Egypt Dreams
                </span>
                <span className="font-[family-name:var(--font-lato)] text-[9px] font-semibold tracking-[0.28em] text-[#E8B34A] uppercase -mt-0.5">
                  Admin Portal
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="p-1.5 rounded-lg text-[#013E51] hover:bg-gray-100 lg:hidden cursor-pointer"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-3.5 pt-3 border-t border-[#013E51]/5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#013E51]/70">
                ADMIN PORTAL
              </p>
              <p className="text-xs font-bold text-[#013E51] mt-0.5">
                {mounted ? user?.role || "Admin" : "Admin"}
              </p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        <nav className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 space-y-5">
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-1">
              <span className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#888888]">
                {group.title}
              </span>
              <div className="space-y-0.5 pt-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                        item.active
                          ? "bg-[#013E51] text-white shadow-xs"
                          : "text-[#013E51]/80 hover:bg-[#FAF7F2] hover:text-[#013E51]"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          item.active ? "text-[#E8B34A]" : "text-[#013E51]/60"
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-[#013E51]/10 bg-[#FAF7F2]/60 shrink-0 space-y-2">
          <div className="flex items-center gap-3 px-2 py-1.5">
            <div className="w-9 h-9 rounded-full bg-[#013E51] text-white flex items-center justify-center shrink-0">
              <FiUser className="w-4 h-4 text-[#E8B34A]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#013E51] truncate">
                {mounted ? user?.fullName || "Staff Member" : "Staff Member"}
              </p>
              <p className="text-[11px] text-[#888888] truncate">
                {mounted ? user?.email || "" : ""}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(true)}
              className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider text-[#013E51] bg-white hover:bg-gray-50 border border-[#013E51]/10 cursor-pointer"
            >
              <FiKey className="w-3.5 h-3.5 text-[#E8B34A]" />
              <span>Password</span>
            </button>

            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider text-[#013E51] hover:bg-red-50 hover:text-red-700 bg-white border border-[#013E51]/10 cursor-pointer"
            >
              <FiLogOut className="w-3.5 h-3.5 text-red-600" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
}
