import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Award, Users, Globe, Handshake, MessageCircle } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              DESPRE <span className="text-gradient">NOI</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Cu o experiență de peste 15 ani în domeniul pieselor auto din dezmembrări, 
              suntem partenerul de încredere pentru sute de clienți din toată România.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                POVESTEA <span className="text-gradient">NOASTRĂ</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Am început activitatea în 2008, cu o mică unitate de dezmembrări și un singur angajat. 
                  Pasiunea pentru automobile și dorința de a oferi soluții accesibile ne-au ghidat în dezvoltarea 
                  unei afaceri bazate pe încredere și calitate.
                </p>
                <p>
                  Astăzi, dispunem de un stoc impresionant de piese auto provenite din autoturisme 
                  aduse din <strong className="text-foreground">Germania, Spania, Italia și Belgia</strong>. 
                  Selectăm cu grijă fiecare vehicul pentru a vă oferi doar piese în stare foarte bună de funcționare.
                </p>
                <p>
                  Echipa noastră de specialiști verifică și testează fiecare piesă înainte de a ajunge la clienți, 
                  garantând astfel calitatea și fiabilitatea produselor noastre.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "15+", label: "Ani de experiență" },
                { value: "10.000+", label: "Clienți mulțumiți" },
                { value: "50.000+", label: "Piese în stoc" },
                { value: "4", label: "Țări de import" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-xl border border-border text-center hover-lift"
                >
                  <div className="font-display text-4xl text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl text-center text-foreground mb-12">
            VALORILE <span className="text-gradient">NOASTRE</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: "Calitate",
                description: "Piese originale, verificate și testate pentru performanță optimă.",
              },
              {
                icon: Handshake,
                title: "Seriozitate",
                description: "Respectăm fiecare angajament și livrăm la timp.",
              },
              {
                icon: Users,
                title: "Suport",
                description: "Echipă dedicată pentru consiliere și asistență tehnică.",
              },
              {
                icon: Globe,
                title: "Transparență",
                description: "Prețuri corecte și informații complete despre fiecare piesă.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="card-gradient p-6 rounded-xl border border-border hover-lift group text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Import Countries */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl text-center text-foreground mb-8">
            IMPORTĂM DIN TOATĂ <span className="text-gradient">EUROPA</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Colaborăm cu furnizori de încredere din cele mai importante piețe auto europene, 
            asigurând un flux constant de piese de calitate.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { country: "Germania", flag: "🇩🇪" },
              { country: "Spania", flag: "🇪🇸" },
              { country: "Italia", flag: "🇮🇹" },
              { country: "Belgia", flag: "🇧🇪" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl border border-border text-center hover:border-primary/50 transition-colors duration-300"
              >
                <div className="text-5xl mb-3">{item.flag}</div>
                <div className="font-display text-lg text-foreground">{item.country}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-center text-foreground mb-12">
              DE CE <span className="text-gradient">NOI</span>?
            </h2>

            <ul className="space-y-4">
              {[
                "Experiență de peste 15 ani în domeniul dezmembrărilor auto",
                "Piese originale, second-hand, în stare foarte bună de funcționare",
                "Garanție pentru toate piesele comercializate",
                "Livrare rapidă în toată România prin curier",
                "Consiliere tehnică gratuită pentru alegerea piesei potrivite",
                "Prețuri competitive, cu până la 70% mai mici decât piesele noi",
                "Stoc vast de piese pentru cele mai populare mărci auto",
                "Suport clienți disponibil prin telefon, email și WhatsApp",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border"
                >
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            PREGĂTIȚI SĂ <span className="text-gradient">COLABORĂM</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Contactează-ne pentru a găsi piesa de care ai nevoie la cel mai bun preț.
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
      </section>
    </div>
  );
};

export default AboutPage;
