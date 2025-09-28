# Быстрый чек-лист развертывания Next.js на REG.RU

## 🚀 Подготовка к деплою (5 минут)

### ✅ Что нужно иметь:
- [ ] SSH доступ к серверу REG.RU
- [ ] Плавающий IP адрес
- [ ] GitHub репозиторий с вашим проектом
- [ ] Доступ к настройкам домена (если есть)

## 📋 Пошаговый процесс развертывания

### 1. Подготовка сервера (15 минут)
```bash
# Подключаемся к серверу
ssh root@ваш-плавающий-ip

# Запускаем скрипт настройки
wget https://raw.githubusercontent.com/your-repo/deployment-scripts/main/server-setup.sh
bash server-setup.sh
```

### 2. Клонирование проекта (5 минут)
```bash
cd /var/www
git clone https://github.com/ваш-username/ваш-репозиторий.git corp-site
cd corp-site/corp-site
npm install
npm run build
```

### 3. Настройка PM2 (5 минут)
```bash
# Используйте готовый файл ecosystem.config.js из репозитория
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 4. Настройка nginx (10 минут)
```bash
# Скопируйте конфигурацию
cp /path/to/nginx-configs/corp-site.conf /etc/nginx/sites-available/
ln -s /etc/nginx/sites-available/corp-site /etc/nginx/sites-enabled/

# Обновите server_name на ваш домен/IP
nano /etc/nginx/sites-available/corp-site

# Проверьте и перезапустите
nginx -t
systemctl restart nginx
```

### 5. Настройка автодеплоя (10 минут)

#### Вариант A: GitHub Actions
- [ ] Добавьте secrets в GitHub:
  - `HOST`: ваш-плавающий-ip
  - `USERNAME`: root  
  - `SSH_PRIVATE_KEY`: приватный ключ SSH
  - `PROJECT_PATH`: /var/www/corp-site
- [ ] Файл `.github/workflows/deploy.yml` уже готов!

#### Вариант B: Webhook (альтернатива)
```bash
cd /var/www
npm init -y && npm install express
# Создайте webhook скрипт (см. полное руководство)
pm2 start deploy-webhook.js --name webhook
```

### 6. SSL и домен (15 минут, опционально)
```bash
# Если есть домен
certbot --nginx -d ваш-домен.ru -d www.ваш-домен.ru
```

## 🔧 Готовые файлы в репозитории

### Основные файлы:
- `corp-site/ecosystem.config.js` - конфигурация PM2 ✅
- `corp-site/.github/workflows/deploy.yml` - GitHub Actions ✅
- `nginx-configs/corp-site.conf` - конфигурация nginx ✅
- `deployment-scripts/server-setup.sh` - настройка сервера ✅
- `deployment-scripts/deploy.sh` - скрипт ручного деплоя ✅
- `deployment-scripts/monitoring-setup.sh` - мониторинг ✅

## ⚡ Быстрые команды

### Проверка статуса:
```bash
pm2 status corp-site           # Статус PM2
systemctl status nginx        # Статус nginx  
curl http://localhost:3000     # Проверка приложения
corp-site-stats.sh            # Общая статистика (после настройки мониторинга)
```

### Обновление проекта:
```bash
# Автоматически через GitHub Actions при push в master/main
# Или вручную:
bash /var/www/corp-site/deploy.sh
```

### Логи и отладка:
```bash
pm2 logs corp-site                      # Логи приложения
tail -f /var/log/nginx/corp-site-error.log  # Логи nginx
journalctl -u nginx -f                  # Системные логи nginx
```

## 🚨 Если что-то пошло не так

### Приложение не запускается:
```bash
pm2 restart corp-site
pm2 logs corp-site
```

### Сайт недоступен:
```bash
nginx -t              # Проверить конфигурацию nginx
systemctl restart nginx
ss -tulpn | grep :3000   # Проверить порт 3000
```

### Деплой не работает:
- Проверьте SSH ключи в GitHub secrets
- Проверьте права доступа к файлам
- Посмотрите логи GitHub Actions

## 📞 Поддержка

После настройки ваш сайт будет доступен по адресу:
- `http://ваш-плавающий-ip` (сразу)
- `https://ваш-домен.ru` (после настройки SSL)

**Время полного развертывания: ~1 час**

---

💡 **Совет**: Сначала протестируйте доступность по IP, затем настраивайте домен и SSL.
