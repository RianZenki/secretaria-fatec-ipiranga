import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { randomBytes } from "crypto";
const { hashSync, compareSync } = bcrypt;
const { sign } = jsonwebtoken;

import { prismaClient } from "../database/prismaClient.js";
import mailer from "../modules/mailer.js";

export async function cadastro(req, res) {
	const { nome, email, curso, turno, ra } = req.body;
	const senha = hashSync(req.body.senha);
	const token = randomBytes(12).toString("hex");

	try {
		const aluno = await prismaClient.aluno.create({
			data: {
				nome,
				email,
				curso,
				turno,
				ra,
				senha,
				token,
			},
		});

		mailer.sendMail(
			{
				from: "Rian Zenki <rian.nacazato@hotmail.com>",
				to: "rian.zenki@gmail.com",
				subject: "Autenticar conta",
				template: "auth/autenticar",
				context: { token },
			},
			(err) => {
				if (err)
					return res.status(400).send({
						error: "Erro ao enviar o email de autenticação",
					});

				return res
					.status(200)
					.send({ aluno, msg: "Email enviado para autenticação" });
			}
		);
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				if (error.meta.target === "alunos_email_key") {
					return res.status(400).send({ msg: "Email já cadastrado!" });
				}

				if (error.meta.target === "alunos_ra_key") {
					return res.status(400).send({ msg: "RA já cadastrado!" });
				}

				return res.status(400).send(error);
			} else {
				return res.status(400).send(error);
			}
		}
		return res.status(500).send(error);
	}
}

export async function login(req, res) {
	const { email, senha } = req.body;

	try {
		const aluno = await prismaClient.aluno.findFirst({
			where: {
				email,
			},
		});

		if (!aluno)
			return res.status(400).send({ msg: "Email ou senha inválidos" });

		const senhasIguais = compareSync(senha, aluno.senha);

		// Verifica se a senha informada está incorreta
		if (!senhasIguais)
			return res.status(400).json({ error: "Email ou senha inválidos" });

		// Verificar se o usuário está autenticado no banco
		if (aluno.autenticado === false)
			return res.status(401).json({
				error: "Usuário não autenticado. Verifique seu email!",
			});

		// Verifica se a senha informada está correta
		if (senhasIguais) {
			const dadosAlunoLogin = {
				id: aluno.id,
				email: email,
				nome: aluno.nome,
			};

			return res.status(200).send({
				dadosAlunoLogin,
				token: sign(dadosAlunoLogin, process.env.TOKEN_SECRET),
			});
		} else return res.status(400).send({ error: "Email ou senha inválidos" });
	} catch (error) {
		if (error) return res.status(400).send({ msg: "Falha no login" });
	}
}

export async function esqueciSenha(req, res) {
	const email = req.body.recoveryEmail;

	try {
		const studant = await prismaClient.aluno.findFirstOrThrow({
			where: {
				email
			}
		})

		mailer.sendMail(
			{
				from: "Rian Zenki <rian.nacazato@hotmail.com>",
				to: "rian.zenki@gmail.com",
				subject: "Recuperar Senha",
				template: "auth/esqueciSenha",
				context: { token: studant.token, id: studant.id },
			},
			(err) => {
				if (err) {
					return res.status(400).send({
						msg: "Erro ao enviar o email de recuperação de senha",
					});
				}

				return res
					.status(200)
					.send({ msg: "Email de recuperação de senha enviado!" });
			}
		);

		return res.status(200).send({
			msg: "Email de recuperação de senha enviado!",
		});
	} catch (error) {
		return res.status(400).send({
			msg: "Erro ao enviar o email de recuperação de senha",
		});
	}
}

export async function verificarTokenSenha(req, res) {
	const { id, token } = req.params;

	try {
		await prismaClient.aluno.findFirstOrThrow({
			where: {
				id,
				token
			}
		})

		return res
					.status(200)
					.redirect(`http://localhost:5173/nova-senha?t=${token}`);
	} catch (error) {
		return res.status(400).redirect("http://localhost:5173/");
	}
}

export async function alterarSenha(req, res) {
	const { alunoId, senhaAntiga } = req.body
	const senha = hashSync(req.body.senha);

	try {
		const aluno = await prismaClient.aluno.findFirstOrThrow({
			where: {
				id: alunoId,
			}
		})

		const senhasIguais = compareSync(senhaAntiga, aluno.senha);

		if (!senhasIguais)
			return res.status(400).json({ msg: "Senha inválida" });

		await prismaClient.aluno.update({
			where: {
				id: aluno.id
			},
			data: {
				senha
			}
		})

		return res.status(200).send({ msg: "Senha alterado com sucesso!" })
	} catch (error) {
		return res.status(400).send({ msg: "Erro ao alterar a senha!", error });
	}
}

export async function novaSenha(req, res) {
	const { token } = req.body
	const senha = hashSync(req.body.senha);

	try {
		const aluno = await prismaClient.aluno.findFirstOrThrow({
			where: {
				token
			}
		})

		await prismaClient.aluno.update({
			where: {
				token: aluno.token
			},
			data: {
				senha
			}
		})

		return res.status(200).send({ msg: "Senha alterado com sucesso!" })
	} catch (error) {
		return res.status(400).send({ msg: "Erro ao alterar a senha!", error });
	}
}

export async function autenticar(req, res) {
	const token = req.params.token;

	try {
		const aluno = await prismaClient.aluno.findFirst({
			where: {
				token,
			},
		});

		if (!aluno) return res.status(400).send({ msg: "Token inválido" });

		if (token !== aluno.token)
			return res.status(400).send({ msg: "Token inválido" });

		const alunoAtualizado = await prismaClient.aluno.update({
			where: {
				token,
			},
			data: {
				autenticado: true,
			},
		});

		if (!alunoAtualizado)
			return res.status(400).send({ msg: "Erro na autenticação" });

		return res.status(200).redirect("http://localhost:5173/");
		// return res.status(200).send({ msg: "Conta autenticada com sucesso" });
	} catch (error) {
		if (error) return res.status(400).send({ msg: "Erro na autenticação" });
	}
}
