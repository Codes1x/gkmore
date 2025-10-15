'use client';

import { ReactNode, memo } from 'react';
import { useInView } from 'react-intersection-observer';

interface LazySectionProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  className?: string;
  id?: string;
  delay?: number;
}

/**
 * Компонент для ленивой загрузки секций с оптимизацией производительности
 * Использует Intersection Observer API для загрузки контента только при просмотре
 */
export const LazySection = memo(function LazySection({
  children,
  threshold = 0.1,
  rootMargin = '100px 0px',
  triggerOnce = true,
  className = '',
  id,
  delay = 0,
}: LazySectionProps) {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce,
    delay,
  });

  return (
    <div ref={ref} className={className} id={id}>
      {inView ? (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
          {children}
        </div>
      ) : (
        // Placeholder для сохранения высоты при прокрутке
        <div className="min-h-[200px]" />
      )}
    </div>
  );
});

