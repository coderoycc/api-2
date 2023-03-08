import { Router } from "express";

const router = Router();

router.get("/fila/:id", (req, res) => {
  // Mostramos una sola fila
  const { id } = req.params;
  res.send(`Recibido ${id}`);
});

router.get("/fila", (req, res) => {
  //Mostramos todas las filas
});

router.post("/fila", (req, res) => {
  // Insertamos una nueva fila { fecha, objeto }
  const data = req.body;
  res.json({
    msg: "Recibido",
    ...data,
  });
});

// No se puede editar una fila

router.delete("/fila/:id", (req, res) => {
  // Eliminamos una fila
  const { id } = req.params;
  res.send(`Recibido ${id}`);
});

export default router;
