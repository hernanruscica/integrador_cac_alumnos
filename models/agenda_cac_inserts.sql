use ruscicacode_agendacac_db;

INSERT INTO usuarios (nombre, contrasenia, correo) VALUES 
    ('johndoe', password('1234'), 'johndoe@gmail.com'),
    ('janedoe', password('password'), 'janedoe@yahoo.com'),
    ('jimsmith', password('qwerty'), 'jimsmith@hotmail.com');


INSERT INTO contactos (nombres, apellidos, correo, telefono, imagen, usuario_id) VALUES
	('Juan Carlos', 'Fernandez', 'juancafernandez@gmail.com', '1125479658', 'default_avatar.png', 1),
    ('Pedro', 'Rodriguez', 'pedritosoyyo@hotmail.com', '1147856325', 'default_avatar.png', 1),
    ('Carlos Luis', 'Gonzalez', 'carloncho_1985@hotmail.com', '1165477896', 'default_avatar.png', 1),
    ('Ernesto', 'Ochoa', 'ernestochoa@hotmail.com', '1147856325', 'default_avatar.png', 1),
    ('Roberto Carlos', 'Villagran', 'millonamigos@hotmail.com', '1136987412', 'default_avatar.png', 1);
    
INSERT INTO recuperaciones_correo (id_recuperacion, usuario_id) VALUES
	('clavehasheadaparamasplacer', 1);