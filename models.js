const mysql = require('mysql');
const configMysql = {
    host: 'localhost',
    user: 'root' ,
    password: '',
    database: 'rickandmorty'
}
const connectMysql = mysql.createConnection(configMysql);

function getAlumnos() {
    const query = 'SELECT * FROM characters';
    
    connectMysql.query(query, (err, result, fields) => {
        if (err) {
            console.log(err);
            return;
        }           
        //console.log(result)
        return result;
    })    
}

console.log(getAlumnos());

module.exports = getAlumnos;