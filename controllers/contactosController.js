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
                console.log("Error en la consulta INSERT a la BD");
            }
        })
    },
    delete: (req, res) => {
        const id = req.params.id;
        contactosModel.delete(id, conexion, (err, results) => {
            if (!err){
                console.log("contacto eliminado con exito!");
                res.redirect('/contactos/todos');
            } else {
                console.log("Error en la consulta DELETE a la bd");
            }
        })
    },
    edit: (req, res) => {
        const id = req.params.id;
        contactosModel.getOne(id, conexion, (err, results) => {
            if (!err){
                console.log("cargada la vista de edicion");
                res.render('edit', {contacto: results[0]});
            }
        })
    }
} 