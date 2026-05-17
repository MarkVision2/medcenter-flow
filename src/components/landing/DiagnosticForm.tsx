import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, Building2, ArrowRight, Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const NICHES: string[] = [
  "Многопрофильная клиника",
  "Стоматология",
  "Косметология / эстетическая медицина",
  "Гинекология / репродуктология",
  "Урология / андрология",
  "Ортопедия / травматология",
  "Реабилитация / физиотерапия",
  "Диагностика (УЗИ / МРТ / КТ)",
];
const OTHER_VALUE = "Другое";

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
  clinic: z
    .string()
    .trim()
    .min(2, { message: "Введите название клиники" })
    .max(200, { message: "Название слишком длинное" }),
  niche: z
    .string()
    .trim()
    .min(2, { message: "Выберите направление" }),
  agreement: z.literal(true, {
    errorMap: () => ({ message: "Необходимо подтверждение" }),
  }),
});

type FieldErrors = Partial<Record<"name" | "phone" | "clinic" | "niche" | "agreement", string>>;

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

interface DiagnosticFormProps {
  ctaId?: number;
  ctaName?: string;
}

const DiagnosticForm = ({ ctaId, ctaName }: DiagnosticFormProps = {}) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [clinic, setClinic] = useState("");
  const [niche, setNiche] = useState("");
  const [nicheOther, setNicheOther] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const finalNiche =
      niche === OTHER_VALUE
        ? nicheOther.trim()
          ? `Другое: ${nicheOther.trim()}`
          : ""
        : niche;

    const parsed = formSchema.safeParse({
      name,
      phone,
      clinic,
      niche: finalNiche,
      agreement,
    });
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

      // Browser Pixel (with eventID for deduplication)
      const fbq = (window as any).fbq;
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

      const fbp = getCookie("_fbp");
      const fbc = getCookie("_fbc");
      const utm = getUtmParams();

      const { data, error } = await supabase.functions.invoke(
        "submit-diagnostic-lead",
        {
          body: {
            name: parsed.data.name,
            phone: parsed.data.phone,
            clinic: parsed.data.clinic,
            niche: parsed.data.niche,
            event_id: eventId,
            fbp,
            fbc,
            user_agent: navigator.userAgent,
            referrer: document.referrer,
            event_source_url: window.location.href,
            cta_id: ctaId ?? null,
            cta_name: ctaName ?? null,
            utm,
          },
        },
      );

      if (error) {
        console.error("submit error", error);
        toast({
          title: "Не удалось отправить заявку",
          description: "Проверьте подключение и попробуйте снова.",
          variant: "destructive",
        });
        return;
      }

      // Save form payload for the thank-you page (WhatsApp prefill)
      sessionStorage.setItem(
        "diagnostic_lead",
        JSON.stringify({
          name: parsed.data.name,
          phone: parsed.data.phone,
          clinic: parsed.data.clinic,
          niche: parsed.data.niche,
          event_id: (data as any)?.event_id ?? eventId,
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
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
      aria-label="Форма заявки на диагностику"
    >
      <div className="grid gap-5 sm:grid-cols-2">
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

      <div className="space-y-2">
        <Label htmlFor="lead-clinic" className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          Название клиники <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="lead-clinic"
            name="clinic"
            type="text"
            autoComplete="organization"
            placeholder="Введите название вашей клиники"
            value={clinic}
            onChange={(e) => setClinic(e.target.value)}
            className={cn(inputBase, errors.clinic && "border-destructive focus-visible:ring-destructive")}
            maxLength={200}
            required
            aria-invalid={!!errors.clinic}
            aria-describedby={errors.clinic ? "lead-clinic-err" : undefined}
          />
        </div>
        {errors.clinic && (
          <p id="lead-clinic-err" className="text-xs text-destructive">{errors.clinic}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          Ваше направление (основной источник дохода) <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={niche}
          onValueChange={(v) => {
            setNiche(v);
            if (v !== OTHER_VALUE) setNicheOther("");
          }}
          className={cn(
            "rounded-xl border bg-muted/30 p-3 space-y-1",
            errors.niche ? "border-destructive" : "border-input",
          )}
          aria-invalid={!!errors.niche}
          aria-describedby={errors.niche ? "lead-niche-err" : undefined}
        >
          {NICHES.map((n) => {
            const id = `niche-${n}`;
            return (
              <div key={n} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-muted/60 transition-colors">
                <RadioGroupItem id={id} value={n} />
                <Label htmlFor={id} className="cursor-pointer text-sm font-normal leading-snug flex-1">
                  {n}
                </Label>
              </div>
            );
          })}
          <div className="flex items-start gap-3 rounded-lg px-2 py-2 hover:bg-muted/60 transition-colors">
            <RadioGroupItem id="niche-other" value={OTHER_VALUE} className="mt-2.5" />
            <div className="flex-1 space-y-2">
              <Label htmlFor="niche-other" className="cursor-pointer text-sm font-normal leading-snug">
                Другое
              </Label>
              {niche === OTHER_VALUE && (
                <Input
                  type="text"
                  placeholder="Укажите ваше направление"
                  value={nicheOther}
                  onChange={(e) => setNicheOther(e.target.value)}
                  maxLength={100}
                  className="h-10 rounded-lg bg-background"
                  aria-label="Укажите направление"
                />
              )}
            </div>
          </div>
        </RadioGroup>
        {errors.niche && (
          <p id="lead-niche-err" className="text-xs text-destructive">{errors.niche}</p>
        )}
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="lead-agreement"
          checked={agreement}
          onCheckedChange={(v) => setAgreement(v === true)}
          className="mt-0.5"
          aria-invalid={!!errors.agreement}
        />
        <div>
          <Label htmlFor="lead-agreement" className="cursor-pointer text-sm leading-snug font-normal">
            Я владелец / принимаю решения в клинике
            <span className="text-destructive"> *</span>
          </Label>
          {errors.agreement && (
            <p className="mt-1 text-xs text-destructive">{errors.agreement}</p>
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
  );
};

export default DiagnosticForm;
