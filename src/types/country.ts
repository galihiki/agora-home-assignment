export interface Country {
  name: { common: string };
  flags: { png: string; svg: string };
  population: number;
  capital?: string[];
  languages: {};
}

export type SortField = "name" | "population";
export type SortOrder = "asc" | "desc";