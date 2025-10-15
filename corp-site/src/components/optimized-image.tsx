'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
  lowQualityPlaceholder?: string;
}

/**
 * Оптимизированный компонент изображения с прогрессивной загрузкой
 * - Автоматический lazy loading
 * - Blur placeholder
 * - Оптимизация для мобильных устройств
 */
export function OptimizedImage({
  src,
  alt,
  lowQualityPlaceholder,
  className = '',
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        className={`
          duration-700 ease-in-out
          ${isLoading ? 'scale-105 blur-sm' : 'scale-100 blur-0'}
        `}
        onLoad={() => setIsLoading(false)}
        loading={priority ? 'eager' : 'lazy'}
        priority={priority}
        quality={priority ? 90 : 75}
        placeholder={lowQualityPlaceholder ? 'blur' : 'empty'}
        {...props}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse" />
      )}
    </div>
  );
}

