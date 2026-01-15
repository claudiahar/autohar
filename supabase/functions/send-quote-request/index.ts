import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QuoteRequest {
  name: string;
  phone: string;
  email?: string;
  carBrand: string;
  carModel: string;
  year: string;
  engine?: string;
  partNeeded: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: QuoteRequest = await req.json();

    // Validate required fields
    if (!data.name || !data.phone || !data.carBrand || !data.carModel || !data.year || !data.partNeeded) {
      return new Response(
        JSON.stringify({ error: "Toate câmpurile obligatorii trebuie completate" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send notification email to business owner using Resend REST API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Auto Har <onboarding@resend.dev>",
        to: ["autohargrup@gmail.com"],
        subject: `Cerere nouă de ofertă - ${data.carBrand} ${data.carModel}`,
        reply_to: data.email || undefined,
        text: `Cerere nouă de ofertă\n\nDate contact\nNume: ${data.name}\nTelefon: ${data.phone}${data.email ? `\nEmail: ${data.email}` : ""}\n\nDetalii autoturism\nMarcă: ${data.carBrand}\nModel: ${data.carModel}\nAn fabricație: ${data.year}${data.engine ? `\nMotorizare: ${data.engine}` : ""}\n\nPiesa solicitată\n${data.partNeeded}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1a1a1a; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
              Cerere Nouă de Ofertă
            </h1>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #374151; margin-top: 0;">Date Contact</h2>
              <p><strong>Nume:</strong> ${data.name}</p>
              <p><strong>Telefon:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
              ${data.email ? `<p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>` : ''}
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #374151; margin-top: 0;">Detalii Autoturism</h2>
              <p><strong>Marcă:</strong> ${data.carBrand}</p>
              <p><strong>Model:</strong> ${data.carModel}</p>
              <p><strong>An fabricație:</strong> ${data.year}</p>
              ${data.engine ? `<p><strong>Motorizare:</strong> ${data.engine}</p>` : ''}
            </div>
            
            <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
              <h2 style="color: #374151; margin-top: 0;">Piesa Solicitată</h2>
              <p style="white-space: pre-wrap;">${data.partNeeded}</p>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background: #e8f5e9; border-radius: 8px;">
              <p style="margin: 0;">
                <strong>Acțiuni rapide:</strong><br>
                <a href="tel:${data.phone}" style="color: #f97316; margin-right: 15px;">Sună clientul</a>
                <a href="https://wa.me/${data.phone.replace(/\D/g, '')}" style="color: #25d366;">WhatsApp</a>
              </p>
            </div>
            
            <p style="color: #6b7280; font-size: 12px; margin-top: 30px; text-align: center;">
              Această cerere a fost trimisă de pe site-ul pieseautohar.ro
            </p>
          </div>
        `,
      }),
    });

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error("Resend API error:", emailResult);
      throw new Error(emailResult.message || "Failed to send email");
    }

    console.log("Email sent successfully:", emailResult);

    return new Response(JSON.stringify({ success: true, id: emailResult.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-quote-request function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
