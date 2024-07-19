"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const prismaClient_1 = require("../database/prismaClient");
const bcrypt = __importStar(require("bcrypt"));
exports.userController = {
    get: async (req, res) => {
        try {
            const id = +req.params.id;
            const findUser = await prismaClient_1.prisma.user.findUniqueOrThrow({
                where: { id },
            });
            return res.status(200).json({ success: true, message: findUser });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Falha ao exibir usuários!" });
        }
    },
    post: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const checkUserExists = await prismaClient_1.prisma.user.findUnique({ where: { email } });
            if (checkUserExists)
                return res.status(200).json({ success: false, message: "email já cadastrado!" });
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);
            const newUser = await prismaClient_1.prisma.user.create({
                data: {
                    name,
                    email,
                    password: passwordHash,
                },
            });
            return res.status(201).json({ success: true, message: { Novo_usuario: newUser } });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Falha ao criar usuário!" });
        }
    },
    put: async (req, res) => {
        try {
            const id = +req.params.id;
            const { actualPassword, newPassword } = req.body;
            const checkUserExists = await prismaClient_1.prisma.user.findUnique({ where: { id } });
            if (!checkUserExists)
                return res.status(200).json({ success: false, message: "O usuário não existe!" });
            const checkPassword = await bcrypt.compare(actualPassword, checkUserExists.password);
            if (!checkPassword)
                return res.status(200).json({ success: false, message: "Senha atual está incorreta!" });
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(newPassword, salt);
            const userUpdated = await prismaClient_1.prisma.user.update({
                where: { id },
                data: { password: passwordHash },
            });
            return res.status(200).json({ success: true, message: { Usuario_editado: userUpdated } });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Falha ao editar usuário!" });
        }
    },
    delete: async (req, res) => {
        try {
            const id = +req.params.id;
            const checkUserExists = await prismaClient_1.prisma.user.findUniqueOrThrow({ where: { id } });
            await prismaClient_1.prisma.user.delete({ where: { id } });
            return res.status(200).json({ success: true, message: "Usuário excluido com sucesso!" });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Falha ao excluir usuário!" });
        }
    },
};
