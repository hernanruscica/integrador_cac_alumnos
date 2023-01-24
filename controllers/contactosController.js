const conexion = require("../models/conexion_db");
const contactosModel = require("../models/contactosModel");

module.exports = {
    addNew : (req, res) => {res.render('addnew')},
    search : (req, res) => {res.render('search')},
    getAll : (req, res) => {contactosModel.getAll(conexion, (err, results) => {
        if (!err){
            console.log("Mostrando todos los contactos");
            res.render('view_contacts', {contacts: results});
        }else{
            console.log("Error en la consulta a la BD");
        }
        })
    },
    addNewResult : (req, res) => {
        const formData = req.body;
        const imagePathName = req.files.image[0].filename;        
        contactosModel.addNewResult(conexion, formData, imagePathName,(err, results) => { 
            //redirecciona al index de contactos.
            if (!err){
                console.log("Contacto agregado con exito!");
                res.redirect('/contactos/todos');
            }else {
                console.log("Error en la consulta a la BD");
            }
        })
    }
} 