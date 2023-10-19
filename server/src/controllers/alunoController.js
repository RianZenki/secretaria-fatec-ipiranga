import { prismaClient } from "../database/prismaClient.js";

// Exclude keys from user
function exclude(user, keys) {
	return Object.fromEntries(
		Object.entries(user).filter(([key]) => !keys.includes(key))
	);
}

export async function consultarDados(req, res) {
	const { id } = req.body;

	try {
		const aluno = await prismaClient.aluno.findFirst({
			where: {
				id: id,
			},
		});

		if (!aluno) return res.status(400).send({ msg: "Aluno não encontrado" });

		const alunoFiltrado = exclude(aluno, ["senha", "token", "autenticado"]);

		return res.status(200).send(alunoFiltrado);
	} catch (error) {
		return res.status(400).send({ error: "Erro na consulta dos dados" });
	}
}

export async function alterarAluno(req, res) {
	const { nome, curso, turno, ra } = req.body;
	const { id } = req.params;

	try {
		const aluno = await prismaClient.aluno.findFirst({
			where: {
				id,
			},
		});

		if (!aluno) return res.status(400).send({ msg: "Aluno não encontrado" });

		const novosDados = await prismaClient.aluno.update({
			where: {
				id,
			},
			data: {
				nome,
				curso,
				turno,
				ra,
			},
		});

		return res.status(200).send(novosDados);
	} catch (error) {
		return res.status(400).send({ error: "Erro na alteração dos dados" });
	}
}

export async function deletarAluno(req, res) {
	const { id } = req.params;

	try {
		const aluno = await prismaClient.aluno.findFirst({
			where: {
				id,
			},
		});

		if (!aluno) res.status(400).send({ msg: "Aluno não encontrado" });

		const alunoDeletado = await prismaClient.aluno.delete({
			where: {
				id,
			},
		});

		return res
			.status(200)
			.send({ msg: "Aluno deletado com sucesso!", alunoDeletado });
	} catch (error) {
		if (error)
			res.status(400).send({ msg: "Erro ao deletar a conta", error });
	}
}

export async function listarSolicitacaoAluno(req, res) {
	const { alunoId } = req.params

	try {
		const solicitacoes = await prismaClient.solicitacao.findMany({
			where: {
				alunoId
			}
		})

		return res.status(200).send(solicitacoes)
	}
	catch (error) {
		if (error)
			return res.status(400).send({ msg: "Erro ao listar a solicitação", error })
	}
}