CREATE DATABASE IF NOT EXISTS bd_f1;
USE bd_f1;

-- Eliminar tablas existentes para evitar duplicados si el script se ejecuta varias veces
DROP TABLE IF EXISTS Resultados;
DROP TABLE IF EXISTS Votaciones;
DROP TABLE IF EXISTS Carreras;
DROP TABLE IF EXISTS Circuitos;
DROP TABLE IF EXISTS Pilotos;

-- Tabla Pilotos
CREATE TABLE IF NOT EXISTS Pilotos (
    id_piloto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    equipo VARCHAR(50) NOT NULL
);

-- Tabla Circuitos
CREATE TABLE IF NOT EXISTS Circuitos (
    id_circuito INT AUTO_INCREMENT PRIMARY KEY,
    nombre_circuito VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(100) NOT NULL,
    suele_llover BOOLEAN NOT NULL
);

-- Tabla Carreras
CREATE TABLE IF NOT EXISTS Carreras (
    id_carrera INT AUTO_INCREMENT PRIMARY KEY,
    id_circuito INT,
    fecha DATE NOT NULL,
    FOREIGN KEY (id_circuito) REFERENCES Circuitos(id_circuito) ON DELETE CASCADE
);

-- Tabla Votaciones
CREATE TABLE IF NOT EXISTS Votaciones (
    id_votacion INT AUTO_INCREMENT PRIMARY KEY,
    id_piloto INT,
    id_carrera INT,
    posicion TINYINT,
    puntos INT,
    FOREIGN KEY (id_piloto) REFERENCES Pilotos(id_piloto) ON DELETE CASCADE,
    FOREIGN KEY (id_carrera) REFERENCES Carreras(id_carrera) ON DELETE CASCADE
);

-- Tabla Resultados
CREATE TABLE IF NOT EXISTS Resultados (
    id_resultado INT AUTO_INCREMENT PRIMARY KEY,
    id_piloto INT UNIQUE,
    puntos_totales INT DEFAULT 0,
    FOREIGN KEY (id_piloto) REFERENCES Pilotos(id_piloto) ON DELETE CASCADE
);

-- Insertar datos iniciales en la tabla de pilotos
INSERT INTO Pilotos (nombre, apellido, equipo) VALUES 
('Lewis', 'Hamilton', 'Mercedes'),
('Max', 'Verstappen', 'Red Bull'),
('Charles', 'Leclerc', 'Ferrari'),
('Carlos', 'Sainz', 'Ferrari'),
('Lando', 'Norris', 'McLaren');

-- Insertar datos iniciales en la tabla de circuitos
INSERT INTO Circuitos (nombre_circuito, ubicacion, suele_llover) VALUES 
('Circuito de Mónaco', 'Montecarlo', FALSE),
('Circuito de Silverstone', 'Reino Unido', TRUE),
('Circuito de Spa-Francorchamps', 'Bélgica', TRUE);

-- Insertar datos iniciales en la tabla de carreras
INSERT INTO Carreras (id_circuito, fecha) VALUES 
(1, '2024-05-28'),
(2, '2024-06-15'),
(3, '2024-07-01');
