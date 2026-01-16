import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="Pagina nu a fost găsită (404)"
        description="Pagina pe care o cauți nu există. Întoarce-te la pagina principală Auto Har pentru piese auto din dezmembrări."
        canonical={location.pathname}
      />
      <div className="flex min-h-screen items-center justify-center bg-background pt-20">
        <div className="text-center px-4">
          <h1 className="font-display text-8xl text-primary mb-4">404</h1>
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
            Pagina nu a fost găsită
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Ne pare rău, dar pagina pe care o cauți nu există sau a fost mutată.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/">
                <Home className="w-5 h-5" />
                Pagina principală
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.history.back()}>
              <ArrowLeft className="w-5 h-5" />
              Înapoi
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
