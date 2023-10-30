import { prismaClient } from "../database/prismaClient.js";

export async function novoTipoPedido(req, res) {
	const { tipo } = req.body;

	try {
		const pedido = await prismaClient.tipo_pedido.create({
			data: {
				tipo,
			},
		});

		return res
			.status(200)
			.send({ msg: "Tipo de pedido criado com sucesso", pedido });
	} catch (error) {
		console.log(error)
		if (error)
			return res
				.status(400)
				.send({ msg: "Erro ao criar o tipo de pedido", error });
	}
}

export async function cadastrarTodosTiposPedidos(req, res) {
	try {
		const pedidos = await prismaClient.tipo_pedido.createMany({
			data: [
				{ tipo: "Comprovante de matricula" },
				{ tipo: "Carteirinha Fatec" },
				{ tipo: "Histórico Escolar" },
				{ tipo: "Conteúdos programáticos" },
				{ tipo: "Trancamento" },
				{ tipo: "Cancelamento" },
				{ tipo: "Desitência de disciplinas" },
				{ tipo: "Apressamento de disciplina" },
				{ tipo: "Modelos de Contratos" },
				{ tipo: "Assinaturas" },
				{ tipo: "Informações" },
				{ tipo: "Acesso e senhas" },
			],
			skipDuplicates: true,
		});

		return res.status(200).send(pedidos);
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.send({ msg: "Erro ao cadastrar os tipos de pedidos", error });
	}
}

export async function listarTiposPedidos(req, res) {
	try {
		const pedidos = await prismaClient.tipo_pedido.findMany();

		res.status(200).send(pedidos);
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.send({ msg: "Falha ao listar tipos de pedidos", error });
	}
}

export async function deletarTipoPedido(req, res) {
	const { pedidoId } = req.params;

	try {
		const pedido = await prismaClient.tipo_pedido.findFirst({
			where: {
				id: pedidoId,
			},
		});

		if (!pedido)
			return res
				.status(400)
				.send({ msg: "Falha ao deletar tipo de pedido" });

		const pedidoDeletado = await prismaClient.tipo_pedido.delete({
			where: {
				id: pedidoId,
			},
		});

		res.status(200).send({
			msg: "Tipo de pedido deletado com sucesso",
			pedidoDeletado,
		});
	} catch (error) {
		return res.status(400).send({ msg: "Falha ao deletar tipo de pedido" });
	}
}
