import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createVehicleTypeTransfer,
  deleteVehicleTypeTransfer,
  getVehicleTypeTransferAllLanguages,
  getVehicleTypeTransfers,
  matchVehicleTypeTransfer,
  updateVehicleTypeTransfer,
} from "@/clientApi/transferServiceApi";
import {
  CreateVehicleTypeTransferPayload,
  TransferServiceQueryParams,
  UpdateVehicleTypeTransferPayload,
} from "@/models/transferService";

export const VEHICLE_TRANSFERS_QUERY_KEYS = {
  all: ["vehicleTypeTransfers"] as const,
  list: (params?: TransferServiceQueryParams) =>
    ["vehicleTypeTransfers", "list", params] as const,
  multiLang: (id: string) =>
    ["vehicleTypeTransfers", "multiLang", id] as const,
  match: (persons: number, language?: string) =>
    ["vehicleTypeTransfers", "match", persons, language] as const,
};

export function useVehicleTypeTransfersQuery(
  params?: TransferServiceQueryParams
) {
  return useQuery({
    queryKey: VEHICLE_TRANSFERS_QUERY_KEYS.list(params),
    queryFn: () => getVehicleTypeTransfers(params),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export function useVehicleTypeTransferMultiLangQuery(
  id: string | null,
  enabled = true
) {
  return useQuery({
    queryKey: id
      ? VEHICLE_TRANSFERS_QUERY_KEYS.multiLang(id)
      : ["vehicleTypeTransfers", "multiLang", "none"],
    queryFn: () => (id ? getVehicleTypeTransferAllLanguages(id) : Promise.reject("No id")),
    enabled: Boolean(enabled && id),
    staleTime: 0,
  });
}

export function useMatchVehicleTypeTransferQuery(
  persons: number,
  language?: string,
  enabled = true
) {
  return useQuery({
    queryKey: VEHICLE_TRANSFERS_QUERY_KEYS.match(persons, language),
    queryFn: () => matchVehicleTypeTransfer(persons, language),
    enabled: Boolean(enabled && persons > 0),
    staleTime: 1000 * 60 * 10,
  });
}

export function useCreateVehicleTypeTransferMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateVehicleTypeTransferPayload) =>
      createVehicleTypeTransfer(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: VEHICLE_TRANSFERS_QUERY_KEYS.all,
      });
      queryClient.invalidateQueries({
        queryKey: ["transferVehiclePrices"],
      });
      queryClient.invalidateQueries({
        queryKey: ["transfers"],
      });
    },
  });
}

export function useUpdateVehicleTypeTransferMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateVehicleTypeTransferPayload) =>
      updateVehicleTypeTransfer(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: VEHICLE_TRANSFERS_QUERY_KEYS.all,
      });
      queryClient.invalidateQueries({
        queryKey: ["transferVehiclePrices"],
      });
      queryClient.invalidateQueries({
        queryKey: ["transfers"],
      });
    },
  });
}

export function useDeleteVehicleTypeTransferMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteVehicleTypeTransfer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: VEHICLE_TRANSFERS_QUERY_KEYS.all,
      });
      queryClient.invalidateQueries({
        queryKey: ["transferVehiclePrices"],
      });
      queryClient.invalidateQueries({
        queryKey: ["transfers"],
      });
    },
  });
}
