import { prisma } from "../database/prismaClient";
import { Request, Response } from "express";

export const expenseController = {
	get: async (req: Request, res: Response) => {
		try {
			const financePlanId = +req.params.financePlanId;
			const findExpenses = await prisma.expenses.findMany({
				where: { financePlanId },
			});

			return res.status(200).json({ success: true, message: findExpenses });
		} catch (error) {
			return res.status(500).json({ success: false, message: "Falha ao exibir despesas!" });
		}
	},
	post: async (req: Request, res: Response) => {
		try {
			let { name, value, financePlanId } = req.body;
			value = +value;
			financePlanId = +financePlanId;

			const checkIfFinancePlanExists = await prisma.financesPlan.findUniqueOrThrow({
				where: { id: financePlanId },
			});

			const newExpense = await prisma.expenses.create({ data: { name, value, financePlanId } });
			return res.status(200).json({ success: true, message: { Nova_despesa: newExpense } });
		} catch (error) {
			return res.status(500).json({ success: false, message: "Falha ao criar despesa!" });
		}
	},
	put: async (req: Request, res: Response) => {
		try {
			const id = +req.params.id;
			const { name, value } = req.body;
			const checkExpenseExists = await prisma.expenses.findUniqueOrThrow({ where: { id } });

			const expenseUpdated = await prisma.expenses.update({
				where: { id },
				data: { name, value },
			});

			return res.status(200).json({ success: true, message: { Despesa_editada: expenseUpdated } });
		} catch (error) {
			return res.status(500).json({ success: false, message: "Falha ao editar despesa!" });
		}
	},
	delete: async (req: Request, res: Response) => {
		try {
			const id = +req.params.id;

			const checkExpensePlanExist = await prisma.expenses.findUniqueOrThrow({ where: { id } });

			await prisma.expenses.delete({ where: { id } });

			return res.status(200).json({ success: true, message: "Despesa excluido com sucesso!" });
		} catch (error) {
			return res.status(500).json({ success: false, message: "Falha ao excluir despesa!" });
		}
	},
};
