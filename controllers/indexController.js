const conexion = require("../models/conexion_db");
const indexModel = require("../models/indexModel");

module.exports = {
    index: (req, res) => {res.render('index')},
    register: (req, res) => {res.render('register')},
    login: (req, res) => {res.render('login')},
    autenticar: (req, res) => {
        const nombre = req.body.nombre;
        indexModel.getOne(nombre, conexion, (err, results) => {
            if (!err){
                //ya encontro el nombre de usuario y tengo la contrasenia, email, id y nombre obviamente...
                console.log(results);
                res.send(results);
            }else{
                console.log("Error en la busqueda del usuario en la BD");
            }
        })
    }
} 