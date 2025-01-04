<<<<<<< HEAD
/bot/app.js
import { Telegraf, Markup } from 'telegraf'

const token = '8192560984:AAH3eXTADJAGyeBZCpUE2Ek9NpBCfq0dFAs'
const webAppUrl = 'https://console.firebase.google.com/project/braingame2000/overview'

const bot = new Telegraf(token)

bot.command('start', (ctx) => {
=======
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

>>>>>>> 830b5f44b63c1cc812956e383cb3fcad3b0ebe1f
  ctx.reply(
    'Привет! Нажми, чтоб запустить',
    Markup.inlineKeyboard([
      Markup.button.webApp(
        'Открыть мини-приложение',
<<<<<<< HEAD
        `${webAppUrl}?ref=${ctx.payload}` // Здесь в параметре ref передаем реферала в мини-приложение
      ),
    ])
  )
})

bot.launch()
=======
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
>>>>>>> 830b5f44b63c1cc812956e383cb3fcad3b0ebe1f
