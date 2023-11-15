import { prismaClient } from "../database/prismaClient.js";

export async function novaResposta(req, res) {
	const { descricao, solicitacaoId, criadoPor, cargo, usuarioId } = req.body;
	const cargoValido =
		cargo !== "ALUNO" ||
		cargo !== "SECRETARIO" ||
		cargo !== "SECRETARIO_GERAL";

	try {
		if (!cargoValido)
			return res.status(400).send({ msg: "Erro na criação da resposta" });

		const resposta = await prismaClient.resposta.create({
			data: {
				descricao,
				cargo,
				criado_por: criadoPor,
				solicitacaoId,
				alunoId: cargo === "ALUNO" ? usuarioId : null,
				secretarioId: cargo !== "ALUNO" ? usuarioId : null,
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
