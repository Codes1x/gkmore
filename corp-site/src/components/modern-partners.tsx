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

function PartnerCard({ partner, index }: {
  partner: {
    name: string;
    type: string;
    logo: string;
    description: string;
    color: string;
    stats: { label: string; value: string }[];
    benefits: string[];
  };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    blue: "from-blue-400 to-cyan-500 border-blue-500/30 text-blue-600 bg-blue-500/10",
    green: "from-green-400 to-emerald-500 border-green-500/30 text-green-600 bg-green-500/10",
    purple: "from-purple-400 to-violet-500 border-purple-500/30 text-purple-600 bg-purple-500/10",
    orange: "from-orange-400 to-red-500 border-orange-500/30 text-orange-600 bg-orange-500/10",
    pink: "from-pink-400 to-rose-500 border-pink-500/30 text-pink-600 bg-pink-500/10"
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 shadow-xl hover:border-white/20 transition-all duration-500"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${colorClasses[partner.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[partner.color as keyof typeof colorClasses].split(' ')[1]} opacity-5 group-hover:opacity-12 transition-opacity duration-500 rounded-3xl`}
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Floating Particles */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1.5 h-1.5 bg-gradient-to-r ${colorClasses[partner.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[partner.color as keyof typeof colorClasses].split(' ')[1]} opacity-30 rounded-full`}
            animate={{
              x: [0, 20, 0],
              y: [0, -15, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${20 + i * 25}%`,
              top: `${15 + i * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${colorClasses[partner.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[partner.color as keyof typeof colorClasses].split(' ')[1]} flex items-center justify-center shadow-lg`}
          >
            <span className="text-xl">{partner.logo}</span>
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
              className="text-lg font-bold text-foreground mb-1 leading-tight"
            >
              {partner.name}
            </motion.h3>
            
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
              className={`inline-block px-2 py-1 rounded-lg ${colorClasses[partner.color as keyof typeof colorClasses].split(' ')[4]} border ${colorClasses[partner.color as keyof typeof colorClasses].split(' ')[2]} text-xs font-medium`}
            >
              {partner.type}
            </motion.span>
          </div>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
          className="text-sm text-muted-foreground leading-relaxed mb-4"
        >
          {partner.description}
        </motion.p>

        {/* Stats */}
        {partner.stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1 + 0.6, duration: 0.6 }}
            className="grid grid-cols-2 gap-3 mb-4"
          >
            {partner.stats.map((stat) => (
              <div key={stat.label} className="text-center p-2 rounded-lg bg-white/5 border border-white/10">
                <div className={`text-lg font-bold ${colorClasses[partner.color as keyof typeof colorClasses].split(' ')[3]}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.7, duration: 0.6 }}
          className="space-y-2"
        >
          {partner.benefits.map((benefit, i) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.8 + i * 0.1, duration: 0.4 }}
              className="flex items-start gap-2"
            >
              <div className={`w-1.5 h-1.5 bg-gradient-to-r ${colorClasses[partner.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[partner.color as keyof typeof colorClasses].split(' ')[1]} rounded-full mt-1.5 animate-pulse`} />
              <span className="text-xs text-muted-foreground leading-relaxed">{benefit}</span>
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

function TrustIndicators() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const indicators = [
    { icon: "🏆", value: 15, suffix: "+", label: "Лет на рынке", color: "text-yellow-500" },
    { icon: "🤝", value: 250, suffix: "+", label: "Партнёров", color: "text-blue-500" },
    { icon: "📜", value: 12, suffix: "", label: "Сертификатов", color: "text-green-500" },
    { icon: "⭐", value: 98, suffix: "%", label: "Надёжность", color: "text-purple-500" }
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
        <h3 className="text-2xl font-bold text-foreground mb-4">Показатели доверия</h3>
        <p className="text-muted-foreground">Цифры, которые говорят о нашей надёжности</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {indicators.map((indicator, index) => (
          <motion.div
            key={indicator.label}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.6, type: "spring" }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="text-4xl mb-4">{indicator.icon}</div>
            <h4 className={`font-bold text-3xl mb-2 ${indicator.color}`}>
              <AnimatedCounter 
                value={indicator.value} 
                delay={0.8 + index * 0.1} 
                suffix={indicator.suffix} 
              />
            </h4>
            <p className="text-sm text-muted-foreground">{indicator.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function CertificationGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const certifications = [
    { name: "ISO 9001", description: "Система менеджмента качества", icon: "🏅", color: "blue" },
    { name: "Ростуризм", description: "Реестр туроператоров", icon: "🛡️", color: "green" },
    { name: "АТОР", description: "Член ассоциации", icon: "🤝", color: "purple" },
    { name: "Банк-гарант", description: "Финансовые гарантии", icon: "🏦", color: "orange" },
    { name: "Страхование", description: "Полное покрытие рисков", icon: "☂️", color: "pink" },
    { name: "Лицензия УК", description: "Управление недвижимостью", icon: "📋", color: "blue" }
  ];

  const colorClasses = {
    blue: "from-blue-400 to-cyan-500 border-blue-500/30 text-blue-600",
    green: "from-green-400 to-emerald-500 border-green-500/30 text-green-600",
    purple: "from-purple-400 to-violet-500 border-purple-500/30 text-purple-600",
    orange: "from-orange-400 to-red-500 border-orange-500/30 text-orange-600",
    pink: "from-pink-400 to-rose-500 border-pink-500/30 text-pink-600"
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="mb-16"
    >
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-foreground mb-4">Сертификации и лицензии</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Все необходимые документы и аккредитации для безопасной и законной деятельности
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.6, type: "spring" }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 shadow-lg hover:border-white/20 transition-all duration-300"
          >
            <div className="p-6 text-center">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClasses[cert.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[cert.color as keyof typeof colorClasses].split(' ')[1]} items-center justify-center mb-4 shadow-lg`}
              >
                <span className="text-2xl">{cert.icon}</span>
              </motion.div>
              
              <h4 className="font-bold text-foreground mb-2">{cert.name}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{cert.description}</p>
            </div>

            {/* Hover Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ transform: 'skewX(-20deg)' }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function ModernPartners() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const partners = [
    {
      name: "Застройщики ЖК",
      type: "Девелопмент",
      logo: "🏗️",
      description: "Прямые договоры с застройщиками крупных жилых комплексов для управления апартаментами.",
      color: "blue",
      stats: [
        { label: "Объектов", value: "45+" },
        { label: "ЖК", value: "12" }
      ],
      benefits: [
        "Прямые контракты без посредников",
        "Льготные условия аренды",
        "Приоритет в новых проектах"
      ]
    },
    {
      name: "Банковские партнёры",
      type: "Финансы",
      logo: "🏦",
      description: "Сотрудничество с ведущими банками для ипотечных программ и корпоративного обслуживания.",
      color: "green",
      stats: [
        { label: "Банков", value: "8" },
        { label: "Программ", value: "25+" }
      ],
      benefits: [
        "Льготные ипотечные ставки",
        "Корпоративные программы",
        "Быстрое одобрение заявок"
      ]
    },
    {
      name: "Сервисные компании",
      type: "Услуги",
      logo: "🛠️",
      description: "Проверенные поставщики клининга, ремонта и технического обслуживания.",
      color: "purple",
      stats: [
        { label: "Поставщиков", value: "35+" },
        { label: "Услуг", value: "150+" }
      ],
      benefits: [
        "Фиксированные цены",
        "Гарантия качества услуг",
        "Круглосуточная поддержка"
      ]
    },
    {
      name: "Страховые компании",
      type: "Страхование",
      logo: "☂️",
      description: "Комплексное страхование имущества и ответственности для всех участников.",
      color: "orange",
      stats: [
        { label: "Покрытие", value: "100%" },
        { label: "Компаний", value: "5" }
      ],
      benefits: [
        "Полное покрытие рисков",
        "Быстрые выплаты",
        "Специальные тарифы"
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
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-indigo-400/8 to-purple-500/12 blur-3xl"
          animate={{
            x: [0, 130, 0],
            y: [0, -70, 0],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ left: '8%', top: '10%' }}
        />
        
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-blue-400/8 to-cyan-500/12 blur-3xl"
          animate={{
            x: [0, -110, 0],
            y: [0, 90, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ right: '5%', bottom: '15%' }}
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
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
            Партнёрства и доверие
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            <span className="bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">Надёжные</span> партнёрства
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            Мы работаем только с проверенными партнёрами и имеем все необходимые 
            лицензии и сертификаты для безопасного ведения бизнеса.
          </motion.p>
        </motion.div>

        {/* Trust Indicators */}
        <TrustIndicators />

        {/* Partners Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {partners.map((partner, index) => (
            <PartnerCard key={partner.name} partner={partner} index={index} />
          ))}
        </motion.div>

        {/* Certifications */}
        <CertificationGrid />

        {/* Security & Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 p-8 sm:p-12 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Безопасность и соответствие
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Все процессы соответствуют российскому законодательству. 
              Средства клиентов защищены, договоры прозрачны.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🔐", title: "Защита данных", desc: "Соответствие 152-ФЗ", color: "text-blue-500" },
              { icon: "📄", title: "Юр. чистота", desc: "Все договоры проверены", color: "text-green-500" },
              { icon: "💰", title: "Фин. гарантии", desc: "Страхование и резервы", color: "text-purple-500" },
              { icon: "⚖️", title: "Соответствие", desc: "Все требования закона", color: "text-orange-500" }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 2.4 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className={`font-bold text-lg mb-2 ${item.color}`}>{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
