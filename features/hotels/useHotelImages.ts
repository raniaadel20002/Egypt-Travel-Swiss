"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteHotelImage,
  getHotelImages,
  reorderHotelImages,
  setPrimaryHotelImage,
  uploadHotelImages,
} from "@/clientApi/hotelsApi";
import {
  DeleteHotelImagePayload,
  HotelApiItem,
  HotelImageApiItem,
  ReorderHotelImagesPayload,
  SetPrimaryHotelImagePayload,
  UploadHotelImagesPayload,
} from "@/models/hotel";
import { HOTELS_QUERY_KEYS } from "./useHotels";

export const HOTEL_IMAGES_QUERY_KEYS = {
  list: (hotelId?: number | null) => ["hotels", "images", hotelId] as const,
};

export function useHotelImagesQuery(
  hotelId: number | null,
  enabled = true
) {
  return useQuery({
    queryKey: HOTEL_IMAGES_QUERY_KEYS.list(hotelId),
    queryFn: () => (hotelId ? getHotelImages(hotelId) : Promise.resolve([])),
    enabled: Boolean(enabled && hotelId),
    staleTime: 0,
  });
}

export function useUploadHotelImagesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UploadHotelImagesPayload) =>
      uploadHotelImages(payload),
    onSuccess: (newImages, variables) => {
      queryClient.setQueryData<HotelImageApiItem[]>(
        HOTEL_IMAGES_QUERY_KEYS.list(variables.hotelId),
        (old) => {
          if (!old) return newImages;
          const oldMap = new Map(old.map((img) => [img.id, img]));
          newImages.forEach((img) => oldMap.set(img.id, img));
          return Array.from(oldMap.values());
        }
      );

      queryClient.invalidateQueries({
        queryKey: HOTEL_IMAGES_QUERY_KEYS.list(variables.hotelId),
      });

      queryClient.invalidateQueries({
        queryKey: HOTELS_QUERY_KEYS.all,
      });
    },
  });
}

export function useDeleteHotelImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DeleteHotelImagePayload) => deleteHotelImage(payload),
    onSuccess: (_, variables) => {
      queryClient.setQueryData<HotelImageApiItem[]>(
        HOTEL_IMAGES_QUERY_KEYS.list(variables.hotelId),
        (old) => (old ? old.filter((img) => img.id !== variables.imageId) : [])
      );

      queryClient.invalidateQueries({
        queryKey: HOTEL_IMAGES_QUERY_KEYS.list(variables.hotelId),
      });

      queryClient.invalidateQueries({
        queryKey: HOTELS_QUERY_KEYS.all,
      });
    },
  });
}

export function useSetPrimaryHotelImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SetPrimaryHotelImagePayload) =>
      setPrimaryHotelImage(payload),
    onSuccess: (_, variables) => {
      queryClient.setQueryData<HotelImageApiItem[]>(
        HOTEL_IMAGES_QUERY_KEYS.list(variables.hotelId),
        (old) =>
          old
            ? old.map((img) => ({
                ...img,
                isPrimary: img.id === variables.imageId,
              }))
            : []
      );

      queryClient.setQueriesData<HotelApiItem[]>(
        { queryKey: ["hotels", "list"] },
        (old) =>
          old
            ? old.map((hotel) =>
                hotel.id === variables.hotelId
                  ? {
                      ...hotel,
                      images: hotel.images.map((img) => ({
                        ...img,
                        isPrimary: img.id === variables.imageId,
                      })),
                    }
                  : hotel
              )
            : []
      );

      queryClient.invalidateQueries({
        queryKey: HOTEL_IMAGES_QUERY_KEYS.list(variables.hotelId),
      });

      queryClient.invalidateQueries({
        queryKey: HOTELS_QUERY_KEYS.all,
      });
    },
  });
}

export function useReorderHotelImagesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ReorderHotelImagesPayload) =>
      reorderHotelImages(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: HOTEL_IMAGES_QUERY_KEYS.list(variables.hotelId),
      });
      queryClient.invalidateQueries({
        queryKey: HOTELS_QUERY_KEYS.all,
      });
    },
  });
}
