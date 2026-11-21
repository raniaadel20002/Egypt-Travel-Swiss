import { FiCheck, FiX } from "react-icons/fi";

interface PasswordCriteriaChecklistProps {
  hasMinLength: boolean;
  hasUpper: boolean;
  hasLower: boolean;
  hasSpecial: boolean;
  passwordsMatch?: boolean;
  hasConfirmField?: boolean;
}

export default function PasswordCriteriaChecklist({
  hasMinLength,
  hasUpper,
  hasLower,
  hasSpecial,
  passwordsMatch,
  hasConfirmField,
}: PasswordCriteriaChecklistProps) {
  return (
    <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-[11px] space-y-1 text-gray-600">
      <span className="font-bold text-[#013E51] block mb-1">
        Security Criteria
      </span>
      <div className="grid grid-cols-2 gap-1">
        <div
          className={`flex items-center gap-1.5 ${
            hasMinLength ? "text-emerald-700" : "text-gray-400"
          }`}
        >
          {hasMinLength ? (
            <FiCheck className="w-3.5 h-3.5" />
          ) : (
            <FiX className="w-3.5 h-3.5" />
          )}
          <span>8+ Characters</span>
        </div>
        <div
          className={`flex items-center gap-1.5 ${
            hasUpper ? "text-emerald-700" : "text-gray-400"
          }`}
        >
          {hasUpper ? (
            <FiCheck className="w-3.5 h-3.5" />
          ) : (
            <FiX className="w-3.5 h-3.5" />
          )}
          <span>Uppercase (A-Z)</span>
        </div>
        <div
          className={`flex items-center gap-1.5 ${
            hasLower ? "text-emerald-700" : "text-gray-400"
          }`}
        >
          {hasLower ? (
            <FiCheck className="w-3.5 h-3.5" />
          ) : (
            <FiX className="w-3.5 h-3.5" />
          )}
          <span>Lowercase (a-z)</span>
        </div>
        <div
          className={`flex items-center gap-1.5 ${
            hasSpecial ? "text-emerald-700" : "text-gray-400"
          }`}
        >
          {hasSpecial ? (
            <FiCheck className="w-3.5 h-3.5" />
          ) : (
            <FiX className="w-3.5 h-3.5" />
          )}
          <span>Special Char</span>
        </div>
      </div>
      {hasConfirmField && (
        <div
          className={`flex items-center gap-1.5 pt-1 ${
            passwordsMatch ? "text-emerald-700" : "text-red-600"
          }`}
        >
          {passwordsMatch ? (
            <FiCheck className="w-3.5 h-3.5" />
          ) : (
            <FiX className="w-3.5 h-3.5" />
          )}
          <span>
            {passwordsMatch ? "Passwords Match" : "Passwords Do Not Match"}
          </span>
        </div>
      )}
    </div>
  );
}
