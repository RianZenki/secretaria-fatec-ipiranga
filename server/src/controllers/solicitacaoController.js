import { prismaClient } from "../database/prismaClient.js";

export async function novaSolicitacao(req, res) {
	const { descricao, tipo, alunoId, alunoNome } = req.body;
	const filesList = req.files

	try {
		const solicitacao = await prismaClient.solicitacao.create({
			data: {
				descricao,
				tipo_pedidoId: +tipo,
				alunoId,
				alunoNome
			},
		});

		if (!solicitacao) return res.status(400).send({ msg: "Erro na criação da solicitação" });

		const arquivos = filesList.map(arquivo => ({
			nome: arquivo.filename,
			solicitacaoId: solicitacao.id,
			url: `http://localhost:3001/arquivos/${arquivo.filename}`,
			tamanho: arquivo.size,
			extensao: arquivo.filename.split('.').pop()
		}))

		await prismaClient.arquivo.createMany({
			data: arquivos
		})

		return res
			.status(200)
			.send({ msg: "Solicitação criada com sucesso!", solicitacao });
	} catch (error) {
		console.log(error)
		if (error)
			return res
				.status(400)
				.send({ msg: "Erro na criação da solicitação", error });
	}
}

export async function listarTodasSolicitacoes(req, res) {
	try {
		const solicitacao = await prismaClient.solicitacao.findMany();

		return res.status(200).send(solicitacao);
	} catch (error) {
		if (error)
			return res
				.status(400)
				.send({ msg: "Erro ao obter a solicitação", error });
	}
}

export async function listarSolicitacaoPeloId(req, res) {
	const { solicitacaoId } = req.params;

	try {
		const solicitacao = await prismaClient.solicitacao.findFirstOrThrow({
			where: {
				id: solicitacaoId,
			},
			include: {
				Aluno: {
					select: {
						nome: true,
						ra: true,
						curso: true
					}
				},
				tipo_pedido: {
					select: {
						tipo: true
					}
				},
				Resposta: {
					orderBy: {
						criado_em: 'asc'
					},
					include: {
						arquivo: true
					}
				},
				Arquivo: {
					select: {
						id: true,
						nome: true,
						extensao: true,
						tamanho: true,
						url: true
					}
				}
			}
		});

		return res.status(200).send(solicitacao);
	} catch (error) {
		if (error)
			return res
				.status(400)
				.send({ msg: "Erro ao obter a solicitação", error });
	}
}

export async function listarRespostasPeloId(req, res) {
	const { solicitacaoId } = req.params;

	try {
		await prismaClient.solicitacao.findFirstOrThrow({
			where: {
				id: solicitacaoId,
			},
		});

		const respostas = await prismaClient.resposta.findMany({
			where: {
				solicitacaoId,
			},
			orderBy: {
				criado_em: 'asc'
			}
		});

		return res.status(200).send({ respostas });
	} catch (error) {
		if (error)
			return res
				.status(400)
				.send({ msg: "Erro ao listar respostas", error });
	}
}

export async function alterarSolicitacao(req, res) {
	const { solicitacaoId } = req.params;
	const { status, secretario } = req.body;

	try {
		await prismaClient.solicitacao.findFirstOrThrow({
			where: {
				id: solicitacaoId,
			},
		});

		const solicitacao = await prismaClient.solicitacao.update({
			where: {
				id: solicitacaoId,
			},
			include: {
				Aluno: {
					select: {
						nome: true,
						ra: true,
						curso: true
					}
				},
				tipo_pedido: {
					select: {
						tipo: true
					}
				},
				Resposta: {
					orderBy: {
						criado_em: 'asc'
					}
				}
			},
			data: {
				status,
				atualizado_em: new Date(),
				encerrado_em: status === "finalizado" ? new Date() : null,
				encerrado_por: status === "finalizado" ? secretario : null
			},
		});

		return res.status(200).send({
			msg: "Solicitação alterada com sucesso",
			solicitacao,
		});
	} catch (error) {
		if (error)
			return res.status(400).send({
				msg: "Erro ao tentar alterar os dados da solicitação",
				error,
			});
	}
}

export async function deletarSolicitacao(req, res) {
	const { solicitacaoId } = req.params;

	try {
		await prismaClient.solicitacao.findUniqueOrThrow({
			where: {
				id: solicitacaoId,
			},
		});

		const solicitacao = prismaClient.solicitacao.delete({
			where: {
				id: solicitacaoId,
			},
		});

		return res
			.status(200)
			.send({ msg: "Solicitação criada com sucesso", solicitacao });
	} catch (error) {
		if (error)
			return res
				.status(400)
				.send({ msg: "Erro ao tentar deletar a solicitação", error });
	}
}
