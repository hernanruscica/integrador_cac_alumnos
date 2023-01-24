const express = require('express');
const contactosController = require('../controllers/contactosController');
var router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
      },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
      }
});
const upload = multer({ storage});

//rutas del index
router.get('/agregar', contactosController.addNew);
router.get('/buscar', contactosController.search);
router.get('/todos', contactosController.getAll);
router.post('/agregar', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'nombres' }, { name: 'apellidos' }, { name: 'telefono' }, { name: 'email' }]), contactosController.addNewResult);

module.exports = router;