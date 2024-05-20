import { Router } from 'express'

import { cadastro, login, esqueciSenha, verificarTokenSenha, alterarSenha, autenticar, novaSenha } from '../controllers/authController.js'

const router = Router()
// Cadastrar novo aluno
router.post('/cadastro', cadastro)

// Realizar login
router.post('/login', login)

// Enviar token de recuperação de senha
router.post('/esqueci-senha', esqueciSenha)

// Verificar token de alteração de senha
router.get('/alterar-senha/:id/:token', verificarTokenSenha)

// Alterar senha utilizando um token
router.post('/alterar-senha', alterarSenha)

router.post('/nova-senha', novaSenha)

// Autenticar conta
router.get('/autenticar/:token', autenticar)

export default router