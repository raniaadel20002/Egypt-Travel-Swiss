"use client";

import { useState } from "react";
import {
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/useAuthStore";
import { updateAdminPassword } from "@/clientApi/authApi";
import { useModalDismiss } from "@/shared/utils/useModalDismiss";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
}: ChangePasswordModalProps) {
  const { user } = useAuthStore();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useModalDismiss({ isOpen, onClose });

  const hasMinLength = newPassword.length >= 8;
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasLower = /[a-z]/.test(newPassword);
  const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;
  const isFormValid =
    oldPassword.length > 0 &&
    hasMinLength &&
    hasUpper &&
    hasLower &&
    hasSpecial &&
    passwordsMatch;

  const handleResetForm = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowOld(false);
    setShowNew(false);
    setShowConfirm(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      toast.error("User session identifier missing. Please re-login.");
      return;
    }

    if (!isFormValid) {
      toast.error("Please satisfy all password security rules.");
      return;
    }

    setIsLoading(true);
    try {
      await updateAdminPassword(user.id, {
        oldPassword,
        newPassword,
      });
      toast.success("Password updated successfully.");
      handleResetForm();
    } catch (err: unknown) {
      const errObj = err as {
        response?: { data?: { Message?: string; message?: string } };
      };
      const msg =
        errObj.response?.data?.Message ||
        errObj.response?.data?.message ||
        "Failed to update password.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Change Password"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#01232e]/60 backdrop-blur-xs"
    >
      <div className="w-full max-w-md bg-white rounded-[28px] p-6 sm:p-8 shadow-2xl border border-[#013E51]/10 space-y-5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8B34A] block mb-1">
            Security Settings
          </span>
          <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#013E51]">
            Change Password
          </h3>
          <p className="font-[family-name:var(--font-lato)] text-xs text-[#888888] mt-1">
            Update your administrator credentials for {user?.email || "this account"}.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#013E51]">
              Current Password *
            </label>
            <div className="relative">
              <input
                type={showOld ? "text" : "password"}
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
              />
              <FiLock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#013E51] p-1 cursor-pointer"
              >
                {showOld ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#013E51]">
              New Password *
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
              />
              <FiLock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#013E51] p-1 cursor-pointer"
              >
                {showNew ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#013E51]">
              Confirm New Password *
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
              />
              <FiLock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#013E51] p-1 cursor-pointer"
              >
                {showConfirm ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-[11px] space-y-1 text-gray-600">
            <span className="font-bold text-[#013E51] block mb-1">Password Requirements</span>
            <div className="grid grid-cols-2 gap-1">
              <div className={`flex items-center gap-1 ${hasMinLength ? "text-emerald-700" : "text-gray-400"}`}>
                {hasMinLength ? <FiCheck className="w-3 h-3" /> : <FiX className="w-3 h-3" />}
                <span>8+ chars</span>
              </div>
              <div className={`flex items-center gap-1 ${hasUpper ? "text-emerald-700" : "text-gray-400"}`}>
                {hasUpper ? <FiCheck className="w-3 h-3" /> : <FiX className="w-3 h-3" />}
                <span>Uppercase (A-Z)</span>
              </div>
              <div className={`flex items-center gap-1 ${hasLower ? "text-emerald-700" : "text-gray-400"}`}>
                {hasLower ? <FiCheck className="w-3 h-3" /> : <FiX className="w-3 h-3" />}
                <span>Lowercase (a-z)</span>
              </div>
              <div className={`flex items-center gap-1 ${hasSpecial ? "text-emerald-700" : "text-gray-400"}`}>
                {hasSpecial ? <FiCheck className="w-3 h-3" /> : <FiX className="w-3 h-3" />}
                <span>Special char</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleResetForm}
              className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-[#013E51] hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="px-5 py-2 rounded-xl bg-[#013E51] hover:bg-[#025670] text-white text-xs font-bold shadow-sm cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? "Saving..." : "Update Password"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
