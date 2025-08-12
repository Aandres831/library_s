# Sistema de Gestión de Biblioteca

## Descripción

Este sistema permite la gestión de préstamos de libros, usuarios y libros en una biblioteca. Incluye funcionalidades de registro, inicio de sesión, CRUD para usuarios, libros y préstamos, y una interfaz web amigable. El proyecto está modularizado para facilitar su adaptación a otros contextos o instituciones.

---

## Instrucciones de Ejecución

1. **Clona el repositorio**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_PROYECTO>
   ```

2. **Instala las dependencias del backend**
   ```bash
   cd server
   npm install
   ```

3. **Configura la base de datos**
   - Crea la base de datos MySQL según el diagrama MER.
   - Ajusta los datos de conexión en `server/conexion_db.js` si es necesario.

4. **Carga los datos iniciales**
   ```bash
   node server/seeders/run_seeders.js
   ```

5. **Inicia el servidor**
   ```bash
   node server/index.js
   ```

6. **Abre la interfaz web**
   - Abre `login.html` en tu navegador.
   - Regístrate o inicia sesión para acceder a las funcionalidades.

---

## Tecnologías Utilizadas

- **Backend:** Node.js, Express, MySQL
- **Frontend:** HTML5, CSS3, Bootstrap 5, JavaScript (ES6)
- **Base de datos:** MySQL
- **Otros:** Fetch API, modularización de rutas y lógica

---

## Información del Coder

- **Nombre:** Andrés Severino Isaza
- **Clan:** Lovelace
- **Correo:** andresseverino646@gmail.com
- **Documento:** 1000307252

---

## Diagrama MER

![Diagrama MER](./docs/diagrama_mer.png)
> El diagrama MER se encuentra en la carpeta `docs` como imagen o PDF.

---

## Código Fuente Organizado

```
biblioteca/
│
├── app/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── main.js
│   │   ├── user.js
│   │   ├── libros.js
│   │   ├── login.js
│   │   └── registro.js
│   └── ...
│
├── server/
│   ├── conexion_db.js
│   ├── index.js
│   ├── prestamos.js
│   ├── usuarios.js
│   ├── libros.js
│   └── seeders/
│       ├── load_libros.js
│       ├── load_prestamos.js
│       ├── load_usuarios.js
│       └── run_seeders.js
│
├── index.html
├── login.html
├── registro.html
├── usuarios.html
├── libros.html
├── README.md
└── docs/
    └── diagrama_mer.png
```

---

## Archivo Excel Original

El archivo Excel utilizado para la carga inicial de datos se encuentra en la carpeta `docs` bajo el nombre `datos_originales.xlsx`.

---

> **Nota:**  
> Este README está diseñado para ser fácilmente adaptable a otros proyectos de gestión similares. Solo debes actualizar los nombres de las entidades, rutas y diagramas según