"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const serviceTypes = [
  "Уборка квартиры",
  "Генеральная уборка",
  "Уборка после ремонта",
  "Мытьё окон",
  "Химчистка мебели",
  "Другое"
];

export function CleaningForm() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Здесь будет логика отправки формы
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', phone: '', service: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="cleaning-form" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Заказать уборку
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Оставьте заявку и мы свяжемся с вами в течение 15 минут
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    placeholder="Введите ваше имя"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    placeholder="+7 (900) 001-66-58"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тип услуги
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                >
                  <option value="">Выберите услугу</option>
                  {serviceTypes.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Дополнительная информация
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none"
                  placeholder="Укажите площадь, особенности помещения или другие детали"
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400 text-white font-semibold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Отправляем заявку...
                  </div>
                ) : (
                  'Отправить заявку'
                )}
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Спасибо за заявку!
              </h3>
              <p className="text-gray-600">
                Мы получили вашу заявку и свяжемся с вами в течение 15 минут
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
