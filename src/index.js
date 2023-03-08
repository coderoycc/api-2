import express from "express";
import * as dotenv from "dotenv";
import { pool } from "./db/db.js";
dotenv.config();

import DigitalRoutes from "./routes/ciudadanos.routes.js";
import FichaRoutes from "./routes/ficha.routes.js";
import FilaRoutes from "./routes/fila.routes.js"; 

const app = express();

app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/**
 * Probamos la conexión a la base de datos
 */
app.get("/ping", async (req, res) => {
  const [result] = await pool.query('SELECT "PONG" as result;');
  res.json(result);
});

app.use(DigitalRoutes);
app.use(FichaRoutes);
app.use(FilaRoutes);

app.listen(process.env.PORT);
console.log("Server on port", process.env.PORT);
