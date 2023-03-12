import express from "express";
import * as dotenv from "dotenv";
import { pool } from "./db/db.js";
dotenv.config();

import UserRoutes from './routes/user.routes.js';
import ServiceRoutes from './routes/service.routes.js';
import QueueRoutes from "./routes/queue.routes.js"; 
import TokenRoutes from "./routes/token.routes.js";

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

app.use('/api', UserRoutes);
app.use('/api', ServiceRoutes);
app.use('/api',QueueRoutes);
app.use('/api', TokenRoutes);

app.listen(process.env.PORT);
console.log("Server on port", process.env.PORT);
