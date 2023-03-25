import { prisma } from "../database/prismaClient";
import { Request, Response } from "express";

export const financePlanController = {
	get: async (req: Request, res: Response) => {
		try {
			const userId = +req.params.id;
			const findFinancesPlan = await prisma.financesPlan.findMany({
				where: { userId },
				include: { user: true },
			});

			return res.status(200).json({ success: true, message: findFinancesPlan });
		} catch (error) {
			return res.status(500).json({ success: false, message: "Falha ao exibir financesPlans!" });
		}
	},
	post: async (req: Request, res: Response) => {
		let { name, entry, userId } = req.body;
		entry = +entry;
		userId = +userId;
		const newFinancePlan = await prisma.financesPlan.create({ data: { name, entry, userId } });
		try {
			return res.status(200).json({ success: true, message: { Novo_financePlan: newFinancePlan } });
		} catch (error) {
			return res.status(500).json({ success: false, message: "Falha ao criar financePlan!", error });
		}
	},
	put: async (req: Request, res: Response) => {
		try {
			const id = +req.params.id;
			const { name, entry } = req.body;
			const checkFinancePlanExists = await prisma.financesPlan.findUnique({ where: { id } });

			if (!checkFinancePlanExists)
				return res.status(200).json({ success: false, message: `O financePlan com o id: ${id} não existe` });

			const financePlanUpdated = await prisma.financesPlan.update({
				where: { id },
				data: { name, entry },
			});

			return res.status(200).json({ success: true, message: { FinancePlan_editado: financePlanUpdated } });
		} catch (error) {
			return res.status(500).json({ success: false, message: "Falha ao editar financePlan!" });
		}
	},
	delete: async (req: Request, res: Response) => {
		try {
			const id = +req.params.id;

			const checkFinancePlanExist = await prisma.financesPlan.findUnique({ where: { id } });

			if (!checkFinancePlanExist)
				return res.status(200).json({ success: false, message: "O financePlan não existe" });

			await prisma.financesPlan.delete({ where: { id } });

			return res.status(200).json({ success: true, message: "FinancePlan excluido com sucesso!" });
		} catch (error) {
			return res.status(500).json({ success: false, message: "Falha ao excluir financePlan!" });
		}
	},
};
