# Operaciones Múltiples MySQL para Pruebas

Este archivo contiene ejemplos de operaciones que podrían aparecer en pruebas de MySQL.

## 1. Crear Base de Datos y Tablas

```sql
CREATE DATABASE IF NOT EXISTS prueba_db;
USE prueba_db;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    fecha_registro DATE DEFAULT CURRENT_DATE
);

CREATE TABLE libros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    autor VARCHAR(100),
    anio_publicacion INT,
    disponible BOOLEAN DEFAULT TRUE
);

CREATE TABLE prestamos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    libro_id INT,
    fecha_prestamo DATE,
    fecha_devolucion DATE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (libro_id) REFERENCES libros(id)
);
```

## 2. Insertar Datos

```sql
INSERT INTO usuarios (nombre, apellido, correo)
VALUES
('Juan', 'Pérez', 'juan.perez@example.com'),
('María', 'López', 'maria.lopez@example.com'),
('Carlos', 'Gómez', 'carlos.gomez@example.com');

INSERT INTO libros (titulo, autor, anio_publicacion)
VALUES
('Cien años de soledad', 'Gabriel García Márquez', 1967),
('Don Quijote de la Mancha', 'Miguel de Cervantes', 1605),
('El Principito', 'Antoine de Saint-Exupéry', 1943);

INSERT INTO prestamos (usuario_id, libro_id, fecha_prestamo, fecha_devolucion)
VALUES
(1, 2, '2025-08-01', '2025-08-15'),
(2, 1, '2025-08-02', NULL),
(3, 3, '2025-08-03', '2025-08-10');
```

## 3. Consultas Básicas

```sql
-- Listar todos los usuarios
SELECT * FROM usuarios;

-- Mostrar libros disponibles
SELECT titulo FROM libros WHERE disponible = TRUE;

-- Buscar usuario por correo
SELECT * FROM usuarios WHERE correo = 'maria.lopez@example.com';
```

## 4. Consultas con JOIN

```sql
-- Listar todos los préstamos con datos del usuario y libro
SELECT p.id, u.nombre, u.apellido, l.titulo, p.fecha_prestamo, p.fecha_devolucion
FROM prestamos p
JOIN usuarios u ON p.usuario_id = u.id
JOIN libros l ON p.libro_id = l.id;

-- Libros prestados por "María López"
SELECT l.titulo, p.fecha_prestamo
FROM prestamos p
JOIN libros l ON p.libro_id = l.id
JOIN usuarios u ON p.usuario_id = u.id
WHERE u.nombre = 'María' AND u.apellido = 'López';
```

## 5. Actualizaciones

```sql
-- Marcar libro como no disponible
UPDATE libros SET disponible = FALSE WHERE id = 2;

-- Cambiar correo de un usuario
UPDATE usuarios SET correo = 'nuevo.correo@example.com' WHERE id = 1;
```

## 6. Eliminaciones

```sql
-- Eliminar un préstamo
DELETE FROM prestamos WHERE id = 3;

-- Eliminar usuario
DELETE FROM usuarios WHERE id = 2;
```

## 7. Consultas Avanzadas

```sql
-- Contar libros disponibles
SELECT COUNT(*) AS total_disponibles FROM libros WHERE disponible = TRUE;

-- Top usuarios con más préstamos
SELECT u.nombre, u.apellido, COUNT(*) AS total_prestamos
FROM prestamos p
JOIN usuarios u ON p.usuario_id = u.id
GROUP BY u.id
ORDER BY total_prestamos DESC;
```
