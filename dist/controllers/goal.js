"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goalController = void 0;
const prismaClient_1 = require("../database/prismaClient");
exports.goalController = {
    get: async (req, res) => {
        try {
            const financePlanId = +req.params.financePlanId;
            const findGoals = await prismaClient_1.prisma.goals.findMany({
                where: { financePlanId },
            });
            return res.status(200).json({ success: true, message: findGoals });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Falha ao exibir metas!" });
        }
    },
    post: async (req, res) => {
        try {
            let { name, done, financePlanId } = req.body;
            financePlanId = +financePlanId;
            const checkIfFinancePlanExists = await prismaClient_1.prisma.financesPlan.findUniqueOrThrow({
                where: { id: financePlanId },
            });
            const newGoal = await prismaClient_1.prisma.goals.create({ data: { name, done, financePlanId } });
            return res.status(201).json({ success: true, message: { Nova_meta: newGoal } });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Falha ao criar meta!" });
        }
    },
    put: async (req, res) => {
        try {
            const id = +req.params.id;
            const { name, done } = req.body;
            const checkGoalExists = await prismaClient_1.prisma.goals.findUniqueOrThrow({ where: { id } });
            const GoalUpdated = await prismaClient_1.prisma.goals.update({
                where: { id },
                data: { name, done },
            });
            return res.status(200).json({ success: true, message: { Meta_editada: GoalUpdated } });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Falha ao editar despesa!" });
        }
    },
    delete: async (req, res) => {
        try {
            const id = +req.params.id;
            const checkGoalPlanExist = await prismaClient_1.prisma.goals.findUniqueOrThrow({ where: { id } });
            await prismaClient_1.prisma.goals.delete({ where: { id } });
            return res.status(200).json({ success: true, message: "Meta excluida com sucesso!" });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Falha ao excluir meta!" });
        }
    },
};
