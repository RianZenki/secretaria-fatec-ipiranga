const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')

const respostaController = require('../controllers/respostaController')

// Criar nova respsota
router.post('/', auth, respostaController.novaResposta)

// Listar respostas de uma solicitação
router.get('/:idSolicitacao', auth, respostaController.listarRespostas)

module.exports = router