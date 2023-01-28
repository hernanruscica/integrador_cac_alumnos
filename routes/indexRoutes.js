const express = require('express');
const indexController = require('../controllers/indexController');
var router = express.Router();

//rutas del index
router.get('/', indexController.index);
router.get('/registrarse', indexController.register);
router.get('/ingresar', indexController.login);
router.post('/autenticar', indexController.autenticar);

module.exports = router;