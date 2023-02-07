const nodemailer = require('nodemailer');

module.exports = {
    // Crear una función para enviar un correo electrónico
    enviarCorreo: (email, id, id_recuperacion) => {
        // Configurar el servicio de correo electrónico
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {                
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls : { rejectUnauthorized: false }
        });    
        // Definir los detalles del correo electrónico
        let mailOptions = {
            from: 'info@ruscica-code.ar',
            to: email,
            subject: 'Restablecimiento de contraseña - Agenda codo a codo',
            html: ` <h1>Agenda codo a codo</h1>
                    <h2>Sistema de restablecimiento de contraseñas</h2>
                    <p>Siga este enlace para poder restablecer la contraseña: <a href="${process.env.APP_URL}/recuperar_pass/${id}/${id_recuperacion}">Restablecer contraseña - Mi Agenda app</a></p>
                    `
            };    
        // Enviar el correo electrónico
        transporter.sendMail(mailOptions);
    }   
}