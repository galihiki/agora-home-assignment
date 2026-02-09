import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

type TreeContextType = {
  expandAll: boolean;
  searchQuery: string;
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
};

export const TreeContext = createContext<TreeContextType | null>(null);

export function useTreeContext() {
  const ctx = useContext(TreeContext);
  if (!ctx) {
    throw new Error("useTreeContext must be used inside TreeProvider");
  }
  return ctx;
}
