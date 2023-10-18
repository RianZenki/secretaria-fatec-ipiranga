import db from "../services/connection.js";

export function consultarDados(req, res) {
	const { id } = req.body;

	db.query(
		`SELECT nome, email, curso, turno, ra FROM alunos WHERE id = '${id}'`,
		(err, result) => {
			if (err)
				return res
					.status(400)
					.send({ error: "Erro na consulta dos dados" });

			if (result.length > 0) {
				return res.status(200).json(result[0]);
			} else {
				return res
					.status(400)
					.send({ error: "Erro na consulta dos dados" });
			}
		}
	);
}

export function alterarAluno(req, res) {
	const { idAluno, nome, email, curso, turno, ra } = req.body;

	db.query(
		`SELECT * FROM aluno WHERE idAluno =  '${idAluno}'`,
		(err, result) => {
			if (err)
				return res
					.status(400)
					.send({ error: "Erro na alteração dos dados" });

			if (result.length > 0) {
				db.query(
					`
                UPDATE aluno
                SET nome = '${nome}', email = '${email}', curso = '${curso}', turno = '${turno}', ra = '${ra}'
                WHERE idAluno = '${idAluno}'
            `,
					(err, result) => {
						if (err)
							return res
								.status(400)
								.send({ error: "Erro na alteração dos dados" });

						return res
							.status(200)
							.json({ msg: "Dados alterado com sucesso" });
						// alterar os dados do cabeçalho
					}
				);
			} else {
				return res
					.status(400)
					.send({ error: "Erro na alteração dos dados" });
			}
		}
	);
}

export function deletarAluno(req, res) {
	const id = req.usuario.idAluno;

	db.query(`SELECT * FROM aluno WHERE idAluno =  '${id}'`, (err, result) => {
		if (err)
			return res.status(400).send({ error: "Erro ao deletar o conta" });

		if (result.length > 0) {
			db.query(
				`
                DELETE FROM aluno WHERE idAluno = '${id}'
            `,
				(err, result) => {
					if (err)
						return res
							.status(400)
							.send({ error: "Erro ao deletar o conta" });

					return res
						.status(200)
						.json({ msg: "Conta deletada com sucesso" });
				}
			);
		} else {
			return res.status(400).send({ error: "Conta não existente" });
		}
	});
}
