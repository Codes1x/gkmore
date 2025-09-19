"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon: string;
  category: string;
}

function FAQAccordion({ item, index, isOpen, onToggle }: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
          animate={isOpen ? { opacity: 1, scale: 1.02 } : { opacity: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Floating Particles */}
        {Array.from({ length: 2 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-cyan-400/30 rounded-full"
            animate={{
              x: [0, 15, 0],
              y: [0, -8, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${15 + i * 40}%`,
              top: `${20 + i * 30}%`,
            }}
          />
        ))}
      </div>

      <div className="relative">
        {/* Question Header */}
        <motion.button
          onClick={onToggle}
          className="w-full p-6 sm:p-8 text-left focus:outline-none focus:ring-2 focus:ring-cyan-500/50 rounded-3xl"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-start gap-4 sm:gap-6">
            {/* Icon */}
            <motion.div
              animate={isOpen ? { rotate: 10, scale: 1.1 } : { rotate: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg"
            >
              <span className="text-xl sm:text-2xl">{item.icon}</span>
            </motion.div>

            {/* Question Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4">
                <motion.h3
                  className="text-lg sm:text-xl font-semibold text-foreground leading-tight"
                  animate={isOpen ? { color: "rgb(8 145 178)" } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {item.question}
                </motion.h3>
                
                {/* Toggle Icon */}
                <motion.div
                  animate={isOpen ? { rotate: 45, scale: 1.1 } : { rotate: 0, scale: 1 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                  className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/20 border border-white/20 flex items-center justify-center text-foreground hover:bg-white/20 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </motion.div>
              </div>
              
              {/* Category Tag */}
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                className="inline-block mt-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-500/20 border border-cyan-500/20 text-xs font-medium text-cyan-600"
              >
                {item.category}
              </motion.span>
            </div>
          </div>
        </motion.button>

        {/* Answer Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ 
                duration: 0.4,
                ease: [0.04, 0.62, 0.23, 0.98]
              }}
              className="overflow-hidden"
            >
              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <div className="pl-16 sm:pl-20">
                  {/* Divider Line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="h-px bg-gradient-to-r from-cyan-400/30 to-transparent mb-4 origin-left"
                  />
                  
                  {/* Answer Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="text-muted-foreground leading-relaxed"
                  >
                    <p className="text-base">{item.answer}</p>
                    
                    {/* Additional Info */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="mt-4 flex items-center gap-2 text-sm text-cyan-600"
                    >
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                      Подробнее в личном кабинете
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={isOpen ? { x: ['-100%', '100%'] } : {}}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{ transform: 'skewX(-20deg)' }}
      />
    </motion.div>
  );
}

export function ModernFAQ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(["reporting"])); // First item open by default

  const faqItems: FAQItem[] = [
    {
      id: "reporting",
      question: "Не понимаю отчётности",
      answer: "Предоставляем ежемесячную отчётность с понятными показателями и личного менеджера для разъяснений. Все данные доступны в режиме реального времени через личный кабинет с интуитивно понятными графиками и диаграммами.",
      icon: "📊",
      category: "Отчётность"
    },
    {
      id: "occupancy",
      question: "Боюсь простоев",
      answer: "Используем динамическое ценообразование и мультиканальную дистрибуцию для загрузки даже в межсезонье. Наша система автоматически корректирует цены в зависимости от спроса и конкурентов, а также размещает ваш объект на 15+ площадках одновременно.",
      icon: "📈",
      category: "Загрузка"
    },
    {
      id: "control",
      question: "Нет контроля",
      answer: "Доступ к личному кабинету: календарь, выручка, расходы, бронирования и выплаты — всё прозрачно. Вы можете в любой момент просмотреть статистику, заблокировать даты для личного использования и получать уведомления о всех операциях.",
      icon: "🎛️",
      category: "Контроль"
    },
    {
      id: "commission",
      question: "Высокие комиссии",
      answer: "Покажем калькуляцию 'до/после': все расходы прозрачны и учитываются до распределения доходов. При самостоятельном управлении ваши затраты на маркетинг, клининг, техподдержку и время составят больше 35%. Мы берём на себя все операционные риски.",
      icon: "💰",
      category: "Финансы"
    }
  ];

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-orange-400/8 to-red-500/12 blur-3xl"
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

      <div ref={containerRef} className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 text-orange-600 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
            Частые вопросы
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            <span className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">Закрываем</span> возражения
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Отвечаем на самые популярные вопросы собственников недвижимости. 
            Если не нашли ответ — напишите нам напрямую.
          </motion.p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="space-y-6"
        >
          {faqItems.map((item, index) => (
            <FAQAccordion
              key={item.id}
              item={item}
              index={index}
              isOpen={openItems.has(item.id)}
              onToggle={() => toggleItem(item.id)}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 px-8 py-6 rounded-3xl bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 shadow-xl">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-2xl shadow-lg"
              >
                💬
              </motion.div>
              <div className="text-left">
                <div className="font-semibold text-foreground text-lg">Остались вопросы?</div>
                <div className="text-sm text-muted-foreground">Получите персональную консультацию</div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <motion.a
                href="/contacts"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Задать вопрос
              </motion.a>
              
              <motion.a
                href="tel:+7999123456"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 border border-white/30 text-foreground font-medium rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Позвонить
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
