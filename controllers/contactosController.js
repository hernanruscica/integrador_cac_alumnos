const conexion = require("../models/conexion_db");
const contactosModel = require("../models/contactosModel");

module.exports = {
    addNew : (req, res) => {res.render('addnew')},
    search : (req, res) => {res.render('search')},
    getAll : (req, res) => {contactosModel.getAll(conexion, (err, results) => console.log(results))},
    addNewResult : (req, res) => {
        const formData = req.body;
        const imagePathName = 'req.files.image';
        //console.log(formData);
        contactosModel.addNewResult(conexion, formData, imagePathName,(err, results) => console.log(results))
    }
} 