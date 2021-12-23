const express = require('express');
const router = express.Router();

//Importo modelo de datos
const jiraController = require('../controllers/jiraController');


router.get('/getAll', jiraController.getAll);
router.get('/getById', jiraController.getById);
router.get('/create', jiraController.create);
router.get('/getByType', jiraController.getByType);
router.get('/delete', jiraController.delete);
router.get('/deleteAll', jiraController.deleteAll);


module.exports = router;