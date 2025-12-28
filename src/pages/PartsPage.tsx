import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Cog, Car, Shield, Wrench, Cpu, Settings, MessageCircle } from "lucide-react";

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
    title: "Suspensie & Direcție",
    description: "Componente pentru sistemele de suspensie și direcție.",
    items: [
      "Amortizoare față/spate",
      "Arcuri spirale",
      "Fuzete și pivoti",
      "Bielete antiruliu",
      "Cremaiere de direcție",
      "Pompe servo-direcție",
    ],
  },
  {
    icon: Shield,
    title: "Frânare",
    description: "Piese pentru sistemul de frânare în condiții optime.",
    items: [
      "Discuri de frână",
      "Etriere și plăcuțe",
      "Cilindri de frână",
      "Pompe de frână",
      "Furtune și conducte",
      "Senzori ABS",
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
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              PIESE AUTO DIN <span className="text-gradient">DEZMEMBRĂRI</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Dispunem de un stoc vast de piese auto originale, second-hand, 
              în stare foarte bună de funcționare. Toate piesele sunt verificate și testate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">Cere ofertă</Link>
              </Button>
              <Button variant="whatsapp" size="xl" asChild>
                <a href="https://wa.me/40721234567" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-8 bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-primary-foreground">
            {[
              "Piese originale",
              "Second-hand verificate",
              "Garanție inclusă",
              "Livrare în toată țara",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl text-center text-foreground mb-4">
            CATEGORII DE <span className="text-gradient">PIESE</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Explorează gama noastră completă de piese auto pentru orice componentă a mașinii tale.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partsCategories.map((category, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <category.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-foreground">{category.title}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                <ul className="space-y-2">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
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
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl text-center text-foreground mb-4">
            MĂRCI AUTO <span className="text-gradient">DISPONIBILE</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Avem piese pentru cele mai populare mărci auto din Europa.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="px-5 py-3 bg-secondary rounded-lg text-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl text-center text-foreground mb-12">
            CUM <span className="text-gradient">FUNCȚIONEAZĂ</span>?
          </h2>

          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Cere Ofertă", desc: "Trimite-ne detaliile piesei de care ai nevoie." },
              { step: "02", title: "Verificăm Stocul", desc: "Căutăm piesa în stocul nostru și la parteneri." },
              { step: "03", title: "Primești Oferta", desc: "Îți trimitem prețul și detaliile despre piesă." },
              { step: "04", title: "Livrare Rapidă", desc: "Livrăm prin curier în 24-48 ore în toată țara." },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
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
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            NU GĂSEȘTI PIESA <span className="text-gradient">CĂUTATĂ</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Contactează-ne și te ajutăm să găsești exact piesa de care ai nevoie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">Cere ofertă personalizată</Link>
            </Button>
            <Button variant="whatsapp" size="xl" asChild>
              <a href="https://wa.me/40721234567" target="_blank" rel="noopener noreferrer">
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
