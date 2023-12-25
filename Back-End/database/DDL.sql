CREATE DATABASE IF NOT EXISTS EvilHubTourney;
USE EvilHubTourney;

create user 'devEvilDev'@'%' identified by 'developerEHT';
grant all privileges on *.* to 'devEvilDev'@'%';
flush privileges;

CREATE TABLE IF NOT EXISTS `administrador` (
  `id_administrador` smallint NOT NULL AUTO_INCREMENT,
  `foto` mediumblob NULL,
  `nombre` varchar(64) NOT NULL,
  `username` varchar(20) NOT NULL,
  `correo` varchar(200) NOT NULL UNIQUE,
  `password` varchar(64) NOT NULL,
  PRIMARY KEY (`id_administrador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `participante` (
  `id_participante` smallint NOT NULL AUTO_INCREMENT,
  `foto` mediumblob NULL,
  `nombre` varchar(64) NOT NULL,
  `username` varchar(20) NOT NULL,
  `correo` varchar(200) NOT NULL UNIQUE,
  `password` varchar(64) NOT NULL,
  PRIMARY KEY (`id_participante`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `torneo` (
  `id_torneo` smallint NOT NULL AUTO_INCREMENT,
  `id_administrador` smallint NOT NULL,
  `foto` mediumblob NULL,
  `nombre_torneo` varchar(100) NOT NULL,
  `reglas`  text NOT NULL,
  `consola` varchar(30) NOT NULL,
  `nombre_videojuego` varchar(200) NOT NULL,
  `numero_participantes` smallint NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  PRIMARY KEY (`id_torneo`),
  CONSTRAINT `id_administrador` FOREIGN KEY (`id_administrador`) REFERENCES `administrador` (`id_administrador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `entrar` (
  `id_torneo` smallint NOT NULL,
  `id_participante` smallint DEFAULT NULL,
  CONSTRAINT `id_torneo` FOREIGN KEY (`id_torneo`) REFERENCES `torneo` (`id_torneo`),
  CONSTRAINT `id_participante` FOREIGN KEY (`id_participante`) REFERENCES `participante` (`id_participante`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELIMITER //

CREATE TRIGGER prevent_delete_administrador_1
BEFORE DELETE ON administrador
FOR EACH ROW
BEGIN
  IF OLD.id_administrador = 1 THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'No se puede eliminar al administrador con id 1.';
  END IF;
END;
//

DELIMITER ;

INSERT INTO administrador (nombre, username, correo, password)
VALUES ('Carlos', 'carloscrmrz', 'c.cabrera@ciencias.unam.mx', '004514c802f4441aa32914b6a623ebf986cacbdc76aaeec9447fb66d04da5bb6') -- Contraseña: Password1


