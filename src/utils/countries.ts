import type { Country, SortField, SortOrder } from "@/types/Countries";

export default function sortCountries(
    list: Country[],
    field: SortField,
    order: SortOrder
  ){
    return [...list].sort((a, b) => {
      if (field === "name") {
        const compare = a.name.common.localeCompare(b.name.common);
        return order === "asc" ? compare : -compare;
      } else {
        const compare = a.population - b.population;
        return order === "asc" ? compare : -compare;
      }
    });
  };