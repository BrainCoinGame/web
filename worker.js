// Конфигурация бота
const BOT_TOKEN = '7314016583:AAGuOOSOBu747EP5F4boZVlqrU1utUufu18'
const WEBHOOK_SECRET = 'https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/abf30fed-d10f-4dc3-b34d-55eb27705794' // Добавьте секретный путь для вебхука

export default {
  async fetch(request, env, ctx) {
    // Проверяем, что это POST запрос от Telegram
    if (request.method !== 'POST') {
      return new Response('Only POST requests are allowed', { status: 405 })
    }

    try {
      // Получаем данные от Telegram
      const update = await request.json()
      
      // Обработка сообщений
      if (update.message) {
        const { message } = update
        const chatId = message.chat.id
        const text = message.text || ''

        // Здесь ваша логика обработки команд
        let responseText = 'Получено сообщение: ' + text
        
        // Отправляем ответ обратно в Telegram
        await sendTelegramMessage(chatId, responseText)
      }

      return new Response('OK', { status: 200 })
    } catch (error) {
      return new Response(`Error: ${error.message}`, { status: 500 })
    }
  }
}

// Функция для отправки сообщений в Telegram
async function sendTelegramMessage(chatId, text) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`
  const data = {
    chat_id: chatId,
    text: text,
    parse_mode: 'HTML'
  }

  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}