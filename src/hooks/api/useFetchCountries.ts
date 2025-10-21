import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { Country } from "../../types/country.d.ts";

type Params = Record<string, string | number | boolean | undefined>;

/**
 * Fetch countries from API with dynamic URL parameters
 * including `fields` query parameter
 */
export function useFetchCountries(
  params?: Params,
  options?: UseQueryOptions<Country[]>
) {
  const baseUrl = "https://restcountries.com/v3.1/all";

  // Build URL with query parameters
  const url = params
    ? `${baseUrl}?${new URLSearchParams(
        Object.entries(params)
          .filter(([_, v]) => v !== undefined)
          .map(([k, v]) => [k, String(v)])
      ).toString()}`
    : baseUrl;

  return useQuery<Country[]>({
    queryKey: ["countries", params],
    queryFn: async () => {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json() as Promise<Country[]>;
    },
    ...options,
  });
}
