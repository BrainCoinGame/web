const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
app.use(bodyParser.json());

const token = '7906841156:AAHSpUZq3p_m5im8Cjuu9h1hDkSNTxEHP5A';
const webAppUrl = 'https://9bdbe2d5.web-1xs.pages.dev/';

app.post('/webhook', (req, res) => {
    const message = req.body.message;
    const chatId = message.chat.id;

    if (message.text === '/start') {
        const responseMessage = 'Привет! Нажми, чтоб запустить мини-приложение.';

        request.post(`https://api.telegram.org/bot${token}/sendMessage`, {
            json: {
                chat_id: chatId,
                text: responseMessage,
                reply_markup: {
                    inline_keyboard: [[{
                        text: "Открыть мини-приложение",
                        url: webAppUrl
                    }]]
                }
            }
        });
    }

    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');