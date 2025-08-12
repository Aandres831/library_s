const API_URL = "http://localhost:3007/usuarios/login";
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loginError.textContent = "";

    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;

    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena })
    });

    if (res.ok) {
        // Puedes guardar el usuario en localStorage/sessionStorage si lo deseas
        window.location.href = "index.html";
    } else {
        const data = await res.json();
        loginError.textContent = data.mensaje || "Wrong Credentials";
    }
});