import { Header } from "@/components/header";
import { ModernStats } from "@/components/modern-stats";
import { ModernHero } from "@/components/modern-hero";
import { ModernBenefits } from "@/components/modern-benefits";
import { ModernAbout } from "@/components/modern-about";
import { ModernModel } from "@/components/modern-model";
import { ModernPortfolio } from "@/components/modern-portfolio";
import { ModernFAQ } from "@/components/modern-faq";

export default function Home() {
  return (
    <div className="min-h-dvh font-sans">
      {/* 1. Header */}
      <Header />
      
      {/* 2. Modern Hero */}
      <ModernHero />

      {/* 3. Ключевые факты (анимированные) */}
      <ModernStats />

      {/* 4. Преимущества / УТП */}
      <ModernBenefits />

      {/* 5. О группе (кто мы) */}
      <ModernAbout />

      {/* 6. Модель сотрудничества (ревшара 35%) */}
      <ModernModel />

      {/* 7. Портфель и масштаб */}
      <ModernPortfolio />

      {/* 8. Закрытие возражений (FAQ‑аккордеон) */}
      <ModernFAQ />

      {/* 9. Прозрачность, отчётность и выплаты */}
      <section id="reporting" className="px-4 sm:px-6 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Прозрачность, отчётность и выплаты
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-sm text-muted-foreground">Ежемесячная отчётность</div>
              <ul className="mt-3 grid gap-2 text-[15px]">
                <li className="flex items-start gap-2"><span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span> Выручка, загрузка, ADR, RevPAR</li>
                <li className="flex items-start gap-2"><span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span> Расходы по статьям, валовая прибыль</li>
                <li className="flex items-start gap-2"><span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span> Выплаты собственнику до 30‑го числа</li>
              </ul>
              <div className="mt-4 grid sm:grid-cols-2 gap-3 text-[14px]">
                <div className="rounded-lg border border-border/60 p-3">Шаблон отчёта (PDF/Excel)</div>
                <div className="rounded-lg border border-border/60 p-3">История отчётов за период</div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-sm text-muted-foreground">Личный кабинет собственника</div>
              <div className="mt-3 grid gap-3 text-[14px]">
                <div className="rounded-lg border border-border/60 p-3">Календарь бронирований</div>
                <div className="rounded-lg border border-border/60 p-3">Дашборд: выручка, расходы, выплаты</div>
                <div className="rounded-lg border border-border/60 p-3">Детализация броней и источников</div>
                <div className="rounded-lg border border-border/60 p-3">Документы и закрывающие</div>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <a href="/contacts" className="inline-flex items-center justify-center h-11 px-5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium">Демо кабинета</a>
                <a href="/contacts" className="inline-flex items-center justify-center h-11 px-5 rounded-lg border border-border text-sm font-medium">Вопрос по выплатам</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Технологии и интеграции */}
      <section id="tech" className="px-4 sm:px-6 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Технологии и интеграции
          </h2>
          <p className="mt-2 text-[15px] text-muted-foreground max-w-3xl">
            Используем современную технологическую связку для повышения доходности и прозрачности.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "PMS/движок: Travelline",
                desc: "Надёжный инструмент бронирований и управления каналами.",
              },
              {
                title: "Динамическое ценообразование",
                desc: "Пересмотр ставок с учётом спроса, сезона и конкурентов.",
              },
              {
                title: "OTA и метапоиск",
                desc: "Яндекс Путешествия, Озон Тревел, Островок и др.",
              },
              {
                title: "Смарт‑замки и бесконтактные платежи",
                desc: "Ускорение заселения, безопасность и удобство гостей.",
              },
              {
                title: "CRM и BI‑аналитика",
                desc: "Отслеживание LTV, источников, прогнозирование спроса.",
              },
            ].map((t) => (
              <div key={t.title} className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
                <div className="text-[16px] font-semibold text-foreground">{t.title}</div>
                <p className="mt-1 text-[14px] text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Операционные стандарты */}
      <section id="standards" className="px-4 sm:px-6 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Операционные стандарты
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-sm text-muted-foreground">Клининг и бельё</div>
              <ul className="mt-3 grid gap-2 text-[15px]">
                <li className="flex items-start gap-2"><span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span> SLA по уборке и сменам белья, контроль чек‑листами</li>
                <li className="flex items-start gap-2"><span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span> Инспекция качества и фотоотчёты</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-sm text-muted-foreground">Поддержка и безопасность</div>
              <ul className="mt-3 grid gap-2 text-[15px]">
                <li className="flex items-start gap-2"><span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span> Диспетчерская 24/7, приоритетные заявки</li>
                <li className="flex items-start gap-2"><span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span> Видеонаблюдение, инструктажи, допуски</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-sm text-muted-foreground">Инвентаризация и damage‑policy</div>
              <ul className="mt-3 grid gap-2 text-[15px]">
                <li className="flex items-start gap-2"><span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span> Учёт имущества, регламент компенсаций</li>
                <li className="flex items-start gap-2"><span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span> Страхование рисков</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-sm text-muted-foreground">Особые стандарты</div>
              <ul className="mt-3 grid gap-2 text-[15px]">
                <li className="flex items-start gap-2"><span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span> Pet‑friendly, детские наборы, трансфер</li>
                <li className="flex items-start gap-2"><span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span> Спортивное снаряжение, дополнительные сервисы</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Команда */}
      <section id="team" className="px-4 sm:px-6 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Команда
          </h2>
          <p className="mt-2 text-[15px] text-muted-foreground max-w-3xl">
            3–5 ключевых руководителей. Фото, должности и короткие цитаты о подходе к сервису и управлению.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Иван Петров", role: "Управляющий директор", quote: "Фокус на доходности и прозрачности для собственников." },
              { name: "Анна Смирнова", role: "Директор по операциям", quote: "Стандарты сервиса и контроль качества — ежедневно." },
              { name: "Сергей Иванов", role: "Коммерческий директор", quote: "Мультиканальные продажи и динамические цены." },
            ].map((m) => (
              <div key={m.name} className="rounded-2xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 size-16 rounded-full border border-border bg-muted grid place-items-center text-[18px] font-semibold text-foreground/80">
                    {m.name.split(" ").map((w) => w[0]).slice(0,2).join("")}
                  </div>
                  <div className="grid gap-1">
                    <div className="text-[16px] font-semibold text-foreground">{m.name}</div>
                    <div className="text-[14px] text-muted-foreground">{m.role}</div>
                  </div>
                </div>
                <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed">"{m.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Кейсы (3–5 «было → стало») */}
      <section id="cases" className="px-4 sm:px-6 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Кейсы — было → стало
          </h2>
          <p className="mt-2 text-[15px] text-muted-foreground max-w-3xl">
            Реальные примеры роста загрузки, ADR и рейтинга после внедрения ценообразования, дистрибуции и стандартов.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Студия у моря, 28 м²",
                before: { load: 54, adr: 8200, rating: 8.6 },
                after: { load: 82, adr: 10100, rating: 9.3 },
                quote: "Загрузка выросла уже в первый сезон, отчётность наглядная.",
              },
              {
                title: "1‑к апартамент, 42 м²",
                before: { load: 60, adr: 9000, rating: 8.9 },
                after: { load: 86, adr: 11800, rating: 9.5 },
                quote: "Сделки ускорились, корпоративные заезды закрыли межсезонье.",
              },
              {
                title: "Люкс с видом, 62 м²",
                before: { load: 48, adr: 14500, rating: 8.7 },
                after: { load: 78, adr: 18200, rating: 9.6 },
                quote: "Премиальный сегмент стал стабильнее за счёт каналов и цен."
              },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
                <div className="text-[16px] font-semibold text-foreground">{c.title}</div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-[14px]">
                  <div className="rounded-lg border border-border/60 p-3">
                    <div className="text-xs uppercase text-muted-foreground">Было</div>
                    <div>Загрузка <span className="font-semibold text-foreground">{c.before.load}%</span></div>
                    <div>ADR <span className="font-semibold text-foreground">{c.before.adr}</span></div>
                    <div>Рейтинг <span className="font-semibold text-foreground">{c.before.rating}</span></div>
                  </div>
                  <div className="rounded-lg border border-border/60 p-3 bg-[var(--secondary)]">
                    <div className="text-xs uppercase text-muted-foreground">Стало</div>
                    <div>Загрузка <span className="font-semibold text-foreground">{c.after.load}%</span></div>
                    <div>ADR <span className="font-semibold text-foreground">{c.after.adr}</span></div>
                    <div>Рейтинг <span className="font-semibold text-foreground">{c.after.rating}</span></div>
                  </div>
                </div>
                <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed">"{c.quote}"</p>
                <div className="mt-4 flex gap-3">
                  <a href="/contacts" className="inline-flex items-center justify-center h-10 px-4 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium">Запросить такой же результат</a>
                  <a href="/portfolio" className="inline-flex items-center justify-center h-10 px-4 rounded-lg border border-border text-sm font-medium">Смотреть объект</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Партнёрства и доверие */}
      <section id="partners" className="px-4 sm:px-6 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Партнёрства и доверие
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-[1fr_0.8fr]">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-sm text-muted-foreground">Партнёры</div>
              <div className="mt-3 grid sm:grid-cols-2 gap-3 text-[15px]">
                <div className="rounded-lg border border-border/60 p-3">Застройщики и УК ЖК</div>
                <div className="rounded-lg border border-border/60 p-3">Банки и страховые компании</div>
                <div className="rounded-lg border border-border/60 p-3">Сервисные партнёры</div>
                <div className="rounded-lg border border-border/60 p-3">Поставщики расходников</div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-4 opacity-70">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="size-12 rounded border border-border bg-muted grid place-items-center text-xs text-muted-foreground">
                    Logo
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-sm text-muted-foreground">Награды и признание</div>
              <ul className="mt-3 grid gap-2 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span>
                  «Яндекс Хорошее место — 3 года подряд»
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span>
                  Участие в ассоциациях гостиничного бизнеса
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span>
                  Разрешения на использование логотипов партнёров
                </li>
              </ul>
              <div className="mt-4 p-3 rounded-lg border border-border/60 bg-[var(--secondary)]">
                <div className="text-xs uppercase text-muted-foreground">Яндекс Хорошее место</div>
                <div className="text-sm font-semibold text-foreground">2022, 2023, 2024</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 15. Юридический блок */}
      <section id="legal" className="px-4 sm:px-6 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Юридический блок
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-sm text-muted-foreground">Типовой договор управления</div>
              <ul className="mt-3 grid gap-2 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span>
                  Предмет: управление и эксплуатация апартамента
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span>
                  Сроки: минимум 11 месяцев, автопролонгация
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span>
                  Ответственность сторон и страхование рисков
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-sm text-muted-foreground">Требования к апартаменту</div>
              <ul className="mt-3 grid gap-2 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span>
                  Комплектация: мебель, техника, текстиль
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span>
                  Пожарная безопасность и аварийные выходы
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span>
                  Соответствие санитарным нормам
                </li>
              </ul>
            </div>
            <div className="md:col-span-2 rounded-2xl border border-border bg-card p-5">
              <div className="text-sm text-muted-foreground">Процедура подключения собственника</div>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-5 gap-3 text-[14px]">
                <div className="rounded-lg border border-border/60 p-3 text-center">
                  <div className="font-semibold text-foreground">1. Заявка</div>
                  <div className="text-muted-foreground">Первичная консультация</div>
                </div>
                <div className="rounded-lg border border-border/60 p-3 text-center">
                  <div className="font-semibold text-foreground">2. Аудит</div>
                  <div className="text-muted-foreground">Осмотр объекта</div>
                </div>
                <div className="rounded-lg border border-border/60 p-3 text-center">
                  <div className="font-semibold text-foreground">3. Договор</div>
                  <div className="text-muted-foreground">Подписание</div>
                </div>
                <div className="rounded-lg border border-border/60 p-3 text-center">
                  <div className="font-semibold text-foreground">4. Подготовка</div>
                  <div className="text-muted-foreground">Настройка систем</div>
                </div>
                <div className="rounded-lg border border-border/60 p-3 text-center bg-[var(--secondary)]">
                  <div className="font-semibold text-foreground">5. Запуск</div>
                  <div className="text-muted-foreground">Первые гости</div>
                </div>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <a href="/contacts" className="inline-flex items-center justify-center h-11 px-5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium">Подать заявку</a>
                <a href="/contacts" className="inline-flex items-center justify-center h-11 px-5 rounded-lg border border-border text-sm font-medium">Юридическая консультация</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 16. ESG и локальная повестка */}
      <section id="esg" className="px-4 sm:px-6 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            ESG и локальная повестка
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
              <div className="text-sm text-muted-foreground">Экологические практики</div>
              <ul className="mt-3 grid gap-2 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span>
                  Сортировка отходов и переработка
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span>
                  Эко-расходники и биоразлагаемые материалы
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span>
                  Энергоэффективность и LED-освещение
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
              <div className="text-sm text-muted-foreground">Локальные поставщики и кадры</div>
              <ul className="mt-3 grid gap-2 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span>
                  Приоритет местным поставщикам продуктов
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span>
                  Трудоустройство жителей Сочи
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span>
                  Поддержка малого бизнеса региона
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
              <div className="text-sm text-muted-foreground">Социальные инициативы</div>
              <ul className="mt-3 grid gap-2 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span>
                  Благотворительные программы
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span>
                  Волонтёрские акции сотрудников
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-[var(--accent)]"></span>
                  Образовательные проекты для молодёжи
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 17. Контакты и лид‑форма */}
      <section id="contacts" className="px-4 sm:px-6 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Контакты и заявка
          </h2>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="text-sm text-muted-foreground">Получить предложение за 24 часа</div>
              <form className="mt-4 grid gap-4" action="#" method="post">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input 
                    name="name" 
                    placeholder="Имя" 
                    className="h-11 rounded-lg border border-border bg-background px-3 text-sm" 
                    required 
                  />
                  <input 
                    name="phone" 
                    placeholder="Телефон" 
                    type="tel" 
                    className="h-11 rounded-lg border border-border bg-background px-3 text-sm" 
                    required 
                  />
                </div>
                <input 
                  name="email" 
                  placeholder="Email" 
                  type="email" 
                  className="h-11 rounded-lg border border-border bg-background px-3 text-sm" 
                  required 
                />
                <textarea 
                  name="object" 
                  placeholder="Описание объекта (локация, метраж, тип)" 
                  rows={3} 
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm" 
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <input 
                    name="dates" 
                    placeholder="Предполагаемые сроки" 
                    className="h-11 rounded-lg border border-border bg-background px-3 text-sm" 
                  />
                  <select 
                    name="contact_method" 
                    className="h-11 rounded-lg border border-border bg-background px-3 text-sm"
                  >
                    <option value="">Удобный способ связи</option>
                    <option value="phone">Телефон</option>
                    <option value="email">Email</option>
                    <option value="whatsapp">WhatsApp</option>
                  </select>
                </div>
                <label className="flex items-start gap-2 text-sm text-muted-foreground">
                  <input type="checkbox" name="consent" className="mt-0.5" required />
                  Согласен на обработку персональных данных
                </label>
                <button className="h-11 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium">
                  Получить предложение за 24 часа
                </button>
              </form>
            </div>
            <div className="space-y-5">
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="text-sm text-muted-foreground">Sea Family Resort & Spa</div>
                <div className="mt-2 text-[15px]">
                  <div>Адрес: 1‑я линия у моря, Сочи</div>
                  <div>Телефон: +7 (XXX) XXX-XX-XX</div>
                  <div>Email: info@seafamily.ru</div>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="text-sm text-muted-foreground">Лучезарный Резорт</div>
                <div className="mt-2 text-[15px]">
                  <div>Адрес: 4 минуты пешком от моря, Сочи</div>
                  <div>Телефон: +7 (XXX) XXX-XX-XX</div>
                  <div>Email: info@luchezarny.ru</div>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="text-sm text-muted-foreground">Карта и маршруты</div>
                <div className="mt-2 aspect-[4/3] rounded-lg border border-border/60 bg-muted grid place-items-center text-sm text-muted-foreground">
                  Интерактивная карта
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Парковка, общественный транспорт, аэропорт
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 18. Footer */}
      <footer className="px-4 sm:px-6 py-10 text-sm text-muted-foreground border-t border-border/60">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-[1fr_1fr_0.8fr]">
            <div>
              <div className="text-base font-semibold text-foreground">ГК Море</div>
              <p className="mt-2 text-[15px] leading-relaxed">
                Профессиональный оператор апарт‑отелей в Сочи. Стабильная доходность и прозрачное управление.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <div className="text-foreground font-medium">Разделы</div>
                <div className="mt-2 grid gap-1">
                  <a href="/about" className="hover:text-foreground">О группе</a>
                  <a href="/model" className="hover:text-foreground">Модель</a>
                  <a href="/portfolio" className="hover:text-foreground">Портфель</a>
                  <a href="/contacts" className="hover:text-foreground">Контакты</a>
                </div>
              </div>
              <div>
                <div className="text-foreground font-medium">Отели</div>
                <div className="mt-2 grid gap-1">
                  <div>Sea Family Resort & Spa</div>
                  <div>Лучезарный Резорт</div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-foreground font-medium">Подписка</div>
              <p className="mt-2 text-xs">Новости и предложения</p>
              <div className="mt-2 flex gap-2">
                <input 
                  placeholder="Email" 
                  className="h-9 flex-1 rounded-lg border border-border bg-background px-3 text-xs" 
                />
                <button className="h-9 px-3 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-medium">
                  →
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span>© {new Date().getFullYear()} ГК Море</span>
              <a href="#" className="hover:text-foreground">Политика конфиденциальности</a>
              <a href="#" className="hover:text-foreground">Пользовательское соглашение</a>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="hover:text-foreground">VK</a>
              <a href="#" className="hover:text-foreground">Telegram</a>
              <a href="#" className="hover:text-foreground">WhatsApp</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile fixed CTA bar for immediate actions */}
      <div className="sm:hidden fixed bottom-4 left-0 right-0 z-40 px-4">
        <div className="mx-auto max-w-md grid grid-cols-2 gap-2">
          <a href="/contacts" className="inline-flex items-center justify-center h-11 rounded-lg border border-border bg-white text-foreground text-sm font-medium shadow">
            Партнёрство
          </a>
          <a href="/portfolio" className="inline-flex items-center justify-center h-11 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium shadow">
            Портфель
          </a>
        </div>
      </div>
    </div>
  );
}