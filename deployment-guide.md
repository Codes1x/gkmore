# Развертывание Next.js проекта на REG.RU облачном сервере

## Пререквизиты
- REG.RU облачный сервер с Node.js
- Доступ к ISPmanager
- SSH доступ к серверу
- Плавающий IP
- GitHub репозиторий с проектом

## 1. Подготовка сервера

### 1.1 Подключение к серверу
```bash
ssh root@ваш-плавающий-ip
```

### 1.2 Обновление системы
```bash
# Для Ubuntu/Debian
apt update && apt upgrade -y

# Для CentOS/RHEL
yum update -y
```

### 1.3 Установка необходимых пакетов
```bash
# Устанавливаем Git, curl, build-essential
apt install -y git curl build-essential

# Устанавливаем nginx
apt install -y nginx

# Запускаем и включаем автозагрузку nginx
systemctl start nginx
systemctl enable nginx
```

### 1.4 Установка Node.js (если не установлен или нужна другая версия)
```bash
# Устанавливаем Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt-get install -y nodejs

# Проверяем версии
node -v
npm -v
```

### 1.5 Установка PM2
```bash
npm install -g pm2
```

## 2. Клонирование и настройка проекта

### 2.1 Создание директории для проектов
```bash
mkdir -p /var/www
cd /var/www
```

### 2.2 Клонирование репозитория
```bash
git clone https://github.com/ваш-username/ваш-репозиторий.git corp-site
cd corp-site/corp-site
```

### 2.3 Установка зависимостей
```bash
npm install
```

### 2.4 Создание файла окружения
```bash
nano .env.local
```

Содержимое `.env.local`:
```
NODE_ENV=production
SITE_URL=http://ваш-плавающий-ip
# Добавьте другие переменные окружения если нужны
```

### 2.5 Сборка проекта
```bash
npm run build
```

## 3. Настройка PM2

### 3.1 Создание ecosystem файла
```bash
nano ecosystem.config.js
```

Содержимое `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'corp-site',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/corp-site/corp-site',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/pm2/corp-site-err.log',
    out_file: '/var/log/pm2/corp-site-out.log',
    log_file: '/var/log/pm2/corp-site.log',
    max_restarts: 10,
    min_uptime: '10s'
  }]
}
```

### 3.2 Создание директории для логов
```bash
mkdir -p /var/log/pm2
```

### 3.3 Запуск приложения
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 4. Настройка nginx

### 4.1 Создание конфигурации nginx
```bash
nano /etc/nginx/sites-available/corp-site
```

Содержимое конфигурации:
```nginx
server {
    listen 80;
    server_name ваш-плавающий-ip ваш-домен.ru www.ваш-домен.ru;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Static files caching
    location /_next/static/ {
        alias /var/www/corp-site/corp-site/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /static/ {
        alias /var/www/corp-site/corp-site/public/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Main proxy
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4.2 Активация конфигурации
```bash
ln -s /etc/nginx/sites-available/corp-site /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

## 5. Настройка SSL (Certbot)

### 5.1 Установка Certbot
```bash
apt install -y certbot python3-certbot-nginx
```

### 5.2 Получение SSL сертификата
```bash
certbot --nginx -d ваш-домен.ru -d www.ваш-домен.ru
```

## 6. Автоматический деплой из GitHub

### Вариант A: GitHub Actions (Рекомендуемый)

#### 6.1 Создание SSH ключа на сервере
```bash
ssh-keygen -t rsa -b 4096 -C "deploy@corp-site"
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
```

Скопируйте приватный ключ:
```bash
cat ~/.ssh/id_rsa
```

#### 6.2 Добавление secrets в GitHub
В настройках репозитория GitHub:
- `HOST`: ваш-плавающий-ip
- `USERNAME`: root
- `SSH_PRIVATE_KEY`: содержимое приватного ключа
- `PROJECT_PATH`: /var/www/corp-site

#### 6.3 Создание GitHub Action
В папке `.github/workflows/deploy.yml` уже создан готовый workflow файл.

### Вариант B: Webhook деплой

#### 6.1 Создание webhook скрипта
```bash
nano /var/www/deploy-webhook.js
```

Содержимое:
```javascript
const express = require('express');
const { exec } = require('child_process');
const crypto = require('crypto');

const app = express();
const PORT = 9000;
const SECRET = 'ваш-webhook-секрет'; // Замените на свой секрет

app.use(express.json());

function verifySignature(payload, signature) {
    const hmac = crypto.createHmac('sha256', SECRET);
    const digest = hmac.update(payload).digest('hex');
    const checksum = `sha256=${digest}`;
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(checksum));
}

app.post('/deploy', (req, res) => {
    const signature = req.headers['x-hub-signature-256'];
    const payload = JSON.stringify(req.body);

    if (!verifySignature(payload, signature)) {
        return res.status(401).send('Unauthorized');
    }

    if (req.body.ref === 'refs/heads/master' || req.body.ref === 'refs/heads/main') {
        exec('bash /var/www/corp-site/deploy.sh', (error, stdout, stderr) => {
            if (error) {
                console.error('Deploy error:', error);
                return res.status(500).send('Deploy failed');
            }
            console.log('Deploy success:', stdout);
            res.status(200).send('Deploy successful');
        });
    } else {
        res.status(200).send('Not main branch');
    }
});

app.listen(PORT, () => {
    console.log(`Webhook server running on port ${PORT}`);
});
```

