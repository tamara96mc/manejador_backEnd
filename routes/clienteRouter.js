const express = require('express');
const router = express.Router();

//Importo modelo de datos
const clienteController = require('../controllers/clienteController');


router.get('/getAll', clienteController.getAll);
router.get('/getById', clienteController.getById);
router.get('/create', clienteController.create);
router.get('/getByTitle', clienteController.getByTitle);
router.get('/delete', clienteController.delete);
router.get('/deleteAll', clienteController.deleteAll);


module.exports = router;