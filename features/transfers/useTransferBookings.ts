import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  completeTransferBooking,
  createTransferBookingRecord,
  getTransferBookingDetail,
  getTransferBookingsByCustomerEmail,
  getTransferBookingsByStatusList,
  getTransferBookingsList,
  matchTransferVehicle,
  previewTransferPrice,
  updateTransferBookingStatus,
} from "@/clientApi/transferBookingsApi";
import {
  CompleteTransferBookingPayload,
  CreateTransferBookingPayload,
  TransferBookingApiItem,
  TransferBookingsQueryParams,
  TransferMatchPayload,
  TransferPreviewPayload,
  UpdateTransferBookingStatusPayload,
} from "@/models/transferBooking";

export const TRANSFER_BOOKINGS_QUERY_KEY = ["transferBookings"] as const;

export function useTransferBookingsQuery(params: TransferBookingsQueryParams) {
  const { status, email, pageNumber = 1, pageSize = 10 } = params;

  return useQuery<TransferBookingApiItem[]>({
    queryKey: [...TRANSFER_BOOKINGS_QUERY_KEY, { status, email, pageNumber, pageSize }],
    queryFn: async () => {
      if (email && email.trim() !== "") {
        return getTransferBookingsByCustomerEmail(email.trim(), {
          pageNumber,
          pageSize,
        });
      }
      if (status !== undefined) {
        return getTransferBookingsByStatusList(status, {
          pageNumber,
          pageSize,
        });
      }
      return getTransferBookingsList({ pageNumber, pageSize });
    },
  });
}

export function useTransferBookingDetailQuery(id?: string) {
  return useQuery<TransferBookingApiItem>({
    queryKey: [...TRANSFER_BOOKINGS_QUERY_KEY, "detail", id],
    queryFn: () => getTransferBookingDetail(id!),
    enabled: Boolean(id),
  });
}

export function useCreateTransferBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTransferBookingPayload) =>
      createTransferBookingRecord(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSFER_BOOKINGS_QUERY_KEY });
    },
  });
}

export function useUpdateTransferBookingStatusMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateTransferBookingStatusPayload) =>
      updateTransferBookingStatus(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSFER_BOOKINGS_QUERY_KEY });
    },
  });
}

export function useCompleteTransferBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      bookingId,
      payload,
    }: {
      bookingId: string;
      payload: CompleteTransferBookingPayload;
    }) => completeTransferBooking(bookingId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSFER_BOOKINGS_QUERY_KEY });
    },
  });
}

export function useTransferPreviewQuery(
  payload: TransferPreviewPayload | null,
  language?: string
) {
  return useQuery({
    queryKey: ["transferPreview", payload, language],
    queryFn: () => previewTransferPrice(payload!, language),
    enabled: Boolean(
      payload &&
        payload.fromLocationId &&
        payload.toLocationId &&
        payload.adults > 0
    ),
    staleTime: 1000 * 30,
  });
}

export function useTransferMatchQuery(
  payload: TransferMatchPayload | null,
  language?: string
) {
  return useQuery({
    queryKey: ["transferMatch", payload, language],
    queryFn: () => matchTransferVehicle(payload!, language),
    enabled: Boolean(
      payload &&
        payload.fromLocationId &&
        payload.toLocationId &&
        payload.adults > 0
    ),
    staleTime: 1000 * 30,
  });
}
