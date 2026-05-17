import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const DEFAULT_CRM_WEBHOOK_URL =
  "https://mekwfbqmsqiborjdrjxc.supabase.co/functions/v1/lead-intake";
const DEFAULT_CRM_PROJECT_ID = "cceb9a86-687b-4417-9b4e-d106bd8cc79c";
const DEFAULT_CRM_PROJECT_TOKEN = "MkcXbUBfd7ObDBy7";

interface LeadInput {
  name?: string;
  phone?: string;
  clinic?: string;
  niche?: string;
  event_id?: string;
  fbp?: string;
  fbc?: string;
  user_agent?: string;
  referrer?: string;
  event_source_url?: string;
  cta_id?: number | null;
  cta_name?: string | null;
  utm?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
  } | null;
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input.trim().toLowerCase());
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function normalizePhone(raw: string): string {
  return raw.replace(/[^\d]/g, "");
}

function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/);
  return { first: parts[0] ?? "", last: parts.slice(1).join(" ") };
}

function htmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function sendTelegram(params: {
  token: string;
  chatId: string;
  name: string;
  phone: string;
  ctaId: number | null;
  ctaName: string | null;
  utm: Record<string, string>;
  pageUrl: string | null;
}) {
  const e = htmlEscape;
  const ctaLine =
    params.ctaId || params.ctaName
      ? `Кнопка: <b>#${params.ctaId ?? "?"}</b>${params.ctaName ? ` — ${e(params.ctaName)}` : ""}`
      : `Кнопка: не определена`;

  const utmEntries = Object.entries(params.utm).filter(([, v]) => !!v);
  const utmBlock =
    utmEntries.length > 0
      ? `\n\n🌐 <b>UTM:</b>\n` +
        utmEntries
          .map(([k, v]) => `  ${k.replace(/^utm_/, "")}: <code>${e(v)}</code>`)
          .join("\n")
      : "";

  let pageLine = "";
  if (params.pageUrl) {
    let host = params.pageUrl;
    try {
      host = new URL(params.pageUrl).host;
    } catch {
      /* keep raw */
    }
    pageLine = `\n\n🔗 Страница: <a href="${e(params.pageUrl)}">${e(host)}</a>`;
  }

  const text =
    `🆕 <b>Заявка на диагностику</b>\n` +
    `\n${ctaLine}\n\n` +
    `👤 <b>Имя:</b> ${e(params.name)}\n` +
    `📞 <b>Телефон:</b> ${e(params.phone)}` +
    utmBlock +
    pageLine;

  const url = `https://api.telegram.org/bot${params.token}/sendMessage`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: params.chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error("Telegram sendMessage failed", res.status, data);
  } else {
    console.log("Telegram sendMessage ok", data?.result?.message_id);
  }
  return data;
}

