/* it is responssible for loanding users into the data base */
import fs from 'fs';
import path from 'path';
import  csv from  'csv-parser'
import { pool } from '../conexion_db.js';

export async function cargarUsuariosALaBaseDeDatos(){
    const rutaArchivo = path.resolve('server/data/01_usuarios.csv');
    const usuarios = [];

    return new Promise ((resolve, reject) => {
        fs.createReadStream(rutaArchivo)
            .pipe(csv())
            .on('data', (fila) => {
                usuarios.push([
                    fila.id_usuario,
                    fila.nombre_completo,
                    fila.identificacion,
                    fila.correo,
                    fila.contrasena,
                    fila.telefono
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO usuarios (id_usuario,nombre_completo,identificacion,correo,contrasena,telefono) VALUES ?';
                    const [result] = await pool.query(sql, [usuarios]);

                    console.log(`se insertaron ${result.affectedRows} usuarios.`);
                    resolve();
                } catch (error) {
                    console.log('Error al insertar usuarios:', error.message)
                    reject(error);
                }
            })
    })
}