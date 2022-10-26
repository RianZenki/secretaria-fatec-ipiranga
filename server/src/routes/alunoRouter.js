const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const alunoController = require('../controllers/alunoController')

// Consultar dados do aluno
router.get('/consultar-dados', auth, alunoController.consultarDados)

// Alterar dados do aluno
router.put('/alterar-dados', auth, alunoController.alterarAluno)

// Deletar dados do aluno
router.delete('/deletar-aluno/:id', auth, alunoController.deletarAluno)

module.exports = router