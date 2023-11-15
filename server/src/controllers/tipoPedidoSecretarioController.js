import { prismaClient } from "../database/prismaClient.js";

export async function novoTipoPedidoSecretario(req, res) {
	const { secretarioId, tipo_pedidoId } = req.body;

	try {
		const relacionamentoExiste =
			await prismaClient.tipo_pedido_secretario.findFirst({
				where: {
					secretarioId,
					tipo_pedidoId,
				},
			});

		if (relacionamentoExiste)
			return res.status(400).send({ msg: "Relacionamento já cadastrado" });

		const relacionamento = await prismaClient.tipo_pedido_secretario.create({
			data: {
				secretarioId,
				tipo_pedidoId,
			},
		});

		return res.status(200).send(relacionamento);
	} catch (error) {
		if (error)
			return res.status(400).send({
				msg: "Erro ao vincular o tipo de solicitação ao secretário",
				error,
			});
	}
}

export async function novosTipoPedidoSecretario(req, res) {
	const { secretarioId, tipo_pedido } = req.body;

	try {
		const listaTipoPedidos = tipo_pedido.map((tipo) => {
			return {
				secretarioId,
				tipo_pedidoId: tipo,
			};
		});

		const possuiRelacionamento =
			await prismaClient.tipo_pedido_secretario.findFirst({
				where: {
					secretarioId,
				},
			});

		if (possuiRelacionamento) {
			await prismaClient.tipo_pedido_secretario.deleteMany({
				where: {
					secretarioId,
				},
			});
		}

		const relacionamento =
			await prismaClient.tipo_pedido_secretario.createMany({
				data: listaTipoPedidos,
			});

		return res.status(200).send(relacionamento);
	} catch (error) {
		console.log(error);
		if (error)
			return res.status(400).send({
				msg: "Erro criar relacionamento entre o tipo de solicitação ao secretário",
				error,
			});
	}
}

export async function listarTipoPedidoSecretario(req, res) {
	try {
		const relacionamento =
			await prismaClient.tipo_pedido_secretario.findMany();

		return res.status(200).send(relacionamento);
	} catch (error) {
		if (error)
			return res.status(400).send({
				msg: "Erro ao listar os tipos de solicitações dos secretários",
				error,
			});
	}
}

export async function deletarTipoPedidoSecretario(req, res) {
	const { pedidoSecretarioId } = req.params;
	try {
		await prismaClient.tipo_pedido_secretario.findFirstOrThrow({
			where: {
				id: pedidoSecretarioId,
			},
		});

		const relacionamento = await prismaClient.tipo_pedido_secretario.delete({
			where: {
				id: pedidoSecretarioId,
			},
		});

		if (!relacionamento)
			return res.status(400).send({
				msg: "Erro ao deletar o tipo de solicitação do secretário",
			});

		return res.status(200).send({
			msg: "Tipo de solicitação do secretario deletado com sucesso!",
			relacionamento,
		});
	} catch (error) {
		if (error)
			return res.status(400).send({
				msg: "Erro ao deletar o tipo de solicitação do secretário",
				error,
			});
	}
}
