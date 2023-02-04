const conexion = require("../models/conexion_db");
const indexModel = require("../models/indexModel");
const bcrypt = require('bcrypt') ;

const utilidades = require('../config/utilidades');

module.exports = {
    index: (req, res) => {res.render('index')},
    registrar_form: (req, res) => {res.render('register')},    
    login: (req, res) => {req.session.usuario ? res.redirect('/contactos') : res.render('login'); console.log(__dirname)},
    autenticar: (req, res) => {
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
                        res.redirect('/ingresar');
                    }
                }else{ 
                    console.log("no encontró ningún usuario con ese nombre");
                    res.redirect('/ingresar');
                }                
            }else{
                console.log("Error en la busqueda del usuario en la BD");
                res.redirect('/ingresar');
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
                        res.render('register');
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
        console.log("Session destroyed successfully");
        req.session.usuario = undefined;
        res.redirect('/');
    },
    recuperar_verform: async (req, res) => {

        let idUsuario = req.params.id_usuario;
        let idRecuperacion = req.params.id_recuperacion;   

        if (idUsuario === undefined){
            res.render('recovery_form');
        }else{
            //me falta traer el id de recuperacion de la BD para compararlo aca....
            await indexModel.getIdRecovery(idUsuario, conexion, (err, results) => {
                console.log(results[0].id_recuperacion)
                let idRecuperacionAcomparar = results[0].id_recuperacion;

                if (idRecuperacion == idRecuperacionAcomparar){                
                    //res.send(`id de recuperacion: "${idRecuperacion}" CORRECTO del idUsuario: ${idUsuario}`);
                    res.render('reset_password', {id: idUsuario});
                }else{
                    res.send("id de recuperacion incorrecto");
                }
            }) ;
        }
    },
    enviar_enlace: async (req, res) => {     
        let userName = req.body.nombre;
        
        //busco el usuario que exista en la BD.
        await indexModel.getOne(userName, conexion, async (err, results) => {                
            if (!err){                        
                //console.log(results.length);                               
                if (results.length > 0){                    
                    // Enviar el enlace con el id hasheado por correo electrónico
                    let usuario = results[0];                        
                    let palabraSecreta = "$2b$08$ySqpvxkIb42Nhx.ZPz9g3eWSljUQi5hV9b1KbvRvRvQ/OcD974obe"
                    let id_recuperacion = null;

                    id_recuperacion = bcrypt.hashSync(`${usuario.nombre}${palabraSecreta}`, 8).replace(/\//g, '');
                    //id_recuperacion = id_recuperacion.replaceAll('/', '');
                    await indexModel.updateIdRecovery(usuario.id, id_recuperacion, conexion,  (err, results) => {
                        if (!err) {
                            console.log('id de recuperacion insertado con exito');    
                            utilidades.enviarCorreo(usuario.correo, usuario.id, id_recuperacion);    
                            res.status(200).send(`
                                        <h1>Correo enviado correctamente!</h1>
                                        <p>Se envió un correo para restablecer la contraseña a ${usuario.correo}</p>
                                        <p>Revise su casilla de correo electrónico</p>
                                        <p>Mientras puede volver a la página de inicio haciendo<a href='/'>Click Acá!</a>
                                        `);                            
                        }else{
                            console.log(err);
                        }
                    });                        
                }else{
                    res.status(200).send(`usuario NO encontrado!`)
                }
            }else{
                res.status(400).send("error en la consulta");
            }     
        })       
    },
    changePass: async (req, res) => {
        console.log("changepass function");
        let id = req.body.id;
        let pass = req.body.contrasenia;
        let passHasheada = await bcrypt.hash(pass, 8);
        await indexModel.changePass(id, passHasheada, conexion, (err, results) => {
            if (!err){
                console.log("password cambiada exitosamente con hash");
                res.redirect('/ingresar');
            }else{
                console.log("error mientras se cambiaba la password");
            }
        })
    }
} 