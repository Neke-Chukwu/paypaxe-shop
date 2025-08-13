import { useMemo } from "react";
//import products from "@/data/products.json";
import { useFilters } from "@/context/filter-context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const FilterBar = ({ categories }: { categories: string[] }) => {
  const { category, setCategory, inStockOnly, setInStockOnly } = useFilters();

  const categoryOptions = useMemo(() => ["All", ...categories], [categories]);

  return (
    <aside className="w-full md:w-64 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="instock">In stock only</Label>
        <Switch id="instock" checked={inStockOnly} onCheckedChange={setInStockOnly} />
      </div>
    </aside>
  );
};

export default FilterBar;
