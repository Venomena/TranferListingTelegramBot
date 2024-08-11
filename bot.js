import { Telegraf } from 'telegraf';
import axios from 'axios';

const bot = new Telegraf('7373421969:AAG3mVqvyIyKy5l37tVj0M_20IeZakcF4GY');

bot.start((ctx) => ctx.reply('Welcome to the Soccer Clicker Game!'));

bot.command('startgame', (ctx) => {
    ctx.reply('Click the button to start the game inside Telegram!', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Play Soccer Clicker",
                        web_app: { url: 'https://00b1-76-133-204-213.ngrok-free.app' } // Your ngrok URL here
                    }
                ]
            ]
        }
    });
});

bot.launch();
console.log('Bot is running...');
