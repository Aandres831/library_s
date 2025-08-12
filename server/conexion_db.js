import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  database: "bibloteca_easy",
  port: 3307,
  user: "root",
  password: "admin",
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0
})

async function  probarConexionConLaBaseDeDatos() {
  try{
    const connection = await pool.getConnection();
    console.log('conexion a la base de datos exitosa');
    connection.release();
  } catch (error) {
    console.log('error al conectar con la base de datos:', error.message);
  }
}

export { pool, probarConexionConLaBaseDeDatos };

//probarConexionConLaBaseDeDatos()