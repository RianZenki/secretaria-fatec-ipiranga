const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')

const solicitacaoController = require('../controllers/solicitacaoController')

// Criar nova solicitação
router.post('/', auth, solicitacaoController.novaSolicitacao)

// Listar todas solicitações
router.get('/', auth, solicitacaoController.listarTodasSolicitacoes)

// Listar solicitação pelo id
router.get('/:idSolicitacao', auth, solicitacaoController.listarSolicitacaoPeloId)

// Listar solicitações do aluno
router.get('/aluno/:idAluno', auth, solicitacaoController.listarSolicitacaoAluno)

// Finalizar solicitação
router.put('/:idSolicitacao', auth, solicitacaoController.finalizarSolicitacao)

module.exports = router