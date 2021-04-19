const config = require('./config.json');
const { Telegraf } = require('telegraf');
const mySql = require('mysql');

const db_pb_bot = mySql.createConnection(config.database);


const bot = new Telegraf(config.token);


// Bot events
bot.start((ctx) => { // Cuando el usuario escribe /start en el chat se ejecuta este mensaje.
    

    //db_pb_bot.query(); // buscar el usuario en clients y añadirlo si no esta.
    db_pb_bot.query("SELECT * FROM pb_clients WHERE telegram_id = ?", [ctx.message.from.id], (err, res) => {
        if (err) throw err;

        if (res && res.length > 0) {

            ctx.reply(`Hola ${ctx.message.from.first_name}, vos ya estas registrado para recibir nuestras notificaciones, si lo que queres es añadir un comercio para recibir sus notificaciones tambien, usa el comando "/pin"`); 
     
        } else {

            let userData = ctx.message.from;
            db_pb_bot.query("INSERT INTO pb_clients (telegram_id, recibe_notificaciones, is_bot, first_name, last_name, username, language_code) VALUES (?, ?, ?, ?, ?, ?, ?)", [userData.id, true, userData.is_bot, userData.first_name, userData.last_name, userData.username, userData.language_code], (error, result) => {
                if (error) throw error;       
                
                ctx.reply(`Hola ${ctx.message.from.first_name}, para recibir las notificaciones de un comercio, usa el comando "/pin"`); 
            });

        }

    });



       
    console.log('BOT:', ctx.message.from);

});


bot.on('message', (ctx) => {
    let message = ctx.message.text.split(' ');

    if (message[0] != '/pin'){

        ctx.reply(`Hola ${ctx.message.from.first_name} yo te voy a notificar lo que ocurra en tu comercio, para asignar un comercio a tu cuenta usa /pin.`);
        
    } else {
        if (message.length == 2){


            db_pb_bot.query("SELECT * FROM pb_pin_sites WHERE pin = ?", [message[1]], (err, res) => {
                if (err) throw err;
                            
                if (res && res.length > 0){

                    let userData = ctx.message.from;
                    db_pb_bot.query("SELECT * FROM pb_clients_sites WHERE site_id = ? AND pb_client_telegram_id = ?", [res[0].site_id, userData.id], (error, result) => {
                        if (error) throw error;

                        if(result && result.length == 0){
                            db_pb_bot.query("INSERT INTO pb_clients_sites (site_id, pb_client_telegram_id) VALUES (?, ?)", [res[0].site_id, userData.id], (errorInsert, resultInsert) => {
                                if (error) throw error;
        
                                ctx.reply('👍 Vinculamos tu comercio con éxito!. Cuando tenga algo que contarte lo haré por este medio');
                            });
                        } else {
                            ctx.reply('Disculpa, vos ya registraste ese comercio antes, cuando suceda algo yo te voy a informar');
                        }
                        
 
    
                    });
                } else {
                    ctx.reply('Disculpa, el PIN no es correcto o ya ha caducado');
                }


            });

            
        }else{
            ctx.reply(`Verifica como escribiste el comando, recorda que para usarlo tenes que poner "/pin numero_de_pin", Ejemplo: /pin 123456`);
        }
    }
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