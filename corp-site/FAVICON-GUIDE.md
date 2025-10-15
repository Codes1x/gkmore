# 🐚 Favicon Guide - ГК Море

## 📋 Обзор

Favicon сайта **ГК Море** использует морскую ракушку в фирменных океанических цветах.

## 🎨 Дизайн

- **Символ**: Морская ракушка
- **Цвета**: 
  - Основной: `#03a9f5` (океанический синий)
  - Светлый: `#4fc2f8` (светлая морская пена)
  - Акцент: `#0891B2` (морской бирюзовый)
- **Стиль**: Градиент от яркого к глубокому океаническому

## 📁 Структура файлов

```
corp-site/
├── public/
│   ├── favicon.svg              # SVG favicon (основной)
│   └── seashell-icon.svg       # Исходная иконка
└── src/app/
    ├── icon.tsx                # Динамическая генерация favicon 32x32
    ├── apple-icon.tsx          # Apple Touch Icon 180x180
    └── manifest.ts             # PWA манифест
```

## 🚀 Реализованные форматы

### 1. **SVG Favicon** (`/favicon.svg`)
- Векторный формат - всегда четкий
- Поддерживается современными браузерами
- Легкий вес (1.4KB)

### 2. **PNG Icon** (динамическая генерация)
- **32x32** - стандартный размер
- Генерируется автоматически через `app/icon.tsx`
- Градиентный фон с белой иконкой

### 3. **Apple Touch Icon**
- **180x180** - для iOS устройств
- Генерируется автоматически через `app/apple-icon.tsx`
- Оптимизирован для главного экрана iPhone/iPad

### 4. **PWA Manifest**
- Поддержка Progressive Web App
- Настройки для установки на мобильные устройства
- Определены все необходимые размеры

## 🔧 Как это работает

### Next.js App Router (автоматическая генерация)

Next.js 15 автоматически обрабатывает иконки из файлов:
- `app/icon.tsx` → `/icon` (32x32 PNG)
- `app/apple-icon.tsx` → `/apple-icon` (180x180 PNG)
- `app/manifest.ts` → `/manifest.webmanifest`

### Metadata конфигурация

```typescript
// src/app/layout.tsx
icons: {
  icon: [
    { url: '/favicon.svg', type: 'image/svg+xml' },
    { url: '/icon', sizes: '32x32', type: 'image/png' },
  ],
  apple: [
    { url: '/apple-icon', sizes: '180x180', type: 'image/png' },
  ],
}
```

## 📱 Где отображается

### 🖥️ Браузеры
- **Вкладка браузера** - favicon рядом с заголовком
- **Закладки** - иконка в списке закладок
- **История** - иконка в истории просмотров

### 📱 Мобильные устройства
- **iOS Safari** - Apple Touch Icon на главном экране
- **Android Chrome** - иконка PWA при установке
- **Уведомления** - иконка в push-уведомлениях (если включены)

### 🔍 Поисковые системы
- **Google** - иконка в результатах поиска
- **Яндекс** - иконка в сниппетах
- **Bing** - иконка рядом с ссылками

## 🎨 Кастомизация

### Изменить цвета

Отредактируйте файлы `app/icon.tsx` и `app/apple-icon.tsx`:

```typescript
background: 'linear-gradient(135deg, #03a9f5 0%, #4fc2f8 100%)',
```

### Изменить иконку

Замените SVG пути в файлах или обновите `public/favicon.svg`

### Добавить больше размеров

Создайте дополнительные файлы:
- `app/icon-192.tsx` → 192x192 для Android
- `app/icon-512.tsx` → 512x512 для больших экранов

## ✅ Проверка работы

### 1. Локальная проверка
```bash
# Откройте в браузере
http://localhost:3000

# Проверьте в DevTools:
# - Elements → <head> → <link rel="icon">
# - Network → Favicon запросы
```

### 2. Разные браузеры
- ✅ Chrome/Edge - SVG + PNG
- ✅ Firefox - SVG + PNG
- ✅ Safari - Apple Touch Icon
- ✅ Mobile Safari - Apple Touch Icon 180x180

### 3. Проверка manifest
```bash
# Откройте
http://localhost:3000/manifest.webmanifest

# Должен вернуть JSON с иконками
```

## 🐛 Troubleshooting

### Favicon не обновляется?

**Решение**:
1. Очистите кэш браузера (Ctrl+Shift+Delete)
2. Жесткая перезагрузка (Ctrl+Shift+R)
3. Проверьте DevTools → Network → отключите кэш

### Иконка размыта?

**Решение**:
- Используйте SVG (автоматически четкий)
- Проверьте размеры в `icon.tsx` и `apple-icon.tsx`
- Увеличьте размер viewBox для большей детализации

### Не работает на iPhone?

**Решение**:
- Убедитесь что `apple-icon.tsx` генерирует 180x180
- Проверьте что в metadata указан `apple` в icons
- Очистите Safari кэш

## 📚 Полезные ссылки

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
- [Web App Manifest](https://web.dev/add-manifest/)
- [Favicon Checker](https://realfavicongenerator.net/)

## 🎯 Best Practices

✅ **DO**:
- Используйте SVG для векторной четкости
- Добавляйте Apple Touch Icon для iOS
- Создайте PWA manifest
- Тестируйте на разных устройствах

❌ **DON'T**:
- Не используйте только .ico (устарело)
- Не забывайте про мобильные размеры
- Не делайте слишком сложный дизайн (будет плохо виден в маленьком размере)

---

**Готово!** Ваш favicon настроен и оптимизирован! 🚀

