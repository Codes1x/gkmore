"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

// Список стран с кодами и флагами
const countries = [
  { code: "+7", country: "RU", name: "Россия", flag: "🇷🇺", mask: "+7 (###) ###-##-##" },
  { code: "+1", country: "US", name: "США", flag: "🇺🇸", mask: "+1 (###) ###-####" },
  { code: "+44", country: "GB", name: "Великобритания", flag: "🇬🇧", mask: "+44 ## #### ####" },
  { code: "+49", country: "DE", name: "Германия", flag: "🇩🇪", mask: "+49 ### #######" },
  { code: "+33", country: "FR", name: "Франция", flag: "🇫🇷", mask: "+33 # ## ## ## ##" },
  { code: "+39", country: "IT", name: "Италия", flag: "🇮🇹", mask: "+39 ### ### ####" },
  { code: "+34", country: "ES", name: "Испания", flag: "🇪🇸", mask: "+34 ### ### ###" },
  { code: "+380", country: "UA", name: "Украина", flag: "🇺🇦", mask: "+380 ## ### ## ##" },
  { code: "+375", country: "BY", name: "Беларусь", flag: "🇧🇾", mask: "+375 ## ###-##-##" },
  { code: "+77", country: "KZ", name: "Казахстан", flag: "🇰🇿", mask: "+77 ### ### ## ##" }
];

export function ContactPopup({ isOpen, onClose, title = "Свяжитесь с нами" }: ContactPopupProps) {
  const [formData, setFormData] = useState<FormData>({ name: "", phone: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]); // Россия по умолчанию
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  // Форматирование телефона по маске
  const formatPhone = (value: string, mask: string) => {
    const cleanValue = value.replace(/\D/g, '');
    let formatted = '';
    let maskIndex = 0;
    
    for (let i = 0; i < cleanValue.length && maskIndex < mask.length; i++) {
      while (maskIndex < mask.length && mask[maskIndex] !== '#') {
        formatted += mask[maskIndex];
        maskIndex++;
      }
      if (maskIndex < mask.length) {
        formatted += cleanValue[i];
        maskIndex++;
      }
    }
    
    return formatted;
  };

  // Закрытие popup по Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
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
      // Здесь будет API запрос для отправки на почту
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          country: selectedCountry.name
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", phone: "" });
        setTimeout(() => {
          onClose();
          setSubmitStatus("idle");
        }, 2000);
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

  // Обработка изменения номера телефона
  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value, selectedCountry.mask);
    setFormData(prev => ({ ...prev, phone: formatted }));
    if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
  };

  // Обработка изменения имени
  const handleNameChange = (value: string) => {
    setFormData(prev => ({ ...prev, name: value }));
    if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Закрыть"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {submitStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Спасибо!</h4>
                <p className="text-gray-600">Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-sm text-gray-600 mb-6">
                  Оставьте свои контакты, и наш менеджер свяжется с вами для консультации.
                </p>

                {/* Поле имени */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Введите ваше имя"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Поле телефона */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Номер телефона *
                  </label>
                  <div className="relative">
                    {/* Выбор страны */}
                    <button
                      type="button"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      className="absolute left-0 top-0 h-full px-3 border-r border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors rounded-l-lg flex items-center gap-2"
                    >
                      <span className="text-lg">{selectedCountry.flag}</span>
                      <span className="text-sm font-medium text-gray-700">{selectedCountry.code}</span>
                      <svg 
                        className={`w-4 h-4 text-gray-400 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Выпадающий список стран */}
                    {isCountryDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                        {countries.map((country) => (
                          <button
                            key={country.country}
                            type="button"
                            onClick={() => {
                              setSelectedCountry(country);
                              setIsCountryDropdownOpen(false);
                              setFormData(prev => ({ ...prev, phone: "" })); // Очищаем номер при смене страны
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 transition-colors"
                          >
                            <span className="text-lg">{country.flag}</span>
                            <span className="text-sm font-medium text-gray-700">{country.code}</span>
                            <span className="text-sm text-gray-600">{country.name}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Поле ввода номера */}
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className={`w-full pl-24 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors ${
                        errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder={selectedCountry.mask.replace(/#+/g, (match) => '●'.repeat(match.length))}
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                {submitStatus === "error" && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">
                      Произошла ошибка при отправке. Попробуйте еще раз.
                    </p>
                  </div>
                )}

                {/* Кнопка отправки */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Отправляем...
                    </>
                  ) : (
                    "Отправить заявку"
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Нажимая "Отправить заявку", вы соглашаетесь с обработкой персональных данных
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
