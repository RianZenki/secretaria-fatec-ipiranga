import { Router } from "express";

import auth from "../middleware/auth.js";

import {
	novoTipoPedido,
	listarTiposPedidos,
	cadastrarTodosTiposPedidos,
	deletarTipoPedido,
} from "../controllers/tipoPedidoController.js";

const router = Router();

// Cadastrar novo tipo de pedido
router.post("/", auth, novoTipoPedido);

// Cadastrar todos os tipos de pedido
router.post("/todos-tipos", auth, cadastrarTodosTiposPedidos);

// Listar todos os tipos de pedido
router.get("/", auth, listarTiposPedidos);

// Deletar pedido pelo id
router.delete("/:pedidoId", auth, deletarTipoPedido);

export default router;
