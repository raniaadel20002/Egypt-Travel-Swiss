import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDivingCourseBooking,
  getDivingCourseBookingById,
  getDivingCourseBookings,
  getMyDivingCourseBookings,
} from "@/clientApi/divingCourseBookingsApi";
import {
  CreateDivingCourseBookingPayload,
  DivingCourseBookingsQueryParams,
} from "@/models/divingCourseBooking";

export const DIVING_COURSE_BOOKINGS_QUERY_KEY = [
  "divingCourseBookings",
] as const;

export function useDivingCourseBookingsQuery(
  params?: DivingCourseBookingsQueryParams
) {
  return useQuery({
    queryKey: [...DIVING_COURSE_BOOKINGS_QUERY_KEY, params],
    queryFn: () => getDivingCourseBookings(params),
  });
}

export function useDivingCourseBookingDetailQuery(bookingId?: string) {
  return useQuery({
    queryKey: [...DIVING_COURSE_BOOKINGS_QUERY_KEY, "detail", bookingId],
    queryFn: () => getDivingCourseBookingById(bookingId!),
    enabled: Boolean(bookingId),
  });
}

export function useMyDivingCourseBookingsQuery(
  params?: DivingCourseBookingsQueryParams,
  enabled = true
) {
  return useQuery({
    queryKey: [...DIVING_COURSE_BOOKINGS_QUERY_KEY, "my", params],
    queryFn: () => getMyDivingCourseBookings(params),
    enabled,
  });
}

export function useCreateDivingCourseBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateDivingCourseBookingPayload) =>
      createDivingCourseBooking(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DIVING_COURSE_BOOKINGS_QUERY_KEY,
      });
    },
  });
}
