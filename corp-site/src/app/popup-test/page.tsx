"use client";

import { useState } from "react";
import { ContactPopup } from "@/components/contact-popup";
import { motion } from "framer-motion";

export default function PopupTestPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("Стать партнёром");

  const testButtons = [
    { title: "Стать партнёром", color: "from-cyan-500 to-blue-600" },
    { title: "Получить консультацию", color: "from-emerald-500 to-teal-600" },
    { title: "Заказать звонок", color: "from-purple-500 to-pink-600" },
    { title: "Начать сотрудничество", color: "from-orange-500 to-red-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-8">
      {/* Заголовок */}
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Тестовая страница Popup
        </h1>
        <p className="text-gray-300 text-lg">
          Здесь можно протестировать popup форму с разными заголовками и настройками
        </p>
      </div>

      {/* Секция с кнопками */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Тестовые кнопки для открытия Popup
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testButtons.map((button, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setPopupTitle(button.title);
                  setIsPopupOpen(true);
                }}
                className={`
                  relative overflow-hidden group
                  px-6 py-4 rounded-xl
                  bg-gradient-to-r ${button.color}
                  text-white font-semibold
                  shadow-lg hover:shadow-2xl
                  transition-all duration-300
                `}
              >
                {/* Анимированный блик */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                <span className="relative z-10">{button.title}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Информационная панель */}
        <div className="mt-8 bg-yellow-500/10 backdrop-blur-md rounded-xl p-6 border border-yellow-500/30">
          <h3 className="text-yellow-300 font-semibold mb-2">
            📝 Информация для тестирования:
          </h3>
          <ul className="text-gray-300 space-y-1 text-sm">
            <li>• Popup должен открываться по центру экрана</li>
            <li>• При открытии блокируется прокрутка страницы</li>
            <li>• Закрытие по клику на фон или крестик</li>
            <li>• Закрытие по клавише Escape</li>
            <li>• Анимация появления и исчезания</li>
            <li>• Адаптивная вёрстка для мобильных устройств</li>
          </ul>
        </div>

        {/* Дополнительные тестовые элементы */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h4 className="text-cyan-300 font-semibold mb-2">Позиционирование</h4>
            <p className="text-gray-400 text-sm">
              Popup центрирован через CSS transform
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h4 className="text-emerald-300 font-semibold mb-2">Анимация</h4>
            <p className="text-gray-400 text-sm">
              Framer Motion для плавных переходов
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h4 className="text-purple-300 font-semibold mb-2">Форма</h4>
            <p className="text-gray-400 text-sm">
              Имя + Телефон с выбором страны
            </p>
          </div>
        </div>

        {/* Большая кнопка внизу */}
        <div className="mt-12 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setPopupTitle("Супер предложение!");
              setIsPopupOpen(true);
            }}
            className="
              relative inline-flex items-center justify-center
              px-12 py-5 rounded-2xl
              bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600
              text-white text-lg font-bold
              shadow-2xl hover:shadow-cyan-500/50
              transition-all duration-300
              group
            "
          >
            {/* Пульсирующее свечение */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity animate-pulse" />
            
            <span className="relative z-10">
              🚀 Открыть Popup с кастомным заголовком
            </span>
          </motion.button>
        </div>

        {/* Добавим много контента для проверки блокировки скролла */}
        <div className="mt-16 space-y-4">
          <div className="h-40 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center">
            <p className="text-gray-300">Блок для проверки скролла 1</p>
          </div>
          <div className="h-40 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 rounded-xl flex items-center justify-center">
            <p className="text-gray-300">Блок для проверки скролла 2</p>
          </div>
          <div className="h-40 bg-gradient-to-r from-purple-500/20 to-pink-600/20 rounded-xl flex items-center justify-center">
            <p className="text-gray-300">Блок для проверки скролла 3</p>
          </div>
          <div className="h-40 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-xl flex items-center justify-center">
            <p className="text-gray-300">Блок для проверки скролла 4</p>
          </div>
        </div>
      </div>

      {/* Popup компонент */}
      <ContactPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)}
        title={popupTitle}
      />
    </div>
  );
}
