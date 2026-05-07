import { Check, ArrowRight, AlertTriangle, Phone, MapPin, Square, X, TrendingUp, Wallet, Sparkles, Gift, MessageCircle, Map, BarChart3, PhoneCall, BadgeCheck, Megaphone, Inbox, Target, UserPlus, Receipt, Clock, Flame, HeartPulse, Stethoscope, Activity, PlayCircle, Crown } from "lucide-react";
import Section from "@/components/landing/Section";
import Banner from "@/components/landing/Banner";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import yuriPhoto from "@/assets/yuri.png";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      {/* 1. HERO */}
      <Section className="pt-3 pb-4 sm:pt-10 sm:pb-12">
        {/* Маленькая красная плашка сверху */}
        <div className="mx-auto w-fit rounded-full bg-destructive/10 border border-destructive/30 px-4 py-1.5 text-center">
          <p className="text-destructive text-xs sm:text-sm font-semibold uppercase tracking-wide">
            Проверенная методика для реабилитационных центров
          </p>
        </div>

        {/* Главный заголовок */}
        <h1 className="mt-5 text-center font-extrabold leading-[1.1] tracking-tight text-2xl sm:text-4xl md:text-5xl">
          Как центру реабилитации получить{" "}
          <span className="text-accent-deep">100+ пациентов</span> на платную диагностику
        </h1>

        {/* Подзаголовок */}
        <p className="mt-4 text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
          Для&nbsp;владельцев центров реабилитации, которые хотят обойти конкурентов в&nbsp;2026&nbsp;году
          и&nbsp;увеличить выручку в&nbsp;<span className="font-semibold text-foreground">2–3&nbsp;раза</span>{" "}
          без увеличения расходов на&nbsp;рекламу.
        </p>

        {/* YouTube embed */}
        <div className="mt-4">
          <div className="relative overflow-hidden rounded-2xl border bg-card shadow-lg aspect-video">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Видео-обращение Юрия"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        {/* Кнопка */}
        <div className="mt-5">
          <WhatsAppButton label="Забронировать диагностику" />
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Напишите нам в WhatsApp — это займёт 30 секунд
          </p>
        </div>
      </Section>

      {/* 2. УЗНАЁТЕ СЕБЯ? */}
      <Section tone="muted">
        <div className="rounded-2xl border-2 border-destructive/70 bg-background p-5 sm:p-7">
          <h2 className="text-center text-2xl font-extrabold leading-tight sm:text-3xl">
            Узнаёте себя?
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground sm:text-base">
            Если у&nbsp;вас нет стабильного потока первичных пациентов
          </p>

          <ul className="mx-auto mt-6 max-w-md space-y-5">
            {[
              "Вы устали постоянно нанимать таргетологов, которые что-то делают, но результата как не было — так и нет. Вы платите и не понимаете, за что",
              "Видите, как ваши коллеги успешно зарабатывают и путешествуют, а вы смотрите на них и не понимаете, ЧТО ДЕЛАЕТЕ НЕ ТАК",
              "Вынуждены цепляться за каждого пациента, даже на невыгодных условиях, и работаете в минус",
              "Не знаете, как привлекать пациентов на премиум-услуги и выйти из ловушки дешёвых пациентов",
              "Хотите систему, при которой пациенты приходят сами, а врачи и кураторы только ведут лечение",
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <Square
                  className="mt-1 h-6 w-6 shrink-0 text-banner"
                  strokeWidth={2.5}
                />
                <span className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 3. ПЕРЕХОД */}
      <Section>
        <Banner>
          ЕСЛИ ОТВЕТИЛИ «ДА» ХОТЯ&nbsp;БЫ НА&nbsp;1&nbsp;ВОПРОС — ЭТА ИНФОРМАЦИЯ ДЛЯ&nbsp;ВАС
        </Banner>
        <p className="mt-5 text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
          Сейчас я&nbsp;расскажу, как забыть о&nbsp;работе за&nbsp;копейки и&nbsp;начать зарабатывать как
          лучшие клиники Казахстана, имея больше свободного времени и&nbsp;энергии.
        </p>
        <div className="mt-6">
          <WhatsAppButton label="Забронировать диагностику" />
        </div>
      </Section>

      {/* 4. СУТЬ СИСТЕМЫ — 3 ЗОНЫ */}
      <Section tone="muted">
        <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-deep">
          <Activity className="h-3.5 w-3.5" />
          Суть системы
        </div>
        <h2 className="text-center font-bold leading-tight text-2xl sm:text-3xl">
          Система, которая работает{" "}
          <span className="text-accent-deep">в трёх зонах</span>
        </h2>

        <div className="mt-7 space-y-4">
          {[
            {
              icon: Megaphone,
              title: "Стоимость привлечения пациента",
              desc: "Всё, что вы тратите на рекламу, контент-маркетинг, листовки, радио и так далее. Здесь важно знать стоимость одной заявки — обращения, которое поступило в вашу клинику.",
            },
            {
              icon: Target,
              title: "Эффективность рекламы и воронки продаж",
              desc: "Как быстро заявка с рекламы превращается в запись и визит на приём. На этом этапе важно фиксировать стоимость визита.",
            },
            {
              icon: Stethoscope,
              title: "Основная продажа курса лечения",
              desc: "Восстановление и реабилитация. Здесь мы измеряем эффективность ваших врачей и кураторов: как они проводят первичную диагностику, делают анамнез, презентуют клинику, методику и составляют план лечения.",
            },
          ].map((z, i) => {
            const Icon = z.icon;
            return (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm sm:p-6"
              >
                <span className="absolute right-3 top-1 text-7xl font-black leading-none text-accent/10 sm:text-8xl">
                  {i + 1}
                </span>
                <div className="relative flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-deep">
                    <Icon className="h-6 w-6" strokeWidth={2.5} />
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold leading-snug sm:text-xl">{z.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {z.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-banner to-banner/85 px-5 py-4 text-banner-foreground shadow-md">
          <Crown className="h-6 w-6 shrink-0 text-highlight" />
          <p className="text-base font-extrabold uppercase tracking-wide sm:text-lg">
            Именно здесь — ваша максимальная прибыль
          </p>
        </div>
      </Section>

      {/* 5. ГЛАВНЫЙ КЕЙС */}
      <Section>
        <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-deep">
          <Sparkles className="h-3.5 w-3.5" />
          Реальный кейс
        </div>
        <h2 className="text-center font-bold leading-tight text-2xl sm:text-3xl">
          Результаты{" "}
          <span className="text-accent-deep">из реальных клиник</span>
        </h2>
        <p className="mt-3 text-center text-base text-muted-foreground sm:text-lg">
          Разные города, разные ниши — одна система.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border bg-card shadow-md">
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
                Один администратор не справлялся со звонками. Записывал всех подряд — приходило только{" "}
                <span className="font-bold text-destructive">30%</span> от записанных.
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
                  { icon: HeartPulse, value: "83", label: "Платных диагностик" },
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
                  +13 000 000 ₸
                </p>
                <p className="mt-2 text-sm text-white/80">
                  выручки в кассу
                </p>
              </div>
            </div>

            <p className="mt-6 text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
              Тот же бюджет на рекламу — в{" "}
              <span className="font-bold text-foreground">3 раза больше</span>{" "}
              реально пришедших и оплативших пациентов.
            </p>
            <p className="mt-3 text-center text-base font-semibold leading-snug sm:text-lg">
              В чём разница?{" "}
              <span className="text-accent-deep">Правильные люди на правильных позициях.</span>
            </p>
          </div>
        </div>

        {/* Ещё кейсы из разных ниш */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              city: "Павлодар",
              niche: "Автодом Toyota / Lexus",
              result: "5 000+ заявок",
              period: "работаем 3-й год",
              before: "поток заявок зависел от сезона и менеджеров",
              after: "стабильно 5000+ обращений на покупку авто за всё время сотрудничества",
            },
            {
              city: "Алматы",
              niche: "Стоматология «Уали»",
              result: "4 000+ заявок",
              period: "за 2 года работы",
              before: "имплантация продавалась плохо, основной поток — мелкие услуги",
              after: "более 4000 заявок именно на установку имплантов, средний чек вырос в разы",
            },
            {
              city: "Астана",
              niche: "Стоматология",
              result: "+8 400 000 ₸",
              period: "за 2 месяца",
              before: "22% доходимости с заявок",
              after: "61% доходимости, график врачей забит на 3 недели вперёд",
            },
            {
              city: "Шымкент",
              niche: "Многопрофильный медцентр",
              result: "+18 200 000 ₸",
              period: "за 4 месяца",
              before: "собственник лично закрывал заявки по вечерам",
              after: "колл-центр работает без владельца, +47 первичных пациентов в месяц",
            },
            {
              city: "Караганда",
              niche: "Косметология",
              result: "x2.4 к выручке",
              period: "за 3 месяца",
              before: "повторных пациентов почти не было",
              after: "64% записываются на повторный приём ещё до выхода из кабинета",
            },
            {
              city: "Алматы",
              niche: "Центр реабилитации",
              result: "+13 000 000 ₸",
              period: "за 3 месяца",
              before: "пациенты приходили только по сарафану",
              after: "стабильный поток первичных + полные курсы реабилитации с предоплатой",
            },
          ].map((c, i) => (
            <div
              key={i}
              className="flex flex-col rounded-2xl border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span>{c.city} · {c.niche}</span>
              </div>

              <div className="mt-4">
                <p className="text-3xl font-extrabold leading-none text-accent-deep">
                  {c.result}
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground">{c.period}</p>
              </div>

              <div className="mt-auto pt-5 space-y-2 border-t mt-5">
                <div className="flex gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-destructive" aria-hidden="true" />
                  <p className="text-sm leading-snug">
                    <span className="font-semibold">Было:</span> {c.before}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <p className="text-sm leading-snug">
                    <span className="font-semibold">Стало:</span> {c.after}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm italic text-muted-foreground sm:text-base">
          Это не разовые истории — это повторяющийся результат системы.
        </p>
      </Section>

      {/* 7. ЗНАКОМСТВО — ЮРИЙ */}
      <Section tone="muted">
        <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-deep">
          <BadgeCheck className="h-3.5 w-3.5" />
          Эксперт по росту медицинских клиник
        </div>

        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-10">
          <div className="relative mx-auto w-full max-w-sm md:mx-0">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/20 via-transparent to-accent-deep/20 blur-xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-2xl border bg-card shadow-xl">
              <img
                src={yuriPhoto}
                alt="Юрий — эксперт по росту медицинских клиник"
                className="block w-full object-cover"
              />
              <div className="border-t bg-card px-4 py-3">
                <p className="text-sm font-bold leading-tight">Юрий</p>
                <p className="text-xs text-muted-foreground">
                  Эксперт по росту медицинских клиник
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-center text-2xl font-bold leading-tight sm:text-3xl md:text-left">
              Меня зовут{" "}
              <span className="text-accent-deep">Юрий</span>
            </h2>

            <p className="mt-4 text-base leading-relaxed sm:text-lg">
              Последние{" "}
              <span className="font-semibold">5 лет</span> я&nbsp;занимался именно этим: выстраивал систему,
              которая позволяет при тех&nbsp;же вложениях в&nbsp;рекламный бюджет увеличивать выручку клиники.
              Мы&nbsp;с&nbsp;командой прогнали десятки кейсов разных клиник и&nbsp;помогли сделать окупаемость в{" "}
              <span className="font-semibold text-accent-deep">3, 5 и&nbsp;даже 10&nbsp;раз</span>.
            </p>

            <p className="mt-4 text-base leading-relaxed sm:text-lg">
              Я&nbsp;беру на&nbsp;себя ответственность за&nbsp;каждый этап. Точно знаю, на&nbsp;что
              смотреть, чтобы больше пациентов доходило до&nbsp;клиники, записывалось на&nbsp;лечение
              и&nbsp;оставалось с&nbsp;вами на&nbsp;долгие годы.
            </p>

            <p className="mt-4 text-base leading-relaxed sm:text-lg">
              С&nbsp;этой системой вы&nbsp;перестанете терять деньги, а&nbsp;каждая инвестиция
              в&nbsp;маркетинг начнёт работать на&nbsp;результат.
            </p>
          </div>
        </div>
      </Section>

      {/* 8. ЦЕНА ДИАГНОСТИКИ */}
      <Section>
        <h2 className="text-center text-2xl font-extrabold leading-tight sm:text-3xl">
          Вы&nbsp;спросите:{" "}
          <span className="text-accent-deep">сколько это стоит?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
          Я&nbsp;не&nbsp;знаю, сколько стоит решить именно вашу задачу — пока не&nbsp;увижу вашу ситуацию.
          Возможно, достаточно подправить пару вещей. А&nbsp;возможно — выстроить всю систему под&nbsp;ключ.
        </p>

        <p className="mx-auto mt-4 max-w-md text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
          Если хотите оставить конкурентов позади и&nbsp;кратно увеличить выручку клиники —
          записывайтесь на&nbsp;диагностику.
        </p>

        {/* Большая плашка с ценой */}
        <div className="mt-7 relative overflow-hidden rounded-3xl border-2 border-cta-orange/40 bg-card p-6 shadow-xl sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cta-orange/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Диагностика стоит
            </p>
            <p className="mt-2 font-black leading-none tracking-tight text-cta-orange text-6xl sm:text-7xl">
              10 000 ₸
            </p>

            <div className="mx-auto mt-6 max-w-md text-base leading-relaxed text-foreground/85 sm:text-lg">
              Мы&nbsp;разберём вашу текущую ситуацию и&nbsp;дадим готовый пошаговый план: где
              вы&nbsp;теряете деньги прямо сейчас и&nbsp;как увеличить количество первичных пациентов
              <span className="font-semibold"> без дополнительных расходов на&nbsp;рекламу.</span>
            </div>

            <div className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full bg-destructive/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-destructive">
              <AlertTriangle className="h-3.5 w-3.5" />
              Количество мест ограничено
            </div>

            <div className="mt-6">
              <WhatsAppButton label="Забронировать диагностику" />
            </div>
          </div>
        </div>
      </Section>

      {/* 9. СУТЬ — баннер */}
      <Section tone="muted">
        <div className="relative overflow-hidden rounded-3xl bg-banner p-7 text-white shadow-xl sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-highlight/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative">
            <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-highlight">
              <Sparkles className="h-3.5 w-3.5" />
              Главное
            </div>

            <h2 className="text-center font-extrabold leading-[1.15] tracking-tight text-2xl sm:text-3xl md:text-4xl">
              Хотите перестать работать за&nbsp;копейки и&nbsp;зарабатывать как{" "}
              <span className="text-highlight">лучшая клиника Казахстана?</span>
            </h2>

            <p className="mx-auto mt-5 max-w-md text-center text-base leading-relaxed text-white/75 sm:text-lg">
              Иметь больше свободного времени, энергии
              <br className="hidden sm:block" />
              и&nbsp;стабильный поток пациентов.
            </p>

            <div className="mx-auto my-8 h-px w-16 bg-white/30" />

            <div className="text-center">
              <p className="text-base text-white/85 sm:text-lg">Для&nbsp;этого нужен</p>
              <p className="mt-3 font-extrabold uppercase leading-[0.95] tracking-tight text-highlight text-5xl sm:text-6xl md:text-7xl">
                Системный
                <br />
                подход
              </p>
            </div>

            <p className="mx-auto mt-7 max-w-md text-center text-sm leading-relaxed text-white/75 sm:text-base">
              Без системы вы&nbsp;продолжите терять пациентов и&nbsp;деньги каждый день.
            </p>
          </div>
        </div>
      </Section>

      {/* 10. 4 ШАГА ДИАГНОСТИКИ */}
      <Section>
        <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-deep">
          <Gift className="h-3.5 w-3.5" />
          4 шага диагностики
        </div>
        <h2 className="text-center font-bold leading-tight text-2xl sm:text-3xl">
          Что вы получите вместе{" "}
          <span className="text-accent-deep">с диагностикой</span>
        </h2>
        <p className="mt-3 text-center text-base text-muted-foreground sm:text-lg">
          Найдём все дыры, через которые утекают ваши пациенты и&nbsp;деньги.
        </p>

        <ul className="mt-7 space-y-4">
          {[
            {
              icon: MessageCircle,
              title: "Часовая консультация 1 на 1 со мной",
              desc: "Покажу, как привлекать пациентов на премиум-услуги с чеком от 100 000 ₸ — без бесконечного поиска и зависимости от сарафана.",
              value: "150 000 ₸",
            },
            {
              icon: Map,
              title: "Карта с пошаговым планом",
              desc: "Как выйти на стабильный доход 300 000 – 600 000 ₸ в день, даже если сейчас зарабатываете в 5 раз меньше.",
              value: "80 000 ₸",
            },
            {
              icon: BarChart3,
              title: "Анализ рекламы и каналов привлечения пациентов",
              desc: "Разберём текущие источники пациентов и точки утечки бюджета.",
              value: "60 000 ₸",
            },
            {
              icon: PhoneCall,
              title: "Тайный звонок",
              desc: "Прозвоним как пациент, запишем разговор и покажем, где администратор сливает заявки.",
              value: "50 000 ₸",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <li
                key={i}
                className="group relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
              >
                <span className="absolute right-3 top-3 text-5xl font-black leading-none text-accent/10 sm:text-6xl">
                  {i + 1}
                </span>
                <div className="relative flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-deep">
                    <Icon className="h-5 w-5" strokeWidth={2.5} />
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold leading-snug">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {item.desc}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-sm font-bold text-accent-deep">
                      Ценность: {item.value}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 overflow-hidden rounded-2xl bg-banner text-white shadow-xl">
          <div className="px-6 py-7 text-center sm:px-8 sm:py-8">
            <p className="text-base font-semibold leading-relaxed text-white sm:text-lg">
              Запишитесь на диагностику клиники
            </p>
            <div className="mt-5">
              <WhatsAppButton label="Забронировать диагностику" />
            </div>
          </div>
        </div>
      </Section>

      {/* 11. УНИКАЛЬНОСТЬ */}
      <Section tone="muted">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          На рынке я не видел, чтобы так кто-то делал
        </h2>
        <p className="mt-4 text-center leading-relaxed text-xl sm:text-lg">
          Обычно это: <span className="italic">«Давайте больше рекламы настроим…»</span>
        </p>
        <p className="mt-3 text-center leading-relaxed text-xl sm:text-lg">
          А мы сначала закроем все дыры в воронке. Нет смысла лить больше воды в дырявое ведро.
        </p>
      </Section>

      {/* 12. ОГРАНИЧЕНИЕ */}
      <Section>
        <div className="flex items-center gap-4 rounded-2xl border-l-4 border-accent bg-accent-soft p-5 sm:p-6">
          <AlertTriangle className="h-6 w-6 shrink-0 text-accent-deep" />
          <div className="flex-1 text-center">
            <p className="text-base font-semibold leading-snug sm:text-lg">
              Важно: делаем максимум 2 диагностики в неделю.
            </p>
            <p className="mt-2 text-base leading-snug text-muted-foreground sm:text-lg">
              И только с одной клиникой в нише в городе.
            </p>
          </div>
        </div>
      </Section>

      {/* 13. ВЫБОР — ДВЕ ДОРОГИ */}
      <Section tone="muted">
        <h2 className="text-center text-4xl font-black uppercase tracking-tight sm:text-5xl">
          Две дороги:
        </h2>

        <div className="mt-4 flex justify-center text-5xl sm:text-6xl" aria-hidden="true">
          🛣️
        </div>

        <div className="mt-2 grid grid-cols-2 gap-3 sm:gap-4">
          <div className="rounded-3xl bg-road-bad p-5 text-road-bad-foreground shadow-lg sm:p-6">
            <div className="flex justify-center text-5xl sm:text-6xl" aria-hidden="true">
              🤷‍♂️
            </div>
            <h3 className="mt-3 text-center text-xl font-black uppercase leading-tight sm:text-2xl">
              Первая<br />дорога:
            </h3>
            <ul className="mt-5 space-y-4 text-base sm:text-lg">
              {[
                "Закрыть эту страницу",
                "Дальше работать без потока пациентов",
                "Через год жалеть о потерянном времени",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <X className="mt-1 h-4 w-4 shrink-0" strokeWidth={3} />
                  <span className="leading-snug">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-road-good p-5 text-road-good-foreground shadow-lg sm:p-6">
            <div className="flex justify-center text-5xl sm:text-6xl" aria-hidden="true">
              🐺
            </div>
            <h3 className="mt-3 text-center text-xl font-black uppercase leading-tight sm:text-2xl">
              Вторая дорога<br />(для&nbsp;волков):
            </h3>
            <ul className="mt-5 space-y-4 text-base sm:text-lg">
              {[
                "Пройти диагностику",
                "Узнать свои слабые места",
                "Зарабатывать как лучшая клиника",
              ].map((t, i) => (
                <li key={t} className="flex gap-2">
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/90 text-sm font-black text-road-good shadow-sm"
                  >
                    {i + 1}
                  </span>
                  <span className="leading-snug">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 14. CTA */}
      <Section>
        <h2 className="text-center text-4xl font-extrabold uppercase leading-none tracking-tight sm:text-5xl">
          Время действовать
        </h2>

        <div className="mt-7">
          <Banner>
            Если хотите понять, как&nbsp;вырасти — нажимайте на&nbsp;кнопку ниже
          </Banner>
        </div>

        <div className="mt-6">
          <WhatsAppButton
            variant="cta-orange"
            label="🔗 ЗАБРОНИРОВАТЬ ДИАГНОСТИКУ КЛИНИКИ"
            className="uppercase"
          />
        </div>
      </Section>

      {/* 15. ДОЖИМ */}
      <Section tone="muted">
        <div className="space-y-5">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-banner to-banner/85 p-6 text-banner-foreground shadow-xl sm:p-8">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />

            <div className="relative flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                <Clock className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <p className="text-xl font-extrabold uppercase leading-tight sm:text-2xl">
                  Завтра свободных мест может не быть
                </p>
                <p className="text-sm leading-relaxed text-banner-foreground/90 sm:text-base">
                  Я беру <span className="font-bold text-highlight">только 1 клинику</span> и&nbsp;только одну в&nbsp;нише в&nbsp;городе.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-dashed border-banner/30 bg-background p-5 text-center sm:p-6">
            <p className="text-base leading-relaxed sm:text-lg">
              Если вы всё ещё думаете — просто представьте, где будете через год, когда узнаете, что{" "}
              <span className="rounded bg-highlight/30 px-1.5 py-0.5 font-bold">
                клиники-конкуренты уже делают по&nbsp;20+&nbsp;миллионов в&nbsp;месяц
              </span>.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-foreground p-5 text-background sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-banner">
                <Flame className="h-5 w-5 text-banner-foreground" />
              </div>
              <p className="pt-1 text-base font-medium leading-relaxed sm:text-lg">
                Пока вы думаете — ваши{" "}
                <span className="font-extrabold text-highlight">коллеги-клиники внедряют системы продаж</span>{" "}
                и забирают ваших пациентов.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 16. ФИНАЛ */}
      <Section>
        <div>
          <WhatsAppButton
            variant="cta-orange"
            label="🔗 ЗАБРОНИРОВАТЬ ДИАГНОСТИКУ КЛИНИКИ"
            className="uppercase"
          />
          <p className="mt-4 text-center text-sm text-muted-foreground">
            До&nbsp;встречи на&nbsp;разборе!
          </p>
        </div>
      </Section>

      <footer className="border-t bg-background px-5 py-8 text-center text-xs text-muted-foreground">
        <p className="flex items-center justify-center gap-2">
          <Phone className="h-3.5 w-3.5" />
          WhatsApp: +7 747 284 25 95
        </p>
        <p className="mt-2">© {new Date().getFullYear()} «Бизнес на миллион»</p>
      </footer>
    </main>
  );
};

export default Index;
