module.exports = {
    getAll: (conection, myFunction) => {
        conection.query(`SELECT * FROM contactos`, myFunction);
    },
    addNewResult: (conection, formData, image, myFunction) => {
        conection.query(`INSERT INTO contactos (nombres, apellidos, correo, telefono, imagen, usuario_id) VALUES ('${formData.nombres}', '${formData.apellidos}', '${formData.email}', '${formData.telefono}', '${image}', 1)`, myFunction);
    },
    delete: (id, conection, myFunction) => {
        conection.query(`DELETE FROM contactos WHERE id='${id}'`, myFunction);
    },
    getOne: (id, conection, myFunction) => {
        conection.query(`SELECT * FROM contactos WHERE id='${id}'`, myFunction);
    },
    edit: (id, formData, image, conection, myFunction) => {
        conection.query(`UPDATE contactos SET nombres = '${formData.nombres}', apellidos = '${formData.apellidos}', correo = '${formData.email}', telefono = '${formData.telefono}', imagen = '${image}' WHERE id = ${id};`, myFunction);
    }
}