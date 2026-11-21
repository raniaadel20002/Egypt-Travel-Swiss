import { FiMail } from "react-icons/fi";

interface ForgotPasswordStep1Props {
  email: string;
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onJumpToStep2: () => void;
}

export default function ForgotPasswordStep1({
  email,
  isLoading,
  onEmailChange,
  onSubmit,
  onJumpToStep2,
}: ForgotPasswordStep1Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#013E51]">
          Administrator Email
        </label>
        <div className="relative">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="admin@example.com"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-sm text-[#013E51] font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51]"
          />
          <FiMail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 rounded-xl bg-[#013E51] hover:bg-[#025670] text-white font-[family-name:var(--font-lato)] font-bold text-sm tracking-wide shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        <span>{isLoading ? "Sending Code..." : "Send 6-Digit Code"}</span>
      </button>

      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={onJumpToStep2}
          className="text-xs font-semibold text-[#013E51] hover:text-[#E8B34A] transition cursor-pointer"
        >
          Already have a 6-digit code? Enter code directly
        </button>
      </div>
    </form>
  );
}
