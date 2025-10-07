"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const services = [
  {
    title: "Уборка квартир",
    description: "Ежедневная и еженедельная уборка квартир с использованием профессиональных средств",
    image: "/images/cleaning-apartment.jpg",
    features: ["Влажная уборка полов", "Протирка пыли", "Уборка санузла", "Мытье посуды"]
  },
  {
    title: "Генеральная уборка",
    description: "Полная уборка всех помещений с мытьем окон, чисткой мебели и техники",
    image: "/images/cleaning-general.jpg",
    features: ["Мытье окон", "Чистка мебели", "Уборка кухни", "Дезинфекция"]
  },
  {
    title: "После ремонта",
    description: "Уборка строительного мусора, пыли и следов ремонтных работ",
    image: "/images/cleaning-renovation.jpg",
    features: ["Удаление пыли", "Мытье полов", "Очистка стен", "Уборка мусора"]
  },
  {
    title: "Мытьё окон",
    description: "Профессиональное мытье окон, балконов и витрин с использованием специальных средств",
    image: "/images/cleaning-windows.jpg",
    features: ["Мытье стекол", "Чистка рам", "Мытье подоконников", "Полировка"]
  },
  {
    title: "Химчистка мебели",
    description: "Глубокая чистка мягкой мебели, ковров и штор с выездом на дом",
    image: "/images/cleaning-furniture.jpg",
    features: ["Чистка диванов", "Чистка ковров", "Стирка штор", "Дезинфекция"]
  }
];

export function CleaningServices() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Наши услуги
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Полный спектр клининговых услуг для вашего комфорта
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <span className="text-teal-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
