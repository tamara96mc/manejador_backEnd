const express = require('express');
const router = express.Router();

//Importo modelo de datos
const campoController = require('../controllers/campoController');



router.get('/', campoController.getAll);
router.post('/', campoController.create);
router.put('/:id', campoController.update);
router.delete('/:id', campoController.delete);



module.exports = router;