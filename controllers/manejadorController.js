let fase = 0;
let datos = [];
let nombre = '';
let telefono = '';

// const venomOptions = require('./venom-options.js')
const venom = require('venom-bot');
const fetch = require('node-fetch');

const ManejadorController = {}; //Create the object controller


ManejadorController.createBot = (req, res) => {

  const TWENTY_MINUTES = 1200000
  let client = null
  dateLog('Started index.js')
  initBot()

  function initBot() {
    dateLog('Initializing bot')
    let telefono_manejador = req.body.telefono;
    console.log('tlf', telefono_manejador);
    venom
      //	create bot with options
      .create(
        telefono_manejador,
        (base64Qr, asciiQR, attempts, urlCode) => {
          console.log(asciiQR); // Optional to log the QR in the terminal
          var matches = base64Qr.match(/^data:([A-Za-z-+\\/]+);base64,(.+)$/),
            response = {};

          if (matches.length !== 3) {
            return new Error('Invalid input string');
          }
          response.type = matches[1];
          response.data = new Buffer.from(matches[2], 'base64');

          try {

            res.send(asciiQR);
          }
          catch (err) {
            res.status(500).send({
              message:
                err.message || "Some error occurred while generate qr"
            });
          };

        },
        undefined,
        { logQR: true }
      )
      .then((client) => startBot(client))
      // 	catch errors
      .catch((err) => {
        dateLog(err)
      })
  }

  function startBot(_client) {
    dateLog('Starting bot')
    client = _client

    //	restart bot every 20 minutos
    //	stops working otherwise
    setTimeout(() => {
      //	close bot
      client.close()
      dateLog('Closing bot')

      //	init bot again
      initBot()
    }, TWENTY_MINUTES)

    //
    // add your code here
    //

    // example: reply every message with "Hi!""
    client.onMessage(reply)
  }

  function reply(message) {

    const clientes = ["680980409"];

    let clienteWA =message.from.substring(2, 11);

    console.log('cliente auth', clienteWA);

    if (clientes.includes(clienteWA)) {
      
      telefono = message.sender.id;
      nombre = message.sender.pushname;
      datos.push(message.body);

      switch (fase) {
        case 0:
          client
            .sendText(message.from, `Hola 👋, bienvenido al soporte de JIRA. Vamos a crear un ticket, ¿Me puedes facilitar un resumen para el ticket?`)
            .then((result) => {
              //console.log('Result: ', result); //return object success
              fase = 1;
            })
            .catch((erro) => {
              console.error('Error when sending: ', erro); //return object error
            });
          break;
        case 1:
          client
            .sendText(message.from, `Vale. ¿Me puedes facilitar algo más de información? 💬`)
            .then((result) => {
              //console.log('Result: ', result); //return object success
              fase = 2;
            })
            .catch((erro) => {
              console.error('Error when sending: ', erro); //return object error
            });
          break;
        case 2:
          const buttons = [
            {
              "buttonText": {
                "displayText": "CAU"
              }
            },
            {
              "buttonText": {
                "displayText": "GESTIC"
              }
            }
          ]
          client.sendButtons(message.from, 'Proyectos', buttons, 'Selecciona uno')
            .then((result) => {
              //console.log('Result2: ', result); //return object success
              fase = 3;
            })
            .catch((erro) => {
              console.error('Error when sending: ', erro); //return object error
            });
          break;

        case 3:

          const list = [
            {
              title: "Tipo de tareas",
              rows: [
                {
                  title: "Incidencia",
                  description: "Si tiene un problema o un error.",
                },
                {
                  title: "Consulta",
                  description: "Si tiene dudas o necesita información sobre un asunto",
                },
                {
                  title: "Servicio",
                  description: "Si necesita de nuestro soporte de servicios.",
                }
              ]
            }
          ];

          client.sendListMenu(message.from, 'Tipo de tarea', 'Seleccione uno', 'Para clasificar este ticket necesitamos saber de que tipo se trata', 'opciones', list)
            .then((result) => {
              // console.log('Result: ', result); //return object success
              fase = 4;
            })
            .catch((erro) => {
              console.error('Error when sending: ', erro); //return object error
            });
          break;
        case 4:

          const msg = [
            {
              "buttonText": {
                "displayText": "Vale 👍"
              }
            }
          ]
          client.sendButtons(message.from, 'Gracias por facilitarnos la información, vamos a proceder a crear el ticket, ¿de acuerdo?', msg, 'Pulse el botón para finalizar')
            .then((result) => {
              //console.log('Result2: ', result); //return object success
              fase = -1;
            })
            .catch((erro) => {
              console.error('Error when sending: ', erro); //return object error
            });

          break;
        default:

          const issue =
            `{
                                "update": {},
                                "fields": {
                                "summary":  "${datos[1]}",
                                "issuetype": {
                                    "name": "${datos[4].substring(0, datos[4].indexOf('\n'))}"
                                },
                                "project": {
                                    "key": "${datos[3]}"
                                },
                                "description": {
                                    "type": "doc",
                                    "version": 1,
                                    "content": [
                                    {
                                        "type": "paragraph",
                                        "content": [
                                        {
                                            "text": "${datos[2]}",
                                            "type": "text"
                                        }
                                        ]
                                    }
                                    ]
                                },
                                "reporter": {
                                    "id": "5d0a2b3cdae4be0bc931c579"
                                },
                                    "customfield_10058": "${telefono.substring(2, 11)}",
                                    "customfield_10057":  "${nombre}"
                                }
                            }`
            ;

          fetch('https://chatsbot.atlassian.net/rest/api/3/issue', {
            method: 'POST',
            headers: {
              'Authorization': `Basic ${Buffer.from(
                'tamara.96mc@gmail.com:USbYRDx1UZ6I09GT44M21629'
              ).toString('base64')}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: issue
          })
            .then(response => {
              console.log(
                `Response: ${response.status} ${response.statusText}`
              );
              return response.text();
            })
            .then(text => {

              let datos = JSON.parse(text);
              client
                .sendText(message.from, `Hemos creado en ticket 📝 ${datos.key}, puede consultarlo en ➡ https://chatsbot.atlassian.net/browse/${datos.key}`)
                .then((result) => {
                  fase = 0;
                })
                .catch((erro) => {
                  console.error('Error when sending: ', erro); //return object error
                });
            })
            .catch(err => console.error(err));
          break;
      };

    } else {

      client
        .sendText(message.from, `Hola 👋, vemos que tienes permisos en este manejador :(`)
        .then((result) => {
          //console.log('Result: ', result); //return object success
          fase = 1;
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });

    }

  }


  // Catch ctrl+C
  process.on('SIGINT', function () {
    client.close()
  })

  function dateLog(text) {
    console.log(new Date(), ' - ', text)
  }

};
module.exports = ManejadorController;

