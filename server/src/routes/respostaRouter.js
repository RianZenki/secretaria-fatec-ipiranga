import { Router } from "express";

import auth from "../middleware/auth.js";

import { novaResposta, listarRespostas } from "../controllers/respostaController.js";

const router = Router();
// Criar nova respsota
router.post("/", auth, novaResposta);

// Listar respostas de uma solicitação
router.get("/:idSolicitacao", auth, listarRespostas);

export default router;
