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
exports.loginController = void 0;
const prismaClient_1 = require("../database/prismaClient");
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcrypt"));
exports.loginController = {
    post: async (req, res) => {
        try {
            const { email, password } = req.body;
            const checkUserExists = await prismaClient_1.prisma.user.findUnique({ where: { email } });
            if (!checkUserExists)
                return res.status(404).json({ success: false, message: "Esse email não está cadastrado!" });
            if (!checkUserExists.emailVerified)
                return res.status(203).json({ success: false, message: "O email não está verificado!" });
            const checkPassword = await bcrypt.compare(password, checkUserExists.password);
            if (!checkPassword)
                return res.status(200).json({ success: false, message: "A senha está incorreta!" });
            const secret = process.env.SECRET;
            const token = jwt.sign({
                id: checkUserExists.id,
            }, secret);
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
