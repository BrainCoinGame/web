const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
app.use(bodyParser.json());

// Обработка команд от Telegram
app.post('/webhook', (req, res) => {
    const message = req.body.message;
    const chatId = message.chat.id;

    // Обработка команды /start
    if (message.text === '/start') {
        const responseMessage = 'Привет! Ваше приложение запущено.';

        request.post(`https://api.telegram.org/bot7906841156:AAHSpUZq3p_m5im8Cjuu9h1hDkSNTxEHP5A/sendMessage`, {
            json: {
                chat_id: chatId,
                text: responseMessage
            }
        });
    }

    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
