const express = require('express');
const indexController = require('../controllers/indexController');
var router = express.Router();

//rutas del index
router.get('/', indexController.index);
router.get('/registrarse', indexController.registrar_form);
router.get('/ingresar', indexController.login);
router.post('/autenticar', indexController.autenticar);
router.post('/registrarse', indexController.registrar);

module.exports = router;