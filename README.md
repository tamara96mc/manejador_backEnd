# API Manejador JIRA & WhatsApp


## Modelo de DB

![image](https://user-images.githubusercontent.com/60045207/149395716-7642db1c-7800-4465-a209-9d819aad1818.png)

## Tecnologias utilizadas
- Express
- Mysql2
- sequelize
- Git y Gitbut
- Herohu
- venom-bot
- moment 
- Node
- jsonwebtoken

## EndPoints

### Entidad user

- Post para registrar usuario
https://tmc-api-manejador.herokuapp.com/api/register

- Post para logear usuario
https://tmc-api-manejador.herokuapp.com/aoi/login

- Put para actualizar un usuario
https://tmc-api-manejador.herokuapp.com/api/:id

### Los siguientes endPoint necesitan token para utilizarse

### Entidad campo

- Get para recuperar todos los campos de un Jira 
https://tmc-api-manejador.herokuapp.com/campo/jiraId/:jiraId 

- Post para crear un campo 
https://tmc-api-manejador.herokuapp.com/campo

- Put para actualizar un campo
https://tmc-api-manejador.herokuapp.com/campo/:id

- Delete para borrar un campo
https://tmc-api-manejador.herokuapp.com/campo/:id


### Entidad cliente

- Get para recuperar todos los clientes de un Jira 
https://tmc-api-manejador.herokuapp.com/cliente/jiraId/:jiraId 

- Get para recuperar un cliente de un Jira 
https://tmc-api-manejador.herokuapp.com/cliente/:telefono

- Post para crear un cliente
https://tmc-api-manejador.herokuapp.com/cliente

- Put para actualizar un cliente
https://tmc-api-manejador.herokuapp.com/cliente/:telefono

- Delete para borrar un cliente
https://tmc-api-manejador.herokuapp.com/cliente/:telefono


### Entidad dato

- Get para recuperar los datos de un cliente
https://tmc-api-manejador.herokuapp.com/dato/telefono/:telefono

- Post para crear un dato
https://tmc-api-manejador.herokuapp.com/dato

- Put para actualizar un cliente
https://tmc-api-manejador.herokuapp.com/dato/:id

- Delete para borrar un dato
https://tmc-api-manejador.herokuapp.com/dato/:id

- Delete para borrar todos datos de un cliente
https://tmc-api-manejador.herokuapp.com/dato/telefono/:telefono


### Entidad jira

- Get para recuperar los de un jira de un cliente
https://tmc-api-manejador.herokuapp.com/jira/userId/:userId

- Post para crear un jira
https://tmc-api-manejador.herokuapp.com/jira

- Put para actualizar un jira
https://tmc-api-manejador.herokuapp.com/jira/:id


### Entidad proyecto

- Get para recuperar todos los proyectos de un Jira 
https://tmc-api-manejador.herokuapp.com/proyecto/jiraId/:jiraId 

- Post para crear un proyecto
https://tmc-api-manejador.herokuapp.com/proyecto

- Put para actualizar un proyecto
https://tmc-api-manejador.herokuapp.com/proyecto/:id

- Delete para borrar un proyecto
https://tmc-api-manejador.herokuapp.com/proyecto/:id

### Entidad manejador

- Post para inicial el chatbot
https://bot-jira-api.herokuapp.com/manejador/createBot

## API en heroku

https://tmc-api-manejador.herokuapp.com/

## Chatbot en heroku

https://bot-jira-api.herokuapp.com/


NOTA:

Como para hacer el chatbot en node necesitaba otra configuración de CORS tuve que crear un proyecto a parte, está en el repo https://github.com/tamara96mc/chatBot_wapp
