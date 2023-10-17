const express = require('express')
const router = express.Router()
const multer = require('multer')
const multerConfig = require('../config/multer')

const auth = require('../middleware/auth')
const db = require('../services/connection')

const solicitacaoController = require('../controllers/solicitacaoController')

router.post('/arquivo', multer(multerConfig).array('file'), (req, res) => {
  console.log(req.files)
  console.log(req.body)

  const files = req.files.map((file, index) => {
    return file.filename
  })
  
  console.log(files)

  // const { tipo, descricao } = req.body
  // const arquivo = req.file

  res.send("Documento salvo")

})

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