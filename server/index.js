import express from "express";
import prestamosRouter from "./prestamos.js";
import usuariosRouter from "./usuarios.js"
import cors from "cors"
import librosRouter from "./libros.js";




const app = express();
app.use(cors());
app.use(express.json());



app.get("/", async (req, res) => {
  res.send("Server online");
});

app.use("/prestamos", prestamosRouter);
app.use("/usuarios", usuariosRouter);
app.use("/libros", librosRouter);

app.listen(3007, () => {
  console.log("el servidor iniciado y corriendo en http://localhost:3007");
});