async function sendCrmLead(params: {
  webhookUrl: string;
  token: string;
  projectId: string;
  name: string;
  phone: string;
  clinic: string;
  niche: string;
  ctaId: number | null;
  ctaName: string | null;
  utm: Record<string, string | null>;
  referrer: string | null;
  landingUrl: string | null;
  fbc: string | null;
  fbp: string | null;
  eventId: string;
}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  const payload = {
    token: params.token,
    project_id: params.projectId,
    name: params.name,
    phone: params.phone,
    service: "Диагностика медицинской клиники",
    city: "Не указано",
    source: "site",
    cta_id: params.ctaId,
    cta_name: params.ctaName,
    referrer: params.referrer,
    landing_url: params.landingUrl,
    fbc: params.fbc,
    fbp: params.fbp,
    utm_source: params.utm.utm_source ?? undefined,
    utm_medium: params.utm.utm_medium ?? undefined,
    utm_campaign: params.utm.utm_campaign ?? undefined,
    utm_content: params.utm.utm_content ?? undefined,
    utm_term: params.utm.utm_term ?? undefined,
  };

  try {
    const res = await fetch(params.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("CRM lead-intake failed", res.status, data);
      return { ok: false, status: res.status, data };
    }
    console.log("CRM lead-intake ok", data?.leadId ?? data);
    return { ok: true, status: res.status, data };
  } finally {
    clearTimeout(timeout);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const PIXEL_ID = Deno.env.get("META_PIXEL_ID");
    const ACCESS_TOKEN = Deno.env.get("META_CAPI_ACCESS_TOKEN");
    const CRM_WEBHOOK_URL =
      Deno.env.get("CRM_LEAD_WEBHOOK_URL") || DEFAULT_CRM_WEBHOOK_URL;
    const CRM_PROJECT_ID =
      Deno.env.get("CRM_PROJECT_ID") || DEFAULT_CRM_PROJECT_ID;
    const CRM_PROJECT_TOKEN =
      Deno.env.get("CRM_PROJECT_TOKEN") || DEFAULT_CRM_PROJECT_TOKEN;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(
        JSON.stringify({ error: "Backend not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = (await req.json().catch(() => ({}))) as LeadInput;

    const name = (body.name ?? "").trim();
    const phone = (body.phone ?? "").trim();
    const clinic = (body.clinic ?? "").trim();
    const niche = (body.niche ?? "").trim();

    const ctaId =
      typeof body.cta_id === "number" && Number.isFinite(body.cta_id)
        ? Math.trunc(body.cta_id)
        : null;
    const ctaName =
      typeof body.cta_name === "string" && body.cta_name.trim()
        ? body.cta_name.trim().slice(0, 200)
        : null;
    const utmIn = (body.utm ?? {}) as Record<string, unknown>;
    const pickUtm = (k: string): string | null => {
      const v = utmIn[k];
      return typeof v === "string" && v.trim() ? v.trim().slice(0, 200) : null;
    };
    const utm = {
      utm_source: pickUtm("utm_source"),
      utm_medium: pickUtm("utm_medium"),
      utm_campaign: pickUtm("utm_campaign"),
      utm_content: pickUtm("utm_content"),
      utm_term: pickUtm("utm_term"),
    };

    const errors: Record<string, string> = {};
    if (name.length < 2 || name.length > 100) errors.name = "Введите имя (2-100 символов)";
    if (phone.replace(/\D/g, "").length < 7) errors.phone = "Введите корректный номер телефона";
    if (clinic.length < 2 || clinic.length > 200) errors.clinic = "Введите название клиники";
    if (niche.length < 2 || niche.length > 100) errors.niche = "Выберите направление";

    if (Object.keys(errors).length > 0) {
      return new Response(
        JSON.stringify({ error: "validation", fields: errors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const eventId = body.event_id || crypto.randomUUID();

    const forwarded = req.headers.get("x-forwarded-for") ?? "";
    const clientIp =
      forwarded.split(",")[0]?.trim() || req.headers.get("cf-connecting-ip") || "";
    const userAgent = body.user_agent || req.headers.get("user-agent") || "";

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { error: dbError } = await supabase.from("diagnostic_leads").insert({
      name,
      phone,
      clinic,
      niche,
      source: "landing",
      user_agent: userAgent || null,
      referrer: body.referrer || null,
      fbp: body.fbp || null,
      fbc: body.fbc || null,
      meta_event_id: eventId,
      cta_id: ctaId,
      cta_name: ctaName,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
      utm_content: utm.utm_content,
      utm_term: utm.utm_term,
    });

    if (dbError) {
      console.error("DB insert failed", dbError);
      return new Response(
        JSON.stringify({ error: "Не удалось сохранить заявку. Попробуйте ещё раз." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Send Telegram notification (non-blocking failure)
    const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      try {
        await sendTelegram({
          token: TELEGRAM_BOT_TOKEN,
          chatId: TELEGRAM_CHAT_ID,
          name,
          phone,
          ctaId,
          ctaName,
          utm: {
            utm_source: utm.utm_source ?? "",
            utm_medium: utm.utm_medium ?? "",
            utm_campaign: utm.utm_campaign ?? "",
            utm_content: utm.utm_content ?? "",
            utm_term: utm.utm_term ?? "",
          },
          pageUrl: body.event_source_url ?? null,
        });
      } catch (tgErr) {
        console.error("Telegram notification exception", tgErr);
      }
    } else {
      console.warn("Telegram secrets not configured; skipping group notification");
    }

    let crmResult: unknown = { skipped: true };
    if (CRM_WEBHOOK_URL) {
      try {
        crmResult = await sendCrmLead({
          webhookUrl: CRM_WEBHOOK_URL,
          token: CRM_PROJECT_TOKEN,
          projectId: CRM_PROJECT_ID,
          name,
          phone,
          clinic,
          niche,
          ctaId,
          ctaName,
          utm,
          referrer: body.referrer ?? null,
          landingUrl: body.event_source_url ?? null,
          fbc: body.fbc ?? null,
          fbp: body.fbp ?? null,
          eventId,
        });
      } catch (crmErr) {
        console.error("CRM lead-intake exception", crmErr);
        crmResult = { ok: false, error: crmErr instanceof Error ? crmErr.message : "Unknown error" };
      }
    }

    let capiResult: unknown = { skipped: true };
    if (PIXEL_ID && ACCESS_TOKEN) {
      try {
        const phoneDigits = normalizePhone(phone);
        const { first, last } = splitName(name);

        const userData: Record<string, unknown> = {
          client_user_agent: userAgent,
          ph: [await sha256Hex(phoneDigits)],
          fn: first ? [await sha256Hex(first)] : [],
          ln: last ? [await sha256Hex(last)] : [],
        };
        if (clientIp) userData.client_ip_address = clientIp;
        if (body.fbp) userData.fbp = body.fbp;
        if (body.fbc) userData.fbc = body.fbc;

        const eventTime = Math.floor(Date.now() / 1000);
        const payload = {
          data: [
            {
              event_name: "Lead",
              event_time: eventTime,
              event_id: eventId,
              action_source: "website",
              event_source_url: body.event_source_url,
              user_data: userData,
              attribution_data: { attribution_share: "0.3" },
              custom_data: {
                currency: "KZT",
                value: "9900",
                content_name: "Диагностика медцентра",
                content_category: "lead",
                lead_event_source: "diagnostic_form",
                clinic_name: clinic,
                niche,
              },
              original_event_data: {
                event_name: "Lead",
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
        capiResult = await fbRes.json();
        if (!fbRes.ok) {
          console.error("Meta CAPI error", fbRes.status, capiResult);
        }
      } catch (capiErr) {
        console.error("Meta CAPI exception", capiErr);
      }
    }

    return new Response(
      JSON.stringify({ success: true, event_id: eventId, crm: crmResult, capi: capiResult }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("submit-diagnostic-lead error", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
