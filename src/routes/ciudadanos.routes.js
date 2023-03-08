import { Router } from "express";

const router = Router();

router.get("/digital/:ci", (req, res) => {
  // Mostrar uno
  const { ci } = req.params;
  console.log(ci);
  res.send("Recibido");
});

router.get("/digital", (req, res) => {
  // mostrar todos
});

router.post("/digital", (req, res) => {
  // recibimos en el body {ci, nombre, apellido, fecha_nac, est_civil}
  const data = req.body;
  console.log(data.ci);
  console.log(data.nombre);

  res.send("Recibido");
});

router.put("/digital/:ci", (req, res) => {
  // Editar
  const { ci } = req.params;
  res.send(`Se actualizó al usuario con CI ${ci}`);
});

router.delete("/digital/:ci", (req, res) => {
  const { ci } = req.params;
  res.send(`Se eliminó al usuario con CI ${ci}`);
});

export default router;
// DEFAULT Permite que se pueda nombrar de cualquier manera en la importación
