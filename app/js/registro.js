const API_URL = "http://localhost:3007/usuarios";
const registroForm = document.getElementById("registroForm");
const registroError = document.getElementById("registroError");

registroForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    registroError.textContent = "";

    const usuario = {
        nombre_completo: document.getElementById("nombre_completo").value,
        identificacion: document.getElementById("identificacion").value,
        correo: document.getElementById("correo").value,
        contrasena: document.getElementById("contrasena").value,
        telefono: document.getElementById("telefono").value
    };

    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
    });

    if (res.ok) {
        window.location.href = "login.html";
    } else {
        const data = await res.json();
        registroError.textContent = data.mensaje || "Error al registrar usuario";
    }
});