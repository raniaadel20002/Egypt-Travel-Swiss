"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createRatePlan,
  deleteRatePlan,
  getRatePlanAllLanguages,
  getRatePlanById,
  getRatePlans,
  updateRatePlan,
} from "@/clientApi/ratePlansApi";
import {
  CreateRatePlanPayload,
  RatePlansQueryParams,
  UpdateRatePlanPayload,
} from "@/models/hotel";
import { HOTELS_QUERY_KEYS } from "./useHotels";

export const RATE_PLANS_QUERY_KEY = ["ratePlans"] as const;

export function useRatePlansQuery(
  params?: RatePlansQueryParams,
  enabled = true
) {
  return useQuery({
    queryKey: [...RATE_PLANS_QUERY_KEY, params],
    queryFn: () => getRatePlans(params),
    enabled,
    staleTime: 0,
  });
}

export function useRatePlanDetailQuery(
  id?: number,
  language?: string,
  enabled = true
) {
  return useQuery({
    queryKey: [...RATE_PLANS_QUERY_KEY, "detail", id, language],
    queryFn: () => getRatePlanById(id!, language),
    enabled: Boolean(id) && enabled,
  });
}

export function useRatePlanAllLanguagesQuery(id?: number, enabled = true) {
  return useQuery({
    queryKey: [...RATE_PLANS_QUERY_KEY, "multiLang", id],
    queryFn: () => getRatePlanAllLanguages(id!),
    enabled: Boolean(id) && enabled,
    staleTime: 0,
  });
}

export function useCreateRatePlanMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateRatePlanPayload) => createRatePlan(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RATE_PLANS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: HOTELS_QUERY_KEYS.all });
    },
  });
}

export function useUpdateRatePlanMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateRatePlanPayload) => updateRatePlan(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RATE_PLANS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: HOTELS_QUERY_KEYS.all });
    },
  });
}

export function useDeleteRatePlanMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteRatePlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RATE_PLANS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: HOTELS_QUERY_KEYS.all });
    },
  });
}
