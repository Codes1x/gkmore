"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const contacts = [
  {
    icon: "📞",
    title: "Телефон",
    value: "+7 (900) 001-66-58",
    href: "tel:+79000016658",
    description: "Звоните в любое время"
  },
  {
    icon: "💬",
    title: "WhatsApp",
    value: "+7 (900) 001-66-58",
    href: "https://wa.me/79000016658",
    description: "Быстрая связь через WhatsApp"
  },
  {
    icon: "✈️",
    title: "Telegram",
    value: "@CleanGKMore",
    href: "https://t.me/CleanGKMore",
    description: "Пишите в Telegram"
  },
  {
    icon: "📍",
    title: "Адрес",
    value: "г. Сочи, пгт. Дагомыс, ш. Барановское, 8а",
    href: "https://yandex.ru/maps/-/CLFhJONO",
    description: "Наш офис в центре Сочи"
  }
];

export function CleaningContacts() {
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
            Контакты
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Свяжитесь с нами любым удобным способом
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-teal-50 transition-colors duration-300"
            >
              <div className="text-3xl mb-4">{contact.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {contact.title}
              </h3>
              <a
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-teal-600 hover:text-teal-700 font-medium block mb-2"
              >
                {contact.value}
              </a>
              <p className="text-sm text-gray-600">
                {contact.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg"
        >
          <div className="h-96">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae9d377947107c288533b56765847c8dd9fc58813c2ca7e13dc35666edd9c611c"
              width="100%"
              height="100%"
              frameBorder="0"
              className="border-0"
              title="Карта офиса клининговой компании в Сочи"
            />
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-gray-600">
            © 2025 ЧистоСочи. Все права защищены.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
