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
# Consultas MySQL Avanzadas para Pruebas

## 1. Consultas de Agregación
```sql
-- Total de libros por cada autor
SELECT autor, COUNT(*) AS total_libros
FROM libros
GROUP BY autor;

-- Promedio de edad de los usuarios
SELECT AVG(TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE())) AS promedio_edad
FROM usuarios;

-- Número de préstamos por mes
SELECT DATE_FORMAT(fecha_prestamo, '%Y-%m') AS mes, COUNT(*) AS total_prestamos
FROM prestamos
GROUP BY mes
ORDER BY mes DESC;
```

## 2. Subconsultas
```sql
-- Usuarios que han hecho más de 3 préstamos
SELECT nombre, apellido
FROM usuarios
WHERE id_usuario IN (
    SELECT id_usuario
    FROM prestamos
    GROUP BY id_usuario
    HAVING COUNT(*) > 3
);

-- Libros que nunca han sido prestados
SELECT titulo
FROM libros
WHERE id_libro NOT IN (
    SELECT id_libro
    FROM prestamos
);
```

## 3. Joins Múltiples
```sql
-- Listar usuarios, libros y fecha de préstamo
SELECT u.nombre, u.apellido, l.titulo, p.fecha_prestamo
FROM prestamos p
JOIN usuarios u ON p.id_usuario = u.id_usuario
JOIN libros l ON p.id_libro = l.id_libro
ORDER BY p.fecha_prestamo DESC;

-- Autores y cantidad de veces que sus libros han sido prestados
SELECT l.autor, COUNT(p.id_prestamo) AS veces_prestado
FROM libros l
LEFT JOIN prestamos p ON l.id_libro = p.id_libro
GROUP BY l.autor;
```

## 4. Funciones de Fecha
```sql
-- Préstamos realizados en los últimos 30 días
SELECT *
FROM prestamos
WHERE fecha_prestamo >= CURDATE() - INTERVAL 30 DAY;

-- Calcular días que lleva prestado un libro
SELECT id_prestamo, DATEDIFF(CURDATE(), fecha_prestamo) AS dias_prestado
FROM prestamos
WHERE fecha_devolucion IS NULL;
```

## 5. Actualización y Eliminación con Condiciones
```sql
-- Marcar como devueltos todos los préstamos atrasados
UPDATE prestamos
SET fecha_devolucion = CURDATE()
WHERE fecha_devolucion IS NULL AND fecha_prestamo < CURDATE() - INTERVAL 60 DAY;

-- Eliminar usuarios sin préstamos
DELETE FROM usuarios
WHERE id_usuario NOT IN (SELECT DISTINCT id_usuario FROM prestamos);
```

## 6. Creación de Vista
```sql
CREATE VIEW vista_prestamos_detallada AS
SELECT p.id_prestamo, u.nombre AS usuario, l.titulo AS libro, p.fecha_prestamo, p.fecha_devolucion
FROM prestamos p
JOIN usuarios u ON p.id_usuario = u.id_usuario
JOIN libros l ON p.id_libro = l.id_libro;
```

## 7. Procedimiento Almacenado
```sql
DELIMITER $$
CREATE PROCEDURE obtener_prestamos_usuario(IN usuario_id INT)
BEGIN
    SELECT l.titulo, p.fecha_prestamo, p.fecha_devolucion
    FROM prestamos p
    JOIN libros l ON p.id_libro = l.id_libro
    WHERE p.id_usuario = usuario_id;
END $$
DELIMITER ;
```


