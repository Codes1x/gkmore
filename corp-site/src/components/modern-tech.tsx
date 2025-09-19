"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface TechItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  features: string[];
  color: string;
}

function TechCard({ tech, index }: { tech: TechItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    blue: "from-blue-400 to-cyan-500 border-blue-500/30",
    purple: "from-purple-400 to-violet-500 border-purple-500/30",
    green: "from-green-400 to-emerald-500 border-green-500/30",
    orange: "from-orange-400 to-red-500 border-orange-500/30",
    pink: "from-pink-400 to-rose-500 border-pink-500/30"
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 shadow-xl hover:border-white/20 transition-all duration-500"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${colorClasses[tech.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[tech.color as keyof typeof colorClasses].split(' ')[1]} opacity-5 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Floating Particles */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r ${colorClasses[tech.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[tech.color as keyof typeof colorClasses].split(' ')[1]} opacity-30 rounded-full`}
            animate={{
              x: [0, 20, 0],
              y: [0, -15, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${15 + i * 25}%`,
              top: `${10 + i * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            className={`shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClasses[tech.color as keyof typeof colorClasses]} flex items-center justify-center shadow-2xl`}
          >
            <span className="text-2xl">{tech.icon}</span>
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
              className="text-xl font-bold text-foreground mb-2 leading-tight"
            >
              {tech.title}
            </motion.h3>
            
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
              className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${colorClasses[tech.color as keyof typeof colorClasses]} bg-opacity-20 border ${colorClasses[tech.color as keyof typeof colorClasses].split(' ')[2]} text-xs font-medium text-foreground`}
            >
              {tech.category}
            </motion.span>
          </div>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
          className="text-muted-foreground leading-relaxed mb-6"
        >
          {tech.description}
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.6, duration: 0.6 }}
          className="space-y-3"
        >
          {tech.features.map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.7 + i * 0.1, duration: 0.4 }}
              className="flex items-start gap-3"
            >
              <div className={`w-2 h-2 bg-gradient-to-r ${colorClasses[tech.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[tech.color as keyof typeof colorClasses].split(' ')[1]} rounded-full mt-2 animate-pulse`} />
              <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        animate={isHovered ? { x: ['-100%', '100%'] } : {}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{ transform: 'skewX(-20deg)' }}
      />
    </motion.div>
  );
}

function IntegrationFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const integrations = [
    { name: "Travelline PMS", icon: "🏨", position: { x: 50, y: 20 } },
    { name: "Яндекс Путешествия", icon: "🌐", position: { x: 20, y: 50 } },
    { name: "Озон Тревел", icon: "📱", position: { x: 80, y: 50 } },
    { name: "Островок", icon: "🏝️", position: { x: 30, y: 80 } },
    { name: "Смарт-замки", icon: "🔐", position: { x: 70, y: 80 } }
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative h-80 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl"
    >
      {/* Central Hub */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl z-10"
      >
        <span className="text-2xl">⚡</span>
      </motion.div>

      {/* Integration Points */}
      {integrations.map((integration, index) => (
        <motion.div
          key={integration.name}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1 + index * 0.2, duration: 0.5, type: "spring" }}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${integration.position.x}%`,
            top: `${integration.position.y}%`,
          }}
        >
          <div className="relative">
            {/* Connection Line */}
            <motion.div
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ delay: 1.2 + index * 0.1, duration: 1 }}
              className="absolute inset-0 pointer-events-none"
            >
              <svg
                className="absolute inset-0 w-full h-full"
                style={{
                  width: `${Math.abs(integration.position.x - 50) * 6}px`,
                  height: `${Math.abs(integration.position.y - 50) * 4}px`,
                  left: integration.position.x > 50 ? '-50%' : '-50%',
                  top: integration.position.y > 50 ? '-50%' : '-50%',
                }}
              >
                <motion.line
                  x1="50%"
                  y1="50%"
                  x2={integration.position.x > 50 ? "0%" : "100%"}
                  y2={integration.position.y > 50 ? "0%" : "100%"}
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ delay: 1.2 + index * 0.1, duration: 1 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(6, 182, 212, 0.6)" />
                    <stop offset="100%" stopColor="rgba(59, 130, 246, 0.6)" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Integration Node */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg cursor-pointer group"
            >
              <span className="text-lg">{integration.icon}</span>
            </motion.div>
            
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
              className="absolute top-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
            >
              <span className="text-xs font-medium text-foreground bg-white/10 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/20">
                {integration.name}
              </span>
            </motion.div>
          </div>
        </motion.div>
      ))}

      {/* Animated Background Particles */}
      {Array.from({ length: 8 }).map((_, i) => {
        // Static positions to avoid hydration mismatch
        const positions = [
          { left: '15%', top: '20%' },
          { left: '85%', top: '30%' },
          { left: '25%', top: '70%' },
          { left: '75%', top: '15%' },
          { left: '45%', top: '80%' },
          { left: '65%', top: '45%' },
          { left: '10%', top: '60%' },
          { left: '90%', top: '75%' }
        ];
        
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: positions[i]?.left || '50%',
              top: positions[i]?.top || '50%',
            }}
          />
        );
      })}
    </motion.div>
  );
}

