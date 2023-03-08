import { Router } from "express";
import * as ControllerCiu from '../controllers/ciudadano.controller.js'

const router = Router();

router.get("/digital/:ci", ControllerCiu.getCiudadano);

router.get("/digital", ControllerCiu.getCiudadanos);

router.post("/digital", ControllerCiu.createCiuadano);

router.put("/digital/:ci", ControllerCiu.updateCiudadano);

router.delete("/digital/:ci", ControllerCiu.deleteCiudadano);

export default router;
// DEFAULT Permite que se pueda nombrar de cualquier manera en la importación
