const mysql = require('mysql');

//Crea la conexión a la Base de datos.
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
connection.connect(
    (err) => {
        if (!err) {
            console.log("Conexión a la BD correcta");
        }else {
            console.log("Error de conexion a la BD");
        }
    }
);
module.exports = connection;