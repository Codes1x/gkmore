import { Header } from "@/components/header";

export default function ModelPage() {
  return (
    <div className="min-h-dvh font-sans">
      <Header />
      
      {/* Hero Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
            Модель сотрудничества
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            Ревшара 30% — прозрачная и выгодная схема распределения доходов для собственников недвижимости.
          </p>
        </div>
      </section>

      {/* Revenue Share Formula */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="text-2xl font-semibold text-foreground">Формула распределения</h2>
              <div className="mt-6 p-6 rounded-lg bg-[var(--secondary)] text-center">
                <div className="text-xl font-semibold text-foreground">
                  Выручка − Расходы = Прибыль
                </div>
                <div className="mt-2 text-lg text-muted-foreground">↓</div>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-border bg-background">
                    <div className="text-2xl font-bold text-foreground">70%</div>
                    <div className="text-sm text-muted-foreground">Собственнику</div>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-background">
                    <div className="text-2xl font-bold text-foreground">30%</div>
                    <div className="text-sm text-muted-foreground">Оператору</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Ключевые условия:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-1.5 size-2 rounded-full bg-[var(--accent)] shrink-0" />
                    <div>
                      <span className="font-medium text-foreground">Расходы вычитаются до распределения:</span>
                      <span className="text-muted-foreground"> коммунальные платежи, мелкий ремонт, расходники</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1.5 size-2 rounded-full bg-[var(--accent)] shrink-0" />
                    <div>
                      <span className="font-medium text-foreground">Срок договора:</span>
                      <span className="text-muted-foreground"> минимум 11 месяцев, расторжение за 3 месяца</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1.5 size-2 rounded-full bg-[var(--accent)] shrink-0" />
                    <div>
                      <span className="font-medium text-foreground">KPI/SLA:</span>
                      <span className="text-muted-foreground"> выплаты до 30-го числа, реагирование 24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">Что включено в комиссию 30%</h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="size-2 rounded-full bg-[var(--accent)]" />
                    <span className="text-sm">Маркетинг и продажи</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="size-2 rounded-full bg-[var(--accent)]" />
                    <span className="text-sm">Ресепшн и клининг</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="size-2 rounded-full bg-[var(--accent)]" />
                    <span className="text-sm">Техобслуживание</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="size-2 rounded-full bg-[var(--accent)]" />
                    <span className="text-sm">Ценообразование</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="size-2 rounded-full bg-[var(--accent)]" />
                    <span className="text-sm">Аналитика и отчёты</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">Гарантии</h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="size-2 rounded-full bg-green-500" />
                    <span className="text-sm">Выплаты до 30 числа</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="size-2 rounded-full bg-green-500" />
                    <span className="text-sm">Реакция на заявки 24/7</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="size-2 rounded-full bg-green-500" />
                    <span className="text-sm">Прозрачная отчётность</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Economic Model Example */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground text-center">
            Пример расчёта на 1 апартамент
          </h2>
          
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground text-center">До сотрудничества</h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Загрузка в сезон:</span>
                  <span className="font-medium">60%</span>
                </div>
                <div className="flex justify-between">
                  <span>Средний ADR:</span>
                  <span className="font-medium">8,500 ₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Выручка в месяц:</span>
                  <span className="font-medium">153,000 ₽</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Расходы (реклама, уборка):</span>
                  <span className="font-medium">-45,000 ₽</span>
                </div>
                <hr className="border-border" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Чистая прибыль:</span>
                  <span>108,000 ₽</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground text-center">После сотрудничества</h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Загрузка в сезон:</span>
                  <span className="font-medium text-green-600">82%</span>
                </div>
                <div className="flex justify-between">
                  <span>Средний ADR:</span>
                  <span className="font-medium text-green-600">10,200 ₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Выручка в месяц:</span>
                  <span className="font-medium text-green-600">251,000 ₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Расходы (коммуналка, ремонт):</span>
                  <span className="font-medium">-25,000 ₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Ваша доля (70%):</span>
                  <span className="font-medium text-green-600">146,900 ₽</span>
                </div>
                <hr className="border-border" />
                <div className="flex justify-between text-lg font-semibold text-green-600">
                  <span>Чистая прибыль:</span>
                  <span>146,900 ₽</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center p-6 rounded-2xl bg-green-50 border border-green-200">
            <div className="text-lg font-semibold text-green-800">
              Рост прибыли: +38,900 ₽ в месяц (+36%)
            </div>
            <div className="text-sm text-green-700 mt-1">
              При этом вы освобождаетесь от операционных забот
            </div>
          </div>
        </div>
      </section>

      {/* Contract Terms */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Условия договора
          </h2>
          
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground">Права собственника</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                  Ежемесячная детальная отчётность
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                  Доступ к личному кабинету 24/7
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                  Контроль календаря бронирований
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                  Расторжение договора за 3 месяца
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-foreground">Обязательства оператора</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                  Выплаты строго до 30 числа
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                  Поддержка гостей и собственников 24/7
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                  Соблюдение стандартов клининга
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                  Страхование операционных рисков
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 bg-[var(--secondary)]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Получите персональный расчёт
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Узнайте точную прибыль для вашего объекта и сравните с текущими показателями.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/contacts" className="inline-flex items-center justify-center h-12 px-6 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-medium">
              Получить расчёт
            </a>
            <a href="/portfolio" className="inline-flex items-center justify-center h-12 px-6 rounded-lg border border-border font-medium">
              Посмотреть портфель
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
