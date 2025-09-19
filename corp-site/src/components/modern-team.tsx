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

function TeamMemberCard({ member, index }: {
  member: {
    name: string;
    role: string;
    quote: string;
    initials: string;
    color: string;
    experience: string;
    achievements: string[];
    expertise: string[];
  };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

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
      initial={{ opacity: 0, y: 60, scale: 0.8 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2, type: "spring" }}
      whileHover={{ y: -15, scale: 1.03 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 shadow-2xl hover:border-white/20 transition-all duration-500 cursor-pointer"
      onClick={() => setShowDetails(!showDetails)}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${colorClasses[member.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[member.color as keyof typeof colorClasses].split(' ')[1]} opacity-5 group-hover:opacity-15 transition-opacity duration-500 rounded-3xl`}
          animate={isHovered ? { scale: 1.05, rotate: 1 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Floating Particles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 bg-gradient-to-r ${colorClasses[member.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[member.color as keyof typeof colorClasses].split(' ')[1]} opacity-40 rounded-full`}
            animate={{
              x: [0, 30, 0],
              y: [0, -25, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${10 + i * 12}%`,
            }}
          />
        ))}
      </div>

      <div className="relative p-8">
        {/* Header with Avatar */}
        <div className="flex items-start gap-6 mb-6">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`relative shrink-0 w-20 h-20 rounded-3xl bg-gradient-to-br ${colorClasses[member.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[member.color as keyof typeof colorClasses].split(' ')[1]} flex items-center justify-center shadow-2xl border-2 border-white/20`}
          >
            <span className="text-2xl font-bold text-white">{member.initials}</span>
            
            {/* Status Indicator */}
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2 + 0.3, duration: 0.6 }}
              className="text-xl font-bold text-foreground mb-2 leading-tight"
            >
              {member.name}
            </motion.h3>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2 + 0.4, duration: 0.6 }}
              className="flex flex-col gap-2"
            >
              <span className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${colorClasses[member.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[member.color as keyof typeof colorClasses].split(' ')[1]} bg-opacity-20 border ${colorClasses[member.color as keyof typeof colorClasses].split(' ')[2]} text-xs font-medium text-foreground`}>
                {member.role}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                {member.experience} опыта
              </span>
            </motion.div>
          </div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.2 + 0.5, duration: 0.6 }}
          className="relative mb-6"
        >
          <div className="absolute -left-2 -top-2 text-4xl text-muted-foreground/20 font-serif">&ldquo;</div>
          <p className="text-sm text-muted-foreground leading-relaxed italic pl-6">
            {member.quote}
          </p>
          <div className="absolute -right-2 -bottom-2 text-4xl text-muted-foreground/20 font-serif">&rdquo;</div>
        </motion.div>

        {/* Expertise Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.2 + 0.6, duration: 0.6 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {member.expertise.slice(0, 3).map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.2 + 0.7 + i * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className={`px-2 py-1 text-xs rounded-full ${colorClasses[member.color as keyof typeof colorClasses].split(' ')[4]} border ${colorClasses[member.color as keyof typeof colorClasses].split(' ')[2]} text-foreground/80`}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        {/* Expandable Details */}
        <motion.div
          initial={false}
          animate={{ height: showDetails ? 'auto' : 0, opacity: showDetails ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-white/10">
            <h4 className="text-sm font-semibold text-foreground mb-3">Ключевые достижения:</h4>
            <div className="space-y-2">
              {member.achievements.map((achievement, i) => (
                <motion.div
                  key={achievement}
                  initial={{ opacity: 0, x: -20 }}
                  animate={showDetails ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-start gap-2"
                >
                  <div className={`w-1.5 h-1.5 bg-gradient-to-r ${colorClasses[member.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[member.color as keyof typeof colorClasses].split(' ')[1]} rounded-full mt-2 animate-pulse`} />
                  <span className="text-xs text-muted-foreground leading-relaxed">{achievement}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Expand Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 w-full py-2 px-4 rounded-xl bg-gradient-to-r from-white/5 to-white/10 border border-white/10 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {showDetails ? 'Скрыть детали ↑' : 'Показать детали ↓'}
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

function TeamStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const stats = [
    { icon: "👥", value: 45, suffix: "+", label: "Сотрудников", color: "text-blue-500" },
    { icon: "🎯", value: 15, suffix: "+", label: "Лет опыта", color: "text-green-500" },
    { icon: "🏆", value: 250, suffix: "+", label: "Объектов", color: "text-purple-500" },
    { icon: "⭐", value: 98, suffix: "%", label: "Удовлетворённость", color: "text-orange-500" }
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 p-8 shadow-2xl overflow-hidden mb-16"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-transparent to-blue-500/20"></div>
      </div>

      <div className="relative">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">Наша команда в цифрах</h3>
          <p className="text-muted-foreground">Профессионалы с многолетним опытом в управлении недвижимостью</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <h4 className={`font-bold text-3xl mb-2 ${stat.color}`}>
                <AnimatedCounter 
                  value={stat.value} 
                  delay={0.8 + index * 0.1} 
                  suffix={stat.suffix} 
                />
              </h4>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function OrganizationChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const orgStructure = [
    { level: 1, title: "Управляющий директор", count: 1, color: "bg-blue-500" },
    { level: 2, title: "Директора департаментов", count: 3, color: "bg-green-500" },
    { level: 3, title: "Менеджеры проектов", count: 8, color: "bg-purple-500" },
    { level: 4, title: "Специалисты", count: 33, color: "bg-orange-500" }
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
        <h3 className="text-2xl font-bold text-foreground mb-4">Структура команды</h3>
        <p className="text-muted-foreground">Четкая иерархия и распределение ответственности</p>
      </div>

      <div className="space-y-6">
        {orgStructure.map((level, index) => (
          <motion.div
            key={level.level}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-3">
              <motion.div
                className={`w-4 h-4 rounded-full ${level.color}`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              />
              <span className="text-sm font-medium text-foreground min-w-[200px]">
                {level.title}
              </span>
            </div>
            
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${level.color} rounded-full`}
                initial={{ width: 0 }}
                animate={inView ? { width: `${(level.count / 45) * 100}%` } : {}}
                transition={{ delay: 1 + index * 0.2, duration: 1, ease: "easeOut" }}
              />
            </div>
            
            <span className="text-sm font-bold text-foreground min-w-[40px] text-right">
              {level.count}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function ModernTeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const teamMembers = [
    {
      name: "Иван Петров",
      role: "Управляющий директор",
      quote: "Фокус на доходности и прозрачности для собственников.",
      initials: "ИП",
      color: "blue",
      experience: "15+ лет",
      achievements: [
        "Увеличил доходность портфеля на 40% за 3 года",
        "Запустил систему прозрачной отчетности",
        "Масштабировал команду с 15 до 45 специалистов"
      ],
      expertise: ["Стратегическое планирование", "Финансовое управление", "Развитие бизнеса"]
    },
    {
      name: "Анна Смирнова",
      role: "Директор по операциям",
      quote: "Стандарты сервиса и контроль качества — ежедневно.",
      initials: "АС",
      color: "green",
      experience: "12+ лет",
      achievements: [
        "Внедрила единые стандарты обслуживания",
        "Повысила рейтинг гостей до 4.9/5",
        "Оптимизировала операционные процессы на 30%"
      ],
      expertise: ["Операционное управление", "Контроль качества", "Стандартизация"]
    },
    {
      name: "Сергей Иванов",
      role: "Коммерческий директор",
      quote: "Мультиканальные продажи и динамические цены.",
      initials: "СИ",
      color: "purple",
      experience: "10+ лет",
      achievements: [
        "Запустил систему динамического ценообразования",
        "Увеличил загрузку объектов на 25%",
        "Развил 8+ каналов продаж"
      ],
      expertise: ["Revenue Management", "Маркетинг", "Продажи"]
    }
  ];

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-400/8 to-pink-500/12 blur-3xl"
          animate={{
            x: [0, 120, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ left: '10%', top: '5%' }}
        />
        
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-blue-400/8 to-cyan-500/12 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ right: '5%', bottom: '10%' }}
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-600 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            Наша команда
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Команда</span> профессионалов
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            Ключевые руководители с многолетним опытом в сфере управления недвижимостью 
            и гостиничного бизнеса. Каждый специалист — эксперт в своей области.
          </motion.p>
        </motion.div>

        {/* Team Stats */}
        <TeamStats />

        {/* Organization Chart */}
        <OrganizationChart />

        {/* Team Members Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))}
        </motion.div>

        {/* Team Culture Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 p-8 sm:p-12 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Наши ценности</h3>
            <p className="text-muted-foreground">Принципы, которые объединяют нашу команду</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🎯", title: "Результат", desc: "Фокус на достижении целей", color: "text-blue-500" },
              { icon: "🤝", title: "Команда", desc: "Взаимная поддержка и доверие", color: "text-green-500" },
              { icon: "💡", title: "Инновации", desc: "Постоянное развитие и улучшение", color: "text-purple-500" },
              { icon: "⚡", title: "Скорость", desc: "Быстрое принятие решений", color: "text-orange-500" }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 2 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className={`font-bold text-lg mb-2 ${value.color}`}>{value.title}</h4>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
