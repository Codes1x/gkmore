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

function LegalDocumentCard({ document, index }: {
  document: {
    title: string;
    type: string;
    icon: string;
    description: string;
    color: string;
    requirements: string[];
    benefits: string[];
    downloadable: boolean;
  };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const colorClasses = {
    blue: "from-blue-400 to-cyan-500 border-blue-500/30 text-blue-600 bg-blue-500/10",
    green: "from-green-400 to-emerald-500 border-green-500/30 text-green-600 bg-green-500/10",
    purple: "from-purple-400 to-violet-500 border-purple-500/30 text-purple-600 bg-purple-500/10",
    orange: "from-orange-400 to-red-500 border-orange-500/30 text-orange-600 bg-orange-500/10",
    red: "from-red-400 to-pink-500 border-red-500/30 text-red-600 bg-red-500/10"
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
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 shadow-xl hover:border-white/20 transition-all duration-500 cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${colorClasses[document.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[document.color as keyof typeof colorClasses].split(' ')[1]} opacity-5 group-hover:opacity-12 transition-opacity duration-500 rounded-3xl`}
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Floating Particles */}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1.5 h-1.5 bg-gradient-to-r ${colorClasses[document.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[document.color as keyof typeof colorClasses].split(' ')[1]} opacity-30 rounded-full`}
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
              left: `${15 + i * 20}%`,
              top: `${10 + i * 15}%`,
            }}
          />
        ))}
      </div>

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${colorClasses[document.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[document.color as keyof typeof colorClasses].split(' ')[1]} flex items-center justify-center shadow-lg`}
          >
            <span className="text-xl">{document.icon}</span>
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
              className="text-lg font-bold text-foreground mb-1 leading-tight"
            >
              {document.title}
            </motion.h3>
            
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
              className={`inline-block px-2 py-1 rounded-lg ${colorClasses[document.color as keyof typeof colorClasses].split(' ')[4]} border ${colorClasses[document.color as keyof typeof colorClasses].split(' ')[2]} text-xs font-medium`}
            >
              {document.type}
            </motion.span>
          </div>

          {document.downloadable && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <span className="text-lg">📄</span>
            </motion.button>
          )}
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
          className="text-sm text-muted-foreground leading-relaxed mb-4"
        >
          {document.description}
        </motion.p>

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: index * 0.1 + 0.6, duration: 0.6 }}
          className="space-y-2 mb-4"
        >
          <h4 className="text-sm font-semibold text-foreground">Основные пункты:</h4>
          {document.requirements.slice(0, isExpanded ? document.requirements.length : 2).map((requirement, i) => (
            <motion.div
              key={requirement}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.7 + i * 0.1, duration: 0.4 }}
              className="flex items-start gap-2"
            >
              <div className={`w-1.5 h-1.5 bg-gradient-to-r ${colorClasses[document.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[document.color as keyof typeof colorClasses].split(' ')[1]} rounded-full mt-1.5 animate-pulse`} />
              <span className="text-xs text-muted-foreground leading-relaxed">{requirement}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Expandable Benefits */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-white/10">
            <h4 className="text-sm font-semibold text-foreground mb-3">Преимущества:</h4>
            <div className="space-y-2">
              {document.benefits.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isExpanded ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-start gap-2"
                >
                  <div className={`w-1.5 h-1.5 bg-gradient-to-r ${colorClasses[document.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[document.color as keyof typeof colorClasses].split(' ')[1]} rounded-full mt-1.5`} />
                  <span className="text-xs text-muted-foreground leading-relaxed">{benefit}</span>
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
          {isExpanded ? 'Скрыть детали ↑' : 'Показать детали ↓'}
        </motion.button>
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

function OnboardingProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const steps = [
    { id: 1, title: "Заявка", desc: "Первичная консультация", icon: "📝", duration: "1 день" },
    { id: 2, title: "Аудит", desc: "Осмотр объекта", icon: "🔍", duration: "2-3 дня" },
    { id: 3, title: "Договор", desc: "Подписание", icon: "✍️", duration: "1 день" },
    { id: 4, title: "Подготовка", desc: "Настройка систем", icon: "⚙️", duration: "5-7 дней" },
    { id: 5, title: "Запуск", desc: "Первые гости", icon: "🚀", duration: "1 день" }
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
        <h3 className="text-2xl font-bold text-foreground mb-4">Процедура подключения</h3>
        <p className="text-muted-foreground">От заявки до первых гостей — всего 10-14 дней</p>
      </div>

      {/* Desktop Timeline */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between relative">
          {/* Connection Line */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 -translate-y-1/2"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.6, duration: 1.5 }}
            style={{ originX: 0 }}
          />

          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              {/* Step Node */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + index * 0.2, duration: 0.5, type: "spring" }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl mb-4 relative"
              >
                <span className="text-2xl">{step.icon}</span>
                
                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {step.id}
                </div>
              </motion.div>

              {/* Step Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
                className="text-center max-w-[120px]"
              >
                <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{step.desc}</p>
                <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30">
                  {step.duration}
                </span>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Timeline */}
      <div className="md:hidden space-y-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 + index * 0.2, duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg relative shrink-0"
            >
              <span className="text-xl">{step.icon}</span>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {step.id}
              </div>
            </motion.div>

            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
              <p className="text-sm text-muted-foreground mb-2">{step.desc}</p>
              <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30">
                {step.duration}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ComplianceIndicators() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const indicators = [
    { icon: "⚖️", value: 100, suffix: "%", label: "Соответствие закону", color: "text-green-500" },
    { icon: "🛡️", value: 24, suffix: "", label: "Месяца гарантии", color: "text-blue-500" },
    { icon: "📋", value: 15, suffix: "+", label: "Типов договоров", color: "text-purple-500" },
    { icon: "🔐", value: 99, suffix: "%", label: "Защита данных", color: "text-orange-500" }
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
        <h3 className="text-2xl font-bold text-foreground mb-4">Юридические гарантии</h3>
        <p className="text-muted-foreground">Полное соответствие российскому законодательству</p>
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

export function ModernLegal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const legalDocuments = [
    {
      title: "Договор управления",
      type: "Основной документ",
      icon: "📋",
      description: "Типовой договор управления апартаментами с четко прописанными правами и обязанностями сторон.",
      color: "blue",
      requirements: [
        "Предмет: управление и эксплуатация апартамента",
        "Сроки: минимум 11 месяцев, автопролонгация",
        "Ответственность сторон и страхование рисков",
        "Порядок расчетов и отчетности",
        "Условия расторжения договора"
      ],
      benefits: [
        "Прозрачные условия сотрудничества",
        "Защита интересов собственника",
        "Четкие финансовые обязательства",
        "Возможность досрочного расторжения"
      ],
      downloadable: true
    },
    {
      title: "Требования к объекту",
      type: "Технические условия",
      icon: "🏠",
      description: "Подробные требования к комплектации, безопасности и соответствию нормам для успешной сдачи.",
      color: "green",
      requirements: [
        "Комплектация: мебель, техника, текстиль",
        "Пожарная безопасность и аварийные выходы",
        "Соответствие санитарным нормам",
        "Интернет и коммуникации",
        "Система безопасности"
      ],
      benefits: [
        "Высокие рейтинги от гостей",
        "Минимальные риски повреждений",
        "Соответствие всем стандартам",
        "Быстрая окупаемость инвестиций"
      ],
      downloadable: true
    },
    {
      title: "Страхование и гарантии",
      type: "Защита рисков",
      icon: "🛡️",
      description: "Комплексная программа страхования имущества и ответственности с полным покрытием рисков.",
      color: "purple",
      requirements: [
        "Страхование имущества от повреждений",
        "Ответственность перед третьими лицами",
        "Покрытие форс-мажорных обстоятельств",
        "Гарантийные обязательства УК",
        "Компенсационный фонд"
      ],
      benefits: [
        "Полная защита инвестиций",
        "Быстрые страховые выплаты",
        "Минимальные финансовые риски",
        "Спокойствие собственника"
      ],
      downloadable: false
    },
    {
      title: "Соответствие 152-ФЗ",
      type: "Защита данных",
      icon: "🔐",
      description: "Полное соблюдение требований по защите персональных данных гостей и собственников.",
      color: "orange",
      requirements: [
        "Согласие на обработку данных",
        "Безопасное хранение информации",
        "Ограниченный доступ к данным",
        "Уведомление о нарушениях",
        "Право на удаление данных"
      ],
      benefits: [
        "Соответствие законодательству",
        "Доверие гостей и партнеров",
        "Защита от штрафов",
        "Современные стандарты безопасности"
      ],
      downloadable: false
    }
  ];

  return (
    <section className="relative py-12 sm:py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-red-400/8 to-orange-500/12 blur-3xl"
          animate={{
            x: [0, 140, 0],
            y: [0, -90, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ left: '5%', top: '8%' }}
        />
        
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-purple-400/8 to-pink-500/12 blur-3xl"
          animate={{
            x: [0, -130, 0],
            y: [0, 110, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ right: '8%', bottom: '12%' }}
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 text-red-600 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            Юридическая защита
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            <span className="bg-gradient-to-r from-red-400 to-orange-600 bg-clip-text text-transparent">Юридический</span> блок
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            Все документы соответствуют российскому законодательству. Прозрачные условия, 
            полная защита интересов собственников и соблюдение всех требований.
          </motion.p>
        </motion.div>

        {/* Compliance Indicators */}
        <ComplianceIndicators />

        {/* Legal Documents Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {legalDocuments.map((document, index) => (
            <LegalDocumentCard key={document.title} document={document} index={index} />
          ))}
        </motion.div>

        {/* Onboarding Process */}
        <OnboardingProcess />

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="text-center rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 p-8 sm:p-12 shadow-2xl"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Готовы начать сотрудничество?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Получите персональную консультацию юриста и узнайте все детали 
            сотрудничества. Первая консультация — бесплатно.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold hover:from-red-400 hover:to-orange-500 transition-all shadow-lg"
            >
              Подать заявку
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl border border-white/30 text-foreground font-semibold hover:bg-white/10 transition-all"
            >
              Юридическая консультация
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