export function ModernTech() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const technologies: TechItem[] = [
    {
      id: "pms",
      title: "PMS/движок: Travelline",
      description: "Надёжный инструмент бронирований и управления каналами с полной автоматизацией процессов.",
      icon: "🏨",
      category: "Система управления",
      features: [
        "Управление номерным фондом",
        "Автоматическое распределение каналов",
        "Интеграция с платёжными системами",
        "Отчётность в реальном времени"
      ],
      color: "blue"
    },
    {
      id: "pricing",
      title: "Динамическое ценообразование",
      description: "Умная система пересмотра ставок с учётом спроса, сезонности и конкурентной среды.",
      icon: "📊",
      category: "Аналитика и pricing",
      features: [
        "Анализ конкурентов в реальном времени",
        "Прогнозирование спроса",
        "Автоматическая корректировка цен",
        "A/B тестирование стратегий"
      ],
      color: "purple"
    },
    {
      id: "ota",
      title: "OTA и метапоиск",
      description: "Размещение на ведущих площадках: Яндекс Путешествия, Озон Тревел, Островок и других.",
      icon: "🌐",
      category: "Каналы продаж",
      features: [
        "15+ интегрированных площадок",
        "Синхронизация цен и доступности",
        "Управление контентом",
        "Аналитика по каналам"
      ],
      color: "green"
    },
    {
      id: "smart",
      title: "Смарт-замки и бесконтактные платежи",
      description: "Современные технологии для ускорения заселения, обеспечения безопасности и удобства гостей.",
      icon: "🔐",
      category: "IoT и автоматизация",
      features: [
        "Удалённое управление доступом",
        "Бесконтактное заселение",
        "Интеграция с мобильным приложением",
        "История доступа и безопасность"
      ],
      color: "orange"
    },
    {
      id: "crm",
      title: "CRM и BI-аналитика",
      description: "Комплексная система отслеживания LTV гостей, анализа источников и прогнозирования спроса.",
      icon: "📈",
      category: "Аналитика и CRM",
      features: [
        "Профили гостей и история бронирований",
        "Прогнозная аналитика",
        "Сегментация клиентской базы",
        "Автоматизированный маркетинг"
      ],
      color: "pink"
    }
  ];

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-violet-400/8 to-purple-500/12 blur-3xl"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 text-violet-600 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            Технологический стек
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            <span className="bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent">Технологии</span> и интеграции
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            Используем современную технологическую связку для максимизации доходности, 
            обеспечения прозрачности и автоматизации всех процессов управления недвижимостью.
          </motion.p>
        </motion.div>

        {/* Integration Flow Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Экосистема интеграций</h3>
            <p className="text-muted-foreground">Все системы работают как единое целое</p>
          </div>
          <IntegrationFlow />
        </motion.div>

        {/* Technology Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {technologies.map((tech, index) => (
            <TechCard key={tech.id} tech={tech} index={index} />
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 p-8 sm:p-12 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Результаты автоматизации</h3>
            <p className="text-muted-foreground">Конкретные показатели эффективности нашего tech stack</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "⚡", title: "99.9% Uptime", desc: "Стабильность системы" },
              { icon: "🚀", title: "+35% Revenue", desc: "Рост доходности" },
              { icon: "⏱️", title: "24/7 Sync", desc: "Синхронизация данных" },
              { icon: "🔗", title: "15+ Integrations", desc: "Каналы продаж" }
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 2 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <h4 className="font-bold text-foreground text-lg mb-2">{stat.title}</h4>
                <p className="text-sm text-muted-foreground">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}