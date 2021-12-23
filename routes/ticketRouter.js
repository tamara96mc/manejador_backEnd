const express = require('express');
const router = express.Router();

//Importo modelo de datos
const ticketController = require('../controllers/ticketController');


router.get('/getAll', ticketController.getAll);
router.get('/getById', ticketController.getById);
router.get('/create', ticketController.create);
router.get('/getByTitle', ticketController.getByTitle);
router.get('/delete', ticketController.delete);
router.get('/deleteAll', ticketController.deleteAll);


module.exports = router;