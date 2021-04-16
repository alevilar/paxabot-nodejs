const config = require('./config.json');
const { Telegraf } = require('telegraf');
const mySql = require('mysql');

const db_pb_bot = mySql.createConnection(config.database);




const pin = require('./modules/pinController.js');

const bot = new Telegraf(config.token);


// Bot events
bot.start((ctx) => { // Cuando el usuario escribe /start en el chat se ejecuta este mensaje.
    

    //db_pb_bot.query(); // buscar el usuario en clients y añadirlo si no esta.

    ctx.reply(`Hola ${ctx.message.from.first_name}, vos ya estas registrado para recibir nuestras notificaciones, si lo que queres es añadir un comercio para recibir sus notificaciones tambien, usa el comando "/pin"`); 
       
    console.log('BOT:', ctx.message.from);

});


bot.on('message', (ctx) => {
    ctx.reply(`Hola ${ctx.message.from.first_name} yo te voy a notificar lo que ocurra en tu comercio, para asignar un comercio a tu cuenta usa /pin.`);
});


bot.command('pin', (ctx) => {
    //db_pb_bot.query(); // Buscar PIN en pb_pin_sites agarrat el site_id y unto con el telegram_id guardar en pb_clients_sites
});

console.log('Bot iniciado');

bot.launch();







module.exports = {

    SendMessage: function (data) {
        
        if (typeof(data.to) == "number"){
            data.to = [data.to];
        }

        data.to.forEach(dest => {
            bot.telegram.sendMessage(dest, data.text);
            console.log("envio mensaje");
        });

    }

}


process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));