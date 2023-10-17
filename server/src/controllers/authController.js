const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const mailer = require('../modules/mailer')

const db = require('../services/connection')

function cadastro(req, res) {

  const { nome, email, curso, turno, ra } = req.body
  const senha = bcrypt.hashSync(req.body.senha)
  const token = crypto.randomBytes(20).toString('hex')

  db.query(`SELECT * FROM aluno WHERE email = '${email}'`,
    (err, result) => {
      if (err)
        return res.status(400).send({ error: "Erro na criação do cadastro" })

      if (result.length === 0) {
        db.query(`INSERT INTO aluno (nome, email, curso, turno, ra, senha, token) VALUES ('${nome}', '${email}', '${curso}', '${turno}', '${ra}', '${senha}', '${token}')`,
          (err, result) => {
            if (err)
              return res.status(400).send({ error: "Erro na criação do cadatro" })

            res.status(201).send({ msg: "Cadastrado realizado com sucesso" })

            mailer.sendMail({
              from: "Rian Zenki <rian.nacazato@hotmail.com>",
              to: 'rian.zenki@gmail.com',
              subject: 'Autenticar conta',
              template: 'auth/autenticar',
              context: { token },
            }, (err) => {
              if (err)
                return res.status(400).send({ error: "Erro ao enviar o email de autenticação" })

              return res.status(200).send({ msg: "Email enviado" })
            })
          })
      } else
        return res.status(401).send({ error: "Email já cadastrado" })
    })
}

function login(req, res) {
  const { email, senha } = req.body

  db.query(`SELECT * FROM aluno WHERE email = '${email}'`,
    (err, result) => {
      if (err)
        return res.status(400).json({ error: "Email ou senha inválidos" })

      if (result.length > 0) {

        const senhasIguais = bcrypt.compareSync(senha, result[0].senha)

        // Verifica se a senha informada está incorreta
        if (!senhasIguais)
          return res.status(400).json({ error: "Email ou senha inválidos" })

        // Verificar se o usuário está autenticado no banco
        if (result[0].autenticado === "0")
          return res.status(401).json({ error: "Usuário não autenticado. Verifique seu email!" })

        // Verifica se a senha informada está correta
        if (senhasIguais) {
          const aluno = {
            idAluno: result[0].idAluno,
            email: email,
            nome: result[0].nome,
          }
          return res.status(200).json({
            aluno,
            token: jwt.sign(aluno, process.env.TOKEN_SECRET)
          })
        }

        else
          return res.status(400).json({ error: "Email ou senha inválidos" })
      }
      else
        return res.status(400).json({ error: "Email ou senha inválidos" })
    })
}

function esqueciSenha(req, res) {
  const email = req.body.emailRec

  db.query(`SELECT * FROM aluno WHERE email = '${email}'`,
    (err, result) => {
      if (err)
        res.status(400).send({ error: "Erro na recuperação de senha" })

      if (result.length > 0) {
        mailer.sendMail({
          from: "Rian Zenki <rian.nacazato@hotmail.com>",
          to: 'rian.zenki@gmail.com',
          subject: 'Recuperar Senha',
          template: 'auth/esqueciSenha',
          context: { token: result[0].token, id: result[0].idAluno },
        }, (err) => {
          if (err) {
            return res.status(400).send({ error: "Erro ao enviar o email de recuperação de senha" })
          }

          return res.status(200).send({ msg: "Email enviado para a criação da nova senha" })
        })

      }
      else
        return res.status(400).send({ error: "Email não encontrado" })
    })
}

function verificarTokenSenha(req, res) {
  const { id, token } = req.params

  db.query(`SELECT * FROM aluno WHERE idAluno = '${id}' AND token = '${token}'`,
    (err, result) => {
      if (err)
        return res.status(400).redirect('http://localhost:3000/')

      if (result.length > 0) {
        return res.status(200).redirect(`http://localhost:3000/nova-senha?t=${token}`)
      }
      else {
        return res.status(400).redirect('http://localhost:3000/')
      }
    })
}

function alterarSenha(req, res) {
  const { id, token } = req.session
  const senha = bcrypt.hashSync(req.body.senha)

  console.log(req.session.id)
  db.query(`SELECT * FROM aluno WHERE idAluno = '${id}' AND token = '${token}'`,
    (err, result) => {
      if (err) {
        // req.session.destroy()
        res.status(400).send({ error: "Usuário não encontrado" })
      }

      if (result.length > 0) {
        db.query(`
          UPDATE aluno
          SET senha = '${senha}'
          WHERE idAluno = '${id} AND token = '${token}'
        `, (err, result) => {
          if (err) {
            // req.session.destroy()
            return res.status(400).send({ error: "Erro na alteração da senha" })
          }

          // req.session.destroy()
          return res.status(200).send({ msg: "Senha alterado com sucesso" })
        })
      }
      else {
        // req.session.destroy()
        return res.status(400).send({ error: "Usuário não encontrado" })
      }
    })
}

function autenticar(req, res) {
  const token = req.params.token

  db.query(`SELECT * FROM aluno WHERE token = '${token}'`,
    (err, result) => {
      if (err)
        res.status(400).send({ error: "Token inválido" })

      if (result.length > 0) {
        if (token !== result[0].token)
          return res.status(400).send({ error: "Token inválido" })

        db.query(`
            UPDATE aluno
            SET autenticado = '1'
            WHERE token = '${result[0].token}'
          `, (err, result) => {
          if (err)
            return res.status(400).send({ error: "Erro na autenticação" })

          return res.status(200).redirect('http://localhost:3000/')
        })
      }
      else
        return res.status(400).send({ error: "Erro na autenticação" })
    }
  )
}

module.exports = { cadastro, login, esqueciSenha, alterarSenha, verificarTokenSenha, autenticar }