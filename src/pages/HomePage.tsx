import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Truck, Shield, Euro, Wrench, Car, Cog, MessageCircle, ArrowRight, Phone } from "lucide-react";
import { SEO, localBusinessJsonLd, websiteJsonLd, createFAQJsonLd } from "@/components/SEO";
import heroBg from "@/assets/hero-bg.jpg";
const benefits = [{
  icon: Euro,
  title: "Prețuri Accesibile",
  description: "Economisești față de piesele noi, cu aceeași calitate."
}, {
  icon: Shield,
  title: "Piese Originale",
  description: "Toate piesele sunt originale, provenite din autoturisme importate."
}, {
  icon: Truck,
  title: "Livrare Rapidă",
  description: "Livrăm în toată România în 24-48 ore prin curier."
}, {
  icon: Check,
  title: "Garanție & Retur",
  description: "Piesele beneficiază de garanție și posibilitatea returului în cazul în care piesa nu este compatibilă."
}];
const carBrands = ["Volkswagen", "Audi", "BMW", "Mercedes", "Opel", "Ford", "Renault", "Peugeot", "Skoda", "Seat", "Toyota", "Hyundai"];

// FAQ data for structured data
const homeFAQs = [{
  question: "Livrați piese auto în Suceava, Botoșani, Piatra Neamț și Iași?",
  answer: "Da, livrăm piese auto din dezmembrări în toate aceste orașe și în toată Moldova. Livrarea se face prin curier în 24-48 ore."
}, {
  question: "Ce garanție oferă Auto Har pentru piesele din dezmembrări?",
  answer: "Toate piesele noastre beneficiază de garanție și posibilitatea returului în cazul în care piesa nu este compatibilă cu autovehiculul dumneavoastră."
}, {
  question: "Din ce țări importați piesele auto?",
  answer: "Importăm autoturisme și piese din Belgia, Spania, Germania și Italia, garantând calitatea și originalitatea pieselor."
}];
const HomePage = () => {
  return <>
      <SEO title="Piese Auto din Dezmembrări Suceava | Livrare Botoșani, Piatra Neamț, Iași" description="Piese auto din dezmembrări Suceava - Auto Har oferă piese originale second-hand pentru toate mărcile. Livrare rapidă în Suceava, Botoșani, Piatra Neamț, Iași și toată Moldova. Import din Belgia, Spania, Germania, Italia. Prețuri accesibile, garanție inclusă." keywords="piese auto din dezmembrări Suceava, dezmembrări auto Suceava, piese auto Botoșani, piese auto Piatra Neamț, piese auto Iași, piese auto second-hand Moldova, Auto Har, dezmembrări Moldova, piese auto originale, import piese auto Europa" canonical="/" jsonLd={[localBusinessJsonLd, websiteJsonLd, createFAQJsonLd(homeFAQs)]} />
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src={heroBg} alt="Piese auto din dezmembrări Suceava" className="w-full h-full object-cover" />
          <div className="hero-overlay absolute inset-0" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/15 rounded-full blur-[120px]" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 backdrop-blur-sm border border-foreground/10 mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-muted-foreground">Import din Belgia • Spania • Germania • Italia</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 animate-fade-up leading-tight">
            Piese Auto din Dezmembrări
            <br />
            <span className="text-gradient">Pentru Toate Mărcile</span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-up" style={{
            animationDelay: "0.1s"
          }}>
            Piese auto second-hand originale și garantate. 
            Găsește piesa potrivită la cel mai bun preț.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{
            animationDelay: "0.2s"
          }}>
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

          {/* Quick stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-fade-up" style={{
            animationDelay: "0.3s"
          }}>
            {[{
              value: "15+",
              label: "Ani experiență"
            }, {
              value: "10K+",
              label: "Clienți mulțumiți"
            }, {
              value: "50K+",
              label: "Piese în stoc"
            }, {
              value: "100%",
              label: "Piese originale"
            }].map((stat, index) => <div key={index} className="p-4 rounded-2xl bg-foreground/5 backdrop-blur-sm border border-foreground/10">
                <div className="font-display text-3xl md:text-4xl text-accent">{stat.value}</div>
                <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
              </div>)}
          </div>
        </div>

        {/* Animated car icon - perfectly centered */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <div className="animate-float">
            <div className="w-16 h-16 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center border border-accent/30">
              <Car className="w-8 h-8 text-accent" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl text-foreground">
              De ce să alegi <span className="text-primary">Auto Har</span>?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => <div key={index} className="card-glass p-6 rounded-2xl border border-border/50 hover-lift group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-background relative">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl text-foreground">
              Categorii de <span className="text-accent">piese auto</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{
              icon: Cog,
              title: "Piese Motor",
              items: ["Motoare complete", "Injectoare", "Turbine", "Pompe"]
            }, {
              icon: Car,
              title: "Transmisie",
              items: ["Cutii de viteze", "Ambreiaje", "Cardane", "Diferențiale"]
            }, {
              icon: Shield,
              title: "Caroserie",
              items: ["Uși", "Capote", "Aripi", "Bare"]
            }, {
              icon: Wrench,
              title: "Electronice",
              items: ["ECU", "Senzori", "Calculatoare", "Module"]
            }].map((category, index) => <div key={index} className="bg-card p-6 rounded-2xl border border-border hover:border-accent/50 transition-all duration-300 group hover-lift">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center mb-5">
                  <category.icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-2.5">
                  {category.items.map((item, i) => <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {item}
                    </li>)}
                </ul>
              </div>)}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/piese-auto">
                Vezi toate categoriile
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl text-center text-foreground mb-10">
            Mărci auto disponibile
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {carBrands.map((brand, index) => <div key={index} className="px-5 py-3 bg-secondary rounded-xl text-foreground text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 cursor-default">
                {brand}
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA Section with Contact Info */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-6">
            Ai nevoie de o <span className="text-gradient">piesă auto</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-lg">Trimite-ne o cerere de ofertă și îți răspundem în cel mai scurt timp cu cel mai bun preț. 
Sau ne poți vizita la sediul nostru: Str. Traian Popovici nr. 156, Suceava.</p>
          
          {/* Phone numbers stacked vertically */}
          

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Cere ofertă gratuită
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="mint" size="xl" asChild>
              <a href="https://wa.me/40749707694" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Scrie pe WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
      </div>
    </>;
};
export default HomePage;