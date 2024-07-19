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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailController = void 0;
const prismaClient_1 = require("../database/prismaClient");
const jwt = __importStar(require("jsonwebtoken"));
const transporter_1 = __importDefault(require("../transporter"));
function generateVerificationCode() {
    let verificationcode = "";
    for (let i = 0; i < 6; i++) {
        const numberRandom = Math.random() * 10;
        verificationcode += Math.floor(numberRandom);
    }
    return verificationcode;
}
exports.verifyEmailController = {
    post: async (req, res) => {
        try {
            const { email } = req.body;
            const checkUserExists = await prismaClient_1.prisma.user.findUnique({ where: { email } });
            if (!checkUserExists)
                return res.status(404).json({ success: false, message: "Esse email não está cadastrado!" });
            if (checkUserExists.emailVerified)
                return res.status(203).json({ success: false, message: "O email já está verificado!" });
            const verificationCode = generateVerificationCode();
            const message = {
                text: `O seu código de verificação é: ${verificationCode}`,
                subject: "Código de verificação",
                html: `<p>O seu código de verificação é:</p> <h1> ${verificationCode}</h1>`,
                to: email,
                from: "Finance Plan <financePlanSite@outlook.com>",
            };
            await transporter_1.default
                .sendMail(message)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
            const sendVerificationCodeToUserData = await prismaClient_1.prisma.user.update({
                where: { email },
                data: { verificationCode },
            });
            return res.status(200).json({
                success: true,
                message: "O código foi enviado com sucesso!",
                user: checkUserExists,
            });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Falha ao enviar código de confirmação" });
        }
    },
    put: async (req, res) => {
        try {
            const { email, code } = req.body;
            const checkUserExists = await prismaClient_1.prisma.user.findUnique({ where: { email } });
            if (!checkUserExists)
                return res.status(404).json({ success: false, message: "Esse email não está cadastrado!" });
            if (checkUserExists.emailVerified)
                return res.status(203).json({ success: false, message: "O email já está verificado!" });
            if (code !== checkUserExists.verificationCode)
                return res.status(203).json({ success: false, message: "O código de verificação está incorreto!" });
            const secret = process.env.SECRET;
            const token = jwt.sign({
                id: checkUserExists.id,
            }, secret);
            await prismaClient_1.prisma.user.update({
                where: { email },
                data: {
                    emailVerified: true,
                    verificationCode: "",
                },
            });
            return res.status(200).json({
                success: true,
                message: "O usuário foi logado com sucesso!",
                token,
            });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Falha ao logar!" });
        }
    },
};
