const express = require('express');
const indexController = require('../controllers/indexController');
var router = express.Router();

//rutas del index
router.get('/', indexController.index);

module.exports = router;