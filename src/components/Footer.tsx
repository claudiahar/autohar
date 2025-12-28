import { Link } from "react-router-dom";
import { Car, Phone, Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Car className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display text-xl text-foreground tracking-wide">
                AUTO<span className="text-primary">PIESE</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Piese auto originale din dezmembrări pentru toate mărcile. 
              Calitate, prețuri competitive și livrare rapidă în toată România.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg text-foreground mb-4">NAVIGARE</h3>
            <ul className="space-y-2">
              {[
                { name: "Acasă", path: "/" },
                { name: "Despre noi", path: "/despre-noi" },
                { name: "Piese auto", path: "/piese-auto" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-lg text-foreground mb-4">CATEGORII PIESE</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Piese motor</li>
              <li>Cutii de viteze</li>
              <li>Elemente caroserie</li>
              <li>Electronice & senzori</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg text-foreground mb-4">CONTACT</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>+40 721 234 567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>contact@autopiese.ro</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>Strada Industriilor Nr. 15, București</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} AutoPiese. Toate drepturile rezervate.
          </p>
          <p className="text-muted-foreground text-xs">
            Piese auto din dezmembrări • Import Germania, Spania, Italia, Belgia
          </p>
        </div>
      </div>
    </footer>
  );
};
