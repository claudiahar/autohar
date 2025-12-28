import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().trim().min(2, "Numele trebuie să aibă minim 2 caractere").max(100, "Numele este prea lung"),
  phone: z.string().trim().min(10, "Numărul de telefon nu este valid").max(15, "Numărul de telefon este prea lung"),
  email: z.string().trim().email("Adresa de email nu este validă").max(255, "Email-ul este prea lung"),
  carBrand: z.string().trim().min(2, "Marca auto este obligatorie").max(50, "Marca auto este prea lungă"),
  carModel: z.string().trim().min(1, "Modelul este obligatoriu").max(50, "Modelul este prea lung"),
  year: z.string().trim().min(4, "Anul nu este valid").max(4, "Anul nu este valid"),
  engine: z.string().trim().max(100, "Motorizarea este prea lungă").optional(),
  partNeeded: z.string().trim().min(5, "Descrieți piesa dorită").max(1000, "Descrierea este prea lungă"),
});

type FormData = z.infer<typeof formSchema>;

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    carBrand: "",
    carModel: "",
    year: "",
    engine: "",
    partNeeded: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = formSchema.parse(formData);
      
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Cerere trimisă cu succes!",
        description: "Vă vom contacta în cel mai scurt timp cu oferta noastră.",
      });
      
      setFormData({
        name: "",
        phone: "",
        email: "",
        carBrand: "",
        carModel: "",
        year: "",
        engine: "",
        partNeeded: "",
      });
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach((err) => {
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

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              <span className="text-gradient">CONTACTEAZĂ</span>-NE
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Ai nevoie de o piesă auto? Trimite-ne o cerere și îți răspundem în cel mai scurt timp.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <h2 className="font-display text-2xl text-foreground mb-6">
                DATE DE <span className="text-gradient">CONTACT</span>
              </h2>

              <div className="space-y-4">
                <a
                  href="tel:+40721234567"
                  className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm">Telefon</div>
                    <div className="text-foreground font-medium">+40 721 234 567</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/40721234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-[hsl(142,70%,45%)]/50 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-[hsl(142,70%,45%)]/10 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-[hsl(142,70%,45%)]" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm">WhatsApp</div>
                    <div className="text-foreground font-medium">+40 721 234 567</div>
                  </div>
                </a>

                <a
                  href="mailto:contact@autopiese.ro"
                  className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm">Email</div>
                    <div className="text-foreground font-medium">contact@autopiese.ro</div>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm">Adresă</div>
                    <div className="text-foreground font-medium">
                      Strada Industriilor Nr. 15,<br />
                      Sector 3, București
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm">Program</div>
                    <div className="text-foreground font-medium">
                      Luni - Vineri: 08:00 - 18:00<br />
                      Sâmbătă: 09:00 - 14:00<br />
                      Duminică: Închis
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-card p-6 md:p-8 rounded-xl border border-border">
                <h2 className="font-display text-2xl text-foreground mb-6">
                  CERERE DE <span className="text-gradient">OFERTĂ</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">
                        Nume complet *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ion Popescu"
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="text-destructive text-sm mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">
                        Telefon *
                      </label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="0721 234 567"
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && (
                        <p className="text-destructive text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@exemplu.ro"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Car Info */}
                  <div className="border-t border-border pt-6">
                    <h3 className="font-display text-lg text-foreground mb-4">
                      DETALII AUTOTURISM
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">
                          Marcă auto *
                        </label>
                        <Input
                          name="carBrand"
                          value={formData.carBrand}
                          onChange={handleChange}
                          placeholder="Ex: Volkswagen"
                          className={errors.carBrand ? "border-destructive" : ""}
                        />
                        {errors.carBrand && (
                          <p className="text-destructive text-sm mt-1">{errors.carBrand}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">
                          Model *
                        </label>
                        <Input
                          name="carModel"
                          value={formData.carModel}
                          onChange={handleChange}
                          placeholder="Ex: Golf 7"
                          className={errors.carModel ? "border-destructive" : ""}
                        />
                        {errors.carModel && (
                          <p className="text-destructive text-sm mt-1">{errors.carModel}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">
                          An fabricație *
                        </label>
                        <Input
                          name="year"
                          value={formData.year}
                          onChange={handleChange}
                          placeholder="Ex: 2018"
                          className={errors.year ? "border-destructive" : ""}
                        />
                        {errors.year && (
                          <p className="text-destructive text-sm mt-1">{errors.year}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm text-muted-foreground mb-2">
                          Motorizare
                        </label>
                        <Input
                          name="engine"
                          value={formData.engine}
                          onChange={handleChange}
                          placeholder="Ex: 1.6 TDI 115 CP"
                          className={errors.engine ? "border-destructive" : ""}
                        />
                        {errors.engine && (
                          <p className="text-destructive text-sm mt-1">{errors.engine}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Part Needed */}
                  <div className="border-t border-border pt-6">
                    <label className="block text-sm text-muted-foreground mb-2">
                      Piesa dorită *
                    </label>
                    <Textarea
                      name="partNeeded"
                      value={formData.partNeeded}
                      onChange={handleChange}
                      placeholder="Descrieți piesa de care aveți nevoie (ex: cutie de viteze manuală 6 trepte, turbosuflantă, calculator motor, etc.)"
                      rows={4}
                      className={errors.partNeeded ? "border-destructive" : ""}
                    />
                    {errors.partNeeded && (
                      <p className="text-destructive text-sm mt-1">{errors.partNeeded}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="xl"
                    className="w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Se trimite..."
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Trimite cererea
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-12 bg-card">
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
            <Button variant="whatsapp" size="lg" asChild>
              <a href="https://wa.me/40721234567" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Scrie pe WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
