import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "@/clientApi/adminsApi";
import {
  AdminsQueryParams,
  CreateAdminPayload,
  UpdateAdminPayload,
} from "@/models/admin";

export const ADMINS_QUERY_KEYS = {
  all: ["admins"] as const,
  lists: () => [...ADMINS_QUERY_KEYS.all, "list"] as const,
  list: (params?: AdminsQueryParams) =>
    [...ADMINS_QUERY_KEYS.lists(), params] as const,
  details: () => [...ADMINS_QUERY_KEYS.all, "detail"] as const,
  detail: (id: number | string) =>
    [...ADMINS_QUERY_KEYS.details(), String(id)] as const,
};

export function useAdminsQuery(
  params?: AdminsQueryParams,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ADMINS_QUERY_KEYS.list(params),
    queryFn: () => getAdmins(params),
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
    enabled: options?.enabled !== false,
  });
}

export function useAdminDetailsQuery(
  id: number | string | null | undefined,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ADMINS_QUERY_KEYS.detail(id || ""),
    queryFn: () => getAdminById(id!),
    enabled: Boolean(id) && options?.enabled !== false,
    staleTime: 1000 * 60 * 3,
  });
}

export function useCreateAdminMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAdminPayload) => createAdmin(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMINS_QUERY_KEYS.all });
    },
  });
}

export function useUpdateAdminMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateAdminPayload) => updateAdmin(payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ADMINS_QUERY_KEYS.all });
      queryClient.invalidateQueries({
        queryKey: ADMINS_QUERY_KEYS.detail(variables.id),
      });
    },
  });
}

export function useDeleteAdminMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => deleteAdmin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMINS_QUERY_KEYS.all });
    },
  });
}
