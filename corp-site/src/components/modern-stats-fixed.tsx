"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

type ModernStatProps = {
  label: string;
  value: number;
  max?: number;
  suffix?: string;
  icon?: string;
  description?: string;
  color?: 'cyan' | 'blue' | 'purple' | 'green' | 'orange';
  trend?: 'up' | 'down' | 'stable';
};

function ModernStat({ 
  label, 
  value, 
  max = 100, 
  suffix = "", 
  icon = "📈",
  description = "",
  color = 'cyan',
  trend = 'up'
}: ModernStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  const colorClasses = {
    cyan: {
      gradient: 'from-cyan-400 to-blue-500',
      bg: 'from-cyan-500/15 to-blue-500/20', // Более тёмный фон
      border: 'border-cyan-500/30', // Более контрастная граница
      glow: 'shadow-cyan-500/25',
      text: 'text-white',
      textGradient: 'bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent', // Более яркий градиент
      iconBg: 'from-cyan-400 to-cyan-600'
    },
    blue: {
      gradient: 'from-blue-400 to-indigo-500',
      bg: 'from-blue-500/15 to-indigo-500/20', // Более тёмный фон
      border: 'border-blue-500/30', // Более контрастная граница
      glow: 'shadow-blue-500/25',
      text: 'text-white',
      textGradient: 'bg-gradient-to-r from-blue-300 to-indigo-400 bg-clip-text text-transparent', // Более яркий градиент
      iconBg: 'from-blue-400 to-blue-600'
    },
    purple: {
      gradient: 'from-purple-400 to-pink-500',
      bg: 'from-purple-500/15 to-pink-500/20', // Более тёмный фон
      border: 'border-purple-500/30', // Более контрастная граница
      glow: 'shadow-purple-500/25',
      text: 'text-white',
      textGradient: 'bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent', // Более яркий градиент
      iconBg: 'from-purple-400 to-purple-600'
    },
    green: {
      gradient: 'from-green-400 to-emerald-500',
      bg: 'from-green-500/15 to-emerald-500/20', // Более тёмный фон
      border: 'border-green-500/30', // Более контрастная граница
      glow: 'shadow-green-500/25',
      text: 'text-white',
      textGradient: 'bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent', // Более яркий градиент
      iconBg: 'from-green-400 to-green-600'
    },
    orange: {
      gradient: 'from-orange-400 to-red-500',
      bg: 'from-orange-500/15 to-red-500/20', // Более тёмный фон
      border: 'border-orange-500/30', // Более контрастная граница
      glow: 'shadow-orange-500/25',
      text: 'text-white',
      textGradient: 'bg-gradient-to-r from-orange-300 to-red-400 bg-clip-text text-transparent', // Более яркий градиент
      iconBg: 'from-orange-400 to-orange-600'
    }
  };

  const colors = colorClasses[color];
  const pct = (value / max) * 100;

  // Простая анимация счётчика
  useEffect(() => {
    if (inView) {
      const duration = 2000; // 2 секунды
      const startTime = performance.now();
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // EaseOut функция
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const newValue = Math.round(value * easedProgress);
        
        setDisplayValue(newValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [inView, value]);

  const TrendIcon = () => {
    if (trend === 'up') {
      return (
        <motion.svg 
          className="w-4 h-4 text-green-400"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
        </motion.svg>
      );
    } else if (trend === 'down') {
      return (
        <motion.svg 
          className="w-4 h-4 text-red-400"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
        </motion.svg>
      );
    }
    return null;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${colors.bg} backdrop-blur-xl border ${colors.border} p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group`}
    >
      {/* Background Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl`} />
      
      {/* Glow Effect */}
      <div className={`absolute inset-0 rounded-3xl ${colors.glow} opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />
      
      <div className="relative">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.iconBg} flex items-center justify-center text-white text-2xl shadow-lg mb-6`}
        >
          {icon}
        </motion.div>

        {/* Value */}
        <div className="mb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`text-4xl font-bold ${colors.textGradient} mb-2 drop-shadow-2xl`}
          >
            {displayValue.toLocaleString('ru-RU')}{suffix}
          </motion.div>
          
          {/* Trend */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <TrendIcon />
            <span className="text-sm text-muted-foreground">
              {trend === 'up' ? 'Рост' : trend === 'down' ? 'Снижение' : 'Стабильно'}
            </span>
          </motion.div>
        </div>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="space-y-2"
        >
          <h3 className="text-lg font-semibold text-foreground drop-shadow-sm">{label}</h3>
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed drop-shadow-sm">
              {description}
            </p>
          )}
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6"
        >
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Прогресс</span>
            <span>{Math.round(pct)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full`}
              initial={{ width: 0 }}
              animate={inView ? { width: `${pct}%` } : {}}
              transition={{ duration: 2, delay: 1, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ModernStatsFixed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const stats = [
    {
      label: "Доходность",
      value: 35,
      suffix: "%",
      icon: "💰",
      description: "Средняя доходность от недвижимости",
      color: 'green' as const,
      trend: 'up' as const
    },
    {
      label: "Объектов в управлении",
      value: 50,
      suffix: "+",
      icon: "🏨",
      description: "Апарт-отели и апартаменты",
      color: 'cyan' as const,
      trend: 'up' as const
    },
    {
      label: "Собственников",
      value: 45,
      suffix: "+",
      icon: "👥",
      description: "Довольных партнёров",
      color: 'blue' as const,
      trend: 'up' as const
    },
    {
      label: "Лет на рынке",
      value: 5,
      suffix: "+",
      icon: "⭐",
      description: "Опыт управления недвижимостью",
      color: 'purple' as const,
      trend: 'stable' as const
    }
  ];

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400/8 to-blue-500/12 blur-3xl"
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
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-purple-400/8 to-pink-500/12 blur-3xl"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-600 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            Ключевые показатели
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Цифры</span>, которые говорят сами за себя
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            Проверенные результаты и стабильная доходность для наших партнёров
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <ModernStat
              key={stat.label}
              {...stat}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-16"
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
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-2xl shadow-lg"
              >
                📊
              </motion.div>
              <div className="text-left">
                <div className="font-semibold text-foreground text-lg">Хотите узнать больше?</div>
                <div className="text-sm text-muted-foreground">Получите детальную аналитику по вашему объекту</div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <motion.a
                href="#contacts"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Получить расчёт
              </motion.a>
              
              <motion.a
                href="#portfolio"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 border border-white/30 text-foreground font-medium rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Посмотреть кейсы
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
