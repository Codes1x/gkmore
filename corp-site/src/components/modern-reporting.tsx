"use client";

import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";

function AnimatedProgress({ value, delay = 0, label }: { value: number; delay?: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
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
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [springValue]);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-foreground font-medium">{label}</span>
        <span className="text-cyan-600 font-semibold">{Math.round(displayValue)}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
          style={{ width: `${displayValue}%` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${displayValue}%` } : { width: 0 }}
          transition={{ duration: 2, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [activeTab, setActiveTab] = useState<'revenue' | 'calendar' | 'reports'>('revenue');


  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl"
    >
      {/* Mock Dashboard Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-foreground">Личный кабинет собственника</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Онлайн</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row gap-1 p-1 bg-white/5 rounded-xl">
          {[
            { id: 'revenue', label: 'Доходы', icon: '💰' },
            { id: 'calendar', label: 'Календарь', icon: '📅' },
            { id: 'reports', label: 'Отчёты', icon: '📊' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'revenue' | 'calendar' | 'reports')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm sm:text-base">{tab.icon}</span>
              <span className="truncate">{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6">
        {activeTab === 'revenue' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Выручка', value: '125,000₽', change: '+12.5%', color: 'green' },
                { label: 'Загрузка', value: '87%', change: '+5.2%', color: 'blue' },
                { label: 'ADR', value: '10,500₽', change: '+8.1%', color: 'purple' }
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  className="p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10"
                >
                  <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
                  <div className="text-lg font-bold text-foreground">{metric.value}</div>
                  <div className={`text-xs font-medium ${metric.color === 'green' ? 'text-green-400' : metric.color === 'blue' ? 'text-blue-400' : 'text-purple-400'}`}>
                    {metric.change}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Progress Bars */}
            <div className="space-y-4">
              <AnimatedProgress value={87} delay={1} label="Загрузка текущий месяц" />
              <AnimatedProgress value={65} delay={1.2} label="План выполнения" />
              <AnimatedProgress value={92} delay={1.4} label="Удовлетворённость гостей" />
            </div>
          </motion.div>
        )}

        {activeTab === 'calendar' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Mock Calendar */}
            <div className="grid grid-cols-7 gap-1 text-center overflow-x-auto">
              {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
                <div key={day} className="p-2 text-xs text-muted-foreground font-medium">{day}</div>
              ))}
              {Array.from({ length: 28 }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + (i * 0.02), duration: 0.3 }}
                  className={`p-2 text-xs rounded-lg cursor-pointer transition-colors ${
                    i % 5 === 0 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : i % 3 === 0 
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'hover:bg-white/5 text-muted-foreground'
                  }`}
                >
                  {i + 1}
                </motion.div>
              ))}
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-center gap-4 text-xs flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500/20 border border-green-500/30 rounded"></div>
                <span className="text-muted-foreground">Забронировано</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500/20 border border-blue-500/30 rounded"></div>
                <span className="text-muted-foreground">Заблокировано</span>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'reports' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Recent Reports */}
            {[
              { name: 'Отчёт за декабрь 2024', date: '30.12.2024', status: 'Готов' },
              { name: 'Отчёт за ноябрь 2024', date: '30.11.2024', status: 'Готов' },
              { name: 'Отчёт за октябрь 2024', date: '30.10.2024', status: 'Готов' }
            ].map((report, index) => (
              <motion.div
                key={report.name}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-white/5 to-white/10 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-white text-sm">
                    📄
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{report.name}</div>
                    <div className="text-xs text-muted-foreground">{report.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                    {report.status}
                  </span>
                  <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                      <path d="M14 2v6h6"/>
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function PaymentTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const timelineSteps = [
    { day: '1-15', label: 'Сбор данных', desc: 'Обработка всех операций', icon: '📊', status: 'completed' },
    { day: '16-25', label: 'Подготовка отчёта', desc: 'Формирование документов', icon: '📋', status: 'completed' },
    { day: '26-28', label: 'Проверка и согласование', desc: 'Финальная сверка', icon: '✅', status: 'current' },
    { day: '29-30', label: 'Выплата собственнику', desc: 'Перевод средств', icon: '💰', status: 'pending' }
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="space-y-6"
    >
      <h3 className="text-xl font-semibold text-foreground mb-6">График выплат</h3>
      
      <div className="relative">
        {/* Timeline Line */}
        <motion.div
          className="hidden sm:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-blue-500"
          initial={{ height: 0 }}
          animate={inView ? { height: '100%' } : {}}
          transition={{ duration: 2, delay: 0.8 }}
        />

        <div className="space-y-6">
          {timelineSteps.map((step, index) => (
            <motion.div
              key={step.day}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
              className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6"
            >
              {/* Timeline Node */}
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 1.2 + index * 0.2, duration: 0.4, type: "spring" }}
                className={`relative z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-lg ${
                  step.status === 'completed' 
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
                    : step.status === 'current'
                      ? 'bg-gradient-to-br from-cyan-400 to-blue-500 animate-pulse'
                      : 'bg-gradient-to-br from-gray-400 to-gray-500'
                }`}
              >
                {step.icon}
              </motion.div>

              {/* Content */}
              <div className="flex-1 pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg font-semibold text-foreground">{step.label}</h4>
                  <span className="text-sm px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30">
                    {step.day} число
                  </span>
                </div>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ModernReporting() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const features = [
    {
      title: "Ежемесячная отчётность",
      icon: "📊",
      items: [
        "Выручка, загрузка, ADR, RevPAR",
        "Расходы по статьям, валовая прибыль", 
        "Выплаты собственнику до 30‑го числа"
      ],
      tools: ["Шаблон отчёта (PDF/Excel)", "История отчётов за период"]
    },
    {
      title: "Личный кабинет собственника",
      icon: "🖥️",
      items: [
        "Календарь бронирований",
        "Дашборд: выручка, расходы, выплаты",
        "Детализация броней и источников",
        "Документы и закрывающие"
      ],
      tools: []
    }
  ];

  return (
    <section className="relative py-12 sm:py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-indigo-400/8 to-purple-500/12 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ left: '5%', top: '10%' }}
        />
        
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-cyan-400/8 to-blue-500/12 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ right: '10%', bottom: '15%' }}
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-indigo-600 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
            Отчётность и контроль
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            <span className="bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">Прозрачность</span>, отчётность и выплаты
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            Полная прозрачность финансов с детальными отчётами и личным кабинетом. 
            Контролируйте доходы и расходы в режиме реального времени.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="space-y-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 p-8 shadow-xl hover:border-white/20 transition-all duration-300"
              >
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/5 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                
                <div className="relative">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-2xl shadow-lg"
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                  </div>

                  {/* Feature Items */}
                  <div className="space-y-3 mb-6">
                    {feature.items.map((item, itemIndex) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 1.2 + index * 0.2 + itemIndex * 0.1, duration: 0.4 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 animate-pulse"></div>
                        <span className="text-muted-foreground leading-relaxed">{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Tools */}
                  {feature.tools.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {feature.tools.map((tool, toolIndex) => (
                        <motion.div
                          key={tool}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 1.4 + index * 0.2 + toolIndex * 0.1, duration: 0.4 }}
                          whileHover={{ scale: 1.02 }}
                          className="p-3 rounded-xl bg-gradient-to-r from-white/5 to-white/10 border border-white/10 text-sm text-foreground text-center hover:border-white/20 transition-colors"
                        >
                          {tool}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Dashboard Preview */}
          <div className="space-y-8">
            <DashboardPreview />
            <PaymentTimeline />
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 px-8 py-6 rounded-3xl bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 shadow-xl">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white text-2xl shadow-lg"
              >
                🖥️
              </motion.div>
              <div className="text-left">
                <div className="font-semibold text-foreground text-lg">Попробуйте демо кабинета</div>
                <div className="text-sm text-muted-foreground">Посмотрите, как работает система изнутри</div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <motion.a
                href="/demo"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Демо кабинета
              </motion.a>
              
              <motion.a
                href="/contacts"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 border border-white/30 text-foreground font-medium rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Вопрос по выплатам
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
