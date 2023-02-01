
use ruscicacode_agendacac_db;

UPDATE contactos 
SET nombres = 'Cesar Hernan',
	apellidos = 'Ruscica',
    correo = 'chernan80@gmail.com',
    telefono = '1132924558',
    imagen = '1674672130058-images.png'
WHERE id = 31;

DELETE FROM usuarios WHERE nombre = 'pedro';
DELETE FROM usuarios WHERE id = 27;

DROP TABLE contactos;
DROP TABLE usuarios;

ALTER TABLE contactos MODIFY COLUMN imagen varchar(255) NOT NULL;

ALTER TABLE usuarios MODIFY COLUMN nombre varchar(255) NOT NULL UNIQUE;