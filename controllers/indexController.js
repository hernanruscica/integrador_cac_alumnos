const conexion = require("../models/conexion_db");
const indexModel = require("../models/indexModel");
const bcrypt = require('bcrypt') ;

module.exports = {
    index: (req, res) => {res.render('index')},
    registrar_form: (req, res) => {res.render('register')},
    login: (req, res) => {res.render('login')},
    autenticar: async (req, res) => {
        const nombre = req.body.nombre;
        const passwordTextoPlano = req.body.contrasenia;
         indexModel.getOne(nombre, conexion, async (err, results) => {
            if (!err){                
                if (results.length > 0){
                    console.log("encontro al menos un usuario con ese nombre", passwordTextoPlano);
                    let resultadoComparacion = await bcrypt.compare(passwordTextoPlano, results[0].contrasenia);
                    if (resultadoComparacion == true){
                        console.log("logeado correctamente");                                                                                                                                   
                        res.redirect(`/session/${results[0].id}`);                                      
                    }else {
                        console.log("contrasenia no valida");
                    }
                }else{
                    console.log("no encontró ningún usuario con ese nombre");
                }                
            }else{
                console.log("Error en la busqueda del usuario en la BD");
            }
        })
    },
    registrar: async (req, res) => {                
        await bcrypt.hash(req.body.contrasenia, 8, (err, contraseniaHasheada) => {
            if (!err){
                const formData = {nombre: req.body.nombre, contrasenia: contraseniaHasheada, correo: req.body.correo};
                indexModel.addOne(formData, conexion, (err, results) => {
                    if (!err){
                        console.log("usuario registrado correctamente en la bd");
                        res.render('login');
                    } else {
                        console.log("error al registrar usuario en la bd");
                    }
                })
            } 
        });        
    },
    create_session: async (req, res) => {
        const id = req.params.id;
        await indexModel.getOneById(id, conexion, (err, results) => {
            if (!err){
                console.log("encontre al usuario por id", results[0].nombre)
                req.session.usuario = {
                    nombre: results[0].nombre,
                    id: results[0].id,
                    correo: results[0].correo,
                    contrasenia: results[0].contrasenia
                };                  
                res.redirect('/contactos');   
            }else{
                console.log("error al buscar al usuario por id");
            }
        })   
    },
    salir: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
              console.log("Error destroying session");
            } else {
              console.log("Session destroyed successfully");
              res.redirect('/');
            }
          });
    }
} 