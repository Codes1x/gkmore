"use client";

import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";

function AnimatedPercentage({ value, delay = 0 }: { value: number; delay?: number }) {
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

  return <span ref={ref}>{displayValue}%</span>;
}

function ServiceCard({ title, description, icon, delay = 0 }: {
  title: string;
  description: string;
  icon: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 p-4 hover:border-white/20 transition-all duration-300"
    >
      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative flex items-center gap-3">
        <motion.div
          whileHover={{ rotate: 5, scale: 1.1 }}
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-lg shadow-lg"
        >
          {icon}
        </motion.div>
        <div>
          <h4 className="font-semibold text-foreground text-sm">{title}</h4>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function ModernModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const [selectedTab, setSelectedTab] = useState<'formula' | 'calculator'>('formula');

  const services = [
    { title: "Маркетинг и продажи", description: "OTA, прямые, корпоративные", icon: "📈" },
    { title: "Ресепшн и клининг", description: "Регламенты, стандарты", icon: "🛎️" },
    { title: "Техобслуживание", description: "Снабжение, ремонт", icon: "🔧" },
    { title: "Ценообразование", description: "Динамика, аналитика", icon: "💰" }
  ];

  const conditions = [
    { icon: "💸", title: "Расходы до распределения", desc: "Коммуналка, мелкий ремонт, расходники" },
    { icon: "📋", title: "Срок договора", desc: "Минимум 11 месяцев, расторжение за 3 месяца" },
    { icon: "⏰", title: "KPI/SLA", desc: "Выплаты до 30 числа, реагирование 24/7" }
  ];

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-green-400/8 to-emerald-500/12 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ left: '10%', top: '15%' }}
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
          style={{ right: '15%', bottom: '20%' }}
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 text-green-600 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Модель сотрудничества
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Ревшара <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">35%</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Прозрачная и выгодная схема распределения доходов для собственников недвижимости
          </motion.p>
        </motion.div>

        {/* Formula Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-16"
        >
          {/* Interactive Formula */}
          <div className="relative rounded-3xl bg-gradient-to-br from-green-500/5 to-emerald-500/10 backdrop-blur-xl border border-green-500/20 p-8 sm:p-12 shadow-2xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-transparent to-emerald-500/20"></div>
            </div>

            <div className="relative text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-2xl sm:text-3xl font-bold text-foreground mb-8"
              >
                Формула распределения
              </motion.div>

              {/* Animated Formula */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xl sm:text-2xl font-semibold mb-8"
              >
                <div className="flex items-center gap-2">
                  <span className="text-foreground">Выручка</span>
                  <span className="text-muted-foreground">−</span>
                  <span className="text-foreground">Расходы</span>
                  <span className="text-muted-foreground">=</span>
                  <span className="text-green-600">Прибыль</span>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.8, duration: 0.6 }}
                  className="text-muted-foreground text-lg"
                >
                  →
                </motion.div>
              </motion.div>

              {/* Percentage Split */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 2, duration: 0.8 }}
                className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
              >
                {/* Owner Share */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-400/10 to-emerald-500/20 border border-green-500/30 p-8 shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative text-center">
                    <div className="text-4xl sm:text-5xl font-bold text-green-600 mb-2">
                      <AnimatedPercentage value={65} delay={2.2} />
                    </div>
                    <div className="text-lg font-semibold text-foreground">Собственнику</div>
                    <div className="text-sm text-muted-foreground mt-1">Ваша доля</div>
                  </div>
                </motion.div>

                {/* Operator Share */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-400/10 to-blue-500/20 border border-cyan-500/30 p-8 shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative text-center">
                    <div className="text-4xl sm:text-5xl font-bold text-cyan-600 mb-2">
                      <AnimatedPercentage value={35} delay={2.4} />
                    </div>
                    <div className="text-lg font-semibold text-foreground">Оператору</div>
                    <div className="text-sm text-muted-foreground mt-1">Наша комиссия</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Details Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 mb-16"
        >
          {/* What's Included */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">Что включено в комиссию 35%</h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <ServiceCard
                    key={service.title}
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                    delay={index}
                  />
                ))}
              </div>
            </motion.div>

            {/* Key Conditions */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">Ключевые условия</h3>
              
              <div className="space-y-4">
                {conditions.map((condition, index) => (
                  <motion.div
                    key={condition.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 2 + index * 0.1, duration: 0.5 }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-lg shadow-lg">
                      {condition.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{condition.title}</h4>
                      <p className="text-muted-foreground text-sm mt-1">{condition.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Benefits & Guarantees */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="space-y-8"
          >
            {/* Guarantees */}
            <div className="rounded-3xl bg-gradient-to-br from-cyan-500/5 to-blue-500/10 backdrop-blur-xl border border-cyan-500/20 p-8 shadow-xl">
              <h3 className="text-xl font-bold text-foreground mb-6">Наши гарантии</h3>
              
              <div className="space-y-4">
                {[
                  { icon: "💰", title: "Выплаты до 30 числа", desc: "Строго в срок каждый месяц" },
                  { icon: "📞", title: "Реакция 24/7", desc: "Круглосуточная поддержка" },
                  { icon: "📊", title: "Прозрачная отчётность", desc: "Детальные ежемесячные отчёты" }
                ].map((guarantee, index) => (
                  <motion.div
                    key={guarantee.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 2.2 + index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white shadow-lg">
                      {guarantee.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">{guarantee.title}</div>
                      <div className="text-xs text-muted-foreground">{guarantee.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Why 35% */}
            <div className="rounded-3xl bg-gradient-to-br from-green-500/5 to-emerald-500/10 backdrop-blur-xl border border-green-500/20 p-8 shadow-xl">
              <h3 className="text-xl font-bold text-foreground mb-4">Почему именно 35%?</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Наша комиссия покрывает все операционные расходы и обеспечивает высокое качество сервиса. 
                При этом вы получаете больше прибыли, чем при самостоятельном управлении.
              </p>
              <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Оптимальное соотношение цена/качество
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-6 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-xl">
                🧮
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">Получите персональный расчёт</div>
                <div className="text-sm text-muted-foreground">Узнайте точную прибыль для вашего объекта</div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <motion.a
                href="/contacts"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Получить расчёт
              </motion.a>
              
              <motion.a
                href="/model"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 border border-white/30 text-foreground font-medium rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Подробнее
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
