import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createPrivateVehicle,
  deletePrivateVehicle,
  getPrivateVehicleAllLanguages,
  getPrivateVehicleById,
  getPrivateVehicles,
  updatePrivateVehicle,
} from "@/clientApi/privateVehiclesApi";
import {
  CreatePrivateVehiclePayload,
  PrivateVehicleApiItem,
  PrivateVehicleMultiLangDetails,
  PrivateVehiclesQueryParams,
  UpdatePrivateVehiclePayload,
} from "@/models/privateVehicle";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

export const PRIVATE_VEHICLES_QUERY_KEYS = {
  all: ["privateVehicles"] as const,
  list: (params?: PrivateVehiclesQueryParams) =>
    ["privateVehicles", "list", params] as const,
  detail: (id: number) => ["privateVehicles", "detail", id] as const,
  multiLang: (id: number) => ["privateVehicles", "multiLang", id] as const,
};

export function usePrivateVehiclesQuery(params?: PrivateVehiclesQueryParams) {
  return useQuery({
    queryKey: PRIVATE_VEHICLES_QUERY_KEYS.list(params),
    queryFn: () => getPrivateVehicles(params),
    staleTime: 0,
  });
}

export function usePrivateVehicleByIdQuery(id: number | null, enabled = true) {
  return useQuery({
    queryKey: id
      ? PRIVATE_VEHICLES_QUERY_KEYS.detail(id)
      : ["privateVehicles", "detail", "none"],
    queryFn: () =>
      id ? getPrivateVehicleById(id) : Promise.reject("No id provided"),
    enabled: Boolean(enabled && id),
    staleTime: 0,
  });
}

export function usePrivateVehicleMultiLangQuery(
  id: number | null,
  enabled = true
) {
  return useQuery<PrivateVehicleMultiLangDetails>({
    queryKey: id
      ? PRIVATE_VEHICLES_QUERY_KEYS.multiLang(id)
      : ["privateVehicles", "multiLang", "none"],
    queryFn: () =>
      id ? getPrivateVehicleAllLanguages(id) : Promise.reject("No id provided"),
    enabled: Boolean(enabled && id),
    staleTime: 0,
  });
}

export function useCreatePrivateVehicleMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    PrivateVehicleApiItem,
    unknown,
    CreatePrivateVehiclePayload
  >({
    mutationFn: (payload) => createPrivateVehicle(payload),
    onSuccess: (data) => {
      toast.success(`Vehicle "${data.name}" added successfully.`);
      queryClient.invalidateQueries({
        queryKey: PRIVATE_VEHICLES_QUERY_KEYS.all,
      });
    },
    onError: (err) => {
      toast.error(
        extractErrorMessage(err, "Failed to create private vehicle.")
      );
    },
  });
}

export function useUpdatePrivateVehicleMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    PrivateVehicleApiItem,
    unknown,
    UpdatePrivateVehiclePayload
  >({
    mutationFn: (payload) => updatePrivateVehicle(payload),
    onSuccess: (data) => {
      toast.success(`Vehicle "${data.name}" updated successfully.`);
      queryClient.invalidateQueries({
        queryKey: PRIVATE_VEHICLES_QUERY_KEYS.all,
      });
    },
    onError: (err) => {
      toast.error(
        extractErrorMessage(err, "Failed to update private vehicle.")
      );
    },
  });
}

export function useDeletePrivateVehicleMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, number>({
    mutationFn: (id) => deletePrivateVehicle(id),
    onSuccess: () => {
      toast.success("Private vehicle deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: PRIVATE_VEHICLES_QUERY_KEYS.all,
      });
    },
    onError: (err) => {
      toast.error(
        extractErrorMessage(err, "Failed to delete private vehicle.")
      );
    },
  });
}
