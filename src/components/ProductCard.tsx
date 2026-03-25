import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useCartStore, type ShopifyProduct } from "@/stores/cartStore";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const { node } = product;
  const image = node.images?.edges?.[0]?.node;
  const variant = node.variants?.edges?.[0]?.node;
  const price = node.priceRange?.minVariantPrice;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
  };

  return (
    <Link
      to={`/produs/${node.handle}`}
      className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/50 transition-all duration-300 hover-lift flex flex-col"
    >
      <div className="aspect-square bg-secondary/30 overflow-hidden">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || node.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <ShoppingCart className="w-10 h-10" />
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display text-sm text-foreground line-clamp-2 mb-2 group-hover:text-accent transition-colors">
          {node.title}
        </h3>
        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="font-display text-lg text-primary">
            {price ? `${parseFloat(price.amount).toFixed(0)} ${price.currencyCode}` : "—"}
          </span>
          <Button
            variant="mint"
            size="sm"
            onClick={handleAddToCart}
            disabled={isLoading || !variant?.availableForSale}
            className="shrink-0"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingCart className="w-4 h-4" />}
          </Button>
        </div>
        {variant && !variant.availableForSale && (
          <span className="text-xs text-destructive mt-1">Stoc epuizat</span>
        )}
      </div>
    </Link>
  );
};
