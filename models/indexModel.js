module.exports = { 
    getOne: (nombre, conection, myFunction) => {
        conection.query(`SELECT * FROM usuarios WHERE nombre='${nombre}'`, myFunction);
    },
    addOne: (formData, conection, myFunction) => {
        conection.query(`INSERT INTO usuarios (nombre, contrasenia, correo) VALUES ('${formData.nombre}', '${formData.contrasenia}', '${formData.correo}');`, myFunction);
    }
}