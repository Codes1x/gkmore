"use client";

import { motion } from "framer-motion";
import { useScrollOptimized, useElementInViewport } from "@/hooks/useScrollOptimized";
import { OptimizedCounter, AnimatedStat, AnimatedProgressBar } from "./optimized-counter";
import { SmoothScrollLink } from "./smooth-scroll-provider";

/**
 * Пример компонента с оптимизированной прокруткой и анимациями
 * Демонстрирует все возможности системы оптимизации
 */
export function ScrollOptimizationExample() {
  // Используем хук для отслеживания прокрутки
  const { scrollY, scrollPercentage, isScrolling } = useScrollOptimized({
    onScroll: (scrollY, scrollPercentage) => {
      // Можно добавить дополнительную логику при прокрутке
      console.log(`Scroll: ${scrollY}px, ${scrollPercentage.toFixed(1)}%`);
    },
    onScrollEnd: () => {
      console.log('Прокрутка завершена');
    }
  });

  // Отслеживаем видимость элемента
  const { elementRef, isInViewport, hasBeenInViewport } = useElementInViewport(0.3);

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Индикатор прокрутки */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 z-50"
          style={{ scaleX: scrollPercentage / 100 }}
          initial={{ scaleX: 0 }}
        />

        {/* Заголовок с анимацией при появлении */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Оптимизированная прокрутка
          </h2>
          <p className="text-lg text-muted-foreground">
            Плавные анимации и синхронизированные счётчики
          </p>
        </motion.div>

        {/* Статистика с оптимизированными счётчиками */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <AnimatedStat
            label="Пользователей"
            value={1250}
            suffix="+"
            icon="👥"
            color="cyan"
            delay={0}
          />
          <AnimatedStat
            label="Доходность"
            value={35}
            suffix="%"
            icon="💰"
            color="green"
            delay={0.2}
          />
          <AnimatedStat
            label="Удовлетворённость"
            value={98}
            suffix="%"
            icon="⭐"
            color="purple"
            delay={0.4}
          />
        </div>

        {/* Прогресс-бары с анимацией */}
        <div className="space-y-8 mb-16">
          <AnimatedProgressBar
            value={87}
            label="Загрузка текущий месяц"
            color="cyan"
            delay={0}
          />
          <AnimatedProgressBar
            value={65}
            label="План выполнения"
            color="blue"
            delay={0.2}
          />
          <AnimatedProgressBar
            value={92}
            label="Удовлетворённость гостей"
            color="green"
            delay={0.4}
          />
        </div>

        {/* Элемент с отслеживанием видимости */}
        <motion.div
          ref={elementRef}
          className={`p-8 rounded-2xl border-2 transition-colors duration-300 ${
            isInViewport 
              ? 'border-green-500 bg-green-500/10' 
              : 'border-gray-300 bg-gray-50'
          }`}
        >
          <h3 className="text-2xl font-semibold mb-4">
            Отслеживание видимости
          </h3>
          <p className="text-muted-foreground mb-4">
            Этот блок меняет цвет в зависимости от видимости на экране.
          </p>
          <div className="space-y-2 text-sm">
            <div>В области видимости: {isInViewport ? '✅ Да' : '❌ Нет'}</div>
            <div>Был в области видимости: {hasBeenInViewport ? '✅ Да' : '❌ Нет'}</div>
            <div>Позиция прокрутки: {scrollY.toFixed(0)}px</div>
            <div>Процент прокрутки: {scrollPercentage.toFixed(1)}%</div>
            <div>Идёт прокрутка: {isScrolling ? '✅ Да' : '❌ Нет'}</div>
          </div>
        </motion.div>

        {/* Ссылки с плавной прокруткой */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-8">
            Плавная прокрутка по якорям
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <SmoothScrollLink
              to="contacts"
              className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              К контактам
            </SmoothScrollLink>
            <SmoothScrollLink
              to="portfolio"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              К портфелю
            </SmoothScrollLink>
            <SmoothScrollLink
              to="about"
              className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              О компании
            </SmoothScrollLink>
          </div>
        </div>

        {/* Демонстрация оптимизированного счётчика */}
        <div className="mt-16 p-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Оптимизированный счётчик
          </h3>
          <div className="text-center">
            <OptimizedCounter
              value={1234567}
              prefix="₽"
              className="text-4xl font-bold text-cyan-600"
            />
            <p className="text-muted-foreground mt-2">
              Синхронизирован с прокруткой и не отстаёт при быстром скролле
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Компонент для демонстрации производительности
 */
export function PerformanceDemo() {
  const { scrollY, scrollPercentage } = useScrollOptimized();

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-sm font-mono z-50">
      <div>Scroll: {scrollY.toFixed(0)}px</div>
      <div>Progress: {scrollPercentage.toFixed(1)}%</div>
      <div>FPS: ~60 (оптимизировано)</div>
    </div>
  );
}
