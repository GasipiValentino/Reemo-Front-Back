import express from 'express';
import apiRoute from './api/routes/views.routes.js'
import marcasRoute from "./api/routes/marcas.routes.js";
import apiUsuario from './api/routes/usuarios.routes.js'
import cors from "cors"

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PATCH, DELETE"
}
// Middleware para parsear el body en JSON y urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use( cors(corsOptions))

app.use('/api', apiRoute)
app.use('/api', marcasRoute)
app.use("/api", apiUsuario)

app.get('/', (req, res) => {
  const name = process.env.NAME || '<a href="/vehiculos">Vehículos</a>';
  res.send(`${name}!`);
});

app.listen(3333, () => console.log("Server on"));