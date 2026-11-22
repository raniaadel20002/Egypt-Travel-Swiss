import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTrip,
  deactivateTrip,
  getTripAllLanguages,
  getTripById,
  getTrips,
  reactivateTrip,
  updateTrip,
} from "@/clientApi/tripsApi";
import {
  CreateTripPayload,
  TripApiItem,
  TripMultiLangDetails,
  TripsQueryParams,
  UpdateTripPayload,
} from "@/models/trip";

export * from "./useTripImages";

export const TRIPS_QUERY_KEYS = {
  all: ["trips"] as const,
  list: (params?: TripsQueryParams) => ["trips", "list", params] as const,
  detail: (id: number, language?: string) =>
    ["trips", "detail", id, language] as const,
  multiLangDetail: (id: number) => ["trips", "multiLangDetail", id] as const,
};

export function useTripsQuery(params?: TripsQueryParams) {
  return useQuery({
    queryKey: TRIPS_QUERY_KEYS.list(params),
    queryFn: () => getTrips(params),
    staleTime: 0,
  });
}

export function useTripByIdQuery(
  id: number | null,
  language?: string,
  enabled = true
) {
  return useQuery({
    queryKey: id
      ? TRIPS_QUERY_KEYS.detail(id, language)
      : ["trips", "detail", "none"],
    queryFn: () =>
      id
        ? getTripById(id, (language as any) || "EN")
        : Promise.reject("No id"),
    enabled: Boolean(enabled && id),
    staleTime: 0,
  });
}

export function useTripMultiLangQuery(id: number | null, enabled = true) {
  return useQuery({
    queryKey: id
      ? TRIPS_QUERY_KEYS.multiLangDetail(id)
      : ["trips", "multiLangDetail", "none"],
    queryFn: () => (id ? getTripAllLanguages(id) : Promise.reject("No id")),
    enabled: Boolean(enabled && id),
    staleTime: 0,
  });
}

export function useCreateTripMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTripPayload) => createTrip(payload),
    onSuccess: (newItem) => {
      if (newItem) {
        queryClient.setQueriesData<TripApiItem[]>(
          { queryKey: ["trips", "list"] },
          (old) => (old ? [newItem, ...old] : [newItem])
        );
      }
      queryClient.invalidateQueries({
        queryKey: TRIPS_QUERY_KEYS.all,
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["destinations"],
        refetchType: "active",
      });
    },
  });
}

export function useUpdateTripMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateTripPayload) => updateTrip(payload),
    onSuccess: (updatedItem, variables) => {
      queryClient.setQueriesData<TripApiItem[]>(
        { queryKey: ["trips", "list"] },
        (old) =>
          old
            ? old.map((item) =>
                item.id === variables.id
                  ? {
                      ...item,
                      ...(updatedItem || {}),
                      name: variables.name.en || updatedItem?.name || item.name,
                      description:
                        variables.description.en ||
                        updatedItem?.description ||
                        item.description,
                      adultPrice: variables.adultPrice,
                      childPrice: variables.childPrice,
                      infPrice: variables.infPrice,
                      durationValue: variables.durationValue,
                    }
                  : item
              )
            : []
      );

      queryClient.invalidateQueries({
        queryKey: TRIPS_QUERY_KEYS.all,
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["destinations"],
        refetchType: "active",
      });
    },
  });
}

export function useDeactivateTripMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deactivateTrip(id),
    onSuccess: (_, tripId) => {
      queryClient.setQueriesData<TripApiItem[]>(
        { queryKey: ["trips", "list"] },
        (old) =>
          old
            ? old.map((t) => (t.id === tripId ? { ...t, isActive: false } : t))
            : []
      );
      queryClient.invalidateQueries({
        queryKey: TRIPS_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}

export function useReactivateTripMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => reactivateTrip(id),
    onSuccess: (_, tripId) => {
      queryClient.setQueriesData<TripApiItem[]>(
        { queryKey: ["trips", "list"] },
        (old) =>
          old
            ? old.map((t) => (t.id === tripId ? { ...t, isActive: true } : t))
            : []
      );
      queryClient.invalidateQueries({
        queryKey: TRIPS_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}

