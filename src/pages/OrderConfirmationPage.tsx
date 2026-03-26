import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { CheckCircle, ArrowRight, Phone } from "lucide-react";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const state = location.state as { orderNumber?: number; customerName?: string; total?: number } | null;

  return (
    <>
      <SEO title="Comandă confirmată | Auto Har" description="Comanda ta a fost plasată cu succes." canonical="/comanda-confirmata" />
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-lg mx-auto text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-accent" />
            </div>

            <h1 className="font-display text-2xl md:text-3xl text-foreground">
              Comanda a fost <span className="text-accent">plasată cu succes!</span>
            </h1>

            {state?.orderNumber && (
              <p className="text-muted-foreground">
                Număr comandă: <strong className="text-foreground">#{state.orderNumber}</strong>
              </p>
            )}

            {state?.customerName && (
              <p className="text-muted-foreground">
                Mulțumim, <strong className="text-foreground">{state.customerName}</strong>!
              </p>
            )}

            {state?.total && (
              <div className="bg-card rounded-2xl p-6 border border-border">
                <p className="text-sm text-muted-foreground mb-1">Total de plată (ramburs)</p>
                <p className="font-display text-3xl text-primary">{state.total.toFixed(0)} RON</p>
              </div>
            )}

            <div className="bg-card rounded-2xl p-6 border border-border text-left space-y-3">
              <h2 className="font-display text-lg text-foreground">Ce urmează?</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  Vei fi contactat telefonic pentru confirmarea comenzii
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  Comanda va fi expediată în 24-48 ore lucrătoare
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  Plata se face ramburs la primirea coletului
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button variant="hero" asChild>
                <Link to="/piese-auto">Continuă cumpărăturile <ArrowRight className="w-4 h-4" /></Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="tel:+40749707694"><Phone className="w-4 h-4 mr-2" />Sună-ne</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmationPage;
