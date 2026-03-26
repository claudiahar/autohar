import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SEO } from "@/components/SEO";
import { useCartStore } from "@/stores/cartStore";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Loader2, ShoppingCart, Truck, CreditCard, MapPin } from "lucide-react";

const SHIPPING_COST = 25; // RON flat rate

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    county: "",
    postalCode: "",
    notes: "",
  });

  const subtotal = items.reduce((sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 0);
  const total = subtotal + SHIPPING_COST;

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.address.trim() || !form.city.trim() || !form.county.trim()) {
      toast.error("Completează toate câmpurile obligatorii", { position: "top-center" });
      return;
    }

    if (items.length === 0) {
      toast.error("Coșul este gol", { position: "top-center" });
      return;
    }

    setIsSubmitting(true);
    try {
      // Insert order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_name: form.name.trim(),
          customer_email: form.email.trim() || null,
          customer_phone: form.phone.trim(),
          address: form.address.trim(),
          city: form.city.trim(),
          county: form.county.trim(),
          postal_code: form.postalCode.trim() || null,
          notes: form.notes.trim() || null,
          subtotal,
          shipping_cost: SHIPPING_COST,
          total,
          payment_method: "ramburs",
        })
        .select("id, order_number")
        .single();

      if (orderError) throw orderError;

      // Insert order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_title: item.product.node.title,
        variant_title: item.variantTitle !== "Default Title" ? item.variantTitle : null,
        variant_id: item.variantId,
        price: parseFloat(item.price.amount),
        quantity: item.quantity,
        image_url: item.product.node.images?.edges?.[0]?.node?.url || null,
      }));

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
      if (itemsError) throw itemsError;

      clearCart();
      navigate(`/comanda-confirmata/${order.id}`, {
        state: {
          orderNumber: order.order_number,
          customerName: form.name,
          total,
        },
      });
    } catch (error) {
      console.error("Order failed:", error);
      toast.error("A apărut o eroare. Te rugăm să încerci din nou.", { position: "top-center" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <SEO title="Checkout | Auto Har" description="Finalizează comanda ta." canonical="/checkout" />
        <div className="min-h-screen pt-20 flex flex-col items-center justify-center gap-4">
          <ShoppingCart className="w-16 h-16 text-muted-foreground" />
          <p className="text-muted-foreground text-lg">Coșul tău este gol.</p>
          <Button variant="hero" asChild>
            <Link to="/piese-auto">Continuă cumpărăturile</Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Finalizare comandă | Auto Har" description="Completează datele pentru a finaliza comanda." canonical="/checkout" />
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Back link */}
          <Link to="/piese-auto" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Înapoi la catalog
          </Link>

          <h1 className="font-display text-2xl md:text-3xl text-foreground mb-8">Finalizare <span className="text-primary">comandă</span></h1>

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
            {/* Left - Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Customer details */}
              <div className="bg-card rounded-2xl p-6 border border-border space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-lg text-foreground">Date client & livrare</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nume complet *</Label>
                    <Input id="name" value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Ion Popescu" required className="bg-secondary border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon *</Label>
                    <Input id="phone" type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="07XX XXX XXX" required className="bg-secondary border-border" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email (opțional)</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder="email@exemplu.ro" className="bg-secondary border-border" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Adresă completă *</Label>
                  <Input id="address" value={form.address} onChange={(e) => updateField("address", e.target.value)} placeholder="Str. Exemplu, Nr. 10, Bl. A, Ap. 5" required className="bg-secondary border-border" />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Oraș *</Label>
                    <Input id="city" value={form.city} onChange={(e) => updateField("city", e.target.value)} placeholder="Suceava" required className="bg-secondary border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="county">Județ *</Label>
                    <Input id="county" value={form.county} onChange={(e) => updateField("county", e.target.value)} placeholder="Suceava" required className="bg-secondary border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Cod poștal</Label>
                    <Input id="postalCode" value={form.postalCode} onChange={(e) => updateField("postalCode", e.target.value)} placeholder="720000" className="bg-secondary border-border" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Observații (opțional)</Label>
                  <Textarea id="notes" value={form.notes} onChange={(e) => updateField("notes", e.target.value)} placeholder="Instrucțiuni speciale pentru livrare..." className="bg-secondary border-border resize-none" rows={3} />
                </div>
              </div>

              {/* Payment */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-lg text-foreground">Modalitate de plată</h2>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-accent/10 border border-accent/30">
                  <Truck className="w-6 h-6 text-accent" />
                  <div>
                    <p className="font-medium text-foreground">Plată ramburs (la livrare)</p>
                    <p className="text-sm text-muted-foreground">Plătești cash când primești coletul</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 border border-border sticky top-24 space-y-4">
                <h2 className="font-display text-lg text-foreground">Sumar comandă</h2>

                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-3">
                      <div className="w-12 h-12 bg-secondary rounded-lg overflow-hidden shrink-0">
                        {item.product.node.images?.edges?.[0]?.node ? (
                          <img src={item.product.node.images.edges[0].node.url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <ShoppingCart className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">{item.product.node.title}</p>
                        <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-primary shrink-0">
                        {(parseFloat(item.price.amount) * item.quantity).toFixed(0)} RON
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{subtotal.toFixed(0)} RON</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Transport</span>
                    <span>{SHIPPING_COST} RON</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">{total.toFixed(0)} RON</span>
                  </div>
                </div>

                <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>Plasează comanda</>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Plata se face ramburs la livrare
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
