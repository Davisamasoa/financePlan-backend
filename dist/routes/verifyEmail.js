"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyEmail_1 = require("../controllers/verifyEmail");
const verifyEmailRouter = express_1.default.Router();
verifyEmailRouter.post("/", verifyEmail_1.verifyEmailController.post);
verifyEmailRouter.put("/", verifyEmail_1.verifyEmailController.put);
exports.default = verifyEmailRouter;
