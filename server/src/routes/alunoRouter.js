import { Router } from 'express'

import auth from '../middleware/auth.js'
import { consultarDados, alterarAluno, deletarAluno } from '../controllers/alunoController.js'

const router = Router()
// Consultar dados do aluno
router.get('/', auth, consultarDados)

// Alterar dados do aluno
router.put('/:id', auth, alterarAluno)

// Deletar dados do aluno
router.delete('/:id', auth, deletarAluno)

export default router