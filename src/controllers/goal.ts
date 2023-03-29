import { prisma } from "../database/prismaClient";
import { Request, Response } from "express";

export const goalController = {
	get: async (req: Request, res: Response) => {
		try {
			const financePlanId = +req.params.financePlanId;
			const findGoals = await prisma.goals.findMany({
				where: { financePlanId },
			});

			return res.status(200).json({ success: true, message: findGoals });
		} catch (error) {
			return res.status(500).json({ success: false, message: "Falha ao exibir metas!" });
		}
	},
	post: async (req: Request, res: Response) => {
		try {
			let { name, done, financePlanId } = req.body;

			financePlanId = +financePlanId;

			const checkIfFinancePlanExists = await prisma.financesPlan.findUniqueOrThrow({
				where: { id: financePlanId },
			});

			const newGoal = await prisma.goals.create({ data: { name, done, financePlanId } });
			return res.status(201).json({ success: true, message: { Nova_meta: newGoal } });
		} catch (error) {
			return res.status(500).json({ success: false, message: "Falha ao criar meta!" });
		}
	},
	put: async (req: Request, res: Response) => {
		try {
			const id = +req.params.id;
			const { name, done } = req.body;
			const checkGoalExists = await prisma.goals.findUniqueOrThrow({ where: { id } });

			const GoalUpdated = await prisma.goals.update({
				where: { id },
				data: { name, done },
			});

			return res.status(200).json({ success: true, message: { Meta_editada: GoalUpdated } });
		} catch (error) {
			return res.status(500).json({ success: false, message: "Falha ao editar despesa!" });
		}
	},
	delete: async (req: Request, res: Response) => {
		try {
			const id = +req.params.id;

			const checkGoalPlanExist = await prisma.goals.findUniqueOrThrow({ where: { id } });

			await prisma.goals.delete({ where: { id } });

			return res.status(200).json({ success: true, message: "Meta excluida com sucesso!" });
		} catch (error) {
			return res.status(500).json({ success: false, message: "Falha ao excluir meta!" });
		}
	},
};
