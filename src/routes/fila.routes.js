import { Router } from "express";

const router = Router();

router.get("/fila/:id", (req, res) => {
  // Mostramos una sola fila
});

router.get("/fila", (req, res) => {
  //Mostramos todas las filas
});

router.post("/fila", (req, res) => {
  // Insertamos una nueva fila { fecha, objeto }
});

// No se puede editar una fila

router.delete("/fila/:ci", (req, res) => {
  // Eliminamos una fila
});

export default router;
