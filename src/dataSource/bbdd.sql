-- 1. Crear la base de datos (si no existe)
CREATE DATABASE hambre_fiambre;

-- Conectar a la base de datos hambre_fiambre
USE hambre_fiambre;

-- 2. Crear la tabla usuario con los campos actualizados
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    userName VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    age VARCHAR(3),
    blodGroup VARCHAR(5),
    kidneys VARCHAR(20),
    religion VARCHAR(50),
    healthStatus VARCHAR(100),
    typeUser VARCHAR(20) DEFAULT 'user',
    n_pedidos INT DEFAULT 0,
    n_fallidos INT DEFAULT 0
);

-- 3. Insertar usuarios de prueba con los nuevos valores de healthStatus
INSERT INTO usuario (userName, password, name, age, blodGroup, kidneys, religion, healthStatus, typeUser, n_pedidos, n_fallidos)
VALUES 
('juanito', 'pass123', 'Juan Pérez', '25', 'O+', '2', 'Católico', 'Bastante sano', 'admin', 0, 0),
('maria23', 'clave456', 'María López', '30', 'A-', '2', 'Atea', 'En la media', 'user', 0, 0),


-- 4. Verificar la tabla creada
SELECT * FROM usuario;