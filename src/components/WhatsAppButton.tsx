import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  const phoneNumber = "40749707694";
  const message = "Bună ziua! Aș dori să cer o ofertă pentru piese auto.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-accent rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 animate-pulse-glow group"
      aria-label="Contact pe WhatsApp"
    >
      <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-accent-foreground" />
      <span className="absolute right-full mr-4 bg-card text-foreground text-sm font-medium px-4 py-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-xl border border-border hidden md:block">
        Scrie-ne pe WhatsApp
      </span>
    </a>
  );
};
