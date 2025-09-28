"use client";

import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";

type CompanyCardProps = {
  name: string;
  description: string;
  icon: string;
  stats: { label: string; value: string }[];
  color: 'cyan' | 'blue';
  delay?: number;
};

function CompanyCard({ name, description, icon, stats, color, delay = 0 }: CompanyCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
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
    }
  };

  const colors = colorClasses[color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: delay * 0.2,
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3 } 
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${colors.bg} backdrop-blur-xl border ${colors.border} shadow-lg hover:shadow-2xl ${colors.glow} transition-all duration-500`}
    >
      {/* Background Glow */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
        animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 bg-gradient-to-r ${colors.gradient} rounded-full opacity-30`}
            animate={{
              x: [0, 25, 0],
              y: [0, -15, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.7
            }}
            style={{
              left: `${20 + i * 25}%`,
              top: `${15 + i * 20}%`
            }}
          />
        ))}
      </div>

      <div className="relative p-6 sm:p-8">
        {/* Header with Icon */}
        <div className="flex items-start gap-4 mb-6">
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={inView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: delay * 0.2 + 0.3, duration: 0.6, type: "spring" }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.iconBg} flex items-center justify-center text-white text-2xl shadow-lg relative`}
          >
            {icon}
            
            {/* Icon Glow */}
            <motion.div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300`}
              animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
            />
          </motion.div>

          <div className="flex-1">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: delay * 0.2 + 0.5, duration: 0.5 }}
              className="text-xl font-bold text-foreground group-hover:text-foreground/90 transition-colors"
            >
              {name}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: delay * 0.2 + 0.7, duration: 0.5 }}
              className="text-muted-foreground text-sm mt-1 group-hover:text-muted-foreground/80 transition-colors"
            >
              {description}
            </motion.p>
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: delay * 0.2 + 0.9, duration: 0.5 }}
          className="grid grid-cols-2 gap-3"
        >
          {stats.map((stat, index) => (
            <div key={index} className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</div>
              <div className="text-sm font-semibold text-foreground mt-1">{stat.value}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-all duration-1000"
        style={{ width: '50%' }}
      />
    </motion.div>
  );
}

function AnimatedCounter({ target, suffix = "", duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 100, damping: 30 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, target, { duration, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [inView, motionValue, target, duration]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return () => unsubscribe();
  }, [springValue]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
}

export function ModernAbout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const companies = [
    {
      name: "Sea Family Resort & Spa",
      description: "Премиальный отель на первой линии",
      icon: "🏖️",
      color: 'cyan' as const,
      stats: [
        { label: "Номеров", value: "122" },
        { label: "ADR", value: "10,114 ₽" },
        { label: "RevPAR", value: "8,053 ₽" },
        { label: "Рейтинг", value: "9.4" }
      ]
    },
    {
      name: "Лучезарный Резорт",
      description: "Бутик-отель с апартаментами",
      icon: "🏢",
      color: 'blue' as const,
      stats: [
        { label: "Номеров", value: "38" },
        { label: "ADR", value: "18,861 ₽" },
        { label: "RevPAR", value: "16,352 ₽" },
        { label: "Рейтинг", value: "9.2" }
      ]
    }
  ];

  const achievements = [
    { label: "Номеров в управлении", value: 160, suffix: "+" },
    { label: "Лет на рынке", value: 5, suffix: "+" },
    { label: "Сотрудников", value: 50, suffix: "+" },
    { label: "Отток собственников", value: 0, suffix: "%" }
  ];

  return (
    <section className="relative py-12 sm:py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-cyan-400/8 to-blue-500/12 blur-3xl"
          animate={{
            x: [0, 80, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ left: '15%', top: '20%' }}
        />
        
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-blue-400/8 to-indigo-500/12 blur-3xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ right: '20%', bottom: '25%' }}
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
            О группе компаний
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Кто <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">мы</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            «Группа Компаний Море» — надёжный партнёр для собственников недвижимости у моря. 
            Мы создаём единую сеть качественного гостевого сервиса, которому доверяют и который рекомендуют.
          </motion.p>
        </motion.div>

        {/* Companies Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-8 mb-16"
        >
          {companies.map((company, index) => (
            <CompanyCard
              key={company.name}
              name={company.name}
              description={company.description}
              icon={company.icon}
              stats={company.stats}
              color={company.color}
              delay={index}
            />
          ))}
        </motion.div>

        {/* Mission & Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start mb-16"
        >
          {/* Mission */}
          <div className="space-y-6">
            <div>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="text-2xl font-bold text-foreground mb-4"
              >
                Наша миссия
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="text-muted-foreground leading-relaxed text-lg"
              >
                Стать партнёром №1 для собственников, обеспечивая стабильную доходность, 
                прозрачность управления и высокий стандарт сервиса для гостей.
              </motion.p>
            </div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="space-y-4"
            >
              {[
                { icon: "🔍", title: "Прозрачность", desc: "Ежемесячная отчётность, понятные показатели" },
                { icon: "💻", title: "Технологии", desc: "Личный кабинет, удалённый мониторинг, динамические цены" },
                { icon: "🛟", title: "Поддержка 24/7", desc: "Оперативная реакция и забота о гостях" }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 2 + index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-lg shadow-lg">
                    {value.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{value.title}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{value.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="rounded-3xl bg-gradient-to-br from-cyan-500/5 to-blue-500/10 backdrop-blur-xl border border-cyan-500/20 p-8 shadow-xl"
          >
            <h3 className="text-xl font-bold text-foreground mb-6 text-center">Наши достижения</h3>
            
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.8 + index * 0.1, duration: 0.6 }}
                  className="text-center p-4 rounded-2xl bg-white/5 border border-white/10"
                >
                  <div className="text-3xl font-bold text-foreground mb-2">
                    <AnimatedCounter target={achievement.value} suffix={achievement.suffix} />
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">{achievement.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-6 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xl">
                📋
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">Узнайте больше о группе</div>
                <div className="text-sm text-muted-foreground">Детальная информация о наших отелях и услугах</div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <motion.a
                href="/about"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Подробнее о группе
              </motion.a>
              
              <motion.a
                href="/model"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 border border-white/30 text-foreground font-medium rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Модель сотрудничества
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
