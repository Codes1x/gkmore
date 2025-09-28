module.exports = {
  apps: [{
    name: 'corp-site',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/corp-site/corp-site',
    instances: 'max', // или укажите конкретное число процессов
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      // Добавьте другие переменные окружения
    },
    env_development: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    // Логирование
    error_file: '/var/log/pm2/corp-site-err.log',
    out_file: '/var/log/pm2/corp-site-out.log',
    log_file: '/var/log/pm2/corp-site.log',
    
    // Настройки перезапуска
    max_restarts: 10,
    min_uptime: '10s',
    
    // Мониторинг
    watch: false, // Отключаем в продакшене
    ignore_watch: ['node_modules', '.git', '.next'],
    
    // Ресурсы
    max_memory_restart: '1G',
    
    // Автозапуск при перезагрузке системы
    autorestart: true
  }],

  // Настройки деплоя (опционально)
  deploy: {
    production: {
      user: 'root',
      host: 'ваш-плавающий-ip',
      ref: 'origin/master',
      repo: 'git@github.com:username/repo.git',
      path: '/var/www/corp-site',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production && pm2 save'
    }
  }
};
