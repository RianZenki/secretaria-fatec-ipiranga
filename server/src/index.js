import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import alunoRouter from "./routes/alunoRouter.js";
import authRouter from "./routes/authRouter.js";
import solicitacaoRouter from "./routes/solicitacaoRouter.js";
import respostaRouter from "./routes/respostaRouter.js";

dotenv.config();
const app = express();

app.use(json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/aluno", alunoRouter);
app.use("/solicitacao", solicitacaoRouter);
app.use("/resposta", respostaRouter);

app.listen(3001, () => {
	console.log("Rodando na porta 3001");
});
