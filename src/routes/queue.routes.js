import { Router } from "express";
import * as QueueController from '../controllers/queue.controller.js'

const router = Router();

router.get("/queue/:id", QueueController.getQueue);
 
router.get("/queue", QueueController.getQueues);

router.post("/queue", QueueController.createQueue);

// No se puede editar la cola

router.delete("/queue/:id", QueueController.deleteQueue);

export default router;
