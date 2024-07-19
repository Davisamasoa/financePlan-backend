"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const financePlan_1 = require("../controllers/financePlan");
const financePlanRouter = express_1.default.Router();
financePlanRouter.get("/:id", financePlan_1.financePlanController.getByUserId);
financePlanRouter.get("/id/:id", financePlan_1.financePlanController.getId);
financePlanRouter.post("/", financePlan_1.financePlanController.post);
financePlanRouter.put("/:id", financePlan_1.financePlanController.put);
financePlanRouter.delete("/:id", financePlan_1.financePlanController.delete);
exports.default = financePlanRouter;
