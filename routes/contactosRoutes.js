const express = require('express');
const contactosController = require('../controllers/contactosController');
var router = express.Router();

//rutas del index
router.get('/', contactosController.addNew);
router.get('/agregar', contactosController.addNew);
router.get('/buscar', contactosController.search);

module.exports = router;