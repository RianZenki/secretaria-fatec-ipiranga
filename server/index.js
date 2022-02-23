const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_secretaria_fatec_ipiranga"
})

app.use(express.json())
app.use(cors())

app.post("/cadastro", (req, res) => {
    const nome = req.body.nome
    const email = req.body.email
    const curso = req.body.curso
    const turno = req.body.turno
    const ra = req.body.ra
    const senha = req.body.senha

    db.query(`SELECT * FROM aluno WHERE email = '${email}'`,
    (err, result) => {
        if (err) {
            res.send(err)
        }
        if (result.length === 0) {
            db.query(`INSERT INTO aluno (nome, email, curso, turno, ra, senha) VALUES ('${nome}', '${email}', '${curso}', '${turno}', '${ra}', '${senha}')`, 
            (err, result) => {
                if (err) {
                    res.send(err)
                }
                res.send({msg: "Cadastrado com sucesso"})
            })
        } else {
            res.send({msg: "Usuário já cadastrado"})
        }
    })
})

app.post("/login", (req, res) => {
    const email = req.body.email
    const senha = req.body.senha

    db.query(`SELECT * FROM aluno WHERE email = '${email}' AND senha = '${senha}'`,
    (err, response) => {
        if (err) {
             res.send(err)
        }
        if (response.length > 0) {
            res.send({msg: "Usuário logado com sucesso", email: email})
        }
        else {
            res.send({msg: "Email ou senha inválidos"})
        }
    })
})

app.listen(3001, () => {
    console.log("Rodando na porta 3001")
})