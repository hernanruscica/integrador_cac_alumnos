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
    addNew : (req, res) => {req.session.usuario ? res.render('addnew', {nombre: req.session.usuario.nombre, mensaje: null}) : res.redirect('/registrarse')/*usuario no logueado*/},
    search : (req, res) => {req.session.usuario ? res.render('search', {nombre: req.session.usuario.nombre, mensaje: null}) : res.redirect('/registrarse')/*usuario no logueado*/},
    searchResults: async (req, res) =>  {    
        if (req.session.usuario){    
            const formData = req.body;  
            let id = req.session.usuario.id;              
            await contactosModel.searchResults(id, formData, conexion, (err, results) => {
                if (!err){
                    if (results.length > 0) {
                        console.log("Mostrando los resultados de la busqueda");
                        res.render('view_contacts', {contacts: results, titulo: "Resultados de la busqueda", nombre: req.session.usuario.nombre, mensaje: null});
                    }else{
                        res.render('search', {nombre: req.session.usuario.nombre, mensaje: 'busquedasinresults'}); 
                    }
                }else{
                    console.log("Error en la busqueda en la BD");
                    res.render('contacts_index', {mensaje: 'errorbd', nombre: req.session.usuario.nombre}); 
                }
                }) 
        }else{            
            res.redirect('/registrarse');/*usuario no logueado*/
            console.log("Usuario no logueado");
        }       
    },
    getAll : (req, res) => {
        if (req.session.usuario){
            let usuario_id = req.session.usuario.id;
            contactosModel.getAll(usuario_id, conexion, (err, results) => {
            if (!err){
                console.log("Mostrando todos los contactos");
                res.render('view_contacts', {contacts: results, titulo: "Contactos", nombre: req.session.usuario.nombre, mensaje: null});
            }else{
                console.log("Error en la consulta a la BD");
                res.render('contacts_index', {mensaje: 'errorbd', nombre: req.session.usuario.nombre}); 
            }
            })
        }else{
            res.redirect('/registrarse');/*usuario no logueado*/
            console.log("Usuario no logueado");
        }
    },
    addNewResult : (req, res) => {
        if (req.session.usuario){
            const formData = req.body;            

            const nombreImagen = (req.files.image) ? req.files.image[0].filename : 'dafault_avatar.png'; 
            let id = req.session.usuario.id;    
            subirFotoAlServidor(nombreImagen);   
            contactosModel.addNewResult(id, conexion, formData, nombreImagen,(err, results) => { 
                //redirecciona al index de contactos.
                if (!err){
                    console.log("Contacto agregado con exito!");                                        
                    res.render('contacts_index', {nombre: req.session.usuario.nombre, mensaje: 'contactoagregado'});                     
                }else {
                    console.log("Error en la consulta INSERT a la BD");
                    res.render('contacts_index', {mensaje: 'errorbd', nombre: req.session.usuario.nombre});  
                }
            })
        }else{
            res.redirect('/registrarse');/*usuario no logueado*/
            console.log("Usuario no logueado");
        }
    },
    delete: (req, res) => {
        if (req.session.usuario){
            const id = req.params.id;
            contactosModel.delete(id, conexion, (err, results) => {
                if (!err){
                    console.log("contacto eliminado con exito!");
                    res.redirect('/contactos/todos');
                } else {
                    console.log("Error en la consulta DELETE a la bd");
                }
            })
        }else{
            res.redirect('/registrarse');/*usuario no logueado*/
            console.log("Usuario no logueado");
        }
    },
    edit: (req, res) => {
        if (req.session.usuario){
            const id = req.params.id;
            contactosModel.getOne(id, conexion, (err, results) => {
                if (!err){
                    console.log("cargada la vista de edicion");
                    res.render('edit', {contacto: results[0], nombre: req.session.usuario.nombre, mensaje: null});
                }
            })
        }else{
            res.redirect('/registrarse');/*usuario no logueado*/
            console.log("Usuario no logueado");
        }
    },
    editResult: (req, res) => {
        if (req.session.usuario){
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
                    //res.redirect('/contactos/todos');
                    res.render('contacts_index', {nombre: req.session.usuario.nombre, mensaje: 'edicioncorrecta'});
                }else{
                    console.log("Error en la consulta UPDATE a la bd");
                    console.log(err);
                    res.render('contacts_index', {nombre: req.session.usuario.nombre, mensaje: 'errorbd'});
                }
            })
        }else{ 
            res.redirect('/registrarse');/*usuario no logueado*/
            console.log("Usuario no logueado");
        }
    },
    index: (req, res) => {        
        req.session.usuario ? res.render('contacts_index', {nombre: req.session.usuario.nombre, mensaje: null}) : res.redirect('/registrarse')/*usuario no logueado*/;
    },
    showContact: async (req, res) => {
        let id = (req.params) ?  req.params.id : 'x';
        await contactosModel.getOne(id, conexion, (err, results) =>{
            if (!err){
                if (results.length > 0){                      
                    res.render('view_contact', {titulo: 'Ver Contacto', contact: results[0], nombre: req.session.usuario.nombre});
                }else {
                    res.send(`El contacto con id: ${id} NO existe!`);  
                }
            }
        })              
    }
} 