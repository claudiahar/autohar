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

// HTML escape function to prevent XSS/injection in email content
// This is safe because it only replaces characters with their HTML entities
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Sanitize phone number to only allow digits and common phone characters
function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d+\-() ]/g, '');
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
        JSON.stringify({ error: "Toate câmpurile obligatorii trebuie completate", code: "VALIDATION_ERROR" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate input lengths to prevent abuse
    if (data.name.length > 100 || data.phone.length > 30 || (data.email && data.email.length > 255) ||
        data.carBrand.length > 100 || data.carModel.length > 100 || data.year.length > 10 ||
        (data.engine && data.engine.length > 100) || data.partNeeded.length > 2000) {
      return new Response(
        JSON.stringify({ error: "Unul sau mai multe câmpuri depășesc lungimea maximă permisă", code: "VALIDATION_ERROR" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Sanitize and escape all user inputs for safe HTML embedding
    const safeName = escapeHtml(data.name.trim());
    const safePhone = sanitizePhone(data.phone.trim());
    const safeEmail = data.email ? escapeHtml(data.email.trim()) : '';
    const safeCarBrand = escapeHtml(data.carBrand.trim());
    const safeCarModel = escapeHtml(data.carModel.trim());
    const safeYear = escapeHtml(data.year.trim());
    const safeEngine = data.engine ? escapeHtml(data.engine.trim()) : '';
    const safePartNeeded = escapeHtml(data.partNeeded.trim());

    // Create safe phone link (digits only for href)
    const phoneDigits = safePhone.replace(/\D/g, '');

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
        subject: `Cerere nouă de ofertă - ${safeCarBrand} ${safeCarModel}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1a1a1a; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
              Cerere Nouă de Ofertă
            </h1>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #374151; margin-top: 0;">Date Contact</h2>
              <p><strong>Nume:</strong> ${safeName}</p>
              <p><strong>Telefon:</strong> <a href="tel:${phoneDigits}">${safePhone}</a></p>
              ${safeEmail ? `<p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>` : ''}
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #374151; margin-top: 0;">Detalii Autoturism</h2>
              <p><strong>Marcă:</strong> ${safeCarBrand}</p>
              <p><strong>Model:</strong> ${safeCarModel}</p>
              <p><strong>An fabricație:</strong> ${safeYear}</p>
              ${safeEngine ? `<p><strong>Motorizare:</strong> ${safeEngine}</p>` : ''}
            </div>
            
            <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
              <h2 style="color: #374151; margin-top: 0;">Piesa Solicitată</h2>
              <p style="white-space: pre-wrap;">${safePartNeeded}</p>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background: #e8f5e9; border-radius: 8px;">
              <p style="margin: 0;">
                <strong>Acțiuni rapide:</strong><br>
                <a href="tel:${phoneDigits}" style="color: #f97316; margin-right: 15px;">📞 Sună clientul</a>
                <a href="https://wa.me/${phoneDigits}" style="color: #25d366;">💬 WhatsApp</a>
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
      // Log detailed error server-side for debugging, but don't expose to client
      console.error("[send-quote-request] Resend API error:", {
        status: emailResponse.status,
        error: emailResult,
        timestamp: new Date().toISOString()
      });
      throw new Error("Email service unavailable");
    }

    console.log("[send-quote-request] Email sent successfully:", { id: emailResult.id });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    // Log detailed error server-side for debugging
    console.error("[send-quote-request] Error:", {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    
    // Return generic error to client - never expose internal error details
    return new Response(
      JSON.stringify({ 
        error: "Nu am putut procesa cererea. Vă rugăm încercați din nou sau contactați-ne telefonic.",
        code: "REQUEST_FAILED"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
