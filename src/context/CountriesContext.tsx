import { createContext, useContext } from "react";
import type { Country } from "../types/country";

interface CountriesContextValue {
  countries: Country[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const CountriesContext = createContext<CountriesContextValue | null>(
  null
);

export function useCountriesContext() {
  const ctx = useContext(CountriesContext);
  if (!ctx) {
    throw new Error(
      "useCountriesContext must be used inside CountriesProvider"
    );
  }
  return ctx;
}
