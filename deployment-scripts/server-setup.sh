#!/bin/bash

# Скрипт для первоначальной настройки сервера
# Запускать от пользователя root
# Использование: bash server-setup.sh

set -e

echo "🛠️ Настройка сервера для Next.js проекта..."

# Обновляем систему
echo "📦 Обновляем систему..."
apt update && apt upgrade -y

# Устанавливаем необходимые пакеты
echo "📦 Устанавливаем базовые пакеты..."
apt install -y git curl build-essential nginx software-properties-common

# Устанавливаем Node.js 20.x
echo "📦 Устанавливаем Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Проверяем версии
echo "✅ Установленные версии:"
echo "Node.js: $(node -v)"
echo "npm: $(npm -v)"

# Устанавливаем PM2
echo "📦 Устанавливаем PM2..."
npm install -g pm2

# Создаем директории
echo "📁 Создаем необходимые директории..."
mkdir -p /var/www
mkdir -p /var/log/pm2

# Настраиваем nginx
echo "🌐 Настраиваем nginx..."
systemctl start nginx
systemctl enable nginx

# Настраиваем фаервол (если используется ufw)
if command -v ufw &> /dev/null; then
    echo "🔒 Настраиваем фаервол..."
    ufw allow ssh
    ufw allow 'Nginx Full'
    ufw --force enable
fi

# Устанавливаем certbot для SSL
echo "🔒 Устанавливаем certbot для SSL..."
apt install -y certbot python3-certbot-nginx

echo "✅ Настройка сервера завершена!"
echo "📋 Следующие шаги:"
echo "1. Склонируйте ваш репозиторий в /var/www/"
echo "2. Создайте конфигурацию nginx"
echo "3. Настройте PM2"
echo "4. Получите SSL сертификат"
