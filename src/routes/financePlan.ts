import express from "express";
import { financePlanController } from "../controllers/financePlan";
const financePlanRouter = express.Router();

financePlanRouter.get("/:id", financePlanController.get);
financePlanRouter.post("/", financePlanController.post);
financePlanRouter.put("/:id", financePlanController.put);
financePlanRouter.delete("/:id", financePlanController.delete);

export default financePlanRouter;
