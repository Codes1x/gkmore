"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

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
  
  const popupContainerRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastActiveEl = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  const reduceMotion = useReducedMotion();

  const liveMessage = isSubmitting
    ? 'Отправляем…'
    : (() => {
        switch (submitStatus) {
          case 'success':
            return 'Заявка отправлена';
          case 'error':
            return 'Ошибка отправки';
          default:
            return '';
        }
      })();

  // Автоматический скролл к началу при открытии popup
  useEffect(() => {
    if (isOpen && popupContainerRef.current) {
      popupContainerRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  // Блокировка скролла body, сохранение и возврат фокуса
  useEffect(() => {
    if (isOpen) {
      lastActiveEl.current = document.activeElement as HTMLElement | null;

      const prevOverflow = document.body.style.overflow;
      const prevTouchAction = document.body.style.touchAction;

      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      // Начальный фокус внутрь диалога
      setTimeout(() => dialogRef.current?.focus(), 0);

      return () => {
        document.body.style.overflow = prevOverflow;
        document.body.style.touchAction = prevTouchAction;
        lastActiveEl.current?.focus?.();
      };
    }
  }, [isOpen]);

  // Закрытие popup по Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Простая ловушка фокуса по Tab
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && active === first) { 
        e.preventDefault(); 
        last.focus(); 
      } else if (!e.shiftKey && active === last) { 
        e.preventDefault(); 
        first.focus(); 
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen]);

  // Чистка таймера автозакрытия
  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

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
        closeTimer.current = window.setTimeout(() => {
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
        ref={popupContainerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] overflow-y-auto overscroll-contain popup-scrollbar-hidden"
          onClick={onClose}
      >
        {/* Backdrop with Glass Morphism */}
        <div className="fixed inset-0 bg-gradient-to-br from-black/40 via-black/50 to-black/60 backdrop-blur-md z-0" />
        
        {/* Центрирующий контейнер */}
        <div className="min-h-screen flex items-center justify-center p-4 z-10 relative">
        {/* Modal */}
        <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
            className="relative w-full max-w-md my-8"
            onClick={(e) => e.stopPropagation()}
          >
          {/* Gradient Background Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-3xl blur-xl opacity-30" />
          
          <div className="relative bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20">
            {/* Animated Header with Gradient */}
            <div className="relative overflow-hidden rounded-t-3xl">
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
                    <h3 id="contact-title" className="text-xl font-bold text-white">{title}</h3>
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
                
            <div className="absolute right-3 top-3 z-10">
              <button type="button" onClick={onClose} aria-label="Закрыть" className="rounded-full p-2 bg-white/10 hover:bg-white/20 transition-colors">
                {/* svg x icon */}
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
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
                <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-busy={isSubmitting}>
                  <div aria-live="polite" className="sr-only">{liveMessage}</div>
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
                    name="name"
                    autoComplete="given-name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
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
                        id="name-error"
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
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, phone: e.target.value }));
                          if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                        }}
                        className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-200 text-gray-900 placeholder:text-gray-400 ${
                          errors.phone 
                            ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:ring-red-500/20' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        placeholder="+7 (900) 123-45-67"
                        disabled={isSubmitting}
                      />
                    </div>
                  {errors.phone && (
                      <motion.p 
                        id="phone-error"
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
          </div>
        </motion.div>
      )}

      <style jsx global>{`
        /* Screen reader only class */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        
        /* Скрытие полосы прокрутки для popup контейнера */
        .popup-scrollbar-hidden {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        
        .popup-scrollbar-hidden::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
    </AnimatePresence>
  );
}
