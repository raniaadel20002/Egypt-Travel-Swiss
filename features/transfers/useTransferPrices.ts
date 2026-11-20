import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTransferVehiclePrice,
  deleteTransferVehiclePrice,
  getTransferVehiclePriceById,
  getTransferVehiclePrices,
  updateTransferVehiclePrice,
} from "@/clientApi/transferServiceApi";
import {
  CreateTransferVehiclePricePayload,
  TransferServiceQueryParams,
  UpdateTransferVehiclePricePayload,
} from "@/models/transferService";

export const TRANSFER_PRICES_QUERY_KEYS = {
  all: ["transferVehiclePrices"] as const,
  list: (params?: TransferServiceQueryParams) =>
    ["transferVehiclePrices", "list", params] as const,
  detail: (id: string, language?: string) =>
    ["transferVehiclePrices", "detail", id, language] as const,
};

export function useTransferVehiclePricesQuery(
  params?: TransferServiceQueryParams
) {
  return useQuery({
    queryKey: TRANSFER_PRICES_QUERY_KEYS.list(params),
    queryFn: () => getTransferVehiclePrices(params),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export function useTransferVehiclePriceDetailQuery(
  id: string | null,
  language?: string,
  enabled = true
) {
  return useQuery({
    queryKey: id
      ? TRANSFER_PRICES_QUERY_KEYS.detail(id, language)
      : ["transferVehiclePrices", "detail", "none"],
    queryFn: () =>
      id
        ? getTransferVehiclePriceById(id, language)
        : Promise.reject("No id provided"),
    enabled: Boolean(enabled && id),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateTransferVehiclePriceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTransferVehiclePricePayload) =>
      createTransferVehiclePrice(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TRANSFER_PRICES_QUERY_KEYS.all,
      });
      queryClient.invalidateQueries({
        queryKey: ["transfers"],
      });
    },
  });
}

export function useUpdateTransferVehiclePriceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateTransferVehiclePricePayload) =>
      updateTransferVehiclePrice(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TRANSFER_PRICES_QUERY_KEYS.all,
      });
      queryClient.invalidateQueries({
        queryKey: ["transfers"],
      });
    },
  });
}

export function useDeleteTransferVehiclePriceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTransferVehiclePrice(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TRANSFER_PRICES_QUERY_KEYS.all,
      });
      queryClient.invalidateQueries({
        queryKey: ["transfers"],
      });
    },
  });
}
