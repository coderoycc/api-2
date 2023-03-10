import { Router } from "express";
import * as UserController from '../controllers/user.controller.js'

const router = Router();

router.get("/user/:ci", UserController.getUser);

router.get("/user", UserController.getUsers);

router.post("/user", UserController.createUser);

router.put("/user/:ci", UserController.updateUser);

router.delete("/user/:ci", UserController.deleteUser);

export default router;
// DEFAULT Permite que se pueda nombrar de cualquier manera en la importación
