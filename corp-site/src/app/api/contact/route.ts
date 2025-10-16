import { NextRequest, NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';

export async function POST(request: NextRequest) {
  try {
    const { name, phone } = await request.json();

    // Валидация данных
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Имя и телефон обязательны для заполнения' },
        { status: 400 }
      );
    }

    // Проверка наличия токена и chat ID
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Не настроены переменные TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID');
      return NextResponse.json(
        { error: 'Сервер не настроен для отправки сообщений' },
        { status: 500 }
      );
    }

    // Создаем бота
    const bot = new TelegramBot(botToken, { polling: false });

    // Форматируем сообщение в Markdown
    const message = `
🌊 *Новая заявка с сайта ГК Море*

👤 *Имя:* ${name}
📱 *Телефон:* ${phone}
🕐 *Дата:* ${new Date().toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}

━━━━━━━━━━━━━━━━━━
_Автоматическое сообщение с формы обратной связи_
    `.trim();

    // Отправляем сообщение в Telegram
    await bot.sendMessage(chatId, message, {
      parse_mode: 'Markdown'
    });

    console.log('✅ Заявка отправлена в Telegram:', { name, phone });

    // Возвращаем успешный ответ
    return NextResponse.json(
      { 
        success: true, 
        message: 'Заявка успешно отправлена' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Ошибка отправки в Telegram:', error);
    return NextResponse.json(
      { error: 'Не удалось отправить заявку. Попробуйте позже.' },
      { status: 500 }
    );
  }
}
