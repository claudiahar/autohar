import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Truck, Shield, Euro, Wrench, Car, Cog, MessageCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const benefits = [
  {
    icon: Euro,
    title: "Prețuri Accesibile",
    description: "Economisești până la 70% față de piesele noi, cu aceeași calitate.",
  },
  {
    icon: Shield,
    title: "Piese Originale",
    description: "Toate piesele sunt originale, provenite din autoturisme verificate.",
  },
  {
    icon: Truck,
    title: "Livrare Rapidă",
    description: "Livrăm în toată România în 24-48 ore prin curier.",
  },
  {
    icon: Check,
    title: "Garanție",
    description: "Oferim garanție pentru toate piesele comercializate.",
  },
];

const carBrands = [
  "Volkswagen", "Audi", "BMW", "Mercedes", "Opel", "Ford",
  "Renault", "Peugeot", "Skoda", "Seat", "Toyota", "Hyundai"
];

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Piese auto din dezmembrări"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 animate-fade-up">
            PIESE AUTO DIN DEZMEMBRĂRI
            <br />
            <span className="text-gradient">PENTRU TOATE MĂRCILE</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Piese auto second-hand originale, verificate și garantate. 
            Import din Germania, Spania, Italia și Belgia.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                <Wrench className="w-5 h-5" />
                Cere ofertă
              </Link>
            </Button>
            <Button variant="whatsapp" size="xl" asChild>
              <a href="https://wa.me/40721234567" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </Button>
          </div>

          {/* Quick stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {[
              { value: "15+", label: "Ani experiență" },
              { value: "10.000+", label: "Clienți mulțumiți" },
              { value: "50.000+", label: "Piese în stoc" },
              { value: "100%", label: "Piese originale" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-3xl md:text-4xl text-primary">{stat.value}</div>
                <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-primary rounded-full" />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl text-center text-foreground mb-4">
            DE CE SĂ ALEGI <span className="text-gradient">AUTOPIESE</span>?
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Oferim cele mai bune piese auto din dezmembrări, cu garanție și suport complet.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="card-gradient p-6 rounded-xl border border-border hover-lift group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl text-center text-foreground mb-4">
            CATEGORII DE <span className="text-gradient">PIESE AUTO</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Găsești piese pentru orice componentă a mașinii tale.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Cog, title: "Piese Motor", items: ["Motoare complete", "Injectoare", "Turbine", "Pompe"] },
              { icon: Car, title: "Transmisie", items: ["Cutii de viteze", "Ambreiaje", "Cardane", "Diferențiale"] },
              { icon: Shield, title: "Caroserie", items: ["Uși", "Capote", "Aripi", "Bare"] },
              { icon: Wrench, title: "Electronice", items: ["ECU", "Senzori", "Calculatoare", "Module"] },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-4">
                  <category.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-3">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link to="/piese-auto">Vezi toate categoriile</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl text-center text-foreground mb-8">
            MĂRCI AUTO DISPONIBILE
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {carBrands.map((brand, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-secondary rounded-lg text-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-300 cursor-default"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            AI NEVOIE DE O <span className="text-gradient">PIESĂ AUTO</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Trimite-ne o cerere de ofertă și îți răspundem în cel mai scurt timp cu cel mai bun preț.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">Cere ofertă gratuită</Link>
            </Button>
            <Button variant="whatsapp" size="xl" asChild>
              <a href="https://wa.me/40721234567" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Scrie pe WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
