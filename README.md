# paxabot-nodejs

Esta es una libreria que trabaja con un bot de telegram que permite gestionar de manera
mas optima la mensajeria con el cliente via telegram.

## Instalacion

1. Ir a la carpeta de tu proyecto.
2. Abrir una terminal.
3. Asegurarse de tener node y npm instalados.
4. utilizar `npm install https://github.com/alevilar/paxabot-nodejs`.
5. en tu codigo colocar `const telegramBot = require("paxabot-nodejs")`.
6. a el codigo debajo colocar `telegramBot.init(data)`.
La data tiene el siguiente formato.
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
const config = require('./bot/config.json');

Pbot.init(config);

// Tu codigo

if(algoPasa == true){
  Pbot.SendMessage({
    to:1234567890,
    text:"Hola Mundo"
  });
}

```


### Comandos: 
  `init(json);`
  *init()* toma como parametros un objeto con los siguientes valores (podes usar una variable):
   ```js
    {
        token:"Aca_va_tu_token_sin_espacios",

        database: {
            host: "IP",
            user: "USER",
            password: "PASS",
            database: "NAME_DB"
        }
    }
    ```

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
