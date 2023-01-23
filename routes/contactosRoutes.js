const express = require('express');
//const indexController = require('../controllers/indexController');
var router = express.Router();

//rutas del index
router.get('/', (req, res) => {res.send('<h1>Estos son los contactos</h1>')});

module.exports = router;