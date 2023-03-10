import { Router } from "express";
import * as ServController from '../controllers/service.controller.js';

const router = Router();

router.get("/service/:id", ServController.getService);

router.get("/service", ServController.getServices);

router.post("/service", ServController.createService);

router.put("/service/:id", ServController.updateService);

router.delete("/service/:id", ServController.deleteService);

export default router;
// DEFAULT Permite que se pueda nombrar de cualquier manera en la importación
