import { Router } from "express";
import * as ControllerFila from '../controllers/fila.controller.js'

const router = Router();

router.get("/fila/:id", ControllerFila.getFila);

router.get("/fila", ControllerFila.getFilas);

router.post("/fila", ControllerFila.createFila);

// No se puede editar una fila

router.delete("/fila/:id", ControllerFila.deleteFila);

export default router;
