import { Header } from "@/components/header";

export default function PortfolioPage() {
  return (
    <div className="min-h-dvh font-sans">
      <Header />
      
      {/* Hero Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
            Портфель и масштаб
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            160 номеров в управлении в двух отелях Сочи. Стабильная загрузка, высокие рейтинги и растущая доходность.
          </p>
        </div>
      </section>

      {/* Portfolio Overview */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                name: "Sea Family Resort & Spa",
                rooms: 122,
                adr: 10114,
                revpar: 8053,
                location: "1-я линия у моря",
                description: "Премиальный отель на берегу Чёрного моря с собственным пляжем и SPA-центром",
                features: ["Собственный пляж", "SPA-центр", "Ресторан", "Конференц-зал", "Парковка"],
                loadLow: 45,
                loadHigh: 93,
                rating: 9.4,
                img: "🏖️"
              },
              {
                name: "Лучезарный Резорт",
                rooms: 38,
                adr: 18861,
                revpar: 16352,
                location: "4 минуты пешком от моря",
                description: "Бутик-отель с апартаментами повышенной комфортности в тихом районе",
                features: ["Апартаменты", "Кухня в номерах", "Балконы", "Тихий район", "Близко к морю"],
                loadLow: 52,
                loadHigh: 89,
                rating: 9.2,
                img: "🏢"
              }
            ].map((hotel, index) => (
              <div key={index} className="rounded-2xl border border-border bg-card p-8">
                <div className="flex items-start gap-4">
                  <div className="size-20 rounded-xl border border-border bg-muted grid place-items-center text-3xl">
                    {hotel.img}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-foreground">{hotel.name}</h2>
                    <p className="text-muted-foreground">{hotel.location}</p>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {hotel.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="text-center p-3 rounded-lg border border-border/60">
                    <div className="text-lg font-semibold text-foreground">{hotel.rooms}</div>
                    <div className="text-xs text-muted-foreground">номеров</div>
                  </div>
                  <div className="text-center p-3 rounded-lg border border-border/60">
                    <div className="text-lg font-semibold text-foreground">{hotel.adr.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">ADR, ₽</div>
                  </div>
                  <div className="text-center p-3 rounded-lg border border-border/60">
                    <div className="text-lg font-semibold text-foreground">{hotel.revpar.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">RevPAR, ₽</div>
                  </div>
                  <div className="text-center p-3 rounded-lg border border-border/60">
                    <div className="text-lg font-semibold text-foreground">{hotel.rating}</div>
                    <div className="text-xs text-muted-foreground">рейтинг</div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-foreground">Загрузка по сезонам:</h3>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <div className="text-sm text-blue-700">Низкий сезон</div>
                      <div className="text-xl font-semibold text-blue-800">{hotel.loadLow}%</div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                      <div className="text-sm text-green-700">Высокий сезон</div>
                      <div className="text-xl font-semibold text-green-800">{hotel.loadHigh}%</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-foreground">Особенности:</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {hotel.features.map((feature, i) => (
                      <span key={i} className="px-2 py-1 text-xs rounded-full bg-[var(--secondary)] text-foreground">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience & Channels */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Целевые аудитории</h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                  <span className="text-2xl">👨‍👩‍👧‍👦</span>
                  <div>
                    <h3 className="font-semibold text-foreground">Семьи с детьми</h3>
                    <p className="text-sm text-muted-foreground">Основная аудитория, ищут комфорт и безопасность</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                  <span className="text-2xl">💑</span>
                  <div>
                    <h3 className="font-semibold text-foreground">Молодые пары</h3>
                    <p className="text-sm text-muted-foreground">Романтический отдых и активности</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                  <span className="text-2xl">👴👵</span>
                  <div>
                    <h3 className="font-semibold text-foreground">Пожилые пары</h3>
                    <p className="text-sm text-muted-foreground">Спокойный отдых и оздоровление</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
                  <span className="text-2xl">🏢</span>
                  <div>
                    <h3 className="font-semibold text-foreground">Корпоративные клиенты</h3>
                    <p className="text-sm text-muted-foreground">Деловые поездки и мероприятия</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground">Каналы продаж</h2>
              <div className="mt-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-border bg-card">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground">Яндекс Путешествия</span>
                      <span className="text-sm text-muted-foreground">35%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-[var(--primary)]" style={{width: '35%'}}></div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-card">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground">Прямые продажи</span>
                      <span className="text-sm text-muted-foreground">25%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-[var(--primary)]" style={{width: '25%'}}></div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-card">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground">Озон Тревел</span>
                      <span className="text-sm text-muted-foreground">15%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-[var(--primary)]" style={{width: '15%'}}></div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-card">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground">Островок</span>
                      <span className="text-sm text-muted-foreground">12%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-[var(--primary)]" style={{width: '12%'}}></div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-card">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground">Корпоративные</span>
                      <span className="text-sm text-muted-foreground">8%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-[var(--primary)]" style={{width: '8%'}}></div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-card">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground">Алеан</span>
                      <span className="text-sm text-muted-foreground">5%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-[var(--primary)]" style={{width: '5%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground text-center">
            Ключевые показатели портфеля
          </h2>
          
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-2xl border border-border bg-card">
              <div className="text-3xl font-bold text-foreground">78%</div>
              <div className="text-sm text-muted-foreground mt-1">Средняя загрузка за 12 мес</div>
            </div>
            <div className="text-center p-6 rounded-2xl border border-border bg-card">
              <div className="text-3xl font-bold text-green-600">+15%</div>
              <div className="text-sm text-muted-foreground mt-1">Рост RevPAR год к году</div>
            </div>
            <div className="text-center p-6 rounded-2xl border border-border bg-card">
              <div className="text-3xl font-bold text-foreground">9.4</div>
              <div className="text-sm text-muted-foreground mt-1">Рейтинг на Booking.com</div>
            </div>
            <div className="text-center p-6 rounded-2xl border border-border bg-card">
              <div className="text-3xl font-bold text-green-600">0%</div>
              <div className="text-sm text-muted-foreground mt-1">Отток собственников</div>
            </div>
          </div>
        </div>
      </section>

      {/* Room Types */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold text-foreground">Типы номеров в управлении</h2>
          
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border border-border bg-card text-center">
              <div className="text-2xl mb-3">🏠</div>
              <h3 className="font-semibold text-foreground">Студии</h3>
              <p className="text-sm text-muted-foreground mt-1">25-35 м²</p>
              <div className="text-lg font-semibold text-foreground mt-2">45 номеров</div>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card text-center">
              <div className="text-2xl mb-3">🏡</div>
              <h3 className="font-semibold text-foreground">1-комнатные</h3>
              <p className="text-sm text-muted-foreground mt-1">40-55 м²</p>
              <div className="text-lg font-semibold text-foreground mt-2">78 номеров</div>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card text-center">
              <div className="text-2xl mb-3">🏘️</div>
              <h3 className="font-semibold text-foreground">2-комнатные</h3>
              <p className="text-sm text-muted-foreground mt-1">60-80 м²</p>
              <div className="text-lg font-semibold text-foreground mt-2">25 номеров</div>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card text-center">
              <div className="text-2xl mb-3">👑</div>
              <h3 className="font-semibold text-foreground">Люксы</h3>
              <p className="text-sm text-muted-foreground mt-1">80+ м²</p>
              <div className="text-lg font-semibold text-foreground mt-2">12 номеров</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 bg-[var(--secondary)]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Добавьте свой объект в портфель
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Присоединяйтесь к успешным собственникам и начните получать стабильный доход от своей недвижимости.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/contacts" className="inline-flex items-center justify-center h-12 px-6 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-medium">
              Подать заявку
            </a>
            <a href="/model" className="inline-flex items-center justify-center h-12 px-6 rounded-lg border border-border font-medium">
              Условия сотрудничества
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
