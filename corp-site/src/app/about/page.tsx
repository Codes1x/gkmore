import { Header } from "@/components/header";

export default function AboutPage() {
  return (
    <div className="min-h-dvh font-sans">
      <Header />
      
      {/* Hero Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
            О группе компаний «Море»
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            Надёжный партнёр для собственников недвижимости у моря. Создаём единую сеть качественного гостевого сервиса.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                Наша миссия
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Стать партнёром №1 для собственников недвижимости у моря, обеспечивая стабильную доходность, прозрачность управления и высокий стандарт сервиса для гостей.
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 size-2 rounded-full bg-[var(--accent)] shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Прозрачность</h3>
                    <p className="text-muted-foreground">Ежемесячная отчётность, понятные показатели, личный кабинет собственника</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 size-2 rounded-full bg-[var(--accent)] shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Технологии</h3>
                    <p className="text-muted-foreground">Удалённый мониторинг, динамическое ценообразование, автоматизация</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 size-2 rounded-full bg-[var(--accent)] shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Поддержка 24/7</h3>
                    <p className="text-muted-foreground">Оперативная реакция на запросы гостей и собственников</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-xl font-semibold text-foreground">Ключевые цифры</h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg border border-border/60">
                  <div className="text-2xl font-bold text-foreground">160</div>
                  <div className="text-sm text-muted-foreground">номеров в управлении</div>
                </div>
                <div className="text-center p-4 rounded-lg border border-border/60">
                  <div className="text-2xl font-bold text-foreground">50+</div>
                  <div className="text-sm text-muted-foreground">сотрудников</div>
                </div>
                <div className="text-center p-4 rounded-lg border border-border/60">
                  <div className="text-2xl font-bold text-foreground">3+ года</div>
                  <div className="text-sm text-muted-foreground">средний срок партнёрства</div>
                </div>
                <div className="text-center p-4 rounded-lg border border-border/60">
                  <div className="text-2xl font-bold text-foreground">0%</div>
                  <div className="text-sm text-muted-foreground">отток собственников</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Structure */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Состав группы
          </h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="size-16 rounded-lg border border-border bg-muted grid place-items-center">
                  <span className="text-2xl">🏨</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Sea Family Resort & Spa</h3>
                  <p className="text-muted-foreground">1-я линия у моря</p>
                  <div className="mt-3 text-sm">
                    <div>122 номера</div>
                    <div>ADR: 10,114 ₽ | RevPAR: 8,053 ₽</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="size-16 rounded-lg border border-border bg-muted grid place-items-center">
                  <span className="text-2xl">🏢</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Лучезарный Резорт</h3>
                  <p className="text-muted-foreground">4 минуты пешком от моря</p>
                  <div className="mt-3 text-sm">
                    <div>38 номеров</div>
                    <div>ADR: 18,861 ₽ | RevPAR: 16,352 ₽</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Licenses & Compliance */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Лицензии и соответствие
          </h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold text-foreground">Операционная деятельность</h3>
              <p className="mt-2 text-sm text-muted-foreground">Все необходимые лицензии для управления гостиничной недвижимостью</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold text-foreground">Пожарная безопасность</h3>
              <p className="mt-2 text-sm text-muted-foreground">Соответствие требованиям МЧС и пожарного надзора</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold text-foreground">Санитарные нормы</h3>
              <p className="mt-2 text-sm text-muted-foreground">Соблюдение стандартов Роспотребнадзора</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 bg-[var(--secondary)]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Готовы стать партнёрами?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Узнайте больше о нашей модели сотрудничества и начните получать стабильный доход уже сегодня.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/model" className="inline-flex items-center justify-center h-12 px-6 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-medium">
              Модель сотрудничества
            </a>
            <a href="/contacts" className="inline-flex items-center justify-center h-12 px-6 rounded-lg border border-border font-medium">
              Связаться с нами
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
