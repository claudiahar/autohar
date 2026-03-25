import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus, Loader2, ArrowLeft, Check } from "lucide-react";
import { SEO } from "@/components/SEO";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const ProductPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const isCartLoading = useCartStore((s) => s.isLoading);

  useEffect(() => {
    if (!handle) return;
    setLoading(true);
    storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle })
      .then((data) => {
        const p = data?.data?.product;
        setProduct(p || null);
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-lg">Produsul nu a fost găsit.</p>
        <Button variant="outline" asChild>
          <Link to="/piese-auto"><ArrowLeft className="w-4 h-4 mr-2" />Înapoi la catalog</Link>
        </Button>
      </div>
    );
  }

  const images = product.images?.edges || [];
  const variants = product.variants?.edges || [];
  const selectedVariant = variants[selectedVariantIdx]?.node;
  const hasMultipleVariants = variants.length > 1 && !(variants.length === 1 && variants[0].node.title === "Default Title");

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    const shopifyProduct: ShopifyProduct = { node: product };
    await addItem({
      product: shopifyProduct,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success("Produs adăugat în coș", { position: "top-center" });
  };

  return (
    <>
      <SEO
        title={`${product.title} | Auto Har - Piese Auto`}
        description={product.description?.slice(0, 160) || `${product.title} - piesă auto disponibilă la Auto Har.`}
        canonical={`/produs/${handle}`}
      />
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">Acasă</Link>
            <span>/</span>
            <Link to="/piese-auto" className="hover:text-foreground transition-colors">Piese Auto</Link>
            <span>/</span>
            <span className="text-foreground line-clamp-1">{product.title}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-card rounded-2xl border border-border overflow-hidden">
                {images[selectedImage]?.node ? (
                  <img
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <ShoppingCart className="w-16 h-16" />
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-16 h-16 rounded-lg border-2 overflow-hidden shrink-0 transition-colors ${
                        i === selectedImage ? "border-accent" : "border-border hover:border-muted-foreground"
                      }`}
                    >
                      <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <h1 className="font-display text-2xl md:text-3xl text-foreground">{product.title}</h1>

              {selectedVariant && (
                <div className="font-display text-3xl text-primary">
                  {parseFloat(selectedVariant.price.amount).toFixed(0)} {selectedVariant.price.currencyCode}
                </div>
              )}

              {/* Variant selector */}
              {hasMultipleVariants && (
                <div className="space-y-3">
                  <span className="text-sm text-muted-foreground font-medium">Variante</span>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v, i) => (
                      <button
                        key={v.node.id}
                        onClick={() => setSelectedVariantIdx(i)}
                        disabled={!v.node.availableForSale}
                        className={`px-4 py-2 rounded-xl text-sm border transition-all ${
                          i === selectedVariantIdx
                            ? "border-accent bg-accent/10 text-foreground"
                            : "border-border text-muted-foreground hover:border-muted-foreground"
                        } ${!v.node.availableForSale ? "opacity-40 cursor-not-allowed line-through" : ""}`}
                      >
                        {v.node.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground font-medium">Cantitate</span>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-10 text-center font-medium">{quantity}</span>
                  <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Add to cart */}
              <Button
                variant="hero"
                size="xl"
                className="w-full"
                onClick={handleAddToCart}
                disabled={isCartLoading || !selectedVariant?.availableForSale}
              >
                {isCartLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Adaugă în coș
                  </>
                )}
              </Button>

              {selectedVariant && !selectedVariant.availableForSale && (
                <p className="text-destructive text-sm font-medium">Momentan indisponibil</p>
              )}

              {/* Info badges */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                {["Piesă originală", "Garanție inclusă", "Retur posibil", "Livrare 24-48h"].map((text) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    {text}
                  </div>
                ))}
              </div>

              {/* Description */}
              {product.description && (
                <div className="pt-4 border-t border-border">
                  <h2 className="font-display text-lg text-foreground mb-3">Descriere</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
