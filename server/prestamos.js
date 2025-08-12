import { Router } from "express";
import { pool } from "./conexion_db.js";

const router = Router();

// GET all prestamos
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT 
        prestamos.id_prestamo,
        usuarios.nombre_completo AS usuario,
        libros.titulo AS libro,
        prestamos.fecha_prestamo,
        prestamos.fecha_devolucion,
        prestamos.estado
      FROM prestamos
      JOIN usuarios ON usuarios.id_usuario = prestamos.id_usuario
      JOIN libros ON libros.isbn = prestamos.isbn
    `;
    const [filas] = await pool.query(query);
    return res.json(filas);
  } catch (error) {
    res.status(500).json({
      status: "error",
      endpoint: req.originalUrl,
      method: req.method,
      message: error.message,
    });
  }
});

// GET prestamo by id
router.get("/:id_prestamo", async (req, res) => {
  try {
    const { id_prestamo } = req.params;
    const query = `SELECT * FROM prestamos WHERE id_prestamo = ?`;
    const [filas] = await pool.query(query, [id_prestamo]); // <-- array aquí
    if (filas.length === 0) {
      return res.status(404).json({ mensaje: "Préstamo no encontrado" });
    }
    return res.json(filas[0]);
  } catch (error) {
    res.status(500).json({
      status: "error",
      endpoint: req.originalUrl,
      method: req.method,
      message: error.message,
    });
  }
});

// POST prestamo
router.post("/", async (req, res) => {
  try {
    const { id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado } = req.body;

    if (!id_usuario || !isbn || !fecha_prestamo || !fecha_devolucion || !estado) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    const query = `
      INSERT INTO prestamos
      (id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado];
    await pool.query(query, values);
    res.status(201).json({ mensaje: "Préstamo creado exitosamente" });
  } catch (error) {
    res.status(500).json({
      status: "error",
      endpoint: req.originalUrl,
      method: req.method,
      message: error.message,
    });
  }
});

// PUT prestamo
router.put("/:id_prestamo", async (req, res) => {
  try {
    const { id_prestamo } = req.params;
    const { id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado } = req.body;

    const query = `
      UPDATE prestamos SET 
        id_usuario = ?,
        isbn = ?,
        fecha_prestamo = ?,
        fecha_devolucion = ?,
        estado = ?
      WHERE id_prestamo = ?
    `;
    const values = [id_usuario, isbn, fecha_prestamo, fecha_devolucion, estado, id_prestamo];
    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Préstamo no encontrado" });
    }
    return res.json({ mensaje: "Préstamo actualizado" });
  } catch (error) {
    res.status(500).json({
      status: "error",
      endpoint: req.originalUrl,
      method: req.method,
      message: error.message,
    });
  }
});

// DELETE prestamo
router.delete("/:id_prestamo", async (req, res) => {
  try {
    const { id_prestamo } = req.params;
    const query = `DELETE FROM prestamos WHERE id_prestamo = ?`;
    const [result] = await pool.query(query, [id_prestamo]); // <-- array aquí

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Préstamo no encontrado" });
    }
    return res.json({ mensaje: "Préstamo eliminado" });
  } catch (error) {
    res.status(500).json({
      status: "error",
      endpoint: req.originalUrl,
      method: req.method,
      message: error.message,
    });
  }
});

export default router;
