# paxabot-nodejs

Esta es una libreria que trabaja con un bot de telegram que permite gestionar de manera
mas optima la mensajeria con el cliente via telegram.

## Instalacion

1. Descargar el repositorio y ubicarlo en la carpeta del proyecto.
2. Añadir las dependencias y requerimientos del `package.json` del bot dentro del `package.json` de tu proyecto.
3. Abrir una terminal en la carpeta del repositorio y ejecutar `npm update`
4. Hacer referencia a la libreria desde tu codigo. Si usas nodejs seria `const bot = require('index.js_bot_route');`
5. Cambiar el nombre del `config-example.json` a `config.json` y reemplazar los datos dentro.
6. Para reemplazar los datos dentro primero tenes que ir a telegram y enviarle un mensaje a "BotFather" (bot de telegram) y usar el comando /newbot, seguir los pasos que te pida, y una vez finalizado te va a devolver un TOKEN, este token tiene que ir en el archivo config.json. 

```json

{
    "token":"Aca_va_tu_token_sin_espacios",

    "database": {
        "host": "IP",
        "user": "USER",
        "password": "PASS",
        "database": "NAME_DB"
    }
}

```


## Uso de la libreria

### Ejemplo de uso:
```js
const Pbot = require('./bot/index.js'); 

// Tu codigo

if(algoPasa == true){
  Pbot.SendMessage({
    to:1234567890,
    text:"Hola Mundo"
  });
}

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
