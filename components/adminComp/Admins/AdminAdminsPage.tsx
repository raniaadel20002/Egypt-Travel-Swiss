"use client";

import { FiShield, FiUserPlus, FiUser, FiCheckCircle } from "react-icons/fi";
import { toast } from "sonner";
import { useAdminAuthStore } from "@/features/admin/useAdminAuthStore";
import AdminShell from "@/components/adminComp/Common/AdminShell";

export default function AdminAdminsPage() {
  const { user } = useAdminAuthStore();

  const handleInvite = () => {
    toast.info("Invite administrator dialog will open here.");
  };

  return (
    <AdminShell
      eyebrow="Access & Security"
      title="System Administrators"
      subtitle="Manage authorized staff, assign portal roles, and review security credentials."
      action={
        <button
          type="button"
          onClick={handleInvite}
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
            onClick={handleInvite}
            className="inline-flex items-center gap-2 bg-[#FAF7F2] hover:bg-[#013E51] text-[#013E51] hover:text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer border border-[#013E51]/10"
          >
            <FiUserPlus className="w-4 h-4" />
            <span>Invite Team Member</span>
          </button>
        </div>
      </div>
    </AdminShell>
  );
}
