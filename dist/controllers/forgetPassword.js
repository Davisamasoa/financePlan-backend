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
exports.forgetPasswordController = void 0;
const prismaClient_1 = require("../database/prismaClient");
const bcrypt = __importStar(require("bcrypt"));
const transporter_1 = __importDefault(require("../transporter"));
function generateVerificationCode() {
    let verificationcode = "";
    for (let i = 0; i < 6; i++) {
        const numberRandom = Math.random() * 10;
        verificationcode += Math.floor(numberRandom);
    }
    return verificationcode;
}
exports.forgetPasswordController = {
    post: async (req, res) => {
        try {
            const { email } = req.body;
            const checkUserExists = await prismaClient_1.prisma.user.findUnique({ where: { email } });
            if (!checkUserExists)
                return res.status(404).json({ success: false, message: "Esse email não está cadastrado!" });
            if (!checkUserExists.emailVerified)
                return res.status(203).json({ success: false, message: "O email não está verificado!" });
            const verificationCode = generateVerificationCode();
            transporter_1.default.sendMail({
                text: `O seu código de recuperação é: ${verificationCode}`,
                subject: "Código de recuperação",
                html: `<p>O seu código de recuperação é:</p> <h1> ${verificationCode}</h1>`,
                to: email,
                from: "Finance Plan <financePlanSite@outlook.com>",
            });
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
            const { email, password, code } = req.body;
            const checkUserExists = await prismaClient_1.prisma.user.findUnique({ where: { email } });
            if (!checkUserExists)
                return res.status(404).json({ success: false, message: "Esse email não está cadastrado!" });
            if (!checkUserExists.emailVerified)
                return res.status(203).json({ success: false, message: "O email não está verificado!" });
            if (code !== checkUserExists.verificationCode)
                return res.status(203).json({ success: false, message: "O código de verificação está incorreto!" });
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);
            await prismaClient_1.prisma.user.update({
                where: { email },
                data: {
                    password: passwordHash,
                    verificationCode: "",
                },
            });
            return res.status(200).json({
                success: true,
                message: "A senha foi trocada com sucesso!",
            });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Falha ao logar!" });
        }
    },
};
