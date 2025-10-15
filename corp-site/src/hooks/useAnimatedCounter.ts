"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { useInView } from 'framer-motion';

/**
 * Упрощенный и надежный хук для анимированных счётчиков
 */
export function useAnimatedCounter(
  targetValue: number,
  duration: number = 2000,
  startOnViewport: boolean = true
) {
  const [currentValue, setCurrentValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);
  
  // Используем useInView из framer-motion для лучшей совместимости
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px",
    amount: 0.3 
  });

  const startAnimation = useCallback(() => {
    if (isAnimating || hasAnimatedRef.current) return;
    
    setIsAnimating(true);
    setCurrentValue(0);
    startTimeRef.current = performance.now();
    hasAnimatedRef.current = true;
    
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
      animationRef.current = null;
    }
    setIsAnimating(false);
  }, []);

  // Запускаем анимацию при появлении в viewport
  useEffect(() => {
    if (startOnViewport && isInView && !hasAnimatedRef.current) {
      // Небольшая задержка для плавности
      const timer = setTimeout(() => {
        startAnimation();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, startOnViewport, startAnimation]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return {
    ref,
    currentValue,
    isAnimating,
    startAnimation,
    stopAnimation
  };
}
