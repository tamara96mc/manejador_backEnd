const express = require('express');
const router = express.Router();

//Importo modelo de datos
const ManejadorController = require('../controllers/manejadorController');


router.get('/createBot', ManejadorController.createBot);



module.exports = router;