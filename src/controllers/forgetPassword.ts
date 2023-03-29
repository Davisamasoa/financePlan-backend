import { prisma } from "../database/prismaClient";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as nodemailer from "nodemailer";
import transporter from "../transporter";

function generateVerificationCode() {
	let verificationcode = "";

	for (let i = 0; i < 6; i++) {
		const numberRandom = Math.random() * 10;

		verificationcode += Math.floor(numberRandom);
	}
	return verificationcode;
}

export const forgetPasswordController = {
	post: async (req: Request, res: Response) => {
		try {
			const { email } = req.body;

			const checkUserExists = await prisma.user.findUnique({ where: { email } });

			if (!checkUserExists)
				return res.status(404).json({ success: false, message: "Esse email não está cadastrado!" });

			if (!checkUserExists.emailVerified)
				return res.status(203).json({ success: false, message: "O email não está verificado!" });

			const verificationCode = generateVerificationCode();

			transporter.sendMail({
				text: `O seu código de recuperação é: ${verificationCode}`,
				subject: "Código de recuperação",
				html: `<p>O seu código de recuperação é:</p> <h1> ${verificationCode}</h1>`,
				to: email,
				from: "Finance Plan <financePlanSite@outlook.com>",
			});

			const sendVerificationCodeToUserData = await prisma.user.update({
				where: { email },
				data: { verificationCode },
			});

			return res.status(200).json({
				success: true,
				message: "O código foi enviado com sucesso!",
				user: checkUserExists,
			});
		} catch (error) {
			return res.status(500).json({ success: false, message: "Falha ao enviar código de confirmação" });
		}
	},
	put: async (req: Request, res: Response) => {
		try {
			const { email, password, code } = req.body;

			const checkUserExists = await prisma.user.findUnique({ where: { email } });

			if (!checkUserExists)
				return res.status(404).json({ success: false, message: "Esse email não está cadastrado!" });

			if (!checkUserExists.emailVerified)
				return res.status(203).json({ success: false, message: "O email não está verificado!" });

			if (code !== checkUserExists.verificationCode)
				return res.status(203).json({ success: false, message: "O código de verificação está incorreto!" });

			const salt = await bcrypt.genSalt(12);
			const passwordHash: string = await bcrypt.hash(password, salt);

			await prisma.user.update({
				where: { email },
				data: {
					password: passwordHash,
					verificationCode: "",
				},
			});

			return res.status(200).json({
				success: true,
				message: "A senha foi trocada com sucesso!",
			});
		} catch (error) {
			return res.status(500).json({ success: false, message: "Falha ao logar!" });
		}
	},
};
