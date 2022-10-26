require('dotenv').config();

const express = require('express')
const cors = require('cors')

const alunoRouter = require('./routes/alunoRouter')
const authRouter = require('./routes/authRouter')
const solicitacaoRouter = require('./routes/solicitacaoRouter')
const respostaRouter = require('./routes/respostaRouter')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', authRouter)
app.use('/aluno', alunoRouter)
app.use('/solicitacao', solicitacaoRouter)
app.use('/resposta', respostaRouter)

app.listen(3001, () => {
  console.log("Rodando na porta 3001")
})