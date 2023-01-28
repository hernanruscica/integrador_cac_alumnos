module.exports = { 
    getOne: (nombre, conection, myFunction) => {
        conection.query(`SELECT * FROM usuarios WHERE nombre='${nombre}'`, myFunction);
    }
}