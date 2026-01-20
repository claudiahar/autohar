import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Award, Users, Globe, Handshake, MessageCircle, ArrowRight } from "lucide-react";
import { SEO, localBusinessJsonLd, createBreadcrumbJsonLd } from "@/components/SEO";
import aboutHero from "@/assets/about-hero.jpg";

// Breadcrumb for About page
const aboutBreadcrumb = createBreadcrumbJsonLd([
  { name: "Acasă", url: "/" },
  { name: "Despre Noi", url: "/despre-noi" }
]);

const AboutPage = () => {
  return (
    <>
      <SEO
        title="Despre Noi - Dezmembrări Auto Suceava | 15+ Ani Experiență"
        description="Auto Har - dezmembrări auto Suceava cu peste 15 ani experiență. Livrare rapidă piese auto în Suceava, Botoșani, Piatra Neamț, Iași. Importăm din Belgia, Spania, Germania, Italia. Peste 10.000 clienți mulțumiți în Moldova."
        keywords="dezmembrări auto Suceava, despre Auto Har, experiență dezmembrări, piese auto Botoșani, piese auto Piatra Neamț, piese auto Iași, import piese auto Europa, dezmembrări Moldova"
        canonical="/despre-noi"
        jsonLd={[localBusinessJsonLd, aboutBreadcrumb]}
      />
      <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Experiență de peste <span className="text-primary">15 ani</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Cu o experiență de peste 15 de ani în domeniul pieselor auto din dezmembrări, 
              suntem partenerul de încredere pentru clienți din întreaga țară.
            </p>
          </div>
          
          {/* Hero Image */}
          <div className="max-w-4xl mx-auto mt-8">
            
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                De la pasiune la <span className="text-accent">afacere</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Activitatea noastră a început în anul 2010, din dorința de a oferi clienților piese auto second-hand originale, provenite din dezmembrări, la prețuri corecte. De-a lungul timpului, ne-am dezvoltat constant și am devenit un partener de încredere pentru clienți din întreaga țară.
                </p>
                <p>
                  Importăm autoturisme din <span className="text-foreground font-medium">Belgia, Spania, Germania și Italia</span>, iar piesele rezultate sunt puse la dispoziția clienților cu garanție și posibilitatea returului în cazul în care piesa nu este compatibilă.
                </p>
                <p>
                  Punem accent pe seriozitate, transparență și comunicare rapidă, oferind soluții eficiente pentru majoritatea mărcilor auto.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[{
              value: "15+",
              label: "Ani de experiență"
            }, {
              value: "10K+",
              label: "Clienți mulțumiți"
            }, {
              value: "50K+",
              label: "Piese în stoc"
            }, {
              value: "4",
              label: "Țări de import"
            }].map((stat, index) => <div key={index} className="bg-card p-6 rounded-2xl border border-border text-center hover-lift">
                  <div className="font-display text-4xl text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-card relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              Ce ne <span className="text-accent">definește</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{
            icon: Award,
            title: "Calitate",
            description: "Piese auto originale din dezmembrări, selectate pentru a oferi un raport corect între preț și funcționalitate."
          }, {
            icon: Handshake,
            title: "Seriozitate",
            description: "Respectăm fiecare angajament și livrăm la timp."
          }, {
            icon: Users,
            title: "Suport",
            description: "Suntem disponibili pentru informații rapide și comunicare eficientă pe tot parcursul procesului de comandă."
          }, {
            icon: Globe,
            title: "Transparență",
            description: "Prețuri corecte și informații complete despre fiecare piesă."
          }].map((value, index) => <div key={index} className="card-glass p-6 rounded-2xl border border-border/50 hover-lift group text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Import Countries with Flags - visible on mobile and desktop */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              Importăm din <span className="text-primary">Europa</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
            {[{
              country: "Belgia",
              flag: "https://flagcdn.com/w80/be.png"
            }, {
              country: "Spania",
              flag: "https://flagcdn.com/w80/es.png"
            }, {
              country: "Germania",
              flag: "https://flagcdn.com/w80/de.png"
            }, {
              country: "Italia",
              flag: "https://flagcdn.com/w80/it.png"
            }].map((item, index) => (
              <div key={index} className="bg-card p-4 md:p-6 rounded-2xl border border-border text-center hover:border-accent/50 hover-lift transition-all duration-300">
                <img 
                  src={item.flag} 
                  alt={`Steag ${item.country}`} 
                  className="w-12 h-8 md:w-16 md:h-12 object-cover rounded mx-auto mb-2 md:mb-3 shadow-sm"
                />
                <div className="font-display text-sm md:text-lg text-foreground">{item.country}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl md:text-4xl text-foreground">
                De ce <span className="text-accent">noi</span>?
              </h2>
            </div>

            <ul className="space-y-4">
              {["Experiență de peste 15 de ani în domeniul dezmembrărilor auto", "Piese originale, second-hand, în stare foarte bună de funcționare", "Piesele beneficiază de garanție și posibilitatea returului în cazul în care piesa nu este compatibilă", "Livrare rapidă în toată România prin curier", "Stoc vast de piese pentru cele mai populare mărci auto", "Suport clienți disponibil prin telefon, email și WhatsApp"].map((item, index) => <li key={index} className="flex items-start gap-4 p-4 bg-background rounded-xl border border-border hover:border-accent/30 transition-colors">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
            Pregătiți să <span className="text-accent">colaborăm</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            Contactează-ne pentru a găsi piesa de care ai nevoie la cel mai bun preț.
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
      </section>
      </div>
    </>
  );
};
export default AboutPage;