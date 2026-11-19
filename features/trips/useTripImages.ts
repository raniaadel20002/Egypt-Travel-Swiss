"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteTripImage,
  setPrimaryTripImage,
  uploadTripImages,
} from "@/clientApi/tripsApi";
import {
  TripApiItem,
  TripImageActionPayload,
  TripImageApiItem,
  TripMultiLangDetails,
  UploadTripImagesPayload,
} from "@/models/trip";
import { TRIPS_QUERY_KEYS } from "./useTrips";

export function deduplicateTripImages(
  existing: TripImageApiItem[] = [],
  incoming: TripImageApiItem[] = []
): TripImageApiItem[] {
  const map = new Map<string, TripImageApiItem>();

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

export function useUploadTripImagesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UploadTripImagesPayload) => uploadTripImages(payload),
    onSuccess: (newImages, variables) => {
      queryClient.setQueriesData<TripApiItem[]>(
        { queryKey: ["trips", "list"] },
        (old) =>
          old
            ? old.map((item) =>
                item.id === variables.tripId
                  ? {
                      ...item,
                      images: deduplicateTripImages(item.images || [], newImages),
                    }
                  : item
              )
            : []
      );

      queryClient.setQueryData<TripMultiLangDetails>(
        TRIPS_QUERY_KEYS.multiLangDetail(variables.tripId),
        (old) =>
          old
            ? {
                ...old,
                images: deduplicateTripImages(old.images || [], newImages),
              }
            : undefined
      );

      queryClient.invalidateQueries({
        queryKey: TRIPS_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}

export function useDeleteTripImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TripImageActionPayload) => deleteTripImage(payload),
    onSuccess: (_, variables) => {
      queryClient.setQueriesData<TripApiItem[]>(
        { queryKey: ["trips", "list"] },
        (old) =>
          old
            ? old.map((item) =>
                item.id === variables.tripId
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

      queryClient.setQueryData<TripMultiLangDetails>(
        TRIPS_QUERY_KEYS.multiLangDetail(variables.tripId),
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

      queryClient.invalidateQueries({
        queryKey: TRIPS_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}

export function useSetPrimaryTripImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TripImageActionPayload) =>
      setPrimaryTripImage(payload),
    onSuccess: (_, variables) => {
      queryClient.setQueriesData<TripApiItem[]>(
        { queryKey: ["trips", "list"] },
        (old) =>
          old
            ? old.map((item) =>
                item.id === variables.tripId
                  ? {
                      ...item,
                      images: (item.images || []).map((img) => ({
                        ...img,
                        isPrimary: img.id === variables.imageId,
                      })),
                    }
                  : item
              )
            : []
      );

      queryClient.setQueryData<TripMultiLangDetails>(
        TRIPS_QUERY_KEYS.multiLangDetail(variables.tripId),
        (old) =>
          old
            ? {
                ...old,
                images: (old.images || []).map((img) => ({
                  ...img,
                  isPrimary: img.id === variables.imageId,
                })),
              }
            : undefined
      );

      queryClient.invalidateQueries({
        queryKey: TRIPS_QUERY_KEYS.all,
        refetchType: "active",
      });
    },
  });
}
