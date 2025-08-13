import { useMemo } from "react";
import productsData from "@/data/products.json";
import ProductCard, { Product } from "@/components/products/ProductCard";
import FilterBar from "@/components/products/FilterBar";
import { useFilters } from "@/context/filter-context";
import EmptyState from "@/components/common/EmptyState";

const getCategories = (products: Product[]) => Array.from(new Set(products.map(p => p.category)));

const Home = () => {
  const products = productsData as Product[];
  const { search, category, inStockOnly } = useFilters();

  const categories = useMemo(() => getCategories(products), [products]);

  const filtered = useMemo(() => {
    const s = search.toLowerCase().trim();
    return products.filter(p => {
      const bySearch = !s || p.name.toLowerCase().includes(s);
      const byCategory = category === "All" || p.category === category;
      const byStock = !inStockOnly || p.inStock;
      return bySearch && byCategory && byStock;
    });
  }, [products, search, category, inStockOnly]);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Products</h1>
      <section className="flex flex-col md:flex-row gap-8">
        <FilterBar categories={categories} />
        <div className="flex-1">
          {filtered.length === 0 ? (
            <EmptyState title="No products found" description="Try adjusting your search or filters." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "PayPaxe Shops",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }) }} />
    </main>
  );
};

export default Home;
