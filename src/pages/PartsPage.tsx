import { useState, useEffect } from "react";
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

const CAR_BRANDS = ["Audi", "BMW", "Dacia", "Fiat", "Ford", "Honda", "Hyundai", "Kia", "Mercedes", "Nissan", "Opel", "Peugeot", "Renault", "Seat", "Skoda", "Toyota", "Volkswagen", "Volvo"];
const PART_TYPES = ["Motor", "Cutie viteze", "Turbo", "ECU", "Caroserie", "Faruri", "Suspensie", "Frâne", "Interior", "Radiator", "Electromotor", "Alternator"];

const PartsPage = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasNextPage, setHasNextPage] = useState(false);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ brand: "", partType: "", year: "" });

  const buildQuery = () => {
    const parts: string[] = [];
    if (searchQuery) parts.push(searchQuery);
    if (filters.brand) parts.push(filters.brand);
    if (filters.partType) parts.push(filters.partType);
    if (filters.year) parts.push(filters.year);
    return parts.join(" ") || undefined;
  };

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
    const q = buildQuery();
    fetchProducts(q);
  }, [searchQuery, filters.brand, filters.partType, filters.year]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchTerm.trim());
  };

  const clearAll = () => {
    setSearchTerm("");
    setSearchQuery("");
    setFilters({ brand: "", partType: "", year: "" });
  };

  const hasActiveFilters = searchQuery || filters.brand || filters.partType || filters.year;

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
              <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mx-auto mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Caută piese auto (ex: motor Audi A4, far BMW...)"
                    className="pl-10 pr-8 h-12 bg-secondary border-border"
                  />
                  {searchTerm && (
                    <button type="button" onClick={() => { setSearchTerm(""); setSearchQuery(""); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <Button type="submit" variant="hero" size="lg"><Search className="w-4 h-4" /></Button>
              </form>

              {/* Filter toggle */}
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                {showFilters ? "Ascunde filtrele" : "Filtre avansate"}
              </Button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="max-w-3xl mx-auto mt-6 bg-secondary/50 rounded-2xl p-4 md:p-6 border border-border animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Brand */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Marcă auto</label>
                    <select
                      value={filters.brand}
                      onChange={(e) => setFilters((f) => ({ ...f, brand: e.target.value }))}
                      className="w-full h-10 rounded-lg bg-secondary border border-border px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Toate mărcile</option>
                      {CAR_BRANDS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  {/* Part type */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Tip piesă</label>
                    <select
                      value={filters.partType}
                      onChange={(e) => setFilters((f) => ({ ...f, partType: e.target.value }))}
                      className="w-full h-10 rounded-lg bg-secondary border border-border px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Toate tipurile</option>
                      {PART_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* Year */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">An fabricație</label>
                    <Input
                      value={filters.year}
                      onChange={(e) => setFilters((f) => ({ ...f, year: e.target.value }))}
                      placeholder="ex: 2015"
                      className="h-10 bg-secondary border-border"
                      maxLength={4}
                    />
                  </div>
                </div>

                {hasActiveFilters && (
                  <div className="mt-4 flex justify-end">
                    <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs text-muted-foreground">
                      <X className="w-3 h-3 mr-1" /> Șterge toate filtrele
                    </Button>
                  </div>
                )}
              </div>
            )}
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
            {hasActiveFilters && (
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                <span className="text-muted-foreground text-sm">Filtre active:</span>
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-lg">
                    "{searchQuery}" <button onClick={() => { setSearchTerm(""); setSearchQuery(""); }}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {filters.brand && (
                  <span className="inline-flex items-center gap-1 bg-accent/10 text-accent text-xs px-2 py-1 rounded-lg">
                    {filters.brand} <button onClick={() => setFilters((f) => ({ ...f, brand: "" }))}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {filters.partType && (
                  <span className="inline-flex items-center gap-1 bg-accent/10 text-accent text-xs px-2 py-1 rounded-lg">
                    {filters.partType} <button onClick={() => setFilters((f) => ({ ...f, partType: "" }))}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {filters.year && (
                  <span className="inline-flex items-center gap-1 bg-accent/10 text-accent text-xs px-2 py-1 rounded-lg">
                    {filters.year} <button onClick={() => setFilters((f) => ({ ...f, year: "" }))}><X className="w-3 h-3" /></button>
                  </span>
                )}
                <button onClick={clearAll} className="text-xs text-muted-foreground hover:underline ml-2">Șterge tot</button>
              </div>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg mb-4">Nu am găsit produse.</p>
                {hasActiveFilters && (
                  <Button variant="outline" onClick={clearAll}>Resetează filtrele</Button>
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
                      onClick={() => fetchProducts(buildQuery(), endCursor || undefined, true)}
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
