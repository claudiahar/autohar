import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  const phoneNumber = "40721234567";
  const message = "Bună ziua! Aș dori să cer o ofertă pentru piese auto.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-[hsl(142,70%,45%)] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 animate-pulse-glow group"
      aria-label="Contact pe WhatsApp"
    >
      <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-foreground" />
      <span className="absolute right-full mr-3 bg-card text-foreground text-sm font-medium px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg hidden md:block">
        Scrie-ne pe WhatsApp
      </span>
    </a>
  );
};
