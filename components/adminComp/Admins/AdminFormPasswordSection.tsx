import { useState } from "react";
import { FiCheck, FiEye, FiEyeOff, FiLock, FiX } from "react-icons/fi";
import { validatePasswordStrength } from "./adminHelpers";

interface AdminFormPasswordSectionProps {
  password: string;
  onPasswordChange: (value: string) => void;
}

export default function AdminFormPasswordSection({
  password,
  onPasswordChange,
}: AdminFormPasswordSectionProps) {
  const [showPassword, setShowPassword] = useState(false);
  const pwdChecks = validatePasswordStrength(password);

  return (
    <div className="space-y-2 pt-1">
      <div className="space-y-1">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#013E51]">
          Password *
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder="Strong administrator password"
            className="w-full pl-9 pr-11 py-2.5 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-xs sm:text-sm text-[#013E51] focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
          />
          <FiLock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#013E51] p-1 cursor-pointer"
          >
            {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-[11px] text-gray-600 grid grid-cols-2 gap-1">
        <div className={`flex items-center gap-1.5 ${pwdChecks.hasMinLength ? "text-emerald-700" : "text-gray-400"}`}>
          {pwdChecks.hasMinLength ? <FiCheck className="w-3.5 h-3.5" /> : <FiX className="w-3.5 h-3.5" />}
          <span>8+ chars</span>
        </div>
        <div className={`flex items-center gap-1.5 ${pwdChecks.hasUpper ? "text-emerald-700" : "text-gray-400"}`}>
          {pwdChecks.hasUpper ? <FiCheck className="w-3.5 h-3.5" /> : <FiX className="w-3.5 h-3.5" />}
          <span>Uppercase (A-Z)</span>
        </div>
        <div className={`flex items-center gap-1.5 ${pwdChecks.hasLower ? "text-emerald-700" : "text-gray-400"}`}>
          {pwdChecks.hasLower ? <FiCheck className="w-3.5 h-3.5" /> : <FiX className="w-3.5 h-3.5" />}
          <span>Lowercase (a-z)</span>
        </div>
        <div className={`flex items-center gap-1.5 ${pwdChecks.hasSpecial ? "text-emerald-700" : "text-gray-400"}`}>
          {pwdChecks.hasSpecial ? <FiCheck className="w-3.5 h-3.5" /> : <FiX className="w-3.5 h-3.5" />}
          <span>Special char</span>
        </div>
      </div>
    </div>
  );
}
