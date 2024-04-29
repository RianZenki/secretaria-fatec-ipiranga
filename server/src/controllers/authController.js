import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { randomBytes } from "crypto";

import { prismaClient } from "../database/prismaClient.js";
import mailer from "../modules/mailer.js";

import db from "../services/connection.js";

const { hashSync, compareSync } = bcrypt;
const { sign } = jsonwebtoken;

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

export function esqueciSenha(req, res) {
	const email = req.body.emailRec;

	db.query(`SELECT * FROM aluno WHERE email = '${email}'`, (err, result) => {
		if (err) res.status(400).send({ error: "Erro na recuperação de senha" });

		if (result.length > 0) {
			mailer.sendMail(
				{
					from: "Rian Zenki <rian.nacazato@hotmail.com>",
					to: "rian.zenki@gmail.com",
					subject: "Recuperar Senha",
					template: "auth/esqueciSenha",
					context: { token: result[0].token, id: result[0].idAluno },
				},
				(err) => {
					if (err) {
						return res.status(400).send({
							error: "Erro ao enviar o email de recuperação de senha",
						});
					}

					return res
						.status(200)
						.send({ msg: "Email enviado para a criação da nova senha" });
				}
			);
		} else return res.status(400).send({ error: "Email não encontrado" });
	});
}

export function verificarTokenSenha(req, res) {
	const { id, token } = req.params;

	db.query(
		`SELECT * FROM aluno WHERE idAluno = '${id}' AND token = '${token}'`,
		(err, result) => {
			if (err) return res.status(400).redirect("http://localhost:3000/");

			if (result.length > 0) {
				return res
					.status(200)
					.redirect(`http://localhost:3000/nova-senha?t=${token}`);
			} else {
				return res.status(400).redirect("http://localhost:3000/");
			}
		}
	);
}

export function alterarSenha(req, res) {
	const { id, token } = req.session;
	const senha = hashSync(req.body.senha);

	console.log(req.session.id);
	db.query(
		`SELECT * FROM aluno WHERE idAluno = '${id}' AND token = '${token}'`,
		(err, result) => {
			if (err) {
				// req.session.destroy()
				res.status(400).send({ error: "Usuário não encontrado" });
			}

			if (result.length > 0) {
				db.query(
					`
          UPDATE aluno
          SET senha = '${senha}'
          WHERE idAluno = '${id} AND token = '${token}'
        `,
					(err, result) => {
						if (err) {
							// req.session.destroy()
							return res
								.status(400)
								.send({ error: "Erro na alteração da senha" });
						}

						// req.session.destroy()
						return res
							.status(200)
							.send({ msg: "Senha alterado com sucesso" });
					}
				);
			} else {
				// req.session.destroy()
				return res.status(400).send({ error: "Usuário não encontrado" });
			}
		}
	);
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
