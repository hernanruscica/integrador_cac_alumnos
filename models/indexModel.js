module.exports = { 
    getOne: (nombre, conection, myFunction) => {
        conection.query(`SELECT * FROM usuarios WHERE nombre='${nombre}'`, myFunction);
    },
    getOneById: (id, conection, myFunction) => {
        conection.query(`SELECT * FROM usuarios WHERE id='${id}'`, myFunction);
    },
    addOne: (formData, conection, myFunction) => {
        conection.query(`INSERT INTO usuarios (nombre, contrasenia, correo) VALUES ('${formData.nombre}', '${formData.contrasenia}', '${formData.correo}');`, myFunction);
    },
    updateIdRecovery: (id, idRecovery, conection, myFunction) => {
        //en esta tabla siempre hay un registro para todos los usuarios, haya no haya pedido la recuperacion de contraseña
        conection.query(`UPDATE recuperaciones_correo SET id_recuperacion = '${idRecovery}' WHERE usuario_id = ${id}`, myFunction)
    },
    getIdRecovery: (id, conection, myFunction) => {
        conection.query(`SELECT id_recuperacion FROM recuperaciones_correo WHERE usuario_id='${id}'`, myFunction)
    },
    changePass: (id, pass, conection, myFunction) => {
        conection.query(`UPDATE usuarios SET contrasenia = '${pass}' WHERE id = '${id}'`, myFunction);
    }
}