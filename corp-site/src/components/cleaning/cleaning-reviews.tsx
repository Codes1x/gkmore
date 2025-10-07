"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const reviews = [
  {
    name: "Анна Петрова",
    rating: 5,
    text: "Отличная уборка! Приехали вовремя, работали аккуратно, все блестит. Особенно понравилось, что использовали экологичные средства — никакого запаха химии.",
    image: "/images/review-1.jpg",
    service: "Генеральная уборка"
  },
  {
    name: "Михаил Соколов",
    rating: 5,
    text: "Заказывал уборку после ремонта. Ребята справились на отлично! Убрали всю пыль, помыли окна, привели в порядок квартиру. Рекомендую!",
    image: "/images/review-2.jpg",
    service: "Уборка после ремонта"
  },
  {
    name: "Елена Козлова",
    rating: 5,
    text: "Пользуюсь услугами уже полгода. Всегда довольна результатом. Клинеры вежливые, работают быстро и качественно. Цены адекватные.",
    image: "/images/review-3.jpg",
    service: "Регулярная уборка"
  }
];

export function CleaningReviews() {
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
            Отзывы наших клиентов
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Более 500 довольных клиентов доверяют нам уборку своих домов
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={review.image}
                    alt={review.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{review.name}</h3>
                  <p className="text-sm text-gray-600">{review.service}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">⭐</span>
                ))}
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                "{review.text}"
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-4 p-6 bg-teal-50 rounded-2xl">
            <div className="text-3xl">📊</div>
            <div className="text-left">
              <div className="font-semibold text-gray-900">4.9/5</div>
              <div className="text-sm text-gray-600">Средняя оценка клиентов</div>
            </div>
            <div className="text-3xl">👥</div>
            <div className="text-left">
              <div className="font-semibold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Довольных клиентов</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
