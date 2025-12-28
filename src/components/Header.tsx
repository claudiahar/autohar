import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Acasă", path: "/" },
  { name: "Despre noi", path: "/despre-noi" },
  { name: "Piese auto", path: "/piese-auto" },
  { name: "Contact", path: "/contact" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <span className="font-display text-lg font-bold text-primary-foreground">H</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-accent" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl text-foreground tracking-tight leading-none">
                AUTO <span className="text-primary">HAR</span>
              </span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Piese auto</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button variant="hero" asChild>
              <Link to="/contact">Cere ofertă</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground rounded-lg hover:bg-foreground/5 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-xl border-t border-border animate-fade-in">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`py-3 px-4 rounded-xl text-base font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button variant="hero" size="lg" className="mt-4" asChild>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                Cere ofertă
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
