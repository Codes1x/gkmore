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

function ESGCard({ initiative, index }: {
  initiative: {
    title: string;
    category: string;
    icon: string;
    description: string;
    color: string;
    actions: string[];
    impact: { label: string; value: string; icon: string }[];
    achievements: string[];
  };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const colorClasses = {
    green: "from-green-400 to-emerald-500 border-green-500/30 text-green-600 bg-green-500/10",
    blue: "from-blue-400 to-cyan-500 border-blue-500/30 text-blue-600 bg-blue-500/10",
    purple: "from-purple-400 to-violet-500 border-purple-500/30 text-purple-600 bg-purple-500/10",
    orange: "from-orange-400 to-amber-500 border-orange-500/30 text-orange-600 bg-orange-500/10",
    pink: "from-pink-400 to-rose-500 border-pink-500/30 text-pink-600 bg-pink-500/10"
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
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${colorClasses[initiative.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[initiative.color as keyof typeof colorClasses].split(' ')[1]} opacity-5 group-hover:opacity-15 transition-opacity duration-500 rounded-3xl`}
          animate={isHovered ? { scale: 1.05, rotate: 1 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Floating Particles */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1.5 h-1.5 bg-gradient-to-r ${colorClasses[initiative.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[initiative.color as keyof typeof colorClasses].split(' ')[1]} opacity-40 rounded-full`}
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
        <div className="flex items-start gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.15, rotate: 15 }}
            className={`shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClasses[initiative.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[initiative.color as keyof typeof colorClasses].split(' ')[1]} flex items-center justify-center shadow-2xl`}
          >
            <span className="text-2xl">{initiative.icon}</span>
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
              className="text-xl font-bold text-foreground mb-2 leading-tight"
            >
              {initiative.title}
            </motion.h3>
            
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15 + 0.4, duration: 0.6 }}
              className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${colorClasses[initiative.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[initiative.color as keyof typeof colorClasses].split(' ')[1]} bg-opacity-20 border ${colorClasses[initiative.color as keyof typeof colorClasses].split(' ')[2]} text-xs font-medium text-foreground`}
            >
              {initiative.category}
            </motion.span>
          </div>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.15 + 0.5, duration: 0.6 }}
          className="text-sm text-muted-foreground leading-relaxed mb-6"
        >
          {initiative.description}
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.15 + 0.6, duration: 0.6 }}
          className="space-y-3 mb-6"
        >
          {initiative.actions.slice(0, isExpanded ? initiative.actions.length : 3).map((action, i) => (
            <motion.div
              key={action}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15 + 0.7 + i * 0.1, duration: 0.4 }}
              className="flex items-start gap-3 group/item"
            >
              <motion.div
                className={`w-2 h-2 bg-gradient-to-r ${colorClasses[initiative.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[initiative.color as keyof typeof colorClasses].split(' ')[1]} rounded-full mt-2 animate-pulse`}
                whileHover={{ scale: 1.5 }}
              />
              <span className="text-sm text-muted-foreground leading-relaxed group-hover/item:text-foreground transition-colors">
                {action}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Impact Metrics */}
        {initiative.impact.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15 + 0.8, duration: 0.6 }}
            className="grid grid-cols-2 gap-3 mb-6"
          >
            {initiative.impact.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.15 + 0.9 + i * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-3 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10"
              >
                <div className="text-xl mb-1">{metric.icon}</div>
                <div className={`text-lg font-bold ${colorClasses[initiative.color as keyof typeof colorClasses].split(' ')[3]}`}>
                  {metric.value}
                </div>
                <div className="text-xs text-muted-foreground">{metric.label}</div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Expandable Achievements */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {initiative.achievements.length > 0 && (
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-sm font-semibold text-foreground mb-3">Достижения:</h4>
              <div className="space-y-2">
                {initiative.achievements.map((achievement, i) => (
                  <motion.div
                    key={achievement}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isExpanded ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="flex items-start gap-2"
                  >
                    <div className={`w-1.5 h-1.5 bg-gradient-to-r ${colorClasses[initiative.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[initiative.color as keyof typeof colorClasses].split(' ')[1]} rounded-full mt-1.5`} />
                    <span className="text-xs text-muted-foreground leading-relaxed">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Expand Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 w-full py-2 px-4 rounded-xl bg-gradient-to-r from-white/5 to-white/10 border border-white/10 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {isExpanded ? 'Скрыть детали ↑' : 'Показать детали ↓'}
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

function SustainabilityMetrics() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const metrics = [
    { icon: "🌱", value: 85, suffix: "%", label: "Эко-материалы", color: "text-green-500" },
    { icon: "♻️", value: 75, suffix: "%", label: "Переработка отходов", color: "text-blue-500" },
    { icon: "💡", value: 90, suffix: "%", label: "LED-освещение", color: "text-yellow-500" },
    { icon: "🏪", value: 95, suffix: "%", label: "Местные поставщики", color: "text-purple-500" },
    { icon: "👥", value: 120, suffix: "+", label: "Рабочих мест", color: "text-orange-500" },
    { icon: "🎓", value: 25, suffix: "", label: "Образов. проектов", color: "text-pink-500" }
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
        <h3 className="text-2xl font-bold text-foreground mb-4">Показатели устойчивого развития</h3>
        <p className="text-muted-foreground">Наш вклад в экологию и развитие региона</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

function LocalImpactMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const impactAreas = [
    { name: "Сочи", type: "Центр", projects: 8, color: "bg-green-500", size: "w-16 h-16" },
    { name: "Адлер", type: "Район", projects: 5, color: "bg-blue-500", size: "w-12 h-12" },
    { name: "Красная Поляна", type: "Курорт", projects: 3, color: "bg-purple-500", size: "w-10 h-10" },
    { name: "Лазаревское", type: "Район", projects: 4, color: "bg-orange-500", size: "w-11 h-11" }
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="relative rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 p-8 shadow-2xl overflow-hidden mb-16"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-4">География воздействия</h3>
        <p className="text-muted-foreground">Локальные проекты по всему Сочи и окрестностям</p>
      </div>

      {/* Map Visualization */}
      <div className="relative h-64 bg-gradient-to-br from-blue-900/20 to-green-900/20 rounded-2xl border border-white/10 mb-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-transparent to-green-400/10"></div>
        </div>

        {/* Impact Points */}
        {impactAreas.map((area, index) => (
          <motion.div
            key={area.name}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.8 + index * 0.2, duration: 0.6, type: "spring" }}
            whileHover={{ scale: 1.2 }}
            className={`absolute ${area.size} ${area.color} rounded-full flex items-center justify-center cursor-pointer shadow-lg`}
            style={{
              left: `${20 + index * 20}%`,
              top: `${30 + (index % 2) * 40}%`,
            }}
          >
            <span className="text-white text-xs font-bold">{area.projects}</span>
            
            {/* Ripple Effect */}
            <motion.div
              className={`absolute inset-0 ${area.color} rounded-full opacity-30`}
              animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {impactAreas.map((area, index) => (
          <motion.div
            key={area.name}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
            className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
          >
            <div className={`w-4 h-4 ${area.color} rounded-full animate-pulse`} />
            <div>
              <div className="font-semibold text-foreground text-sm">{area.name}</div>
              <div className="text-xs text-muted-foreground">{area.projects} проектов</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function ModernESG() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const esgInitiatives = [
    {
      title: "Экологические практики",
      category: "Environment",
      icon: "🌱",
      description: "Комплексные меры по снижению экологического воздействия и внедрению устойчивых практик.",
      color: "green",
      actions: [
        "Сортировка отходов и переработка",
        "Эко-расходники и биоразлагаемые материалы",
        "Энергоэффективность и LED-освещение",
        "Использование возобновляемых источников энергии",
        "Программы водосбережения"
      ],
      impact: [
        { label: "CO2 сокращение", value: "35%", icon: "🌍" },
        { label: "Отходы в переработку", value: "85%", icon: "♻️" }
      ],
      achievements: [
        "Получен сертификат «Зелёный ключ»",
        "Снижение энергопотребления на 40%",
        "Партнёрство с местными экологическими организациями"
      ]
    },
    {
      title: "Локальные поставщики",
      category: "Social",
      icon: "🏪",
      description: "Приоритетное сотрудничество с местными поставщиками и поддержка региональной экономики.",
      color: "blue",
      actions: [
        "Приоритет местным поставщикам продуктов",
        "Трудоустройство жителей Сочи",
        "Поддержка малого бизнеса региона",
        "Программы развития местных кадров",
        "Инвестиции в региональную инфраструктуру"
      ],
      impact: [
        { label: "Местных поставщиков", value: "95%", icon: "🏪" },
        { label: "Рабочих мест", value: "120+", icon: "👥" }
      ],
      achievements: [
        "Создано 120+ рабочих мест для местных жителей",
        "Сотрудничество с 50+ местными поставщиками",
        "Инвестировано 15 млн руб в развитие региона"
      ]
    },
    {
      title: "Социальные инициативы",
      category: "Social",
      icon: "🤝",
      description: "Активное участие в социальных проектах и поддержка местного сообщества.",
      color: "purple",
      actions: [
        "Благотворительные программы",
        "Волонтёрские акции сотрудников",
        "Образовательные проекты для молодёжи",
        "Поддержка культурных мероприятий",
        "Программы для людей с ограниченными возможностями"
      ],
      impact: [
        { label: "Благотвор. проектов", value: "15", icon: "💝" },
        { label: "Участников программ", value: "500+", icon: "👨‍👩‍👧‍👦" }
      ],
      achievements: [
        "Проведено 15 благотворительных акций",
        "Поддержано 25 образовательных проектов",
        "Организовано 30 волонтёрских мероприятий"
      ]
    }
  ];

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-green-400/8 to-emerald-500/12 blur-3xl"
          animate={{
            x: [0, 150, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ left: '3%', top: '5%' }}
        />
        
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-blue-400/8 to-cyan-500/12 blur-3xl"
          animate={{
            x: [0, -140, 0],
            y: [0, 120, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ right: '3%', bottom: '8%' }}
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
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Устойчивое развитие
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">ESG</span> и локальная повестка
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            Мы несём ответственность за экологию, поддерживаем местное сообщество 
            и развиваем регион через устойчивые бизнес-практики.
          </motion.p>
        </motion.div>

        {/* Sustainability Metrics */}
        <SustainabilityMetrics />

        {/* ESG Initiatives Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid lg:grid-cols-3 gap-8 mb-16"
        >
          {esgInitiatives.map((initiative, index) => (
            <ESGCard key={initiative.title} initiative={initiative} index={index} />
          ))}
        </motion.div>

        {/* Local Impact Map */}
        <LocalImpactMap />

        {/* Future Goals Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 p-8 sm:p-12 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Цели на 2025-2030
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Наши амбициозные планы по развитию устойчивого туризма и 
              поддержке локального сообщества в ближайшие годы.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🎯", title: "Углеродная нейтральность", desc: "К 2028 году", color: "text-green-500" },
              { icon: "🌊", title: "Zero Waste", desc: "100% переработка отходов", color: "text-blue-500" },
              { icon: "🏘️", title: "500+ рабочих мест", desc: "Для местных жителей", color: "text-purple-500" },
              { icon: "🎓", title: "50 стипендий", desc: "Для студентов региона", color: "text-orange-500" }
            ].map((goal, index) => (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 2.4 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{goal.icon}</div>
                <h4 className={`font-bold text-lg mb-2 ${goal.color}`}>{goal.title}</h4>
                <p className="text-sm text-muted-foreground">{goal.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
