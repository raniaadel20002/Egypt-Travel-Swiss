"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createService,
  deleteService,
  getServiceAllLanguages,
  getServiceById,
  getServices,
  updateService,
} from "@/clientApi/servicesApi";
import {
  CreateServicePayload,
  ServiceApiItem,
  ServiceMultiLangDetails,
  ServicesQueryParams,
  UpdateServicePayload,
} from "@/models/service";
import { BackendLanguageCode } from "@/models/tripType";

export * from "./useServiceImages";

export const SERVICES_QUERY_KEYS = {
  all: ["services"] as const,
  list: (params?: ServicesQueryParams) =>
    ["services", "list", params] as const,
  detail: (id: number, language?: BackendLanguageCode) =>
    ["services", "detail", id, language] as const,
  multiLangDetail: (id: number) =>
    ["services", "multiLangDetail", id] as const,
  images: (id: number) => ["services", "images", id] as const,
  tripServices: (tripId: number, language?: BackendLanguageCode) =>
    ["services", "tripServices", tripId, language] as const,
};

export function useServicesQuery(params?: ServicesQueryParams) {
  return useQuery({
    queryKey: SERVICES_QUERY_KEYS.list(params),
    queryFn: () => getServices(params),
    staleTime: 0,
  });
}

export function useServiceByIdQuery(
  id: number | null,
  language: BackendLanguageCode = "EN",
  enabled = true
) {
  return useQuery({
    queryKey: id
      ? SERVICES_QUERY_KEYS.detail(id, language)
      : ["services", "detail", "none"],
    queryFn: () =>
      id ? getServiceById(id, language) : Promise.reject("No id"),
    enabled: Boolean(enabled && id),
    staleTime: 0,
  });
}

export function useServiceMultiLangQuery(id: number | null, enabled = true) {
  return useQuery({
    queryKey: id
      ? SERVICES_QUERY_KEYS.multiLangDetail(id)
      : ["services", "multiLangDetail", "none"],
    queryFn: () =>
      id ? getServiceAllLanguages(id) : Promise.reject("No id"),
    enabled: Boolean(enabled && id),
    staleTime: 0,
  });
}

export function useCreateServiceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateServicePayload) => createService(payload),
    onSuccess: (newItem) => {
      if (newItem) {
        queryClient.setQueriesData<ServiceApiItem[]>(
          { queryKey: ["services", "list"] },
          (old) => {
            if (!old) return [newItem];
            const filtered = old.filter((s) => s.id !== newItem.id);
            return [newItem, ...filtered];
          }
        );
      }
      queryClient.invalidateQueries({
        queryKey: SERVICES_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}

export function useUpdateServiceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateServicePayload) => updateService(payload),
    onSuccess: (updatedItem, variables) => {
      queryClient.setQueriesData<ServiceApiItem[]>(
        { queryKey: ["services", "list"] },
        (old) =>
          old
            ? old.map((item) =>
                item.id === variables.id
                  ? {
                      ...item,
                      name: updatedItem?.name || variables.name.en,
                      description:
                        updatedItem?.description || variables.description.en,
                      adultPrice: variables.adultPrice,
                      childPrice: variables.childPrice,
                      infPrice: variables.infPrice,
                    }
                  : item
              )
            : []
      );

      queryClient.setQueryData<ServiceMultiLangDetails>(
        SERVICES_QUERY_KEYS.multiLangDetail(variables.id),
        (old) =>
          old
            ? {
                ...old,
                name: variables.name,
                description: variables.description,
                adultPrice: variables.adultPrice,
                childPrice: variables.childPrice,
                infPrice: variables.infPrice,
              }
            : undefined
      );

      queryClient.invalidateQueries({
        queryKey: SERVICES_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}

export function useDeleteServiceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteService(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueriesData<ServiceApiItem[]>(
        { queryKey: ["services", "list"] },
        (old) => (old ? old.filter((item) => item.id !== deletedId) : [])
      );
      queryClient.removeQueries({
        queryKey: SERVICES_QUERY_KEYS.multiLangDetail(deletedId),
      });
      queryClient.invalidateQueries({
        queryKey: SERVICES_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}
