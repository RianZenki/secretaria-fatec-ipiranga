import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { prismaClient } from "../database/prismaClient.js";

const { hashSync, compareSync } = bcrypt;

export async function novoSecretario(req, res) {
	const { numeroMatricula, nome, email, cargo, tipo_pedido } = req.body;
	const senha = hashSync(req.body.senha);
	const token = randomBytes(12).toString("hex");

	try {
		const secretario = await prismaClient.secretario.create({
			data: {
				numeroMatricula,
				nome,
				email,
				token,
				senha,
				cargo,
			},
		});

		if (!secretario)
			return res.status(400).send({ msg: "Erro ao cadastrar o secretario" });

		if (tipo_pedido) {
			const tipoPedidoLista = tipo_pedido.map((tipo) => {
				return {
					secretarioId: secretario.id,
					tipo_pedidoId: tipo,
				};
			});

			await prismaClient.tipo_pedido_secretario.createMany({
				data: tipoPedidoLista,
			});
		}

		return res
			.status(200)
			.send({ msg: "Secretario cadastrado com sucesso!", secretario });
	} catch (error) {
		console.log(error)
		if (error)
			return res
				.status(400)
				.send({ msg: "Erro ao cadastrar o secretario", error });
	}
}

export async function listarTodosSecretarios(req, res) {
	try {
		const secretarios = await prismaClient.secretario.findMany({
			select: {
				id: true,
				numeroMatricula: true,
				nome: true,
				email: true,
				cargo: true,
				tipo_pedido_secretario: {
					select: {
						tipo_pedido: {
							select: {
								id: true,
							},
						},
					},
				},
			},
		});
		// console.log(secretarios[0].tipo_pedido_secretario);

		return res.status(200).send(secretarios);
	} catch (error) {
		if (error)
			return res
				.status(400)
				.send({ msg: "Erro ao listar os secretarios", error });
	}
}

export async function listarSomenteSecretarios(req, res) {
	try {
		const secretarios = await prismaClient.secretario.findMany({
			where: {
				cargo: {
					equals: "SECRETARIO",
				},
			},
			select: {
				id: true,
				numeroMatricula: true,
				nome: true,
				email: true,
				cargo: false,
			},
		});

		return res.status(200).send(secretarios);
	} catch (error) {
		if (error)
			return res
				.status(400)
				.send({ msg: "Erro ao listar os secretarios", error });
	}
}

export async function listarSecretarioPeloId(req, res) {
	const { secretarioId } = req.params;

	try {
		const secretario = await prismaClient.secretario.findFirstOrThrow({
			where: {
				id: secretarioId,
			},
		});

		return res.status(200).send(secretario);
	} catch (error) {
		if (error)
			return res
				.status(400)
				.send({ msg: "Secretário não encontrado", error });
	}
}

export async function alterarSecretario(req, res) {
	const { secretarioId } = req.params;
	const { numeroMatricula, nome, email, cargo } = req.body;

	try {
		await prismaClient.secretario.findFirstOrThrow({
			where: {
				id: secretarioId,
			},
		});

		const secretarioAlterado = await prismaClient.secretario.update({
			where: {
				id: secretarioId,
			},
			data: {
				numeroMatricula,
				nome,
				email,
				cargo,
			},
		});

		return res
			.status(200)
			.send({ msg: "Secretario alterado com sucesso!", secretarioAlterado });
	} catch (error) {
		if (error)
			return res
				.status(400)
				.send({ msg: "Erro ao alterar dados do secretario", error });
	}
}

export async function deletarSecretario(req, res) {
	const { secretarioId } = req.params;

	try {
		await prismaClient.secretario.findFirstOrThrow({
			where: {
				id: secretarioId,
			},
		});

		const secretarioDeletado = await prismaClient.secretario.delete({
			where: {
				id: secretarioId,
			},
		});

		if (!secretarioDeletado)
			return res
				.status(400)
				.send({ msg: "Erro ao deletar dados do secretario" });

		return res
			.status(200)
			.send({ msg: "Secretario deletado com sucesso!", secretarioDeletado });
	} catch (error) {
		if (error)
			return res
				.status(400)
				.send({ msg: "Erro ao deletar dados do secretario", error });
	}
}

export async function listarSolicitacaoPeloTipo(req, res) {
	const { secretarioId } = req.params;

	try {
		const tipoPedidoSecretario =
			await prismaClient.secretario.findFirstOrThrow({
				where: {
					id: secretarioId,
				},
				select: {
					tipo_pedido_secretario: {
						select: {
							tipo_pedidoId: true,
						},
					},
				},
			});

		// Array de Ids de tipo de pedido
		const listaTipoPedidoId = tipoPedidoSecretario.tipo_pedido_secretario.map(
			(tipoPedido) => tipoPedido.tipo_pedidoId
		);

		const solicitacoes = await prismaClient.solicitacao.findMany({
			where: {
				tipo_pedidoId: { in: listaTipoPedidoId },
			},
		});

		return res.status(200).send(solicitacoes);
	} catch (error) {
		if (error)
			return res.status(400).send({ msg: "Secretario não encontrado" });
	}
}
