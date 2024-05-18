import { prismaClient } from "../database/prismaClient.js";

export async function novaResposta(req, res) {
	const { descricao, solicitacaoId, criadoPor, cargo, usuarioId } = req.body;
	const filesList = req.files

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

		const arquivos = filesList.map(arquivo => ({
			nome: arquivo.filename,
			respostaId: resposta.id,
			url: `http://localhost:3001/arquivos/${arquivo.filename}`,
			tamanho: arquivo.size,
			extensao: arquivo.filename.split('.').pop()
		}))

		await prismaClient.arquivo.createMany({
			data: arquivos
		})

		const updatedResponse = await prismaClient.resposta.findFirstOrThrow({
			where: {
				id: resposta.id
			},
			include: {
				arquivo: {
					select: {
						extensao: true,
						id: true,
						nome: true,
						tamanho: true,
						url: true,
					}
				}
			}
		})

		return res
			.status(200)
			.send({ msg: "Resposta enviada com sucesso", updatedResponse });
	} catch (error) {
		if (error)
		return res
			.status(400)
			.send({ msg: "Erro na criação da resposta", error });
	}
}
