import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Оптимизация производительности для мобильных устройств */
  
  // Оптимизация изображений
  images: {
    formats: ['image/avif', 'image/webp'], // Современные форматы для меньшего размера
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Размеры для разных устройств
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Размеры миниатюр
    minimumCacheTTL: 60 * 60 * 24 * 30, // Кэширование на 30 дней
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Компрессия
  compress: true,

  // Оптимизация сборки
  swcMinify: true,

  // Экспериментальные оптимизации
  experimental: {
    optimizeCss: true, // Минификация CSS
    optimizePackageImports: ['lucide-react', 'framer-motion'], // Оптимизация импортов
  },

  // Оптимизация для production
  poweredByHeader: false,
  
  // Настройки для лучшей производительности
  reactStrictMode: true,
};

export default nextConfig;
