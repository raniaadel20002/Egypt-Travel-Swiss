import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createPrivateVehicleTransfer,
  deletePrivateVehicleTransfer,
  getPrivateVehicleTransferById,
  getPrivateVehicleTransfers,
  matchPrivateVehicleTransfers,
  updatePrivateVehicleTransfer,
} from "@/clientApi/privateVehiclesApi";
import {
  CreatePrivateVehicleTransferPayload,
  PrivateVehicleTransferApiItem,
  PrivateVehicleTransferMatchItem,
  PrivateVehicleTransfersQueryParams,
  UpdatePrivateVehicleTransferPayload,
} from "@/models/privateVehicle";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

export const PRIVATE_TRANSFERS_QUERY_KEYS = {
  all: ["privateVehicleTransfers"] as const,
  list: (params?: PrivateVehicleTransfersQueryParams) =>
    ["privateVehicleTransfers", "list", params] as const,
  detail: (id: number) => ["privateVehicleTransfers", "detail", id] as const,
  match: (tripId: number, persons: number) =>
    ["privateVehicleTransfers", "match", tripId, persons] as const,
};

export function usePrivateVehicleTransfersQuery(
  params?: PrivateVehicleTransfersQueryParams
) {
  return useQuery({
    queryKey: PRIVATE_TRANSFERS_QUERY_KEYS.list(params),
    queryFn: () => getPrivateVehicleTransfers(params),
    staleTime: 0,
  });
}

export function usePrivateVehicleTransferByIdQuery(
  id: number | null,
  enabled = true
) {
  return useQuery({
    queryKey: id
      ? PRIVATE_TRANSFERS_QUERY_KEYS.detail(id)
      : ["privateVehicleTransfers", "detail", "none"],
    queryFn: () =>
      id ? getPrivateVehicleTransferById(id) : Promise.reject("No id provided"),
    enabled: Boolean(enabled && id),
    staleTime: 0,
  });
}

export function useMatchPrivateVehicleTransfersQuery(
  tripId: number | null,
  persons: number,
  enabled = true
) {
  return useQuery<PrivateVehicleTransferMatchItem[]>({
    queryKey:
      tripId && persons > 0
        ? PRIVATE_TRANSFERS_QUERY_KEYS.match(tripId, persons)
        : ["privateVehicleTransfers", "match", "none"],
    queryFn: () =>
      tripId && persons > 0
        ? matchPrivateVehicleTransfers(tripId, persons)
        : Promise.resolve([]),
    enabled: Boolean(enabled && tripId && persons > 0),
    staleTime: 0,
  });
}

export function useCreatePrivateVehicleTransferMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    PrivateVehicleTransferApiItem,
    unknown,
    CreatePrivateVehicleTransferPayload
  >({
    mutationFn: (payload) => createPrivateVehicleTransfer(payload),
    onSuccess: (data) => {
      toast.success(
        `Transfer rate €${data.price} for ${data.vehicleName} added.`
      );
      queryClient.invalidateQueries({
        queryKey: PRIVATE_TRANSFERS_QUERY_KEYS.all,
      });
    },
    onError: (err) => {
      toast.error(
        extractErrorMessage(err, "Failed to save private transfer rate.")
      );
    },
  });
}

export function useUpdatePrivateVehicleTransferMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    PrivateVehicleTransferApiItem,
    unknown,
    UpdatePrivateVehicleTransferPayload
  >({
    mutationFn: (payload) => updatePrivateVehicleTransfer(payload),
    onSuccess: (data) => {
      toast.success(
        `Transfer rate €${data.price} for ${data.vehicleName} updated.`
      );
      queryClient.invalidateQueries({
        queryKey: PRIVATE_TRANSFERS_QUERY_KEYS.all,
      });
    },
    onError: (err) => {
      toast.error(
        extractErrorMessage(err, "Failed to update private transfer rate.")
      );
    },
  });
}

export function useDeletePrivateVehicleTransferMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, number>({
    mutationFn: (id) => deletePrivateVehicleTransfer(id),
    onSuccess: () => {
      toast.success("Private transfer rate removed.");
      queryClient.invalidateQueries({
        queryKey: PRIVATE_TRANSFERS_QUERY_KEYS.all,
      });
    },
    onError: (err) => {
      toast.error(
        extractErrorMessage(err, "Failed to remove private transfer rate.")
      );
    },
  });
}
