import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createPromoCode,
  getNonRelatedTripPromoCodes,
  getPromoCodeByCode,
  getPromoCodeById,
  getPromoCodes,
  getRelatedTripPromoCodes,
} from "@/clientApi/promoCodesApi";
import {
  CreatePromoCodePayload,
  CreatePromoCodeResult,
  PromoCodeItem,
  PromoCodesQueryParams,
} from "@/models/promoCode";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

export type PromoCodeFilterType = "all" | "general" | "trip-specific";

export const PROMO_CODES_QUERY_KEYS = {
  all: ["promoCodes"] as const,
  list: (filter: PromoCodeFilterType, params?: PromoCodesQueryParams) =>
    ["promoCodes", "list", filter, params] as const,
  detail: (id: number) => ["promoCodes", "detail", id] as const,
  byCode: (code: number | string) => ["promoCodes", "byCode", code] as const,
};

export function usePromoCodesQuery(
  filter: PromoCodeFilterType = "all",
  params?: PromoCodesQueryParams
) {
  return useQuery({
    queryKey: PROMO_CODES_QUERY_KEYS.list(filter, params),
    queryFn: async (): Promise<PromoCodeItem[]> => {
      if (filter === "general") {
        return getNonRelatedTripPromoCodes(params);
      }
      if (filter === "trip-specific") {
        return getRelatedTripPromoCodes(params);
      }
      return getPromoCodes(params);
    },
    staleTime: 0,
  });
}

export function usePromoCodeByIdQuery(id: number | null, enabled = true) {
  return useQuery({
    queryKey: id ? PROMO_CODES_QUERY_KEYS.detail(id) : ["promoCodes", "none"],
    queryFn: () => (id ? getPromoCodeById(id) : Promise.reject("No id")),
    enabled: Boolean(enabled && id),
    staleTime: 0,
  });
}

export function usePromoCodeByCodeQuery(
  code: number | string | null,
  enabled = true
) {
  return useQuery({
    queryKey: code
      ? PROMO_CODES_QUERY_KEYS.byCode(code)
      : ["promoCodes", "byCode", "none"],
    queryFn: () =>
      code ? getPromoCodeByCode(code) : Promise.reject("No code"),
    enabled: Boolean(enabled && code),
    staleTime: 0,
  });
}

export function useCreatePromoCodeMutation() {
  const queryClient = useQueryClient();

  return useMutation<CreatePromoCodeResult, unknown, CreatePromoCodePayload>({
    mutationFn: (payload: CreatePromoCodePayload) => createPromoCode(payload),
    onSuccess: (result) => {
      toast.success(
        `Promo Code created successfully! Code: ${result.code}`
      );
      queryClient.invalidateQueries({
        queryKey: PROMO_CODES_QUERY_KEYS.all,
      });
    },
    onError: (err) => {
      toast.error(
        extractErrorMessage(err, "Failed to create promo code.")
      );
    },
  });
}
