import { cargarLibrosALaBaseDeDatos } from "./load_libros.js"
import { cargarPrestamosALaBaseDeDatos } from "./load_prestamos.js"
import { cargarUsuariosALaBaseDeDatos } from "./load_usuarios.js"

/* it is responsabilies for calling the loads */
(async () => {
  try {
    console.log('Iniciando seedes...')

    await cargarUsuariosALaBaseDeDatos()
    await cargarLibrosALaBaseDeDatos()
    await cargarPrestamosALaBaseDeDatos()

    console.log('Todos los seeders ejecutados correctamente');
    
  } catch (error) {
    console.log('Error ejecutando los seedes:', error.message);
  } finally {
    process.exit();
  }
}) ()