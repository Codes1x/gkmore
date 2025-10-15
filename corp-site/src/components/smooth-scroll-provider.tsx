"use client";

import { useEffect, ReactNode } from 'react';
import { smoothScrollTo } from '@/lib/scroll-utils';

interface SmoothScrollProviderProps {
  children: ReactNode;
  offset?: number; // Отступ от верха при прокрутке к якорям
}

/**
 * Провайдер для плавной прокрутки по якорным ссылкам
 * Автоматически обрабатывает клики по ссылкам с href="#id"
 */
export function SmoothScrollProvider({ children, offset = 80 }: SmoothScrollProviderProps) {
  useEffect(() => {
    // Обработчик кликов по якорным ссылкам
    const handleAnchorClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;
      
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      
      // Извлекаем ID из href (убираем #)
      const elementId = href.substring(1);
      
      // Проверяем, существует ли элемент с таким ID
      const targetElement = document.getElementById(elementId);
      if (!targetElement) return;
      
      // Предотвращаем стандартное поведение браузера
      event.preventDefault();
      
      // Выполняем плавную прокрутку
      smoothScrollTo(elementId, offset);
    };

    // Добавляем обработчик на весь документ
    document.addEventListener('click', handleAnchorClick);
    
    // Обработчик для клавиатуры (Enter на якорных ссылках)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const target = event.target as HTMLElement;
        const link = target.closest('a[href^="#"]') as HTMLAnchorElement;
        
        if (link) {
          const href = link.getAttribute('href');
          if (href && href !== '#') {
            const elementId = href.substring(1);
            const targetElement = document.getElementById(elementId);
            
            if (targetElement) {
              event.preventDefault();
              smoothScrollTo(elementId, offset);
            }
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Очистка обработчиков
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [offset]);

  return <>{children}</>;
}

/**
 * Компонент для программной плавной прокрутки
 */
interface SmoothScrollLinkProps {
  to: string;
  offset?: number;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function SmoothScrollLink({ 
  to, 
  offset = 80, 
  children, 
  className,
  onClick 
}: SmoothScrollLinkProps) {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    
    // Выполняем пользовательский обработчик
    onClick?.();
    
    // Выполняем плавную прокрутку
    smoothScrollTo(to, offset);
  };

  return (
    <a 
      href={`#${to}`}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
