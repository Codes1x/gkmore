"use client";

import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";

function AnimatedCounter({ value, delay = 0, suffix = "" }: { value: number; delay?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 100, damping: 30 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, value, { 
        duration: 2, 
        delay: delay,
        ease: "easeOut" 
      });
      return () => controls.stop();
    }
  }, [inView, motionValue, value, delay]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return () => unsubscribe();
  }, [springValue]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
}

function CaseCard({ caseData, index }: {
  caseData: {
    title: string;
    before: { load: number; adr: number; rating: number };
    after: { load: number; adr: number; rating: number };
    quote: string;
    category: string;
    location: string;
    timeline: string;
    improvements: string[];
  };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const colorClasses = [
    "from-blue-400 to-cyan-500 border-blue-500/30 text-blue-600",
    "from-green-400 to-emerald-500 border-green-500/30 text-green-600",
    "from-purple-400 to-violet-500 border-purple-500/30 text-purple-600",
    "from-orange-400 to-red-500 border-orange-500/30 text-orange-600",
    "from-pink-400 to-rose-500 border-pink-500/30 text-pink-600"
  ];

  const colorClass = colorClasses[index % colorClasses.length];

  const calculateGrowth = (before: number, after: number) => {
    return Math.round(((after - before) / before) * 100);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, type: "spring" }}
      whileHover={{ y: -12, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-white/20 transition-all duration-500 cursor-pointer"
      onClick={() => setShowComparison(!showComparison)}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]} opacity-5 group-hover:opacity-15 transition-opacity duration-500 rounded-3xl`}
          animate={isHovered ? { scale: 1.05, rotate: 1 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Floating Particles */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1.5 h-1.5 bg-gradient-to-r ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]} opacity-40 rounded-full`}
            animate={{
              x: [0, 25, 0],
              y: [0, -20, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${15 + i * 18}%`,
              top: `${10 + i * 15}%`,
            }}
          />
        ))}
      </div>

      <div className="relative p-8">
        {/* Header */}
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
            className="flex items-start justify-between mb-4"
          >
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground mb-2 leading-tight">
                {caseData.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]} bg-opacity-20 border ${colorClass.split(' ')[2]} text-xs font-medium`}>
                  {caseData.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-muted-foreground">
                  📍 {caseData.location}
                </span>
              </div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]} flex items-center justify-center shadow-lg`}
            >
              <span className="text-xl">📈</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.4, duration: 0.6 }}
            className="text-xs text-muted-foreground mb-4"
          >
            ⏱️ {caseData.timeline}
          </motion.div>
        </div>

        {/* Before/After Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.15 + 0.5, duration: 0.6 }}
          className="mb-6"
        >
          <div className="flex items-center justify-center mb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowComparison(!showComparison)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                showComparison
                  ? `bg-gradient-to-r ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]} text-white`
                  : 'bg-white/10 text-muted-foreground hover:bg-white/20'
              }`}
            >
              {showComparison ? 'Было ← → Стало' : 'Показать результат'}
            </motion.button>
          </div>

          {/* Metrics Comparison */}
          <motion.div
            initial={false}
            animate={{ height: showComparison ? 'auto' : 'auto' }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {[
              { label: 'Загрузка', before: caseData.before.load, after: caseData.after.load, suffix: '%', icon: '🏠' },
              { label: 'ADR', before: caseData.before.adr, after: caseData.after.adr, suffix: '₽', icon: '💰' },
              { label: 'Рейтинг', before: caseData.before.rating, after: caseData.after.rating, suffix: '', icon: '⭐' }
            ].map((metric, i) => (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <span>{metric.icon}</span>
                    {metric.label}
                  </span>
                  <span className={`font-bold ${colorClass.split(' ')[3]}`}>
                    +{calculateGrowth(metric.before, metric.after)}%
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  {showComparison ? (
                    <>
                      <div className="flex-1 text-center">
                        <div className="text-xs text-muted-foreground mb-1">Было</div>
                        <div className="text-lg font-bold text-red-400">
                          <AnimatedCounter 
                            value={metric.before} 
                            delay={index * 0.15 + 0.8 + i * 0.1} 
                            suffix={metric.suffix} 
                          />
                        </div>
                      </div>
                      
                      <div className="text-2xl">→</div>
                      
                      <div className="flex-1 text-center">
                        <div className="text-xs text-muted-foreground mb-1">Стало</div>
                        <div className={`text-lg font-bold ${colorClass.split(' ')[3]}`}>
                          <AnimatedCounter 
                            value={metric.after} 
                            delay={index * 0.15 + 1 + i * 0.1} 
                            suffix={metric.suffix} 
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 text-center">
                      <div className={`text-xl font-bold ${colorClass.split(' ')[3]}`}>
                        <AnimatedCounter 
                          value={metric.after} 
                          delay={index * 0.15 + 0.8 + i * 0.1} 
                          suffix={metric.suffix} 
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.15 + 0.7, duration: 0.6 }}
          className="relative mb-6 p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10"
        >
          <div className="absolute -left-1 -top-1 text-2xl text-muted-foreground/30">&ldquo;</div>
          <p className="text-sm text-muted-foreground leading-relaxed italic pl-6">
            {caseData.quote}
          </p>
          <div className="absolute -right-1 -bottom-1 text-2xl text-muted-foreground/30">&rdquo;</div>
        </motion.div>

        {/* Improvements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.15 + 0.8, duration: 0.6 }}
          className="space-y-2"
        >
          <h4 className="text-sm font-semibold text-foreground mb-3">Ключевые улучшения:</h4>
          {caseData.improvements.map((improvement, i) => (
            <motion.div
              key={improvement}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15 + 0.9 + i * 0.1, duration: 0.4 }}
              className="flex items-start gap-3 group/item"
            >
              <motion.div
                className={`w-1.5 h-1.5 bg-gradient-to-r ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]} rounded-full mt-2 animate-pulse`}
                whileHover={{ scale: 1.5 }}
              />
              <span className="text-xs text-muted-foreground leading-relaxed group-hover/item:text-foreground transition-colors">
                {improvement}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-white/5 to-white/10 border border-white/10 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {showComparison ? 'Скрыть сравнение ↑' : 'Показать сравнение ↓'}
        </motion.button>
      </div>

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        animate={isHovered ? { x: ['-100%', '100%'] } : {}}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{ transform: 'skewX(-20deg)' }}
      />
    </motion.div>
  );
}

function SuccessMetrics() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const metrics = [
    { icon: "📈", value: 73, suffix: "%", label: "Средний рост загрузки", color: "text-green-500" },
    { icon: "💰", value: 28, suffix: "%", label: "Увеличение ADR", color: "text-blue-500" },
    { icon: "⭐", value: 9.4, suffix: "", label: "Средний рейтинг", color: "text-yellow-500" },
    { icon: "🎯", value: 95, suffix: "%", label: "Удовлетворённость", color: "text-purple-500" }
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 p-8 shadow-2xl overflow-hidden mb-16"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-4">Общие результаты</h3>
        <p className="text-muted-foreground">Средние показатели по всем кейсам за последние 12 месяцев</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.6, type: "spring" }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="text-4xl mb-4">{metric.icon}</div>
            <h4 className={`font-bold text-3xl mb-2 ${metric.color}`}>
              <AnimatedCounter 
                value={metric.value} 
                delay={0.8 + index * 0.1} 
                suffix={metric.suffix} 
              />
            </h4>
            <p className="text-sm text-muted-foreground">{metric.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function ModernCases() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const cases = [
    {
      title: "Студия у моря, 28 м²",
      before: { load: 54, adr: 8200, rating: 8.6 },
      after: { load: 82, adr: 10100, rating: 9.3 },
      quote: "Загрузка выросла уже в первый сезон, отчётность наглядная.",
      category: "Студия",
      location: "Сочи",
      timeline: "6 месяцев",
      improvements: [
        "Внедрение динамического ценообразования",
        "Оптимизация каналов продаж",
        "Повышение стандартов уборки",
        "Система автоматических отзывов"
      ]
    },
    {
      title: "1‑к апартамент, 42 м²",
      before: { load: 60, adr: 9000, rating: 8.9 },
      after: { load: 86, adr: 11800, rating: 9.5 },
      quote: "Сделки ускорились, корпоративные заезды закрыли межсезонье.",
      category: "1-комнатная",
      location: "Анапа",
      timeline: "8 месяцев",
      improvements: [
        "Корпоративные контракты",
        "Сезонная стратегия продаж",
        "Улучшение интерьера",
        "Система лояльности гостей"
      ]
    },
    {
      title: "Люкс с видом, 62 м²",
      before: { load: 48, adr: 12000, rating: 9.1 },
      after: { load: 79, adr: 15500, rating: 9.6 },
      quote: "Premium-сегмент заработал, средний чек вырос на треть.",
      category: "Люкс",
      location: "Геленджик",
      timeline: "4 месяца",
      improvements: [
        "Premium-позиционирование",
        "Консьерж-сервис",
        "Эксклюзивные партнёрства",
        "VIP-программа обслуживания"
      ]
    },
    {
      title: "2‑к семейная, 85 м²",
      before: { load: 52, adr: 11500, rating: 8.8 },
      after: { load: 88, adr: 14200, rating: 9.4 },
      quote: "Семейный сегмент показал отличную динамику роста.",
      category: "2-комнатная",
      location: "Краснодар",
      timeline: "10 месяцев",
      improvements: [
        "Детские удобства и безопасность",
        "Семейные пакеты услуг",
        "Партнёрство с турагентствами",
        "Программа для постоянных гостей"
      ]
    },
    {
      title: "Пентхаус, 120 м²",
      before: { load: 35, adr: 18000, rating: 9.0 },
      after: { load: 71, adr: 24500, rating: 9.7 },
      quote: "Элитная недвижимость требует особого подхода - результат превзошёл ожидания.",
      category: "Пентхаус",
      location: "Сочи",
      timeline: "5 месяцев",
      improvements: [
        "Эксклюзивный маркетинг",
        "Персональный менеджер",
        "Luxury-сервисы",
        "Индивидуальный подход к каждому гостю"
      ]
    }
  ];

  return (
    <section className="relative py-12 sm:py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-emerald-400/8 to-teal-500/12 blur-3xl"
          animate={{
            x: [0, 150, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ left: '5%', top: '15%' }}
        />
        
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-blue-400/8 to-cyan-500/12 blur-3xl"
          animate={{
            x: [0, -120, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ right: '10%', bottom: '20%' }}
        />
      </div>

      <div ref={containerRef} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-emerald-600 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Кейсы и результаты
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            <span className="bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent">Было</span> → <span className="bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent">Стало</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            Реальные примеры роста загрузки, ADR и рейтинга после внедрения нашей системы 
            управления. Каждый кейс — это конкретные цифры и измеримые результаты.
          </motion.p>
        </motion.div>

        {/* Success Metrics */}
        <SuccessMetrics />

        {/* Cases Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {cases.slice(0, 3).map((caseData, index) => (
            <CaseCard key={caseData.title} caseData={caseData} index={index} />
          ))}
        </motion.div>

        {/* Additional Cases */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {cases.slice(3).map((caseData, index) => (
            <CaseCard key={caseData.title} caseData={caseData} index={index + 3} />
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="text-center rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 p-8 sm:p-12 shadow-2xl"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Готовы увидеть такие же результаты?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Каждый объект уникален, но подход к росту показателей — системный. 
            Обсудим ваш кейс и спрогнозируем результаты.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:from-emerald-400 hover:to-teal-500 transition-all shadow-lg"
            >
              Получить прогноз для моего объекта
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl border border-white/30 text-foreground font-semibold hover:bg-white/10 transition-all"
            >
              Смотреть больше кейсов
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
