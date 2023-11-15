import { Router } from "express";

import auth from "../middleware/auth.js";

import {
	listarTipoPedidoSecretario,
	novoTipoPedidoSecretario,
	deletarTipoPedidoSecretario,
	novosTipoPedidoSecretario
} from "../controllers/tipoPedidoSecretarioController.js";

const router = Router();

// Criar novo relacionamento entre o secretário e o tipo de pedido
router.post("/", auth, novoTipoPedidoSecretario);

router.post("/multiplos-tipos", auth, novosTipoPedidoSecretario)

// Listar todos os relacionamentos
router.get("/", auth, listarTipoPedidoSecretario);

// Deletar relacionamento
router.delete("/:pedidoSecretarioId", auth, deletarTipoPedidoSecretario);

export default router;
