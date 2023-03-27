import { prisma } from "../database/prismaClient";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export const userController = {
	get: async (req: Request, res: Response) => {
		try {
			const findUsers = await prisma.user.findMany();

			return res.status(200).json({ success: true, message: findUsers });
		} catch (error) {
			return res.status(500).json({ success: false, message: "Falha ao exibir usuários!" });
		}
	},
	post: async (req: Request, res: Response) => {
		try {
			const { name, email, password } = req.body;

			const checkUserExists = await prisma.user.findUnique({ where: { email } });

			if (checkUserExists) return res.status(200).json({ success: false, message: "email já cadastrado!" });

			const salt = await bcrypt.genSalt(12);
			const passwordHash: string = await bcrypt.hash(password, salt);

			const newUser = await prisma.user.create({
				data: {
					name,
					email,
					password: passwordHash,
				},
			});

			return res.status(201).json({ success: true, message: { Novo_usuario: newUser } });
		} catch (error) {
			return res.status(500).json({ success: false, message: "Falha ao criar usuário!" });
		}
	},
	put: async (req: Request, res: Response) => {
		try {
			const id = +req.params.id;
			const { name, email, password } = req.body;
			const checkUserExists = await prisma.user.findUniqueOrThrow({ where: { id } });

			const userUpdated = await prisma.user.update({ where: { id }, data: { name, email, password } });

			return res.status(200).json({ success: true, message: { Usuario_editado: userUpdated } });
		} catch (error) {
			return res.status(500).json({ success: false, message: "Falha ao editar usuário!" });
		}
	},
	delete: async (req: Request, res: Response) => {
		try {
			const id = +req.params.id;

			const checkUserExists = await prisma.user.findUniqueOrThrow({ where: { id } });

			await prisma.user.delete({ where: { id } });

			return res.status(200).json({ success: true, message: "Usuário excluido com sucesso!" });
		} catch (error) {
			return res.status(500).json({ success: false, message: "Falha ao excluir usuário!" });
		}
	},
};
