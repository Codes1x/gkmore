#!/bin/bash

# Скрипт для проверки статуса развертывания
# Использование: bash status-check.sh

echo "🔍 Проверка статуса развертывания Next.js проекта..."
echo "=================================================="

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Функция для проверки статуса
check_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
    fi
}

# Функция для вывода предупреждений
check_warning() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${YELLOW}⚠️ $2${NC}"
    fi
}

echo ""
echo "🐳 Проверка базовых сервисов:"

# Проверка PM2
pm2 describe corp-site &> /dev/null
check_status $? "PM2 процесс corp-site запущен"

# Проверка nginx
systemctl is-active --quiet nginx
check_status $? "nginx сервис активен"

# Проверка портов
ss -tulpn | grep :3000 &> /dev/null
check_status $? "Порт 3000 (Next.js) прослушивается"

ss -tulpn | grep :80 &> /dev/null  
check_status $? "Порт 80 (HTTP) прослушивается"

ss -tulpn | grep :443 &> /dev/null
check_warning $? "Порт 443 (HTTPS) прослушивается"

echo ""
echo "🌐 Проверка доступности:"

# Проверка локального доступа
curl -f -s http://localhost:3000 > /dev/null
check_status $? "Next.js приложение отвечает на localhost:3000"

# Проверка через nginx
curl -f -s http://localhost > /dev/null
check_status $? "nginx прокси работает (localhost:80)"

echo ""
echo "📊 Информация о ресурсах:"

# Использование памяти
MEMORY_USAGE=$(free | grep Mem | awk '{printf("%.1f", $3*100/$2)}')
echo "💾 Использование памяти: $MEMORY_USAGE%"

# Использование диска
DISK_USAGE=$(df -h / | awk 'NR==2{print $5}')
echo "💽 Использование диска: $DISK_USAGE"

# Загрузка CPU
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{printf("%.1f", 100 - $1)}')
echo "🖥️ Загрузка CPU: $CPU_USAGE%"

echo ""
echo "📋 Статус PM2 процессов:"
pm2 status corp-site 2>/dev/null || echo "PM2 процесс corp-site не найден"

echo ""
echo "🔒 SSL сертификат:"
if command -v certbot &> /dev/null; then
    CERT_INFO=$(certbot certificates 2>/dev/null | grep -A 1 "Certificate Name" | tail -1)
    if [[ -n "$CERT_INFO" ]]; then
        echo -e "${GREEN}✅ SSL сертификат установлен${NC}"
        echo "$CERT_INFO"
    else
        echo -e "${YELLOW}⚠️ SSL сертификат не найден${NC}"
    fi
else
    echo -e "${YELLOW}⚠️ certbot не установлен${NC}"
fi

echo ""
echo "📁 Структура проекта:"
if [ -d "/var/www/corp-site" ]; then
    echo -e "${GREEN}✅ Директория проекта существует${NC}"
    echo "📦 Размер проекта: $(du -sh /var/www/corp-site 2>/dev/null | cut -f1)"
    
    if [ -f "/var/www/corp-site/corp-site/package.json" ]; then
        echo -e "${GREEN}✅ package.json найден${NC}"
        PROJECT_NAME=$(grep '"name"' /var/www/corp-site/corp-site/package.json | cut -d'"' -f4)
        echo "🏷️ Имя проекта: $PROJECT_NAME"
    fi
    
    if [ -d "/var/www/corp-site/corp-site/.next" ]; then
        echo -e "${GREEN}✅ Build директория .next существует${NC}"
        BUILD_DATE=$(stat -c %y /var/www/corp-site/corp-site/.next 2>/dev/null | cut -d' ' -f1)
        echo "🔨 Дата последней сборки: $BUILD_DATE"
    else
        echo -e "${RED}❌ Build директория .next не найдена${NC}"
    fi
else
    echo -e "${RED}❌ Директория проекта не найдена${NC}"
fi

echo ""
echo "📊 Последние логи (последние 5 строк):"
echo "--- PM2 логи ---"
tail -n 5 /var/log/pm2/corp-site.log 2>/dev/null || echo "Логи PM2 не найдены"

echo "--- nginx error логи ---"  
tail -n 5 /var/log/nginx/corp-site-error.log 2>/dev/null || echo "Логи nginx error не найдены"

echo ""
echo "🌍 Внешний IP адрес:"
EXTERNAL_IP=$(curl -s -4 ifconfig.me 2>/dev/null || echo "Не удалось определить")
echo "🌐 Ваш сайт доступен по адресу: http://$EXTERNAL_IP"

echo ""
echo "=================================================="
echo "✅ Проверка завершена!"
echo ""
echo "💡 Полезные команды:"
echo "pm2 logs corp-site       - показать логи приложения"
echo "pm2 restart corp-site    - перезапустить приложение"  
echo "systemctl status nginx   - статус nginx"
echo "nginx -t                 - проверить конфигурацию nginx"
echo "corp-site-stats.sh       - подробная статистика (если настроен мониторинг)"
