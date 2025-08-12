/* it is responssible for loanding users into the data base */
import fs from 'fs';
import path from 'path';
import  csv from  'csv-parser'
import { pool } from '../conexion_db.js';

export async function cargarPrestamosALaBaseDeDatos(){
    const rutaArchivo = path.resolve('server/data/03_prestamos.csv');
    const prestamos = [];

    return new Promise ((resolve, reject) => {
        fs.createReadStream(rutaArchivo)
            .pipe(csv())
            .on('data', (fila) => {
                prestamos.push([
                    fila.id_prestamo,
                    fila.id_usuario,
                    fila.isbn,
                    fila.fecha_prestamo,
                    fila.fecha_devolucion,
                    fila.estado
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO prestamos (id_prestamo,id_usuario,isbn,fecha_prestamo,fecha_devolucion,estado) VALUES ?';
                    const [result] = await pool.query(sql, [prestamos]);

                    console.log(`se insertaron ${result.affectedRows} prestamos.`);
                    resolve();
                } catch (error) {
                    console.log('Error al insertar prestamos:', error.message)
                    reject(error);
                }
            })
    })
}