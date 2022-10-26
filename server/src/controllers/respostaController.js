const db = require('../services/connection')

function novaResposta(req, res) {
  const { descricao, idSolicitacao, criadoPor } = req.body

  const dataAtual = new Date().toISOString().slice(0, 10)

  db.query(`
      SELECT * FROM solicitacao WHERE idSolicitacao = '${idSolicitacao}'
    `,
    (err, result) => {
      if (err)
        return res.status(400).send({ error: "Solicitação não encontrada" })

      if (result.length > 0) {
        db.query(`
            INSERT INTO resposta (idSolicitacao, descricao, dataCriacao,criadoPor) VALUES ('${idSolicitacao}', '${descricao}', '${dataAtual}', '${criadoPor}')
          `,
          (err, result) => {
            if (err)
              return res.status(400).send({ error: "Erro na criação da resposta" })

            return res.status(200).send({ msg: "Resposta criada com sucesso" })
          }
        )
      }

      else
        return res.status(400).send({ error: "Solicitação não encontrada" })
    }
  )
}

function listarRespostas(req, res) {
  const idSolicitacao = req.params.idSolicitacao

  db.query(`
    SELECT * FROM solicitacao WHERE idSolicitacao = '${idSolicitacao}'
  `,
    (err, result) => {
      if (err) {
        console.log(err)
        return res.status(400).send({ error: "Solicitação não encontrada" })
      }

      if (result.length > 0) {
        db.query(`
         SELECT * FROM resposta WHERE idSolicitacao = '${idSolicitacao}'
        `,
          (err, result) => {
            if (err)
              return res.status(400).send({ error: "Resposta não encontrada" })

            return res.status(200).send({ result })
          }
        )
      }

      else
        return res.status(400).send({ error: "Resposta não encontrada" })
    }
  )
}

module.exports = { novaResposta, listarRespostas }