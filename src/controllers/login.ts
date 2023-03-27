import { prisma } from "../database/prismaClient";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export const loginController = {
	post: async (req: Request, res: Response) => {
		try {
			const { email, password } = req.body;

			const checkUserExists = await prisma.user.findUnique({ where: { email } });

			if (!checkUserExists)
				return res.status(404).json({ success: false, message: "Esse email não está cadastrado!" });

			if (!checkUserExists.emailVerified)
				return res.status(203).json({ success: false, message: "O email não está verificado!" });

			const checkPassword = await bcrypt.compare(password, checkUserExists.password);

			if (!checkPassword) return res.status(200).json({ success: false, message: "A senha está incorreta!" });

			const secret: any = process.env.SECRET;
			const token = jwt.sign(
				{
					id: checkUserExists.id,
				},
				secret
			);
			return res.status(200).json({
				success: true,
				message: "O usuário foi logado com sucesso!",
				token,
			});
		} catch (error) {
			return res.status(500).json({ success: false, message: "Falha ao logar!" });
		}
	},
};
