"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/useAuthStore";
import { loginAdmin } from "@/clientApi/authApi";
import AdminBrandingPanel from "./AdminBrandingPanel";
import ForgotPasswordFlow from "./ForgotPasswordFlow";

export default function AdminLoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotMode, setIsForgotMode] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginAdmin({
        email: trimmedEmail,
        password,
      });

      if (response?.data?.accessToken || response?.data?.refreshToken) {
        setAuth({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          email: response.data.email || trimmedEmail,
          fullName: response.data.fullName || trimmedEmail.split("@")[0],
          role: response.data.role || "Admin",
        });
        toast.success("Signed in successfully");
        router.push("/admin/dashboard");
        return;
      }

      toast.error("Invalid response from server.");
    } catch (apiError: unknown) {
      const errObj = apiError as {
        response?: {
          status?: number;
          data?: { Message?: string; message?: string };
        };
      };
      const msg =
        errObj?.response?.data?.Message ||
        errObj?.response?.data?.message ||
        "Invalid email or password.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#FAF7F2]">
      {/* 1. Left Section: Visual Branding Panel */}
      <AdminBrandingPanel />

      {/* 2. Right Section: Login Card Area */}
      <section className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-16 bg-[#F8FAFC]">
        <div className="w-full max-w-md bg-white rounded-[28px] sm:rounded-[34px] p-7 sm:p-10 shadow-[0px_10px_35px_rgba(1,62,81,0.06)] border border-[#013E51]/10">
          {!isForgotMode ? (
            <>
              {/* Card Header */}
              <div className="mb-6 sm:mb-8">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#013E51] block mb-1.5">
                  Welcome Back
                </span>
                <h2 className="font-[family-name:var(--font-cormorant)] text-3xl sm:text-4xl font-bold text-[#013E51]">
                  Sign in
                </h2>
                <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] mt-1.5">
                  Use your administrator credentials to access the portal.
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-sm text-[#013E51] font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51] transition"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-semibold text-[#013E51]">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-4 pr-11 py-3 rounded-xl border border-gray-200 bg-[#FAF7F2]/50 text-sm text-[#013E51] font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013E51]/20 focus:border-[#013E51] transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#013E51] p-1.5 transition cursor-pointer"
                    >
                      {showPassword ? (
                        <FiEyeOff className="w-4 h-4" />
                      ) : (
                        <FiEye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end pt-0.5">
                  <button
                    type="button"
                    onClick={() => setIsForgotMode(true)}
                    className="text-xs sm:text-sm font-semibold text-[#013E51] hover:text-[#E8B34A] transition cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 sm:py-4 rounded-xl bg-[#013E51] hover:bg-[#025670] active:scale-[0.99] text-white font-[family-name:var(--font-lato)] font-bold text-sm sm:text-base tracking-wide shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiLogIn className="w-4 h-4" />
                  <span>{isLoading ? "Signing in..." : "Sign In"}</span>
                </button>
              </form>
            </>
          ) : (
            <ForgotPasswordFlow
              initialEmail={email}
              onBackToLogin={() => setIsForgotMode(false)}
              onResetSuccess={() => {
                setIsForgotMode(false);
                setPassword("");
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
}
