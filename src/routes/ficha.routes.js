import { Router } from "express";
import * as ControllerFicha from '../controllers/ficha.controller.js';

const router = Router();

router.get("/ficha/:ci", ControllerFicha.getFicha);

router.get("/ficha", ControllerFicha.getFichas);

router.post("/ficha", ControllerFicha.createFicha);

router.put("/ficha", ControllerFicha.updateFicha);

router.delete("/ficha/:id", ControllerFicha.deleteFicha);

export default router;
