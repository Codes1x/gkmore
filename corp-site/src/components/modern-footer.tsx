"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Здесь будет логика подписки
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 shadow-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-lg shadow-lg"
          >
            📧
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Подписка</h3>
            <p className="text-xs text-muted-foreground">Новости и предложения</p>
          </div>
        </div>

        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваш email"
                className="h-10 flex-1 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-200"
                required
              />
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-10 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  '→'
                )}
              </motion.button>
            </div>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-sm text-green-400"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center text-white text-xs"
            >
              ✓
            </motion.div>
            Спасибо за подписку!
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function FooterSection({ title, items, icon, color, delay = 0 }: {
  title: string;
  items: Array<{ label: string; href?: string; external?: boolean }>;
  icon: string;
  color: 'cyan' | 'blue' | 'purple' | 'green' | 'orange';
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const colorClasses = {
    cyan: 'from-cyan-400 to-blue-500',
    blue: 'from-blue-400 to-indigo-500',
    purple: 'from-purple-400 to-pink-500',
    green: 'from-green-400 to-emerald-500',
    orange: 'from-orange-400 to-red-500'
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-sm shadow-lg"
        >
          {icon}
        </motion.div>
        <h3 className="text-foreground font-semibold">{title}</h3>
      </div>
      
      <div className="space-y-2">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: delay + index * 0.1, duration: 0.4 }}
          >
            {item.href ? (
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-muted-foreground text-sm">{item.label}</span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function SocialLinks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const socials = [
    { name: 'VK', icon: '📘', color: 'from-blue-500 to-blue-600', href: '#' },
    { name: 'Telegram', icon: '✈️', color: 'from-blue-400 to-blue-500', href: '#' },
    { name: 'WhatsApp', icon: '💬', color: 'from-green-500 to-green-600', href: '#' },
    { name: 'YouTube', icon: '📺', color: 'from-red-500 to-red-600', href: '#' }
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-sm shadow-lg"
        >
          📱
        </motion.div>
        <h3 className="text-foreground font-semibold">Мы в соцсетях</h3>
      </div>
      
      <div className="flex gap-3">
        {socials.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.href}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center justify-center size-10 rounded-xl bg-gradient-to-r ${social.color} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
            title={social.name}
          >
            <span className="text-sm">{social.icon}</span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

export function ModernFooter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Разделы",
      icon: "📋",
      color: "cyan" as const,
      items: [
        { label: "О группе", href: "/about" },
        { label: "Модель сотрудничества", href: "/model" },
        { label: "Портфель", href: "/portfolio" },
        { label: "Контакты", href: "/contacts" }
      ]
    },
    {
      title: "Отели",
      icon: "🏨",
      color: "blue" as const,
      items: [
        { label: "Sea Family Resort & Spa" },
        { label: "Лучезарный Резорт" }
      ]
    },
    {
      title: "Документы",
      icon: "📄",
      color: "purple" as const,
      items: [
        { label: "Политика конфиденциальности", href: "#" },
        { label: "Пользовательское соглашение", href: "#" },
        { label: "Договор оферты", href: "#" }
      ]
    }
  ];

  return (
    <footer className="relative py-12 sm:py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-muted/10 to-background" />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400/5 to-blue-500/8 blur-3xl"
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
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-purple-400/5 to-pink-500/8 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ right: '15%', bottom: '10%' }}
        />
      </div>

      <div ref={containerRef} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Logo and Description */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xl shadow-lg"
                >
                  🌊
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">ГК Море</h2>
                  <p className="text-xs text-muted-foreground">Группа компаний</p>
                </div>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-sm text-muted-foreground leading-relaxed"
              >
                Профессиональный оператор апарт‑отелей в Сочи. 
                Стабильная доходность и прозрачное управление для собственников недвижимости.
              </motion.p>
            </div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3 text-sm">
                <span className="text-muted-foreground">📞</span>
                <a href="tel:+78625550000" className="text-foreground hover:text-cyan-400 transition-colors">
                  +7 (862) 555-00-00
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-muted-foreground">✉️</span>
                <a href="mailto:partnership@gkmore.ru" className="text-foreground hover:text-cyan-400 transition-colors">
                  partnership@gkmore.ru
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-muted-foreground">📍</span>
                <span className="text-foreground">г. Сочи, ул. Курортный проспект, 123</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Footer Sections */}
          <div className="lg:col-span-2 grid sm:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <FooterSection
                key={section.title}
                title={section.title}
                items={section.items}
                icon={section.icon}
                color={section.color}
                delay={0.2 + index * 0.1}
              />
            ))}
          </div>

          {/* Newsletter and Social */}
          <div className="lg:col-span-1 space-y-6">
            <NewsletterForm />
            <SocialLinks />
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="flex items-center gap-4 text-sm text-muted-foreground"
            >
              <span>© {currentYear} ГК Море</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Все права защищены</span>
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex items-center gap-4 text-sm"
            >
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Политика конфиденциальности
              </a>
              <span className="text-muted-foreground">•</span>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Пользовательское соглашение
              </a>
            </motion.div>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>SSL защита</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              <span>Лицензированная деятельность</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
              <span>5+ лет на рынке</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
