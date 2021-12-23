const express = require('express');
const router = express.Router();

//Importo modelo de datos
const proyectoController = require('../controllers/proyectoController');


router.get('/getAll', proyectoController.getAll);
router.get('/getById', proyectoController.getById);
router.get('/create', proyectoController.create);
router.get('/getByTitle', proyectoController.getByTitle);
router.get('/delete', proyectoController.delete);
router.get('/deleteAll', proyectoController.deleteAll);


module.exports = router;