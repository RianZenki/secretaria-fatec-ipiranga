import { Router } from "express";

import auth from "../middleware/auth.js";

import { novaResposta } from "../controllers/respostaController.js";

const router = Router();
// Criar nova respsota
router.post("/", auth, novaResposta);


export default router;
