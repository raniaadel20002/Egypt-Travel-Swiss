import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  confirmBooking,
  createBooking,
  deleteBooking,
  finishBooking,
  getBookingById,
  getBookings,
} from "@/clientApi/bookingsApi";
import {
  BookingApiItem,
  BookingsQueryParams,
  CreateBookingPayload,
} from "@/models/booking";
import { ADMIN_QUERY_KEYS } from "@/features/admin/useAdminQueries";

export const BOOKINGS_QUERY_KEYS = {
  all: ["bookings"] as const,
  list: (params?: BookingsQueryParams) => ["bookings", "list", params] as const,
  detail: (id: number) => ["bookings", "detail", id] as const,
};

export function useBookingsQuery(params?: BookingsQueryParams) {
  return useQuery({
    queryKey: BOOKINGS_QUERY_KEYS.list(params),
    queryFn: () => getBookings(params),
    staleTime: 1000 * 30,
  });
}

export function useBookingByIdQuery(id: number | null, enabled = true) {
  return useQuery({
    queryKey: id ? BOOKINGS_QUERY_KEYS.detail(id) : ["bookings", "detail", "none"],
    queryFn: () => (id ? getBookingById(id) : Promise.reject("No id")),
    enabled: Boolean(enabled && id),
    staleTime: 1000 * 30,
  });
}

export function useCreateBookingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBookingPayload) => createBooking(payload),
    onSuccess: (newItem) => {
      if (newItem) {
        queryClient.setQueriesData<BookingApiItem[]>(
          { queryKey: ["bookings", "list"] },
          (old) => (old ? [newItem, ...old] : [newItem])
        );
      }
      queryClient.invalidateQueries({
        queryKey: BOOKINGS_QUERY_KEYS.all,
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ADMIN_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}

export function useConfirmBookingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => confirmBooking(id),
    onSuccess: (updatedItem, id) => {
      queryClient.setQueriesData<BookingApiItem[]>(
        { queryKey: ["bookings", "list"] },
        (old) =>
          old
            ? old.map((item) =>
                item.id === id ? { ...item, ...(updatedItem || {}), status: "Confirmed" } : item
              )
            : []
      );
      queryClient.invalidateQueries({
        queryKey: BOOKINGS_QUERY_KEYS.all,
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ADMIN_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}

export function useFinishBookingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => finishBooking(id),
    onSuccess: (updatedItem, id) => {
      queryClient.setQueriesData<BookingApiItem[]>(
        { queryKey: ["bookings", "list"] },
        (old) =>
          old
            ? old.map((item) =>
                item.id === id ? { ...item, ...(updatedItem || {}), status: "Finished" } : item
              )
            : []
      );
      queryClient.invalidateQueries({
        queryKey: BOOKINGS_QUERY_KEYS.all,
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ADMIN_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}

export function useDeleteBookingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteBooking(id),
    onSuccess: (_, id) => {
      queryClient.setQueriesData<BookingApiItem[]>(
        { queryKey: ["bookings", "list"] },
        (old) => (old ? old.filter((item) => item.id !== id) : [])
      );
      queryClient.invalidateQueries({
        queryKey: BOOKINGS_QUERY_KEYS.all,
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ADMIN_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}
