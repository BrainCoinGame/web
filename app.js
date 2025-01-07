// Конфигурация
const BOT_TOKEN = '7906841156:AAHSpUZq3p_m5im8Cjuu9h1hDkSNTxEHP5A';
const WEB_APP_URL = 'https://9bdbe2d5.web-1xs.pages.dev/';

export default {
  async fetch(request, env, ctx) {
    // Проверяем метод запроса
    if (request.method !== 'POST') {
      return new Response('Only POST requests are allowed', { status: 405 });
    }

    try {
      // Получаем данные от Telegram
      const update = await request.json();
      
      if (!update.message) {
        return new Response('OK', { status: 200 });
      }

      const message = update.message;
      const chatId = message.chat.id;

      // Обрабатываем команду /start
      if (message.text === '/start') {
        const responseMessage = 'Привет! Нажми, чтоб запустить мини-приложение.';
        
        await sendTelegramMessage(chatId, responseMessage, {
          inline_keyboard: [[{
            text: "Открыть мини-приложение",
            url: WEB_APP_URL
          }]]
        });
      }

      return new Response('OK', { status: 200 });
    } catch (error) {
      console.error('Error processing request:', error);
      return new Response('Error processing request', { status: 500 });
    }
  }
};

// Функция для отправки сообщений в Telegram
async function sendTelegramMessage(chatId, text, keyboard = null) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const data = {
    chat_id: chatId,
    text: text,
    parse_mode: 'HTML'
  };

  if (keyboard) {
    data.reply_markup = keyboard;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Telegram API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}