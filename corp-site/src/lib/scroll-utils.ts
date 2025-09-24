/**
 * Утилиты для плавной прокрутки и оптимизации анимаций
 */

// Плавная прокрутка к элементу
export function smoothScrollTo(elementId: string, offset: number = 0) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

// Плавная прокрутка к началу страницы
export function smoothScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Throttle функция для оптимизации обработчиков скролла
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Debounce функция для оптимизации обработчиков скролла
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Вычисление прогресса скролла для элемента
export function getScrollProgress(element: HTMLElement): number {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const elementHeight = rect.height;
  
  // Элемент полностью выше экрана
  if (rect.bottom < 0) return 0;
  
  // Элемент полностью ниже экрана
  if (rect.top > windowHeight) return 1;
  
  // Элемент видим на экране
  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
  return Math.max(0, Math.min(1, visibleHeight / elementHeight));
}

// Проверка, находится ли элемент в области видимости
export function isElementInViewport(element: HTMLElement, threshold: number = 0.1): boolean {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  
  return (
    rect.top <= windowHeight * (1 - threshold) &&
    rect.bottom >= windowHeight * threshold &&
    rect.left <= windowWidth &&
    rect.right >= 0
  );
}

// Получение позиции скролла в процентах
export function getScrollPercentage(): number {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  return scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
}

// Интерполяция значений для плавных переходов
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

// Easing функции для анимаций
export const easing = {
  easeInOut: (t: number): number => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeOut: (t: number): number => 1 - Math.pow(1 - t, 3),
  easeIn: (t: number): number => t * t * t,
  linear: (t: number): number => t
};

// Форматирование чисел для счётчиков
export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

// Анимация счётчика с оптимизацией для быстрой прокрутки
export function animateCounter(
  startValue: number,
  endValue: number,
  duration: number,
  onUpdate: (value: number) => void,
  easingFunction: (t: number) => number = easing.easeOut
): () => void {
  let startTime: number | null = null;
  let animationId: number;
  let isCancelled = false;

  const animate = (currentTime: number) => {
    if (isCancelled) return;
    
    if (startTime === null) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easedProgress = easingFunction(progress);
    const currentValue = lerp(startValue, endValue, easedProgress);
    
    onUpdate(currentValue);
    
    if (progress < 1) {
      animationId = requestAnimationFrame(animate);
    }
  };

  animationId = requestAnimationFrame(animate);

  // Возвращаем функцию для отмены анимации
  return () => {
    isCancelled = true;
    cancelAnimationFrame(animationId);
  };
}
