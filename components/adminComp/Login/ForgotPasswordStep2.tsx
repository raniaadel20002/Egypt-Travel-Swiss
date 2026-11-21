import { useState } from "react";
import { FiKey, FiLock, FiEye, FiEyeOff, FiRefreshCw } from "react-icons/fi";
import PasswordCriteriaChecklist from "./PasswordCriteriaChecklist";

interface ForgotPasswordStep2Props {
  otp: string;
  onOtpChange: (value: string) => void;
  newPassword: string;
  onNewPasswordChange: (value: string) => void;
  confirmPassword: string;
  onConfirmPasswordChange: (value: string) => void;
  isLoading: boolean;
  resendCooldown: number;
  onResend: () => void;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ForgotPasswordStep2({
  otp,
  onOtpChange,
  newPassword,
  onNewPasswordChange,
  confirmPassword,
  onConfirmPasswordChange,
  isLoading,
  resendCooldown,
  onResend,
  onCancel,
  onSubmit,
}: ForgotPasswordStep2Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const hasMinLength = newPassword.length >= 8;
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasLower = /[a-z]/.test(newPassword);
  const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;
  const isPasswordValid = hasMinLength && hasUpper && hasLower && hasSpecial && passwordsMatch;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#013E51]">
          6-Digit OTP Code *
        </label>
        <div className="relative">
          <input
            type="text"
            required
            maxLength={6}
            value={otp}
            onChange={(e) => onOtpChange(e.target.value.replace(/\D/g, ""))}
            placeholder="123456"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-base tracking-[0.25em] text-[#013E51] font-mono font-bold placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
          />
          <FiKey className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#013E51]">
          New Password *
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            value={newPassword}
            onChange={(e) => onNewPasswordChange(e.target.value)}
            placeholder="At least 8 characters"
            className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
          />
          <FiLock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#013E51] p-1.5 cursor-pointer"
          >
            {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#013E51]">
          Confirm New Password *
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            required
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
            placeholder="Re-enter new password"
            className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-sm text-[#013E51] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
          />
          <FiLock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#013E51] p-1.5 cursor-pointer"
          >
            {showConfirmPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <PasswordCriteriaChecklist
        hasMinLength={hasMinLength}
        hasUpper={hasUpper}
        hasLower={hasLower}
        hasSpecial={hasSpecial}
        passwordsMatch={passwordsMatch}
        hasConfirmField={confirmPassword.length > 0}
      />

      <div className="flex items-center justify-between text-xs pt-1">
        <button
          type="button"
          disabled={resendCooldown > 0 || isLoading}
          onClick={onResend}
          className="inline-flex items-center gap-1.5 text-[#013E51] hover:text-[#E8B34A] disabled:opacity-50 cursor-pointer"
        >
          <FiRefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>{resendCooldown > 0 ? `Resend Code (${resendCooldown}s)` : "Resend Code"}</span>
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-[#013E51] cursor-pointer"
        >
          Cancel
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading || !isPasswordValid || otp.length !== 6}
        className="w-full py-3.5 rounded-xl bg-[#013E51] hover:bg-[#025670] text-white font-[family-name:var(--font-lato)] font-bold text-sm tracking-wide shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{isLoading ? "Updating Password..." : "Reset Password"}</span>
      </button>
    </form>
  );
}
