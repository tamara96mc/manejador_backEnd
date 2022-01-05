
const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const logger = require('./config/winston');
const {sequelize_bd} = require('./config/db.js');
const router = require('./router.js');
const cors= require("cors");
// const venom = require('venom-bot');
// const fetch = require('node-fetch');


const app = express();
const PORT = process.env.PORT || 3000; //la confi del puerto heroku

var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  };
  

//Middleware
app.use(morgan('combined', { stream: logger.stream }));
app.use(express.json());
app.use(cors(corsOptions)); //Add CORS Middleware

//Rutas
app.get('/', (req, res) => {res.send('API JUYU');});
app.use(router);

//Connecting to the database
sequelize_bd.then(()=>{
    //Starting server
        app.listen(PORT, ()=> console.log(`Server on port ${PORT}`.bgGreen.black));
})
.catch((err)=> console.log(err.message));   


