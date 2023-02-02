use ruscicacode_agendacac_db;

CREATE TABLE usuarios (
    id INTEGER AUTO_INCREMENT NOT NULL ,
    nombre varchar(50) NOT NULL, 
    contrasenia varchar(255) NOT NULL,
    correo varchar(50) NOT NULL,    
    PRIMARY KEY (id),    
    UNIQUE (nombre),
    UNIQUE (correo)
);
CREATE TABLE contactos (
    id INTEGER AUTO_INCREMENT,
    nombres varchar(50) NOT NULL,
    apellidos varchar(50) NOT NULL,       
    correo varchar(50) NOT NULL,
    telefono varchar(50) NOT NULL,
    imagen varchar(100) NOT NULL,
    PRIMARY KEY (id),
    usuario_id INTEGER NOT NULL ,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)  ON DELETE NO ACTION    
);

CREATE TABLE recuperaciones_correo (
	id INTEGER AUTO_INCREMENT,
    id_recuperacion varchar(255) NOT NULL,   
    usuario_id INTEGER NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)  ON DELETE NO ACTION    
);
