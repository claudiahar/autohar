import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2, X, ArrowRight, MessageCircle, Check, SlidersHorizontal } from "lucide-react";
import { SEO, localBusinessJsonLd, createBreadcrumbJsonLd } from "@/components/SEO";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";

const PRODUCTS_PER_PAGE = 24;

const partsBreadcrumb = createBreadcrumbJsonLd([
  { name: "Acasă", url: "/" },
  { name: "Piese Auto", url: "/piese-auto" },
]);

const PartsPage = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasNextPage, setHasNextPage] = useState(false);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const fetchProducts = async (query?: string, after?: string, append = false) => {
    append ? setLoadingMore(true) : setLoading(true);
    try {
      const variables: Record<string, unknown> = { first: PRODUCTS_PER_PAGE };
      if (query) variables.query = query;
      if (after) variables.after = after;
      const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, variables);
      const edges = data?.data?.products?.edges || [];
      const pageInfo = data?.data?.products?.pageInfo;
      append ? setProducts((prev) => [...prev, ...edges]) : setProducts(edges);
      setHasNextPage(pageInfo?.hasNextPage || false);
      setEndCursor(pageInfo?.endCursor || null);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProducts(searchQuery || undefined);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchTerm.trim());
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchQuery("");
  };

  return (
    <>
      <SEO
        title="Catalog Piese Auto | Magazin Online - Auto Har Suceava"
        description="Catalog piese auto originale din dezmembrări. Motoare, cutii de viteze, caroserie, electronice. Cumpără online cu livrare în toată România."
        keywords="piese auto online, catalog piese dezmembrări, magazin piese auto, cumpara piese auto"
        canonical="/piese-auto"
        jsonLd={[localBusinessJsonLd, partsBreadcrumb]}
      />
      <div className="min-h-screen pt-20">
        {/* Hero compact */}
        <section className="py-12 md:py-16 bg-card relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
                Catalog <span className="text-primary">Piese Auto</span>
              </h1>
              <p className="text-muted-foreground mb-8">
                Răsfoiește catalogul nostru de piese auto originale din dezmembrări.
              </p>

              {/* Search */}
              <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Caută piese auto (ex: motor Audi A4, far BMW...)"
                    className="pl-10 pr-8 h-12 bg-secondary border-border"
                  />
                  {searchTerm && (
                    <button type="button" onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <Button type="submit" variant="hero" size="lg">
                  <Search className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Info Banner */}
        <section className="py-3 bg-gradient-to-r from-primary to-primary/90">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-10 text-primary-foreground">
              {["Piese originale", "Garanție inclusă", "Posibilitate retur", "Livrare în toată țara"].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span className="font-medium text-xs sm:text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            {searchQuery && (
              <div className="flex items-center gap-2 mb-6">
                <span className="text-muted-foreground text-sm">
                  Rezultate pentru: <strong className="text-foreground">"{searchQuery}"</strong>
                </span>
                <button onClick={clearSearch} className="text-xs text-accent hover:underline">
                  Șterge filtrul
                </button>
              </div>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg mb-4">Nu am găsit produse.</p>
                {searchQuery && (
                  <Button variant="outline" onClick={clearSearch}>Resetează căutarea</Button>
                )}
                <div className="mt-8">
                  <p className="text-muted-foreground mb-4">Nu găsești piesa căutată? Contactează-ne!</p>
                  <div className="flex gap-3 justify-center">
                    <Button variant="hero" asChild>
                      <Link to="/contact">Cere ofertă<ArrowRight className="w-4 h-4" /></Link>
                    </Button>
                    <Button variant="mint" asChild>
                      <a href="https://wa.me/40749707694" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-4 h-4" />WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.node.id} product={product} />
                  ))}
                </div>

                {hasNextPage && (
                  <div className="text-center mt-10">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => fetchProducts(searchQuery || undefined, endCursor || undefined, true)}
                      disabled={loadingMore}
                    >
                      {loadingMore ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                      Încarcă mai multe produse
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-card relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px]" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
              Nu găsești piesa <span className="text-primary">căutată</span>?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Contactează-ne și te ajutăm să găsești exact piesa de care ai nevoie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">Cere ofertă<ArrowRight className="w-5 h-5" /></Link>
              </Button>
              <Button variant="mint" size="xl" asChild>
                <a href="https://wa.me/40749707694" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PartsPage;
