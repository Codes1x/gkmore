"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useState } from "react";

type BenefitProps = {
  title: string;
  description: string;
  icon: string;
  color: 'cyan' | 'blue' | 'purple' | 'green' | 'orange';
  delay?: number;
};

function BenefitCard({ title, description, icon, color, delay = 0 }: BenefitProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    cyan: {
      gradient: 'from-cyan-400 to-blue-500',
      bg: 'from-cyan-500/5 to-blue-500/10',
      border: 'border-cyan-500/20',
      glow: 'shadow-cyan-500/25',
      text: 'text-cyan-400',
      iconBg: 'from-cyan-400 to-cyan-600'
    },
    blue: {
      gradient: 'from-blue-400 to-indigo-500',
      bg: 'from-blue-500/5 to-indigo-500/10',
      border: 'border-blue-500/20',
      glow: 'shadow-blue-500/25',
      text: 'text-blue-400',
      iconBg: 'from-blue-400 to-blue-600'
    },
    purple: {
      gradient: 'from-purple-400 to-pink-500',
      bg: 'from-purple-500/5 to-pink-500/10',
      border: 'border-purple-500/20',
      glow: 'shadow-purple-500/25',
      text: 'text-purple-400',
      iconBg: 'from-purple-400 to-purple-600'
    },
    green: {
      gradient: 'from-green-400 to-emerald-500',
      bg: 'from-green-500/5 to-emerald-500/10',
      border: 'border-green-500/20',
      glow: 'shadow-green-500/25',
      text: 'text-green-400',
      iconBg: 'from-green-400 to-green-600'
    },
    orange: {
      gradient: 'from-orange-400 to-red-500',
      bg: 'from-orange-500/5 to-red-500/10',
      border: 'border-orange-500/20',
      glow: 'shadow-orange-500/25',
      text: 'text-orange-400',
      iconBg: 'from-orange-400 to-orange-600'
    }
  };

  const colors = colorClasses[color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: delay * 0.1,
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3 } 
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${colors.bg} backdrop-blur-xl border ${colors.border} shadow-lg hover:shadow-2xl ${colors.glow} transition-all duration-500 cursor-pointer`}
    >
      {/* Background Glow Effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
        animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 bg-gradient-to-r ${colors.gradient} rounded-full opacity-40`}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.8
            }}
            style={{
              left: `${15 + i * 20}%`,
              top: `${20 + i * 15}%`
            }}
          />
        ))}
      </div>

      <div className="relative p-6 sm:p-8">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: delay * 0.1 + 0.3, duration: 0.6, type: "spring" }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.iconBg} flex items-center justify-center text-white text-2xl shadow-lg mb-6 relative`}
        >
          {icon}
          
          {/* Icon Glow */}
          <motion.div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300`}
            animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
          />
        </motion.div>

        {/* Content */}
        <div className="space-y-3">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: delay * 0.1 + 0.5, duration: 0.5 }}
            className="text-xl font-bold text-foreground group-hover:text-foreground/90 transition-colors"
          >
            {title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: delay * 0.1 + 0.7, duration: 0.5 }}
            className="text-muted-foreground leading-relaxed group-hover:text-muted-foreground/80 transition-colors"
          >
            {description}
          </motion.p>
        </div>

        {/* Interactive Arrow */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 0.6, x: 0 } : {}}
          whileHover={{ opacity: 1, x: 5 }}
          transition={{ delay: delay * 0.1 + 0.9, duration: 0.3 }}
          className={`absolute bottom-6 right-6 w-8 h-8 rounded-full ${colors.text} opacity-60 group-hover:opacity-100 transition-opacity flex items-center justify-center`}
        >
          <motion.svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </motion.svg>
        </motion.div>
      </div>

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-all duration-1000"
        style={{ width: '50%' }}
      />

      {/* Bottom Accent Line */}
      <motion.div
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${colors.gradient} rounded-full`}
        initial={{ width: 0 }}
        animate={inView ? { width: '100%' } : {}}
        transition={{ delay: delay * 0.1 + 1, duration: 0.8, ease: "easeOut" }}
      />
    </motion.div>
  );
}

export function ModernBenefits() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const benefits = [
    {
      title: "Прозрачность",
      description: "Ежемесячная отчётность и понятные KPI по объекту. Полная видимость всех процессов и финансовых показателей.",
      icon: "🔍",
      color: 'cyan' as const
    },
    {
      title: "Личный кабинет",
      description: "Удалённый мониторинг: выручка, загрузка, бронирования. Доступ к данным 24/7 из любой точки мира.",
      icon: "💻",
      color: 'blue' as const
    },
    {
      title: "Поддержка 24/7",
      description: "Оперативные ответы для гостей и собственников. Круглосуточная техническая и информационная поддержка.",
      icon: "🛟",
      color: 'green' as const
    },
    {
      title: "Динамические цены",
      description: "Оптимизация дохода и мультиканальная дистрибуция. Автоматическое ценообразование на основе спроса.",
      icon: "📈",
      color: 'purple' as const
    },
    {
      title: "Стандарты и SLA",
      description: "Регламенты клининга, реагирование, контроль качества. Гарантированный уровень сервиса по договору.",
      icon: "⭐",
      color: 'orange' as const
    }
  ];

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400/5 to-blue-500/10 blur-3xl"
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
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-purple-400/5 to-pink-500/10 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-600 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            Наши преимущества
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Почему с нами <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">выгодно</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Мы предоставляем полный спектр услуг для максимизации доходности вашей недвижимости
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={benefit.title}
              title={benefit.title}
              description={benefit.description}
              icon={benefit.icon}
              color={benefit.color}
              delay={index}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-6 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xl">
                🤝
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">Готовы начать сотрудничество?</div>
                <div className="text-sm text-muted-foreground">Получите персональное предложение за 24 часа</div>
              </div>
            </div>
            
            <motion.a
              href="#contacts"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 whitespace-nowrap"
            >
              Связаться с нами
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
