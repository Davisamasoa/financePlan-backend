"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.financePlanController = void 0;
const prismaClient_1 = require("../database/prismaClient");
exports.financePlanController = {
    getByUserId: async (req, res) => {
        try {
            const userId = +req.params.id;
            const checkIfUserExists = await prismaClient_1.prisma.user.findUniqueOrThrow({
                where: { id: userId },
            });
            const findFinancesPlan = await prismaClient_1.prisma.financesPlan.findMany({
                where: { userId },
                include: { expenses: true },
            });
            return res.status(200).json({ success: true, message: findFinancesPlan });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Falha ao exibir financesPlans!" });
        }
    },
    getId: async (req, res) => {
        try {
            const id = +req.params.id;
            const findFinancePlan = await prismaClient_1.prisma.financesPlan.findUniqueOrThrow({ where: { id } });
            return res.status(200).json({ success: true, message: findFinancePlan });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Falha ao exibir financesPlans!" });
        }
    },
    post: async (req, res) => {
        try {
            let { name, entry, userId } = req.body;
            entry = +entry;
            userId = +userId;
            const checkIfUserExists = await prismaClient_1.prisma.user.findUniqueOrThrow({ where: { id: userId } });
            const newFinancePlan = await prismaClient_1.prisma.financesPlan.create({ data: { name, entry, userId } });
            return res.status(201).json({ success: true, message: { Novo_financePlan: newFinancePlan } });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Falha ao criar financePlan!" });
        }
    },
    put: async (req, res) => {
        try {
            const id = +req.params.id;
            const { name, entry } = req.body;
            const checkFinancePlanExists = await prismaClient_1.prisma.financesPlan.findUniqueOrThrow({ where: { id } });
            const financePlanUpdated = await prismaClient_1.prisma.financesPlan.update({
                where: { id },
                data: { name, entry },
            });
            return res.status(200).json({ success: true, message: { FinancePlan_editado: financePlanUpdated } });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Falha ao editar financePlan!" });
        }
    },
    delete: async (req, res) => {
        try {
            const id = +req.params.id;
            const checkFinancePlanExist = await prismaClient_1.prisma.financesPlan.findUniqueOrThrow({ where: { id } });
            await prismaClient_1.prisma.financesPlan.delete({ where: { id } });
            return res.status(200).json({ success: true, message: "FinancePlan excluido com sucesso!" });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Falha ao excluir financePlan!" });
        }
    },
};
