import db from "../services/connection.js";

export function novaSolicitacao(req, res) {
	const { descricao, tipo } = req.body;
	const idAluno = req.usuario.idAluno;

	const dataAtual = new Date().toISOString().slice(0, 10);

	db.query(
		`INSERT INTO solicitacao (idAluno, descricao, tipo, dataCriacao) VALUES (${idAluno}, '${descricao}', '${tipo}', '${dataAtual}')`,
		(err, result) => {
			if (err) {
				return res
					.status(400)
					.send({ error: "Erro na criação da solicitação" });
			}
			return res
				.status(200)
				.send({ msg: "Solicitação cadastrada com sucesso" });
		}
	);
}

export function listarTodasSolicitacoes(req, res) {
	db.query(
		`
    SELECT s.idSolicitacao, s.tipo, s.descricao, a.nome, a.idAluno
    FROM solicitacao s
    JOIN aluno a
    ON s.idAluno = a.idAluno
    `,
		(err, result) => {
			if (err)
				return res
					.status(400)
					.send({ error: "Erro na listagem das solicitações" });

			return res.status(200).send({ result });
		}
	);
}

export function listarSolicitacaoPeloId(req, res) {
	const idSolicitacao = req.params.idSolicitacao;

	db.query(
		`
    SELECT s.idSolicitacao, s.tipo, s.descricao, a.nome, a.idAluno
    FROM solicitacao s
    JOIN aluno a
    ON s.idAluno = a.idAluno
    WHERE s.idSolicitacao = '${idSolicitacao}'
    `,
		(err, result) => {
			if (err)
				return res
					.status(400)
					.send({ error: "Erro na listagem da solicitação" });

			if (result.length > 0) return res.status(200).send({ result });

			return res
				.status(400)
				.send({ error: "Erro na listagem da solicitação" });
		}
	);
}

export function listarSolicitacaoAluno(req, res) {
	const idAluno = req.params.idAluno;

	db.query(
		`
    SELECT s.idSolicitacao, s.tipo, s.descricao, a.nome, a.idAluno
    FROM solicitacao s
    JOIN aluno a
    ON s.idAluno = a.idAluno
    WHERE s.idAluno = '${idAluno}'
    `,
		(err, result) => {
			if (err)
				return res
					.status(400)
					.send({ error: "Erro na listagem da solicitação" });

			return res.status(200).send({ result });
		}
	);
}

export function finalizarSolicitacao(req, res) {
	const idSolicitacao = req.params.idSolicitacao;
	const status = req.body.status;

	const dataAtual = new Date().toISOString().slice(0, 10);

	db.query(
		`
    SELECT * FROM solicitacao
    WHERE idSolicitacao = '${idSolicitacao}'
    `,
		(err, result) => {
			if (err)
				return res
					.status(400)
					.send({ error: "Solicitação não encontrada" });

			if (result.length > 0) {
				db.query(
					`
          UPDATE solicitacao
          SET status = '${status}', dataTermino = '${dataAtual}'
          WHERE idSolicitacao = '${idSolicitacao}' 
        `,
					(err, result) => {
						if (err)
							return res
								.status(400)
								.send({ error: "Erro na alteração do status" });
						else
							return res
								.status(200)
								.send({
									msg: "Status da solicitação alterado com sucesso",
								});
					}
				);
			} else
				return res
					.status(400)
					.send({ error: "Solicitação não encontrada" });
		}
	);
}