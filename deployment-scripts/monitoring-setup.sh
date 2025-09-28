#!/bin/bash

# Скрипт для настройки мониторинга и логирования
# Запускать от пользователя root

set -e

echo "📊 Настройка мониторинга и логирования..."

# Создаем директории для логов
mkdir -p /var/log/pm2
mkdir -p /var/log/nginx
mkdir -p /var/log/corp-site

# Настройка logrotate для PM2
echo "📝 Настраиваем ротацию логов PM2..."
cat > /etc/logrotate.d/pm2 << EOF
/var/log/pm2/*.log {
    daily
    missingok
    rotate 30
    compress
    notifempty
    create 644 root root
    postrotate
        pm2 reloadLogs
    endscript
}
EOF

# Настройка logrotate для nginx
echo "📝 Настраиваем ротацию логов nginx..."
cat > /etc/logrotate.d/nginx << EOF
/var/log/nginx/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        if [ -f /var/run/nginx.pid ]; then
            kill -USR1 \$(cat /var/run/nginx.pid)
        fi
    endscript
}
EOF

# Установка и настройка fail2ban для защиты SSH
echo "🔒 Настраиваем fail2ban..."
apt install -y fail2ban

cat > /etc/fail2ban/jail.local << EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log
maxretry = 3

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
logpath = /var/log/nginx/*error.log
maxretry = 6

[nginx-noscript]
enabled = true
filter = nginx-noscript
logpath = /var/log/nginx/*access.log
maxretry = 6

[nginx-badbots]
enabled = true
filter = nginx-badbots
logpath = /var/log/nginx/*access.log
maxretry = 2
EOF

systemctl enable fail2ban
systemctl start fail2ban

# Создание скрипта для мониторинга приложения
echo "📊 Создаем скрипт мониторинга..."
cat > /usr/local/bin/monitor-corp-site.sh << 'EOF'
#!/bin/bash

# Скрипт мониторинга состояния приложения
LOG_FILE="/var/log/corp-site/monitor.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

# Функция логирования
log() {
    echo "[$DATE] $1" >> $LOG_FILE
}

# Проверка статуса PM2
if ! pm2 describe corp-site &> /dev/null; then
    log "ERROR: PM2 процесс corp-site не запущен!"
    pm2 start ecosystem.config.js
    log "INFO: Перезапущен PM2 процесс corp-site"
fi

# Проверка доступности сайта
if ! curl -f -s http://localhost:3000 > /dev/null; then
    log "ERROR: Сайт недоступен на localhost:3000"
    pm2 restart corp-site
    log "INFO: Перезапущен corp-site из-за недоступности"
else
    log "INFO: Сайт работает нормально"
fi

# Проверка использования памяти
MEMORY_USAGE=$(free | grep Mem | awk '{printf("%.2f\n", $3/$2 * 100.0)}')
if (( $(echo "$MEMORY_USAGE > 90" | bc -l) )); then
    log "WARNING: Высокое использование памяти: $MEMORY_USAGE%"
fi

# Проверка места на диске
DISK_USAGE=$(df -h / | awk 'NR==2{print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 90 ]; then
    log "WARNING: Высокое использование диска: $DISK_USAGE%"
fi
EOF

chmod +x /usr/local/bin/monitor-corp-site.sh

# Добавляем в crontab для запуска каждые 5 минут
echo "⏰ Настраиваем cron для мониторинга..."
(crontab -l 2>/dev/null; echo "*/5 * * * * /usr/local/bin/monitor-corp-site.sh") | crontab -

# Создание скрипта для показа статистики
cat > /usr/local/bin/corp-site-stats.sh << 'EOF'
#!/bin/bash

echo "=== Статистика Corp Site ==="
echo ""

echo "📊 Статус PM2:"
pm2 status corp-site

echo ""
echo "💾 Использование ресурсов:"
echo "Память: $(free -h | awk 'NR==2{printf "%.1f/%.1fGB (%.2f%%)\n", $3/1024, $2/1024, $3*100/$2}')"
echo "Диск: $(df -h / | awk 'NR==2{print $5 " используется"}')"
echo "CPU: $(top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1"% используется"}')"

echo ""
echo "📈 Последние логи PM2:"
tail -n 5 /var/log/pm2/corp-site.log 2>/dev/null || echo "Логи не найдены"

echo ""
echo "🌐 Статус nginx:"
systemctl is-active nginx
echo "Активные соединения: $(ss -tuln | grep :80 | wc -l)"

echo ""
echo "🔒 Статус fail2ban:"
fail2ban-client status sshd 2>/dev/null || echo "fail2ban не настроен"
EOF

chmod +x /usr/local/bin/corp-site-stats.sh

echo "✅ Мониторинг настроен!"
echo ""
echo "📋 Полезные команды:"
echo "corp-site-stats.sh - показать статистику"
echo "pm2 logs corp-site - показать логи приложения"
echo "pm2 monit - мониторинг PM2"
echo "tail -f /var/log/corp-site/monitor.log - мониторинг системы"
