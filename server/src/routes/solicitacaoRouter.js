import { Router } from "express";
import multer from "multer";
import { multerConfig } from "../config/multer.js";

import auth from "../middleware/auth.js";

import {
	novaSolicitacao,
	listarTodasSolicitacoes,
	listarSolicitacaoPeloId,
	alterarSolicitacao,
} from "../controllers/solicitacaoController.js";

const router = Router();

router.post("/arquivo", multer(multerConfig).array("file"), (req, res) => {
	console.log(req.files);
	console.log(req.body);

	const files = req.files.map((file, index) => {
		return file.filename;
	});

	console.log(files);

	// const { tipo, descricao } = req.body
	// const arquivo = req.file

	res.send("Documento salvo");
});

// Criar nova solicitação
router.post("/", auth, novaSolicitacao);

// Listar todas solicitações
router.get("/", auth, listarTodasSolicitacoes);

// Listar solicitação pelo id
router.get("/:solicitacaoId", auth, listarSolicitacaoPeloId);

// Listar solicitação por departamento

// Finalizar solicitação
router.put("/:solicitacaoId", auth, alterarSolicitacao);

export default router;
