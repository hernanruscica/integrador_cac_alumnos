const express = require('express');
const indexController = require('../controllers/indexController');
var router = express.Router();

//rutas del index
router.get('/', indexController.index);
router.get('/registrarse', indexController.registrar_form);
router.get('/ingresar', indexController.login);
router.post('/autenticar', indexController.autenticar);
router.post('/registrarse', indexController.registrar);
router.get("/session/:id", indexController.create_session);
router.get('/salir', indexController.salir);
router.get('/recuperar_pass', indexController.recuperar_verform);
router.get('/recuperar_pass/:id_usuario/:id_recuperacion', indexController.recuperar_verform);
router.post('/recuperar_pass', indexController.enviar_enlace);
 
module.exports = router;  