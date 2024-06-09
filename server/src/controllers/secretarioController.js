import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { prismaClient } from "../database/prismaClient.js";
import { Prisma } from "@prisma/client";
import jsonwebtoken from "jsonwebtoken";

const { hashSync, compareSync } = bcrypt;
const { sign } = jsonwebtoken;

async function obterSecretarios() {
	return await prismaClient.secretario.findMany({
		where: {
			ativo: true,
		},
		select: {
			id: true,
			numeroMatricula: true,
			nome: true,
			email: true,
			cargo: true,
		},
		orderBy: {
			nome: "asc"
		}
	});
} 

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

		const secretarios = await obterSecretarios()

		return res
			.status(200)
			.send({ msg: "Secretario cadastrado com sucesso!", secretarios });
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				if (error.meta.target === "secretarios_email_key") {
					return res.status(400).send({ msg: "Email já cadastrado!" });
				}

				if (error.meta.target === "secretarios_numeroMatricula_key") {
					return res.status(400).send({ msg: "Número de matricula já cadastrado!" });
				}

				return res
					.status(400)
					.send({ msg: "Erro ao cadastrar o secretario", error });
			} else {
				return res
					.status(400)
					.send({ msg: "Erro ao cadastrar o secretario", error });
			}
		}
	}
}

export async function listarTodosSecretarios(req, res) {
	const { secretarioId } = req.params

	try {
		const secretarios = await prismaClient.secretario.findMany({
			where: {
				ativo: true,
				id: { not: secretarioId }
			},
			select: {
				id: true,
				numeroMatricula: true,
				nome: true,
				email: true,
				cargo: true,
			},
			orderBy: {
				nome: "asc"
			}
		});

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
		const secretarios = await obterSecretarios()

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
				numeroMatricula: secretarioId,
			},
			select: {
				nome: true,
				cargo: true,
				email: true,
				numeroMatricula: true,
				tipo_pedido_secretario: {
					select: {
						tipo_pedido: {
							select: {
								tipo: true
							}
						}
					}
				}
			}
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
	const { numeroMatricula, nome, email, cargo, tipo_pedido } = req.body;

	try {
		const dadosSecretario = await prismaClient.secretario.findFirstOrThrow({
			where: {
				numeroMatricula: secretarioId,
			},
		});

		await prismaClient.secretario.update({
			where: {
				numeroMatricula: secretarioId,
			},
			data: {
				numeroMatricula,
				nome,
				email,
				cargo,
			},
		});

		const listaTipoPedidos = tipo_pedido.map((tipo) => {
			return {
				secretarioId: dadosSecretario.id,
				tipo_pedidoId: tipo,
			};
		});

		const possuiRelacionamento =
			await prismaClient.tipo_pedido_secretario.findFirst({
				where: {
					secretarioId: dadosSecretario.id,
				},
			});

		if (possuiRelacionamento) {
			await prismaClient.tipo_pedido_secretario.deleteMany({
				where: {
					secretarioId: dadosSecretario.id,
				},
			});
		}

		await prismaClient.tipo_pedido_secretario.createMany({
			data: listaTipoPedidos,
		});

		const secretarios = await obterSecretarios()

		return res
			.status(200)
			.send({ msg: "Secretario alterado com sucesso!", secretarios });
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
				numeroMatricula: secretarioId,
			},
		});

		const secretarioDeletado = await prismaClient.secretario.update({
			where: {
				numeroMatricula: secretarioId,
			},
			data: {
				ativo: false
			}
		});

		if (!secretarioDeletado)
			return res
				.status(400)
				.send({ msg: "Erro ao deletar dados do secretario" });

		const secretarios = await obterSecretarios()

		return res
			.status(200)
			.send({ msg: "Secretario deletado com sucesso!", secretarios });
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
			include: {
				Aluno: {
					select: {
						nome: true
					}
				}
			},
			orderBy: {
				criado_em: 'desc'
			}
		});

		return res.status(200).send(solicitacoes);
	} catch (error) {
		console.log(error)
		if (error)
			return res.status(400).send({ msg: "Secretario não encontrado" });
	}
}

export async function login(req, res) {
	const { email, senha } = req.body;

	try {
		const secretario = await prismaClient.secretario.findFirst({
			where: {
				email,
			},
		});

		if (!secretario)
			return res.status(400).send({ msg: "Email ou senha inválidos" });

		const senhasIguais = compareSync(senha, secretario.senha);

		// Verifica se a senha informada está incorreta
		if (!senhasIguais)
			return res.status(400).json({ error: "Email ou senha inválidos" });

		// Verifica se a senha informada está correta
		if (senhasIguais) {
			const dadosSecretario = {
				id: secretario.id,
				email: email,
				nome: secretario.nome,
				cargo: secretario.cargo
			};

			return res.status(200).send({
				secretario: dadosSecretario,
				token: sign(dadosSecretario, process.env.TOKEN_SECRET),
			});
		} else return res.status(400).send({ error: "Email ou senha inválidos" });
	} catch (error) {
		console.log(error)
		if (error) return res.status(400).send({ msg: "Falha no login" });
	}
}
