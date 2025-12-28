import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
export const Footer = () => {
  return <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <span className="font-display text-lg font-bold text-primary-foreground">H</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-accent" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl text-foreground tracking-tight leading-none">
                  AUTO <span className="text-primary">HAR</span>
                </span>
              </div>
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
              {[{
              name: "Acasă",
              path: "/"
            }, {
              name: "Despre noi",
              path: "/despre-noi"
            }, {
              name: "Piese auto",
              path: "/piese-auto"
            }, {
              name: "Contact",
              path: "/contact"
            }].map(link => <li key={link.path}>
                  <Link to={link.path} className="text-muted-foreground text-sm hover:text-accent transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-base text-foreground mb-5">Categorii piese</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="hover:text-accent transition-colors cursor-default">Piese motor</li>
              <li className="hover:text-accent transition-colors cursor-default">Cutii de viteze</li>
              <li className="hover:text-accent transition-colors cursor-default">Elemente caroserie</li>
              <li className="hover:text-accent transition-colors cursor-default">Electronice & senzori</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-base text-foreground mb-5">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-muted-foreground group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span>
+40 749 707 694                                                                                                                                              
+40 748 951 120 </span>
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
                <span>Strada Traian Popovici 156,
Suceava


 </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Auto Har. Toate drepturile rezervate.
          </p>
          <p className="text-muted-foreground text-xs">
            Import Germania • Spania • Italia • Belgia
          </p>
        </div>
      </div>
    </footer>;
};