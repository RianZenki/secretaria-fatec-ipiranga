import { Router } from "express";
import multer from "multer";
import { multerConfig } from "../config/multer.js";

import auth from "../middleware/auth.js";

import {
	novaSolicitacao,
	listarTodasSolicitacoes,
	listarSolicitacaoPeloId,
	alterarSolicitacao,
	deletarSolicitacao,
	listarRespostasPeloId,
} from "../controllers/solicitacaoController.js";

const router = Router();

// Criar nova solicitação
router.post("/", auth, multer(multerConfig).array("file"), novaSolicitacao);

// Listar todas solicitações
router.get("/", auth, listarTodasSolicitacoes);

// Listar solicitação pelo id
router.get("/:solicitacaoId", auth, listarSolicitacaoPeloId);

// Listar respostas de uma solicitação
router.get("/:solicitacaoId/resposta", auth, listarRespostasPeloId);

// Finalizar solicitação
router.put("/:solicitacaoId", auth, alterarSolicitacao);

// Deletar solicitação pelo Id
router.delete("/:solicitacaoId", auth, deletarSolicitacao)

export default router;