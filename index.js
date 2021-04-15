const config = require('./config.json');
const { Telegraf } = require('telegraf');


const bot = new Telegraf(config.token);

// Bot events
bot.start((ctx) => { // Cuando el usuario escribe /start en el chat se ejecuta este mensaje.

    ctx.reply('Hola, Soy PaxaBot, Un robot que te va a enviar notificaciones acerca de PaxaPos');
    console.log('BOT:', ctx.message.from);

});

console.log('Bot iniciado');

bot.launch();







module.exports = {

    SendMessage: function (id, text){

        if (id.toString().length == 10){

            bot.telegram.sendMessage(id, text);

        } else {

            console.log(`Verifique de haber escrito bien el ID: ${id}`);

        }
        
    }

}


process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));