import { prisma } from "../database/prismaClient";
import { Request, Response } from "express";

export const financePlanController = {
	getByUserId: async (req: Request, res: Response) => {
		try {
			const userId = +req.params.id;

			const checkIfUserExists = await prisma.user.findUniqueOrThrow({
				where: { id: userId },
			});

			const findFinancesPlan = await prisma.financesPlan.findMany({
				where: { userId },
				include: { expenses: true },
			});

			return res.status(200).json({ success: true, message: findFinancesPlan });
		} catch (error) {
			return res.status(500).json({ success: false, message: "Falha ao exibir financesPlans!" });
		}
	},
	getId: async (req: Request, res: Response) => {
		try {
			const id = +req.params.id;

			const findFinancePlan = await prisma.financesPlan.findUniqueOrThrow({ where: { id } });

			return res.status(200).json({ success: true, message: findFinancePlan });
		} catch (error) {
			return res.status(500).json({ success: false, message: "Falha ao exibir financesPlans!" });
		}
	},
	post: async (req: Request, res: Response) => {
		try {
			let { name, entry, userId } = req.body;
			entry = +entry;
			userId = +userId;

			const checkIfUserExists = await prisma.user.findUniqueOrThrow({ where: { id: userId } });

			const newFinancePlan = await prisma.financesPlan.create({ data: { name, entry, userId } });
			return res.status(201).json({ success: true, message: { Novo_financePlan: newFinancePlan } });
		} catch (error) {
			return res.status(500).json({ success: false, message: "Falha ao criar financePlan!" });
		}
	},
	put: async (req: Request, res: Response) => {
		try {
			const id = +req.params.id;
			const { name, entry } = req.body;
			const checkFinancePlanExists = await prisma.financesPlan.findUniqueOrThrow({ where: { id } });

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

			const checkFinancePlanExist = await prisma.financesPlan.findUniqueOrThrow({ where: { id } });

			await prisma.financesPlan.delete({ where: { id } });

			return res.status(200).json({ success: true, message: "FinancePlan excluido com sucesso!" });
		} catch (error) {
			return res.status(500).json({ success: false, message: "Falha ao excluir financePlan!" });
		}
	},
};
