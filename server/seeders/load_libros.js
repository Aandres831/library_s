/* it is responssible for loanding users into the data base */
import fs from 'fs';
import path from 'path';
import  csv from  'csv-parser'
import { pool } from '../conexion_db.js';

export async function cargarLibrosALaBaseDeDatos(){
    const rutaArchivo = path.resolve('server/data/02_libros.csv');
    const libros = [];

    return new Promise ((resolve, reject) => {
        fs.createReadStream(rutaArchivo)
            .pipe(csv())
            .on('data', (fila) => {
                libros.push([
                    fila.isbn,
                    fila.titulo,
                    fila.anio_de_publicacion,
                    fila.autor
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO libros (isbn,titulo,anio_de_publicacion,autor) VALUES ?';
                    const [result] = await pool.query(sql, [libros]);

                    console.log(`se insertaron ${result.affectedRows} libros.`);
                    resolve();
                } catch (error) {
                    console.log('Error al insertar libros:', error.message)
                    reject(error);
                }
            })
    })
}