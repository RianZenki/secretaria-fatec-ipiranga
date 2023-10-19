import { prismaClient } from "../database/prismaClient.js";

export async function novaSolicitacao(req, res) {
	const { descricao, tipo, alunoId } = req.body;

	try {
		const solicitacao = await prismaClient.solicitacao.create({
			data: {
				descricao,
				tipo,
				alunoId,
			},
		});

		return res
			.status(200)
			.send({ msg: "Solicitação criada com sucesso!", solicitacao });
	} catch (error) {
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
		});

		return res.status(200).send(solicitacao);
	} catch (error) {
		if (error)
			return res
				.status(400)
				.send({ msg: "Erro ao obter a solicitação", error });
	}
}

export async function alterarSolicitacao(req, res) {
	const { solicitacaoId } = req.params;
	const { status } = req.body;

	// const dataAtual = new Date().toISOString().slice(0, 10);

	try {
		await prismaClient.solicitacao.findFirstOrThrow({
			where: {
				id: solicitacaoId,
			},
		});

		const solicitacaoAlterada = await prismaClient.solicitacao.update({
			where: {
				id: solicitacaoId,
			},
			data: {
				status,
				atualizado_em: new Date(),
				encerrado_em: status === "finalizado" ? new Date() : null,
			},
		});

		return res.status(200).send({
			msg: "Solicitação alterada com sucesso",
			solicitacaoAlterada,
		});
	} catch (error) {
		if (error)
			return res.status(400).send({
				msg: "Erro ao tentar alterar os dados da solicitação",
				error,
			});
	}
}
