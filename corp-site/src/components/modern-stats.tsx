"use client";

import { motion, useInView, useMotionValue, animate, useMotionValueEvent } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type ModernStatProps = {
  label: string;
  value: number;
  max?: number;
  suffix?: string;
  icon?: string;
  description?: string;
  color?: 'cyan' | 'blue' | 'purple' | 'green';
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
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const progress = useMotionValue(0);
  const count = useMotionValue(0);
  const [display, setDisplay] = useState<number>(0);
  const pct = useMemo(() => (value / max) * 100, [value, max]);

  useEffect(() => {
    if (inView) {
      progress.set(pct);
      const controls = animate(count, value, { 
        duration: 2, 
        ease: [0.25, 0.1, 0.25, 1] 
      });
      return () => controls.stop();
    }
  }, [inView, pct, progress, count, value]);

  useMotionValueEvent(count, "change", (v) => {
    const next = max === 10 ? Math.round(v * 10) / 10 : Math.round(v);
    setDisplay(next);
  });

  const colorClasses = {
    cyan: {
      gradient: 'from-cyan-400 to-blue-500',
      bg: 'from-cyan-500/10 to-blue-500/10',
      border: 'border-cyan-500/20',
      glow: 'shadow-cyan-500/20',
      text: 'text-cyan-400'
    },
    blue: {
      gradient: 'from-blue-400 to-indigo-500',
      bg: 'from-blue-500/10 to-indigo-500/10',
      border: 'border-blue-500/20',
      glow: 'shadow-blue-500/20',
      text: 'text-blue-400'
    },
    purple: {
      gradient: 'from-purple-400 to-pink-500',
      bg: 'from-purple-500/10 to-pink-500/10',
      border: 'border-purple-500/20',
      glow: 'shadow-purple-500/20',
      text: 'text-purple-400'
    },
    green: {
      gradient: 'from-green-400 to-emerald-500',
      bg: 'from-green-500/10 to-emerald-500/10',
      border: 'border-green-500/20',
      glow: 'shadow-green-500/20',
      text: 'text-green-400'
    }
  };

  const colors = colorClasses[color];
  const size = 140;
  const stroke = 8;


  const TrendIcon = () => {
    if (trend === 'up') {
      return (
        <motion.svg 
          className="w-4 h-4 text-green-400"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          initial={{ y: 2, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </motion.svg>
      );
    }
    if (trend === 'down') {
      return (
        <motion.svg 
          className="w-4 h-4 text-red-400"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          initial={{ y: -2, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </motion.svg>
      );
    }
    return (
      <motion.div 
        className="w-2 h-2 bg-gray-400 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 0.5 }}
      />
    );
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.2 
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3 } 
      }}
      className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${colors.bg} backdrop-blur-xl border ${colors.border} shadow-xl hover:shadow-2xl ${colors.glow} transition-all duration-500`}
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 bg-gradient-to-r ${colors.gradient} rounded-full opacity-60`}
            animate={{
              x: [0, 20, 0],
              y: [0, -15, 0],
              opacity: [0.6, 0.2, 0.6]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`
            }}
          />
        ))}
      </div>

      <div className="relative p-6 sm:p-8">
        {/* Header with Icon and Trend */}
        <div className="flex items-center justify-between mb-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={inView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white text-xl shadow-lg`}
          >
            {icon}
          </motion.div>
          <TrendIcon />
        </div>

        {/* Main Number */}
        <div className="mb-4">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-foreground mb-1"
          >
            {display}{suffix}
          </motion.div>
          
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-lg font-semibold text-foreground/80"
          >
            {label}
          </motion.h3>
          
          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="text-sm text-muted-foreground mt-2"
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Progress Ring */}
        <div className="relative">
          <svg 
            width={size} 
            height={size/3} 
            viewBox={`0 0 ${size} ${size/3}`} 
            className="w-full"
          >
            {/* Background track */}
            <motion.path
              d={`M ${stroke/2} ${size/6} Q ${size/2} ${size/4} ${size - stroke/2} ${size/6}`}
              stroke="currentColor"
              strokeWidth={stroke}
              fill="none"
              className="text-border opacity-30"
              strokeLinecap="round"
            />
            
            {/* Animated progress */}
            <motion.path
              d={`M ${stroke/2} ${size/6} Q ${size/2} ${size/4} ${size - stroke/2} ${size/6}`}
              stroke="url(#gradient)"
              strokeWidth={stroke}
              fill="none"
              strokeLinecap="round"
              strokeDasharray="200 200"
              initial={{ strokeDashoffset: 200 }}
              animate={inView ? { strokeDashoffset: 200 - (pct * 2) } : {}}
              transition={{ delay: 1.5, duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
              className="drop-shadow-sm"
            />
            
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className={colors.text} />
                <stop offset="100%" className={colors.text.replace('400', '600')} />
              </linearGradient>
            </defs>
          </svg>

          {/* Progress Percentage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 2, duration: 0.5 }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2"
          >
            <span className={`text-xs font-medium ${colors.text} bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full border border-border/50`}>
              {Math.round(pct)}%
            </span>
          </motion.div>
        </div>
      </div>

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-all duration-1000"
        style={{ width: '50%' }}
      />
    </motion.div>
  );
}

export function ModernStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-500/10 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ left: '10%', top: '20%' }}
        />
        
        <motion.div
          className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-purple-400/10 to-pink-500/10 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ right: '15%', bottom: '30%' }}
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
            Наши <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">результаты</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Цифры, которые говорят о нашем профессионализме и стабильности работы
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <ModernStat
            icon="📊"
            label="Загрузка за 12 мес"
            value={78}
            suffix="%"
            description="Средняя загрузка всех объектов в портфеле"
            color="cyan"
            trend="up"
          />
          
          <ModernStat
            icon="💰"
            label="RevPAR год к году"
            value={15}
            suffix="%"
            description="Рост доходности на номер по сравнению с прошлым годом"
            color="green"
            trend="up"
          />
          
          <ModernStat
            icon="⭐"
            label="Рейтинг на Booking"
            value={9.4}
            max={10}
            description="Средний рейтинг всех наших отелей на Booking.com"
            color="purple"
            trend="stable"
          />
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 px-8 py-4 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-foreground">Данные обновляются в реальном времени</span>
            </div>
            <div className="w-px h-4 bg-border"></div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-foreground">Проверено и подтверждено</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
