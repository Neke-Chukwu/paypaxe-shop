import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/store/hooks";
import { addItemToCart } from "@/store/cart/cartSlice";
import { formatCurrency } from "@/utils/format";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  inStock: boolean;
  quantity: number; // available stock
};

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useAppDispatch();
  const handleAdd = () => {
    dispatch(addItemToCart({ id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl }));
    toast({ title: "Added to cart", description: `${product.name} added.` });
  };

  return (
    <article className="rounded-lg border border-border bg-card text-card-foreground p-3 shadow-sm hover:shadow-md transition-shadow duration-200 animate-fade-in">
      <div className="aspect-square w-full overflow-hidden rounded-md bg-muted">
        <img
          src={product.imageUrl}
          alt={`${product.name} — ${product.category}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="font-medium leading-tight">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="font-semibold">{formatCurrency(product.price)}</span>
          {product.inStock ? (
            <Badge variant="secondary">In stock</Badge>
          ) : (
            <Badge variant="destructive">Out of stock</Badge>
          )}
        </div>
        <Button
          className="w-full mt-2"
          onClick={handleAdd}
          disabled={!product.inStock}
          aria-disabled={!product.inStock}
        >
          {product.inStock ? "Add to Cart" : "Unavailable"}
        </Button>
      </div>
    </article>
  );
};

export default ProductCard;
