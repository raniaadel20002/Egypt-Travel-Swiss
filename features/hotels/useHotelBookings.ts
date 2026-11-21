import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createHotelBooking,
  deleteHotelBooking,
  getHotelBookingById,
  getHotelBookings,
  updateHotelBookingStatus,
} from "@/clientApi/hotelBookingsApi";
import {
  CreateHotelBookingPayload,
  HotelBookingsQueryParams,
  UpdateHotelBookingStatusPayload,
} from "@/models/hotelBooking";

export const HOTEL_BOOKINGS_QUERY_KEY = ["hotelBookings"] as const;

export function useHotelBookingsQuery(params?: HotelBookingsQueryParams) {
  return useQuery({
    queryKey: [...HOTEL_BOOKINGS_QUERY_KEY, params],
    queryFn: () => getHotelBookings(params),
  });
}

export function useHotelBookingDetailQuery(id?: number, enabled = true) {
  return useQuery({
    queryKey: [...HOTEL_BOOKINGS_QUERY_KEY, "detail", id],
    queryFn: () => getHotelBookingById(id!),
    enabled: Boolean(id) && enabled,
  });
}

export function useCreateHotelBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateHotelBookingPayload) =>
      createHotelBooking(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: HOTEL_BOOKINGS_QUERY_KEY,
      });
    },
  });
}

export function useUpdateHotelBookingStatusMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateHotelBookingStatusPayload) =>
      updateHotelBookingStatus(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: HOTEL_BOOKINGS_QUERY_KEY,
      });
    },
  });
}

export function useDeleteHotelBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteHotelBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: HOTEL_BOOKINGS_QUERY_KEY,
      });
    },
  });
}
