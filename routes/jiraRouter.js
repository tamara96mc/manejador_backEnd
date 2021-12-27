const express = require('express');
const router = express.Router();

//Importo modelo de datos
const jiraController = require('../controllers/jiraController');


router.get('/:id', jiraController.getById);
router.post('/', jiraController.create);
router.put('/:id', jiraController.update);


module.exports = router;