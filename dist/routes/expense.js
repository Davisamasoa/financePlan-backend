"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expense_1 = require("../controllers/expense");
const expenseRouter = express_1.default.Router();
expenseRouter.get("/:financePlanId", expense_1.expenseController.get);
expenseRouter.post("/", expense_1.expenseController.post);
expenseRouter.put("/:id", expense_1.expenseController.put);
expenseRouter.delete("/:id", expense_1.expenseController.delete);
exports.default = expenseRouter;
