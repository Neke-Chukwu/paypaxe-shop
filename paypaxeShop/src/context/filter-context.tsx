import { createContext, useContext, useMemo, useState, ReactNode } from "react";

type FilterState = {
  search: string;
  category: string;
  inStockOnly: boolean;
};

type FilterContextType = FilterState & {
  setSearch: (v: string) => void;
  setCategory: (v: string) => void;
  setInStockOnly: (v: boolean) => void;
  clear: () => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [inStockOnly, setInStockOnly] = useState(false);

  const value = useMemo(
    () => ({ search, category, inStockOnly, setSearch, setCategory, setInStockOnly, clear: () => { setSearch(""); setCategory("All"); setInStockOnly(false); } }),
    [search, category, inStockOnly]
  );

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

export const useFilters = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilters must be used within FilterProvider");
  return ctx;
};
