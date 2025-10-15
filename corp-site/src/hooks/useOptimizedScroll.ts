'use client';

import { useEffect, useRef, useCallback } from 'react';

interface ScrollOptions {
  throttleMs?: number;
  offset?: number;
}

/**
 * Оптимизированный хук для обработки событий прокрутки
 * Использует throttling для уменьшения нагрузки на производительность
 * 
 * @param callback - Функция, вызываемая при прокрутке
 * @param options - Настройки: throttleMs (задержка в мс), offset (смещение)
 */
export function useOptimizedScroll(
  callback: (scrollY: number) => void,
  options: ScrollOptions = {}
) {
  const { throttleMs = 100, offset = 0 } = options;
  const lastCallRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    const now = Date.now();
    
    if (now - lastCallRef.current >= throttleMs) {
      lastCallRef.current = now;
      
      // Используем requestAnimationFrame для оптимальной производительности
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY + offset;
        callback(scrollY);
      });
    }
  }, [callback, throttleMs, offset]);

  useEffect(() => {
    // Пассивный слушатель для лучшей производительности прокрутки
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);
}

/**
 * Хук для плавной прокрутки к элементу
 */
export function useSmoothScrollTo() {
  return useCallback((elementId: string, offset: number = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }, []);
}

