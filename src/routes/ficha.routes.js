import { Router } from "express";

const router = Router();

router.get("/ficha/:ci", (req, res) => {
  // Mostramos las fichas de un ciudadano
});

router.post("/ficha", (req, res) => {
  // Mostramos las fichas de una sola fecha (recibimos de FORM)
});

router.post("/ficha/:ci", (req, res) => {
  // Insertamos una nueva ficha (recibimos {ci, servicio, fecha})
  // Buscamos el servicio de la fecha si es que existe (si no lo creamos)
});

router.put("/ficha", (req, res) => {
  // Editamos la ficha recibimos (en el body {estado})

});

router.delete("/ficha/:id", (req, res) => {
  // Eliminamos una ficha (recibimos id_ficha)

});

export default router;
