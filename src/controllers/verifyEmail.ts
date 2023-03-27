import { prisma } from "../database/prismaClient";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as nodemailer from "nodemailer";

function generateVerificationCode() {
	let verificationcode = "";

	for (let i = 0; i < 6; i++) {
		const numberRandom = Math.random() * 10;

		verificationcode += Math.floor(numberRandom);
	}
	return verificationcode;
}

const transporter = nodemailer.createTransport({
	host: "smtp-mail.outlook.com",
	port: 587,

	secure: false, // upgrade later with STARTTLS
	auth: {
		user: "financePlanSite@outlook.com",
		pass: process.env.EMAIL_PASSW,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

export const verifyEmailController = {
	post: async (req: Request, res: Response) => {
		try {
			const { email } = req.body;

			const checkUserExists = await prisma.user.findUnique({ where: { email } });

			if (!checkUserExists)
				return res.status(404).json({ success: false, message: "Esse email não está cadastrado!" });

			if (checkUserExists.emailVerified)
				return res.status(203).json({ success: false, message: "O email já está verificado!" });

			const verificationCode = generateVerificationCode();

			const sendVerificationCodeToUserData = await prisma.user.update({
				where: { email },
				data: { emailVerifiedCode: verificationCode },
			});

			transporter.sendMail({
				text: `O seu código de verificação é: ${verificationCode}`,
				subject: "Código de verificação",
				html: `<p>O seu código de verificação é:</p> <h1> ${verificationCode}</h1>`,
				to: email,
				from: "Finance Plan <financePlanSite@outlook.com>",
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
			const { email, code } = req.body;

			const checkUserExists = await prisma.user.findUnique({ where: { email } });

			if (!checkUserExists)
				return res.status(404).json({ success: false, message: "Esse email não está cadastrado!" });

			if (checkUserExists.emailVerified)
				return res.status(203).json({ success: false, message: "O email já está verificado!" });

			if (code !== checkUserExists.emailVerifiedCode)
				return res.status(203).json({ success: false, message: "O código de verificação está incorreto!" });

			const secret: any = process.env.SECRET;
			const token = jwt.sign(
				{
					id: checkUserExists.id,
				},
				secret
			);

			await prisma.user.update({
				where: { email },
				data: {
					emailVerified: true,
					emailVerifiedCode: "",
				},
			});

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
