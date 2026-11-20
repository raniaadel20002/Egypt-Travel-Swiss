import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCity,
  createCountry,
  deleteCity,
  deleteCountry,
  getCities,
  getCityById,
  getCountries,
  getCountryById,
  updateCity,
  updateCountry,
} from "@/clientApi/flightLocationsApi";
import {
  CitiesQueryParams,
  CountriesQueryParams,
  CreateCityPayload,
  CreateCountryPayload,
  UpdateCityPayload,
  UpdateCountryPayload,
} from "@/models/flightLocation";

export const FLIGHT_LOCATIONS_QUERY_KEYS = {
  all: ["flightLocations"] as const,
  countries: ["flightLocations", "countries"] as const,
  countriesList: (params?: CountriesQueryParams) =>
    ["flightLocations", "countries", "list", params] as const,
  countryDetail: (id: number, language?: string) =>
    ["flightLocations", "countries", "detail", id, language] as const,
  cities: ["flightLocations", "cities"] as const,
  citiesList: (params?: CitiesQueryParams) =>
    ["flightLocations", "cities", "list", params] as const,
  cityDetail: (id: number, language?: string) =>
    ["flightLocations", "cities", "detail", id, language] as const,
};

/* =========================================================
   COUNTRY HOOKS
   ========================================================= */

export function useCountriesQuery(params?: CountriesQueryParams) {
  return useQuery({
    queryKey: FLIGHT_LOCATIONS_QUERY_KEYS.countriesList(params),
    queryFn: () => getCountries(params),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export function useCountryByIdQuery(
  id: number | null,
  language?: string,
  enabled = true
) {
  return useQuery({
    queryKey: id
      ? FLIGHT_LOCATIONS_QUERY_KEYS.countryDetail(id, language)
      : ["flightLocations", "countries", "detail", "none"],
    queryFn: () =>
      id ? getCountryById(id, language) : Promise.reject("No id provided"),
    enabled: Boolean(enabled && id),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateCountryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateCountryPayload) => createCountry(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FLIGHT_LOCATIONS_QUERY_KEYS.countries,
      });
    },
  });
}

export function useUpdateCountryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateCountryPayload) => updateCountry(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FLIGHT_LOCATIONS_QUERY_KEYS.countries,
      });
      queryClient.invalidateQueries({
        queryKey: FLIGHT_LOCATIONS_QUERY_KEYS.cities,
      });
    },
  });
}

export function useDeleteCountryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteCountry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FLIGHT_LOCATIONS_QUERY_KEYS.countries,
      });
      queryClient.invalidateQueries({
        queryKey: FLIGHT_LOCATIONS_QUERY_KEYS.cities,
      });
    },
  });
}

/* =========================================================
   CITY HOOKS
   ========================================================= */

export function useCitiesQuery(params?: CitiesQueryParams, enabled = true) {
  return useQuery({
    queryKey: FLIGHT_LOCATIONS_QUERY_KEYS.citiesList(params),
    queryFn: () => getCities(params),
    enabled,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export function useCityByIdQuery(
  id: number | null,
  language?: string,
  enabled = true
) {
  return useQuery({
    queryKey: id
      ? FLIGHT_LOCATIONS_QUERY_KEYS.cityDetail(id, language)
      : ["flightLocations", "cities", "detail", "none"],
    queryFn: () =>
      id ? getCityById(id, language) : Promise.reject("No id provided"),
    enabled: Boolean(enabled && id),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateCityMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateCityPayload) => createCity(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FLIGHT_LOCATIONS_QUERY_KEYS.cities,
      });
    },
  });
}

export function useUpdateCityMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateCityPayload) => updateCity(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FLIGHT_LOCATIONS_QUERY_KEYS.cities,
      });
    },
  });
}

export function useDeleteCityMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteCity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FLIGHT_LOCATIONS_QUERY_KEYS.cities,
      });
    },
  });
}
