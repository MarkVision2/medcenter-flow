import { Check, ArrowRight, AlertTriangle, Phone, MapPin, Square, X, TrendingUp, Wallet, Sparkles, Gift, MessageCircle, Map, BarChart3, PhoneCall, BadgeCheck, Megaphone, Inbox, Target, UserPlus, Receipt, Clock, Flame, Zap } from "lucide-react";
import Section from "@/components/landing/Section";
import Banner from "@/components/landing/Banner";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import yuriPhoto from "@/assets/yuri.png";
import heroLaptop from "@/assets/hero-laptop.png";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      {/* 1. HERO */}
      <Section className="pt-3 pb-4 sm:pt-10 sm:pb-12">
        {/* Красный баннер */}
        <div className="rounded-md bg-destructive px-5 py-5 sm:px-6 sm:py-6 text-center">
          <p className="text-primary-foreground font-sans font-semibold sm:text-xl md:text-2xl">
            Проверенная методика
          </p>
          <p className="mt-1 text-primary-foreground font-sans font-semibold sm:text-xl md:text-2xl">
            для бизнеса в Казахстане
          </p>
        </div>

        {/* Главный заголовок */}
        <h1 className="mt-4 text-center font-extrabold uppercase leading-[1.1] tracking-tight sm:mt-10 sm:text-4xl md:text-5xl whitespace-pre-line text-xl">
          ИЩУ 2-Х ВЛАДЕЛЬЦЕВ БИЗНЕСА В КАЗАХСТАНЕ, КОТОРЫЕ ХОТЯТ СТАБИЛЬНЫЙ ПОТОК КЛИЕНТОВ{"\n"}И СИСТЕМНЫЙ РОСТ ВЫРУЧКИ БЕЗ ХАОСА В ОТДЕЛЕ ПРОДАЖ
        </h1>

        {/* Синий баннер */}
        <div className="mt-3 sm:mt-10">
          <Banner className="px-3 py-4 sm:px-6 sm:py-6 text-base">
            КОТОРЫЕ УСТАЛИ СЛИВАТЬ БЮДЖЕТ НА&nbsp;РЕКЛАМУ И&nbsp;ХОТЯТ ВЫЙТИ НА&nbsp;ДОХОД ОТ&nbsp;500&nbsp;000&nbsp;₸ В&nbsp;ДЕНЬ, ИМЕЯ БОЛЬШЕ СВОБОДНОГО ВРЕМЕНИ И&nbsp;МЕНЬШЕ СТРЕССА
          </Banner>
        </div>

        {/* Картинка с ноутбуком — прозрачный фон, естественно вписана */}
        <div className="mt-1 sm:mt-4">
          <img
            src={heroLaptop}
            alt="Система «Бизнес на миллион» — превращение заявок в платёжеспособных клиентов"
            width={1024}
            height={1024}
            className="mx-auto block w-full max-w-[360px] sm:max-w-md"
          />
        </div>

        {/* Кнопка */}
        <div className="mt-1 sm:mt-4">
          <WhatsAppButton label="Записаться на диагностику" />
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Напишите нам в WhatsApp — это займёт 30 секунд
          </p>
        </div>
      </Section>

      {/* 2. БОЛЬ */}
      <Section tone="muted">
        <div className="rounded-2xl border-2 border-destructive/70 bg-background p-5 sm:p-7">
          <h2 className="text-center text-2xl font-extrabold leading-tight sm:text-3xl">
            Ответьте на вопросы ответ на которые «ДА»:
          </h2>

          <ul className="mx-auto mt-6 max-w-md space-y-5">
            {[
              "Устали нанимать таргетологов и SMMщиков, которые обещают клиентов и продажи, но в кассе ничего не меняется",
              "Видите, как конкуренты растут и масштабируются, а ваша выручка топчется на месте — и не понимаете, что вы делаете не так",
              "Цепляетесь за каждого клиента, даёте скидки и работаете с минимальной маржой, лишь бы не потерять заказ",
              "Не понимаете, как стабильно привлекать клиентов и перестать зависеть от сарафанного радио и сезонности",
              "Больше всего бесит, что клиенты уходят к конкурентам,\nа вы не понимаете почему",
              "Хотите систему, при которой клиенты приходят сами, а сотрудники только закрывают сделки и обслуживают",
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
          Если ответили «ДА» хотя&nbsp;бы на&nbsp;1&nbsp;вопрос — записывайтесь на&nbsp;диагностику
        </Banner>
        <p className="mt-5 text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
          Я расскажу, как забыть о&nbsp;работе за&nbsp;копейки и&nbsp;начать зарабатывать как топовые компании
          Казахстана, имея больше свободного времени и&nbsp;энергии.
        </p>
        <div className="mt-6">
          <WhatsAppButton label="Записаться на диагностику" />
        </div>
      </Section>

      {/* 4. ОБО МНЕ */}
      <Section tone="muted">
        <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-deep">
          <BadgeCheck className="h-3.5 w-3.5" />
          Знакомство
        </div>

        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-10">
          {/* Фото + подпись */}
          <div className="relative mx-auto w-full max-w-sm md:mx-0">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/20 via-transparent to-accent-deep/20 blur-xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-2xl border bg-card shadow-xl">
              <img
                src={yuriPhoto}
                alt="Юрий — автор системы «Бизнес на миллион»"
                className="block w-full object-cover"
              />
              <div className="border-t bg-card px-4 py-3">
                <p className="text-sm font-bold leading-tight">Юрий</p>
                <p className="text-xs text-muted-foreground">
                  Работаю по системе «Бизнес на миллион»
                </p>
              </div>
            </div>
          </div>

          {/* Текст */}
          <div>
            <h2 className="text-center text-2xl font-bold leading-tight sm:text-3xl md:text-left">
              Привет, меня зовут{" "}
              <span className="text-accent-deep">Юрий</span>
            </h2>

            <p className="mt-4 text-base leading-relaxed sm:text-lg">
              Я прошёл путь от маркетолога, который запускает рекламу для бизнеса разных ниш в
              Казахстане — от автосалонов и мебельных салонов до клиник и косметологий — до
              эксперта, который создал систему, по которой компании получают не просто заявки,
              а именно{" "}
              <span className="font-semibold">«платёжеспособных» клиентов</span>.
            </p>

            <p className="mt-4 text-base leading-relaxed sm:text-lg">
              Я помогаю владельцам бизнеса вырваться из замкнутого круга и выйти на доход{" "}
              <span className="font-semibold text-accent-deep">от 500 000 тенге в день</span>{" "}
              через систему «Бизнес на миллион» — ту самую систему, которая изменила результаты уже{" "}
              <span className="font-semibold">25+ компаниям</span> в разных нишах.
            </p>

          </div>
        </div>
      </Section>

      {/* 5. КЕЙС */}
      <Section>
        <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-deep">
          <Sparkles className="h-3.5 w-3.5" />
          Реальный кейс
        </div>
        <h2 className="text-center font-bold leading-tight sm:text-3xl text-xl">
          цифры{" "}
          <span className="text-accent-deep">из реального бизнеса</span>
        </h2>
        <p className="mt-3 text-center text-base text-muted-foreground sm:text-lg">
          Разные города, разные ниши, одна система.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border bg-card shadow-md">
          {/* Шапка карточки */}
          <div className="border-b bg-accent-soft/40 px-6 py-4 sm:px-8">
            <div className="flex items-center justify-center gap-2 text-center font-semibold text-accent-deep">
              <MapPin className="h-5 w-5 shrink-0" />
              <span className="text-lg sm:text-xl">Компания из Алматы</span>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Проблема */}
            <div className="rounded-xl border-l-4 border-destructive bg-destructive/5 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-destructive">
                Было
              </p>
              <p className="mt-2 text-base leading-relaxed sm:text-lg">
                Один менеджер не справлялся со звонками. Записывал всех подряд — доходило до сделки только <span className="font-bold text-destructive">30%</span> от заявок.
              </p>
            </div>

            {/* Что сделали */}
            <h3 className="mt-7 text-center text-lg font-bold sm:text-xl">
              Что мы сделали?
            </h3>
            <ul className="mx-auto mt-4 max-w-md space-y-3">
              {[
                "Вывели 2 сотрудников в отдельный отдел продаж",
                "Обучили скриптам продаж и работе с возражениями",
                "Поставили задачу: довести клиента до оплаты, а не просто записать",
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

            {/* Результат */}
            <div className="mt-7 rounded-2xl bg-banner p-6 text-center text-white shadow-lg">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-highlight">
                <TrendingUp className="h-3.5 w-3.5" />
                Результат за 2 недели
              </div>

              {/* Воронка цифр */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { icon: Megaphone, value: "830 000 ₸", label: "Расходы на рекламу" },
                  { icon: Inbox, value: "415", label: "Заявок с рекламы" },
                  { icon: Target, value: "83", label: "Целевых заявок" },
                  { icon: UserPlus, value: "29", label: "Новых клиентов" },
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

              {/* Средний чек */}
              <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-white/10 p-3">
                <Receipt className="h-5 w-5 text-highlight" />
                <p className="text-sm text-white/80">
                  Средний чек:{" "}
                  <span className="font-extrabold text-white">350 000 ₸</span>
                </p>
              </div>

              {/* Выручка */}
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

            {/* Вывод */}
            <p className="mt-6 text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
              Тот же бюджет на рекламу — в{" "}
              <span className="font-bold text-foreground">3 раза больше</span>{" "}
              реально пришедших и оплативших клиентов.
            </p>
            <p className="mt-3 text-center text-base font-semibold leading-snug sm:text-lg">
              В чём разница?{" "}
              <span className="text-accent-deep">Правильные люди на правильных позициях.</span>
            </p>
          </div>
        </div>

        {/* Ещё кейсы из разных ниш — компактная сетка */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              city: "Алматы",
              niche: "Медицинская клиника",
              result: "+8 400 000 ₸",
              period: "за 2 месяца",
              before: "22% доходимости с заявок",
              after: "61% доходимости, график врачей забит на 3 недели вперёд",
            },
            {
              city: "Астана",
              niche: "Центр реабилитации",
              result: "+13 000 000 ₸",
              period: "за 3 месяца",
              before: "пациенты приходили только по сарафану",
              after: "стабильный поток первичных + полные курсы реабилитации",
            },
            {
              city: "Шымкент",
              niche: "Косметология",
              result: "x2.4 к выручке",
              period: "за 3 месяца",
              before: "повторных клиентов почти не было",
              after: "64% записываются на повторную процедуру ещё в кабинете",
            },
            {
              city: "Караганда",
              niche: "Мебельный салон",
              result: "+18 200 000 ₸",
              period: "за 4 месяца",
              before: "собственник лично закрывал клиентов по вечерам",
              after: "отдел продаж работает без участия владельца, +47 сделок/мес",
            },
            {
              city: "Алматы",
              niche: "Автосервис",
              result: "x3 к записи",
              period: "за 2 месяца",
              before: "мастера простаивали по 3-4 часа в день",
              after: "запись забита на неделю вперёд, средний чек +40%",
            },
            {
              city: "Астана",
              niche: "Автодом Toyota / Lexus",
              result: "+27 авто/мес",
              period: "за 3 месяца",
              before: "менеджеры теряли заявки на этапе тест-драйва",
              after: "выстроена воронка от заявки до выдачи ключей, конверсия x2",
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

      {/* 7. СКЕПСИС */}
      <Section tone="muted">
        <div className="rounded-2xl border-2 border-destructive/70 bg-background p-6 sm:p-8">
          <h2 className="text-center text-2xl font-extrabold sm:text-3xl">Никакого подвоха нет.</h2>
          <p className="mt-4 text-center text-base leading-relaxed sm:text-lg">
            Мы проводим консультации, чтобы показать <span className="font-bold">вам свой</span> метод
            ежедневного привлечения платёжеспособных клиентов.
          </p>
          <p className="mt-4 text-center text-base leading-relaxed sm:text-lg">
            Если после консультации вы захотите, <span className="font-bold">чтобы мы помогли</span> вам увеличить выручку
            с помощью моего метода то сможем обсудить условия сотрудничества. Консультация вас ни к чему не обязывает.
          </p>
          <p className="mt-5 text-center text-lg font-bold sm:text-xl">Да-да, нет-нет.</p>
          <p className="mt-2 text-center text-lg font-bold sm:text-xl">ВСЁ по ЧЕСТНОМУ 🤝</p>
        </div>
      </Section>

      {/* 8. СУТЬ */}
      <Section tone="muted">
        <div className="relative overflow-hidden rounded-3xl bg-banner p-7 text-white shadow-xl sm:p-10">
          {/* Декор */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-highlight/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative">
            <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-highlight">
              <Sparkles className="h-3.5 w-3.5" />
              Главное
            </div>

            <h2 className="text-center font-extrabold uppercase leading-[1.15] tracking-tight text-lg sm:text-2xl md:text-3xl">
              ЕСЛИ ТЫ ХОЧЕШЬ ЗАБЫТЬ О&nbsp;РАБОТЕ ЗА&nbsp;КОПЕЙКИ
              <br className="hidden sm:block" />
              <span className="text-highlight"> И&nbsp;НАЧАТЬ ЗАРАБАТЫВАТЬ КАК ТОПОВАЯ КОМПАНИЯ В&nbsp;СВОЕЙ НИШЕ</span>,
              <br className="hidden sm:block" />
              ИМЕЯ БОЛЬШЕ СВОБОДНОГО ВРЕМЕНИ И&nbsp;ЭНЕРГИИ
            </h2>

            <div className="mx-auto mt-7 max-w-md rounded-2xl border border-white/15 bg-white/10 p-5 text-center backdrop-blur-sm">
              <p className="text-base leading-relaxed sm:text-lg">
                Это требует{" "}
                <span className="rounded-md bg-highlight/25 px-1.5 py-0.5 font-bold text-highlight">
                  системного подхода
                </span>
                .
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
                Без системы вы будете и&nbsp;дальше терять клиентов и&nbsp;деньги.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 9. ЧТО ПОЛУЧИТЕ */}
      <Section>
        <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-deep">
          <Gift className="h-3.5 w-3.5" />
          4 шага диагностики
        </div>
        <h2 className="text-center font-bold leading-tight sm:text-3xl text-xl">
          Что вы получите вместе{"\n"}
          <span className="text-accent-deep">с диагностикой</span>
        </h2>
        <p className="mt-3 text-center text-base text-muted-foreground sm:text-lg whitespace-pre-line">
          Найдём все дыры, через которые утекают{"\n"}ваши клиенты и деньги.
        </p>

        <ul className="mt-7 space-y-4">
          {[
            {
              icon: MessageCircle,
              title: "Часовая консультация\n1 на 1 со мной",
              desc: "Покажу, как привлекать платёжеспособных клиентов с чеком от 100 000 тенге без бесконечного поиска и сарафанного радио",
              value: "150 000 ₸",
            },
            {
              icon: Map,
              title: "Карта с пошаговым планом",
              desc: "Как выйти на стабильный доход\n300 000 – 600 000 ₸ в день, даже если сейчас зарабатываете в 5 раз меньше",
              value: "80 000 ₸",
            },
            {
              icon: BarChart3,
              title: "Анализ рекламы и каналов привлечения",
              desc: "Разберём текущие источники клиентов и точки утечки бюджета",
              value: "60 000 ₸",
            },
            {
              icon: PhoneCall,
              title: "Тайный звонок",
              desc: "Прозвоним как клиент, запишем разговор, покажем, где менеджер сливает заявки",
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
              Запишитесь на диагностику бизнеса
            </p>
            <p className="mt-2 text-sm text-white/80">{"\n"}</p>
            <div className="mt-5">
              <WhatsAppButton label="Записаться на диагностику" />
            </div>
          </div>
        </div>
      </Section>

      {/* 10. УНИКАЛЬНОСТЬ */}
      <Section tone="muted">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          На рынке я не видел, чтобы так кто-то делал
        </h2>
        <p className="mt-4 text-center leading-relaxed sm:text-lg text-xl">
          Обычно это: <span className="italic">«Давайте больше рекламы настроим…»</span>
        </p>
        <p className="mt-3 text-center leading-relaxed sm:text-lg text-xl">
          А мы сначала закроем все дыры в воронке. Нет смысла лить больше воды в дырявое ведро.
        </p>
      </Section>

      {/* 11. ОГРАНИЧЕНИЕ */}
      <Section>
        <div className="flex items-center gap-4 rounded-2xl border-l-4 border-accent bg-accent-soft p-5 sm:p-6">
          <AlertTriangle className="h-6 w-6 shrink-0 text-accent-deep" />
          <div className="flex-1 text-center">
            <p className="text-base font-semibold leading-snug sm:text-lg">
              Важно: делаем максимум 2 диагностики в неделю.
            </p>
            <p className="mt-2 text-base leading-snug text-muted-foreground sm:text-lg">
              И только с одной компанией в нише в городе.
            </p>
          </div>
        </div>
      </Section>

      {/* 12. ВЫБОР — ДВЕ ДОРОГИ */}
      <Section tone="muted">
        <h2 className="text-center text-4xl font-black uppercase tracking-tight sm:text-5xl">
          Две дороги:
        </h2>

        {/* Развилка-эмодзи между заголовком и карточками */}
        <div className="mt-4 flex justify-center text-5xl sm:text-6xl" aria-hidden="true">
          🛣️
        </div>

        <div className="mt-2 grid grid-cols-2 gap-3 sm:gap-4">
          {/* Красная — первая дорога */}
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
                "Дальше сидеть без денег",
                "Через год жалеть о потерянном времени",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <X className="mt-1 h-4 w-4 shrink-0" strokeWidth={3} />
                  <span className="leading-snug">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Зелёная — для волков */}
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
                "Начать зарабатывать как босс",
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

      {/* 13. CTA — ВРЕМЯ ДЕЙСТВОВАТЬ */}
      <Section>
        <h2 className="text-center text-4xl font-extrabold uppercase leading-none tracking-tight sm:text-5xl">
          Время действовать
        </h2>

        <div className="mt-7">
          <Banner>
            Если хотите понять как&nbsp;вырасти — нажимайте на&nbsp;кнопку ниже
          </Banner>
        </div>

        <div className="mt-6">
          <WhatsAppButton
            variant="cta-orange"
            label="🔗 ХОЧУ ПОЛУЧИТЬ ДОСТУП К СИСТЕМЕ «БИЗНЕС НА МИЛЛИОН»"
            className="uppercase"
          />
        </div>
      </Section>

      {/* 14. ДОЖИМ */}
      <Section tone="muted">
        <div className="space-y-4 text-center text-base leading-relaxed sm:text-lg">
          <p>
            <span className="font-bold">Завтра свободных мест может не быть.</span>
            <br />
            Я беру 1 компанию и только одну в нише в городе.
          </p>
          <p>
            Если вы всё ещё думаете — просто представьте,
            где будете через год, когда узнаете,{" "}
            <span className="font-bold">что мои клиенты уже делают по 20+ миллионов</span>.
          </p>
          <div className="flex items-center gap-3 rounded-xl border-l-4 border-banner bg-background p-4 text-left">
            <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-banner" />
            <p className="font-medium">
              Помните: пока вы думаете, ваши конкуренты внедряют системы продаж и забирают
              ваших клиентов.
            </p>
          </div>
        </div>
      </Section>

      {/* 15. ФИНАЛ */}
      <Section>
        <div>
          <WhatsAppButton
            variant="cta-orange"
            label="🔗 ХОЧУ ПОЛУЧИТЬ ДОСТУП К СИСТЕМЕ «БИЗНЕС НА МИЛЛИОН»"
            className="uppercase"
          />
        </div>
      </Section>

      <footer className="border-t bg-background px-5 py-8 text-center text-xs text-muted-foreground">
        <p className="flex items-center justify-center gap-2">
          <Phone className="h-3.5 w-3.5" />
          WhatsApp: +7 747 284 25 95
        </p>
        <p className="mt-2">© {new Date().getFullYear()} Система «Бизнес на миллион»</p>
      </footer>
    </main>
  );
};

export default Index;
