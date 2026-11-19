import { useMutation } from "@tanstack/react-query";
import {
  loginAdmin,
  forgotPasswordAdmin,
  logoutAdmin,
} from "@/clientApi/authApi";
import { useAuthStore } from "./useAuthStore";
import { LoginRequestDto } from "@/models/auth";

export function useLoginMutation() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (payload: LoginRequestDto) => loginAdmin(payload),
    onSuccess: (response) => {
      if (response?.data?.accessToken) {
        setAuth(response.data);
      }
    },
  });
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: (email: string) => forgotPasswordAdmin(email),
  });
}

export function useLogoutMutation() {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const refreshToken = useAuthStore((state) => state.refreshToken);

  return useMutation({
    mutationFn: async () => {
      if (refreshToken) {
        await logoutAdmin(refreshToken);
      }
    },
    onSettled: () => {
      clearAuth();
    },
  });
}
