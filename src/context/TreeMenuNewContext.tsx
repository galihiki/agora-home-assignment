import { createContext, useContext } from "react";

type TreeContextType = {
  searchQuery: string;
  expandAll: boolean;
  toggleSelected: (id: string, checked: boolean) => void;
};

export const TreeContextNew = createContext<TreeContextType | null>(null);

export function useTreeNewContext() {
  const ctx = useContext(TreeContextNew);
  if (!ctx) {
    throw new Error("useTreeContext must be used inside TreeProvider");
  }
  return ctx;
}
