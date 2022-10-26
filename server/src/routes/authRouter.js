const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')

// Cadastrar novo aluno
router.post('/cadastro', authController.cadastro)

// Realizar login
router.post('/login', authController.login)

// Enviar token de recuperação de senha
router.post('/esqueci-senha', authController.esqueciSenha)

// Alterar senha utilizando um token
router.post('/alterar-senha', authController.alterarSenha)

// Autenticar conta
router.get('/autenticar/:token', authController.autenticar)

module.exports = router