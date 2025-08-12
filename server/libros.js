const API_URL = "http://localhost:3007/libros";
const tablaLibros = document.getElementById("tablaLibros");
const libroForm = document.getElementById("libroForm");

// Cargar lista de libros
async function cargarLibros() {
    const res = await fetch(API_URL);
    const data = await res.json();

    tablaLibros.innerHTML = "";
    data.forEach(libro => {
        tablaLibros.innerHTML += `
            <tr>
                <td>${libro.isbn}</td>
                <td>${libro.titulo}</td>
                <td>${libro.autor}</td>
                <td>${libro.fecha_publicacion ? libro.fecha_publicacion.split("T")[0] : ""}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarLibro('${libro.isbn}')">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarLibro('${libro.isbn}')">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// Guardar / Actualizar libro
libroForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const libro = {
        isbn: document.getElementById("isbn").value,
        titulo: document.getElementById("titulo").value,
        autor: document.getElementById("autor").value,
        fecha_publicacion: document.getElementById("fecha_publicacion").value
    };

    const id_libro = document.getElementById("id_libro").value;

    if (id_libro) {
        // Actualizar
        await fetch(`${API_URL}/${libro.isbn}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(libro)
        });
    } else {
        // Crear
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(libro)
        });
    }

    libroForm.reset();
    document.getElementById("id_libro").value = "";
    cargarLibros();
});

// Editar libro
window.editarLibro = async (isbn) => {
    const res = await fetch(`${API_URL}/${isbn}`);
    const libro = await res.json();

    document.getElementById("id_libro").value = libro.isbn;
    document.getElementById("isbn").value = libro.isbn;
    document.getElementById("titulo").value = libro.titulo;
    document.getElementById("autor").value = libro.autor;
    document.getElementById("fecha_publicacion").value = libro.fecha_publicacion ? libro.fecha_publicacion.split("T")[0] : "";
};

// Eliminar libro
window.eliminarLibro = async (isbn) => {
    if (confirm("¿Seguro que quieres eliminar este libro?")) {
        await fetch(`${API_URL}/${isbn}`, { method: "DELETE" });
        cargarLibros();
    }
};

// Inicializar
cargarLibros();