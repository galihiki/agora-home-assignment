import type { Country, SortField, SortOrder } from "@/types/Countries";

export default function sortCountries(
    list: Country[],
    field: SortField,
    order: SortOrder
  ){
    return [...list].sort((a, b) => {
      let compare = a.name.common.localeCompare(b.name.common);
      if (field === "population") {
        compare = a.population - b.population;
      }
      return order === "asc" ? compare : -compare;
    });
  };