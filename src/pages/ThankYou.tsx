import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Check,
  CheckCircle2,
  Clock3,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "77472842595";
const FALLBACK_MESSAGE =
  "Добрый день! Я оставил заявку на диагностику медицинского центра.";

interface LeadData {
  name?: string;
  phone?: string;
}

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.08.55 4.11 1.6 5.9L0 24l6.42-1.68a11.83 11.83 0 0 0 5.62 1.43h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.37-8.43ZM12.05 21.3h-.01a9.46 9.46 0 0 1-4.82-1.32l-.35-.21-3.81 1 1.02-3.71-.23-.38a9.45 9.45 0 0 1-1.45-5.04c0-5.23 4.26-9.49 9.5-9.49 2.54 0 4.92.99 6.71 2.78a9.42 9.42 0 0 1 2.78 6.71c0 5.23-4.26 9.49-9.49 9.49Zm5.2-7.1c-.28-.14-1.69-.83-1.95-.93-.26-.1-.45-.14-.64.14-.19.28-.74.93-.9 1.12-.17.19-.33.21-.61.07-.28-.14-1.2-.44-2.28-1.41-.84-.75-1.41-1.68-1.58-1.96-.16-.28-.02-.43.13-.57.13-.13.28-.33.42-.5.14-.17.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49l-.55-.01c-.19 0-.49.07-.75.35-.26.28-.99.97-.99 2.36 0 1.39 1.02 2.74 1.16 2.93.14.19 2 3.05 4.85 4.28.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.69-.69 1.93-1.36.24-.66.24-1.23.17-1.36-.07-.13-.26-.21-.54-.35Z" />
  </svg>
);

const ThankYou = () => {
  const [lead, setLead] = useState<LeadData | null>(null);

  useEffect(() => {
    document.title = "Заявка принята — MarkVision AI";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Спасибо за заявку на диагностику медицинского центра. Мы свяжемся с вами в рабочее время.",
      );
    }
    try {
      const raw = sessionStorage.getItem("diagnostic_lead");
      if (raw) setLead(JSON.parse(raw) as LeadData);
    } catch {
      /* ignore */
    }
  }, []);

  const whatsappHref = useMemo(() => {
    const lines = ["Добрый день! Я оставил заявку на диагностику клиники.", ""];
    if (lead?.name) lines.push(`Имя: ${lead.name}`);
    if (lead?.phone) lines.push(`Телефон: ${lead.phone}`);
    const text = lead ? lines.join("\n") : FALLBACK_MESSAGE;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }, [lead]);

  const nextSteps = [
    {
      icon: Phone,
      title: "Проверю заявку",
      text: "Посмотрю данные и свяжусь с вами лично.",
    },
    {
      icon: CalendarCheck,
      title: "Подтвердим запись",
      text: "Согласуем удобное время диагностики.",
    },
    {
      icon: MessageCircle,
      title: "Разберём клинику",
      text: "Найдём, где теряются заявки, пациенты и деньги.",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f8f7] text-foreground antialiased">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(224,245,240,0.9)_0%,rgba(246,248,247,1)_46%,rgba(255,255,255,1)_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(var(--accent-deep)) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>

      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 sm:py-8 lg:justify-center">
        <div className="flex items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/80 px-3 py-2 text-xs font-bold text-accent-deep shadow-sm backdrop-blur transition hover:bg-white sm:px-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Вернуться на сайт
          </Link>
          <span className="hidden items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-accent-deep sm:inline-flex">
            <ShieldCheck className="h-4 w-4" />
            MarkVision AI
          </span>
        </div>

        <div className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:py-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-accent-deep shadow-sm">
              <CheckCircle2 className="h-4 w-4" />
              Заявка принята
            </div>

            <h1 className="mt-5 max-w-3xl text-[42px] font-black leading-[0.96] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Спасибо. Диагностика{" "}
              <span className="text-accent-deep">почти забронирована</span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-foreground/70 sm:text-2xl">
              Я свяжусь с вами в ближайшее время, подтвержу запись и уточню
              пару деталей по вашей медицинской клинике.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {nextSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className="relative overflow-hidden rounded-2xl border border-accent/15 bg-white p-4 shadow-sm"
                  >
                    <span className="absolute right-4 top-3 text-5xl font-black leading-none text-accent-soft">
                      {index + 1}
                    </span>
                    <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-deep">
                      <Icon className="h-5 w-5" strokeWidth={2.4} />
                    </span>
                    <p className="relative mt-4 text-base font-extrabold leading-tight">
                      {step.title}
                    </p>
                    <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                variant="whatsapp"
                size="cta"
                className="min-h-14 flex-1 rounded-2xl text-base font-extrabold shadow-xl shadow-accent/20 sm:text-lg"
              >
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon />
                  <span>Написать в WhatsApp</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="cta"
                className="min-h-14 rounded-2xl border-accent/20 bg-white px-6 font-bold text-accent-deep hover:bg-accent-soft"
              >
                <Link to="/">
                  <ArrowLeft className="h-4 w-4" />
                  На главную
                </Link>
              </Button>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[1.75rem] border border-accent/15 bg-white p-5 shadow-xl shadow-accent/10 sm:p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent-deep text-white shadow-lg shadow-accent/20">
                  <Check className="h-7 w-7" strokeWidth={3} />
                </span>
                <div>
                  <p className="text-2xl font-black leading-tight">
                    Мы получили вашу заявку
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Следующий шаг: коротко подтвердить контакт и выбрать время
                    диагностики.
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-accent/20 bg-accent-soft/60 p-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-accent-deep">
                    <Clock3 className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-extrabold leading-snug text-accent-deep">
                      Обычно отвечаю в ближайшее рабочее время
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/65">
                      Если заявка срочная, WhatsApp ускорит подтверждение.
                    </p>
                  </div>
                </div>
              </div>

              {lead && (
                <div className="mt-5 rounded-2xl bg-muted/45 p-4">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                    Данные заявки
                  </p>
                  <dl className="mt-3 space-y-2 text-sm">
                    {lead.name && (
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted-foreground">Имя</dt>
                        <dd className="text-right font-bold">{lead.name}</dd>
                      </div>
                    )}
                    {lead.phone && (
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted-foreground">Телефон</dt>
                        <dd className="text-right font-bold">{lead.phone}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}
            </div>

            <div className="rounded-[1.75rem] bg-accent-deep p-5 text-white shadow-xl shadow-accent/20 sm:p-6">
              <p className="text-xs font-extrabold uppercase tracking-wider text-white/65">
                Что подготовить
              </p>
              <ul className="mt-4 space-y-3 text-sm font-semibold leading-relaxed text-white/90">
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-highlight" />
                  Текущие источники заявок и рекламы.
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-highlight" />
                  Примерную стоимость заявки и записи.
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-highlight" />
                  Где сейчас чаще всего теряются пациенты.
                </li>
              </ul>
            </div>

            <p className="flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground">
              <Phone className="h-4 w-4" />
              WhatsApp: +7 747 284 25 95
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default ThankYou;
