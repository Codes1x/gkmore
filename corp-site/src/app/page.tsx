import { Header } from "@/components/header";
import { ModernStats } from "@/components/modern-stats";
import { ModernHero } from "@/components/modern-hero";
import { ModernBenefits } from "@/components/modern-benefits";
import { ModernAbout } from "@/components/modern-about";
import { ModernModel } from "@/components/modern-model";
import { ModernPortfolio } from "@/components/modern-portfolio";
import { ModernFAQ } from "@/components/modern-faq";
import { ModernReporting } from "@/components/modern-reporting";
import { ModernTech } from "@/components/modern-tech";
import { ModernStandards } from "@/components/modern-standards";
import { ModernTeam } from "@/components/modern-team";
import { ModernCases } from "@/components/modern-cases";
import { ModernPartners } from "@/components/modern-partners";

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
      <ModernReporting />

      {/* 10. Технологии и интеграции */}
      <ModernTech />

      {/* 11. Операционные стандарты */}
      <ModernStandards />

      {/* 12. Команда */}
      {/* <ModernTeam /> */}

      {/* 13. Кейсы (3–5 «было → стало») */}
      <ModernCases />

      {/* 14. Партнёрства и доверие */}
      <ModernPartners />

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