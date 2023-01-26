const express = require('express');
const contactosController = require('../controllers/contactosController');
var router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/imgs');
      },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '- foto_perfil.' + file.originalname);
      }
});
const upload = multer({ storage});

//rutas del index
router.get('/agregar', contactosController.addNew);
router.get('/buscar', contactosController.search);
router.get('/todos', contactosController.getAll);
router.post('/agregar', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'nombres' }, { name: 'apellidos' }, { name: 'telefono' }, { name: 'email' }]), contactosController.addNewResult);
router.delete('/eliminar/:id', contactosController.delete);
router.get('/editar/:id', contactosController.edit);
router.post('/editar/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'nombres' }, { name: 'apellidos' }, { name: 'telefono' }, { name: 'email' }, {name: 'imagen_actual'}]), contactosController.editResult);

module.exports = router;