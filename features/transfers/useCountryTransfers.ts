import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createCountryTransfer,
  deleteCountryTransfer,
  getCountryTransferAllLanguages,
  getCountryTransferById,
  getCountryTransfers,
  updateCountryTransfer,
} from "@/clientApi/countryTransferApi";
import {
  CountryTransferItem,
  CountryTransferMultiLangDetails,
  CountryTransfersQueryParams,
  CreateCountryTransferPayload,
  UpdateCountryTransferPayload,
} from "@/models/countryTransfer";
import { extractErrorMessage } from "@/shared/utils/errorHandler";

export const COUNTRY_TRANSFERS_QUERY_KEYS = {
  all: ["countryTransfers"] as const,
  list: (params?: CountryTransfersQueryParams) =>
    ["countryTransfers", "list", params] as const,
  detail: (id: number) => ["countryTransfers", "detail", id] as const,
  multiLang: (id: number) => ["countryTransfers", "multiLang", id] as const,
};

export function useCountryTransfersQuery(
  params?: CountryTransfersQueryParams
) {
  return useQuery({
    queryKey: COUNTRY_TRANSFERS_QUERY_KEYS.list(params),
    queryFn: () => getCountryTransfers(params),
    staleTime: 0,
  });
}

export function useCountryTransferByIdQuery(
  id: number | null,
  enabled = true
) {
  return useQuery({
    queryKey: id
      ? COUNTRY_TRANSFERS_QUERY_KEYS.detail(id)
      : ["countryTransfers", "detail", "none"],
    queryFn: () =>
      id ? getCountryTransferById(id) : Promise.reject("No id provided"),
    enabled: Boolean(enabled && id),
    staleTime: 0,
  });
}

export function useCountryTransferMultiLangQuery(
  id: number | null,
  enabled = true
) {
  return useQuery<CountryTransferMultiLangDetails>({
    queryKey: id
      ? COUNTRY_TRANSFERS_QUERY_KEYS.multiLang(id)
      : ["countryTransfers", "multiLang", "none"],
    queryFn: () =>
      id
        ? getCountryTransferAllLanguages(id)
        : Promise.reject("No id provided"),
    enabled: Boolean(enabled && id),
    staleTime: 0,
  });
}

export function useCreateCountryTransferMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    CountryTransferItem,
    unknown,
    CreateCountryTransferPayload
  >({
    mutationFn: (payload) => createCountryTransfer(payload),
    onSuccess: (data) => {
      toast.success(`Country "${data.name}" added successfully.`);
      queryClient.invalidateQueries({
        queryKey: COUNTRY_TRANSFERS_QUERY_KEYS.all,
      });
    },
    onError: (err) => {
      toast.error(
        extractErrorMessage(err, "Failed to create country transfer.")
      );
    },
  });
}

export function useUpdateCountryTransferMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    CountryTransferItem,
    unknown,
    UpdateCountryTransferPayload
  >({
    mutationFn: (payload) => updateCountryTransfer(payload),
    onSuccess: (data) => {
      toast.success(`Country "${data.name}" updated successfully.`);
      queryClient.invalidateQueries({
        queryKey: COUNTRY_TRANSFERS_QUERY_KEYS.all,
      });
    },
    onError: (err) => {
      toast.error(
        extractErrorMessage(err, "Failed to update country transfer.")
      );
    },
  });
}

export function useDeleteCountryTransferMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, number>({
    mutationFn: (id) => deleteCountryTransfer(id),
    onSuccess: () => {
      toast.success("Country transfer deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: COUNTRY_TRANSFERS_QUERY_KEYS.all,
      });
    },
    onError: (err) => {
      toast.error(
        extractErrorMessage(err, "Failed to delete country transfer.")
      );
    },
  });
}
