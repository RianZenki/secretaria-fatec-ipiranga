import { prismaClient } from "../database/prismaClient.js";

export async function novaResposta(req, res) {
	const { descricao, solicitacaoId, criadoPor, origem, usuarioId } = req.body;

	try {
		if (origem !== "aluno" || origem !== "secretario")
			return res.status(400).send({ msg: "Erro na criação da resposta" });

		const resposta = await prismaClient.resposta.create({
			data: {
				descricao,
				origem,
				criado_por: criadoPor,
				solicitacaoId,
				alunoId: origem === "aluno" ? usuarioId : null,
				secretarioId: origem === "secretario" ? usuarioId : null,
			},
		});
		if (!resposta)
			return res.status(400).send({ msg: "Erro na criação da resposta" });

		return res
			.status(200)
			.send({ msg: "Resposta criada com sucesso", resposta });
	} catch (error) {
		if (error)
			return res
				.status(400)
				.send({ msg: "Erro na criação da resposta", error });
	}
}
