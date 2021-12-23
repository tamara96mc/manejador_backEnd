const express = require('express');
const router = express.Router();

//Importo modelo de datos
const campoController = require('../controllers/campoController');


router.get('/getAll', campoController.getAll);
router.get('/getById', campoController.getById);
router.get('/create', campoController.create);
router.get('/getByTitle', campoController.getByTitle);
router.get('/delete', campoController.delete);
router.get('/deleteAll', campoController.deleteAll);


module.exports = router;