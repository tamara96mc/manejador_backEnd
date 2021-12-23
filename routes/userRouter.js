const express = require('express');
const router = express.Router();

//Importo modelo de datos
const userController = require('../controllers/userController');

router.post('/register', userController.registerController); //EndPoint de crear usuario
router.post('/login', userController.loginController); //EndPoint de logear usuario
router.get("/logout", userController.logoutController);  //EndPoint buscar perfil de usuario


module.exports = router;