#### 6.2 Установка и запуск webhook
```bash
cd /var/www
npm init -y
npm install express
pm2 start deploy-webhook.js --name webhook
pm2 save
```

#### 6.3 Настройка GitHub webhook
В настройках репозитория GitHub:
- Payload URL: `http://ваш-ip:9000/deploy`
- Content type: `application/json`
- Secret: ваш-webhook-секрет
- Events: Push events

## 7. Настройка домена и SSL

### 7.1 Настройка DNS записей
В панели управления доменом добавьте:
- A-запись: `@` → `ваш-плавающий-ip`
- A-запись: `www` → `ваш-плавающий-ip`

### 7.2 Обновление nginx конфигурации
Замените `ваш-домен.ru` на ваш реальный домен в файле конфигурации.

### 7.3 Получение SSL сертификата
```bash
# Проверяем что домен указывает на сервер
nslookup ваш-домен.ru

# Получаем сертификат
certbot --nginx -d ваш-домен.ru -d www.ваш-домен.ru

# Проверяем автообновление
certbot renew --dry-run
```

### 7.4 Настройка автообновления SSL
```bash
# Добавляем в crontab
echo "0 12 * * * /usr/bin/certbot renew --quiet" | crontab -
```

## 8. Мониторинг и обслуживание

### 8.1 Полезные команды

#### PM2 команды:
```bash
pm2 status              # Статус всех приложений
pm2 logs corp-site      # Логи приложения
pm2 restart corp-site   # Перезапуск приложения
pm2 reload corp-site    # Плавный перезапуск
pm2 stop corp-site      # Остановка приложения
pm2 monit              # Мониторинг в реальном времени
```

#### Nginx команды:
```bash
nginx -t                    # Проверка конфигурации
systemctl restart nginx    # Перезапуск nginx
systemctl status nginx     # Статус nginx
tail -f /var/log/nginx/corp-site-access.log  # Логи доступа
```

#### Мониторинг системы:
```bash
htop                    # Мониторинг процессов
df -h                   # Использование диска
free -h                 # Использование памяти
ss -tulpn | grep :80    # Активные соединения
```

### 8.2 Резервное копирование
```bash
# Создание бэкапа
tar -czf backup-$(date +%Y%m%d).tar.gz /var/www/corp-site

# Автоматическое резервное копирование (добавить в crontab)
echo "0 2 * * * tar -czf /var/backups/corp-site-\$(date +\%Y\%m\%d).tar.gz /var/www/corp-site" | crontab -
```

### 8.3 Обновление зависимостей
```bash
cd /var/www/corp-site/corp-site
npm audit                # Проверка уязвимостей
npm audit fix            # Исправление уязвимостей
npm update              # Обновление зависимостей
```

## 9. Решение проблем

### 9.1 Приложение не запускается
```bash
# Проверьте логи
pm2 logs corp-site

# Проверьте порт
ss -tulpn | grep :3000

# Перезапустите приложение
pm2 restart corp-site
```

### 9.2 Сайт недоступен
```bash
# Проверьте nginx
systemctl status nginx
nginx -t

# Проверьте PM2
pm2 status

# Проверьте сетевые соединения
curl -I http://localhost:3000
```

### 9.3 Проблемы с SSL
```bash
# Проверьте сертификат
certbot certificates

# Обновите сертификат
certbot renew

# Проверьте конфигурацию nginx
nginx -t && systemctl reload nginx
```

## 10. Быстрый старт

### Для первого деплоя:
1. Запустите `bash server-setup.sh` на сервере
2. Склонируйте репозиторий: `git clone your-repo.git /var/www/corp-site`
3. Скопируйте и настройте конфигурации nginx и PM2
4. Запустите приложение: `pm2 start ecosystem.config.js`
5. Настройте GitHub Actions или webhook
6. Получите SSL сертификат

### Для последующих обновлений:
- При использовании GitHub Actions - просто push в master/main
- При ручном деплое - запустите `bash deploy.sh`

## 11. Контакты и поддержка

При возникновении проблем проверьте:
1. Логи PM2: `/var/log/pm2/corp-site.log`
2. Логи nginx: `/var/log/nginx/corp-site-error.log`
3. Системные логи: `journalctl -u nginx`
4. Статус приложения: `corp-site-stats.sh`

---

**Важно:** Замените все плейсхолдеры (`ваш-домен.ru`, `ваш-плавающий-ip`, etc.) на реальные значения перед использованием!
