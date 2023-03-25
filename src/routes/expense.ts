import express from "express";
import { expenseController } from "../controllers/expense";
const expenseRouter = express.Router();

expenseRouter.get("/:financePlanId", expenseController.get);
expenseRouter.post("/", expenseController.post);
expenseRouter.put("/:id", expenseController.put);
expenseRouter.delete("/:id", expenseController.delete);

export default expenseRouter;
