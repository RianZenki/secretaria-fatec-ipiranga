import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path'
import * as url from 'url';

import alunoRouter from "./routes/alunoRouter.js";
import authRouter from "./routes/authRouter.js";
import solicitacaoRouter from "./routes/solicitacaoRouter.js";
import respostaRouter from "./routes/respostaRouter.js";
import tipoPedidoRouter from "./routes/tipoPedidoRouter.js";
import secretarioRouter from "./routes/secretarioRouter.js";
import tipoPedidoSecretarioRouter from "./routes/tipoPedidoSecretarioRouter.js";
import analyticsRouter from './routes/analyticsRouter.js'

dotenv.config();
const app = express();
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.use(json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/aluno", alunoRouter);
app.use("/solicitacao", solicitacaoRouter);
app.use("/resposta", respostaRouter);
app.use("/tipo-pedido", tipoPedidoRouter);
app.use("/secretario", secretarioRouter);
app.use("/tipo-pedido-secre", tipoPedidoSecretarioRouter);
app.use("/analytics", analyticsRouter)
app.use("/arquivos", express.static(path.resolve(__dirname, "..", "temp", "uploads")))

app.listen(3001, () => {
	console.log("Rodando na porta 3001");
});
