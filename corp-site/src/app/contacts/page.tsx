import { Header } from "@/components/header";

export default function ContactsPage() {
  return (
    <div className="min-h-dvh font-sans">
      <Header />
      
      {/* Hero Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
            Контакты и заявка
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            Готовы стать партнёрами? Получите персональное предложение за 24 часа.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12">
            {/* Contact Form */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="text-2xl font-semibold text-foreground">Получить предложение за 24 часа</h2>
              <p className="mt-2 text-muted-foreground">
                Заполните форму, и наш менеджер свяжется с вами для детальной консультации
              </p>
              
              <form className="mt-6 space-y-6" action="#" method="post">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Имя *
                    </label>
                    <input 
                      name="name" 
                      placeholder="Ваше имя" 
                      className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Телефон *
                    </label>
                    <input 
                      name="phone" 
                      placeholder="+7 (999) 999-99-99" 
                      type="tel" 
                      className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <input 
                    name="email" 
                    placeholder="your@email.com" 
                    type="email" 
                    className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Описание объекта
                  </label>
                  <textarea 
                    name="object" 
                    placeholder="Локация, метраж, тип недвижимости, текущее состояние..." 
                    rows={4} 
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent" 
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Предполагаемые сроки
                    </label>
                    <input 
                      name="dates" 
                      placeholder="Когда планируете начать" 
                      className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Удобный способ связи
                    </label>
                    <select 
                      name="contact_method" 
                      className="w-full h-11 rounded-lg border border-border bg-background px-4 text-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    >
                      <option value="">Выберите способ</option>
                      <option value="phone">Телефонный звонок</option>
                      <option value="email">Email</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="telegram">Telegram</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    name="consent" 
                    className="mt-1 size-4 rounded border border-border" 
                    required 
                  />
                  <label className="text-sm text-muted-foreground">
                    Согласен на обработку персональных данных и получение коммерческих предложений
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full h-12 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  Получить предложение за 24 часа
                </button>
              </form>

              <div className="mt-6 p-4 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <div className="text-sm">
                    <div className="font-semibold text-green-800">Гарантируем ответ в течение 24 часов</div>
                    <div className="text-green-700 mt-1">Персональный расчёт доходности и план сотрудничества</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Hotels Info */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">Sea Family Resort & Spa</h3>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">📍</span>
                    <span>1-я линия у моря, Сочи</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">📞</span>
                    <span>+7 (862) 123-45-67</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">✉️</span>
                    <span>info@seafamily.ru</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">Лучезарный Резорт</h3>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">📍</span>
                    <span>4 минуты пешком от моря, Сочи</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">📞</span>
                    <span>+7 (862) 765-43-21</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">✉️</span>
                    <span>info@luchezarny.ru</span>
                  </div>
                </div>
              </div>

              {/* Office Info */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">Головной офис</h3>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">🏢</span>
                    <span>г. Сочи, ул. Курортный проспект, 123</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">📞</span>
                    <span>+7 (862) 555-00-00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">✉️</span>
                    <span>partnership@gkmore.ru</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">🕒</span>
                    <span>Пн-Пт: 9:00-18:00</span>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">Расположение</h3>
                <div className="mt-3 aspect-[4/3] rounded-lg border border-border/60 bg-muted grid place-items-center text-muted-foreground">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🗺️</div>
                    <div className="text-sm">Интерактивная карта</div>
                    <div className="text-xs mt-1">Маршруты к отелям</div>
                  </div>
                </div>
                <div className="mt-3 text-xs text-muted-foreground space-y-1">
                  <div>🚗 Парковка: бесплатная для гостей</div>
                  <div>🚌 Общественный транспорт: автобус №1, 2, 15</div>
                  <div>✈️ Аэропорт Сочи: 45 минут на автомобиле</div>
                  <div>🚂 ЖД вокзал: 15 минут на автомобиле</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">Мы в социальных сетях</h3>
                <div className="mt-3 flex gap-4">
                  <a href="#" className="flex items-center justify-center size-10 rounded-lg border border-border hover:bg-muted transition-colors">
                    <span className="text-sm">VK</span>
                  </a>
                  <a href="#" className="flex items-center justify-center size-10 rounded-lg border border-border hover:bg-muted transition-colors">
                    <span className="text-sm">TG</span>
                  </a>
                  <a href="#" className="flex items-center justify-center size-10 rounded-lg border border-border hover:bg-muted transition-colors">
                    <span className="text-sm">WA</span>
                  </a>
                  <a href="#" className="flex items-center justify-center size-10 rounded-lg border border-border hover:bg-muted transition-colors">
                    <span className="text-sm">YT</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-semibold text-foreground text-center">
            Часто задаваемые вопросы
          </h2>
          
          <div className="mt-8 space-y-4">
            {[
              {
                q: "Как быстро можно начать сотрудничество?",
                a: "После подачи заявки мы проводим аудит объекта в течение 3-5 дней, затем подписываем договор. Подготовка к запуску занимает 7-10 дней."
              },
              {
                q: "Какие документы нужны для начала?",
                a: "Свидетельство о праве собственности, технический паспорт, справка о коммунальных платежах. Полный список предоставим при консультации."
              },
              {
                q: "Можно ли расторгнуть договор досрочно?",
                a: "Да, договор можно расторгнуть с уведомлением за 3 месяца. Минимальный срок сотрудничества — 11 месяцев."
              },
              {
                q: "Как происходят выплаты?",
                a: "Выплаты производятся ежемесячно до 30 числа следующего месяца на указанный вами счёт с детальной отчётностью."
              }
            ].map((item, index) => (
              <details key={index} className="group rounded-xl border border-border bg-card p-6 open:shadow-md transition-shadow">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                  <span className="font-medium text-foreground">{item.q}</span>
                  <span className="mt-0.5 size-6 grid place-items-center rounded-full border border-border text-muted-foreground group-open:rotate-45 transition-transform shrink-0">+</span>
                </summary>
                <p className="mt-4 text-muted-foreground leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Начните зарабатывать уже сегодня
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Присоединяйтесь к 50+ довольным собственникам, которые получают стабильный доход от своей недвижимости.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#" className="inline-flex items-center justify-center h-12 px-6 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-medium">
              Заполнить заявку
            </a>
            <a href="tel:+78625550000" className="inline-flex items-center justify-center h-12 px-6 rounded-lg border border-border font-medium">
              Позвонить сейчас
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
