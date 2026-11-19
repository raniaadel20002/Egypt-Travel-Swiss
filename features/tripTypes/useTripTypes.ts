import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTripType,
  deleteTripType,
  getTripTypeAllLanguages,
  getTripTypes,
  updateTripType,
} from "@/clientApi/tripTypesApi";
import {
  CreateTripTypePayload,
  TripTypeItem,
  TripTypesQueryParams,
  UpdateTripTypePayload,
} from "@/models/tripType";

export const TRIP_TYPES_QUERY_KEYS = {
  all: ["tripTypes"] as const,
  list: (params?: TripTypesQueryParams) =>
    ["tripTypes", "list", params] as const,
  multiLangDetail: (id: number) =>
    ["tripTypes", "multiLangDetail", id] as const,
};

export function useTripTypesQuery(params?: TripTypesQueryParams) {
  return useQuery({
    queryKey: TRIP_TYPES_QUERY_KEYS.list(params),
    queryFn: () => getTripTypes(params),
    staleTime: 0,
  });
}

export function useTripTypeMultiLangQuery(
  id: number | null,
  enabled = true
) {
  return useQuery({
    queryKey: id
      ? TRIP_TYPES_QUERY_KEYS.multiLangDetail(id)
      : ["tripTypes", "multiLangDetail", "none"],
    queryFn: () => (id ? getTripTypeAllLanguages(id) : Promise.reject("No id")),
    enabled: Boolean(enabled && id),
    staleTime: 0,
  });
}

export function useCreateTripTypeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTripTypePayload) => createTripType(payload),
    onSuccess: (newItem) => {
      if (newItem) {
        queryClient.setQueriesData<TripTypeItem[]>(
          { queryKey: ["tripTypes", "list"] },
          (old) => (old ? [newItem, ...old] : [newItem])
        );
      }
      queryClient.invalidateQueries({
        queryKey: TRIP_TYPES_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}

export function useUpdateTripTypeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateTripTypePayload) => updateTripType(payload),
    onSuccess: (updatedItem, variables) => {
      queryClient.setQueriesData<TripTypeItem[]>(
        { queryKey: ["tripTypes", "list"] },
        (old) =>
          old
            ? old.map((item) =>
                item.id === variables.id
                  ? {
                      ...item,
                      name: updatedItem?.name || variables.names.En,
                      imageUrl: updatedItem?.imageUrl || item.imageUrl,
                    }
                  : item
              )
            : []
      );

      queryClient.setQueryData(
        TRIP_TYPES_QUERY_KEYS.multiLangDetail(variables.id),
        {
          id: variables.id,
          imageUrl: updatedItem?.imageUrl || "",
          names: variables.names,
        }
      );

      queryClient.invalidateQueries({
        queryKey: TRIP_TYPES_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}

export function useDeleteTripTypeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTripType(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueriesData<TripTypeItem[]>(
        { queryKey: ["tripTypes", "list"] },
        (old) => (old ? old.filter((item) => item.id !== deletedId) : [])
      );
      queryClient.removeQueries({
        queryKey: TRIP_TYPES_QUERY_KEYS.multiLangDetail(deletedId),
      });
      queryClient.invalidateQueries({
        queryKey: TRIP_TYPES_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}
