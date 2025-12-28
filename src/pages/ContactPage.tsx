import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, ArrowRight } from "lucide-react";
import { z } from "zod";
const formSchema = z.object({
  name: z.string().trim().min(2, "Numele trebuie să aibă minim 2 caractere").max(100, "Numele este prea lung"),
  phone: z.string().trim().min(10, "Numărul de telefon nu este valid").max(15, "Numărul de telefon este prea lung"),
  email: z.string().trim().email("Adresa de email nu este validă").max(255, "Email-ul este prea lung"),
  carBrand: z.string().trim().min(2, "Marca auto este obligatorie").max(50, "Marca auto este prea lungă"),
  carModel: z.string().trim().min(1, "Modelul este obligatoriu").max(50, "Modelul este prea lung"),
  year: z.string().trim().min(4, "Anul nu este valid").max(4, "Anul nu este valid"),
  engine: z.string().trim().max(100, "Motorizarea este prea lungă").optional(),
  partNeeded: z.string().trim().min(5, "Descrieți piesa dorită").max(1000, "Descrierea este prea lungă")
});
type FormData = z.infer<typeof formSchema>;
const ContactPage = () => {
  const {
    toast
  } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    carBrand: "",
    carModel: "",
    year: "",
    engine: "",
    partNeeded: ""
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      formSchema.parse(formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Cerere trimisă cu succes!",
        description: "Vă vom contacta în cel mai scurt timp cu oferta noastră."
      });
      setFormData({
        name: "",
        phone: "",
        email: "",
        carBrand: "",
        carModel: "",
        year: "",
        engine: "",
        partNeeded: ""
      });
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-card relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              Contact
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              <span className="text-primary">Contactează</span>-ne
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Ai nevoie de o piesă auto? Trimite-ne o cerere și îți răspundem în cel mai scurt timp.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-20 bg-background relative">
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Date de contact
                </span>
                <h2 className="font-display text-2xl text-foreground">
                  Suntem aici pentru <span className="text-accent">tine</span>
                </h2>
              </div>

              <div className="space-y-4">
                <a href="tel:+40721234567" className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs uppercase tracking-wider">Telefon</div>
                    <div className="text-foreground font-medium">+40 749 707 694 </div>
                  </div>
                </a>

                <a href="https://wa.me/40721234567" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border hover:border-accent/50 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs uppercase tracking-wider">WhatsApp</div>
                    <div className="text-foreground font-medium">+40 749 707 694</div>
                  </div>
                </a>

                <a href="mailto:contact@autohar.ro" className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs uppercase tracking-wider">Email</div>
                    <div className="text-foreground font-medium">autohargrup@gmail.com</div>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 bg-card rounded-2xl border border-border">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs uppercase tracking-wider">Adresă</div>
                    <div className="text-foreground font-medium">
                      Strada Traian Popovici 156,<br />
                      Suceava
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card rounded-2xl border border-border">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs uppercase tracking-wider">Program</div>
                    <div className="text-foreground font-medium text-sm space-y-1">
                      <p>Luni - Vineri: 09:00 - 18:00</p>
                      <p>Sâmbătă: 09:00 - 13:00</p>
                      <p>Duminică: Închis</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-card p-6 md:p-8 rounded-2xl border border-border">
                <div className="mb-8">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-3">
                    Formular
                  </span>
                  <h2 className="font-display text-2xl text-foreground">
                    Cerere de <span className="text-primary">ofertă</span>
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">
                        Nume complet *
                      </label>
                      <Input name="name" value={formData.name} onChange={handleChange} placeholder="Ion Popescu" className={`rounded-xl h-12 ${errors.name ? "border-destructive" : ""}`} />
                      {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">
                        Telefon *
                      </label>
                      <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="0721 234 567" className={`rounded-xl h-12 ${errors.phone ? "border-destructive" : ""}`} />
                      {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Email *
                    </label>
                    <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="email@exemplu.ro" className={`rounded-xl h-12 ${errors.email ? "border-destructive" : ""}`} />
                    {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                  </div>

                  {/* Car Info */}
                  <div className="border-t border-border pt-6">
                    <h3 className="font-display text-lg text-foreground mb-5">
                      Detalii autoturism
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">
                          Marcă auto *
                        </label>
                        <Input name="carBrand" value={formData.carBrand} onChange={handleChange} placeholder="Ex: Volkswagen" className={`rounded-xl h-12 ${errors.carBrand ? "border-destructive" : ""}`} />
                        {errors.carBrand && <p className="text-destructive text-sm mt-1">{errors.carBrand}</p>}
                      </div>
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">
                          Model *
                        </label>
                        <Input name="carModel" value={formData.carModel} onChange={handleChange} placeholder="Ex: Golf 7" className={`rounded-xl h-12 ${errors.carModel ? "border-destructive" : ""}`} />
                        {errors.carModel && <p className="text-destructive text-sm mt-1">{errors.carModel}</p>}
                      </div>
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">
                          An fabricație *
                        </label>
                        <Input name="year" value={formData.year} onChange={handleChange} placeholder="Ex: 2018" className={`rounded-xl h-12 ${errors.year ? "border-destructive" : ""}`} />
                        {errors.year && <p className="text-destructive text-sm mt-1">{errors.year}</p>}
                      </div>
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">
                          Motorizare
                        </label>
                        <Input name="engine" value={formData.engine} onChange={handleChange} placeholder="Ex: 1.6 TDI 115 CP" className={`rounded-xl h-12 ${errors.engine ? "border-destructive" : ""}`} />
                        {errors.engine && <p className="text-destructive text-sm mt-1">{errors.engine}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Part Needed */}
                  <div className="border-t border-border pt-6">
                    <label className="block text-sm text-muted-foreground mb-2">
                      Piesa dorită *
                    </label>
                    <Textarea name="partNeeded" value={formData.partNeeded} onChange={handleChange} placeholder="Descrieți piesa de care aveți nevoie (ex: cutie de viteze manuală 6 trepte, turbosuflantă, calculator motor, etc.)" rows={4} className={`rounded-xl resize-none ${errors.partNeeded ? "border-destructive" : ""}`} />
                    {errors.partNeeded && <p className="text-destructive text-sm mt-1">{errors.partNeeded}</p>}
                  </div>

                  <Button type="submit" variant="hero" size="xl" className="w-full md:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? "Se trimite..." : <>
                        Trimite cererea
                        <Send className="w-5 h-5" />
                      </>}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-14 bg-card">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-6">
            Preferi să vorbești direct cu noi? Sună-ne sau scrie pe WhatsApp!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" asChild>
              <a href="tel:+40721234567">
                <Phone className="w-5 h-5" />
                Sună acum
              </a>
            </Button>
            <Button variant="mint" size="lg" asChild>
              <a href="https://wa.me/40721234567" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Scrie pe WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>;
};
export default ContactPage;