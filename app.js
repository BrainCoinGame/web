<<<<<<< HEAD
import { Telegraf, Markup } from 'telegraf'

const token = '8192560984:AAH3eXTADJAGyeBZCpUE2Ek9NpBCfq0dFAs'
const webAppUrl = 'https://console.firebase.google.com/project/braingame2000/overview'

const bot = new Telegraf(token)

bot.command('start', (ctx) => {
=======
import { Telegraf, Markup } from 'telegraf';

// Используем токен из переменных окружения
const token = process.env.BOT_TOKEN || '8192560984:AAH3eXTADJAGyeBZCpUE2Ek9NpBCfq0dFAs';
const webAppUrl = 'https://console.firebase.google.com/project/braingame2000/overview';

if (!token) {
  throw new Error('Токен бота не указан. Укажите его в process.env.BOT_TOKEN или прямо в коде.');
}

const bot = new Telegraf(token);

bot.command('start', (ctx) => {
  const ref = ctx.message?.text?.split(' ')[1] || 'default'; // Извлекаем реферальный параметр
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
        `${webAppUrl}?ref=${ref}` // Передаем реферал в мини-приложение
      ),
    ])
  );
});

bot.launch().then(() => {
  console.log('Бот успешно запущен!');
}).catch((error) => {
  console.error('Ошибка при запуске бота:', error);
});
>>>>>>> 830b5f44b63c1cc812956e383cb3fcad3b0ebe1f
