# paxabot-nodejs

Esta es una libreria que trabaja con un bot de telegram que permite gestionar de manera
mas optima la mensajeria con el cliente via telegram.

## Instalacion

1. Descargar el repositorio y ubicarlo en la carpeta del proyecto.
2. Añadir las dependencias y requerimientos del `package.json` del bot dentro del `package.json` de tu proyecto.
3. Abrir una terminal en la carpeta del repositorio y ejecutar `npm update`
4. Hacer referencia a la libreria desde tu codigo. Si usas nodejs seria `const bot = require('index.js_bot_route');`
5. Cambiar el nombre del `config-example.json` a `config.json` y reemplazar los datos dentro. 

## Uso de la libreria

### Ejemplo de uso:
```js
// Modules Import
const express = require('express');
const socketIO = require('socket.io');
const Pbot = require('./bot/index.js'); 

// init Express
const app = express();


// config
 app.set('port', process.env.port || 3000);



// Config Express
const server = app.listen( app.get('port'), console.log('Server on port:', app.get('port')) );


// Socket IO Config
const io = socketIO(server);


// Set root default message 
app.use(express.static(path.join(__dirname + '/public/')));


// socket events
io.on('connect', (socket) => {

  console.log('WS: Nuevo usuario', socket.id);


    socket.on('pb:sendMessage', (data) => {
        Pbot.SendMessage(data);
    });
    
});
```


### Comandos: 
  `SendMessage(json);`
  *SendMessage()* toma como parametros una clase de JS o un JSON con el siguiente formato:
```js
     {
                to:1234567890, // ID telegram de destino
                text: "test1" // Mensaje de tipo String
      }
 ```
 o si son mas de un destinatario.
 ```js
     {
                to:[1234567890, 1234567890], // ID telegram de destino, puede ser uno o muchos (si son mas de uno se deben poner como una lista)
                text: "test1" // Mensaje de tipo String
      }
 ```

  
  Este comando sirve para enviar un mensaje de texto por telegram a uno o un conjunto de destinatarios de la plataforma telegram.
