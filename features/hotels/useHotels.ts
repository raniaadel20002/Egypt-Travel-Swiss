"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createHotel,
  deleteHotel,
  getHotelAllLanguages,
  getHotelById,
  getHotels,
  reorderHotelFacilities,
  updateHotel,
} from "@/clientApi/hotelsApi";
import {
  CreateHotelPayload,
  HotelApiItem,
  HotelMultiLangDetails,
  HotelsQueryParams,
  ReorderHotelFacilitiesPayload,
  UpdateHotelPayload,
} from "@/models/hotel";
import { BackendLanguageCode } from "@/models/tripType";

export * from "./useHotelImages";

export const HOTELS_QUERY_KEYS = {
  all: ["hotels"] as const,
  list: (params?: HotelsQueryParams) => ["hotels", "list", params] as const,
  detail: (
    id: number,
    language?: BackendLanguageCode | string,
    includeRatePlans?: boolean
  ) => ["hotels", "detail", id, language, includeRatePlans] as const,
  multiLangDetail: (id: number) => ["hotels", "multiLangDetail", id] as const,
};

export function useHotelsQuery(params?: HotelsQueryParams) {
  return useQuery({
    queryKey: HOTELS_QUERY_KEYS.list(params),
    queryFn: () => getHotels(params),
    staleTime: 0,
  });
}

export function useHotelByIdQuery(
  id: number | null,
  language: BackendLanguageCode | string = "EN",
  includeRatePlans = false,
  enabled = true
) {
  return useQuery({
    queryKey: id
      ? HOTELS_QUERY_KEYS.detail(id, language, includeRatePlans)
      : ["hotels", "detail", "none"],
    queryFn: () =>
      id ? getHotelById(id, language, includeRatePlans) : Promise.reject("No id"),
    enabled: Boolean(enabled && id),
    staleTime: 0,
  });
}

export function useHotelMultiLangQuery(id: number | null, enabled = true) {
  return useQuery({
    queryKey: id
      ? HOTELS_QUERY_KEYS.multiLangDetail(id)
      : ["hotels", "multiLangDetail", "none"],
    queryFn: () => (id ? getHotelAllLanguages(id) : Promise.reject("No id")),
    enabled: Boolean(enabled && id),
    staleTime: 0,
  });
}

export function useCreateHotelMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateHotelPayload) => createHotel(payload),
    onSuccess: (newItem) => {
      if (newItem) {
        queryClient.setQueriesData<HotelApiItem[]>(
          { queryKey: ["hotels", "list"] },
          (old) => {
            if (!old) return [newItem];
            const filtered = old.filter((h) => h.id !== newItem.id);
            return [newItem, ...filtered];
          }
        );
      }
      queryClient.invalidateQueries({
        queryKey: HOTELS_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}

export function useUpdateHotelMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateHotelPayload) => updateHotel(payload),
    onSuccess: (updatedItem, variables) => {
      queryClient.setQueriesData<HotelApiItem[]>(
        { queryKey: ["hotels", "list"] },
        (old) =>
          old
            ? old.map((item) =>
                item.id === variables.id
                  ? {
                      ...item,
                      name: updatedItem?.name || variables.name.en,
                      location: updatedItem?.location || variables.location.en,
                      description:
                        updatedItem?.description || variables.description.en,
                      rate: variables.rate,
                      facilities:
                        updatedItem?.facilities || item.facilities || [],
                    }
                  : item
              )
            : []
      );

      queryClient.invalidateQueries({
        queryKey: HOTELS_QUERY_KEYS.multiLangDetail(variables.id),
      });

      queryClient.invalidateQueries({
        queryKey: HOTELS_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}

export function useDeleteHotelMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteHotel(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueriesData<HotelApiItem[]>(
        { queryKey: ["hotels", "list"] },
        (old) => (old ? old.filter((item) => item.id !== deletedId) : [])
      );
      queryClient.removeQueries({
        queryKey: HOTELS_QUERY_KEYS.multiLangDetail(deletedId),
      });
      queryClient.invalidateQueries({
        queryKey: HOTELS_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}

export function useReorderHotelFacilitiesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ReorderHotelFacilitiesPayload) =>
      reorderHotelFacilities(payload),
    onSuccess: (updatedHotel, variables) => {
      if (updatedHotel) {
        queryClient.setQueriesData<HotelApiItem[]>(
          { queryKey: ["hotels", "list"] },
          (old) =>
            old
              ? old.map((h) =>
                  h.id === variables.hotelId ? { ...h, ...updatedHotel } : h
                )
              : []
        );
      }
      queryClient.invalidateQueries({
        queryKey: HOTELS_QUERY_KEYS.multiLangDetail(variables.hotelId),
      });
      queryClient.invalidateQueries({
        queryKey: HOTELS_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}
