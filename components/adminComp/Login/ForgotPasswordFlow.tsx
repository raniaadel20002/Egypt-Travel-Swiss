"use client";

import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { toast } from "sonner";
import { forgotPasswordAdmin, resetPasswordAdmin } from "@/clientApi/authApi";
import ForgotPasswordStep1 from "./ForgotPasswordStep1";
import ForgotPasswordStep2 from "./ForgotPasswordStep2";

interface ForgotPasswordFlowProps {
  initialEmail?: string;
  onBackToLogin: () => void;
  onResetSuccess: () => void;
}

export default function ForgotPasswordFlow({
  initialEmail = "",
  onBackToLogin,
  onResetSuccess,
}: ForgotPasswordFlowProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const startCooldown = () => {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      await forgotPasswordAdmin(trimmed);
      toast.success("A 6-digit verification code was sent to your email.");
      setStep(2);
      startCooldown();
    } catch (err: unknown) {
      const errObj = err as {
        response?: { status?: number; data?: { Message?: string; message?: string } };
      };
      const status = errObj.response?.status;
      const msg =
        errObj.response?.data?.Message ||
        errObj.response?.data?.message ||
        "Failed to request password reset code.";

      if (status === 400) {
        toast.error(msg);
      } else if (status === 500) {
        toast.error(
          "Server mail delivery error. If you already have a 6-digit code, click below to enter it."
        );
      } else {
        toast.error(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanOtp = otp.trim();
    if (cleanOtp.length !== 6 || !/^\d{6}$/.test(cleanOtp)) {
      toast.error("Please enter a valid 6-digit numeric OTP code.");
      return;
    }

    setIsLoading(true);
    try {
      await resetPasswordAdmin({
        token: cleanOtp,
        newPassword,
      });
      toast.success("Password reset successfully. You can now sign in.");
      onResetSuccess();
    } catch (err: unknown) {
      const errObj = err as {
        response?: { data?: { Message?: string; message?: string } };
      };
      const msg =
        errObj.response?.data?.Message ||
        errObj.response?.data?.message ||
        "Failed to reset password. Please verify the 6-digit code.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || !email.trim()) return;
    setIsLoading(true);
    try {
      await forgotPasswordAdmin(email.trim());
      toast.success("New 6-digit code sent.");
      startCooldown();
    } catch {
      toast.error("Failed to resend code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <button
          type="button"
          onClick={step === 2 ? () => setStep(1) : onBackToLogin}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#013E51] hover:text-[#E8B34A] mb-3 transition cursor-pointer"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>{step === 2 ? "Change Email" : "Back to Sign In"}</span>
        </button>
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8B34A] block mb-1">
          {step === 1 ? "Step 1 of 2: Verify Email" : "Step 2 of 2: Reset Password"}
        </span>
        <h2 className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-bold text-[#013E51]">
          {step === 1 ? "Forgot Password" : "Enter Verification Code"}
        </h2>
        <p className="font-[family-name:var(--font-lato)] text-xs sm:text-sm text-[#888888] mt-1">
          {step === 1
            ? "Enter your registered administrator email to receive a 6-digit verification code."
            : `Enter the 6-digit code sent to ${email || "your email"} and set a new password.`}
        </p>
      </div>

      {step === 1 ? (
        <ForgotPasswordStep1
          email={email}
          isLoading={isLoading}
          onEmailChange={setEmail}
          onSubmit={handleRequestOtp}
          onJumpToStep2={() => setStep(2)}
        />
      ) : (
        <ForgotPasswordStep2
          otp={otp}
          onOtpChange={setOtp}
          newPassword={newPassword}
          onNewPasswordChange={setNewPassword}
          confirmPassword={confirmPassword}
          onConfirmPasswordChange={setConfirmPassword}
          isLoading={isLoading}
          resendCooldown={resendCooldown}
          onResend={handleResend}
          onCancel={onBackToLogin}
          onSubmit={handleResetPassword}
        />
      )}
    </div>
  );
}
