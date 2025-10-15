import { NextRequest, NextResponse } from 'next/server';

// Простая реализация отправки email через nodemailer
// Для production рекомендуется использовать сервисы типа SendGrid, Mailgun, или Resend

export async function POST(request: NextRequest) {
  try {
    const { name, phone, country } = await request.json();

    // Валидация данных
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Имя и телефон обязательны для заполнения' },
        { status: 400 }
      );
    }

    // Здесь будет логика отправки email
    // Для демонстрации используем простую заглушку
    
    const emailData = {
      to: 'maksaksyonov@mail.ru',
      subject: 'Новая заявка с сайта ГК Море',
      html: `
        <h2>Новая заявка с сайта ГК Море</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Страна:</strong> ${country}</p>
        <p><strong>Дата:</strong> ${new Date().toLocaleString('ru-RU')}</p>
        <hr>
        <p><small>Это автоматическое сообщение с сайта ГК Море</small></p>
      `
    };

    // Здесь должен быть код отправки email
    // Для демонстрации просто логируем данные
    console.log('Отправка email:', emailData);

    // Симуляция отправки с небольшой задержкой
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Возвращаем успешный ответ
    return NextResponse.json(
      { 
        success: true, 
        message: 'Заявка успешно отправлена' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Ошибка обработки заявки:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

// Для более надежной отправки email, добавьте эту функцию:
/*
import nodemailer from 'nodemailer';

async function sendEmail(name: string, phone: string, country: string) {
  // Настройки SMTP (замените на ваши)
  const transporter = nodemailer.createTransporter({
    host: 'smtp.mail.ru', // или другой SMTP сервер
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER, // ваш email
      pass: process.env.EMAIL_PASS, // пароль приложения
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'maksaksyonov@mail.ru',
    subject: 'Новая заявка с сайта ГК Море',
    html: `
      <h2>Новая заявка с сайта ГК Море</h2>
      <p><strong>Имя:</strong> ${name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Страна:</strong> ${country}</p>
      <p><strong>Дата:</strong> ${new Date().toLocaleString('ru-RU')}</p>
      <hr>
      <p><small>Это автоматическое сообщение с сайта ГК Море</small></p>
    `
  };

  await transporter.sendMail(mailOptions);
}
*/
