import { useMutation } from "@tanstack/react-query";
import {
  loginAdmin,
  forgotPasswordAdmin,
  resetPasswordAdmin,
  updateAdminPassword,
  logoutAdmin,
} from "@/clientApi/authApi";
import { useAuthStore } from "./useAuthStore";
import {
  LoginRequestDto,
  ResetPasswordRequestDto,
  UpdatePasswordRequestDto,
} from "@/models/auth";

export function useLoginMutation() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (payload: LoginRequestDto) => loginAdmin(payload),
    onSuccess: (response, variables) => {
      if (response?.data?.accessToken) {
        setAuth({
          ...response.data,
          email: variables.email,
        });
      }
    },
  });
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: (email: string) => forgotPasswordAdmin(email),
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: (payload: ResetPasswordRequestDto) => resetPasswordAdmin(payload),
  });
}

export function useUpdatePasswordMutation() {
  return useMutation({
    mutationFn: ({
      adminId,
      payload,
    }: {
      adminId: number | string;
      payload: UpdatePasswordRequestDto;
    }) => updateAdminPassword(adminId, payload),
  });
}

export function useLogoutMutation() {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const refreshToken = useAuthStore((state) => state.refreshToken);

  return useMutation({
    mutationFn: async () => {
      if (refreshToken) {
        try {
          await logoutAdmin(refreshToken);
        } catch {
          // Proceed with client side cleanup even if backend token invalidation times out
        }
      }
    },
    onSettled: () => {
      clearAuth();
    },
  });
}
