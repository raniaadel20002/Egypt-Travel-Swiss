import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTransferLocation,
  deleteTransferLocation,
  getTransferLocationById,
  getTransferLocations,
  updateTransferLocation,
} from "@/clientApi/transferLocationsApi";
import {
  CreateTransferLocationPayload,
  TransferLocationsQueryParams,
  TransferLocationType,
  UpdateTransferLocationPayload,
} from "@/models/transferLocation";

export const TRANSFER_LOCATIONS_QUERY_KEYS = {
  all: ["transferLocations"] as const,
  list: (type: TransferLocationType, params?: TransferLocationsQueryParams) =>
    ["transferLocations", "list", type, params] as const,
  detail: (type: TransferLocationType, id: string, language?: string) =>
    ["transferLocations", "detail", type, id, language] as const,
};

export function useTransferLocationsQuery(
  type: TransferLocationType,
  params?: TransferLocationsQueryParams
) {
  return useQuery({
    queryKey: TRANSFER_LOCATIONS_QUERY_KEYS.list(type, params),
    queryFn: () => getTransferLocations(type, params),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export function useTransferLocationDetailQuery(
  type: TransferLocationType,
  id: string | null,
  language?: string,
  enabled = true
) {
  return useQuery({
    queryKey: id
      ? TRANSFER_LOCATIONS_QUERY_KEYS.detail(type, id, language)
      : ["transferLocations", "detail", "none"],
    queryFn: () =>
      id
        ? getTransferLocationById(type, id, language)
        : Promise.reject("No id provided"),
    enabled: Boolean(enabled && id),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateTransferLocationMutation(type: TransferLocationType) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTransferLocationPayload) =>
      createTransferLocation(type, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TRANSFER_LOCATIONS_QUERY_KEYS.all,
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

export function useUpdateTransferLocationMutation(type: TransferLocationType) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateTransferLocationPayload) =>
      updateTransferLocation(type, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TRANSFER_LOCATIONS_QUERY_KEYS.all,
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

export function useDeleteTransferLocationMutation(type: TransferLocationType) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTransferLocation(type, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TRANSFER_LOCATIONS_QUERY_KEYS.all,
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
