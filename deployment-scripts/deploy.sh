#!/bin/bash

# Скрипт для ручного деплоя проекта на сервер
# Использование: bash deploy.sh

set -e

PROJECT_DIR="/var/www/corp-site"
APP_DIR="$PROJECT_DIR/corp-site"

echo "🚀 Начинаем деплой..."

# Переходим в директорию проекта
cd $PROJECT_DIR

# Останавливаем приложение
echo "⏹️ Останавливаем приложение..."
pm2 stop corp-site || echo "Приложение не было запущено"

# Обновляем код
echo "📦 Обновляем код из репозитория..."
git pull origin master || git pull origin main

# Переходим в директорию приложения
cd $APP_DIR

# Устанавливаем зависимости
echo "📦 Устанавливаем зависимости..."
npm ci

# Собираем проект
echo "🔨 Собираем проект..."
npm run build

# Запускаем приложение
echo "▶️ Запускаем приложение..."
pm2 restart corp-site || pm2 start ecosystem.config.js

# Сохраняем конфигурацию PM2
pm2 save

echo "✅ Деплой завершен успешно!"
echo "🌐 Ваш сайт доступен по адресу: http://$(curl -s ifconfig.me)"

# Показываем статус приложения
echo "📊 Статус приложения:"
pm2 status corp-site
