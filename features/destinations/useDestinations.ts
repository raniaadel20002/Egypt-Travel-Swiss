import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDestination,
  deleteDestination,
  deleteDestinationImage,
  getDestinationAllLanguages,
  getDestinations,
  updateDestination,
  updateDestinationImage,
} from "@/clientApi/destinationsApi";
import {
  CreateDestinationPayload,
  DestinationApiItem,
  DestinationMultiLangDetails,
  DestinationsQueryParams,
  UpdateDestinationImagePayload,
  UpdateDestinationPayload,
} from "@/models/destination";

export const DESTINATIONS_QUERY_KEYS = {
  all: ["destinations"] as const,
  list: (params?: DestinationsQueryParams) =>
    ["destinations", "list", params] as const,
  multiLangDetail: (id: number) =>
    ["destinations", "multiLangDetail", id] as const,
};

export function useDestinationsQuery(params?: DestinationsQueryParams) {
  return useQuery({
    queryKey: DESTINATIONS_QUERY_KEYS.list(params),
    queryFn: () => getDestinations(params),
    staleTime: 0,
  });
}

export function useDestinationMultiLangQuery(
  id: number | null,
  enabled = true
) {
  return useQuery({
    queryKey: id
      ? DESTINATIONS_QUERY_KEYS.multiLangDetail(id)
      : ["destinations", "multiLangDetail", "none"],
    queryFn: () =>
      id ? getDestinationAllLanguages(id) : Promise.reject("No id"),
    enabled: Boolean(enabled && id),
    staleTime: 0,
  });
}

export function useCreateDestinationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateDestinationPayload) =>
      createDestination(payload),
    onSuccess: (newItem) => {
      if (newItem) {
        queryClient.setQueriesData<DestinationApiItem[]>(
          { queryKey: ["destinations", "list"] },
          (old) => (old ? [newItem, ...old] : [newItem])
        );
      }
      queryClient.invalidateQueries({
        queryKey: DESTINATIONS_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}

export function useUpdateDestinationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateDestinationPayload) =>
      updateDestination(payload),
    onSuccess: (updatedItem, variables) => {
      queryClient.setQueriesData<DestinationApiItem[]>(
        { queryKey: ["destinations", "list"] },
        (old) =>
          old
            ? old.map((item) =>
                item.id === variables.id
                  ? {
                      ...item,
                      name: updatedItem?.name || variables.names.En,
                      imageUrl: updatedItem?.imageUrl || item.imageUrl,
                      isFeatured: variables.isFeatured,
                    }
                  : item
              )
            : []
      );

      queryClient.setQueryData<DestinationMultiLangDetails>(
        DESTINATIONS_QUERY_KEYS.multiLangDetail(variables.id),
        (old) => ({
          id: variables.id,
          imageUrl: updatedItem?.imageUrl || old?.imageUrl || "",
          isFeatured: variables.isFeatured,
          tripsCount: old?.tripsCount ?? 0,
          names: variables.names,
        })
      );

      queryClient.invalidateQueries({
        queryKey: DESTINATIONS_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}

export function useDeleteDestinationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteDestination(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueriesData<DestinationApiItem[]>(
        { queryKey: ["destinations", "list"] },
        (old) => (old ? old.filter((item) => item.id !== deletedId) : [])
      );
      queryClient.removeQueries({
        queryKey: DESTINATIONS_QUERY_KEYS.multiLangDetail(deletedId),
      });
      queryClient.invalidateQueries({
        queryKey: DESTINATIONS_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}

export function useUpdateDestinationImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateDestinationImagePayload) =>
      updateDestinationImage(payload),
    onSuccess: (updatedItem, variables) => {
      queryClient.setQueriesData<DestinationApiItem[]>(
        { queryKey: ["destinations", "list"] },
        (old) =>
          old
            ? old.map((item) =>
                item.id === variables.id
                  ? {
                      ...item,
                      imageUrl: updatedItem?.imageUrl || item.imageUrl,
                    }
                  : item
              )
            : []
      );

      queryClient.setQueryData<DestinationMultiLangDetails>(
        DESTINATIONS_QUERY_KEYS.multiLangDetail(variables.id),
        (old) =>
          old
            ? {
                ...old,
                imageUrl: updatedItem?.imageUrl || old.imageUrl,
              }
            : undefined
      );

      queryClient.invalidateQueries({
        queryKey: DESTINATIONS_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}

export function useDeleteDestinationImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteDestinationImage(id),
    onSuccess: (_, destinationId) => {
      queryClient.setQueriesData<DestinationApiItem[]>(
        { queryKey: ["destinations", "list"] },
        (old) =>
          old
            ? old.map((item) =>
                item.id === destinationId
                  ? {
                      ...item,
                      imageUrl: "",
                    }
                  : item
              )
            : []
      );

      queryClient.setQueryData<DestinationMultiLangDetails>(
        DESTINATIONS_QUERY_KEYS.multiLangDetail(destinationId),
        (old) =>
          old
            ? {
                ...old,
                imageUrl: "",
              }
            : undefined
      );

      queryClient.invalidateQueries({
        queryKey: DESTINATIONS_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}
