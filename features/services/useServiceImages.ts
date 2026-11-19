"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  associateTripServices,
  deleteServiceImage,
  getServiceImages,
  getTripServices,
  uploadServiceImages,
} from "@/clientApi/servicesApi";
import {
  AssociateTripServicesPayload,
  DeleteServiceImagePayload,
  ServiceApiItem,
  ServiceImageApiItem,
  ServiceMultiLangDetails,
  UploadServiceImagesPayload,
} from "@/models/service";
import { BackendLanguageCode } from "@/models/tripType";
import { SERVICES_QUERY_KEYS } from "./useServices";

export function deduplicateServiceImages(
  existing: ServiceImageApiItem[] = [],
  incoming: ServiceImageApiItem[] = []
): ServiceImageApiItem[] {
  const map = new Map<string, ServiceImageApiItem>();

  existing.forEach((img, idx) => {
    const key =
      typeof img.id === "number" && img.id > 0
        ? `id_${img.id}`
        : `url_${img.imageUrl || idx}`;
    map.set(key, img);
  });

  incoming.forEach((img, idx) => {
    const key =
      typeof img.id === "number" && img.id > 0
        ? `id_${img.id}`
        : `url_${img.imageUrl || idx}`;
    const prev = map.get(key);
    map.set(key, { ...prev, ...img });
  });

  return Array.from(map.values());
}

export function useServiceImagesQuery(serviceId: number | null, enabled = true) {
  return useQuery({
    queryKey: serviceId
      ? SERVICES_QUERY_KEYS.images(serviceId)
      : ["services", "images", "none"],
    queryFn: () =>
      serviceId ? getServiceImages(serviceId) : Promise.reject("No serviceId"),
    enabled: Boolean(enabled && serviceId),
    staleTime: 0,
  });
}

export function useUploadServiceImagesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UploadServiceImagesPayload) =>
      uploadServiceImages(payload),
    onSuccess: (newImages, variables) => {
      queryClient.setQueriesData<ServiceApiItem[]>(
        { queryKey: ["services", "list"] },
        (old) =>
          old
            ? old.map((item) =>
                item.id === variables.serviceId
                  ? {
                      ...item,
                      images: deduplicateServiceImages(item.images || [], newImages),
                    }
                  : item
              )
            : []
      );

      queryClient.setQueryData<ServiceMultiLangDetails>(
        SERVICES_QUERY_KEYS.multiLangDetail(variables.serviceId),
        (old) =>
          old
            ? {
                ...old,
                images: deduplicateServiceImages(old.images || [], newImages),
              }
            : undefined
      );

      queryClient.setQueryData<ServiceImageApiItem[]>(
        SERVICES_QUERY_KEYS.images(variables.serviceId),
        (old) => deduplicateServiceImages(old || [], newImages)
      );

      queryClient.invalidateQueries({
        queryKey: SERVICES_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}

export function useDeleteServiceImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DeleteServiceImagePayload) =>
      deleteServiceImage(payload),
    onSuccess: (_, variables) => {
      queryClient.setQueriesData<ServiceApiItem[]>(
        { queryKey: ["services", "list"] },
        (old) =>
          old
            ? old.map((item) =>
                item.id === variables.serviceId
                  ? {
                      ...item,
                      images: (item.images || []).filter(
                        (img) => img.id !== variables.imageId
                      ),
                    }
                  : item
              )
            : []
      );

      queryClient.setQueryData<ServiceMultiLangDetails>(
        SERVICES_QUERY_KEYS.multiLangDetail(variables.serviceId),
        (old) =>
          old
            ? {
                ...old,
                images: (old.images || []).filter(
                  (img) => img.id !== variables.imageId
                ),
              }
            : undefined
      );

      queryClient.setQueryData<ServiceImageApiItem[]>(
        SERVICES_QUERY_KEYS.images(variables.serviceId),
        (old) =>
          (old || []).filter((img) => img.id !== variables.imageId)
      );

      queryClient.invalidateQueries({
        queryKey: SERVICES_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}

export function useTripServicesQuery(
  tripId: number | null,
  enabled = true,
  language: BackendLanguageCode = "EN"
) {
  return useQuery({
    queryKey: tripId
      ? SERVICES_QUERY_KEYS.tripServices(tripId, language)
      : ["services", "tripServices", "none"],
    queryFn: () =>
      tripId ? getTripServices(tripId, language) : Promise.reject("No tripId"),
    enabled: Boolean(enabled && tripId),
    staleTime: 0,
  });
}

export function useAssociateTripServicesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AssociateTripServicesPayload) =>
      associateTripServices(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["services", "tripServices", variables.tripId],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["trips"],
        refetchType: "active",
      });
    },
  });
}
