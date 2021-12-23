const express = require('express');
const router = express.Router();

//Importo modelo de datos
const datoController = require('../controllers/datoController');


router.get('/getAll', datoController.getAll);
router.get('/getById', datoController.getById);
router.get('/create', datoController.create);
router.get('/getByTitle', datoController.getByTitle);
router.get('/delete', datoController.delete);
router.get('/deleteAll', datoController.deleteAll);


module.exports = router;