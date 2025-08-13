import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFilters } from "@/context/filter-context";
import { useAppSelector } from "@/store/hooks";
import { selectCartCount } from "@/store/cart/selectors";
import { Input } from "@/components/ui/input";

const Header = () => {
  const navigate = useNavigate();
  const { search, setSearch } = useFilters();
  const count = useAppSelector(selectCartCount);
  const [value, setValue] = useState(search);
  const rafId = useRef<number | null>(null);

  // Debounce search input
  useEffect(() => {
    const id = setTimeout(() => setSearch(value), 250);
    return () => clearTimeout(id);
  }, [value, setSearch]);

  // Signature: reactive glow background under header
  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
    });
  };

  const cartBadge = useMemo(() => (
    <span aria-label="Cart items" className="ml-2 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs px-2 py-0.5">
      {count}
    </span>
  ), [count]);

  return (
    <header onMouseMove={onMouseMove} className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border header-glow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 ring-offset-2 ring-ring">
          <img src="/favicon.ico" alt="Paypaxe" className="h-5 w-5" />
          <div className="font-semibold text-lg">PayPaxe Shops</div>
        </Link>

        <div className="relative w-full max-w-md mx-6 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search products..."
            className="pl-9"
            aria-label="Search products"
          />
        </div>

        <button
          onClick={() => navigate('/cart')}
          className="relative inline-flex items-center gap-2 focus:outline-none focus:ring-2 ring-offset-2 ring-ring hover-scale"
          aria-label="Open cart"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="hidden sm:inline">Cart</span>
          {cartBadge}
        </button>
      </div>
    </header>
  );
};

export default Header;
