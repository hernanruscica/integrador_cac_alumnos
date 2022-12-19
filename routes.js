const express = require('express');
const routes = express.Router();
//const getAlumnos = require('./models.js');

const mysql = require('mysql');
const configMysql = {
    host: 'localhost',
    user: 'root' ,
    password: '',
    database: 'estudio_colaborativo'
}
const connectMysql = mysql.createConnection(configMysql);

routes.get('/', (req, res) => {
    //res.send('Hola RAIZ');
    res.render('pages/home', {title: 'Listado de Alumnos'});
});

routes.get('/saludo', (req, res) => {
    res.send('Hola SALUDO');
});

routes.get('/alumnos', (req, res) => {  
    const query = 'SELECT * FROM alumnos';    
    connectMysql.query(query, (err, result, fields) => {
        if (err) {
            console.log(err);
            return;
        }                           
        res.render('pages/alumnos', {data: result});
    })   
});

routes.get('/alumnos/delete/:id', (req, res) => {
    let id = req.params.id;
    const query = `DELETE FROM alumnos WHERE alumnos.id = ${id}`;    
    connectMysql.query(query, (err, result, fields) => {
        if (err) {
            console.log(err);
            return;
        }                           
        res.redirect('/alumnos');
    })  
})

routes.post('/add', (req, res) => {
    const {nombre, apellido, dni} = req.body;
    console.log(nombre, apellido, dni);
    const query = `INSERT INTO alumnos (nombre, apellido, dni) VALUES ('${nombre}', '${apellido}', ${dni})`;
    connectMysql.query(query, (err, result, fields) => {
        if (err){
            console.log(err);
        }else {
            res.redirect('/alumnos');
        }
    })    
})

module.exports = routes;