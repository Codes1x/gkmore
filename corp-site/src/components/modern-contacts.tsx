"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

function ContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    object: '',
    dates: '',
    contactMethod: '',
    consent: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Здесь будет логика отправки формы
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl p-8"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
      
      <div className="relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-2xl shadow-lg"
            >
              📝
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">Получить предложение за 24 часа</h3>
              <p className="text-muted-foreground">Персональный расчёт доходности и план сотрудничества</p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Name and Phone */}
          <div className="grid sm:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="relative"
            >
              <label className="block text-sm font-medium text-foreground mb-2">
                Имя *
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ваше имя"
                className="w-full h-12 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-4 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-200"
                required
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="relative"
            >
              <label className="block text-sm font-medium text-foreground mb-2">
                Телефон *
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+7 (999) 999-99-99"
                type="tel"
                className="w-full h-12 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-4 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-200"
                required
              />
            </motion.div>
          </div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.0, duration: 0.4 }}
            className="relative"
          >
            <label className="block text-sm font-medium text-foreground mb-2">
              Email *
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              type="email"
              className="w-full h-12 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-4 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-200"
              required
            />
          </motion.div>

          {/* Object Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 0.4 }}
            className="relative"
          >
            <label className="block text-sm font-medium text-foreground mb-2">
              Описание объекта
            </label>
            <textarea
              name="object"
              value={formData.object}
              onChange={handleInputChange}
              placeholder="Локация, метраж, тип недвижимости, текущее состояние..."
              rows={4}
              className="w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-200 resize-none"
            />
          </motion.div>

          {/* Dates and Contact Method */}
          <div className="grid sm:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="relative"
            >
              <label className="block text-sm font-medium text-foreground mb-2">
                Предполагаемые сроки
              </label>
              <input
                name="dates"
                value={formData.dates}
                onChange={handleInputChange}
                placeholder="Когда планируете начать"
                className="w-full h-12 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-4 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-200"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.3, duration: 0.4 }}
              className="relative"
            >
              <label className="block text-sm font-medium text-foreground mb-2">
                Удобный способ связи
              </label>
              <select
                name="contactMethod"
                value={formData.contactMethod}
                onChange={handleInputChange}
                className="w-full h-12 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-4 text-sm text-foreground focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-200"
              >
                <option value="">Выберите способ</option>
                <option value="phone">Телефонный звонок</option>
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="telegram">Telegram</option>
              </select>
            </motion.div>
          </div>

          {/* Consent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.4, duration: 0.4 }}
            className="flex items-start gap-3"
          >
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleInputChange}
              className="mt-1 size-4 rounded border border-white/20 bg-white/5 text-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
              required
            />
            <label className="text-sm text-muted-foreground leading-relaxed">
              Согласен на обработку персональных данных и получение коммерческих предложений
            </label>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5, duration: 0.4 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Отправляем...
              </div>
            ) : (
              'Получить предложение за 24 часа'
            )}
          </motion.button>
        </motion.form>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.6, duration: 0.4 }}
          className="mt-6 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
        >
          <div className="flex items-start gap-3">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center text-white text-sm font-bold"
            >
              ✓
            </motion.div>
            <div className="text-sm">
              <div className="font-semibold text-green-400">Гарантируем ответ в течение 24 часов</div>
              <div className="text-muted-foreground mt-1">Персональный расчёт доходности и план сотрудничества</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ContactInfo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const hotels = [
    {
      name: "Sea Family Resort & Spa",
      address: "1-я линия у моря, Сочи",
      phone: "+7 (862) 123-45-67",
      email: "info@seafamily.ru",
      icon: "🏖️",
      color: "cyan"
    },
    {
      name: "Лучезарный Резорт",
      address: "4 минуты пешком от моря, Сочи",
      phone: "+7 (862) 765-43-21",
      email: "info@luchezarny.ru",
      icon: "✨",
      color: "blue"
    }
  ];

  const office = {
    name: "Головной офис",
    address: "г. Сочи, ул. Курортный проспект, 123",
    phone: "+7 (862) 555-00-00",
    email: "partnership@gkmore.ru",
    hours: "Пн-Пт: 9:00-18:00",
    icon: "🏢",
    color: "purple"
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="space-y-6"
    >
      {/* Hotels */}
      {hotels.map((hotel, index) => (
        <motion.div
          key={hotel.name}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 + index * 0.2, duration: 0.6 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 shadow-xl hover:border-white/30 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
          
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xl shadow-lg"
              >
                {hotel.icon}
              </motion.div>
              <h3 className="text-lg font-semibold text-foreground">{hotel.name}</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-muted-foreground">📍</span>
                <span className="text-foreground">{hotel.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-muted-foreground">📞</span>
                <a href={`tel:${hotel.phone}`} className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  {hotel.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-muted-foreground">✉️</span>
                <a href={`mailto:${hotel.email}`} className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  {hotel.email}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Office */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.0, duration: 0.6 }}
        whileHover={{ scale: 1.02, y: -2 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 shadow-xl hover:border-white/30 transition-all duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-pink-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
        
        <div className="relative">
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-xl shadow-lg"
            >
              {office.icon}
            </motion.div>
            <h3 className="text-lg font-semibold text-foreground">{office.name}</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground">🏢</span>
              <span className="text-foreground">{office.address}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground">📞</span>
              <a href={`tel:${office.phone}`} className="text-purple-400 hover:text-purple-300 transition-colors">
                {office.phone}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground">✉️</span>
              <a href={`mailto:${office.email}`} className="text-purple-400 hover:text-purple-300 transition-colors">
                {office.email}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground">🕒</span>
              <span className="text-foreground">{office.hours}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Map Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.2, duration: 0.6 }}
        whileHover={{ scale: 1.02, y: -2 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 shadow-xl hover:border-white/30 transition-all duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-emerald-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
        
        <div className="relative">
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-xl shadow-lg"
            >
              🗺️
            </motion.div>
            <h3 className="text-lg font-semibold text-foreground">Расположение</h3>
          </div>
          
          <div className="aspect-[4/3] rounded-xl border border-white/20 bg-gradient-to-br from-white/5 to-white/10 grid place-items-center text-muted-foreground mb-4">
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-4xl mb-2"
              >
                🗺️
              </motion.div>
              <div className="text-sm font-medium">Интерактивная карта</div>
              <div className="text-xs mt-1">Маршруты к отелям</div>
            </div>
          </div>
          
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>🚗</span>
              <span>Парковка: бесплатная для гостей</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🚌</span>
              <span>Общественный транспорт: автобус №1, 2, 15</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✈️</span>
              <span>Аэропорт Сочи: 45 минут на автомобиле</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🚂</span>
              <span>ЖД вокзал: 15 минут на автомобиле</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.4, duration: 0.6 }}
        whileHover={{ scale: 1.02, y: -2 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 shadow-xl hover:border-white/30 transition-all duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-red-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
        
        <div className="relative">
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-xl shadow-lg"
            >
              📱
            </motion.div>
            <h3 className="text-lg font-semibold text-foreground">Мы в социальных сетях</h3>
          </div>
          
          <div className="flex gap-3">
            {[
              { name: 'VK', icon: '📘', color: 'from-blue-500 to-blue-600' },
              { name: 'TG', icon: '✈️', color: 'from-blue-400 to-blue-500' },
              { name: 'WA', icon: '💬', color: 'from-green-500 to-green-600' },
              { name: 'YT', icon: '📺', color: 'from-red-500 to-red-600' }
            ].map((social, index) => (
              <motion.a
                key={social.name}
                href="#"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.6 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center justify-center size-12 rounded-xl bg-gradient-to-r ${social.color} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <span className="text-lg">{social.icon}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ModernContacts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-12 sm:py-16 overflow-hidden">
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
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-600 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            Контакты и заявка
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Готовы стать партнёрами?</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            Получите персональное предложение за 24 часа. 
            Присоединяйтесь к 50+ довольным собственникам, которые получают стабильный доход.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12">
          {/* Contact Form */}
          <ContactForm />
          
          {/* Contact Information */}
          <ContactInfo />
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-center mt-12"
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
                🚀
              </motion.div>
              <div className="text-left">
                <div className="font-semibold text-foreground text-lg">Начните зарабатывать уже сегодня</div>
                <div className="text-sm text-muted-foreground">Стабильный доход от вашей недвижимости</div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <motion.a
                href="#contacts"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Заполнить заявку
              </motion.a>
              
              <motion.a
                href="tel:+78625550000"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 border border-white/30 text-foreground font-medium rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Позвонить сейчас
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
