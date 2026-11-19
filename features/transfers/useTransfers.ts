import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTransferFromLocations,
  getTransferToLocations,
  getVehicleTypeTransfers,
  getTransferVehiclePrices,
  previewTransfer,
  createTransferBooking,
  getTransferBookingById,
  getTransferBookingsByCustomer,
} from "@/clientApi/transferApi";
import {
  TransferPreviewRequest,
  CreateTransferBookingRequest,
} from "@/models/transferApi";

export const TRANSFER_QUERY_KEYS = {
  fromLocations: ["transfers", "fromLocations"] as const,
  toLocations: (fromId?: string | number) =>
    ["transfers", "toLocations", fromId] as const,
  vehicleTypes: ["transfers", "vehicleTypes"] as const,
  prices: (fromId?: string | number, toId?: string | number) =>
    ["transfers", "prices", fromId, toId] as const,
  preview: (params: TransferPreviewRequest) =>
    ["transfers", "preview", params] as const,
  booking: (id: string | number) => ["transfers", "booking", id] as const,
  customerBookings: (email: string) =>
    ["transfers", "customerBookings", email] as const,
};

export function useTransferFromLocations() {
  return useQuery({
    queryKey: TRANSFER_QUERY_KEYS.fromLocations,
    queryFn: getTransferFromLocations,
    staleTime: 1000 * 60 * 15,
  });
}

export function useTransferToLocations(fromLocationId?: string | number) {
  return useQuery({
    queryKey: TRANSFER_QUERY_KEYS.toLocations(fromLocationId),
    queryFn: () => getTransferToLocations(fromLocationId),
    staleTime: 1000 * 60 * 15,
  });
}

export function useTransferVehicleTypes() {
  return useQuery({
    queryKey: TRANSFER_QUERY_KEYS.vehicleTypes,
    queryFn: getVehicleTypeTransfers,
    staleTime: 1000 * 60 * 30,
  });
}

export function useTransferPrices(
  fromLocationId?: string | number,
  toLocationId?: string | number
) {
  return useQuery({
    queryKey: TRANSFER_QUERY_KEYS.prices(fromLocationId, toLocationId),
    queryFn: () =>
      getTransferVehiclePrices({ fromLocationId, toLocationId }),
    enabled: Boolean(fromLocationId && toLocationId),
    staleTime: 1000 * 60 * 10,
  });
}

export function useTransferPreview(
  params: TransferPreviewRequest,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: TRANSFER_QUERY_KEYS.preview(params),
    queryFn: () => previewTransfer(params),
    enabled: Boolean(
      enabled &&
        params.fromLocationId &&
        params.toLocationId &&
        params.vehicleTypeId
    ),
  });
}

export function useCreateTransferBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTransferBookingRequest) =>
      createTransferBooking(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["transfers", "customerBookings", data.customerEmail],
      });
    },
  });
}

export function useTransferBookingDetail(id: string | number) {
  return useQuery({
    queryKey: TRANSFER_QUERY_KEYS.booking(id),
    queryFn: () => getTransferBookingById(id),
    enabled: Boolean(id),
  });
}

export function useCustomerTransferBookings(email: string) {
  return useQuery({
    queryKey: TRANSFER_QUERY_KEYS.customerBookings(email),
    queryFn: () => getTransferBookingsByCustomer(email),
    enabled: Boolean(email),
  });
}
