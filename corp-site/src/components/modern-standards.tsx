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

function StandardCard({ standard, index }: {
  standard: {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    processes: string[];
    metrics: { label: string; value: number; suffix: string }[];
  };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    blue: "from-blue-400 to-cyan-500 border-blue-500/30 text-blue-600",
    green: "from-green-400 to-emerald-500 border-green-500/30 text-green-600",
    purple: "from-purple-400 to-violet-500 border-purple-500/30 text-purple-600",
    orange: "from-orange-400 to-red-500 border-orange-500/30 text-orange-600"
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 shadow-xl hover:border-white/20 transition-all duration-500"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${colorClasses[standard.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[standard.color as keyof typeof colorClasses].split(' ')[1]} opacity-5 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Floating Particles */}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1.5 h-1.5 bg-gradient-to-r ${colorClasses[standard.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[standard.color as keyof typeof colorClasses].split(' ')[1]} opacity-40 rounded-full`}
            animate={{
              x: [0, 25, 0],
              y: [0, -20, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${10 + i * 20}%`,
              top: `${15 + i * 15}%`,
            }}
          />
        ))}
      </div>

      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.15, rotate: 15 }}
            className={`shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClasses[standard.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[standard.color as keyof typeof colorClasses].split(' ')[1]} flex items-center justify-center shadow-2xl`}
          >
            <span className="text-2xl">{standard.icon}</span>
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
              className="text-xl font-bold text-foreground mb-2 leading-tight"
            >
              {standard.title}
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15 + 0.4, duration: 0.6 }}
              className="text-sm text-muted-foreground leading-relaxed"
            >
              {standard.description}
            </motion.p>
          </div>
        </div>

        {/* Processes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.15 + 0.5, duration: 0.6 }}
          className="space-y-3 mb-6"
        >
          {standard.processes.map((process, i) => (
            <motion.div
              key={process}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15 + 0.6 + i * 0.1, duration: 0.4 }}
              className="flex items-start gap-3 group/item"
            >
              <motion.div
                className={`w-2 h-2 bg-gradient-to-r ${colorClasses[standard.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[standard.color as keyof typeof colorClasses].split(' ')[1]} rounded-full mt-2 animate-pulse`}
                whileHover={{ scale: 1.5 }}
              />
              <span className="text-sm text-muted-foreground leading-relaxed group-hover/item:text-foreground transition-colors">
                {process}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Metrics */}
        {standard.metrics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.8, duration: 0.6 }}
            className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10"
          >
            {standard.metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.15 + 1 + i * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-3 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10"
              >
                <div className={`text-2xl font-bold ${colorClasses[standard.color as keyof typeof colorClasses].split(' ')[3]}`}>
                  <AnimatedCounter 
                    value={metric.value} 
                    delay={index * 0.15 + 1.2 + i * 0.1} 
                    suffix={metric.suffix} 
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1">{metric.label}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
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

function ProcessFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const processSteps = [
    { id: 1, title: "Прибытие гостя", icon: "🚪", time: "0 мин" },
    { id: 2, title: "Заселение", icon: "🔑", time: "5 мин" },
    { id: 3, title: "Обслуживание", icon: "🛎️", time: "24/7" },
    { id: 4, title: "Уборка", icon: "🧹", time: "30 мин" },
    { id: 5, title: "Выезд", icon: "✅", time: "5 мин" }
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 p-8 shadow-2xl overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-transparent to-blue-500/20"></div>
      </div>

      <div className="relative">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">Операционный процесс</h3>
          <p className="text-muted-foreground">Каждый этап оптимизирован для максимального удобства гостей</p>
        </div>

        {/* Process Steps */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {processSteps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative">
              {/* Connection Line */}
              {index < processSteps.length - 1 && (
                <motion.div
                  className="hidden md:block absolute left-full top-1/2 w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 -translate-y-1/2 z-0"
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                  style={{ originX: 0 }}
                />
              )}

              {/* Step Node */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + index * 0.2, duration: 0.5, type: "spring" }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl mb-4"
              >
                <span className="text-2xl">{step.icon}</span>
                
                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {step.id}
                </div>
              </motion.div>

              {/* Step Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                className="text-center"
              >
                <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30">
                  {step.time}
                </span>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ModernStandards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const standards = [
    {
      id: "cleaning",
      title: "Клининг и бельё",
      description: "Профессиональные стандарты уборки с контролем качества",
      icon: "🧹",
      color: "blue",
      processes: [
        "SLA по уборке и сменам белья, контроль чек-листами",
        "Инспекция качества и фотоотчёты",
        "Профессиональные моющие средства",
        "Система оценки качества уборки"
      ],
      metrics: [
        { label: "Время уборки", value: 30, suffix: " мин" },
        { label: "Качество", value: 98, suffix: "%" }
      ]
    },
    {
      id: "support",
      title: "Поддержка и безопасность",
      description: "Круглосуточная поддержка и обеспечение безопасности",
      icon: "🛡️",
      color: "green",
      processes: [
        "Диспетчерская 24/7, приоритетные заявки",
        "Видеонаблюдение, инструктажи, допуски",
        "Система экстренного реагирования",
        "Протоколы безопасности и охраны"
      ],
      metrics: [
        { label: "Время отклика", value: 5, suffix: " мин" },
        { label: "Доступность", value: 100, suffix: "%" }
      ]
    },
    {
      id: "inventory",
      title: "Инвентаризация и damage-policy",
      description: "Учёт имущества и система компенсаций",
      icon: "📋",
      color: "purple",
      processes: [
        "Учёт имущества, регламент компенсаций",
        "Страхование рисков",
        "Система фиксации повреждений",
        "Автоматизированная инвентаризация"
      ],
      metrics: [
        { label: "Сохранность", value: 99, suffix: "%" },
        { label: "Возмещение", value: 24, suffix: " ч" }
      ]
    },
    {
      id: "special",
      title: "Особые стандарты",
      description: "Дополнительные сервисы и удобства для гостей",
      icon: "⭐",
      color: "orange",
      processes: [
        "Pet-friendly, детские наборы, трансфер",
        "Спортивное снаряжение, дополнительные сервисы",
        "Консьерж-сервис и персональные запросы",
        "Программы лояльности для постоянных гостей"
      ],
      metrics: [
        { label: "Доп. услуги", value: 15, suffix: "+" },
        { label: "Удовлетворённость", value: 96, suffix: "%" }
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
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-teal-400/8 to-cyan-500/12 blur-3xl"
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
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-blue-400/8 to-indigo-500/12 blur-3xl"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 text-teal-600 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
            Качество и стандарты
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            <span className="bg-gradient-to-r from-teal-400 to-cyan-600 bg-clip-text text-transparent">Операционные</span> стандарты
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            Каждый процесс регламентирован и оптимизирован для обеспечения высочайшего 
            качества обслуживания и максимального комфорта гостей.
          </motion.p>
        </motion.div>

        {/* Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-16"
        >
          <ProcessFlow />
        </motion.div>

        {/* Standards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {standards.map((standard, index) => (
            <StandardCard key={standard.id} standard={standard} index={index} />
          ))}
        </motion.div>

        {/* Quality Metrics Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 p-8 sm:p-12 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Показатели качества</h3>
            <p className="text-muted-foreground">Результаты нашей операционной деятельности</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "⭐", title: "4.9/5", desc: "Рейтинг гостей", color: "text-yellow-500" },
              { icon: "🎯", title: "99.2%", desc: "Выполнение SLA", color: "text-green-500" },
              { icon: "⚡", title: "< 5 мин", desc: "Время отклика", color: "text-blue-500" },
              { icon: "🔄", title: "98%", desc: "Повторные гости", color: "text-purple-500" }
            ].map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 2 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{metric.icon}</div>
                <h4 className={`font-bold text-2xl mb-2 ${metric.color}`}>{metric.title}</h4>
                <p className="text-sm text-muted-foreground">{metric.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
