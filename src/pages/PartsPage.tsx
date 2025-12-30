import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Cog, Car, Wrench, Cpu, Settings, MessageCircle, ArrowRight } from "lucide-react";
import partsHero from "@/assets/parts-hero.jpg";

const partsCategories = [
  {
    icon: Cog,
    title: "Piese Motor",
    description: "Motoare complete și componente pentru toate tipurile de motorizări.",
    items: [
      "Motoare complete benzină/diesel",
      "Injectoare și pompe de injecție",
      "Turbine și turbosuflante",
      "Chiulase și blocuri motor",
      "Arbori cotit și pistoane",
      "Pompe de apă și ulei",
    ],
  },
  {
    icon: Settings,
    title: "Cutii de Viteze",
    description: "Transmisii manuale și automate pentru diverse mărci și modele.",
    items: [
      "Cutii de viteze manuale",
      "Cutii de viteze automate",
      "Cutii DSG și PowerShift",
      "Volane bimasa",
      "Ambreiaje complete",
      "Cardane și planetare",
    ],
  },
  {
    icon: Car,
    title: "Elemente Caroserie",
    description: "Piese de caroserie pentru reparații și recondiționări.",
    items: [
      "Uși și portbagaje",
      "Capote față și spate",
      "Aripi și praguri",
      "Bare față și spate",
      "Oglinzi retrovizoare",
      "Faruri și stopuri",
    ],
  },
  {
    icon: Cpu,
    title: "Electronice & Senzori",
    description: "Componente electronice și module de comandă.",
    items: [
      "ECU și calculatoare motor",
      "Senzori de parcare",
      "Module ABS și ESP",
      "Senzori lambda",
      "Senzori arbore cotit",
      "Contactoare și relee",
    ],
  },
  {
    icon: Wrench,
    title: "Suspensie",
    description: "Componente pentru sistemul de suspensie.",
    items: [
      "Amortizoare față/spate",
      "Arcuri spirale",
      "Fuzete și pivoti",
      "Bielete antiruliu",
      "Brate suspensie",
      "Bucșe și articulații",
    ],
  },
];

const brands = [
  "Volkswagen", "Audi", "BMW", "Mercedes-Benz", "Opel", "Ford",
  "Renault", "Peugeot", "Citroën", "Skoda", "Seat", "Toyota",
  "Honda", "Mazda", "Hyundai", "Kia", "Volvo", "Fiat", "Alfa Romeo", "Dacia"
];

const PartsPage = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-card relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Piese Auto din <span className="text-primary">Dezmembrări</span> Suceava
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Dispunem de un stoc vast de piese auto originale, second-hand, 
              în stare foarte bună de funcționare. Piesele beneficiază de garanție și posibilitatea returului în cazul în care piesa nu este compatibilă.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">
                  Cere ofertă
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="mint" size="xl" asChild>
                <a href="https://wa.me/40749707694" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="max-w-4xl mx-auto mt-10">
            <img 
              src={partsHero} 
              alt="Depozit piese auto din dezmembrări" 
              className="w-full h-64 md:h-80 object-cover rounded-2xl border border-border"
            />
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-5 bg-gradient-to-r from-primary to-primary/90">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-primary-foreground">
            {[
              "Piese originale",
              "Garanție inclusă",
              "Posibilitate retur",
              "Livrare în toată țara",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span className="font-medium text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-background relative">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              Găsește piesa <span className="text-accent">potrivită</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partsCategories.map((category, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-2xl border border-border hover:border-accent/50 transition-all duration-300 group hover-lift"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <category.icon className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-foreground">{category.title}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-5">{category.description}</p>
                <ul className="space-y-2.5">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              Mărci auto <span className="text-primary">disponibile</span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="px-5 py-3 bg-secondary rounded-xl text-foreground text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              Cum <span className="text-accent">funcționează</span>?
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Cere Ofertă", desc: "Trimite-ne detaliile piesei de care ai nevoie." },
              { step: "02", title: "Verificăm Stocul", desc: "Căutăm piesa în stocul nostru și la parteneri." },
              { step: "03", title: "Primești Oferta", desc: "Îți trimitem prețul și detaliile despre piesă." },
              { step: "04", title: "Livrare Rapidă", desc: "Livrăm prin curier în 24-48 ore în toată țara." },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <span className="font-display text-2xl text-primary-foreground">{item.step}</span>
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            Nu găsești piesa <span className="text-primary">căutată</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            Contactează-ne și te ajutăm să găsești exact piesa de care ai nevoie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Cere ofertă personalizată
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="mint" size="xl" asChild>
              <a href="https://wa.me/40749707694" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Întreabă pe WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartsPage;
