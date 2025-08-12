import { Router } from "express";
import { pool } from "./conexion_db.js";

const router = Router();

// GET all users
router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM usuarios");
        res.json(rows);
    } catch (error) {
        res.status(500).json({
        status: "error",
        message: error.message,
        });
    }
});

// GET user by id
router.get("/:id_usuario", async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE id_usuario = ?", [id_usuario]);
        if (rows.length === 0) return res.status(404).json({ mensaje: "Usuario no encontrado" });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({
        status: "error",
        message: error.message,
        });
    }
});

// CREATE user
router.post("/", async (req, res) => {
    try {
        const { id_usuario, nombre_completo, identificacion, correo, contrasena, telefono } = req.body;
        const sql = `INSERT INTO usuarios (id_usuario, nombre_completo, identificacion, correo, contrasena, telefono) VALUES (?, ?, ?, ?, ?, ?)`;
        await pool.query(sql, [id_usuario, nombre_completo, identificacion, correo, contrasena, telefono]);
        res.status(201).json({ mensaje: "Usuario creado exitosamente" });
    } catch (error) {
        res.status(500).json({
        status: "error",
        message: error.message,
        });
    }
});

// UPDATE user
router.put("/:id_usuario", async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const { nombre_completo, identificacion, correo, contrasena, telefono } = req.body;
        const sql = `UPDATE usuarios SET nombre_completo = ?, identificacion = ?, correo = ?, contrasena = ?, telefono = ? WHERE id_usuario = ?`;
        const [result] = await pool.query(sql, [nombre_completo, identificacion, correo, contrasena, telefono, id_usuario]);
        if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Usuario no encontrado" });
        res.json({ mensaje: "Usuario actualizado" });
    } catch (error) {
        res.status(500).json({
        status: "error",
        message: error.message,
        });
    }
});

// DELETE user
router.delete("/:id_usuario", async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const [result] = await pool.query("DELETE FROM usuarios WHERE id_usuario = ?", [id_usuario]);
        if (result.affectedRows === 0) return res.status(404).json({ mensaje: "Usuario no encontrado" });
        res.json({ mensaje: "Usuario eliminado" });
    } catch (error) {
        res.status(500).json({
        status: "error",
        message: error.message,
        });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { correo, contrasena } = req.body;
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?", [correo, contrasena]);
        if (rows.length === 0) return res.status(401).json({ mensaje: "Credenciales incorrectas" });
        res.json({ mensaje: "Inicio de sesiÃ³n exitoso", usuario: rows[0] });
    } catch (error) {
        res.status(500).json({
        status: "error",
        message: error.message,
        });
    }
});

export default router;