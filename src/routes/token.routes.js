import { Router } from "express";
import * as TokenController from '../controllers/token.controller.js';

const router = Router();

router.get("/token/:ci", TokenController.getTokenci);

router.get("/token", TokenController.getTokens);

router.post("/token", TokenController.createToken);

router.put("/token", TokenController.updateTokenStatus);

router.delete("/token", TokenController.deleteToken);

export default router;
