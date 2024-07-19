"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseController = void 0;
const prismaClient_1 = require("../database/prismaClient");
exports.expenseController = {
    get: async (req, res) => {
        try {
            const financePlanId = +req.params.financePlanId;
            const findExpenses = await prismaClient_1.prisma.expenses.findMany({
                where: { financePlanId },
            });
            return res.status(200).json({ success: true, message: findExpenses });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Falha ao exibir despesas!" });
        }
    },
    post: async (req, res) => {
        try {
            let { name, value, financePlanId } = req.body;
            value = +value;
            financePlanId = +financePlanId;
            const checkIfFinancePlanExists = await prismaClient_1.prisma.financesPlan.findUniqueOrThrow({
                where: { id: financePlanId },
            });
            const newExpense = await prismaClient_1.prisma.expenses.create({ data: { name, value, financePlanId } });
            return res.status(201).json({ success: true, message: { Nova_despesa: newExpense } });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Falha ao criar despesa!" });
        }
    },
    put: async (req, res) => {
        try {
            const id = +req.params.id;
            const { name, value } = req.body;
            const checkExpenseExists = await prismaClient_1.prisma.expenses.findUniqueOrThrow({ where: { id } });
            const expenseUpdated = await prismaClient_1.prisma.expenses.update({
                where: { id },
                data: { name, value },
            });
            return res.status(200).json({ success: true, message: { Despesa_editada: expenseUpdated } });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Falha ao editar despesa!" });
        }
    },
    delete: async (req, res) => {
        try {
            const id = +req.params.id;
            const checkExpensePlanExist = await prismaClient_1.prisma.expenses.findUniqueOrThrow({ where: { id } });
            await prismaClient_1.prisma.expenses.delete({ where: { id } });
            return res.status(200).json({ success: true, message: "Despesa excluido com sucesso!" });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Falha ao excluir despesa!" });
        }
    },
};
