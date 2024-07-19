"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const forgetPassword_1 = require("../controllers/forgetPassword");
const forgetPasswordRouter = express_1.default.Router();
forgetPasswordRouter.post("/", forgetPassword_1.forgetPasswordController.post);
forgetPasswordRouter.put("/", forgetPassword_1.forgetPasswordController.put);
exports.default = forgetPasswordRouter;
