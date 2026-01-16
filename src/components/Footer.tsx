import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="block">
              <img 
                src={logo} 
                alt="Auto Har - Dezmembrări Suceava" 
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Piese auto originale din dezmembrări pentru toate mărcile. 
              Calitate, prețuri competitive și livrare rapidă în toată România.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-base text-foreground mb-5">Navigare</h3>
            <ul className="space-y-3">
              {[
                { name: "Acasă", path: "/" },
                { name: "Despre noi", path: "/despre-noi" },
                { name: "Piese auto", path: "/piese-auto" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground text-sm hover:text-accent transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-base text-foreground mb-5">Categorii piese</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Piese motor</li>
              <li>Cutii de viteze</li>
              <li>Elemente caroserie</li>
              <li>Electronice & senzori</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-base text-foreground mb-5">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-col gap-1">
                  <a href="tel:+40749707694" className="hover:text-primary transition-colors">+40 749 707 694</a>
                  <a href="tel:+40748951120" className="hover:text-primary transition-colors">+40 748 951 120</a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span>autohargrup@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Strada+Traian+Popovici+156,+Suceava,+Romania" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Strada Traian Popovici 156, Suceava
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Auto Har. Toate drepturile rezervate.
          </p>
          <p className="text-muted-foreground text-xs">
            Import Belgia • Spania • Germania • Italia
          </p>
        </div>
      </div>
    </footer>
  );
};
