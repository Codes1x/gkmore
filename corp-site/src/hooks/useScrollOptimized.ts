"use client";

import { useEffect, useRef, useCallback, useState } from 'react';
import { throttle, debounce, getScrollPercentage, isElementInViewport } from '@/lib/scroll-utils';

interface UseScrollOptimizedOptions {
  throttleMs?: number;
  debounceMs?: number;
  onScroll?: (scrollY: number, scrollPercentage: number) => void;
  onScrollEnd?: () => void;
}

/**
 * Хук для оптимизированной работы с прокруткой
 * Автоматически применяет throttle и debounce для производительности
 */
export function useScrollOptimized(options: UseScrollOptimizedOptions = {}) {
  const {
    throttleMs = 16, // ~60fps
    debounceMs = 100,
    onScroll,
    onScrollEnd
  } = options;

  const [scrollY, setScrollY] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const isScrollingRef = useRef(false);

  // Throttled обработчик скролла для плавных анимаций
  const handleScroll = useCallback(
    throttle(() => {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      const currentScrollPercentage = getScrollPercentage();
      
      setScrollY(currentScrollY);
      setScrollPercentage(currentScrollPercentage);
      
      // Устанавливаем флаг скролла
      if (!isScrollingRef.current) {
        setIsScrolling(true);
        isScrollingRef.current = true;
      }
      
      // Вызываем пользовательский обработчик
      onScroll?.(currentScrollY, currentScrollPercentage);
      
      // Сбрасываем таймер скролла
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Debounced обработчик окончания скролла
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        isScrollingRef.current = false;
        onScrollEnd?.();
      }, debounceMs);
    }, throttleMs),
    [throttleMs, debounceMs, onScroll, onScrollEnd]
  );

  useEffect(() => {
    // Добавляем обработчик с passive: true для лучшей производительности
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Инициализируем значения
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  return {
    scrollY,
    scrollPercentage,
    isScrolling
  };
}

/**
 * Хук для отслеживания видимости элемента с оптимизацией
 */
export function useElementInViewport(
  threshold: number = 0.1,
  rootMargin: string = '0px'
) {
  const [isInViewport, setIsInViewport] = useState(false);
  const [hasBeenInViewport, setHasBeenInViewport] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const checkInViewport = useCallback(
    throttle(() => {
      if (!elementRef.current) return;
      
      const inViewport = isElementInViewport(elementRef.current, threshold);
      setIsInViewport(inViewport);
      
      if (inViewport && !hasBeenInViewport) {
        setHasBeenInViewport(true);
      }
    }, 16),
    [threshold, hasBeenInViewport]
  );

  useEffect(() => {
    window.addEventListener('scroll', checkInViewport, { passive: true });
    window.addEventListener('resize', checkInViewport, { passive: true });
    
    // Проверяем сразу
    checkInViewport();
    
    return () => {
      window.removeEventListener('scroll', checkInViewport);
      window.removeEventListener('resize', checkInViewport);
    };
  }, [checkInViewport]);

  return {
    elementRef,
    isInViewport,
    hasBeenInViewport
  };
}

/**
 * Хук для анимации счётчиков с синхронизацией со скроллом
 */
export function useAnimatedCounter(
  targetValue: number,
  duration: number = 2000,
  startOnViewport: boolean = true
) {
  const [currentValue, setCurrentValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const { elementRef, isInViewport, hasBeenInViewport } = useElementInViewport();

  const startAnimation = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentValue(0);
    startTimeRef.current = performance.now();
    
    const animate = (currentTime: number) => {
      if (!startTimeRef.current) return;
      
      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      // Используем easeOut для более естественной анимации
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const newValue = Math.round(targetValue * easedProgress);
      
      setCurrentValue(newValue);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentValue(targetValue);
        setIsAnimating(false);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  }, [targetValue, duration, isAnimating]);

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = undefined;
    }
    setIsAnimating(false);
  }, []);

  // Запускаем анимацию при появлении в viewport
  useEffect(() => {
    if (startOnViewport && isInViewport && !hasBeenInViewport) {
      startAnimation();
    }
  }, [isInViewport, hasBeenInViewport, startOnViewport, startAnimation]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return {
    elementRef,
    currentValue,
    isAnimating,
    startAnimation,
    stopAnimation
  };
}
