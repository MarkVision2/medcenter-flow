import { useEffect, useRef, useState } from "react";
import { Check, AlertTriangle, MapPin, Square, TrendingUp, Wallet, Sparkles, Megaphone, Inbox, Stethoscope, UserPlus, Receipt, BadgeCheck, Target, Workflow, Layers, HelpCircle, Phone, ArrowRight, X, Clock, Flame } from "lucide-react";
import Section from "@/components/landing/Section";
import Banner from "@/components/landing/Banner";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import ScrollToFormButton from "@/components/landing/ScrollToFormButton";
import yuriPhoto from "@/assets/yuri-optimized.jpg";

const DeferredHeroVideo = () => {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const load = () => setShouldLoadVideo(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(load, { timeout: 1600 });
      return () => window.cancelIdleCallback(id);
    }

    const id = window.setTimeout(load, 900);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo) return;

    const video = videoRef.current;
    if (!video) return;

    video.load();
    video.play().catch(() => {
      /* Autoplay can be blocked by browser policy; controls remain available. */
    });
  }, [shouldLoadVideo]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full bg-black object-cover"
      autoPlay={shouldLoadVideo}
      muted
      controls
      playsInline
      preload="metadata"
      poster="/videos/case-video-poster.jpg"
    >
      {shouldLoadVideo && <source src="/videos/case-video-optimized.mp4" type="video/mp4" />}
      Ваш браузер не поддерживает видео.
    </video>
  );
};

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      {/* 1. HERO + ВИДЕО */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
        {/* Декоративный фон */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-accent-soft/60 via-background to-background" />
          <div className="absolute -top-32 -right-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute top-40 -left-20 h-72 w-72 rounded-full bg-accent-deep/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle, hsl(var(--accent-deep)) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
        </div>

        <div className="mx-auto flex min-h-[100svh] w-full max-w-3xl flex-col px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 sm:min-h-0 sm:flex-1 sm:justify-center sm:px-6 sm:pt-10 sm:pb-16">
          {/* Верхняя плашка-капсула */}
          <div className="mx-auto flex w-fit max-w-full items-center gap-1.5 rounded-full border border-accent/25 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur sm:gap-2 sm:px-4 sm:py-2">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-deep sm:h-5 sm:w-5">
              <BadgeCheck className="h-2.5 w-2.5 text-white sm:h-3.5 sm:w-3.5" strokeWidth={3} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wide text-accent-deep sm:text-xs sm:tracking-wider">
              Методика для&nbsp;медицинских клиник
            </span>
          </div>

          {/* H1 */}
          <h1 className="mx-auto mt-5 max-w-[23rem] text-center text-[40px] font-black leading-[0.92] tracking-tight sm:mt-5 sm:max-w-none sm:text-5xl sm:leading-[1.02] md:text-6xl">
            Хватит терять{" "}
            <span className="relative inline-block text-accent-deep">
              пациентов
              <span className="absolute inset-x-1 -bottom-1 -z-0 h-2 rounded-full bg-highlight/65" />
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-[22rem] text-center text-[17px] font-semibold leading-snug text-foreground/75 sm:mt-5 sm:max-w-2xl sm:text-2xl">
            Увеличьте выручку медицинской клиники{" "}
            <span className="whitespace-nowrap font-black text-accent-deep">в 2–3 раза</span>{" "}
            без дополнительных расходов на рекламу
          </p>

          {/* Видео */}
          <div className="relative mx-auto mt-8 w-full max-w-2xl sm:mt-7">
            <div className="absolute -inset-1 rounded-[1.35rem] bg-gradient-to-tr from-accent-deep/20 via-accent/10 to-highlight/20 blur-md sm:-inset-2 sm:rounded-3xl sm:blur-xl" />
            <div className="relative aspect-video w-full overflow-hidden rounded-[1.1rem] border border-white bg-black shadow-lg ring-1 ring-accent-deep/10 sm:rounded-2xl sm:border-2 sm:shadow-2xl">
              <DeferredHeroVideo />
            </div>
          </div>

          <p className="mt-2 text-center text-[12px] italic leading-snug text-muted-foreground sm:mt-4 sm:text-base">
            Посмотрите видео или прочитайте статью ниже
          </p>

          {/* CTA */}
          <div className="mt-auto pt-4 sm:mt-6 sm:pt-0">
            <ScrollToFormButton
              label="Забронировать диагностику"
              className="h-16 rounded-2xl text-[21px] shadow-lg shadow-accent/20 sm:h-14 sm:rounded-xl sm:text-base"
              ctaId={1}
              ctaName="Hero — Забронировать диагностику"
            />
            <p className="mt-3 flex items-center justify-center gap-2 text-center text-sm font-medium text-muted-foreground sm:mt-3 sm:text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
              </span>
              Количество мест ограничено
            </p>
          </div>
        </div>
      </section>

      {/* 2. БОЛИ */}
      <Section tone="muted">
        <div className="relative overflow-hidden rounded-3xl border border-destructive/20 bg-background p-5 shadow-lg shadow-destructive/5 sm:p-8">
          {/* Декоративный градиент */}
          <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-destructive/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-destructive/60 to-transparent" />

          <div className="relative mx-auto flex w-fit items-center gap-2 rounded-full border border-destructive/30 bg-destructive/5 px-3 py-1">
            <AlertTriangle className="h-3.5 w-3.5 text-destructive" strokeWidth={2.5} />
            <span className="text-[10px] font-bold uppercase tracking-wider text-destructive sm:text-xs">
              Знакомая ситуация?
            </span>
          </div>

          <h2 className="relative mt-4 text-center text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
            Узнайте себя?
          </h2>

          <ul className="relative mx-auto mt-6 max-w-md space-y-3">
            {[
              "Если у вас нет стабильного потока первичных пациентов",
              "Вы устали постоянно нанимать таргетологов которые что-то делают, но результата как не было, так и нет, и при этом у вас есть ощущение, что вы платите и не понимаете, за что.",
              "Видите, как ваши коллеги успешно зарабатывают и путешествуют, а вы смотрите на них и не понимаете, ЧТО ДЕЛАЕТЕ НЕ ТАК.",
              "Вынуждены цепляться за каждого пациента, даже на невыгодных условиях, и работаете в минус.",
              "Не знаете, как привлекать пациентов на премиум-услуги и выйти из ловушки дешёвых пациентов?",
            ].map((item, i) => (
              <li
                key={i}
                className="group flex items-start gap-3 rounded-xl border border-border/60 bg-muted/40 p-3 transition-colors hover:border-destructive/40 hover:bg-destructive/[0.03] sm:gap-4 sm:p-4"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-destructive/10 text-destructive ring-1 ring-destructive/20 sm:h-7 sm:w-7">
                  <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={3} />
                </span>
                <span className="text-sm leading-relaxed text-foreground/80 sm:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <Banner>
            ЕСЛИ ОТВЕТИЛИ «ДА» ХОТЯ&nbsp;БЫ НА&nbsp;1&nbsp;ВОПРОС&nbsp; ТО&nbsp;ЭТА ИНФОРМАЦИЯ ТОЧНО ДЛЯ&nbsp;ВАС
          </Banner>
        </div>
      </Section>

      {/* 3. ПЕРЕХОД */}
      <Section>
        <p className="text-center text-lg leading-relaxed sm:text-xl">
          Сейчас я расскажу, как забыть о&nbsp;работе за&nbsp;копейки и&nbsp;начать зарабатывать, как{" "}
          <span className="font-bold text-accent-deep">лучшие клиники Казахстана</span>, имея больше свободного времени и&nbsp;энергии.
        </p>
      </Section>

      {/* 4. СУТЬ СИСТЕМЫ — 3 ЗОНЫ */}
      <Section tone="muted">
        <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-deep">
          <Sparkles className="h-3.5 w-3.5" />
          Суть системы
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight sm:text-3xl">
          Система, которая работает <br />
          <span className="text-accent-deep">в трёх зонах</span>
        </h2>

        <ul className="mt-7 space-y-4">
          {[
            {
              icon: Target,
              title: "Стоимость привлечения пациента",
              desc: "Это всё, что вы тратите на рекламу, на контент-маркетинг, на листовки, на радио и так далее. Здесь важно знать стоимость одной заявки, то есть обращения, которое поступило в вашу клинику.",
            },
            {
              icon: Workflow,
              title: "Эффективность рекламы и воронки продаж",
              desc: "Как быстро заявка с рекламы превращается в запись и визит на приём. На этом этапе важно фиксировать стоимость визита.",
            },
            {
              icon: Layers,
              title: "Основная продажа курса лечения",
              desc: "Восстановления и так далее. На этом этапе мы измеряем эффективность ваших врачей или кураторов лечения и то, как они проводят первичную диагностику: делают анамнез, презентуют клинику, методику и составляют план лечения.",
            },
          ].map((step, i) => {
            const Icon = step.icon;
            return (
              <li
                key={i}
                className="group relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm sm:p-6"
              >
                <span className="absolute right-3 top-3 text-5xl font-black leading-none text-accent/10 sm:text-6xl">
                  {i + 1}
                </span>
                <div className="relative flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-deep">
                    <Icon className="h-5 w-5" strokeWidth={2.5} />
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold leading-snug">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 rounded-2xl bg-banner p-5 text-center text-white shadow-lg sm:p-6">
          <p className="text-base font-extrabold uppercase leading-snug text-highlight sm:text-lg">
            Именно здесь находится ваша максимальная прибыль
          </p>
        </div>
      </Section>

      {/* 5. КЕЙСЫ */}
      <Section contentClassName="max-w-6xl">
        <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-deep">
          <Sparkles className="h-3.5 w-3.5" />
          Реальный кейс
        </div>
        <h2 className="text-center font-bold leading-tight sm:text-3xl text-xl">
          Результаты&nbsp;
          <span className="text-accent-deep">из реальных клиник</span>
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground sm:text-base">
          Разные города, разные ниши — одна система.
        </p>

        <div className="mx-auto mt-6 max-w-2xl overflow-hidden rounded-2xl border bg-card shadow-md">
          <div className="border-b bg-accent-soft/40 px-6 py-4 sm:px-8">
            <div className="flex items-center justify-center gap-2 text-center font-semibold text-accent-deep">
              <MapPin className="h-5 w-5 shrink-0" />
              <span className="text-lg sm:text-xl">Клиника из Алматы</span>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="rounded-xl border-l-4 border-destructive bg-destructive/5 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-destructive">
                Было
              </p>
              <p className="mt-2 text-base leading-relaxed sm:text-lg">
                Один администратор не справлялся со звонками. Записывал всех подряд приходило только <span className="font-bold text-destructive">30%</span> от записанных.
              </p>
            </div>

            <h3 className="mt-7 text-center text-lg font-bold sm:text-xl">
              Что мы сделали?
            </h3>
            <ul className="mx-auto mt-4 max-w-md space-y-3">
              {[
                "Вывели 2 девушек в отдельный колл-центр",
                "Обучили скриптам продаж первичных консультаций",
                "Поставили задачу: продать приём с предоплатой или полной оплатой",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl bg-muted/50 p-3"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                  <span className="text-base leading-snug sm:text-lg">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-2xl bg-banner p-6 text-center text-white shadow-lg">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-highlight">
                <TrendingUp className="h-3.5 w-3.5" />
                Результат за 2 недели
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { icon: Megaphone, value: "830 000 ₸", label: "Расходы на рекламу" },
                  { icon: Inbox, value: "415", label: "Заявок с рекламы" },
                  { icon: Stethoscope, value: "83", label: "Платных диагностик" },
                  { icon: UserPlus, value: "29", label: "Новых пациентов" },
                ].map((m, i) => (
                  <div key={i} className="rounded-xl bg-white/10 p-3">
                    <m.icon className="mx-auto h-5 w-5 text-highlight" />
                    <p className="mt-2 text-lg font-extrabold leading-none sm:text-xl">
                      {m.value}
                    </p>
                    <p className="mt-1.5 text-[11px] leading-tight text-white/80 sm:text-xs">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-white/10 p-3">
                <Receipt className="h-5 w-5 text-highlight" />
                <p className="text-sm text-white/80">
                  Средний чек:{" "}
                  <span className="font-extrabold text-white">350 000 ₸</span>
                </p>
              </div>

              <div className="mt-4 rounded-xl bg-white/10 p-4">
                <Wallet className="mx-auto h-6 w-6 text-highlight" />
                <p className="mt-2 text-3xl font-extrabold leading-none text-highlight sm:text-4xl">
                  +13 000 000
                </p>
                <p className="mt-2 text-sm text-white/80">
                  выручки в кассу
                </p>
              </div>
            </div>

            <p className="mt-6 text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
              Тот же бюджет на рекламу в{" "}
              <span className="font-bold text-foreground">3 раза больше</span>{" "}
              реально пришедших и оплативших пациентов.
            </p>
            <p className="mt-3 text-center text-base font-semibold leading-snug sm:text-lg">
              В чём разница?{" "}
              <span className="text-accent-deep">Правильные люди на правильных позициях.</span>
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 xl:gap-5 lg:grid-cols-3">
          {[
            {
              city: "Астана",
              niche: "Стоматология",
              value: "+8,4 млн ₸",
              period: "дополнительной выручки за 2 месяца",
              before: "22% доходимости с заявок",
              after: "61% доходимости, график забит на 3 недели вперёд",
            },
            {
              city: "Шымкент",
              niche: "Многопрофильный центр",
              value: "+18,2 млн ₸",
              period: "дополнительной выручки за 4 месяца",
              before: "Собственник лично закрывал заявки по вечерам",
              after: "Колл-центр работает без владельца, +47 первичных в месяц",
            },
            {
              city: "Караганда",
              niche: "Косметология",
              value: "x2,4",
              period: "к выручке за 3 месяца",
              before: "Повторных пациентов почти не было",
              after: "64% записываются на повторный приём ещё до выхода из кабинета",
            },
          ].map((c, i) => (
            <div
              key={i}
              className="group flex min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="border-b bg-gradient-to-br from-accent-soft/80 via-background to-background px-5 py-5">
                <div className="flex min-w-0 items-start justify-between gap-4">
                  <div className="min-w-0">
                    <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-accent-deep ring-1 ring-accent/15">
                      <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
                      <span>{c.city}</span>
                    </span>
                    <p className="mt-3 text-base font-semibold leading-snug text-foreground">
                      {c.niche}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-accent-deep/10 px-3 py-1.5 text-xs font-black text-accent-deep">
                    0{i + 1}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                <div className="flex min-h-[11.25rem] flex-col justify-between rounded-2xl bg-accent-deep p-4 text-white shadow-lg shadow-accent-deep/15 sm:min-h-[13.5rem] sm:px-5 sm:py-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-highlight">
                      Результат
                    </p>
                    <TrendingUp className="h-5 w-5 text-highlight" strokeWidth={2.5} />
                  </div>
                  <p className="mt-4 text-[2.35rem] font-black leading-[0.95] tracking-tight sm:text-[2.8rem] lg:text-[2.35rem] xl:text-[2.75rem]">
                    {c.value}
                  </p>
                  <p className="mt-3 text-sm font-semibold leading-snug text-white/78">
                    {c.period}
                  </p>
                </div>

                <div className="mt-5 flex flex-1 flex-col justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-destructive">
                      До системы
                    </p>
                    <p className="mt-2 text-base leading-snug text-foreground/78">
                      {c.before}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-accent-deep/55">
                    <span className="h-px flex-1 bg-border" />
                    <ArrowRight className="h-5 w-5" />
                    <span className="h-px flex-1 bg-border" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-accent-deep">
                      После внедрения
                    </p>
                    <p className="mt-2 text-base font-semibold leading-snug text-foreground">
                      {c.after}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-2xl rounded-2xl bg-muted/50 px-4 py-3 text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
          Это не разовые истории —{" "}
          <span className="font-semibold text-foreground">это повторяющийся результат системы.</span>
        </p>
      </Section>

      {/* 6. ОБО МНЕ */}
      <Section tone="muted" className="sm:py-20" contentClassName="max-w-5xl">
        <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase text-accent-deep">
          <BadgeCheck className="h-3.5 w-3.5" />
          Знакомство
        </div>

        <div className="overflow-hidden rounded-[2rem] border bg-background shadow-xl shadow-accent/5">
          <div className="grid lg:grid-cols-[minmax(280px,0.82fr)_minmax(0,1.18fr)]">
            <div className="bg-gradient-to-br from-accent-soft/80 via-background to-background p-4 sm:p-6 lg:p-7">
              <div className="mx-auto max-w-sm overflow-hidden rounded-[1.5rem] border bg-card shadow-lg lg:max-w-none">
                <img
                  src={yuriPhoto}
                  alt="Юрий — автор системы для медицинских клиник"
                  loading="lazy"
                  decoding="async"
                  width={720}
                  height={1080}
                  className="block aspect-[4/5] w-full object-cover object-center lg:aspect-[5/6]"
                />
                <div className="border-t bg-card px-5 py-4">
                  <p className="text-lg font-black leading-tight">Юрий</p>
                  <p className="mt-1 text-sm leading-snug text-muted-foreground">
                    Эксперт по росту медицинских клиник
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-7 lg:p-9">
              <h2 className="text-center text-[2.2rem] font-black leading-none sm:text-5xl md:text-left">
                Меня зовут <span className="text-accent-deep">Юрий</span>
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-accent-deep/70 md:mx-0" />

              <p className="mt-5 text-center text-base leading-relaxed text-muted-foreground sm:text-lg md:text-left">
                Я помогаю клиникам находить неочевидные точки потерь: от рекламы и заявок до администраторов, первичных консультаций и повторных продаж.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    value: "5 лет",
                    label: "в медицинском маркетинге",
                    note: "знаю, где чаще всего теряются заявки",
                  },
                  {
                    value: "десятки",
                    label: "разобранных клиник",
                    note: "стоматологии, косметологии и многопрофильные центры",
                  },
                  {
                    value: "до 10x",
                    label: "рост окупаемости",
                    note: "когда исправлена вся система, а не только реклама",
                  },
                ].map((item) => (
                  <div key={item.label} className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-accent-soft/60 via-background to-background p-4 shadow-sm">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-deep text-white shadow-sm">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                    <p className="mt-4 text-3xl font-black leading-none text-accent-deep">
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm font-extrabold leading-snug text-foreground">
                      {item.label}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 grid gap-4 text-base leading-relaxed text-foreground/85 sm:text-lg lg:grid-cols-2">
                <p>
                  Я не смотрю на рекламу отдельно от продаж. В клинике всё связано: заявка, звонок, запись, визит, план лечения и повторный приём.
                </p>
                <p>
                  Поэтому на диагностике мы ищем не “красивую гипотезу”, а конкретные места, где сейчас утекают пациенты и деньги.
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-highlight/40 bg-highlight/20 p-4 sm:p-5">
                <p className="text-lg font-black leading-snug text-foreground sm:text-xl">
                  Мы с командой помогали клиникам повышать окупаемость в{" "}
                  <span className="rounded bg-highlight px-1.5 text-foreground">3, 5 и даже 10 раз</span>.
                </p>
              </div>

              <div className="mt-5 rounded-2xl border border-accent/25 bg-accent-soft/55 p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-deep text-white shadow-sm">
                    <BadgeCheck className="h-5 w-5" strokeWidth={2.5} />
                  </span>
                  <p className="text-base font-extrabold leading-snug text-accent-deep sm:text-lg">
                    С этой системой вы перестанете терять деньги, а каждая инвестиция в маркетинг начнёт работать на результат.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 7. СТОИМОСТЬ */}
      <Section>
        <div className="overflow-hidden rounded-3xl border bg-card shadow-md">
          <div className="flex items-center gap-3 border-b bg-accent-soft/50 px-5 py-4 sm:px-7">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-deep text-white">
              <HelpCircle className="h-5 w-5" />
            </span>
            <p className="text-lg font-extrabold leading-tight sm:text-xl">
              Вы спросите: сколько это стоит?
            </p>
          </div>
          <div className="px-5 py-6 sm:px-7 sm:py-7">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Я не знаю, сколько это стоит, потому что не знаю конкретно вашу проблему и что именно нужно будет делать в первую очередь. Возможно, будет достаточно <span className="font-semibold text-foreground">что-то подправить</span>, а возможно — <span className="font-semibold text-foreground">выстроить всю систему под ключ</span>.
            </p>
          </div>
        </div>
      </Section>

      {/* 8. ФИНАЛЬНЫЙ CTA */}
      <Section tone="muted" contentClassName="max-w-5xl">
        <h2 className="text-center text-2xl font-extrabold leading-tight sm:text-3xl">
          Если вы хотите оставить конкурентов позади и{" "}
          <span className="text-accent-deep">кратно увеличить выручку</span> вашей клиники…
        </h2>

        <p className="mt-5 text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
          Если хотите, чтобы маркетинг наконец начал приносить результат, а не «съедал» бюджет — жмите на кнопку и записывайтесь на диагностику.
        </p>

        <div className="mt-8 overflow-hidden rounded-[2rem] border bg-background shadow-xl shadow-accent/5">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-gradient-to-br from-accent-deep via-accent to-accent-deep p-5 text-white sm:p-7 lg:p-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-highlight">
                Что будет на диагностике
              </p>
              <h3 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
                Найдём, где клиника теряет заявки, пациентов и деньги
              </h3>
              <p className="mt-4 text-base leading-relaxed text-white/82 sm:text-lg">
                За одну встречу разложим вашу текущую систему по этапам и покажем,
                что исправить в первую очередь, чтобы маркетинг начал давать результат.
              </p>

              <div className="mt-6 rounded-2xl bg-white/12 p-4 ring-1 ring-white/15">
                <p className="text-sm font-semibold uppercase tracking-wide text-highlight">
                  Итог диагностики
                </p>
                <p className="mt-2 text-xl font-black leading-snug">
                  Готовый план роста без увеличения рекламного бюджета
                </p>
              </div>
            </div>

            <div className="grid gap-3 p-4 sm:p-5 lg:p-6">
              {[
                {
                  title: "Разберём текущую воронку",
                  text: "Посмотрим путь пациента от рекламы до записи и найдём места, где заявки остывают.",
                },
                {
                  title: "Проверим рекламу и источники",
                  text: "Поймём, какие каналы приводят качественных пациентов, а какие просто съедают бюджет.",
                },
                {
                  title: "Найдём потери в админах и продажах",
                  text: "Разберём, почему люди не доходят до приёма, не покупают лечение или не возвращаются.",
                },
                {
                  title: "Соберём пошаговый план",
                  text: "Вы получите список действий: что исправить сейчас, что внедрить дальше и где будет самый быстрый рост.",
                },
              ].map((item, i) => (
                <div key={item.title} className="flex gap-4 rounded-2xl border bg-card p-4 shadow-sm">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-deep">
                    <span className="text-sm font-black">{i + 1}</span>
                  </span>
                  <div>
                    <p className="text-base font-extrabold leading-snug sm:text-lg">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <h3 className="text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl lg:text-6xl">
            У вас два пути
          </h3>
          <p className="mt-3 text-base font-medium text-muted-foreground sm:text-xl">
            Какой выберете для своей клиники?
          </p>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-destructive via-[#bd302b] to-[#9f2925] p-5 text-white shadow-xl shadow-destructive/15 sm:p-7 lg:p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex items-center gap-4">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/14 text-white sm:h-20 sm:w-20">
                <TrendingUp className="h-8 w-8 rotate-180" strokeWidth={3} />
              </span>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-white/70">
                Путь 1
              </p>
            </div>

            <h4 className="relative mt-9 text-3xl font-black uppercase leading-tight sm:text-4xl">
              Оставить как есть
            </h4>

            <ul className="relative mt-7 space-y-4 text-base leading-snug text-white/95 sm:text-lg">
              {[
                "Закрыть страницу и забыть",
                "Продолжать терять пациентов и сливать рекламный бюджет",
                "Смотреть, как коллеги забирают ваш рынок",
                "Через год вернуться к тем же проблемам, но дороже",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-white" strokeWidth={3} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#3b7f47] via-accent-deep to-[#235f48] p-5 text-white shadow-xl shadow-accent-deep/20 sm:p-7 lg:p-8">
            <div className="absolute right-5 top-5 rounded-full bg-highlight px-4 py-2 text-[11px] font-black uppercase tracking-widest text-foreground shadow-md sm:right-7">
              Рекомендуем
            </div>
            <div className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-highlight/10 blur-3xl" />
            <div className="relative flex items-center gap-4 pr-36">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/14 text-white sm:h-20 sm:w-20">
                <TrendingUp className="h-8 w-8" strokeWidth={3} />
              </span>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-white/70">
                Путь 2
              </p>
            </div>

            <h4 className="relative mt-9 text-3xl font-black uppercase leading-tight sm:text-4xl">
              Построить систему
            </h4>

            <ul className="relative mt-7 space-y-4 text-base leading-snug text-white/95 sm:text-lg">
              {[
                "Записаться на диагностику",
                "Увидеть, где клиника теряет деньги",
                "Получить пошаговый план роста выручки",
                "Стать клиникой №1 в своём городе",
              ].map((item, i) => (
                <li key={item} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-accent-deep">
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 space-y-5">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#356bd1] via-[#2f6a9d] to-accent-deep p-5 text-white shadow-xl shadow-accent-deep/15 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/10">
                <Clock className="h-7 w-7" strokeWidth={2.5} />
              </span>
              <div>
                <p className="text-2xl font-black uppercase leading-tight sm:text-3xl lg:text-4xl">
                  Завтра свободных мест может не быть
                </p>
                <p className="mt-3 text-base leading-snug text-highlight sm:text-xl">
                  Я беру <span className="font-black">только 1 клинику</span> и только одну в нише в городе.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border-2 border-dashed border-[#b9cdf4] bg-white/85 px-5 py-6 text-center shadow-sm sm:px-8 sm:py-8">
            <p className="mx-auto max-w-4xl text-lg font-medium leading-relaxed text-foreground/85 sm:text-2xl">
              Если вы всё ещё думаете — просто представьте, где будете через год, когда узнаете, что{" "}
              <span className="box-decoration-clone bg-highlight/35 px-1.5 font-black text-foreground">
                клиники-конкуренты уже делают по 20+ миллионов в месяц
              </span>
              .
            </p>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-[#3f866b] via-accent-deep to-[#2c6c58] p-5 text-white shadow-xl shadow-accent-deep/15 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/14 text-highlight ring-1 ring-white/10">
                <Flame className="h-6 w-6" strokeWidth={2.5} />
              </span>
              <p className="text-xl font-semibold leading-snug sm:text-2xl">
                Пока вы думаете — ваши{" "}
                <span className="font-black text-highlight">коллеги-клиники внедряют системы продаж</span>{" "}
                и забирают ваших пациентов.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ScrollToFormButton
            variant="cta-orange"
            label="Забронировать диагностику клиники"
            className="uppercase"
            ctaId={2}
            ctaName="Финальный CTA — Забронировать диагностику"
          />
        </div>

        <p className="mt-4 text-center text-base font-bold text-accent-deep sm:text-lg">
          До встречи на разборе!
        </p>
      </Section>

      <footer className="border-t bg-background px-5 py-8 text-center text-xs text-muted-foreground">
        <p className="flex items-center justify-center gap-2">
          <Phone className="h-3.5 w-3.5" />
          WhatsApp: +7 747 284 25 95
        </p>
        <p className="mt-2">© {new Date().getFullYear()} Система MarkVision AI</p>
      </footer>
    </main>
  );
};

export default Index;
