const conexion = require("../models/conexion_db");
const contactosModel = require("../models/contactosModel");


const fs = require('fs');
const request = require('request');

function subirFotoAlServidor (nombreArchivo){
    const file = fs.createReadStream(`public/imgs/${nombreArchivo}`); // ruta del archivo de imagen
    const options = {
    method: 'POST',
    url: 'https://ruscica-code.ar/uploads.php', // URL del servidor y archivo PHP
    headers: {
        'Content-Type': 'multipart/form-data'
    },
    formData: {
        file: file
    }
    };
    request(options, (err, res, body) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(body);
      });
}

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
        const nombreImagen = req.files.image[0].filename;     
        subirFotoAlServidor(nombreImagen);   
        contactosModel.addNewResult(conexion, formData, nombreImagen,(err, results) => { 
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
    },
    editResult: (req, res) => {
        const id = req.params.id;
        const formData = req.body;        
        let imagen = null;
        if (req.files.image != null){
            imagen = req.files.image[0].filename 
        }else{
            imagen =  req.body.imagen_actual;
        }        
        subirFotoAlServidor(imagen); 
        contactosModel.edit(id, formData, imagen, conexion, (err, results) => {
            if (!err){
                console.log("Datos del contacto correctamente actualizados en la BD");
                res.redirect('/contactos/todos');
            }else{
                console.log("Error en la consulta UPDATE a la bd");
                console.log(err);
            }
        })
    }
} 
