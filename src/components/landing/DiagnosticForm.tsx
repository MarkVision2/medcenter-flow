import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, ArrowRight, Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Введите имя (минимум 2 символа)" })
    .max(100, { message: "Имя слишком длинное" }),
  phone: z
    .string()
    .trim()
    .min(7, { message: "Введите номер телефона" })
    .max(30, { message: "Номер слишком длинный" })
    .refine((v) => v.replace(/\D/g, "").length >= 7, {
      message: "Введите корректный номер",
    }),
});

type FieldErrors = Partial<Record<"name" | "phone", string>>;
type Fbq = (
  command: "track",
  eventName: string,
  params?: Record<string, unknown>,
  options?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    fbq?: Fbq;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const getCookie = (name: string): string | undefined => {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : undefined;
};

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;
type UtmKey = (typeof UTM_KEYS)[number];
const UTM_STORAGE_KEY = "lovable_utm_v1";
const CRM_WEBHOOK_URL =
  "https://mekwfbqmsqiborjdrjxc.supabase.co/functions/v1/lead-intake";
const CRM_PROJECT_ID = "cceb9a86-687b-4417-9b4e-d106bd8cc79c";
const CRM_PROJECT_TOKEN = "MkcXbUBfd7ObDBy7";

const getUtmParams = (): Partial<Record<UtmKey, string>> => {
  if (typeof window === "undefined") return {};
  const out: Partial<Record<UtmKey, string>> = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v && v.trim()) out[k] = v.trim().slice(0, 200);
    }
    if (Object.keys(out).length > 0) {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(out));
      return out;
    }
    const cached = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as Partial<Record<UtmKey, string>>;
      return parsed && typeof parsed === "object" ? parsed : {};
    }
  } catch {
    /* ignore */
  }
  return out;
};

const formatPhone = (raw: string): string => {
  // Light input formatter for KZ/RU style: +7 (XXX) XXX-XX-XX
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  const d = digits.startsWith("8") ? "7" + digits.slice(1) : digits;
  const country = d.startsWith("7") ? "+7" : d.length ? "+" + d.slice(0, 1) : "";
  const rest = d.startsWith("7") ? d.slice(1) : d.slice(1);
  if (!country) return "";
  let out = country;
  if (rest.length > 0) out += " (" + rest.slice(0, 3);
  if (rest.length >= 3) out += ")";
  if (rest.length > 3) out += " " + rest.slice(3, 6);
  if (rest.length > 6) out += "-" + rest.slice(6, 8);
  if (rest.length > 8) out += "-" + rest.slice(8, 10);
  return out.trim();
};

const submitCrmWebhook = async (params: {
  name: string;
  phone: string;
  ctaId?: number;
  ctaName?: string;
  utm: Partial<Record<UtmKey, string>>;
}) => {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 3500);

  try {
    const response = await fetch(CRM_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: CRM_PROJECT_TOKEN,
        project_id: CRM_PROJECT_ID,
        name: params.name,
        phone: params.phone,
        service: "Диагностика медицинской клиники",
        city: "Не указано",
        source: "site",
        cta_id: params.ctaId,
        cta_name: params.ctaName,
        referrer: document.referrer || undefined,
        landing_url: window.location.href,
        fbc: getCookie("_fbc"),
        fbp: getCookie("_fbp"),
        utm_source: params.utm.utm_source,
        utm_medium: params.utm.utm_medium,
        utm_campaign: params.utm.utm_campaign,
        utm_content: params.utm.utm_content,
        utm_term: params.utm.utm_term,
      }),
      signal: controller.signal,
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      console.error("CRM webhook failed", response.status, payload);
      return { ok: false, status: response.status, data: payload };
    }
    return { ok: true, status: response.status, data: payload };
  } catch (err) {
    console.error("CRM webhook exception", err);
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" };
  } finally {
    window.clearTimeout(timeout);
  }
};

interface DiagnosticFormProps {
  ctaId?: number;
  ctaName?: string;
}

const DiagnosticForm = ({ ctaId, ctaName }: DiagnosticFormProps = {}) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const parsed = formSchema.safeParse({ name, phone });
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    setSubmitting(true);
    try {
      const eventId =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`;

      const utm = getUtmParams();

      const crmResult = await submitCrmWebhook({
        name: parsed.data.name,
        phone: parsed.data.phone,
        ctaId: ctaId ?? undefined,
        ctaName: ctaName ?? undefined,
        utm,
      });

      if (!crmResult.ok) {
        toast({
          title: "Не удалось отправить заявку",
          description: "Проверьте подключение и попробуйте снова.",
          variant: "destructive",
        });
        return;
      }

      const fbq = window.fbq;
      if (typeof fbq === "function") {
        fbq(
          "track",
          "Lead",
          {
            content_name: "Диагностика медцентра",
            content_category: "lead",
            value: 9900,
            currency: "KZT",
          },
          { eventID: eventId },
        );
      }

      const dataLayer = (window.dataLayer = window.dataLayer || []);
      dataLayer.push({
        event: "generate_lead",
        event_category: "engagement",
        event_label: ctaName ?? "diagnostic_form",
        method: "form",
        value: 9900,
        currency: "KZT",
        transaction_id: eventId,
      });

      // Save form payload for the thank-you page (WhatsApp prefill)
      sessionStorage.setItem(
        "diagnostic_lead",
        JSON.stringify({
          name: parsed.data.name,
          phone: parsed.data.phone,
          event_id: eventId,
        }),
      );

      navigate("/thank-you");
    } catch (err) {
      console.error(err);
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте ещё раз через минуту.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase =
    "h-12 rounded-xl bg-muted/50 border-input pl-11 text-base placeholder:text-muted-foreground/70";

  return (
    <>
    <Toaster />
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
      aria-label="Форма заявки на диагностику"
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="lead-name" className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Ваше имя <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="lead-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Иван"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={cn(inputBase, errors.name && "border-destructive focus-visible:ring-destructive")}
              maxLength={100}
              required
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "lead-name-err" : undefined}
            />
          </div>
          {errors.name && (
            <p id="lead-name-err" className="text-xs text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lead-phone" className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Телефон <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="lead-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+7 (707) 000-00-00"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              className={cn(inputBase, errors.phone && "border-destructive focus-visible:ring-destructive")}
              maxLength={30}
              required
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "lead-phone-err" : undefined}
            />
          </div>
          {errors.phone && (
            <p id="lead-phone-err" className="text-xs text-destructive">{errors.phone}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        variant="whatsapp"
        size="cta"
        disabled={submitting}
        className="w-full font-semibold whitespace-normal text-center"
      >
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Отправляем…</span>
          </>
        ) : (
          <>
            <span>Получить диагностику</span>
            <ArrowRight className="h-5 w-5" />
          </>
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
      </p>
    </form>
    </>
  );
};

export default DiagnosticForm;
