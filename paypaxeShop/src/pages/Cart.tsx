import { useMemo } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectCartItems, selectCartCount, selectCartTotal } from "@/store/cart/selectors";
import CartItem from "@/components/cart/CartItem";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/common/EmptyState";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/format";

const Cart = () => {
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const total = useAppSelector(selectCartTotal);

  const hasItems = items.length > 0;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {!hasItems ? (
        <EmptyState
          title="Your cart is empty"
          description="Browse products and add items to your cart."
          cta={<Button asChild><Link to="/">Start shopping</Link></Button>}
        />
      ) : (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-card border border-border rounded-lg p-4">
            {items.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>
          <aside className="bg-card border border-border rounded-lg p-4 h-fit">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Items</span>
              <span className="font-medium">{count}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">{formatCurrency(total)}</span>
            </div>
            <Button className="w-full" disabled={!hasItems}>Checkout</Button>
          </aside>
        </section>
      )}
    </main>
  );
};

export default Cart;
