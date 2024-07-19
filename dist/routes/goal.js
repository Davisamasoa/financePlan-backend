"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const goal_1 = require("../controllers/goal");
const goalRouter = express_1.default.Router();
goalRouter.get("/:financePlanId", goal_1.goalController.get);
goalRouter.post("/", goal_1.goalController.post);
goalRouter.put("/:id", goal_1.goalController.put);
goalRouter.delete("/:id", goal_1.goalController.delete);
exports.default = goalRouter;
