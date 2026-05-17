const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface LeadEventBody {
  event_id: string;
  event_source_url?: string;
  user_agent?: string;
  fbp?: string;
  fbc?: string;
  event_name?: string;
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input.trim().toLowerCase());
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const PIXEL_ID = Deno.env.get("META_PIXEL_ID");
    const ACCESS_TOKEN = Deno.env.get("META_CAPI_ACCESS_TOKEN");

    if (!PIXEL_ID || !ACCESS_TOKEN) {
      return new Response(
        JSON.stringify({ error: "Meta CAPI not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = (await req.json()) as LeadEventBody;

    if (!body?.event_id || typeof body.event_id !== "string") {
      return new Response(
        JSON.stringify({ error: "event_id is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Best-effort client IP from common proxy headers
    const forwarded = req.headers.get("x-forwarded-for") ?? "";
    const clientIp = forwarded.split(",")[0]?.trim() || req.headers.get("cf-connecting-ip") || "";
    const userAgent = body.user_agent || req.headers.get("user-agent") || "";

    const userData: Record<string, unknown> = {
      client_user_agent: userAgent,
    };
    if (clientIp) userData.client_ip_address = clientIp;
    if (body.fbp) userData.fbp = body.fbp;
    if (body.fbc) userData.fbc = body.fbc;

    // Hash a stable identifier so Meta accepts the event when no PII is present.
    // Using fbp+ip+ua as a fallback external_id (hashed).
    const externalIdSource = [body.fbp ?? "", clientIp, userAgent].join("|");
    if (externalIdSource.replace(/\|/g, "").length > 0) {
      userData.external_id = await sha256Hex(externalIdSource);
    }

    const eventTime = Math.floor(Date.now() / 1000);

    const eventName = body.event_name || "Lead";

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: eventTime,
          event_id: body.event_id,
          action_source: "website",
          event_source_url: body.event_source_url,
          user_data: userData,
          attribution_data: {
            attribution_share: "0.3",
          },
          custom_data: {
            currency: "KZT",
            value: "0",
            lead_event_source: "whatsapp_button",
            content_name: "Диагностика медцентра",
            content_category: "lead",
          },
          original_event_data: {
            event_name: eventName,
            event_time: eventTime,
          },
        },
      ],
    };

    const url = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${encodeURIComponent(ACCESS_TOKEN)}`;

    const fbRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const fbData = await fbRes.json();

    if (!fbRes.ok) {
      console.error("Meta CAPI error", fbRes.status, fbData);
      return new Response(
        JSON.stringify({ error: "Meta CAPI request failed", details: fbData }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ success: true, fb: fbData }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("meta-capi-lead error", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});