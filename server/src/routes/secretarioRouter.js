import { Router } from "express";

import {
	novoSecretario,
	listarSomenteSecretarios,
	listarTodosSecretarios,
	listarSecretarioPeloId,
	alterarSecretario,
	deletarSecretario,
} from "../controllers/secretarioController.js";
import auth from "../middleware/auth.js";

const router = Router();

// Cadastrarr novo secretario
router.post("/", auth, novoSecretario);

// Listar todos os secretarios que não são secretarios gerais
router.get("/", auth, listarSomenteSecretarios);

// Listar todos os secrretarios
router.get("/todos-secretarios", auth, listarTodosSecretarios);

// Listar secretario pelo Id
router.get("/:secretarioId", auth, listarSecretarioPeloId);

// Alterar dados do secretario
router.put("/:secretarioId", auth, alterarSecretario);

// Deleta secretario pelo Id
router.delete("/:secretarioId", auth, deletarSecretario);

export default router;
