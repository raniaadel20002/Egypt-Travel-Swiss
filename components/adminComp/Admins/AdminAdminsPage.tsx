"use client";

import { useState } from "react";
import { FiShield, FiUserPlus, FiUser, FiCheckCircle, FiCheck } from "react-icons/fi";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/useAuthStore";
import AdminShell from "@/components/adminComp/Common/AdminShell";
import AdminDrawer from "@/components/adminComp/Common/AdminDrawer";

export default function AdminAdminsPage() {
  const { user } = useAuthStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Admin");

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setFullName("");
    setEmail("");
    setRole("Admin");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Administrator invitation API integration is pending.");
    handleCloseDrawer();
  };

  return (
    <AdminShell
      eyebrow="Access & Security"
      title="System Administrators"
      subtitle="Manage authorized staff, assign portal roles, and review security credentials."
      action={
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="inline-flex items-center gap-2 bg-[#013E51] hover:bg-[#025670] text-white px-5 py-2.5 rounded-xl font-[family-name:var(--font-lato)] text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          <FiUserPlus className="w-4 h-4 text-[#E8B34A]" />
          <span>New Administrator</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Current Active Session Card */}
        <div className="bg-white rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#013E51] text-white flex items-center justify-center shrink-0">
                <FiUser className="w-7 h-7 text-[#E8B34A]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
                    {user?.fullName || "Primary Admin"}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#013E51] bg-[#013E51]/10 px-2.5 py-0.5 rounded-full">
                    <FiCheckCircle className="w-3 h-3 text-[#013E51]" />
                    Active Session
                  </span>
                </div>
                <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888]">
                  {user?.email || "admin@egyptdreams.com"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="px-3.5 py-1.5 rounded-xl bg-[#E8B34A]/15 text-[#013E51] text-xs font-bold uppercase tracking-wider">
                {user?.role || "SuperAdmin"}
              </span>
            </div>
          </div>

          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-[#888888]">
            <div className="p-3.5 rounded-xl bg-[#FAF7F2]/60 border border-[#013E51]/5">
              <span className="text-gray-400 block mb-1">Access Level</span>
              <span className="font-bold text-[#013E51] text-sm">Full Portal Control</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FAF7F2]/60 border border-[#013E51]/5">
              <span className="text-gray-400 block mb-1">Authentication</span>
              <span className="font-bold text-[#013E51] text-sm">Secure JWT Token</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FAF7F2]/60 border border-[#013E51]/5">
              <span className="text-gray-400 block mb-1">Status</span>
              <span className="font-bold text-emerald-700 text-sm">Authenticated</span>
            </div>
          </div>
        </div>

        {/* Empty Secondary Operators Placeholder */}
        <div className="bg-white rounded-[24px] sm:rounded-[28px] p-8 sm:p-12 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.04)] border border-[#013E51]/10 text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-[#013E51]/5 text-[#013E51] flex items-center justify-center mb-3">
            <FiShield className="w-6 h-6 text-[#013E51]" />
          </div>
          <h3 className="font-[family-name:var(--font-cormorant)] text-xl sm:text-2xl font-bold text-[#013E51]">
            No Delegated Staff Accounts
          </h3>
          <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] max-w-md mt-1 mb-5">
            You are operating under the primary administrative account. Invite additional managers or team members to delegate reservations.
          </p>
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="inline-flex items-center gap-2 bg-[#FAF7F2] hover:bg-[#013E51] text-[#013E51] hover:text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer border border-[#013E51]/10"
          >
            <FiUserPlus className="w-4 h-4" />
            <span>Invite Team Member</span>
          </button>
        </div>

        <AdminDrawer
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          eyebrow="Access & Security"
          title="New Administrator"
          subtitle="Invite a staff operator and assign portal access permissions."
          footer={
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseDrawer}
                className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-bold uppercase tracking-wider text-[#013E51] hover:bg-[#FAF7F2] transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="admin-drawer-form"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#013E51] hover:bg-[#025670] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
              >
                <FiCheck className="w-4 h-4 text-[#E8B34A]" />
                <span>Send Invitation</span>
              </button>
            </div>
          }
        >
          <form id="admin-drawer-form" onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Nadia Hassan"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="staff@egyptdreams.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
                Portal Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
              >
                <option value="Admin">Admin</option>
                <option value="SuperAdmin">SuperAdmin</option>
              </select>
            </div>
          </form>
        </AdminDrawer>
      </div>
    </AdminShell>
  );
}
