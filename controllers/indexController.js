const conexion = require("../models/conexion_db");
const indexModel = require("../models/indexModel");
const bcrypt = require('bcrypt') ;
const nodemailer = require('nodemailer');

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
        /*
        req.session.destroy((err) => {
            if (err) {
              console.log("Error destroying session");
            } else {
              console.log("Session destroyed successfully");
              res.redirect('/');
            }
          });
          */
        console.log("Session destroyed successfully");
        req.session.usuario = undefined;
        res.redirect('/');
    },
    recuperar_verform: (req, res) => {

        let idUsuario = req.params.id_usuario;
        let idRecuperacion = req.params.id_recuperacion;   
        let idRecuperacionAcomparar = null ;                      

        if (idUsuario === undefined){
            res.render('recovery_form');
        }else{

                //me falta traer el id de recuperacion de la BD para compararlo aca....

            if (idRecuperacion == 'lucho'){
                res.send(`id de recuperacion: "${idRecuperacion}" CORRECTO del idUsuario: ${idUsuario}`);
            }else{
                res.send("id de recuperacion incorrecto");
            }
        }
    },
    enviar_enlace: async (req, res) => {     
        
        // Crear una función para enviar un correo electrónico
        async function enviarCorreo(email, id, id_recuperacion) {
            // Configurar el servicio de correo electrónico
            let transporter = nodemailer.createTransport({
            host: 'smtp.correoseguro.co',
            port: 587,
            secure: false,
            auth: {
                user: 'agenda@ruscica-code.ar',
                pass: 'B4rt0n2018'
            }
            });
        
            // Definir los detalles del correo electrónico
            let mailOptions = {
            from: 'info@ruscica-code.ar',
            to: email,
            subject: 'Recuperación de contraseña - Agenda codo a codo',
            text: `Siga este enlace para poder restablecer la contraseña: https://agenda-cac.onrender.com/recuperar_pass/${id}/${id_recuperacion}`
            };
        
            // Enviar el correo electrónico
            await transporter.sendMail(mailOptions);
        }
        let userName = req.body.nombre;
        try{
            //busco el usuario que exista en la BD.
            await indexModel.getOne(userName, conexion, (err, results) => {                
                if (!err){                        
                    //console.log(results.length);                               
                    if (results.length > 0){                    
                        // Enviar el enlace con el id hasheado por correo electrónico
                        let usuario = results[0];
                        let id_recuperacion = 'pepe';
                        indexModel.updateIdRecovery(usuario.id, id_recuperacion, conexion,  (err, results) => {
                            if (!err) {
                                console.log('id de recuperacion insertado con exito');
                            }else{
                                console.log(err);
                            }
                        });
                        enviarCorreo(results[0].correo, usuario.id, id_recuperacion);    
                        res.status(200).send(`Se le enviará un correo para restablecer la contraseña a ${results[0].nombre}`)
                    }else{
                        res.status(200).send(`usuario NO encontrado!`)
                    }
                }else{
                    res.status(400).send("error en la consulta");
                }     
            })       

        }catch (error){
            res.status(500).send(error.message);
        }
    }
} 