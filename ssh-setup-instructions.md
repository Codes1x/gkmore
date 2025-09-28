# Настройка SSH подключения к серверу REG.RU

## Данные сервера:
- **IP**: 79.174.82.250
- **Логин**: root
- **Пароль**: 8OtU0YQC0QOuIm06
- **SSH ключ**: ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIt2io3poA2mYAdgzQ0sLbmjxe/WdIveMUPD4xMNlyYP

## Способ 1: Подключение по паролю

Откройте терминал и выполните:
```bash
ssh root@79.174.82.250
```

Когда появится запрос пароля, введите:
```
8OtU0YQC0QOuIm06
```

## Способ 2: Настройка SSH ключа (рекомендуется)

### Шаг 1: Создание SSH ключа на вашем компьютере
```bash
# Создание нового SSH ключа
ssh-keygen -t ed25519 -C "deploy@corp-site" -f ~/.ssh/reg_ru_corp

# Добавление ключа в SSH агент
ssh-add ~/.ssh/reg_ru_corp
```

### Шаг 2: Копирование публичного ключа на сервер
```bash
# Показать публичный ключ
cat ~/.ssh/reg_ru_corp.pub

# Или скопировать сразу на сервер
ssh-copy-id -i ~/.ssh/reg_ru_corp.pub root@79.174.82.250
```

### Шаг 3: Настройка SSH config
Создайте файл `~/.ssh/config` с содержимым:
```
Host reg-ru-corp
    HostName 79.174.82.250
    User root
    IdentityFile ~/.ssh/reg_ru_corp
    PreferredAuthentications publickey,password
```

### Шаг 4: Подключение с использованием настроенного хоста
```bash
ssh reg-ru-corp
```

## Способ 3: Использование PuTTY (Windows)

1. Скачайте и установите PuTTY
2. Запустите PuTTY
3. Введите данные:
   - **Host Name**: 79.174.82.250
   - **Port**: 22
   - **Connection Type**: SSH
4. Нажмите **Open**
5. Введите логин: `root`
6. Введите пароль: `8OtU0YQC0QOuIm06`

## Проверка подключения

После успешного подключения выполните базовые проверки:
```bash
# Информация о системе
uname -a

# Проверка версии Node.js
node -v

# Проверка версии npm
npm -v

# Проверка свободного места
df -h

# Проверка памяти
free -h
```

## Что делать после подключения

1. **Обновить систему**:
```bash
apt update && apt upgrade -y
```

2. **Запустить скрипт настройки сервера** (после загрузки файлов):
```bash
bash server-setup.sh
```

3. **Склонировать проект**:
```bash
cd /var/www
git clone https://github.com/ваш-username/ваш-репозиторий.git corp-site
```

## Устранение проблем

### Проблема: "Connection refused"
- Проверьте IP адрес
- Убедитесь, что сервер запущен
- Проверьте настройки фаервола

### Проблема: "Permission denied"
- Убедитесь в правильности логина/пароля
- Проверьте SSH ключи

### Проблема: "Host key verification failed"
```bash
ssh-keygen -R 79.174.82.250
```

---

**После успешного подключения переходите к выполнению инструкций из quick-deployment-checklist.md**
