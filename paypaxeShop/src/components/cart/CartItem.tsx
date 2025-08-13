import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { removeItemFromCart, updateQuantity } from "@/store/cart/cartSlice";
import { formatCurrency } from "@/utils/format";

export type CartItemProps = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

const CartItem = ({ id, name, price, imageUrl, quantity }: CartItemProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="grid grid-cols-[80px_1fr_auto] gap-4 items-center border-b border-border py-4">
      <img src={imageUrl} alt={`${name}`} className="w-20 h-20 object-cover rounded" />
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-sm text-muted-foreground">{formatCurrency(price)}</div>
        <div className="mt-2 inline-flex items-center gap-2">
          <Button variant="secondary" size="icon" aria-label="Decrease quantity" onClick={() => dispatch(updateQuantity({ id, delta: -1 }))}>
            <Minus className="h-4 w-4" />
          </Button>
          <span aria-live="polite" className="min-w-6 text-center">{quantity}</span>
          <Button variant="secondary" size="icon" aria-label="Increase quantity" onClick={() => dispatch(updateQuantity({ id, delta: 1 }))}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="font-semibold">{formatCurrency(price * quantity)}</div>
        <Button variant="destructive" size="icon" aria-label={`Remove ${name}`} onClick={() => dispatch(removeItemFromCart({ id }))}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
