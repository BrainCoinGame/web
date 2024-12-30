import { Telegraf, Markup } from 'telegraf';

// Токен бота
const token = '8192560984:AAH3eXTADJAGyeBZCpUE2Ek9NpBCfq0dFAs';

// URL мини-приложения
const webAppUrl = 'https://console.firebase.google.com/project/braingame2000/overview';

if (!token) {
  throw new Error('Токен не задан. Пожалуйста, укажите токен в переменной token.');
}

const bot = new Telegraf(token);

bot.command('start', (ctx) => {
  // Получаем реферальный параметр из команды
  const ref = ctx.message?.text?.split(' ')[1] || 'default';

  ctx.reply(
    'Привет! Нажми, чтоб запустить',
    Markup.inlineKeyboard([
      Markup.button.webApp(
        'Открыть мини-приложение',
        `${webAppUrl}?ref=${ref}` // Передаем реферальный параметр
      ),
    ])
  );
});

// Запуск бота
bot.launch().then(() => {
  console.log('Бот успешно запущен!');
}).catch((error) => {
  console.error('Ошибка при запуске бота:', error);
});
