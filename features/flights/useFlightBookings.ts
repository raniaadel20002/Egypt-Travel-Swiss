import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createFlightBooking,
  deleteFlightBooking,
  getFlightBookingById,
  getFlightBookings,
  getFlightBookingsCount,
  updateFlightBooking,
} from "@/clientApi/flightBookingsApi";
import {
  CreateFlightBookingPayload,
  FlightBookingApiItem,
  FlightBookingsQueryParams,
  UpdateFlightBookingPayload,
} from "@/models/flightBooking";

export const FLIGHT_BOOKINGS_QUERY_KEY = ["flightBookings"] as const;

export function useFlightBookingsQuery(params?: FlightBookingsQueryParams) {
  return useQuery<FlightBookingApiItem[]>({
    queryKey: [...FLIGHT_BOOKINGS_QUERY_KEY, "list", params],
    queryFn: () => getFlightBookings(params),
  });
}

export function useFlightBookingsCountQuery(params?: FlightBookingsQueryParams) {
  return useQuery<number>({
    queryKey: [...FLIGHT_BOOKINGS_QUERY_KEY, "count", params],
    queryFn: () => getFlightBookingsCount(params),
  });
}

export function useFlightBookingDetailQuery(id?: number, language = "en") {
  return useQuery<FlightBookingApiItem>({
    queryKey: [...FLIGHT_BOOKINGS_QUERY_KEY, "detail", id, language],
    queryFn: () => getFlightBookingById(id!, language),
    enabled: Boolean(id && id > 0),
  });
}

export function useCreateFlightBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateFlightBookingPayload) =>
      createFlightBooking(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FLIGHT_BOOKINGS_QUERY_KEY });
    },
  });
}

export function useUpdateFlightBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateFlightBookingPayload;
    }) => updateFlightBooking(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FLIGHT_BOOKINGS_QUERY_KEY });
    },
  });
}

export function useDeleteFlightBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteFlightBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FLIGHT_BOOKINGS_QUERY_KEY });
    },
  });
}
