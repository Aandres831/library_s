const API_URL = "http://localhost:3007/usuarios";
const tablaUsuarios = document.getElementById("tablaUsuarios");
const usuarioForm = document.getElementById("usuarioForm");

// Cargar lista de usuarios
async function cargarUsuarios() {
    const res = await fetch(API_URL);
    const data = await res.json();

    tablaUsuarios.innerHTML = "";
    data.forEach(u => {
        tablaUsuarios.innerHTML += `
            <tr>
                <td>${u.id_usuario}</td>
                <td>${u.nombre_completo}</td>
                <td>${u.identificacion}</td>
                <td>${u.correo}</td>
                <td>${u.telefono}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarUsuario(${u.id_usuario})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${u.id_usuario})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// Guardar / Actualizar usuario
usuarioForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = {
        nombre_completo: document.getElementById("nombre_completo").value,
        identificacion: document.getElementById("identificacion").value,
        correo: document.getElementById("correo").value,
        contrasena: document.getElementById("contrasena").value,
        telefono: document.getElementById("telefono").value
    };

    const id_usuario = document.getElementById("id_usuario").value;

    if (id_usuario) {
        // UPDATE
        await fetch(`${API_URL}/${id_usuario}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });
    } else {
        // CREATE
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });
    }

    usuarioForm.reset();
    cargarUsuarios();
});

// Editar usuario
window.editarUsuario = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    const u = await res.json();

    document.getElementById("id_usuario").value = u.id_usuario;
    document.getElementById("nombre_completo").value = u.nombre_completo;
    document.getElementById("identificacion").value = u.identificacion;
    document.getElementById("correo").value = u.correo;
    document.getElementById("telefono").value = u.telefono;
};

// Eliminar usuario
window.eliminarUsuario = async (id) => {
    if (confirm("¿Seguro que quieres eliminar este usuario?")) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        cargarUsuarios();
    }
};

// Inicializar
cargarUsuarios();