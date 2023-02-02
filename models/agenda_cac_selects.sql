use ruscicacode_agendacac_db;

SELECT * FROM usuarios;
SELECT * FROM contactos;
SELECT * FROM recuperaciones_correo;

SELECT id_recuperacion FROM recuperaciones_correo WHERE usuario_id = "1";