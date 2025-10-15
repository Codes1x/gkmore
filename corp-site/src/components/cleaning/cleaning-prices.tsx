"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const prices = [
  {
    service: "Уборка квартиры",
    price: "2000 ₽",
    description: "1-комнатная квартира",
    features: ["Влажная уборка", "Протирка пыли", "Уборка санузла", "Мытье посуды"]
  },
  {
    service: "Генеральная уборка",
    price: "3500 ₽",
    description: "1-комнатная квартира",
    features: ["Мытье окон", "Чистка мебели", "Уборка кухни", "Дезинфекция"]
  },
  {
    service: "После ремонта",
    price: "5000 ₽",
    description: "1-комнатная квартира",
    features: ["Удаление пыли", "Мытье полов", "Очистка стен", "Уборка мусора"]
  },
  {
    service: "Мытьё окон",
    price: "150 ₽/м²",
    description: "За квадратный метр",
    features: ["Мытье стекол", "Чистка рам", "Мытье подоконников", "Полировка"]
  },
  {
    service: "Химчистка мебели",
    price: "от 3000 ₽",
    description: "За предмет мебели",
    features: ["Чистка диванов", "Чистка ковров", "Стирка штор", "Дезинфекция"]
  }
];

export function CleaningPrices() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Наши цены
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Прозрачные цены без скрытых доплат. Окончательная стоимость рассчитывается индивидуально
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prices.map((price, index) => (
            <motion.div
              key={price.service}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
            >
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {price.service}
                </h3>
                <div className="text-3xl font-bold text-teal-500 mb-2">
                  {price.price}
                </div>
                <p className="text-gray-600 text-sm">
                  {price.description}
                </p>
              </div>
              
              <ul className="space-y-3">
                {price.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <span className="text-teal-500 mr-3">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-6 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              >
                Заказать
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12 p-6 bg-teal-50 rounded-2xl"
        >
          <p className="text-gray-700">
            <strong>💡 Скидка 10%</strong> при заказе от 3 услуг или при повторном обращении
          </p>
        </motion.div>
      </div>
    </section>
  );
}
