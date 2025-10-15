"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

interface FormData {
  name: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
}

export function ContactPopup({ isOpen, onClose, title = "Свяжитесь с нами" }: ContactPopupProps) {
  const [formData, setFormData] = useState<FormData>({ name: "", phone: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Закрытие popup по Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.classList.add("popup-open");
      document.documentElement.classList.add("popup-open");
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.classList.remove("popup-open");
      document.documentElement.classList.remove("popup-open");
    };
  }, [isOpen, onClose]);

  // Валидация формы
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Введите ваше имя";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Имя должно содержать минимум 2 символа";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Введите номер телефона";
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = "Введите корректный номер телефона";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Обработка отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", phone: "" });
        setTimeout(() => {
          onClose();
          setSubmitStatus("idle");
        }, 2500);
      } else {
        throw new Error('Ошибка отправки');
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error('Ошибка отправки формы:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9997]"
        >
        {/* Backdrop with Glass Morphism */}
        <motion.div 
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          className="fixed inset-0 z-[9998] bg-gradient-to-br from-black/40 via-black/50 to-black/60"
          onClick={onClose}
        />
        
        {/* Modal - Центрирование через fixed и transform */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, type: "spring", damping: 25 }}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[calc(100%-2rem)] max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gradient Background Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-3xl blur-xl opacity-30" />
          
          <div className="relative bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            {/* Animated Header with Gradient */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600" />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500"
                animate={{
                  x: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <div className="relative px-8 py-6 flex items-center justify-between">
                <div>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 mb-1"
                  >
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                  </motion.div>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm text-white/80"
                  >
                    Мы свяжемся с вами в течение часа
                  </motion.p>
                </div>
                
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 group"
                  aria-label="Закрыть"
                >
                  <svg className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {submitStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="text-center py-8"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-lg"
                  >
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <motion.path 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={3} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                  </motion.div>
                  <motion.h4 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3"
                  >
                    Заявка отправлена!
                  </motion.h4>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-600 leading-relaxed"
                  >
                    Спасибо за обращение! Наш менеджер свяжется с вами в ближайшее время.
                  </motion.p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-gray-600 leading-relaxed"
                  >
                    Оставьте свои контакты, и наш менеджер проконсультирует вас по всем вопросам сотрудничества.
                  </motion.p>

                  {/* Поле имени */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                      Ваше имя
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, name: e.target.value }));
                          if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                        }}
                        className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200 text-gray-900 placeholder:text-gray-400 ${
                          errors.name 
                            ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="Иван Петров"
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.name && (
                      <motion.p 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.name}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Поле телефона */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      Номер телефона
                    </label>
                    <div className="phone-input-modern">
                      <PhoneInput
                        defaultCountry="ru"
                        value={formData.phone}
                        onChange={(phone) => {
                          setFormData(prev => ({ ...prev, phone }));
                          if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                        }}
                        className={errors.phone ? 'error' : ''}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.phone && (
                      <motion.p 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.phone}
                      </motion.p>
                    )}
                  </motion.div>

                  {submitStatus === "error" && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-gradient-to-r from-red-50 to-red-100/50 border-2 border-red-200 rounded-2xl flex items-start gap-3"
                    >
                      <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-red-800">Ошибка отправки</p>
                        <p className="text-sm text-red-600 mt-0.5">Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Кнопка отправки */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Отправляем...</span>
                        </>
                      ) : (
                        <>
                          <span>Отправить заявку</span>
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </span>
                  </motion.button>

                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xs text-gray-500 text-center leading-relaxed"
                  >
                    Нажимая &quot;Отправить заявку&quot;, вы соглашаетесь с{' '}
                    <a href="/privacy" className="text-cyan-600 hover:text-cyan-700 underline">
                      политикой конфиденциальности
                    </a>
                  </motion.p>
                </form>
              )}
            </div>
          </div>
        </motion.div>
        </motion.div>
      )}

      <style jsx global>{`
        /* Блокировка прокрутки страницы при открытом popup */
        body.popup-open {
          overflow: hidden !important;
        }
        
        html.popup-open {
          overflow: hidden !important;
        }
        
        /* Контейнер телефонного инпута */
        .phone-input-modern {
          position: relative;
        }
        
        .phone-input-modern .react-international-phone-input-container {
          width: 100%;
          position: relative;
        }
        
        /* Основное поле ввода */
        .phone-input-modern .react-international-phone-input {
          width: 100%;
          padding: 1rem 1rem 1rem 4.5rem !important;
          border: 2px solid #e5e7eb !important;
          border-radius: 1rem !important;
          font-size: 1rem !important;
          transition: all 0.2s !important;
          color: #111827 !important;
          background: white !important;
          height: auto !important;
        }
        
        .phone-input-modern .react-international-phone-input:hover {
          border-color: #d1d5db !important;
        }
        
        .phone-input-modern .react-international-phone-input:focus {
          outline: none !important;
          border-color: #06b6d4 !important;
          box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.1) !important;
        }
        
        /* Состояние ошибки */
        .phone-input-modern.error .react-international-phone-input {
          border-color: #fca5a5 !important;
          background-color: rgba(254, 242, 242, 0.5) !important;
        }
        
        .phone-input-modern.error .react-international-phone-input:focus {
          border-color: #ef4444 !important;
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1) !important;
        }
        
        /* Кнопка выбора страны */
        .phone-input-modern .react-international-phone-country-selector-button {
          padding: 0.75rem !important;
          border-right: 2px solid #e5e7eb !important;
          background: #f9fafb !important;
          border-radius: 1rem 0 0 1rem !important;
          transition: background 0.2s !important;
          height: 100% !important;
          border: none !important;
          min-width: 4rem !important;
        }
        
        .phone-input-modern .react-international-phone-country-selector-button:hover {
          background: #f3f4f6 !important;
        }
        
        /* Выпадающий список стран */
        .phone-input-modern .react-international-phone-country-selector-dropdown {
          position: absolute !important;
          top: 100% !important;
          left: 0 !important;
          right: 0 !important;
          margin-top: 0.5rem !important;
          border: 2px solid #e5e7eb !important;
          border-radius: 1rem !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
          max-height: 16rem !important;
          overflow-y: auto !important;
          background: white !important;
          z-index: 10000 !important;
        }
        
        /* Элементы списка стран */
        .phone-input-modern .react-international-phone-country-selector-dropdown__list-item {
          padding: 0.75rem 1rem !important;
          cursor: pointer !important;
          transition: background 0.15s !important;
          display: flex !important;
          align-items: center !important;
          gap: 0.5rem !important;
        }
        
        .phone-input-modern .react-international-phone-country-selector-dropdown__list-item:hover {
          background: #f0f9ff !important;
        }
        
        /* Скроллбар для списка стран */
        .phone-input-modern .react-international-phone-country-selector-dropdown::-webkit-scrollbar {
          width: 6px;
        }
        
        .phone-input-modern .react-international-phone-country-selector-dropdown::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        
        .phone-input-modern .react-international-phone-country-selector-dropdown::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        
        .phone-input-modern .react-international-phone-country-selector-dropdown::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        /* Адаптивность для мобильных */
        @media (max-width: 640px) {
          .phone-input-modern .react-international-phone-input {
            font-size: 16px !important; /* Предотвращает зум на iOS */
          }
          
          .phone-input-modern .react-international-phone-country-selector-dropdown {
            max-height: 12rem !important;
          }
        }
      `}</style>
    </AnimatePresence>
  );
}
